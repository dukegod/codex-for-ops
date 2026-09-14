# Obsidian vault 初始化：让别人 clone 后能跑起来

> 这个仓库可以作为 Obsidian vault 打开,但需要几个手动步骤

## 1. 用 Obsidian 打开仓库

1. 打开 Obsidian
2. 点击左下角 "Open another vault" → "Open folder as vault"
3. 选 `codex-for-ops/` 这个目录
4. Obsidian 会自动识别 vault

## 2. 核心插件自动启用

`.obsidian/core-plugins.json` 里的核心插件**会自动启用**——首次打开会问你要不要启用,**选 Yes**。

主要会用到的核心插件:
- **Graph** - 知识图谱(必开)
- **Backlinks** - 反向链接(必开)
- **Canvas** - 画布(可选)
- **File Explorer** - 文件浏览器(默认开)
- **Bases** - 数据库视图(`inbox/todo/journal` 视图用,Obsidian 1.9+)
- **Properties** - 文档元数据(必开)

## 3. 装社区插件(必装)

`.obsidian/community-plugins.json` 列了**必装社区插件**,Obsidian 打开会提示「这些插件未安装,要去安装」。

### Claudian(必装)

AI 集成,让 Codex 直接读/写 vault。

1. Obsidian 设置 → Community plugins → Browse
2. 搜 `Claudian` 安装
3. 启用后配置:
   - AI 后端选 **Codex**
   - 登录你的 ChatGPT 账号
4. 把 vault 路径告诉 Claudian

仓库:https://github.com/YishenTu/claudian

### Templater(推荐装)

模板系统,新笔记自动套模板。

1. Community plugins → Browse → 搜 `Templater` 安装并启用
2. 配置 Templater folder:`templates/`
3. 新建笔记时用 Templater 触发,自动套模板

## 4. (可选) 装 llm-wiki-skill

这个**不是 Obsidian 插件**,是 Codex 的 Skill。装在 Codex 端:

```bash
git clone https://github.com/sdyckjq-lab/llm-wiki-skill.git ~/.codex/skills/llm-wiki
```

装完后 Codex 里能用 `/llm-wiki-*` 系列命令消化素材。

## 5. 第一次跑通

按 [把碎片沉淀成 Wiki:Codex + Obsidian 的飞轮](01-把碎片沉淀成Wiki.md) 走完 7 步——大约 2 小时。

## ⚠️ 仓库里 .obsidian/ 哪些会被 git 跟踪

为了避免协作冲突,仓库只跟踪 **vault 级别配置**:

| 文件 | 跟踪? | 原因 |
|------|------|------|
| `core-plugins.json` | ✅ | 团队共享(vault 启用了哪些核心插件) |
| `community-plugins.json` | ✅ | 团队共享(必装社区插件清单) |
| `workspace.json` | ❌ | 个人工作状态(打开哪些标签页) |
| `graph.json` | ❌ | 个人视图偏好(图谱缩放/过滤) |
| `app.json` / `appearance.json` | ❌ | 个人 app/主题设置 |
| `plugins/<name>/data.json` | ❌ | 插件运行时数据 |

> 💡 **小贴士**:你的本地 `.obsidian/workspace.json` 等不会被 git 跟踪,所以你打开 vault、改 workspace 不会污染 git。但**多人在同一 vault 协作时**,每个人都会改自己的 `workspace.json`——这正是我们 ignore 它的原因。

---

> 📅 本章最后更新:2026-09-14
> ✏️ 维护者:Codex for Ops 团队
