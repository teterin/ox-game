import React from 'react'

/**
 * Cell of arena grid (react component)
 * @param props {value} is 'x' or 'o'
 *              {isHighlight} - It is indicator that the cell has specific background
 *              {action} - handler of user click action
 * @returns {XML}
 */
export default props=> {
    const {value, isHighlight, action}= props;
    let className='cell';
    if(isHighlight){
        className+=' highlight';
    }
    return <div className={className} onClick={action}>{value}</div>;
}