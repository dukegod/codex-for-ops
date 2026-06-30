# 5. Codex 项目结构详解：解构 + 配置 + 优化

> 全面掌握 Codex 的配置体系

## 🎬 场景故事

小李用 Codex 一段时间了，遇到了几个困惑：
- 「AGENTS.md 该放项目根目录还是 `~/.codex/`？」
- 「Skills 和 Plugins 有什么区别？」
- 「我想让团队统一用某个模型，但每个人配置都不一样怎么办？」
- 「Codex 有 `requirements.toml` 是干嘛的？我们公司能强制配置吗？」

**这篇就是「Codex 项目结构全景图」**——从全局到项目，每一层配置干什么、怎么设、怎么调优，全部讲清楚。

## 🎯 你将学到

- 每层配置文件的**作用 + 怎么设置 + 怎么优化**
- **配置优先级**：CLI 参数 / Profile / 项目配置 / 用户配置 / 系统配置，谁覆盖谁
- 推荐配置组合：个人版 / 团队版 / 企业版

## 📋 一图看懂 Codex 项目结构

```
┌─────────────────────────────────────────────────────────────┐
│              Codex 项目结构（桌面端 + CLI 共享）              │
└─────────────────────────────────────────────────────────────┘

~/.codex/                          # ⭐ 全局配置根目录
│
├── auth.json                      # 认证信息（ChatGPT 登录凭证）
├── config.toml                    # ⭐ 主配置文件
├── AGENTS.md                      # ⭐ 全局项目记忆
├── AGENTS.override.md             # 全局临时覆盖
│
├── sessions/                      # 会话历史（可恢复）
├── skills/                        # 用户安装的 Skills
│   ├── commit/
│   │   └── SKILL.md
│   ├── weekly-report/
│   │   └── SKILL.md
│   └── ...
├── plugins/                       # 用户安装的 Plugins
│   └── ...
├── memories/                      # 自动提取的跨会话记忆
│   └── ...
├── logs/                          # 运行日志
│   └── codex-tui.log
├── state_*.sqlite                 # 状态数据库
├── logs_*.sqlite                  # 日志数据库
└── .sandbox/                      # 沙箱环境

项目根目录/                        # ⭐ 项目级配置（推荐）
├── AGENTS.md                      # ⭐ 项目记忆
├── AGENTS.override.md             # 项目级临时覆盖
└── .codex/                        # 项目级配置（可选）
    ├── config.toml                # 项目级 config
    └── AGENTS.md                  # 项目级 AGENTS（覆盖上面的）

系统级（管理员用）：
└── /etc/codex/requirements.toml   # 机器级强制约束（用户不可覆盖）
```

## 🔍 各项作用 + 怎么设置 + 怎么优化

### 1. `auth.json` —— 认证凭证

**作用**：存你的 ChatGPT 账号凭证。Codex 启动时会读这个文件验证身份。

**位置**：
- macOS/Linux：`~/.codex/auth.json`
- Windows：`C:\Users\<用户名>\.codex\auth.json`

**怎么设**：
- **方式 A**：用 `codex login` 命令（推荐），OAuth 登录后自动写
- **方式 B**：在 Codex 桌面端登录，自动同步到 auth.json

**怎么优化**：
- 🚨 **绝对不要手动编辑这个文件**——内容是加密的，乱改会导致登录失败
- 🚨 **不要提交到 Git 仓库**——已经是 `.gitignore` 默认排除
- **Token 有效期约 10-30 天**，过期后 Codex 会自动提示重新登录
- **迁移到新电脑**：直接把这个文件拷过去就能用

### 2. `config.toml` —— 主配置文件（最核心）

**作用**：Codex 所有可配置项都在这里——模型选择、Provider、安全模式、MCP、Plugins、Profiles 等等。

**位置**：
- 用户级：`~/.codex/config.toml`
- 项目级：`<项目根目录>/.codex/config.toml`
- 系统级：管理员通过 `requirements.toml` 强制

**完整示例**（一个比较全的 config.toml）：

