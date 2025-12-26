---
title: "网站框架用什么好？"
date: 2025-09-29T11:11:00+08:00
description: "博客框架选型指南：深度对比 WordPress、VuePress、Hexo 等主流建站框架，分享从零到一搭建个人博客的实战经验和避坑指南。"
summary: "对比 WordPress、VuePress、Hexo 等建站框架，分享个人博客搭建经验。"
categories: ["碎碎念"]
tags: ["网站", "计算机", "博客"]
slug: which-framework-to-build-website
draft: false
---
瞎折腾是我一直以来的主旋律，光是网站我就折腾了不少框架。今天给大伙们分享一下自己曾经用过的一些框架。

## WordPress：小白建站不二选择

计算机领域有个词：低代码平台，意思大概就是几乎不用写代码，就可以实现自己想要的功能。WordPress 就是这样的，你不用写一行代码就可以快速搭建起一个像模像样的网站。

![WordPress主题Bravada](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250929095557.png)

WordPress 有插件市场，还自带了海量企业级、博客级的模板，真的就像模像样...

我接触的第一个博客框架就是 WordPress。当时是想自己建立一个天文文章汇总网站，任何天文爱好者都可以在网站上发布文章（现在想起来有点幼稚，但是也很有意思）。当时还没有大模型，我在必应上面搜了一整天博客框架，几乎百分之 80 的回答都是 WordPress。于是我自己买了一个阿里云服务器，跌跌撞撞花了一整个月备案，选了一个自以为好看的主题 Bravada，搭建了人生中第一个网站——银河派对。

![银河派对的第一版logo](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/dd75d40b13924f2f68423984983cb53c.png)

![银河派对界面](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/b70b5300940119ef46f11380bf0d283a.png)

当时实在是乐在其中，而且那个时候很多天文大佬发文都很精华，属于是赶上浪潮之巅了。更可贵的是凭着厚脸皮联系上了不少大佬，后面打造自己的社群。高中的这番经历让我对建站有了大概的了解，这段经历也很可能潜移默化地影响了我未来走计算机的道路。

最后总结一下：如果你不太熟悉写代码，WordPress 是最佳选择。

## VuePress：高度自定义友好

银河派对最后是因为没有能力续费阿里云 ECS 和域名，被迫关停了。不过到了大学我有了建立自己博客网站的需求。我对于博客网站的要求只有两个：一个是优雅，简洁而不简陋；另一个是可以用 markdown 格式写文章。WordPress 的模板大多花里胡哨、加载慢，很难达到第一个需求。通过大量调研，我发现自己看过的不少网站都是一种风格，似乎是同一套框架写出来的，最后我发现了VuePress。

![JavaGuide官网](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250929102936.png)

![一生一芯官网](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250929103003.png)

![VuePress官网](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250929103021.png)

VuePress 做出来的网站差不多都这个样子，网上称呼这种风格为“文档风”（看上去就像代码文档一样，不过确实很多文档也就用的 VuePress）。同类型的博客框架还有 VitePress，也是这种风格。

于是我把高中那一套用了起来：买 ECS、备案... 后面的就几乎不会了：什么 git 克隆仓库，什么 vue 组件，后面我连文章写在哪，怎么运行网站都完全不知道！因为这类框架需要一定的计算机基础，适合计算机从业人群使用。我又花了一个月研究 github、简单入门 vue 和 vite，边看 VuePress 的官方文档边修改网站，这才上线了第二个网站——西贝的天文茶馆。

VuePress 是我目前用过的最久的框架，因为它满足了我对网站风格的基本需求，markdown 写文章也相当方便，可以迁移到微信公众号、知乎等平台，而且 VuePress 是静态网站，加载速度也相对 WordPress 花里胡哨的动画快不少。

总的来说，如果你懂一些计算机知识，喜欢简洁优雅的主题，VuePress/VitePress 是可以考虑的框架。

## Hexo：生态圈完整的程序员友好框架

最近我实在有点不想忍受 VuePress 的一大槽点：文章和配置文件不分离。写文章需要在项目深处精确地创建 markdown 文件，并且旁边一大堆配置文件看着很乱。于是我又增添了一个需求：文章与配置文件分离，项目短小精悍。

这次我交给大模型来调研，大模型给我推荐了两个框架：Hugo 和 Hexo。Hexo 是基于 nodejs 构建的，Hugo 是基于 Go 语言构建的。Hexo 很多程序员都在用作个人博客，有许多插件和主题，这跟 WordPress 很像；Hugo 构建速度快，适合高度自定义。我不愿意再花太多心思折腾网站布局，于是我选择了 Hexo 来快速部署一个新的博客网站。

主题选什么好？Hexo 目前最热门的框架是 NexT 主题，大概长这样：

![NexT主题样式](https://user-images.githubusercontent.com/16272760/63487983-da41b080-c4df-11e9-951c-64883a8a5e9b.png)

最下面这个主题相信不少人见过，非常经典！但是这个主题我不认为太简洁，这太简陋了。我相信程序员很难接受大面积的方块与尖锐的边缘。于是我开始寻找自己想要风格：Material Design。

Material Design 很重视组件及其层级关系。我觉得它的特点是：组件简洁，只用圆角修饰；组件有一定遮挡关系，杜绝完全的平铺。这很合我的胃口，于是我选择了 Material Design 的 Hexo 主题：fluid。（有一说一其实 VuePress 也像是 Material Design）

![西贝的代码宇宙](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250929110249.png)

![西贝的代码宇宙](https://raw.githubusercontent.com/MrSibe/obsidian_images/main/20250929110303.png)

下载好主题，花半个小时简单配置一下就能用，现在 hexo + fluid 已然变成了我的心头爱。

## 总结

如果你打算自己建立一个网站，且没有计算机基础，毫无疑问直接选择 WordPress。

如果你有计算机基础，并且想要类似于文档风的组织，可以选择 VuePress/VitePress，否则 Hexo。当然如果不想思考太多可以直接选择 Hexo，因为它的生态、解决方案比 VuePress 多不少。

运行网站需要一台服务器，免费的方案可以采用 GitHub Page 或者 cloudflame，优点是免费，支持一键部署，git push 上去网站就修改好了，缺点是访问网站偏慢；付费的方案是买一台阿里云 ECS 服务器，整一个自己的域名，优点是访问快，服务还不错，缺点是要钱 hhh。
