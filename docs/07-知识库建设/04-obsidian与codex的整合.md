# 4. Obsidian 与 Codex 的 5 种整合方式

> 从轻量到深度，总有一款适合你

## 🎬 这章给谁看

不管你是 Obsidian 新手还是老用户（你已经用 Obsidian 6 区 vault），这章讲清楚 **5 种把 Codex 和 Obsidian 整合的方法**，从最轻量到最深度排列。

## 🎯 你将学到

- 5 种整合方式各自的优缺点
- 你适合哪种（按你的情况判断）
- 详细的安装 + 配置步骤
- 推荐组合

## 📋 5 种整合方式全景

按「集成深度」从浅到深排序：

| 方式 | 集成深度 | 一句话 | 适合谁 |
|------|---------|------|------|
| **方式 1**：Codex 读 Vault 文件夹 | ⭐ | Codex 能读 Obsidian 文件，但跟 Obsidian 是分离的 | 只想让 Codex 访问笔记 |
| **方式 2**：obsidian-mcp + Local REST API | ⭐⭐ | Codex 通过 MCP 协议读 Obsidian | 想让 Codex 安全读写 Vault |
| **方式 3**：Copilot for Obsidian 插件 | ⭐⭐⭐ | Obsidian 内置 AI 面板，直接对话 | 喜欢在 Obsidian 里用 AI |
| **方式 4**：Claudian 插件 | ⭐⭐⭐⭐ | 把 Claude Code / Codex 直接嵌进 Obsidian 侧栏 | 重度用户 + AI 重度用户 |
| **方式 5**：llm-wiki-skill 整套体系 | ⭐⭐⭐⭐⭐ | LLM + Wiki + 双向链接 + 图谱的完整方案 | 想做正经知识库 |

**先选一种主用**——不要 5 种都用，反而乱。

## 🎯 方式 1：Codex 读 Vault 文件夹（最简单）

### 原理

Obsidian 的 Vault 本质就是一个文件夹（`my-vault/`），里面是 `.md` 文件。Codex 直接把它当普通文件夹读。

### 怎么设

1. 找到你的 Vault 文件夹（`你的 Vault 名/.obsidian/` 是隐藏目录，但你的笔记都在 Vault 文件夹下）
2. 打开 Codex 桌面端
3. **+ New Task**
4. 选 Vault 文件夹作为输入
5. 输入 prompt 让 Codex 处理

### 完整 prompt 例子

```
读取这个文件夹里所有的 Markdown 文件（忽略 .obsidian 隐藏目录），
帮我做以下事情：

1. 列出所有文件的清单（按文件夹分组）
2. 统计每个文件夹的文件数
3. 找出最近修改的 10 个文件
4. 提取所有出现的 [[双向链接]] 标签，统计哪些概念最常被引用
5. 输出一份「我的知识库全景报告」

注意：只读取 .md 文件，不要修改任何文件。
```

### ✅ 优点

- 5 分钟上手，不需要装插件
- 不影响 Obsidian 正常使用
- 适合偶尔让 Codex 帮忙处理

### ❌ 缺点

- Codex 跟 Obsidian 是分离的两个工具，不能双向同步
- Codex 不能自动感知你新增的笔记
- 需要手动开任务

### 🎯 适合谁

- 只想让 Codex「读得到」Vault 的人
- 偶尔用一次，不想装一堆插件

---

## 🎯 方式 2：obsidian-mcp + Local REST API

### 原理

通过 MCP 协议，让 Codex 能直接读写 Obsidian Vault，不用手动指定文件夹。

**两层架构**：
```
Obsidian (Local REST API 插件) → 暴露 HTTP API
   ↓
MCP 服务器 → 把 HTTP API 包装成 MCP 工具
   ↓
Codex → 通过 MCP 调用工具
```

### 怎么设

#### Step 1：装 Local REST API 插件

1. 打开 Obsidian
2. **设置** → **第三方插件** → **社区插件市场**
3. 搜 `Local REST API`
4. 装 + 启用
5. 进插件设置，**记下 API Key**（一串长字符）

#### Step 2：装 obsidian-mcp

在你的 Vault 根目录外（任意位置）：

```bash
# 克隆仓库
git clone https://github.com/your-org/obsidian-mcp.git
cd obsidian-mcp

# 装依赖
npm install

# 配置（在 config.json 里填 API Key 和 Vault 路径）
# 然后启动
npm start
```