```toml
#:schema https://developers.openai.com/codex/config-schema.json

# ========== 基础配置 ==========
model = "gpt-5.4"                  # 默认模型
model_provider = "openai"          # 模型供应商
model_reasoning_effort = "medium"  # 推理力度：low / medium / high / xhigh

# ========== 安全模式 ==========
approval_policy = "on-request"     # 审批策略：untrusted / on-request / never
sandbox_mode = "workspace-write"   # 沙箱：read-only / workspace-write / danger-full-access
approvals_reviewer = "user"        # 审批审阅者：user / auto_review

# ========== 网络搜索 ==========
web_search = "cached"              # cached / live / disabled

# ========== MCP 服务器配置 ==========
[mcp_servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
env = { GITHUB_TOKEN = "ghp_xxx" }

[mcp_servers.notion]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-notion"]
env = { NOTION_TOKEN = "secret_xxx" }

# ========== Plugins 配置 ==========
[plugins."documents@openai-primary-runtime"]
enabled = true

# ========== Profiles（配置预设）==========
[profiles.work]
model = "gpt-5.4"
model_reasoning_effort = "high"
web_search = "live"

[profiles.fast]
model = "gpt-5.4-mini"
model_reasoning_effort = "low"
sandbox_mode = "workspace-write"

[profiles.review]
model = "gpt-5.4"
sandbox_mode = "read-only"
model_reasoning_summary = "detailed"

# ========== 高级配置 ==========
[agents]
max_threads = 6                     # 最大并发 Agent 数
max_depth = 1                       # 最大嵌套深度

[tui]
theme = "dracula"                   # 主题
vim_mode_default = false            # Vim 模式

[memories]
use_memories = true                 # 自动注入已有记忆
generate_memories = true             # 自动生成新记忆
```

**怎么设**：
1. **手动编辑**：用任何编辑器打开 `~/.codex/config.toml`
2. **使用 CC Switch**（推荐）：图形化工具，专门管理 Codex CLI 的配置（也支持其他 AI CLI 工具）
3. **通过 Codex 桌面端设置**：部分基础项可以 UI 改

**怎么优化**：

| 场景 | 推荐配置 |
|------|--------|
| **日常运营工作** | `model_reasoning_effort = "medium"`，`sandbox_mode = "workspace-write"` |
| **重要报告（数字必须对）** | `model_reasoning_effort = "high"`，`web_search = "live"` |
| **快速问答** | 用 Profile `fast`：`model = "gpt-5.4-mini"`，`model_reasoning_effort = "low"` |
| **代码审查场景** | `sandbox_mode = "read-only"`（不让 Codex 改文件） |
| **CI/CD 自动化** | `approval_policy = "never"`，`sandbox_mode = "workspace-write"` |

### 3. `AGENTS.md` —— 项目记忆（Codex 每次必读）

**作用**：放在工作目录根目录，Codex 启动时会自动加载。你在这个文件里告诉 Codex：项目背景、术语、输出格式偏好等。

**位置**：
- 全局级：`~/.codex/AGENTS.md`
- 项目级：`<项目根目录>/AGENTS.md`
- 临时覆盖：同级目录的 `AGENTS.override.md`

**怎么设**：

新建 `<项目>/AGENTS.md`，按这个模板写：

```markdown
# 项目名称

## 公司/团队背景
- 公司：[公司名]，主要做 [业务]
- 团队：[团队名]，负责 [职责]

## 品牌调性
- 语气：专业但不死板、亲切但有距离感
- 禁用词：「赋能」「抓手」「闭环」
- 偏好词：「靠谱」「实在」「能落地」

## 常用术语表
- XX = 我们的核心产品名
- YY = 公司内部代号
- ZZ = 客户类型 A

## 输出格式偏好
- 周报：Markdown，4 个固定章节
- 数据报告：表格 + 文字解读，结论先行
- 邮件：正式、简洁、不超过 200 字

## 重要注意事项
- 所有数字必须标注数据来源
- 不要编造客户名字
- 涉及营收的内容用百分比，不用绝对数字
```

**怎么优化**：

✅ **应该这样**：
- 写得简洁（建议 1-3 页 A4）
- 内容稳定（别经常改）
- 按章节组织（公司 / 品牌 / 术语 / 格式 / 注意）
- 团队共享（让大家都用同一份）

❌ **不要这样**：
- 写得超长（>10 页）——拖累 Codex 启动速度
- 包含敏感信息（API key、未公开财务）——见 [数据安全](docs/04-安全红线/01-数据安全.md)
- 频繁改（每次都改等于没改）

详细配置看 [3. 项目记忆](03-项目记忆.md)

### 4. `skills/` —— 可复用工作流

**作用**：把常用的「任务 + prompt + 步骤」打包成一键执行。下次直接点 Skill 就能跑，不用重写 prompt。

