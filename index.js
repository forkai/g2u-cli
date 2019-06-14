let { readdir, readFile, existsSync, writeFile, mkdirSync } = require('fs')
const { promisify } = require('util'),
	{ extname } = require('path'),
	{ decode } = require('iconv-lite')

readdir = promisify(readdir)
readFile = promisify(readFile)

const transformFile = async (filePath, fileName) => {
	try {
		fileName || (fileName = filePath)
		const originalContent = await readFile(filePath)
		const decodeContent = decode(originalContent, 'gbk')
		existsSync('./utf-8/') || mkdirSync('./utf-8')
		const newFileName = fileName.split('.')[0] + '-utf8' + extname(fileName)
		writeFile(`./utf-8/${newFileName}`, decodeContent, err => {
			if (err) throw err
			console.log(`${newFileName}转换成功！`)
		})
	} catch (err) {
		throw err
	}
}

const judgeType = (fileName, dirName) => {
	if (extname(fileName) != '.txt') {
		console.log('请使用txt格式文件')
	} else {
		console.log(`${fileName}开始转换...`)
		// 读取txt文件内容
		if (dirName) {
			transformFile(dirName + '\\' + fileName, fileName)
		} else {
			transformFile(fileName)
		}
	}
}

const run = async argv => {
	try {
		// 有拓展名
		if (extname(argv)) {
			judgeType(argv)
		} else {
			// 没有拓展名，是文件夹
			const files = await readdir(argv)
			files.forEach(el => {
				extname(el) && judgeType(el, argv)
			})
		}
	} catch (err) {
		throw err
	}
}

module.exports = run
