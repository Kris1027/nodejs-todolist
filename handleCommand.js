const handleData = require('./handleData');

const handleCommand = ({ add, remove, list }) => {
  if (add) {
    if (typeof add !== 'string') {
      return console.log(
        'Enter the name of the added task (It must be text)'.bgRed
      );
    } else if (add.length < 7) {
      return console.log('The task name must be more than 6 characters'.bgRed);
    }
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== 'string' || remove.length < 7) {
      return console.log(
        'Enter the name of the task to be deleted. It must be text and have more than 6 characters'
          .bgRed
      );
    }
    handleData(2, remove);
  } else if (list) {
    handleData(3, null);
  } else {
    console.log(
      'I don\'t understand the command. Use --add="task name", --remove="task name", or the --list option'
        .bgYellow
    );
  }
};

module.exports = handleCommand;
