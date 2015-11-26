import {CHANGE_PLAYER_NAME, MARK_PLACE, START_RESET_GAME} from './constant';

/**
 * This function generate action of user name changing
 * @param index - index of player in array
 * @param value - new user name
 * @returns {{type: CHANGE_PLAYER_NAME, index: *, value: *}}
 */
export function changePlayerName(index, value) {
    return {
        type: CHANGE_PLAYER_NAME,
        index,
        value
    };
}

/**
 * This function generate action when player mark place 'x' or 'o' in arena
 * @param i - x-coordinate of place in arena
 * @param j   y-coordinate of place in arena
 * @returns {{type: MARK_PLACE, i: *, j: *}}
 */
export function markPlace(i, j) {
    return {
        type: MARK_PLACE,
        i,
        j
    };
}

/**
 * This function generate action start new game or reset current.
 * @returns {{type: START_RESET_GAME}}
 */
export function startResetGame() {
    return {
        type: START_RESET_GAME
    };
}

