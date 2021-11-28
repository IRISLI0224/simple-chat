const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('DD  MMM YYYY ') +'at'+ moment().format(' h:mm ')
  };
}

module.exports = formatMessage;
