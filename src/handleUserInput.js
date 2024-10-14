import { goToDirectory, goUp, printListOfFilesAndDirectories } from './operationHandlers/navigationHandlers.js';
import { NAVIGATION_OPERATIONS } from './constants/operations.js';
import { errorMessageText } from './constants/messageTexts.js';


export const handleUserInput = async (command) => {
	const [operation, ...args] = command.split(" ");

	switch(operation) {
		case NAVIGATION_OPERATIONS.UP:
			goUp();
			break;

		case NAVIGATION_OPERATIONS.CD:
			await goToDirectory(args[0]);
			break;

		case NAVIGATION_OPERATIONS.LS:
			await printListOfFilesAndDirectories();
			break;

		default:
		console.log(errorMessageText);
		break;
	}
};