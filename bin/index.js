#!/usr/bin/env node
const { argv } = require('yargs')
		.alias('v', 'version')
		.alias('h', 'help'),
	g2u = require('../index'),
	{ blue, red } = require('chalk')

const outputHelpInfo = () => {
	console.log(`${blue('用法:')}
	g2u <命令> [选项]
${blue('选项：')}
	-v, --version  输出版本信息
	-h, --help     输出帮助信息
${blue('命令：')}
	g2u fileName.txt 转换单个文件
	g2u ./dirName 转换文件夹下所有文本文件
${red('注意：')}
	只能对gbk编码文件进行使用，其他编码文件会造成乱码!`)
}

// 没有输入命令
const noArgv = () => {
	if (Object.keys(argv).length == 2 && argv._.length == 0) {
		return true
	}
	return false
}

// 没有输入参数显示帮助信息
noArgv() && outputHelpInfo()

// 输入了txt文件路径
argv._.length > 0 && g2u(argv._[0])
