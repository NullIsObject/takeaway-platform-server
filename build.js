//使用:接收flow参数判断当前打包的流程，执行对应的函数
//外部包
const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')
const minimist = require('minimist')
const args = minimist(process.argv.slice(2));
//参数
const flow = args.flow
const src = path.join(__dirname, './src')//源代码目录
const dist = path.join(__dirname, './dist')//打包输出目录

function main() {
	if (!flow) throw '请传入flow参数说明当前流程'
	else if (flow === 'copySrc') copySrc()
	else if (flow === 'removets') removets()
}
//删除包含指定字段的文件
function deleteFile(url, name) {
	var files = [];
	if (!fs.existsSync(url)) {//判断给定的路径是否存在
		fs.mkdirSync(url)
		return 0;
	}

	files = fs.readdirSync(url);    //返回文件和子目录的数组

	files.forEach(function (file, index) {

		var curPath = path.join(url, file);

		if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
			deleteFile(curPath, name);
		} else {

			if (file.indexOf(name) > -1) {    //是指定文件，则删除
				fs.unlinkSync(curPath);
			}
		}
	});
}
//复制src到dist
async function copySrc() {
	await fsExtra.emptyDir(dist)
	await fsExtra.copy(src, dist)
}
//删除ts文件
function removets() {
	deleteFile(dist, '.ts')
}

main()