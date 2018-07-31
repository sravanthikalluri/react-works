import * as React from "react";
import Header from "./header.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import EditorComponentsExample from "../Example/Example.jsx";
import AddModal from "../home/add-Modal.jsx";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Col} from "react-bootstrap";
import Home from '../home/home.jsx';


class SideMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            width:1,
            expand:false
        }
    }
    changeWidth() {
        if(this.state.expand) {
            this.setState({width:1});
        }
        else {
            this.setState({width:2});
        }
        this.setState({expand:!this.state.expand});
    }
    render() {
        return (
            <div>
                <div>
                    <Header/>
                </div>
                 <Router>
                     <div className="left-pane-menu">
                         <Col xs={this.state.width} className="side-menu">
                             <div className="menu-bar">
                                 <div>
                                     <a onClick={this.changeWidth.bind(this)}>
                                         {
                                             this.state.expand?<span className="glyphicon glyphicon-menu-left"></span>:<span className="glyphicon glyphicon-menu-right"></span>
                                         }
                                    </a>
                                 </div>
                                 <div>
                                     <Link to="/">
                                         <span className="glyphicon glyphicon-home"></span>
                                         {
                                             this.state.expand?<span>Home</span>:null
                                         }
                                     </Link>
                                 </div>
                                 <div>
                                     <Link to="/contact">
                                         <span className="glyphicon glyphicon-dashboard"></span>
                                         {
                                             this.state.expand?<span>DashBoard</span>:null
                                         }
                                     </Link>
                                 </div>
                                 <div>
                                    <Link to="/about">
                                        <span className="glyphicon glyphicon-phone-alt"></span>
                                        {
                                            this.state.expand?<span>ContactUS</span>:null
                                        }
                                    </Link>
                                 </div>
                                 <div>
                                     <Link to="/Home">
                                         <span className="glyphicon glyphicon-ok-sign"></span>
                                         {
                                             this.state.expand?<span>Home</span>:null
                                         }
                                     </Link>
                                 </div>

                             </div>
                         </Col>
                         <div>
                             <Route exact path='/'  component={Dashboard} />
                             <Route  path='/about'  component={AddModal} />
                             <Route  path='/contact'  component={EditorComponentsExample} />
                             <Route path='/Home' component={Home} />
                         </div>
                     </div>
                 </Router>
            </div>
        );
    }
}
export default SideMenu;