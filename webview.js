'use strict';

var _path = require('path');
var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Franz => {
  const getMessages = function getMessages() {
    // get unread messages
    const count = document.querySelector('#hangout-landing-chat iframe').contentWindow.document.querySelectorAll('.ee').length;

    // set Franz badge
    Franz.setBadge(count);

    // display desktop notifications
    document.querySelectorAll('iframe.Xyqxtc').forEach(function(frame, frameI) {
      if(frame.offsetParent.id != 'hangout-landing-chat'){
        frame.contentWindow.document.querySelectorAll('.tk.TmwRj.Sn .Mu.SP').forEach(function(msg, msgI){
          var _date = Date.parse(msg.dataset.tooltip.replace(' at ', ' '));
          var _old = JSON.parse(localStorage.getItem('_cs_desktopNotifsLastSeen'));
          if(_old != null){
            if(_old.__t < _date){
              var _title = (msg.querySelector('.lWfe2d').innerText.split("] "))[1];
              var _body = msg.querySelector('.tL8wMe.EMoHub').innerText;
              var _icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Hangouts_icon.svg/200px-Hangouts_icon.svg.png';

              var notification = new Notification(_title, {body: _body, icon: _icon});

              localStorage.setItem('_cs_desktopNotifsLastSeen', JSON.stringify({
                __t: _date,
                __v: true
              }));
            }
          }
        })
      }
    })
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);

  // enable desktop notifications
  localStorage.setItem('_cs_desktopNotifsEnabled', JSON.stringify({
    __t: new Date().getTime(),
    __v: true
  }));

  // fallback function for notification formatting
  if (typeof Franz.onNotify === 'function') {
    Franz.onNotify(notification => {
      if (typeof notification.title !== 'string') {
        notification.title = ((notification.title.props || {}).content || [])[0] || 'Hangouts';
      }

      if (typeof notification.options.body !== 'string') {
        notification.options.body = (((notification.options.body || {}).props || {}).content || [])[0] || '';
      }

      return notification;
    });
  }
};
