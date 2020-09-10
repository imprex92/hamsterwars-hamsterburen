import React from 'react';

const MenuCard = ({color, text}) => {
    return(
        <article className={'menuCard ' + color}>
            <h2>{text}</h2>
        </article>
    )
}

export default MenuCard;