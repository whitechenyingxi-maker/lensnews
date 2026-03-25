# Lens News - 产品需求文档

## 产品定位
干净整洁的新闻内容平台，提供感兴趣新闻的深度探索能力。

## 核心用户场景
1. **浏览发现** - 用户在主页浏览各分类下的热门新闻，发现感兴趣的话题
2. **深度阅读** - 用户对某条新闻感兴趣，进入深度分析页探索相关概念
3. **持续关注** - 用户关注新闻后，可以在关注页追踪该事件的最新进展

## 页面结构

### 1. 主页 (Home) - /home
**定位**：新闻推荐池，发现感兴趣的内容

**功能模块**：
- 顶部分类导航栏（财经、历史、旅游、军事、科技、国际等）
- 推荐新闻流（卡片式布局）
- 每条新闻卡片展示：
  - 新闻标题
  - 3句话核心总结
  - 分类标签
  - 发布时间
  - 关注按钮
- 点击卡片进入深度分析页

### 2. 深度分析页 (NewsDetail) - /news/[id]
**定位**：单条新闻的360度认知坐标系

**功能模块**：
- 新闻标题 + 核心要点（3句话总结）
- 正文内容
- 概念方向探索区（5个相关方向卡片）
- 右侧抽屉：点击方向卡片展示深度百科
- 关注/取消关注按钮

### 3. 关注页 (Following) - /following
**定位**：已关注新闻的追踪中心

**功能模块**：
- 已关注新闻列表
- 每条新闻显示：
  - 标题 + 核心总结
  - 最新进展提示（如有更新）
  - 上次阅读时间
  - 进入深度分析按钮
- 空状态提示（未关注任何新闻）

## 核心功能

### 关注系统
- 用户可以在主页或深度分析页关注新闻
- 关注后新闻会出现在关注页
- 支持取消关注
- 关注状态持久化（本地存储）

### 分类系统
- 财经：商业、金融、市场动态
- 历史：历史事件、文化考古
- 旅游：旅行目的地、文化体验
- 军事：国防、地缘政治
- 科技：科技创新、互联网
- 国际：全球新闻、外交关系

### 深度探索（根模块）
- 自动分析新闻内容
- 提取5个相关概念方向
- 每个方向提供：总结 + 详细解读 + 延伸阅读

## 视觉与交互规范

### 设计风格
- 极简主义、报刊感、高质感留白
- 清爽干净的阅读体验

### 配色方案
- 主文字色：深蓝 #1a202c
- 背景色：奶油白 #f7fafc
- 点缀色：智慧金 #d4af37
- 辅助色：灰色系用于层级区分

### 交互设计
- 平滑页面过渡
- 抽屉式侧边栏展示深度内容
- 卡片悬停效果
- 关注按钮状态反馈

## 数据结构

### NewsItem
```typescript
interface NewsItem {
  id: string;
  title: string;
  summary: string[]; // 3句话总结
  content: string;
  category: string;
  publishTime: string;
  conceptDirections: ConceptDirection[];
  isFollowing?: boolean;
  lastReadAt?: string;
  hasUpdate?: boolean;
}
```

### ConceptDirection
```typescript
interface ConceptDirection {
  id: string;
  title: string;
  shortDescription: string;
  summary: string;
  fullExplanation: string;
  relatedLinks: RelatedLink[];
  relatedTerms: string[];
  importance: 'high' | 'medium' | 'low';
}
```

## 未来扩展（雏型阶段不考虑）
- 用户订阅制
- AI 自动生成概念方向
- 实时新闻更新推送
- 用户评论和讨论
