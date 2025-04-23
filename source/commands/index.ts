import checkChatInput from "./chat-inputs/check.js";
import checkContextMenu from "./user-context-menus/check.js";

export const CHAT_INPUT_COMMANDS = [checkChatInput] as const;
export const USER_CONTEXT_MENU_COMMANDS = [checkContextMenu] as const;
