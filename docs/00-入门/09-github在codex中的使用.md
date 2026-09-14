# 9. GitHub 在 Codex 中的使用：让 Codex 直接读你的仓库

> 让 Codex 跟 GitHub 联动：读仓库、提 Issue、Codex 自动跑任务

## 🎬 场景故事

小陈团队已经把所有运营资料放到了 GitHub 上。但每次用 Codex 处理这些资料时，都要：
1. 先把文件从 GitHub 下载下来
2. 放到本地文件夹
3. 让 Codex 处理
4. 处理完再上传回 GitHub

**这一来一回太麻烦了**。而且团队成员改的资料，Codex 永远读不到最新版。

**解法：让 Codex 直接连接 GitHub**。

## 🎯 你将学到

- Codex 怎么读 GitHub 上的仓库
- 怎么用 Codex 在 GitHub 上提 Issue / 评论
- 怎么配置 GitHub 集成（MCP，简单版）
- 3 个真实场景：自动同步资料、Issue 转任务、Codex 跑 CI
- **不需要写代码**

## 📋 一句话讲清楚

Codex 通过 **MCP 协议** 连接 GitHub。MCP = Model Context Protocol，你可以理解为「Codex 跟外部工具对话的标准」。

连上之后，Codex 能：

| 能干啥 | 对运营有啥用 |
|------|----------|
| 读 GitHub 仓库的文件 | 直接读团队 GitHub 上的最新资料，不用下载 |
| 搜索 GitHub Issues | 找到相关的历史反馈/任务 |
| 创建 GitHub Issue | 让 Codex 帮你建任务追踪 |
| 评论 Issue | 让 Codex 自动回复/讨论 |
| 创建 Pull Request | 提交修改建议（运营一般用不到） |

## 🎯 3 个真实场景

### 场景 1：Codex 读 GitHub 上的团队资料

**痛点**：团队资料在 GitHub 上，Codex 默认读不到。每次都要下载。

**解法**：让 Codex 直接连 GitHub。

```
你：帮我读 https://github.com/你的团队/运营资料 仓库里的「6 月活动复盘.md」文件，总结一下

Codex：[连上 GitHub → 读文件 → 总结给你]
```

**价值**：
- 永远读最新版本（团队成员刚改的也能读到）
- 不用每次下载上传
- 多人协作不打架

### 场景 2：用 GitHub Issue 追踪 Codex 跑的任务

**痛点**：Codex 跑的任务没有追踪机制，跑完了就忘了，下次想找找不到。

**解法**：让 Codex 把任务创建成 GitHub Issue。

```
你：分析这个仓库里的销售数据，生成 6 月报告，然后建一个 Issue 追踪这次任务

Codex：
1. [读仓库数据]
2. [生成报告]
3. [自动创建 Issue #42：6 月销售报告生成任务]
4. [Issue 描述里附上报告链接]
```

**价值**：
- 所有任务都在 GitHub Issue 里有记录
- 可以 @ 团队成员评论
- 状态可追踪（待处理/进行中/已完成）

### 场景 3：Codex 在 GitHub Actions 里跑（自动化）

**痛点**：每周要 Codex 自动生成周报，但 Codex 是桌面端，没法 24 小时跑。

**解法**：用 GitHub Actions 在云端定时跑 Codex CLI。

> ⚠️ 这一节对运营难度较高，**建议你先找团队开发者帮忙配一次**，配好后你就能用了。

```
每周一早 9 点 → GitHub Actions 自动启动 → 跑 Codex CLI → 生成报告 → 提交到仓库
```

**价值**：
- 不需要电脑开着
- 团队成员随时能看到结果
- 失败了有邮件提醒

## 🚀 操作步骤

### Step 1：生成 GitHub Personal Access Token（PAT）

这是让 Codex 访问你 GitHub 仓库的「钥匙」。

