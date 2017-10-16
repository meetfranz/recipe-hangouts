import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    // get unread messages
    const count = document.querySelector('#hangout-landing-chat iframe')
      .contentWindow.document.querySelectorAll('.ee')
      .length;

    // set Franz badge
    Franz.setBadge(count);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
