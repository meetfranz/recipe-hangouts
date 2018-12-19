import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    // get unread messages
    const unread = document.querySelector('#hangout-landing-chat iframe')
      .contentWindow.document.querySelectorAll('.ee')

    // remove muted conversations
    const count = Array.prototype.filter.call(
      unread,
      (entry) => !entry.classList.contains('BN')
    ).length

    // set Franz badge
    Franz.setBadge(count);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);
};
