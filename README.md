# start-nodejs
慕课网学习-入门到企业Web开发中的应用


### 1. supervisor的使用
> 1. 插件就像是一个watch, 监控文件对应的相关目录下的文件是否修改,如果有修改就重新启动服务
> 2. 监控的是src下的所有文件
```
npm i -g supervisor

supervisor app.js
```