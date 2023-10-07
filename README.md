# TDO 工作流



以任务（task）驱动的工作流，

- Task 制定计划
- Do 去收集，去完成
- Outcome 展示成果

**==习惯比工具更重要==** 

## 来源

在B站看到 [IOTO正式版来了！！一个每年可以为你节省199个小时的Obsidian知识管理框架](https://www.bilibili.com/video/BV1Y14y1r7xJ/) 这个视频，是我一直以来想找的笔记管理工作流。于是学习一番，可以极大节省时间的知识管理框架。

这位 up 主分享了这一工作流的理念，感觉对你有帮助，可以支持一下


## 介绍

本项目是基于上述 IOTO 的知识管理框架 的 ==理念== ，制作的一个开箱即用的 Obsidian 的自动化脚本的整合包

在使用之前先看完整的看一下 上一个视频，再使用该项目，不然使用时会感到困惑

> 在此声明，与上述 IOTO 知识管理框架，无利益关系，没有查看过 IOTO 付费发布的示例库的源码，可能存在 B站up  Johnny学（id: 432408734）展示视频内 *功能* 相同的脚本。
> 
> 如有侵权，请提交 issue ，会进行处理

## 功能实现

- [x] 触发 创建 Project 动作时，同时在 `3-task` 和 `4-Outcoms` 文件夹内创建对应的文件夹
- [x] 触发 创建 Task 动作时，选择对应的 Project 创建当天的task文件
- [x] 触发 创建 Input 动作时，选择 input 内的文件夹创建文件
- [x] 触发 创建 Output 动作时，选择 Output 内的文件夹创建文件


## 使用技巧


在 `4-Outcomes` 文件夹下，有各种介绍，尽量做到开箱即用。

同时，也推荐选择 自己 需要的 自动化脚本，我会对各个脚本做简单的介绍

4个顶层文件夹的名字与👇 图片 一一对映，如修改文件夹名，也请同时修改配置文件。

需要一定的 JS 基础，对顶层文件夹名的修改，在`0-Extras/Templater/Scripts/TDO` 下
![](0-Extras/Images/TDO/Pasted%20image%2020230929212553.png)

## 未来的想法

可以在 issue 上提建议

### 不支持的功能

- [ ] 使用 CSS 进行美化， 如有需求，请自行美化
- [ ] 同步到 airtable 等多维表格，进行数据同步和展示，推荐购买 Johnny学Airtable年度会员服务
- [ ] 使用 Advanced Slides 进行PPT展示 ，推荐购买 Johnny学 Obsidian 年度会员服务


## 后续更新

方法一：直接下载本仓库，通过 git pull 拉取进行更新
方法二：下载 压缩包 覆盖更新