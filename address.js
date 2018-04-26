/**
 * 提取淘宝地址库
 *
 * 用法:
 *   1. 打开淘宝 https://www.taobao.com/
 *   2. 将下面代码复制到控制台
 *   3. 按回车
 *   4. 复制输出的 json 数据保存到你的文件
 *
 * 仅支持: chrome 48+
 */

'use strict';
KISSY.use(['kg/address/6.0.4/lib/city-provinces-data', 'kg/address/6.0.4/lib/city-cn-data'], (S, provinces, citys) => {
  let _province = [[1, '中国', 0]]; // 初始化
  let _city = [];
  // console.log(provinces, citys);

  // 提取省份
  Object.keys(provinces).forEach(el => {
    provinces[el].forEach(el => {
      _province.push([el[0], el[1][0], 1]) // ['id', '省份名', '1']
    });
  });

  // 提取城市
  citys.forEach(city => {
    _province.forEach(el => {
      if (city[2] === el[0]) { // 提取城市
        _city.push([city[0], city[1][0], el[0]]); // ['id', '城市名', '省份id']
      }
    });
  });

  // 提取县/区
  // 自己实现吧，我的需求到城市就够了。。。

  // 排序
  _province = _province.sort((a, b) => a[0] - b[0]);
  _city.sort((a, b) => {
    if (a[2] === b[2]) {
      return a[0] - b[0]; // 自己id 排序
    }

    return a[2] - b[2]; // 省份id 排序
  });


  // 如果要重新编号 false 改为 true 即可。
  // 重新编号后数据更小，但不建议重新编号。
  if (false) {
    _province.forEach((province, i) => {
      var idx = i + 1;

      _city.forEach(city => {
        if (province[0] == city[2]) {
          city[2] = idx;
        }
      });

      province[0] = idx;
    });

    _city.forEach((city, i) => {
      var idx = i + 32 + 1; // 省份之后的id才是市区id
      city[0] = idx;
    });
  }

  // json 输出
  console.log(JSON.stringify(_province.concat(_city)));
});