import * as React from "react";
import * as ReactDOM from "react-dom";


interface BaseProps { }
interface BaseStete { }

class BaseApp extends React.Component<BaseProps, BaseStete>{

    render() {
        return (
            <p>
                test app
            </p>
        )
    }
}

ReactDOM.render(
    <BaseApp />
    ,
    document.getElementById('app')
)
