# g2u-gbk2utf8

作用：

批量把`gbk`编码的`.txt`文件转码成`.utf-8`编码的文件。


## 使用方法

全局安装：
```bash
# 安装
$npm i -g g2u-cli
# 编译文本文件
$g2u 'fileName.txt'
# 编译目录
$g2u './dirName'
```

局部安装：
```javascript
const g2u = require('g2u-cli')
// 编译文本文件
g2u('fileName.txt')
// 编译目录
g2u('./dirName')
```

## 问题🔔

1. 只能转换`gbk` 编码的文件。
2. 不会判断编码，其它编码的文件，比如`utf-8`，丢进去会转码成乱码文件。
3. 引用了一个包，因为node.js 原生不支持 `gbk`😅。