import React from 'react'
import Field from '../field';
import './style';

/**
 * Arena react component. It is grid 3x3
 * @param props. {matrix} - Array of array 3x3 which may contain 'x' or 'o';
 *               {highlightMatrix} - Array of array 3x3 which contain winning combination
 *               {action} - handler of user click action
 * @returns {XML}
 */
export default props=> {
    const {matrix, highlightMatrix, action}= props;
    return <div className="arena-container">
        {(()=> {
            return matrix.map((row, i)=><div className="row" key={i}>
                {(()=> {
                    return row.map((cell, j)=> {
                        let isHighlight = false;
                        if (highlightMatrix) {
                            isHighlight = highlightMatrix[i][j];
                        }
                        return <Field key={j} isHighlight={isHighlight} value={matrix[i][j]}
                                      action={()=>action(i,j)}/>
                    });
                })()}
            </div>);
        })()}
    </div>;
}