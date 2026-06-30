# 7. 把项目提交到 GitHub：运营零代码版

> 不碰命令行，5 分钟把项目放到 GitHub

## 🎬 场景故事

小赵是市场运营，最近部门要上一份「产品 SOP 知识库」放在 GitHub 上。领导说：
> 「用 GitHub 维护，方便追踪修改、方便团队协作」

但小赵从来没碰过 GitHub。她担心：
- 要装一堆东西？
- 要敲命令？
- 出错了怎么办？

**这篇就是给零代码基础的人写的 —— 全程不用命令行**。

## 🎯 你将学到

- 两种零代码上传方式（GitHub 网页 vs GitHub Desktop）
- 怎么创建一个新仓库
- 怎么把本地文件上传到 GitHub
- 怎么邀请团队成员协作
- 5 分钟跑通全流程

## 📋 两种方式对比

| | GitHub 网页直传 | GitHub Desktop |
|---|---|---|
| **要装软件吗** | ❌ 不需要 | ✅ 需要装客户端 |
| **适合什么** | 上传少量文件、偶尔更新 | 经常改文档、需要本地编辑 |
| **优点** | 最简单、5 分钟搞定 | 像本地文件夹一样用，体验好 |
| **缺点** | 每次改都要网页操作 | 要装客户端、占磁盘 |
| **运营推荐度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**建议**：
- **先学 GitHub 网页直传**（10 分钟搞定）
- 等用熟了，再考虑 GitHub Desktop

## 🚀 方式一：GitHub 网页直传（5 分钟版）

### Step 1：注册 GitHub 账号（如果还没）

1. 打开 https://github.com
2. 点右上角 **Sign up**
3. 填邮箱、密码、用户名
4. 验证邮箱（去邮箱点链接）
5. 选 Free 套餐（免费）

> 💡 **用户名小贴士**：用户名是你在 GitHub 上的「网名」，选个专业的，比如 `wangxiaoming-company`，别用 `xiaoming666` 这种。

### Step 2：创建新仓库

1. 登录 GitHub，**点右上角 `+` 号 → New repository**
2. 填写仓库信息：

```
┌─────────────────────────────────────────────────┐
│  Create a new repository                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Owner:       [你的用户名]                       │
│                                                 │
│  Repository name:  [codex-for-ops             ] │
│                  ↑ 项目名字（用英文或拼音）      │
│                                                 │
│  Description:    [Codex 桌面端运营团队手册    ] │
│                  ↑ 一句话描述这个项目干嘛        │
│                                                 │
│  ⚪ Public  (公开，全世界可见)                   │
│  ⚫ Private (私有，仅邀请的人可见) ← 推荐       │
│                                                 │
│  ☑ Add a README file       ← 勾上               │
│  ☐ Add .gitignore          ← 不勾（运营用不上） │
│  ☐ Choose a license        ← 不勾               │
│                                                 │
│                          [Create repository]    │
└─────────────────────────────────────────────────┘
```

3. 点 **Create repository**

**30 秒后**，你就有了第一个 GitHub 仓库 🎉

### Step 3：上传文件

1. 在新建的仓库页面，点 **Add file → Upload files**

```
┌─────────────────────────────────────────────────┐
│  Add files via upload                           │
├─────────────────────────────────────────────────┤
│                                                 │
│         ┌───────────────────────┐              │
│         │                       │              │
│         │   Drag files here     │              │
│         │   or click to browse  │              │
│         │                       │              │
│         └───────────────────────┘              │
│                                                 │
│  Commit message:                                 │
│  [上传首批运营文档                          ]   │
│                                                 │
│  ○ Commit directly to the main branch           │
│  ○ Create a new branch                          │
│                                                 │
│                              [Commit changes]   │
└─────────────────────────────────────────────────┘
```

2. **把要上传的文件拖进去**（或者点中间区域选文件）
3. **填提交说明**：写清楚这次上传了什么（比如「上传首批运营文档」）
4. 点 **Commit changes**

**搞定**！你的文件已经在 GitHub 上了。

### Step 4：邀请团队成员（可选）

如果是团队协作，需要邀请别人：

1. 进仓库页面，点 **Settings → Collaborators → Add people**
2. 输入队友的 GitHub 用户名或邮箱
3. 选权限：
   - **Read**：只能看
   - **Write**：能改
   - **Admin**：能管仓库
4. 发邀请（队友会收到邮件）

### Step 5：查看你的成果

回到仓库主页，你应该能看到：
- 文件列表
- 每个文件的内容
- 提交历史（点 Commits 看）

**恭喜，你已经会 GitHub 了**。

