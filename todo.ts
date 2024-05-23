#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];
let condition = true;

// Print Welcome Message
console.log(chalk.magenta.bold.italic(`\n\t Welcome to \\ Dua Khan \\ - Todo-List-Project \n`));

const main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.green("\n Select an option you want to do: "),
                choices: ["Add Task", "Delete Task", "Update Task", "View TODO-List", "Exit"]
            }
        ]);

        switch (option.choice) {
            case "Add Task":
                await addTask();
                break;
            case "Delete Task":
                await deleteTask();
                break;
            case "Update Task":
                await updateTask();
                break;
            case "View TODO-List":
                await viewTask();
                break;
            case "Exit":
                condition = false;
                break;
        }
    }
}

// Function to add New Task to the List
const addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellowBright("Enter your New Task: "), 
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.greenBright(`\n \t"${newTask.task}", successfully added to your TODO-List`));
}

// Function to view all TODO-List-Tasks
const viewTask = async () => {
    console.log("\n Your TODO-List: \n");
    todoList.forEach((task, index) => {
        console.log(chalk.cyan(`${index}: ${task}`));
    });
}

// Function to delete a task from List
const deleteTask = async () => {
    if (todoList.length === 0) {
        console.log(chalk.red("\n Your TODO-List is empty. \n"));
        return;
    }
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.redBright("\n Enter the 'index.no' of the task that you want to delete: ")
        }
    ]);

    if (taskIndex.index >= 0 && taskIndex.index < todoList.length) {
        let deletedTask = todoList.splice(taskIndex.index, 1);
        console.log(chalk.greenBright(`\n \t"${deletedTask}" has been deleted successfully from your TODO-List.`));
    } else {
        console.log(chalk.red("\n Invalid index. \n"));
    }
}

// Function to update a Task
const updateTask = async () => {
    if (todoList.length === 0) {
        console.log(chalk.red("\n Your TODO-List is empty. \n"));
        return;
    }
    await viewTask();
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.redBright("Enter the 'index.no' of the task that you want to update: "), 
        }
    ]);

    if (updateTaskIndex.index >= 0 && updateTaskIndex.index < todoList.length) {
        let newTask = await inquirer.prompt([
            {
                name: "task",
                type: "input",
                message: chalk.yellowBright("Now, Enter new Task:")
            }
        ]);

        todoList[updateTaskIndex.index] = newTask.task;
        console.log(chalk.greenBright(`\tTask at index.no ${updateTaskIndex.index} updated successfully [for updated list Check option: View TODO-List]`));
    } else {
        console.log(chalk.red("\n Invalid index. \n"));
    }
}

main();