1. 登录 GitHub → 点右上角头像 → **Settings**
2. 左侧最下面 → **Developer settings**
3. 左侧 → **Personal access tokens → Tokens (classic)**
4. 点 **Generate new token → Generate new token (classic)**
5. 填写：
   - **Note**：写个名字，比如 `codex-access`
   - **Expiration**：选 90 天（过期了重新生成）
   - **Scopes**：勾这几个就够
     - ✅ `repo`（完整仓库访问）
     - ✅ `read:org`（读组织信息，可选）
     - ✅ `write:issues`（创建/评论 Issue）
6. 点 **Generate token**
7. **复制 token 保存好**（这个只显示一次，丢了要重新生成）

> 🚨 **重要**：token 相当于密码，**不要分享给任何人、不要提交到仓库**。

### Step 2：在 Codex 里配置 GitHub MCP

> 这一步涉及配置文件，运营可能要请开发者帮一次。但配好后你就能直接用。

打开 Codex 桌面端：

1. **打开设置**（右上角 `⚙`）
2. 找到 **MCP Servers**（或 Plugins / Integrations）
3. 点 **Add MCP Server**
4. 填写：

```
┌─────────────────────────────────────────────────┐
│  Add MCP Server                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Name:  [GitHub                               ] │
│                                                 │
│  Command:                                       │
│  [npx -y @modelcontextprotocol/server-github  ] │
│                                                 │
│  Environment Variables:                         │
│  ┌─────────────────────────────────────────┐   │
│  │ GITHUB_PERSONAL_ACCESS_TOKEN:           │   │
│  │ [粘贴你的 PAT                        ]   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│                              [Save]  [Cancel]  │
└─────────────────────────────────────────────────┘
```

5. 点 **Save**
6. 重启 Codex（让 MCP 生效）

### Step 3：让 Codex 读你的仓库

Codex 重启后，新建任务试试：

```
帮我读 https://github.com/你的用户名/codex-for-ops 仓库里 docs/00-入门/ 这个目录，
列出所有文件，告诉我每个文件大概讲什么
```

**预期结果**：
- Codex 会用 GitHub MCP 工具读仓库
- 列出文件清单
- 给每个文件一个简短摘要

### Step 4：用 Codex 创建 Issue

```
帮我在 https://github.com/你的用户名/codex-for-ops 仓库创建一个 Issue：
- 标题：运营团队 Codex 培训需求收集
- 内容：列出几个常见的运营痛点，请团队成员投票

GitHub Issue 模板：

## 背景
我们准备给运营团队做一次 Codex 培训。

## 请投票（你最希望培训覆盖哪个场景？）

- [ ] 竞品分析
- [ ] 周报生成
- [ ] Excel 数据处理
- [ ] 会议纪要
- [ ] 其他：___
```

**预期结果**：
- Codex 调用 GitHub MCP 创建 Issue
- 返回 Issue URL
- 你点 URL 能看到新建的 Issue

### Step 5：让 Codex 评论/关闭 Issue

```
帮我在 Issue #42 下面加一条评论：「Codex 已完成这份报告，请大家 review」
```

```
帮我在 Issue #42 关闭并评论：「数据有误，待重新整理」
```

## 📋 3 种 GitHub 集成方式对比

| 方式 | 难度 | 适合谁 | 运营能否自己搞 |
|------|------|------|----------|
| **MCP 桌面端集成** | ⭐⭐ 中等 | 个人用 Codex 处理 GitHub 资料 | 需要开发者帮配一次 |
| **GitHub Actions 跑 Codex CLI** | ⭐⭐⭐ 较难 | 团队自动化、定时任务 | 需要开发者配 |
| **GitHub 网页 + Codex 网页版配合** | ⭐ 最简单 | 不常集成、偶尔用 | ✅ 完全可以 |

**给运营的建议**：
- **偶尔用** → 直接在 GitHub 网页 + ChatGPT 网页版配合（最简单）
- **经常用** → 让开发者帮你配 MCP（一次性投入，长期受益）
- **要自动化** → 让开发者配 GitHub Actions

## 🎯 真实可复制的 Prompt 模板

### Prompt 1：Codex 读 GitHub 仓库