## 🚀 方式二：GitHub Desktop（适合经常改文件）

如果你们团队要经常改文档（比如每周更新 SOP），GitHub Desktop 会更顺手。

### Step 1：下载安装

1. 打开 https://desktop.github.com
2. 下载对应系统的版本（Mac / Windows）
3. 安装
4. 打开后用 GitHub 账号登录

### Step 2：克隆仓库到本地

1. 在 GitHub Desktop 点 **File → Clone repository**
2. 选你在网页创建的仓库
3. 选本地保存路径（建议放在「文档」文件夹下）
4. 点 **Clone**

现在你电脑上有了这个仓库的「本地副本」。

### Step 3：编辑文件

直接在你电脑的文件夹里编辑文档（用任何编辑器，比如 Typora、Obsidian、VS Code、记事本都行）。

**改了之后**，回到 GitHub Desktop：

```
┌─────────────────────────────────────────────────┐
│  Changes to commit                              │
├─────────────────────────────────────────────────┤
│                                                 │
│  Changed files:                                 │
│    📄 SOP-v2.md          [modified]            │
│    📄 新增文档.md         [new file]            │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ Summary (required):                      │   │
│  │ [更新 SOP v2，添加 XX 章节          ] │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │ Description:                             │   │
│  │ [详细说明（可选）                    ] │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│                            [Commit to main]     │
└─────────────────────────────────────────────────┘
```

1. 在 **Summary** 里写清楚这次改了什么
2. 点 **Commit to main**
3. 右上角点 **Push origin**（推送到 GitHub）

**改完的文件已经在 GitHub 上了**。

## 🎯 实际场景演练：把这份手册推到 GitHub

假设你是团队负责人，要把这本 Codex 手册推到团队 GitHub 上：

### 场景 A：用 GitHub 网页

1. 登录 GitHub，创建仓库 `codex-for-ops`（Private）
2. 把整个 `codex-for-ops` 文件夹里的所有文件拖到上传页面
3. 提交
4. 邀请团队成员

### 场景 B：用 GitHub Desktop

1. 安装 GitHub Desktop，登录
2. Clone 仓库到本地
3. 把 `codex-for-ops` 文件夹里的所有文件复制到本地仓库目录
4. GitHub Desktop 会自动检测到文件变化
5. 写提交说明（比如「初始化团队 Codex 手册」），点 Commit
6. 点 Push origin

## ⚠️ 常见错误

### ❌ 错误 1：上传了不该传的文件

比如不小心把客户的 Excel、内部敏感资料传到了 Public 仓库。

**预防**：
- 仓库选 **Private**（推荐）
- 上传前先看一遍文件清单
- 敏感文件加进 `.gitignore`（运营不用学，看开发者帮忙）

### ❌ 错误 2：上传了一个超大的文件

GitHub 不适合传大文件（单个文件限制 100MB）。

**替代方案**：
- 大文件用网盘/飞书云文档
- 真的要用 GitHub 存大文件，看 [Git LFS](https://git-lfs.com)（开发者的事）

### ❌ 错误 3：上传了重复文件

文件夹里有 `SOP.md`、`SOP-v2.md`、`SOP-最终版.md`、`SOP-真的最终版.md`...

**预防**：
- 命名规范（`SOP-v3-2026-06.md`）
- 旧版本不删，靠 GitHub 的版本历史就行

### ❌ 错误 4：提交说明写「update」

**好的提交说明**：
```
✅ "更新 6 月活动复盘文档"
✅ "修正 SOP 第 3 段的笔误"
✅ "新增竞品监控模板"
```

**不好的提交说明**：
```
❌ "update"
❌ "改了一下"
❌ "fix"
❌ "test"
```

## 🎯 完整流程速查卡

```
首次上传：
  1. 注册 GitHub 账号
  2. 创建仓库（Private）
  3. 上传文件（网页拖拽 或 GitHub Desktop）

日常更新：
  GitHub Desktop:
    1. 改文件（任何编辑器）
    2. GitHub Desktop 自动检测到变化
    3. 写提交说明 → Commit → Push

  GitHub 网页:
    1. 进仓库 → Add file → Upload files
    2. 拖文件、写提交说明
    3. Commit

邀请成员：
  Settings → Collaborators → Add people

查看历史：
  点文件 → History → 看每次提交改了什么
```

## 🚀 下一步

- 上手了 → [8. GitHub 在 Codex 中的使用](08-github在codex中的使用.md)（最有价值的部分）
- 遇到问题 → 看 [FAQ](../FAQ.md)

---

> 📅 本章最后更新：2026-06-30
> ✏️ 维护者：Codex for Ops 团队