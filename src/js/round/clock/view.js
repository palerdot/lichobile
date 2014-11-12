var m = require('mithril');
var classSet = require('chessground').util.classSet;

function prefixInteger(num, length) {
  return (num / Math.pow(10, length)).toFixed(length).substr(2);
}

function bold(x) {
  return '<b>' + x + '</b>';
}

function formatClockTime(ctrl, time) {
  var date = new Date(time);
  var minutes = prefixInteger(date.getUTCMinutes(), 2);
  var seconds = prefixInteger(date.getSeconds(), 2);
  var tenths;
  if (ctrl.data.showTenths && time < 10000) {
    tenths = Math.floor(date.getMilliseconds() / 100);
    return bold(seconds) + '<span>.' + bold(tenths) + '</span>';
  } else if (time >= 3600000) {
    var hours = prefixInteger(date.getUTCHours(), 2);
    return bold(hours) + ':' + bold(minutes) + ':' + bold(seconds);
  } else {
    return bold(minutes) + ':' + bold(seconds);
  }
}

module.exports = function(ctrl, color, runningColor) {
  var time = ctrl.data[color];
  return m('div', {
    class: 'clock clock_' + color + ' ' + classSet({
      'outoftime': !time,
      'running': runningColor === color,
      'emerg': time < ctrl.data.emerg
    })
  }, [
    m('div.time', m.trust(formatClockTime(ctrl, time * 1000)))
  ]);
};