```
帮我读 GitHub 仓库 https://github.com/[用户名]/[仓库名] 里的 [路径/文件名]，
[具体任务：总结/分析/翻译/对比]。

要求：
1. 读取最新的版本（如果有多个分支，优先读 main 分支）
2. [具体要求 1]
3. 输出格式：[markdown / 表格 / 摘要]
```

### Prompt 2：Codex 在 GitHub 创建 Issue

```
帮我在 GitHub 仓库 https://github.com/[用户名]/[仓库名] 创建一个 Issue：

标题：[简洁描述]

内容：
[详细描述，可包含背景、需求、验收标准]

Label（标签）：[bug / enhancement / documentation]
Assignee（负责人）：@[GitHub 用户名]
```

### Prompt 3：Codex 总结仓库所有 Issue

```
帮我读 GitHub 仓库 https://github.com/[用户名]/[仓库名] 的所有 open 状态的 Issue，
按状态分类汇总：
- 待处理（没人接的）
- 进行中（已分配）
- 阻塞（评论里有"等 XX"或"卡住了"）

每个 Issue 用一句话说清楚是啥，最后输出一个汇总表。
```

### Prompt 4：Codex 把任务结果发到 Issue 评论

```
我刚完成了 [任务描述]，结果保存在 [文件路径]。

请帮我在 GitHub Issue #[编号] 加一条评论：
- 说明任务已完成
- 简要说明结果（不超过 100 字）
- 附上结果文件的链接（相对路径）
```

## ⚠️ 安全提醒

### 🚨 不要泄露 GitHub PAT

Personal Access Token 相当于你的 GitHub 密码，**绝对不要**：
- ❌ 发到群里
- ❌ 写在 Codex 的 prompt 里
- ❌ 提交到 GitHub 仓库
- ❌ 截图发给别人

**泄露了怎么办**：
1. 立刻去 GitHub Settings → Developer settings → PAT
2. 找到这个 token → 点 **Revoke**（撤销）
3. 重新生成一个新 token

### 🚨 不要给 Codex 过大的权限

生成 PAT 时，**只勾你需要的 scope**。不要无脑全选。
- 运营读仓库 + 创建 Issue → 只勾 `repo` + `write:issues`
- 不用管组织的 → 不要勾 `admin:org`

### 🚨 Codex 创建的 PR/Issue 要人工审核

Codex 能自动创建 PR、Issue，但 **你必须人工审核一遍再合并/发布**。
Codex 可能：
- 创建重复的 Issue
- 提交信息写错
- 评论里说错话

## 🎯 运营使用 GitHub 集成的最常见误区

### ❌ 误区 1：把所有事都让 Codex 在 GitHub 上做

GitHub 上有些事**不需要 Codex**：
- 简单的文件上传 → 直接网页拖
- 看历史 → 直接网页看
- 评论 → 直接网页回

**只用 Codex 做有价值的部分**：
- 读多个文件做总结
- 批量分析 Issue
- 跨文件/跨仓库的信息整合

### ❌ 误区 2：以为 Codex 能直接改 GitHub 上的文件

Codex 读 GitHub 文件没问题，但**直接改 GitHub 文件**需要走 PR 流程，比较复杂。

**实际工作流**：
1. Codex 读 GitHub 文件
2. 生成新的内容（保存到本地）
3. 你本地 review
4. 通过 GitHub Desktop / 网页把新内容提交回 GitHub

### ❌ 误区 3：把所有文件都堆在 GitHub

GitHub 不适合：
- 大文件（> 100MB）
- 频繁变动的实时数据
- 不需要协作的文件（比如只是你一个人看的）

**判断标准**：如果这个文件**需要多人协作 + 历史追溯**，才放 GitHub。

## 🚀 下一步

- 想试试 MCP 集成 → 让开发者帮你配一次（参考 Step 2）
- 想做自动化 → 看 [进阶篇 - 自动化任务](../03-进阶技巧/02-自动化任务.md)
- 遇到问题 → 看 [FAQ](https://github.com/dukegod/codex-for-ops/blob/main/FAQ.md) 或 [异常处理](../04-安全红线/03-异常处理.md)

---

> 📅 本章最后更新：2026-06-30
> ✏️ 维护者：Codex for Ops 团队