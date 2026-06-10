<h1 align="center">UCode · 随身开发智能体</h1>

<p align="center">
  <strong>代码开发 · 创意设计 · 办公自动化</strong>
</p>

<p align="center">
  <a href="#"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green?style=flat-square" /></a>
  <a href="#"><img alt="Platform" src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-blue?style=flat-square" /></a>
</p>

---

UCode 是一款面向个人开发者的**随身开发智能体**，融合了代码开发、创意设计、办公自动化等多种能力，在终端中为你提供一站式的 AI 辅助工作环境。

无论是编写代码、调试问题、撰写文档、处理数据，还是自动化重复任务，UCode 都能理解你的上下文，安全地执行操作，成为你数字工作中的得力伙伴。

> **一句话**: 让 AI 成为你的日常开发伙伴。

---

## 核心能力

### 💻 代码开发

- **多语言理解** — TypeScript、Python、Go、Rust、Java 等主流语言
- **智能文件操作** — 读写文件、全局搜索替换、补丁应用
- **代码理解** — 语言服务器协议（LSP）集成，跳转定义、查找引用
- **全文搜索** — ripgrep 驱动的代码搜索 + Glob 文件匹配
- **Shell 执行** — 安全沙箱中运行命令，可配置权限审批
- **Git 集成** — 查看状态、生成 diff、提交管理

### 🎨 创意设计

- **技术文档撰写** — 从注释到完整方案，辅助结构化写作
- **数据处理** — 格式化、转换、分析 JSON / CSV / YAML 等格式
- **代码重构** — 分析结构，提出并落地重构方案

### 🤖 办公自动化

- **技能系统**（Skill）— 将多步重复工作编写为可复用的 playbook，一键执行
- **插件系统** — 通过 Hooks 扩展新能力
- **MCP 协议** — 接入外部工具和服务生态
- **批量任务** — 批量文件操作、格式转换、内容替换

### 🌐 联网与集成

- **Web 搜索** — 获取实时信息
- **Web 获取** — 读取在线文档和 API
- **MCP 服务器** — 扩展工具集

---

## 快速开始

```bash
# 安装
curl -fsSL https://ucode.ai/install | bash

# 或通过包管理器
npm i -g https://github.com/UClaw-me/UCode.git
brew install ucode
```

```bash
# 在当前目录启动对话
ucode
```

---

## 技术栈

| 领域 | 技术 |
|------|------|
| 运行时 | Bun |
| 语言 | TypeScript |
| 核心框架 | Effect |
| 存储 | SQLite |
| 终端 UI | OpenTUI |
| Web UI | SolidJS |
| 桌面应用 | Electron |
| LLM 提供商 | OpenAI / Anthropic / Gemini / Bedrock / DeepSeek 等 16+ |

---

## 安装方式

| 平台 | 方式 |
|------|------|
| macOS | Homebrew / NPM / DMG |
| Linux | APT / RPM / AppImage / Nix |
| Windows | Scoop / Chocolatey / NPM / EXE |

---

## 许可证

[MIT](./LICENSE) © UClaw
