import {expect} from 'chai';
import reducer from '../src/reducer';
import {CHANGE_PLAYER_NAME,START_RESET_GAME, MARK_PLACE} from '../src/constant';

describe('reducer', () => {

    it('change player name', () => {
        const state = reducer(undefined, {
            type: CHANGE_PLAYER_NAME,
            index: 0,
            value: 'Test'
        });
        expect(state.getIn(['players', 0, 'value'])).to.equal('Test');
    });
    it('start/reset game', () => {
        const state = reducer(undefined, {
            type: START_RESET_GAME
        });
        expect(state.get('matrix')).to.exist;
        expect(state.get('activePlayer')).to.exist;
        expect(state.get('winMatrix')).to.not.exist;
    });
    it('mark place', () => {
        let state = reducer(undefined, {
            type: START_RESET_GAME
        });
        const activePlayer = state.get('activePlayer');
        state = reducer(state, {
            type: MARK_PLACE,
            i: 1,
            j: 1
        });
        expect(state.getIn(['matrix', 1, 1])).to.equal(activePlayer.get('marker'));
        expect(state.get('activePlayer')).to.not.equal(activePlayer);
    });

    it('place cannot be  marked twice', () => {
        let state = reducer(undefined, {
            type: START_RESET_GAME
        });
        const marker1 = state.get('activePlayer').get('marker');
        state = reducer(state, {
            type: MARK_PLACE,
            i: 1,
            j: 1
        });
        expect(state.getIn(['matrix', 1, 1])).to.equal(marker1);
        const marker2 = state.get('activePlayer').get('marker');
        expect(marker1).to.not.equal(marker2);
        state = reducer(state, {
            type: MARK_PLACE,
            i: 1,
            j: 1
        });
        expect(state.getIn(['matrix', 1, 1])).to.equal(marker1);
    });
    it('win case', () => {
        let state = reducer(undefined, {type: START_RESET_GAME});
        state = reducer(state, {type: MARK_PLACE, i: 0, j: 0});
        state = reducer(state, {type: MARK_PLACE, i: 1, j: 0});
        state = reducer(state, {type: MARK_PLACE, i: 1, j: 1});
        state = reducer(state, {type: MARK_PLACE, i: 2, j: 1});
        state = reducer(state, {type: MARK_PLACE, i: 2, j: 2});
        const winMatrix = state.get('winMatrix');
        expect(winMatrix).to.exist;
        expect(winMatrix[0][0]).to.be.true;
        expect(winMatrix[1][1]).to.be.true;
        expect(winMatrix[2][2]).to.be.true;
    });


});