const parseArgs = require('minimist');
const colors = require('colors');
const fs = require('fs');

const command = parseArgs(process.argv.slice(2, 3));
delete command._;
console.log(command);

const handleCommand = ({ add, remove, list }) => {
  if (add) {
    if (typeof add !== 'string') {
      return console.log(
        'Wpisz nazwę dodawanego zadania (Musi to być tekst)'.bgRed
      );
    } else if (add.length < 7) {
      return console.log('Nazwa zadania musi miec wiecej niż 6 znakow'.bgRed);
    }
    handledata();
  } else if (remove) {
    if (typeof remove !== 'string' || remove.length < 7) {
      return console.log(
        'Wpisz nazwę usuwanego zadania. To musi być tekst i musi mieć więcej niż 6 znakow'
          .bgRed
      );
    }
    handleData();
  } else if (list) {
    handledata();
  } else {
    console.log(
      'nie rozumiem polecenia. użyj --add="nazwa zadania", --remove="nazwa zadania" lub opcji --list'
        .bgYellow
    );
  }
};

const handledata = () => {};
handleCommand(command);
