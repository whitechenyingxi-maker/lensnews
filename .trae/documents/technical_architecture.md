# Lens News - 技术架构文档

## 技术栈
- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **语言**: TypeScript
- **状态管理**: React Context + useReducer (关注功能)

## 项目结构

```
app/
├── (pages)/
│   ├── home/
│   │   └── page.tsx           # 主页 - 新闻推荐池
│   ├── following/
│   │   └── page.tsx           # 关注页 - 已关注新闻
│   └── news/
│       └── [id]/
│           └── page.tsx       # 深度分析页 - 单条新闻详情
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # 顶部导航栏（更新版）
│   │   └── CategoryNav.tsx    # 分类导航栏
│   ├── home/
│   │   ├── NewsCard.tsx       # 新闻卡片组件
│   │   └── NewsGrid.tsx       # 新闻网格布局
│   ├── news/
│   │   ├── NewsReader.tsx     # 新闻阅读器
│   │   ├── ConceptDirections.tsx  # 概念方向探索
│   │   └── KnowledgeDrawer.tsx    # 深度百科抽屉
│   ├── following/
│   │   └── FollowingCard.tsx  # 关注新闻卡片
│   └── common/
│       ├── FollowButton.tsx   # 关注按钮
│       └── EmptyState.tsx     # 空状态组件
├── context/
│   └── FollowingContext.tsx   # 关注状态管理
├── data/
│   └── newsData.ts            # 新闻数据
├── types/
│   └── index.ts               # TypeScript类型定义
├── page.tsx                   # 根页面（重定向到/home）
├── layout.tsx                 # 根布局
└── globals.css                # 全局样式
```

## 路由结构

| 路径 | 页面 | 功能 |
|------|------|------|
| `/` | 根页面 | 重定向到 `/home` |
| `/home` | 主页 | 新闻推荐池，分类浏览 |
| `/following` | 关注页 | 已关注新闻列表 |
| `/news/[id]` | 深度分析页 | 单条新闻360度分析 |

## 状态管理

### FollowingContext
管理用户关注的新闻列表：
- `followingIds: string[]` - 已关注的新闻ID列表
- `follow(newsId: string)` - 关注新闻
- `unfollow(newsId: string)` - 取消关注
- `isFollowing(newsId: string)` - 检查是否已关注
- 数据持久化到 localStorage

## 组件设计

### Navbar
- 固定在顶部
- Logo + 主导航链接（首页、关注）
- 当前页面高亮

### CategoryNav
- 横向滚动分类标签
- 分类：全部、财经、历史、旅游、军事、科技、国际
- 点击筛选新闻

### NewsCard
- 新闻标题
- 3句话核心总结（折叠/展开）
- 分类标签 + 发布时间
- 关注按钮
- 点击进入详情页

### NewsReader
- 新闻标题
- 核心要点（深蓝卡片）
- 正文内容

### ConceptDirections
- 5个概念方向卡片网格
- 点击打开抽屉

### KnowledgeDrawer
- 右侧滑出抽屉
- 方向总结 + 详细解读 + 延伸阅读

### FollowButton
- 关注/已关注状态切换
- 图标 + 文字
- 点击动画反馈

## 数据结构

```typescript
interface NewsItem {
  id: string;
  title: string;
  summary: string[];
  content: string;
  category: string;
  publishTime: string;
  conceptDirections: ConceptDirection[];
}

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

interface RelatedLink {
  title: string;
  url: string;
  source: string;
}
```

## 动画规范
- 页面切换：300ms fade
- 抽屉滑出：300ms ease-out
- 卡片悬停：150ms ease，上浮 + 阴影
- 按钮点击：100ms scale

## 响应式设计
- 桌面端：3列新闻网格
- 平板端：2列新闻网格
- 移动端：1列新闻网格
- 抽屉：桌面端 480px，移动端全屏
