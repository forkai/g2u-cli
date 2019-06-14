# g2u-gbk2utf8

作用：

批量把`gbk`编码的`.txt`文件转码成`.utf-8`编码的文件。


## 使用方法

1. `git clone git@github.com:forkai/gbk2utf.git`
2. 使用`npm i -g`安装。
3. 执行`g2u 文件名或者文件夹`


## 问题🔔

1. 只能转换`gbk` 编码的文件。
2. 不会判断编码，其它编码的文件，比如`utf-8`，丢进去会转码成乱码文件。
3. 引用了一个包，因为node.js 原生不支持 `gbk`😅。