import { homedir } from "node:os";
import { resolve } from "node:path";

export let currentDirectory = homedir();

export const printWorkingDirectory = () => {
  console.log(`You are currently in ${currentDirectory}`);
};

export const goUp = () => {
  const parentDirectory = resolve(currentDirectory, "..");

  if (parentDirectory !== currentDirectory) {
    currentDirectory = parentDirectory;
  }
};
