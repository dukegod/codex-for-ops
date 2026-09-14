# AGENTS.md

> 这份文档既是给 AI 工具（Codex / Claude Code / Cursor / Aider 等）看的**项目记忆**，也是我们自己在 [03-项目记忆](docs/03-进阶技巧/03-项目记忆.md) 那篇文章里讲的"AGENTS.md 怎么写"的范例。

## 🎯 这个项目是啥

一本写给运营团队看的 **Codex 桌面端实战手册**。场景覆盖调研（竞品分析、行业研究、资料汇总、会议纪要）、数据处理（Excel 清洗、批量任务、表格分析、可视化）、进阶玩法（Skills、自动化、多 Agent、知识库）。

- **读者**：市场、调研、增长、数据的同事
- **形态**：纯 Markdown 文档仓库（没有代码、没有构建系统）
- **协议**：MIT
- **目标**：让运营零代码门槛把 Codex 用起来

## 📂 仓库结构

```
codex-for-ops/
├── README.md                  # 项目主页 + 文档目录
├── AGENTS.md                  # 本文件 · AI 工具的项目记忆
├── CONTENT_GUIDELINES.md      # ✍️ 写作规范（必读）
├── CONTRIBUTING.md            # 🤝 贡献流程（PR/Issue）
├── PUSH_GUIDE.md              # 🚀 推送到 GitHub 的命令指引
├── FAQ.md                     # ❓ 常见问题（仓库根目录单文件，不在 docs/ 下）
├── LICENSE                    # MIT
├── .gitignore                 # 已包含 .codex/ 等敏感目录
├── .github/ISSUE_TEMPLATE/    # Issue 模板（内容反馈 / 功能请求 / 模板投稿）
└── docs/
    ├── 00-入门/               # 新人必读，10 章
    ├── 01-调研场景/           # 调研岗场景，4 章
    ├── 02-数据处理场景/       # 数据岗场景，4 章
    ├── 03-进阶技巧/           # Skills / 自动化 / AGENTS.md / 多 Agent
    ├── 04-安全红线/           # 数据安全、权限、异常处理
    ├── 05-发布社区/           # 把方法论发到小红书（含 Skill 模板库）
    └── 06-知识库建设/         # Codex + Obsidian + Wiki 飞轮(单章)
```

数字前缀 `00-` `01-` 是为了**目录排序稳定**，别乱改。`README.md` 例外不加前缀。

## ✍️ 写 / 改内容

**严格遵守 [CONTENT_GUIDELINES.md](CONTENT_GUIDELINES.md)**，这是项目最高规范。这里只点几个 AI 工具最容易踩的坑：

- ✅ **场景故事开头**：先讲一个运营的真实一天，再讲功能。**禁止**直接抛功能定义。
- ✅ **Prompt 给完整可粘贴的**：代码块包起来，别给片段让人自己拼。
- ✅ **章末加更新日期**：`📅 本章最后更新：YYYY-MM-DD` + `✏️ 维护者：xxx`。
- ✅ **emoji 节制**：一章 5-8 个，用项目约定的 🎬 🎯 📋 🚀 💡 📝 ⚠️ 🔗，别为用而用。
- ❌ **不要**写「赋能/抓手/闭环/底层逻辑」。
- ❌ **不要**用「首先...其次...最后...」这种 AI 八股。
- ❌ **不要**写「如下图所示」但没图。
- ❌ **不要**写免责声明开头（「请注意，本文档不构成专业建议」之类）。
- 📏 **单章长度**：800-2000 字。短了没写透，长了分章节。

写新章节时，按 `docs/05-发布社区/`、`docs/06-知识库建设/` 里现有章节的范式对齐，Skill 模板参考 `docs/05-发布社区/templates/`，章节之间的引用用相对路径（GitHub 会自动渲染，不要用绝对 URL）。

## 🤝 提 PR / 贡献

看 [CONTRIBUTING.md](CONTRIBUTING.md)，核心几条：

| 类型 | 流程 |
|------|------|
| 改 typo / 措辞 | 直接提 PR，标题 `[fix] xxx` |
| 加新章节 | 先提 Issue 讨论 → 再提 PR，标题 `[add] xxx` |
| 改进现有章节 | 提 PR，标题 `[improve] xxx` |
| 翻译 | 联系维护者 |

任何 PR **都要先过一遍 CONTENT_GUIDELINES 的风格清单**，不合规范会被打回。

## 🚀 推送 / 初始化仓库

