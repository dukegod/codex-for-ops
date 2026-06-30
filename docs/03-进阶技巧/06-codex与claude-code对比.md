# 6. Codex 与 Claude Code 项目结构对比

> 如果你用过 Claude Code，这章帮你快速迁移理解；如果没用过，可以跳过

## 🎬 这章是给谁看的

| 你的情况 | 推荐阅读 |
|--------|--------|
| **没用过 Claude Code，直接用 Codex** | ❌ 跳过本章，看 [5. Codex 项目结构详解](05-codex项目结构.md) 就够了 |
| **正在用 Claude Code，想了解 Codex** | ✅ 重点看「对应关系表」「主要差异」 |
| **正在评估选 Codex 还是 Claude Code** | ✅ 看完整章 |

**这篇不重复 Codex 本身的结构讲解**——那个在 [5. Codex 项目结构详解](05-codex项目结构.md)，请先看那一篇。

## 🎯 你将学到

- Codex 与 Claude Code 的**对应关系表**
- 两者的**主要差异**（为什么选其中一个/另一个）
- **迁移指南**：从 Claude Code 切到 Codex 需要改什么
- 选型建议

## 🔄 对应关系表

| 概念 | Claude Code | Codex | 说明 |
|------|----------|----------|------|
| **项目记忆文件** | `CLAUDE.md` | `AGENTS.md` | Codex 用 AGENTS.md，更通用 |
| **本地覆盖文件** | `CLAUDE.local.md` | `AGENTS.override.md` | 机制类似 |
| **MCP 配置** | `.mcp.json`（独立文件） | `[mcp_servers.*]` 块（在 config.toml 里） | Codex 统一在 TOML 里 |
| **全局配置** | `~/.claude/settings.json` | `~/.codex/config.toml` | Codex 用 TOML 格式 |
| **本地配置** | `~/.claude/settings.local.json` | 项目级 `.codex/config.toml` | — |
| **规则目录** | `rules/*.md` | `AGENTS.md` 多章节 / 项目根多文件 | Codex 不强制目录化 |
| **自定义命令** | `commands/<name>.md` | Skills（`skills/<name>/SKILL.md`） | 概念类似但 Codex 更结构化 |
| **可复用工作流** | `skills/<name>/` | `skills/<name>/` | **直接对应**，结构几乎一样 |
| **子代理** | `agents/<name>.md` | Plugins（`plugins.<name>`） | Codex 把 Agent 放到 Plugins 里 |
| **生命周期钩子** | `hooks/<name>.sh` 等 | `[hooks]` 配置块（TOML） | Codex 用 TOML 数组 |
| **管理员约束** | 无（通过 Claude Code for Enterprise 管控） | `requirements.toml` | Codex 内置企业级管控 |
| **配置预设** | 无（要自己写脚本切换） | `[profiles.*]` | Codex 内置 Profile 系统 |
| **跨会话记忆** | MEMORY.md（手动维护） | memories/（自动提取） | 机制完全不同 |

## 🆚 主要差异

### 差异 1：配置格式

| | Claude Code | Codex |
|---|---|---|
| **格式** | JSON（多个文件） | TOML（统一文件） |
| **例子** | settings.json + commands/ + agents/ + hooks/ 散落多处 | config.toml 统一管理 |
| **优势** | 模块化、单一职责 | 紧凑、便于版本控制 |
| **劣势** | 文件多、新手找不到 | 单文件可能变长 |

**迁移影响**：
- Claude Code 的 `settings.json` → Codex 的 `config.toml`（需要翻译字段名）
- Claude Code 的 `.mcp.json` → Codex 的 `[mcp_servers.*]` 配置块

### 差异 2：Skills vs Commands

| | Claude Code | Codex |
|---|---|---|
| **Skills 位置** | `~/.claude/skills/<name>/SKILL.md` | `~/.codex/skills/<name>/SKILL.md` |
| **结构** | SKILL.md + scripts + references | SKILL.md + scripts + references + assets |
| **触发方式** | 手动调用 | 手动 + 自动（按上下文） |
| **共享** | 团队 Git 共享 | 团队 Git 共享 |

**直接对应**，几乎不用改。

### 差异 3：子代理机制

| | Claude Code | Codex |
|---|---|---|
| **定义** | `agents/<name>.md` 独立文件 | Plugins（`plugins.<name>` 配置块） |
| **调用** | `spawn_agent` 工具 | `spawn_agent` 工具 |
| **并发** | Team 系统 | `max_threads` 配置 |
| **团队协作** | TeamCreate / TaskCreate / SendMessage | 通过 Plugins 共享 |

**迁移影响**：
- Claude Code 的 `agents/code-reviewer.md` → Codex 的 Plugin 配置
- Claude Code 的 Team 协作模式 → Codex 通过 Plugins + 并发线程

### 差异 4：钩子（Hooks）

| | Claude Code | Codex |
|---|---|---|
| **定义方式** | 独立 `.sh` 文件 + JSON 配置 | 全部在 `[hooks]` TOML 配置块里 |
| **事件** | PreToolUse / PostToolUse / Stop 等 | 同样支持 |
| **优势** | 可独立版本控制、可测试 | 配置集中、易管理 |

**迁移影响**：
- Claude Code 的 `validate-bash.sh` → Codex 的 `[hooks.pre_tool_use]` 配置项

### 差异 5：记忆系统

| | Claude Code | Codex |
|---|---|---|
| **类型** | 手动维护 `MEMORY.md` | 自动提取 `~/.codex/memories/` |
| **触发** | 你告诉它"记住这个" | 后台自动从会话提取 |
| **控制** | 完全手动 | 可关闭、可配置 |
| **质量** | 取决于你写得多仔细 | 取决于 Codex 提取算法 |

