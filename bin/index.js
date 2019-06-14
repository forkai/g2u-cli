#!/usr/bin/env node
const chalk = require('chalk')
const { argv } = require('yargs')
const run = require('../index')

const outputHelpInfo = () => {
	console.log('用法: g2u <命令> [选项]')
	console.log(chalk.blue('选项'))
	console.log('--version 输出版本信息')
	console.log('--help 输出帮助信息')
	console.log(chalk.blue('命令:'))
	console.log('g2u gbk.txt')
	console.warn(chalk.red('注意：'))
	console.warn('只能对gbk编码文件进行使用，其他编码文件会造成乱码!')
}

// 没有输入命令
const noArgv = () => {
	if (Object.keys(argv).length == 2 && argv._.length == 0) {
		return true
	}
	return false
}

if (noArgv()) {
	outputHelpInfo()
}

// 输入了txt文件路径
if (argv._.length > 0) {
	run(argv._[0])
}
