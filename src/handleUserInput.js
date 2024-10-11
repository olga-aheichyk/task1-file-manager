import { goUp } from './operationHandlers/navigationHandlers.js';
import { NAVIGATION_OPERATIONS } from './constants/operations.js';
import { errorMessageText } from './constants/messageTexts.js';


export const handleUserInput = (command) => {
	switch(command) {
		case NAVIGATION_OPERATIONS.UP:
			goUp();
			break;
		default:
		console.log(errorMessageText);
		break;
	}
};