#### Step 3：在 Codex 里配置 MCP

打开 Codex 桌面端 → ⚙ → MCP Servers → Add：

```
Name: obsidian
Type: HTTP
URL: http://localhost:27123/mcp（默认端口，按实际改）
```

填完保存。

#### Step 4：测试

在 Codex 输入：

```
列出 Obsidian 里的所有 Markdown 文件
```

**预期结果**：Codex 列出你 Vault 里的所有 .md 文件。

### ✅ 优点

- Codex 能「看到」Obsidian 里的所有笔记
- 能读能写（创建新笔记、修改现有）
- 双向同步（Obsidian 改了 Codex 也知道）

### ❌ 缺点

- 需要装 2 个东西（插件 + MCP 服务）
- 配置比方式 1 复杂
- MCP 服务要保持运行

### 🎯 适合谁

- 想让 Codex 主动帮你整理 Obsidian 的人
- 想「自然语言操作 Obsidian」的人（"Codex 把今天读的 3 篇文章整理进 Obsidian"）

---

## 🎯 方式 3：Copilot for Obsidian 插件（Obsidian 内置 AI）

### 原理

在 Obsidian 里直接装一个 AI 插件，右侧打开聊天面板，可以直接对话、检索 Vault。

### 怎么设

1. 打开 Obsidian → 设置 → 第三方插件 → 浏览
2. 搜 **Copilot for Obsidian**
3. 装 + 启用
4. 配置 AI 模型（GPT-4 / Claude / 本地模型 都行）
5. 右侧栏打开 Copilot 面板

### 能干啥

- **聊天问答**：问 AI 问题
- **Vault 检索**：基于你的 Vault 内容回答（RAG）
- **笔记总结**：选中文字让它总结
- **生成内容**：基于你的笔记生成新内容
- **修改建议**：让 AI 帮你改写

### ✅ 优点

- 完全在 Obsidian 里，体验连贯
- 内置 RAG，自动检索 Vault
- 支持多种模型（包括本地）

### ❌ 缺点

- 跟 Codex 是独立的（不是同款 AI）
- 配置稍复杂（要 API Key）
- 不能像 Codex 那样跑复杂的多步任务

### 🎯 适合谁

- 主要在 Obsidian 里干活的人
- 想让 AI 直接读 Vault 的人
- 不需要 Codex 那种 agent 能力的人

---

## 🎯 方式 4：Claudian 插件（深度集成，最像 Codex）

### 原理

**Claudian** 是 Obsidian 的一个插件，**直接把 Claude Code / Codex / OpenCode / Pi 等 AI 编程工具嵌入到 Obsidian 侧栏**。

