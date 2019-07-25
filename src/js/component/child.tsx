import * as React from "react";
import * as ReactDom from "react-dom";

export class ChildComponent extends React.Component<any,any>{

    public render(){
        
        return(
            <div>
            <p>this is child</p>
            <input type="button" defaultValue="click" onClick={this.props.ParentButton} />

            </div>
        );
    }
}