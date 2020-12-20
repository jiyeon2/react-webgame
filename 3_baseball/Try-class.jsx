import React, {PureComponent} from "react";

class Try extends PureComponent{

    render() {
        const {item, index} = this.props;
        return (
            <li>{index}) 입력된 숫자 : {item.value}, {item.result}</li>
        );
    }
}

export default Try;