---
title: "从 OpenClaw 到 Hermes Agent：Agent 的大一统"
date: 2026-04-17T06:00:00+08:00
description: "深度解析 OpenClaw 与 Hermes Agent 爆火原因，拆解记忆系统、Skill 标准化与自进化能力，并展望 Agent 未来发展路线。"
summary: "从 OpenClaw 出圈到 Hermes Agent 进化，一文看懂 Agent 的关键模块与未来趋势。"
categories: ["技术科普"]
tags: ["Agent", "OpenClaw", "Hermes Agent", "Skill", "记忆系统", "RAG"]
keywords: ["OpenClaw", "Hermes Agent", "AI Agent", "Skill Store", "记忆系统", "RAG", "Agent 架构"]
slug: agent/openclaw
draft: false
---

最近 OpenClaw、Hermes Agent 火的一塌糊涂，我也用了几个月，一直想针对这方面写一些自己的见解。

## OpenClaw 为什么火了？

在 OpenClaw 出圈之前，程序员接触最多的 Agent 可能就是 Claude Code 了。大家看到 OpenClaw 可能会想：都是通过聊天来让 Agent 做事，凭什么 OpenClaw 可以这么火？

我认为理由有两点：

- OpenClaw 真正把“高深莫测”的 Agent 放在了**普通大众**面前。
- OpenClaw 把 Agent **模块标准化**了。

### 在哪和 Agent 聊天很重要

OpenClaw 火的重要原因就是它可以接入到各种 IM 聊天工具里，例如 QQ、微信、Telegram、Discord 等等。

想一想，假如是 Claude Code，我们需要打开终端，安装 Claude Code CLI。终端对于不怎么接触计算机的小伙伴本身就是一种很有负担的东西：UI、UX 并不友好。即使是配合 VS Code 使用，计算机小白看到 VS Code 那种“东一块西一块”的界面，估计也会发懵。

因此 OpenClaw 支持 IM 聊天工具接入，对小白更加友好，直接把自己推到了风口浪尖。

但是我们也需要看到，OpenClaw 接入 IM 也有一些妥协：比如我们交给他一些任务，我们肯定很想知道它是怎么做的，在干什么，但是微信、QQ 这些 IM 只会显示“正在输入中...”；放在 Claude Code 上，则会在输入框上显示自己的计划步骤、当前进行到了哪一步骤了等等。可见 OpenClaw 因为接入 IM，天生信息密度不足。

### Agent 界的“大一统”

在 OpenClaw 之前，大家聊的是：

 - 你用了什么 MCP？
 - 你用了什么 skill？

这个时候，大家疯狂魔改自己的 Agent，已经出现了基于 RAG 的记忆系统、网络搜索工具和 Deep Research 工作流等工具，或者说 Agent 功能模块、设计思想。但是大家并不明确：如果你要做一个非常像人一样的 Agent，到底需要哪些模块？

OpenClaw 厉害就在于，把以上功能模块集大成了，使得它非常智能。

比如第一，OpenClaw 采用了类似于 Manus 的**文档记忆系统**，通过维护 AGENT.md、USER.md、SOUL.md 等文件，在创建新 session 的时候给 context 注入一些高密度的重要的用户自定义信息，让大模型第一时间了解了用户的个性、经历、喜好等信息，怎么回答用户比较好，让用户感觉这个 Agent 确实很懂自己。

第二，是 skill。在我看来，其实 **skill 的本质是软件**：程序、数据、文档，软件应有的它都有，只不过使用软件的是人，使用 skill 的是大模型。想一想，如果你拿到自己的新电脑，电脑什么软件都没有，你无法通过浏览器上网获取信息，没有 VS Code 给你拿来编程，也没有 QQ 微信给你用来跟朋友聊天...你是不是就想安装软件，给自己的电脑更多能力，使其更强大？

OpenClaw 支持 Skill，甚至衍生出了 ClawHub 这样的 skill 市场。OpenClaw 把苹果几十年前做的事情放在了 Agent 上：创建软件市场、改变软件供应方式。

当 OpenClaw 支持了记忆系统和 skill，就产生了奇妙的结果：OpenClaw 似乎具有了自我学习的能力。文档系统使其不会忘记之前做过的事情，使其拥有记忆；skill 把高度重复的行为固定下来，形成“习惯”。在与人的聊天中，OpenClaw 不断更新对用户的了解、提升自己的能力，成为了用户的助手，解放了用户的双手。

我相信从 OpenClaw 之后的 Agent 基本不会脱离记忆系统、skill 这些模块。OpenClaw 奠定了一个智能化的 Agent 必需的模块基础。

## Hermes Agent 又是什么？

OpenClaw 发布后，基于各种编程语言的模仿项目层出不穷：nanobot、picoclaw 等等。这里强烈推荐一下 nanobot，相对于 OpenClaw，它的代码更干净、功能基本全面、基于 Python 更适合魔改，非常适合个人用户使用。

经历了几个月的“模仿期”，一个叫做“Hermes Agent”又爆火了。

Hermes Agent 的概念是：一个会随着使用不断成长的 Agent。它和 OpenClaw 几乎一模一样，相对于 OpenClaw 最大的区别是它可以**自主创建 skill，在使用中自我改进 skill**。

这个能力意味着不仅记忆系统迭代了，能力系统也开始迭代了。

但是 Hermes Agent 并没有其他让我眼前一亮的设计，稍微有点意思的是记忆系统换成了 RAG，也可以换成成熟的第三方记忆系统如 mem0 等；还有能够 migrate 之前的记忆文件。

可以说，Harmes Agent 就是更完善一点的 OpenClaw。

## 我所认为的 Agent 未来的发展路线

总的来说，OpenClaw 开创了 Agent 发展的新阶段，不论是技术层面还是影响力层面。

OpenClaw 可以看作 AI 与人之间的操作系统，不仅通过记忆系统自我迭代，更加智能，还内置了“skill store”，方便自身能力的扩展。

我认为 Agent 未来主要是朝下面几个方向发展：

- 生态圈形成：未来的 ReAct 循环尽可能简单，但是可以任意插入或替换自己想要的模块，形成模块生态；目前已经形成了 skill 生态。
- 节省 Token：少 Token 也可以产生高质量输出。
- Agent + 机器人：让机器人也变得更加智能。

## 总结

OpenClaw 是 Agent 发展历程以来的一次大一统：

- 第一次让 Agent 彻底出圈。
- 告诉了我们一个智慧的 Agent 需要哪些基础模块。

OpenClaw 是目前 Harness 技术的最佳实践，我相信未来大部分的 Harness 产品架构都会参考 OpenClaw。
