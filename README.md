# 项目施工中。。。。。。

# 项目依赖
	cnpm i -g nodemon
	cnpm i -g typescript
	cnpm i -g ts-node
	cnpm i
# 项目运行
## 开发环境
	nodemon ./src/bin/www.ts	//使用"./src/config.ts"配置
	npm run dev	//使用package.json配置
## 生产环境
	npm run build	//项目打包
	node ./dist/bin/www.js	//，使用"./dist/config.js"配置
	npm run start	//生产环境运行，//使用package.json配置