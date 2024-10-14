import { homedir } from "node:os";
import { resolve } from "node:path";
import { stat, readdir } from "node:fs/promises";
import { errorMessageText } from "../constants/messageTexts.js";

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

export const goToDirectory = async (dir) => {
  const newDirectory = resolve(currentDirectory, dir);

  try {
    const stats = await stat(newDirectory);
    if (stats.isDirectory()) {
      currentDirectory = newDirectory;
    }
  } catch {
    console.log(errorMessageText);
  }
};

export const printListOfFilesAndDirectories = async () => {
  try {
    const files = await readdir(currentDirectory, { withFileTypes: true });

    const directories = files
      .filter((file) => file.isDirectory())
      ?.map((dir) => dir.name)
      ?.sort()
      ?.map((dir) => {
        return {
          name: dir,
          type: "directory",
        };
      });
    const regularFiles = files
      .filter((file) => file.isFile())
      ?.map((file) => file.name)
      ?.sort()
      ?.map((file) => {
        return {
          name: file,
          type: "file",
        };
      });

    const result = [...directories, ...regularFiles];
    console.table(result);
  } catch {
    console.log(errorMessageText);
  }
};
