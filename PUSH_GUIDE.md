# 推送到 GitHub 指引（开发者命令行版）

> 本地仓库已经写好，按照以下步骤推送到你的 GitHub

## 👥 读者分流

- **运营同事**（不熟命令行、想用 GitHub 网页/GitHub Desktop 上传）→ 看 [入门篇第 7 章：把项目提交到 GitHub 运营零代码版](docs/00-入门/07-提交到github.md)
- **开发者**（熟悉 git 命令）→ 继续看本文档

---

## 📋 当前状态

- 仓库路径：`/Users/liuhui15/minimax/projects/codex-for-ops/`
- 当前是**本地仓库**，还没推到 GitHub
- 文件结构：

```
codex-for-ops/
├── README.md                      # 项目主页
├── LICENSE                        # MIT 协议
├── CONTRIBUTING.md                # 贡献指南
├── CONTENT_GUIDELINES.md          # 内容规范
├── PUSH_GUIDE.md                  # 本文件
├── AGENTS.md                      # AI 工具的项目记忆
├── FAQ.md                         # FAQ 总章（仓库根目录，单文件）
├── .gitignore
├── docs/
│   ├── 00-入门/                   # 8 个章节
│   ├── 01-调研场景/               # 4 个章节
│   ├── 02-数据处理场景/           # 4 个章节
│   ├── 03-进阶技巧/               # 6 个章节
│   ├── 04-安全红线/               # 3 个章节
│   ├── 05-模板库/                 # Prompt 模板库
│   ├── 06-发布社区/               # 发布到小红书（含 Skill 模板库）
│   └── 07-知识库建设/             # LLM + Wiki + Obsidian + Codex
└── .github/
    └── ISSUE_TEMPLATE/            # Issue 模板
```

## 🚀 推送步骤（两种方式任选）

### 方式 A：用 GitHub 网页创建空仓库，然后本地 push（推荐）

#### Step 1：在 GitHub 网页创建仓库

1. 打开 https://github.com/new
2. 填写：
   - **Repository name**：`codex-for-ops`（或你喜欢的名字，比如 `codex-handbook`）
   - **Description**：Codex 桌面端运营团队实战手册 · 从入门到进阶
   - **Public / Private**：按你的需要选（团队内部用选 Private）
   - **不要勾选** Add a README / Add .gitignore / Add license（我们本地已经有了）
3. 点 **Create repository**

#### Step 2：本地初始化并 push

把下面的命令**整段复制粘贴**到终端执行（在 `/Users/liuhui15/minimax/projects/codex-for-ops/` 目录下）：

```bash
cd /Users/liuhui15/minimax/projects/codex-for-ops

# 初始化 git
git init

# 配置 user（如果还没配过）
git config user.name "你的名字"
git config user.email "你的邮箱"

# 第一次提交
git add .
git commit -m "docs: 初始化 Codex 运营手册

- 入门篇 5 章：为什么用、装与登录、界面、基础操作、安全模式
- 调研场景 4 章：竞品分析、行业研究、资料汇总、会议纪要
- 数据处理 4 章：Excel 清洗、批量处理、表格分析、可视化
- 进阶技巧 4 章：Skills、自动化、项目记忆、多 Agent
- 安全红线 3 章：数据安全、权限审批、异常处理
- FAQ 30 问 + Prompt 模板库"

# 关联远程仓库（替换成你的用户名/仓库名）
git remote add origin https://github.com/你的用户名/codex-for-ops.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

#### Step 3：验证

打开 `https://github.com/你的用户名/codex-for-ops`，应该能看到所有文档。

### 方式 B：用 GitHub CLI（如果你装了 gh 并登录）

```bash
cd /Users/liuhui15/minimax/projects/codex-for-ops

# 登录（如果还没登录）
gh auth login

# 创建仓库并 push
gh repo create codex-for-ops \
  --public \
  --description "Codex 桌面端运营团队实战手册 · 从入门到进阶" \
  --source=. \
  --remote=origin \
  --push
```

## ⚠️ 推送前的检查清单

推送前确认以下都做好了：

- [ ] README.md 里的「文档目录」所有链接都是相对路径（已经处理好了）
- [ ] 没有把敏感数据提交（比如 `~/.codex/auth.json`，已在 .gitignore 里）
- [ ] LICENSE 文件是 MIT（已经是）
- [ ] 至少自己 review 了一遍所有章节

## 🔧 推送后的设置

### 启用 GitHub Pages（可选，让文档有网站）

1. 仓库 → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, / (root)
4. Save

几分钟后，访问 `https://你的用户名.github.io/codex-for-ops/` 就能看到文档。

### 启用 Issue 和 PR 模板

GitHub 会自动识别 `.github/ISSUE_TEMPLATE/` 目录下的文件，用户提 Issue 时会自动出现。

### 添加 About 区域（仓库右上角）

点仓库右上角 ⚙ 齿轮，填写：
- **Description**：Codex 桌面端运营团队实战手册 · 从入门到进阶
- **Website**：（如果启用了 GitHub Pages，填上）
- **Topics**：`codex`、`openai`、`运营手册`、`ai-tools`

## 📝 后续维护

### 添加新内容

```bash
cd /Users/liuhui15/minimax/projects/codex-for-ops

# 写新文件...

# 提交
git add .
git commit -m "docs(xxx): 新增 xxx"
git push
```

### 接收他人贡献

让别人 fork 你的仓库，然后提 PR。

合并 PR 流程：
1. Review 代码
2. 检查是否符合 [CONTENT_GUIDELINES.md](CONTENT_GUIDELINES.md)
3. 在 GitHub 上点「Merge pull request」

## 🤝 需要帮忙

如果推送过程遇到问题：

- 推送时提示 `Permission denied` → 检查 GitHub 账号是否登录
- 推送时提示 `Repository not found` → 检查仓库名拼写
- 推送时提示 `Updates were rejected` → 先 `git pull --rebase origin main` 再 push
- 其他问题 → 提 Issue 问我

---

> 📅 本章最后更新：2026-06-30