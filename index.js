// 内置库
const { basename, extname } = require('path'),
	{ log, error } = console,
	{ exit } = process
// 外部库
const { decode } = require('iconv-lite'),
	{ blue, red } = require('chalk'),
	{
		readdir,
		readFile,
		existsSync,
		writeFile,
		mkdirSync
	} = require('fs-extra')

// 将文本文件从gbk编码转换成utf-8编码
const transformFile = async (filePath, fileName) => {
	try {
		fileName || (fileName = filePath)
		const originalContent = await readFile(filePath)
		const decodeContent = decode(originalContent, 'gbk')
		// 创建utf-8目录存放转换后的文本文件
		existsSync('./utf-8/') || mkdirSync('./utf-8')
		// 转换后的文本文件的文件名
		const newFileName = fileName.split('.')[0] + '-utf8' + extname(fileName)
		// 把转换后的文本写入新文件
		await writeFile(`./utf-8/${newFileName}`, decodeContent)
		log(`${blue(newFileName)}---转换成功！🎉`)
	} catch (err) {
		error(`${red('[错误] ')}文件夹转换失败😭`)
		exit(1)
	}
}

// 判断文件拓展名是否是txt
const judgeType = (fileName, dirName) => {
	if (extname(fileName) != '.txt') {
		log('请使用txt格式文件🤷🏻‍')
	} else {
		log(`${blue(fileName)}---开始转换...💪`)
		dirName
			? transformFile(dirName + '\\' + fileName, fileName)
			: transformFile(fileName)
	}
}

// 判断是文件还是目录
const g2u = async filePath => {
	filePath = basename(filePath)
	try {
		if (extname(filePath)) {
			judgeType(filePath)
		} else {
			const files = await readdir(filePath)
			files.forEach(el => {
				extname(el) && judgeType(el, filePath)
			})
		}
	} catch (err) {
		error(`${red('[错误] ')}命令错误🤦‍，查看帮助请输入: ${blue('g2u')}`)
		exit(1)
	}
}

module.exports = g2u
