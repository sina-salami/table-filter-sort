import React, { memo } from 'react';
import { Wrapper } from './Styled';

const FilterControl = (props) => {
    return (
        <Wrapper>
            <p>{props.title}</p>
            <input
                id={props.name}
                name={props.name}
                type={props.type || 'text'}
                onChange={props.onChange}
                value={props.value}
            />
        </Wrapper>
    );
};

export default memo(FilterControl);
