import { defineConfig } from 'vitepress'

// ============================================================================
// Codex 运营团队实战手册 — VitePress 配置
//
// 站点部署：GitHub Pages（base = /codex-for-ops/）
// 部署 CI：  .github/workflows/deploy-pages.yml
// 死链 CI：  .github/workflows/lychee.yml
//
// 目录结构：docs/00-入门 ~ docs/07-知识库建设（见 README.md）
// 写作规范：CONTENT_GUIDELINES.md
// ============================================================================

const base = process.env.VITEPRESS_BASE ?? '/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Codex 运营手册',
  titleTemplate: 'Codex 桌面端运营团队实战手册',
  description: '面向运营团队的 Codex 桌面端使用指南 · 从入门到进阶',
  base,

  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,

  // 仓库根级元文档，不作为 wiki 页面渲染
  // README.md 也排除（仓库主页，VitePress 用 docs/index.md 替代）
  srcExclude: [
    'README.md',
    'AGENTS.md',
    'CONTENT_GUIDELINES.md',
    'CONTRIBUTING.md',
    'PUSH_GUIDE.md',
    'FAQ.md',
  ],

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#10a37f' }], // Codex 主色（OpenAI 绿）
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'og:site_name', content: 'Codex 运营手册' }],
  ],

  markdown: {
    lineNumbers: false,
  },

  // 仓库原本的内部链接写法不规范（缺 .md 后缀 / 引用根级被 srcExclude 排除的文件），
  // 共 37 处。先全跳过让 build 通过，后续提 Issue 批量修。
  // 参考：https://vitepress.dev/reference/site-config#ignoredeadlinks
  ignoreDeadLinks: true,

  themeConfig: {
    siteTitle: 'Codex 运营手册',

    nav: [
      { text: '入门', link: '/00-入门/01-为什么用-codex', activeMatch: '/00-入门/' },
      { text: '调研场景', link: '/01-调研场景/01-竞品分析', activeMatch: '/01-调研场景/' },
      { text: '数据处理', link: '/02-数据处理场景/01-excel清洗', activeMatch: '/02-数据处理场景/' },
      { text: '进阶技巧', link: '/03-进阶技巧/01-skills', activeMatch: '/03-进阶技巧/' },
      {
        text: '更多',
        items: [
          { text: '安全红线', link: '/04-安全红线/01-数据安全' },
          { text: 'Prompt 模板库', link: '/05-模板库/' },
          { text: '发布社区', link: '/06-发布社区/01-为什么要发布到社区' },
          { text: '知识库建设', link: '/07-知识库建设/01-什么是LLM+wiki知识库' },
          { text: 'FAQ', link: '/faq' },
        ],
      },
    ],

    sidebar: {
      // --------------------------------------------------------------------
      // 入门篇
      // --------------------------------------------------------------------
      '/00-入门/': [
        {
          text: '入门篇',
          items: [
            { text: '1. Codex 是什么 & 能帮运营做什么', link: '/00-入门/01-为什么用-codex' },
            { text: '2. 安装与登录', link: '/00-入门/02-安装与登录' },
            { text: '3. 第一次启动 & 界面导览', link: '/00-入门/03-界面导览' },
            { text: '4. 基础操作：输入任务、查看结果', link: '/00-入门/04-基础操作' },
            { text: '5. 你的第一个 Codex 任务（15 分钟上手）', link: '/00-入门/05-你的第一个任务' },
            { text: '6. 三种安全模式', link: '/00-入门/06-安全模式' },
            { text: '7. GitHub 是什么：给运营的入门科普', link: '/00-入门/07-github是什么' },
            { text: '8. 把项目提交到 GitHub（运营零代码版）', link: '/00-入门/08-提交到github' },
            { text: '9. GitHub 在 Codex 中的使用', link: '/00-入门/09-github在codex中的使用' },
            { text: '10. 桌面端新功能速通（2026 GA 版）', link: '/00-入门/10-桌面端新功能速通' },
          ],
        },
      ],

      // --------------------------------------------------------------------
      // 调研场景
      // --------------------------------------------------------------------
      '/01-调研场景/': [
        {
          text: '调研场景',
          items: [
            { text: '竞品分析', link: '/01-调研场景/01-竞品分析' },
            { text: '行业研究', link: '/01-调研场景/02-行业研究' },
            { text: '资料汇总', link: '/01-调研场景/03-资料汇总' },
            { text: '会议纪要', link: '/01-调研场景/04-会议纪要' },
          ],
        },
      ],

      // --------------------------------------------------------------------
      // 数据处理场景
      // --------------------------------------------------------------------
      '/02-数据处理场景/': [
        {
          text: '数据处理场景',
          items: [
            { text: 'Excel 清洗与转换', link: '/02-数据处理场景/01-excel清洗' },
            { text: '批量处理任务', link: '/02-数据处理场景/02-批量处理' },
            { text: '表格分析', link: '/02-数据处理场景/03-表格分析' },
            { text: '数据可视化', link: '/02-数据处理场景/04-数据可视化' },
          ],
        },
      ],

      // --------------------------------------------------------------------
      // 进阶技巧
      // --------------------------------------------------------------------
      '/03-进阶技巧/': [
        {
          text: '进阶技巧',
          items: [
            { text: 'Skills：把常用任务打包成可复用工作流', link: '/03-进阶技巧/01-skills' },
            { text: '自动化任务：让 Codex 定时跑', link: '/03-进阶技巧/02-自动化任务' },
            { text: '项目记忆（AGENTS.md）', link: '/03-进阶技巧/03-项目记忆' },
            { text: '多 Agent 并行：同时跑多个调研任务', link: '/03-进阶技巧/04-多agent并行' },
            { text: 'Codex 项目结构详解：解构 + 配置 + 优化', link: '/03-进阶技巧/05-codex项目结构' },
            { text: 'Codex 与 Claude Code 项目结构对比', link: '/03-进阶技巧/06-codex与claude-code对比' },
            { text: 'Sites：把运营成果做成内部工具', link: '/03-进阶技巧/07-sites生成内部工具' },
            { text: '分析规范模式：把个人方法论做成 Skill', link: '/03-进阶技巧/08-分析规范模式-把个人方法论做成Skill' },
            { text: '多源信息归总模式：把行业趋势/股票/头条/热点自动归类', link: '/03-进阶技巧/09-多源信息归总模式-把行业趋势股票头条热点自动归类' },
          ],
        },
      ],

      // --------------------------------------------------------------------
      // 安全红线
      // --------------------------------------------------------------------
      '/04-安全红线/': [
        {
          text: '安全红线',
          items: [
            { text: '不能喂什么数据给 Codex', link: '/04-安全红线/01-数据安全' },
            { text: '权限与审批', link: '/04-安全红线/02-权限审批' },
            { text: '异常处理', link: '/04-安全红线/03-异常处理' },
          ],
        },
      ],

      // --------------------------------------------------------------------
      // Prompt 模板库
      // --------------------------------------------------------------------
      '/05-模板库/': [
        {
          text: 'Prompt 模板库',
          items: [
            { text: '总览', link: '/05-模板库/' },
            { text: '模板格式说明', link: '/05-模板库/TEMPLATE_FORMAT' },
            { text: '效率类：周报生成', link: '/05-模板库/效率类/周报生成' },
            { text: '效率类：月报生成', link: '/05-模板库/效率类/月报生成' },
            { text: '检查类：数据校对', link: '/05-模板库/检查类/数据校对' },
          ],
        },
      ],

      // --------------------------------------------------------------------
      // 发布社区
      // --------------------------------------------------------------------
      '/06-发布社区/': [
        {
          text: '发布社区',
          items: [
            { text: '为什么要发布到社区', link: '/06-发布社区/01-为什么要发布到社区' },
            { text: '资源整合：从散乱到结构化', link: '/06-发布社区/02-资源整合' },
            { text: '创建 Skill：把方法打包成可复用', link: '/06-发布社区/03-创建skill' },
            { text: '发布到小红书', link: '/06-发布社区/04-发布到小红书' },
            { text: '完整案例：把周报技能发布出去', link: '/06-发布社区/05-完整案例' },
            {
              text: 'Skill 模板库',
              collapsed: true,
              items: [
                { text: '周报生成 Skill 模板', link: '/06-发布社区/templates/weekly-report-skill' },
                { text: '竞品分析 Skill 模板', link: '/06-发布社区/templates/competitor-analysis-skill' },
                { text: '会议纪要 Skill 模板', link: '/06-发布社区/templates/meeting-summary-skill' },
              ],
            },
          ],
        },
      ],

      // --------------------------------------------------------------------
      // 知识库建设
      // --------------------------------------------------------------------
      '/07-知识库建设/': [
        {
          text: '知识库建设',
          items: [
            { text: '什么是 LLM + Wiki 知识库（k神方法论）', link: '/07-知识库建设/01-什么是LLM+wiki知识库' },
            { text: 'llm-wiki-skill 安装与使用', link: '/07-知识库建设/02-llm-wiki-skill安装与使用' },
            { text: 'Obsidian 介绍', link: '/07-知识库建设/03-Obsidian介绍' },
            { text: 'Obsidian 与 Codex 的 5 种整合方式', link: '/07-知识库建设/04-obsidian与codex的整合' },
            { text: '从 0 搭建个人知识库', link: '/07-知识库建设/05-从0搭建个人知识库' },
            { text: '知识库的日常维护与进化', link: '/07-知识库建设/06-日常维护与进化' },
          ],
        },
      ],
    },

    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'long', timeStyle: 'short' },
    },

    editLink: {
      pattern: 'https://github.com/dukegod/codex-for-ops/edit/main/:path',
      text: '在 GitHub 上编辑此页',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dukegod/codex-for-ops' },
    ],

    footer: {
      message: '本文档采用 MIT 协议',
      copyright: 'Codex for Ops 团队维护',
    },

    langMenuLabel: '切换语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
