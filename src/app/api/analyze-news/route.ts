import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface Viewpoint {
  id: string;
  dimension: string;
  title: string;
  insight: string;
  content: string;
  anchors: string[];
  icon: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

async function fetchNewsContent(url: string): Promise<{ title: string; content: string }> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000
    });

    const $ = cheerio.load(response.data);
    
    const title = $('title').text() || $('h1').first().text() || '未知标题';
    
    let content = '';
    const selectors = [
      'article',
      '.article-content',
      '.content',
      '#content',
      'main',
      '.post-content',
      '.news-content'
    ];
    
    for (const selector of selectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text().trim();
        if (content.length > 200) break;
      }
    }
    
    if (!content) {
      const paragraphs = $('p');
      const paragraphTexts: string[] = [];
      paragraphs.each((_, elem) => {
        const text = $(elem).text().trim();
        if (text.length > 50) {
          paragraphTexts.push(text);
        }
      });
      content = paragraphTexts.join('\n\n');
    }

    return { title, content };
  } catch (error) {
    console.error('Error fetching news content:', error);
    throw new Error('无法获取新闻内容，请检查URL是否正确');
  }
}

async function callDeepSeekAPI(newsTitle: string, newsContent: string): Promise<{ topic_name: string; viewpoints: Viewpoint[] }> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const apiUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';

  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY 未配置');
  }

  const systemPrompt = `# Role
你是一名【深度知识架构师】。你的任务不是总结新闻，而是以新闻为入口，剥离出其背后隐藏的"地缘、金融、产业"知识图谱。

# Task
针对输入的新闻，提取 4-6 个"深挖维度"。

# Output Quality Standards
1. **拒绝官话**：严禁使用"红利释放"、"成效初显"、"强劲拉动"等虚词。
2. **知识回溯**：每个维度必须指向一个"硬核概念"或"历史逻辑"。（例如：提到封关，必须拆解"境内关外"的概念；提到贸易增长，必须拆解"转口贸易"的利润模型）。
3. **多方博弈**：必须体现不同主体（中央政府、地方政府、跨国企业、零关税受益者）的立场差异。
4. **术语挖掘**：必须提取出普通读者看不懂、但对理解事件至关重要的"底层名词"。

# 示例：海南封关新闻的正确拆解方向
- 不要写"政策红利"，要写"【境内关外】的法律隔离墙：二线封关如何重塑关税边界？"
- 不要写"外贸增长"，要写"【离岛免税】与【加工增值免关税】：海南如何抢夺东南亚的供应链中转权？"
- 不要写"营商环境"，要写"【RCEP】框架下的海南坐标：中国应对亚太经贸重构的'压力测试场'"。

分析要求：
1. 每个维度需要包含：
   - dimension: 维度名称（如：贸易地理学/主权信用/产业价值链等）
   - title: 硬核知识标题（包含核心概念）
   - insight: 一句话揭示底层逻辑
   - content: 详细分析（不仅讲现状，更要讲这个概念的历史背景和运作机制，200-400字）
   - anchors: 核心专业术语数组（3-5个）
   - icon: 图标名称（从以下选择：TrendingUp, Coins, BarChart2, Globe, TrendingDown, Activity, Zap, Target, Award）

2. 分析维度应该多样化，涵盖：
   - 地缘政治影响
   - 金融市场机制
   - 产业价值链重构
   - 政策监管逻辑
   - 历史背景与演变

3. 请以JSON格式返回，格式如下：
{
  "topic_name": "新闻主题标题",
  "viewpoints": [
    {
      "id": "v1",
      "dimension": "维度名称",
      "title": "硬核知识标题",
      "insight": "一句话揭示底层逻辑",
      "content": "详细分析内容",
      "anchors": ["核心专业术语1", "核心专业术语2", "核心专业术语3"],
      "icon": "TrendingUp"
    }
  ]
}

只返回JSON，不要包含其他文字说明。`;

  const userPrompt = `请分析以下新闻：

标题：${newsTitle}

内容：
${newsContent.slice(0, 4000)}`;

  try {
    const response = await axios.post<DeepSeekResponse>(apiUrl, {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 120000
    });

    const aiContent = response.data.choices[0].message.content;
    
    const jsonMatch = aiContent?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI返回格式不正确');
    }

    const result = JSON.parse(jsonMatch[0]);
    return result;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`API调用失败: ${error.response?.data?.error?.message || error.message}`);
    }
    throw new Error('AI分析失败，请稍后重试');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: '请提供新闻URL' },
        { status: 400 }
      );
    }

    console.log('开始分析新闻:', url);

    const { title, content } = await fetchNewsContent(url);
    
    console.log('成功获取新闻内容，标题:', title);
    
    if (!content || content.length < 100) {
      return NextResponse.json(
        { error: '无法获取足够的新闻内容，请尝试其他URL' },
        { status: 400 }
      );
    }

    console.log('开始调用 DeepSeek API...');
    const analysis = await callDeepSeekAPI(title, content);
    console.log('DeepSeek API 调用成功');

    return NextResponse.json({
      success: true,
      data: {
        title: analysis.topic_name || title,
        analysis: analysis
      }
    });
  } catch (error) {
    console.error('Analyze news error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '分析失败，请稍后重试' },
      { status: 500 }
    );
  }
}
