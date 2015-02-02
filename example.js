var slacker = require('slacker');

slacker.channel_list();
slacker.message_post('C03H4BZPH', 'this is a test message', 'testuser', 'http://icons.iconarchive.com/icons/hopstarter/sleek-xp-software/256/Yahoo-Messenger-icon.png');
slacker.message_update('C03H4BZPH', '1422841482.000007', 'We can do that all day');
slacker.message_delete('C03H4BZPH', '1422841831.000010');