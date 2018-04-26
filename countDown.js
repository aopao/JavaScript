/**
 * 倒计时处理方法 (精确时间处理)
 *
 * @param {Number} seconds 剩余秒数/时间戳
 * @param {Function} callback 回调函数
 * @param {Boolean} timeStamp 是否时间戳
 *
 * 使用例子
 *
 * // 情况1：后台给的是倒计时 秒
 * var time = 10; // 10秒
 * countDown(time, function(seconds) {
 *   console.log('倒计时1', seconds);
 * });
 *
 * // 情况2：后台给的是 时间戳
 * var time = ((+new Date() / 1000) | 0) + 12; // 模拟 php 10位的时间戳 如 1496726965
 * countDown(time, function(seconds) {
 *   console.log('倒计时2', seconds);
 * }, true); // 第三个参数 true
 */
function countDown(seconds, callback, timeStamp) {
  seconds = parseInt(seconds, 10);

  // 非数字直接退出
  if (isNaN(seconds)) {
    return false;
  }

  var expires = 0; // 到期时间戳 (只精确到秒)
  var timeoutID = 0; // 倒计时句柄

  // 时间戳还是剩余秒数
  if (timeStamp) {
    expires = seconds; // php 时间戳到秒，可直接用
  } else {
    expires = parseInt(+new Date() / 1000 + seconds, 10); // 到期时间戳 (只精确到秒)
  }

  function runner() {
    var time = parseInt(expires - new Date() / 1000, 10); // 剩余时间
    callback(time);

    if (time === 0) {
      clearTimeout(timeoutID);
    } else {
      timeoutID = setTimeout(runner, 1000);
    }
  }

  runner();
}