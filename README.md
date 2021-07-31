#### bulletchat介绍
使用纯原生js编写的弹幕插件，不依赖任何框架。可任意享用。

#### 安装教程

npm install bulletchat

#### 使用说明

1.  引用模块
-   const Bulletchat = require('bulletchat');

2.  使用new关键字创建一个实例，需要传入一个容器dom对象
-   const bulletchat = new Bulletchat(parentDom);

3.  添加弹幕
-   bulletchat.add({ id, nickName, content })

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request