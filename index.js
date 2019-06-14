let { readdir, readFile, existsSync, writeFile, mkdirSync } = require('fs')
const { promisify } = require('util'),
	{ extname } = require('path'),
	{ decode } = require('iconv-lite')

readdir = promisify(readdir)
readFile = promisify(readFile)

const transformFile = async (file, filename) => {
	try {
		if (!filename) {
			filename = file
		}
		let originalContent = await readFile(file)
		let decodeContent = decode(originalContent, 'gbk')
		existsSync('./utf-8/') || mkdirSync('./utf-8')
		let newFileName = filename.split('.')[0] + '-utf8.txt'
		writeFile(`./utf-8/${newFileName}`, decodeContent, err => {
			if (err) throw err
			console.log(`${newFileName}转换成功！`)
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}

const judgeType = (val, argv) => {
	if (extname(val) != '.txt') {
		console.log('请使用txt格式文件')
	} else {
		console.log(`${val}开始转换...`)
		// 读取txt文件内容
		if (argv) {
			transformFile(argv + '\\' + val, val)
		} else {
			transformFile(val)
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
			// console.log(files)
			files.forEach(el => {
				extname(el) && judgeType(el, argv)
			})
		}
	} catch (err) {
		console.error(err)
		throw err
	}
}

module.exports = run
