import * as React from "react";

class Header extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div  className="header1">
                <div className="left-pane">
                    Snia
                </div>
                <div className="left-pane-heading">Remote Desktop Service</div>
                <div className="right-pane">
                    <span className="glyphicon glyphicon-cog"></span>
                    <span className="glyphicon glyphicon-bell"></span>
                    <span className="font-bold">Hello React</span>
                    <span className="glyphicon glyphicon-user"></span>
                </div>
            </div>
        );
    }
}
export default  Header;