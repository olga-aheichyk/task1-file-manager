import { resolve, basename } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { writeFile, rename, unlink } from "node:fs/promises"
import { errorMessageText } from "../constants/messageTexts.js";
import { currentDirectory } from "./navigationHandlers.js";

export const readFile = async (filePath) => {
  const fullPath = resolve(currentDirectory, filePath);
  try {
    const readableStream = createReadStream(fullPath, "utf-8");

    readableStream.on("error", (err) => {
      console.error(err.message);
    });

	readableStream.on("end", () => {
    	console.log("\nReached end of stream");
  	});

    readableStream.pipe(process.stdout);
  } catch {
    console.log(errorMessageText);
  }
};

export const createEmptyFile = async (fileName) => {
	const filePath = resolve(currentDirectory, fileName);

	try {
		await writeFile(filePath, '');
		console.log(`File ${fileName} created`);
	}

	catch {
		console.log(errorMessageText);
	}
};

export const renameFile = async (fileName, newName) => {
  const filePath = resolve(currentDirectory, fileName);
  const newPath = resolve(currentDirectory, newName);

  try {
    await rename(filePath, newPath);
	console.log(`File ${fileName} renamed into ${newName}`);
  }

  catch {
    console.log(errorMessageText);
  }
};

export const copyFile = async (src, dest) => {
  const srcPath = resolve(currentDirectory, src);
  const destPath = resolve(currentDirectory, dest, basename(src));

  try {
    const readable = createReadStream(srcPath);
    const writable = createWriteStream(destPath);

	readable.on("error", (err) => {
    	console.error(err.message);
  	});

	writable.on("error", (err) => {
    	console.error(err.message);
  	});

	readable.on("end", () => {
    	console.log(`File ${src} has been copied to ${destPath}`);
  	});

    readable.pipe(writable);
  }

  catch {
    console.log(errorMessageText);
  }
};

export const deleteFile = async (filePath) => {
  const fullPath = resolve(currentDirectory, filePath);

  try {
    await unlink(fullPath);
	console.log(`File ${filePath} has been deleted`);
  }

  catch {
    console.log(errorMessageText);
  }
};

export const moveFile = async (src, dest) => {
  try {
    await copyFile(src, dest);
    await deleteFile(src);
  }

  catch {
    console.log(errorMessageText);
  }
};
