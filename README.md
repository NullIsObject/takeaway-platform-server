# 项目介绍
## 基本
### 这是一个使用express+ts的后端基本环境配置
## 注意
### 路径别名须同时在tsconfig.json配置和在src/bin/www.ts 通过"module-alias"模块配置
### "module-alias"模块配置参见："https://www.npmjs.com/package/module-alias"
#
# 项目运行
## 开发环境
	npm i
	npm i -g nodemon
	npm run dev
## 生产环境
	npm run build
	npm run start
#
# 目录结构
	└─root
			│  .gitignore
			│  build.js			//打包时使用的脚本
			│  package.json
			│  tsconfig.json
			│
			├─dist //打包后的输出目录
			└─src	//存放源码
					│  app.ts	//项目配置统一处理
					│
					├─bin
					│      www.ts	//项目启动配置
					│
					├─middleware	//存放中间件
					├─model	//模型层
					├─public	//视图层资源
					├─routes	//存放路由
					│      index.ts
					│
					└─views	// 视图层
									index.ejs
