import React from 'react'
import './style';

/**
 * Player name edit component
 * @param props {label} - Label value
 *              {value} - User name
 *              {onChange} - handler of typing user name
 * @returns {XML}
 */
export default props=> {
    const {label, value, onChange}= props;
    return <div className="player">
        <label>{label}:
            <input type="text" value={value} maxLength="15" onChange={event=>onChange(event.target.value)}/>
        </label>
    </div>;
}