**位置**：
- 用户级：`~/.codex/skills/`
- 项目级：`<项目根目录>/.codex/skills/`

**Skill 的目录结构**：

```
~/.codex/skills/
└── weekly-report/                  # Skill 名字
    ├── SKILL.md                    # ⭐ 必需：Skill 定义
    ├── scripts/                    # 可选：脚本
    │   └── send_to_feishu.py
    ├── references/                 # 可选：参考资料
    │   └── 模板.md
    └── assets/                     # 可选：资源
        └── chart-template.png
```

**SKILL.md 的格式**：

```markdown
---
name: weekly-report
description: 自动生成运营周报。读取指定文件夹的 Excel，输出 markdown 格式的周报。
---

# 周报生成 Skill

## 使用方式

点 `/skills` 找到 "weekly-report" → 选资料文件夹 → 跑

## 任务流程

1. 读取文件夹里所有 Excel/CSV
2. 按以下结构生成周报：
   - 本周亮点
   - 核心数据回顾
   - 问题与风险
   - 下周计划
3. 保存到当前文件夹，文件名 `week-report-YYYYMMDD.md`

## 完整 Prompt

```
[粘贴你的 prompt]
```

## 输出位置

`week-report-YYYYMMDD.md`（保存在授权文件夹根目录）

## 注意事项

- 关键数字（销售额、用户数）必须人工核实
- 如果数据缺失，在「数据回顾」章节标"待补"
```

**怎么设**：
1. 在 Codex 桌面端打开 Skills 面板
2. 点 "Create new Skill"
3. 填 name、description、正文
4. 保存

或者手动在 `~/.codex/skills/<skill-name>/SKILL.md` 写文件。

**怎么优化**：

| 优化维度 | 建议 |
|--------|------|
| **命名** | 用动作命名：`weekly-report` / `competitor-monitor` / `meeting-summary` |
| **数量** | 不要太多（5-15 个最常用），多了反而难找 |
| **复用度** | 至少每周用 1 次的才值得做 Skill |
| **更新频率** | prompt 优化了同步更新 SKILL.md |
| **团队共享** | 把 skills/ 目录放到 GitHub 仓库，团队成员 clone 就能用 |

详细配置看 [1. Skills：把常用任务打包成可复用工作流](01-skills.md)

### 5. `plugins/` —— 已安装的扩展包

**作用**：Plugin = Skills + MCP 配置 + Agent 定义 的打包集合。一个 Plugin 可以装多个能力。

**位置**：
- 用户级：`~/.codex/plugins/`
- 配置启用：在 `config.toml` 的 `[plugins."name"]` 块

**Codex 内置的 Plugins**（已发布的）：
- 📄 **documents**：文档处理（读 PDF、生成 Word、读取 Excel）
- 📊 **spreadsheets**：表格处理
- 🎨 **presentations**：演示文稿生成
- 🌐 **browser-use**：浏览器自动化（访问网页、抓数据）
- 💼 **Slack、Figma、Notion、Cloudflare**：第三方集成
- 📈 **数据分析插件**：对接 Snowflake、Databricks、Hex、Tableau
- 🎯 **销售插件**：对接 Salesforce、HubSpot
- 🎨 **创意制作插件**：对接 Figma、稿定设计、Shutterstock

**怎么设**：
1. 在 Codex 桌面端打开 Plugins 面板
2. 浏览 marketplace
3. 点 Install 安装
4. 在 config.toml 里启用：
   ```toml
   [plugins."documents@openai-primary-runtime"]
   enabled = true
   ```

**怎么优化**：

- ✅ **按需启用**：不用的 Plugin 关掉，减少 Codex 启动加载时间
- ✅ **团队统一**：团队成员装同一组 Plugin，保证协作时能力一致
- ❌ **不要全装**：每个 Plugin 都消耗资源，全装会让 Codex 变慢

### 6. `memories/` —— 跨会话自动记忆

**作用**：Codex 自动从历史会话中提取关键知识，存到这里。下次启动时自动注入。

**位置**：`~/.codex/memories/`

**默认状态**：**关闭**，需要手动开启。

**怎么设**：

在 `config.toml` 里：

