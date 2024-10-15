import { goToDirectory, goUp, printListOfFilesAndDirectories } from './operationHandlers/navigationHandlers.js';
import { FS_OPERATIONS, NAVIGATION_OPERATIONS, ZIP_OPERATIONS } from './constants/operations.js';
import { invalidInputText } from './constants/messageTexts.js';
import { copyFile, createEmptyFile, deleteFile, moveFile, readFile, renameFile } from './operationHandlers/fsOperationsHandlers.js';
import { compressFile, decompressFile } from './operationHandlers/zipOperationsHandlers.js';


export const handleUserInput = async (command) => {
  const [operation, ...args] = command.split(" ");

  switch (operation) {
    case NAVIGATION_OPERATIONS.UP:
      goUp();
      break;

    case NAVIGATION_OPERATIONS.CD:
      await goToDirectory(args[0]);
      break;

    case NAVIGATION_OPERATIONS.LS:
      await printListOfFilesAndDirectories();
      break;

    case FS_OPERATIONS.CAT:
      await readFile(args[0]);
      break;

    case FS_OPERATIONS.ADD:
      createEmptyFile(args[0]);
      break;

    case FS_OPERATIONS.RN:
      await renameFile(args[0], args[1]);
      break;

    case FS_OPERATIONS.CP:
      await copyFile(args[0], args[1]);
      break;

    case FS_OPERATIONS.MV:
      await moveFile(args[0], args[1]);
      break;

    case FS_OPERATIONS.RM:
      await deleteFile(args[0]);
      break;

    case ZIP_OPERATIONS.COMPRESS:
      await compressFile(args[0], args[1]);
      break;

    case ZIP_OPERATIONS.DECOMPRESS:
      await decompressFile(args[0], args[1]);
      break;

    default:
      console.log(invalidInputText);
      break;
  }
};