如果接手这个项目发现**还没有初始化 git / 还没推 GitHub**，按 [PUSH_GUIDE.md](PUSH_GUIDE.md) 走。两种方式二选一：

- **运营同事**：GitHub 网页 + GitHub Desktop（看 `docs/00-入门/08-提交到github.md`）
- **开发者**：GitHub 网页创建空仓库 + 本地 `git init && push`（看 PUSH_GUIDE 的方式 A）
- **装了 `gh` CLI**：直接 `gh repo create ... --push`（方式 B）

**注意**：本仓库不是 git 仓库时（你看到 PUSH_GUIDE 还没执行过），AI 工具做的任何文件改动都还只是本地文件，不会被版本管理。建议第一次接手先按 PUSH_GUIDE 初始化 + 推送一次。

## ⚠️ 红线（AI 工具特别注意）

1. **不要把任何个人 / 客户 / 公司敏感数据写进文档**。仓库会被公开发布（MIT）。
2. **不要碰 `.codex/` 目录**（已在 .gitignore）。那是本地 Codex 的 auth / sessions / logs，泄露出去意味着你的 Codex 账号可以被别人用。
3. **不要主动改 `CONTENT_GUIDELINES.md` 的核心规则**（写作风格、emoji 约定、敏感词清单）。要改就提 Issue 讨论，影响所有章节。
4. **不要随意改目录的数字前缀**（`00-` `01-`）。改了会影响 README 文档目录的排序和章节之间的相对引用。
5. **站点基础设施可自由调整**。`.vitepress/config.ts`、`package.json`、`pnpm-lock.yaml`、`.github/workflows/deploy-pages.yml`、`.github/workflows/lychee.yml`、`lychee.toml` 属于"站点基础设施"（VitePress 站点 + GitHub Pages 部署 + 死链 CI），维护者可自由调整，无需提 Issue。**其他**构建工具、CI、Linter、TypeScript 配置仍需先提 Issue 讨论。

## 🛠️ AI 工具的常见任务清单

如果你是被指派来这个仓库干活的 AI 工具（Codex / Claude Code / Cursor ...），下面这些是**典型任务**和**建议做法**：

### 任务 1：找一个章节改 typo / 措辞
1. 用 `grep` 或 `glob` 定位关键词在哪个 `.md` 文件
2. 读上下文 ±20 行确认是不是 typo
3. 改完顺手把章末 `📅 本章最后更新` 改成今天

### 任务 2：补一个新场景章节
1. 先看 `CONTENT_GUIDELINES` 的「章节模板」部分
2. 参考 `docs/01-调研场景/` 里已有的同类型章节，按相同结构写
3. 文件名按 `docs/XX-分类/NN-场景名.md` 格式
4. 在 `README.md` 的「文档目录」里加上新章节的链接
5. 章末加更新日期 + 维护者

### 任务 3：翻译整本手册（暂未支持）
本项目目前只接受中文版本，**不要主动翻译成其他语言**——除非维护者明确在 Issue 里说要。如果要翻译，按章节整体翻译，保持术语一致（"Codex 桌面端"、"Prompt 模板"、"技能" 等核心词保留中文）。

### 任务 4：检查文档目录里有没有死链
```bash
# 在仓库根目录跑
grep -rn "docs/" README.md CONTRIBUTING.md  # 列出所有相对链接
# 然后人工核对每个目标文件是否存在
```
或者用 `markdown-link-check` 之类的工具（如果用户授权安装）。

### 任务 5：批量重命名 / 移动章节
1. 先用 `git mv`（如果已是 git 仓库），不要用 `mv`
2. 同步更新 `README.md` 文档目录
3. 同步更新所有引用了这个路径的其他章节
4. 跑一遍上面的死链检查

### 任务 6：添加 .github/Issue 或 PR 模板
参考已有的 `.github/ISSUE_TEMPLATE/` 三个文件格式，保持风格一致（Markdown + emoji + 中文）。

## 📜 元信息

- **最后更新**：2026-09-14
- **维护者**：Codex for Ops 团队
- **本文件变更**：因为本项目是教人写 AGENTS.md 的，所以这个文件本身就是范例。改之前请三思，改之后记得更新底部日期 + 在 `docs/03-进阶技巧/03-项目记忆.md` 里如果引用了具体写法，**同步更新那篇文章**。
- **站点部署**：本仓库已接入 VitePress + GitHub Pages（`https://dukegod.github.io/codex-for-ops/`），站点配置文件见 `.vitepress/config.ts`，部署 CI 见 `.github/workflows/deploy-pages.yml`，死链检查 CI 见 `.github/workflows/lychee.yml`。