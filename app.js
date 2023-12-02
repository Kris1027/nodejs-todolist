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

const handleData = (type, title) => {
  // type: number; (1 - add; 2 - remove; 3 - list;)
  // title: string || null
  const data = fs.readFileSync('data.json');
  const tasks = JSON.parse(data);
  console.log(tasks);

  if (type === 1 || type === 2) {
    const isExisted = tasks.find((task) => task.title === title) ? true : false;
    if (type === 1 && isExisted) {
      return console.log('Task already exists'.bgRed);
    } else if (type === 2 && !isExisted) {
      return console.log('I cannot delete a task that does not exist'.bgRed);
    }
  }

  let dataJSON = JSON.stringify(tasks);

  switch (type) {
    case 1:
      const id = tasks.length + 1;
      tasks.push({ id, title });
      dataJSON = JSON.stringify(tasks);
      fs.writeFileSync('data.json', dataJSON);
      console.log(`Adding a task: ${title}`.white.bgGreen);
      break;

    case 2:
      const index = tasks.findIndex((task) => task.title === title);
      tasks.splice(index, 1);
      console.log(tasks);
      dataJSON = JSON.stringify(tasks);
      fs.writeFile('data.json', dataJSON, 'utf-8', (err) => {
        if (err) throw err;
        console.log(`Task ${title} was REMOVED`.red.bgGreen);
      });
      break;

    case 3:
      console.log(
        `The ToDoList includes ${tasks.length} items. You have to do: `.bgCyan
      );
      if (tasks.length) {
        tasks.forEach((task, index) => {
          if (index % 2) return console.log(task.title.green);
          return console.log(task.title.yellow);
        });
      }
  }
};

handleCommand(command);
