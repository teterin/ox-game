import {CHANGE_PLAYER_NAME,START_RESET_GAME, MARK_PLACE} from './constant';
import Immutable from 'immutable';

const initState = Immutable.fromJS({
    players: [{marker: 'x'}, {marker: 'o'}]
});

/**
 * This is main function of whole application. The function recieves current state and within depends on action
 * generates new state
 * @param state - current state of application
 * @param action - user/system action
 * @returns {*} - new state
 */
export default(state = initState, action) => {

    switch (action.type) {
        case CHANGE_PLAYER_NAME:
            return state.setIn(['players', action.index, 'value'], action.value);
            break;
        case MARK_PLACE:
            const activePlayer = state.get('activePlayer');
            const marker = activePlayer.get('marker');
            if (state.get('winMatrix') || state.getIn(['matrix', action.i, action.j])) {
                return state;
            }
            return state.withMutations(state=> {
                state.setIn(['matrix', action.i, action.j], marker)
                state.set('winMatrix', checkWinner(state.get('matrix').toJS(), marker));
                if (!state.get('winMatrix')) {
                    state.set('activePlayer', state.getIn(['players', +!state.get('players').indexOf(activePlayer)]));
                }
            });

        case START_RESET_GAME:
            if (state.has('matrix')) {
                return state.delete('matrix').delete('winMatrix')
            } else {
                return state.set('matrix', Immutable.fromJS(getClearArea()))
                    .set('activePlayer', state.getIn(['players', Math.floor(Math.random() * 2)]));
            }
    }
    return state;
}

function getClearArea(n = 3) {
    return Array.apply(null, Array(n)).map(()=>Array(n));
}

function checkWinner(matrix, marker) {
    const n = matrix.length;
    const fun = (getter, setter)=> {
        let winMatrix;
        for (let i = 0; i < n; i++) {
            winMatrix = getClearArea();
            let isMatch = true;
            for (let j = 0; j < n; j++) {
                if (getter(i, j) === marker) {
                    setter(winMatrix, i, j, true);
                } else {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                return winMatrix;
            }
        }
        return;
    }
    return fun((i, j)=>matrix[i][j], (matrix, i, j, value)=>matrix[i][j] = value) ||
        fun((i, j)=>matrix[j][i], (matrix, i, j, value)=>matrix[j][i] = value) ||
        fun((i, j)=>matrix[j][j], (matrix, i, j, value)=>matrix[j][j] = value) ||
        fun((i, j)=>matrix[j][n - 1 - j], (matrix, i, j, value)=>matrix[j][n - 1 - j] = value)

}