```toml
[features]
memories = true

[memories]
use_memories = true            # 自动注入已有记忆
generate_memories = true       # 自动生成新记忆
extract_model = "gpt-5.4-mini" # 提取用的模型
consolidation_model = "gpt-5.4" # 整合用的模型
max_rollout_age_days = 30      # 保留天数
max_rollouts_per_startup = 16  # 每次启动最多处理多少
```

**怎么优化**：

- ✅ **开起来**：长期用 Codex 的团队建议开，能持续积累项目知识
- ✅ **定期 review**：每月看一次 memories/ 目录，删掉过时的
- ❌ **不要跟敏感数据混用**：memories 会注入上下文，敏感数据不要让 Codex 提取

### 7. `requirements.toml` —— 管理员强制约束（企业用）

**作用**：管理员在系统级写一份强制配置，普通用户**无法覆盖**。这是 Codex 企业级安全管控的关键。

**位置**：
- 系统级：`/etc/codex/requirements.toml`（管理员写）
- 用户级：`~/.codex/requirements.toml`（用户级约束，可被项目级覆盖）

**完整示例**：

```toml
# /etc/codex/requirements.toml

# ========== 限制允许的安全策略 ==========
allowed_approval_policies = ["on-request", "never"]
allowed_sandbox_modes = ["read-only", "workspace-write"]

# ========== 限制网络访问 ==========
[experimental_network]
allowed_domains = ["api.internal.com", "*.company.com"]
denied_domains = ["*.external.com", "*.competitor.com"]

# ========== 强制功能开关 ==========
[features]
memories = false                # 强制关闭记忆
network_proxy = false           # 强制关闭网络代理

# ========== 限制 MCP 服务器 ==========
mcp_servers = ["github"]        # 只允许 GitHub MCP

# ========== 限制文件系统读取 ==========
[permissions.filesystem]
deny_read = ["/etc/secrets/*", "/private/*"]

# ========== 限制 Hooks ==========
allow_managed_hooks_only = true # 只允许管理员定义的 Hooks
```

**怎么设**：
- 只有管理员（sudo 权限）能编辑 `/etc/codex/requirements.toml`
- 普通用户修改无效——会被 Codex 启动时覆盖
- 用户级 `~/.codex/requirements.toml` 是软约束，部分设置可被项目级覆盖

**怎么优化**（给 IT 管理员）：

| 企业需求 | 推荐配置 |
|--------|--------|
| **金融/医疗**：严格数据隔离 | `allowed_sandbox_modes = ["read-only"]`，关闭 web_search |
| **互联网公司**：灵活 + 安全 | `allowed_sandbox_modes = ["workspace-write"]`，开放 web_search |
| **禁止用 Codex 联网** | `web_search = "disabled"`，`network_proxy = false` |
| **统一管理 Hooks** | `allow_managed_hooks_only = true` |
| **禁用某些 MCP** | `mcp_servers = ["github"]` 白名单 |

## 🔄 配置层级详解（谁覆盖谁）

Codex 配置有 **6 层优先级**（从高到低）：

```
┌─────────────────────────────────────────┐
│  1. CLI 命令行参数（最高优先级）          │  codex --model gpt-5.4 ...
│  ─────────────────────────────────────  │
│  2. Profile（指定预设）                  │  codex --profile work
│  ─────────────────────────────────────  │
│  3. 项目级 .codex/config.toml            │  <项目>/.codex/config.toml
│  ─────────────────────────────────────  │
│  4. 项目级 AGENTS.md / override          │  <项目>/AGENTS.md
│  ─────────────────────────────────────  │
│  5. 用户级 ~/.codex/config.toml          │  全局默认
│  ─────────────────────────────────────  │
│  6. 系统级 requirements.toml（兜底）     │  管理员强制
│  ─────────────────────────────────────  │
│  7. 内置默认值（兜底）                   │  OpenAI 出厂设置
└─────────────────────────────────────────┘
```

**关键规则**：
- 高优先级覆盖低优先级
- ⚠️ **项目级不能覆盖** 安全敏感字段（`openai_base_url`、`model_provider`、`model_providers`、`notify`、`profile`、`profiles`）
- 这些字段**只能在用户级或系统级配置**

**示例**：

```bash
# 这次跑用 gpt-5.4 高推理，临时覆盖配置
codex --model gpt-5.4 --reasoning-effort high

# 用预设的 work profile
codex --profile work
```

## 🎯 推荐配置组合

### 个人版（运营同学自己用）

`~/.codex/config.toml`：

