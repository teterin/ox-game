import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import React from 'react';
import Player from './views/player';
import Arena from './views/arena';
import './style';

/**
 * Application react component.
 * @param props
 * @returns {XML}
 */
const App = props=> {
    const {activePlayer, players, matrix, winMatrix, startResetGame, changePlayerName, markPlace}=props;
    return <div className="container">
        {(()=> {
            if (matrix) {
                const isMatrixFull = matrix.every(row=>row.every(cell=>!!cell));
                let message;
                if (winMatrix) {
                    message = `${activePlayer.value} is winner!!!`;
                } else if (isMatrixFull) {
                    message = `Nobody wins`;
                } else {
                    message = `${activePlayer.value}, your turn. You play '${activePlayer.marker.toUpperCase()}'`;
                }
                return <div>
                    <div>{message}</div>
                    <Arena matrix={matrix} highlightMatrix={winMatrix} action={markPlace}/>
                </div>
            } else {
                return players.map((player, index)=>
                    <Player key={index} label={`Player ${player.marker.toUpperCase()}`} value={player.value}
                            onChange={value=>changePlayerName(index,value)}/>)
            }
        })()}
        <div className="control-panel">
            <button disabled={!players.every(player=>!!player.value)}
                    onClick={startResetGame}>{!!matrix ? 'Reset' : 'Start'}</button>
        </div>
    </div>;
}


export default connect(state => state.toJS(), dispatch=>bindActionCreators(actions, dispatch))(App);



