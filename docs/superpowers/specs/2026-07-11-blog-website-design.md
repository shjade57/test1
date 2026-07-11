# 博客网站设计

**日期：** 2026-07-11  
**状态：** 已批准  
**主题：** 基于 Astro 的个人技术博客

## 概述

一个个人技术博客，支持 Markdown 写作、代码高亮、标签分类，以及完整的周边功能。

## 技术栈

| 层 | 选择 | 原因 |
|---|---|---|
| 框架 | Astro v5 | 纯静态输出，Content Collections 类型安全，默认零 JS |
| 样式 | Tailwind CSS v4 | 原子化 CSS，快速迭代，集成 @astrojs/tailwind |
| 内容 | MDX | Markdown + 可嵌入组件 |
| 代码高亮 | Shiki | Astro 内置，主题丰富 |
| 搜索 | Pagefind | 纯静态搜索，无需后端 |
| 评论 | Giscus | 基于 GitHub Discussions，免费，对开发者友好 |
| 部署 | GitHub Pages / Vercel | 零成本静态托管 |

## 页面结构

```
/                   → 首页，文章列表 + 分页
/blog/[slug]        → 文章详情
/tags               → 标签云
/tags/[tag]         → 按标签筛选
/about              → 关于我
/search             → 搜索页
/rss.xml            → RSS 订阅
/sitemap.xml        → 站点地图
```

## 目录结构

```
src/
├── content/
│   └── blog/              ← MDX 文章放这里
├── pages/                 ← 路由页面
├── components/            ← Astro 组件
├── layouts/               ← 页面布局
├── styles/                ← 全局样式
└── utils/                 ← 工具函数（阅读时间等）
```

## 功能清单

| 功能 | 实现方式 | 优先级 |
|---|---|---|
| 文章列表 + 分页 | Astro Content Collections | P0 |
| 文章详情页 | MDX 渲染 + Shiki 高亮 | P0 |
| 标签系统 | Frontmatter tags + 标签页面 | P0 |
| 代码语法高亮 | Shiki（Astro 内置） | P0 |
| 暗色模式 | CSS 变量 + prefers-color-scheme | P0 |
| 响应式布局 | Tailwind 响应式工具类 | P0 |
| 关于页面 | Astro 静态页面 | P1 |
| 静态搜索 | Pagefind 构建后索引 | P1 |
| Giscus 评论 | Giscus Web Component | P1 |
| SEO meta + Open Graph | 每页面 frontmatter | P1 |
| RSS 订阅 | @astrojs/rss | P1 |
| Sitemap | @astrojs/sitemap | P1 |
| 阅读时间估算 | 工具函数 | P1 |

## 架构说明

- **Content Collections** 提供类型安全的 frontmatter 访问（title、date、tags、description）
- **默认无客户端框架** —— 仅 Pagefind 和 Giscus 以 Astro Islands 方式加载 JS
- **Tailwind v4** 使用 CSS-first 配置，无需 tailwind.config.js
- **暗色模式** 通过 CSS 自定义属性，由 `<html>` 上的 class 控制切换，默认跟随系统偏好，支持手动覆盖
- **标签** 在构建时通过 Astro 的 `getCollection()` 从文章 frontmatter 中提取

## 不做的事情

- 不做 CMS / 管理后台（直接写 MDX 文件）
- 不做用户认证
- 不做数据统计（有需要再加）
- 不做 Newsletter / 邮件订阅
- 不做多语言（仅中文）
- 不做图片画廊（支持文章内嵌普通图片）

## 验收标准

- [ ] `npm run dev` 能正常启动开发服务器
- [ ] 在 `content/blog/` 下新建 `.mdx` 文件自动出现在首页
- [ ] 代码块正确显示语法高亮
- [ ] 暗色模式切换可用且尊重系统偏好
- [ ] 搜索返回相关结果
- [ ] RSS 和 Sitemap 端点返回有效 XML
- [ ] 站点能成功构建为静态 HTML（`npm run build` 成功）
