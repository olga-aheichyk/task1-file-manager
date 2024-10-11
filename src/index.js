import * as readline from "node:readline/promises";
import process from "node:process";
import { handleUserInput } from './handleUserInput.js';
import { printWorkingDirectory } from './operationHandlers/navigationHandlers.js';
import { goodbyeMessageText, welcomeMessageText } from './constants/messageTexts.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const username =
  process.argv
    .slice(2)
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1] || "User";

const welcomeMessage = welcomeMessageText.replace("{username}", `${username}`);
const goodbyeMessage = goodbyeMessageText.replace("{username}", `${username}`);

console.log(welcomeMessage);
printWorkingDirectory();
rl.prompt();

const closeFileManager = () => {
  console.log(goodbyeMessage);
//   rl.close();
  process.exit(0);
};

rl.on("close", closeFileManager);
rl.on("line", async (input) => {
  const command = input.trim();

  if (command === ".exit") {
    closeFileManager();
  }

  handleUserInput(command);
  printWorkingDirectory();
  rl.prompt();
});
