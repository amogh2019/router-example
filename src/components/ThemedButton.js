
import React from 'react';

const ThemedButton =  (props) =>  {
    const { theme, label } = props;
    return <button className={`btn btn-${theme}`} {...props}>{ label }</button>
}


export default ThemedButton