```toml
model = "gpt-5.4"
model_provider = "openai"
model_reasoning_effort = "medium"
approval_policy = "on-request"
sandbox_mode = "workspace-write"
web_search = "cached"

# 常用 Profile
[profiles.fast]
model = "gpt-5.4-mini"
model_reasoning_effort = "low"

[profiles.deep]
model = "gpt-5.4"
model_reasoning_effort = "high"
web_search = "live"
```

项目级 `<项目>/AGENTS.md`：

```markdown
# 团队名 / 项目名

## 我们的产品
[产品名]，主要做 [业务]

## 品牌调性
- 语气：专业 + 亲切
- 禁用词：「赋能」「抓手」「闭环」

## 常用术语
- XX = 我们的核心产品

## 输出偏好
- 周报：Markdown，4 个章节
- 数据报告：表格 + 结论先行
```

### 团队版（推荐用 Git 共享 config）

1. 把项目级 `.codex/` 目录放到 Git 仓库
2. 团队成员 clone 后，自动获得一致的配置
3. 修改通过 PR 流程

`config.toml`：

```toml
model = "gpt-5.4"
model_reasoning_effort = "medium"

# 团队统一的 MCP 配置
[mcp_servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
env = { GITHUB_TOKEN = "${GITHUB_TOKEN}" }  # 用环境变量，不要 hardcode

# 团队统一的 Plugins
[plugins."documents@openai-primary-runtime"]
enabled = true
[plugins."spreadsheets@openai-primary-runtime"]
enabled = true
```

`AGENTS.md`：同上，团队共享。

### 企业版（IT 管理员管控）

`/etc/codex/requirements.toml`：

```toml
# 严格约束
allowed_approval_policies = ["on-request"]
allowed_sandbox_modes = ["workspace-write"]
allowed_web_search_modes = ["cached"]

[experimental_network]
allowed_domains = ["api.openai.com", "*.company-internal.com"]
denied_domains = ["*.competitor.com"]

# 强制关闭危险功能
[features]
memories = false
network_proxy = false

# 限制 MCP 白名单
mcp_servers = ["github"]

# 限制文件系统
[permissions.filesystem]
deny_read = ["/etc/secrets/*"]
```

## 🎯 优化 Checklist

Codex 项目结构相关的优化项，按优先级排序：

### ⭐⭐⭐ 必须做

- [ ] 写一份项目级 `AGENTS.md`（覆盖公司/团队背景）
- [ ] 启用 `~/.codex/config.toml`，至少配置 `model_reasoning_effort`
- [ ] 至少建 1-2 个常用 Skill（如 weekly-report）

### ⭐⭐ 推荐做

- [ ] 用 Profile 区分 work / fast / review 模式
- [ ] 把常用 MCP 配好（GitHub、Notion 等）
- [ ] 团队成员共享 `.codex/config.toml`（通过 Git 仓库）
- [ ] 启用 memories（长期使用的话）

### ⭐ 看情况做

- [ ] 安装 Plugins（按需启用）
- [ ] 配 Hooks（自动化任务时用）
- [ ] 管理员写 requirements.toml（企业级管控）

## 🚨 常见错误

### ❌ 错误 1：把 auth.json 提交到 Git
**预防**：`.gitignore` 默认已排除，但确认下。

### ❌ 错误 2：config.toml 写了敏感 token
**预防**：用环境变量 `env_key = "MY_API_KEY"`，不要 hardcode。

### ❌ 错误 3：AGENTS.md 写超长（几十页）
**后果**：Codex 启动慢，每次消耗 token 多。
**解决**：精简到 1-3 页 A4 篇幅。

### ❌ 错误 4：装了所有 Plugin
**后果**：Codex 启动慢、内存占用高。
**解决**：按需启用，不用的关掉。

### ❌ 错误 5：忘了项目级覆盖用户级
**症状**：某个项目跑出来结果不对，但同事的账号正常。
**原因**：项目级 config 覆盖了用户级。
**解决**：用 `codex --profile work` 强制用 Profile 跑。

## 🚀 下一步

- 想实操 Skills → [1. Skills](01-skills.md)
- 想写项目记忆 → [3. 项目记忆](03-项目记忆.md)
- 想跑自动化 → [2. 自动化任务](02-自动化任务.md)
- 想做团队配置 → 上面「推荐配置组合」章节

---

> 📅 本章最后更新：2026-06-30
> ✏️ 维护者：Codex for Ops 团队