**这是最大差异**：
- Claude Code 让你自己控制
- Codex 自动提取（开箱即用，但默认关闭）
- 你用 Codex 的话建议**开起来**，省得手写

### 差异 6：模型选择

| | Claude Code | Codex |
|---|---|---|
| **默认模型** | Claude Sonnet 4 / Opus 4 | GPT-5.4 / GPT-5.4-mini |
| **推理力度** | Extended Thinking（开关） | `model_reasoning_effort`：low / medium / high / xhigh |
| **自定义 Provider** | 通过环境变量 | 通过 `[model_providers.*]` 配置块 |

**迁移影响**：
- 用 Codex 后模型切换要从「Claude 系列」切到「GPT 系列」
- 如果团队已经习惯 Claude 的输出风格，需要重新调 prompt

### 差异 7：管理员管控

| | Claude Code | Codex |
|---|---|---|
| **企业管控** | Claude Code for Enterprise（黑盒） | `/etc/codex/requirements.toml`（透明） |
| **可定制度** | 较低 | 高（白名单/黑名单/网络控制） |
| **透明性** | 黑盒 | 文件直接可读 |

**Codex 的优势**：IT 管理员能直接编辑文件管控，透明可审计。

### 差异 8：生态集成

| | Claude Code | Codex |
|---|---|---|
| **内置 Plugins** | 部分第三方 | Slack / Figma / Notion / Cloudflare / GitHub / 数据分析插件 / 销售插件 |
| **Plugin 市场** | 较新 | 已经比较成熟 |
| **MCP 支持** | 支持 | 支持 |
| **多端** | macOS / Linux / Windows（WSL2） | macOS（原生）/ Windows（原生）/ Linux |

**Codex 的优势**：
- 桌面端在 Windows 上**原生支持**（不用 WSL2）
- Plugins 生态更丰富

## 🔀 迁移指南：从 Claude Code 切到 Codex

### Step 1：迁移配置

| Claude Code 文件 | 操作 | Codex 对应 |
|----------|------|----------|
| `CLAUDE.md` | 改名 + 改内容 | `AGENTS.md`（内容大部分可复用） |
| `CLAUDE.local.md` | 改名 | `AGENTS.override.md` |
| `.mcp.json` | 翻译字段 | 写到 `config.toml` 的 `[mcp_servers.*]` |
| `~/.claude/settings.json` | 翻译字段 | 写到 `~/.codex/config.toml` |
| `~/.claude/commands/*.md` | 改格式 | `~/.codex/skills/<name>/SKILL.md` |
| `~/.claude/skills/<name>/` | **直接复制** | `~/.codex/skills/<name>/`（**几乎不用改**）|
| `~/.claude/agents/*.md` | 改格式 | 写为 Codex Plugins |
| `~/.claude/hooks/*.sh` | 改格式 | 写到 `[hooks]` 配置块 |

### Step 2：迁移记忆

如果你 Claude Code 的 `MEMORY.md` 写得比较好：
- 内容**大部分可以直接复制到** `AGENTS.md`
- 拆分到多个章节：公司背景 / 品牌 / 术语 / 输出偏好

### Step 3：调整 Prompt 习惯

两个工具的 prompt 风格略有差异：
- **Claude Code**：偏好更长、更结构化的 prompt
- **Codex**：偏好简洁、要点式 prompt

不需要大改，但运营同事可能要稍微调一下表达习惯。

### Step 4：测试核心场景

迁移后，用你最常用的 3-5 个场景测试：
- 周报生成
- 资料汇总
- 数据分析
- 项目模板套用

测试通过后再全面切换。

## 🤔 选哪个？选型建议

### 选 Claude Code 如果：

- ✅ 你的工作流严重依赖 Anthropic 模型（Claude 系列效果更好）
- ✅ 团队已经用熟 Claude Code，不想换
- ✅ 需要 Claude 的 Artifacts / Extended Thinking 特性
- ✅ 主要在 macOS / Linux 工作（不介意 WSL2）

### 选 Codex 如果：

- ✅ 你/团队偏好 GPT 系列模型
- ✅ 你常用 Windows（Codex 原生支持，不用 WSL2）
- ✅ 你想要**自动记忆**（不用手写 MEMORY.md）
- ✅ 你需要**企业级管控**（requirements.toml）
- ✅ 你需要**Profile 切换**（不同任务用不同配置）
- ✅ 你想要更**丰富的 Plugins 生态**（Slack / Figma / Notion 都内置了）

### 两个都用？

完全可以。比如：
- **Codex 用于**：日常运营工作、Windows 机器、需要自动记忆的场景
- **Claude Code 用于**：深度写作、需要 Extended Thinking 的场景

但**建议团队统一用一个**，避免维护两套配置。

## 🎯 一句话总结

| 维度 | Claude Code | Codex |
|------|----------|----------|
| 定位 | 编程搭档 | AI 智能体指挥中心 |
| 模型 | Claude 系列 | GPT 系列 |
| 配置 | JSON + 多文件 | TOML + 统一文件 |
| 记忆 | 手动 | 自动 |
| Windows | 需 WSL2 | 原生 |
| 企业管控 | 黑盒 | 透明 |
| Plugins 生态 | 较新 | 较成熟 |

**两者各有优势，按团队实际情况选**。

## 🚀 下一步

- 决定选 Codex → 看 [5. Codex 项目结构详解](05-codex项目结构.md)
- 决定选 Claude Code → 这份手册不适合你，去看 Anthropic 官方文档
- 两个都想试 → 看上面的「迁移指南」

---

> 📅 本章最后更新：2026-06-30
> ✏️ 维护者：Codex for Ops 团队