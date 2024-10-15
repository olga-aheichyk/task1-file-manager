import { resolve, basename } from "node:path";
import fs from "node:fs";
import { currentDirectory } from "./navigationHandlers.js";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { errorMessageText } from "../constants/messageTexts.js";

export const compressFile = async (filePath, destinationPath) => {
  try {
    const srcPath = resolve(currentDirectory, filePath);
    const destPath = resolve(
      currentDirectory,
      destinationPath,
      `${basename(destinationPath)}.br`
    );

    const gzip = createBrotliCompress();
    const readable = fs.createReadStream(srcPath);
    const writable = fs.createWriteStream(destPath);

    await pipeline(readable, gzip, writable);
    console.log("Operation has been executed successfully");
  }

  catch {
    console.log(errorMessageText);
  }
};

export const decompressFile = async (compressedPath, destinationPath) => {
  try {
    const srcPath = resolve(currentDirectory, compressedPath);
    const destPath = resolve(
      currentDirectory,
      destinationPath
    );

    const unzip = createBrotliDecompress();
    const readable = fs.createReadStream(srcPath);
    const writable = fs.createWriteStream(destPath);

    await pipeline(readable, unzip, writable);
    console.log("Operation has been executed successfully");
  } catch {
    console.log(errorMessageText);
  }
};