GitHub: [YishenTu/claudian](https://github.com/YishenTu/claudian)（13k+ stars）

### 怎么设

1. 打开 Obsidian → 设置 → 第三方插件 → 浏览
2. 搜 **Claudian**
3. 装 + 启用
4. 配置：
   - 选择 AI 后端（Claude Code / Codex / OpenCode / Pi）
   - 填 API Key 或登录账号
5. 右侧栏打开 Claudian 面板

### 5 个核心能力

#### 能力 1：AI 直接操作 Vault

```
你：「帮我把所有 #todo 标签的笔记列出来，建一个新页面叫『本周待办』」

Claudian + Codex：
  ✅ 扫描 Vault
  ✅ 筛选 #todo 标签
  ✅ 创建新页面
  ✅ 写入内容
```

#### 能力 2：行内编辑 + 逐词差异预览

```
1. 选中一段文字
2. 按快捷键
3. AI 在原位编辑，显示差异
4. 接受/拒绝
```

#### 能力 3：@提及引用

```
聊天输入框输入 @：
  @vault         → 整个 Vault
  @file:笔记名   → 单个文件
  @agent:翻译    → 调子 Agent
  @mcp:github    → 调 MCP 服务
```

#### 能力 4：预设提示词模板

```
输入 / 调出模板：
  /summarize     → 总结
  /translate     → 翻译
  /extract-tags  → 提取标签
  /custom        → 你自己定义的
```

#### 能力 5：计划模式

```
Shift+Tab 切到计划模式
→ AI 先探索、给你方案
→ 你批准后才执行
```

### ✅ 优点

- **完整 Codex 能力 + Obsidian UI**
- 行内编辑体验最佳
- 多 AI 后端灵活切换
- 活跃维护（13k+ stars）

### ❌ 缺点

- 配置比前几种复杂
- 需要较好的电脑性能（Codex 桌面端 + Obsidian 都开着）
- 部分功能依赖 AI 后端能力

### 🎯 适合谁

- 重度 Obsidian + 重度 AI 用户（你！）
- 想要「在 Obsidian 里完成所有事」的人

---

## 🎯 方式 5：llm-wiki-skill 整套体系（最完整）

### 原理

[第 2 章](02-llm-wiki-skill安装与使用.md) 讲的 k神方法论，配上 Obsidian 作为承载工具，组成「LLM + Wiki + Obsidian」完整方案。

### 架构

```
Obsidian Vault（本地 Markdown 文件）
   ↑
   │ 直接读（方式 1）
   │
llm-wiki-skill 装在 Codex 里
   │
   ↓ 处理
   │
raw/  →  消化
       ↓
       Wiki 页面（双向链接）
       ↓
       数字山水知识图谱（HTML）
```

### 怎么设

1. 装 Obsidian（[第 3 章](03-Obsidian介绍.md)）
2. 装 Codex + llm-wiki-skill（[第 2 章](02-llm-wiki-skill安装与使用.md)）
3. **关键步骤**：把 Codex 的 Vault 指向 Obsidian 的 Vault 文件夹

具体做法：

```toml
# ~/.codex/config.toml
[projects.default]
vault_path = "~/Documents/my-obsidian-vault"
```

或者在每次新建任务时选 Vault 文件夹。

### ✅ 优点

- 最完整的方法论 + 工具组合
- 自动生成知识图谱
- 双向链接自动建议
- 长期价值最高

### ❌ 缺点

- 学习曲线最陡
- 需要理解 k神方法论
- 消化速度受 LLM 限制

### 🎯 适合谁

- 想做「正经知识库」的人
- 不怕花时间学方法论的人
- 长期价值导向的人（3-5 年视角）

---

## 🎯 推荐组合（按你的情况）

### 你已经在用 Obsidian 6 区 vault

我推荐用 **方式 4 + 方式 5** 组合：

| 工具 | 作用 |
|------|------|
| Obsidian + Claudian（方式 4） | 日常在 Obsidian 里用 Codex 改笔记、加内容 |
| Codex + llm-wiki-skill（方式 5） | 每周一次「批量消化新素材 → 更新 Wiki」 |

**具体怎么配合**：

```
日常（每天）：
  - 在 Obsidian 里看到一篇好文章 → 用 Claudian 快速记录要点
  - Claudian 直接创建/修改 Obsidian 笔记

每周（周日下午 1 小时）：
  - 用 Codex + llm-wiki-skill 批量消化本周收藏的素材
  - 让 Codex 自动建实体页、主题页、加双向链接
  - 重新生成知识图谱

每月（月末 30 分钟）：
  - review 本月 Wiki 增量
  - 修正错误、补充判断
  - 清理孤立页面
```

### 团队协作场景

如果团队要共享知识库：

- 个人 Obsidian Vault（私密） + 团队 Wiki 仓库（Git）
- 用 [Git 同步方案](https://publish.obsidian.md/help-zh/%E5%9D%82%E5%85%A5%E5%BC%80%E5%A7%8B/%E6%95%99%E7%A8%8B/%E5%9F%BA%E6%9C%AC%E5%A7%94%E8%AE%BE/%E5%A4%87%E4%BB%BD%E4%BD%A0%E7%9A%84-Obsidian-%E5%BA%93) 同步

## ⚠️ 不要这么干

### ❌ 同时用 5 种方式

装 5 个插件 + 5 个 MCP + 5 套配置 = 混乱、性能差、互相打架。

**建议**：先选 1-2 种，跑 3 个月再加新的。

### ❌ 让 Codex 自动改 Vault

让 Codex 在没有人工 review 的情况下直接写 Vault，**会污染你的知识库**。

**建议**：重要操作前用计划模式，Codex 给出方案 → 你批准 → 才执行。

### ❌ 把敏感数据放 Vault 里

见 [数据安全](../../04-安全红线/01-数据安全.md)。

## 🚀 下一步

- 选好方式了 → [5. 从 0 搭建个人知识库](05-从0搭建个人知识库.md)
- 想看怎么维护 → [6. 知识库的日常维护与进化](06-日常维护与进化.md)

---

> 📅 本章最后更新：2026-06-30
> ✏️ 维护者：Codex for Ops 团队