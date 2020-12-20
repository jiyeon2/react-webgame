import React, {memo} from 'react';

const TryFunctional = memo(({item, index}) => {
    return (
        <li>{index}) 입력된 숫자 : {item.value}, {item.result}</li>
    );
})

export default TryFunctional;