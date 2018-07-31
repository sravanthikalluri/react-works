import * as React from "react";
import {Col, Row} from "react-bootstrap";

class Dashboard extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
        <div className="content-area">
            <Row>
                <Col xs={6}>
                    <div className="card">
                        <p className="content-heading">Guide</p>
                        <h3 className="font-bold">Learn About new multi-tenant solution</h3>
                        <div>
                            New Remote Desktop multi-tenant solution allows the admin to create  a single RD infrastructure
                            development that can support multiple tenants(customers) while keeping each tenant's server farms and associated
                            resources (AD, SQl,File Servers,etc.) in an isolated environment.
                        </div>
                        <div>
                            <img src="/assets/images/statistic.jpg"/>
                        </div>
                    </div>
                </Col>
                <Col  xs={4}>
                    <div className="card">
                        <p className="content-heading">Getting Started</p>
                            <div className="content-items">
                                <p>1</p>
                                <span>Create a deployment</span>
                            </div>
                            <div className="content-items">
                                <p>2</p>
                                <span>Create a tenant</span>
                            </div>
                            <div className="content-items">
                                <p>3</p>
                                <span>Create a host pool</span>
                            </div>
                            <div className="content-items">
                                <p>4</p>
                                <span>Add hosts</span>
                            </div>
                            <div className="content-items">
                                <p>5</p>
                                <span>Create app group</span>
                            </div>
                            <div className="content-items">
                                <p>6</p>
                                <span>Add users</span>
                            </div>
                            <div className="content-items">
                                <p>7</p>
                                <span>Add apps</span>
                            </div>
                        </div>
                </Col>
            </Row>
        </div>
        );
    }
}
export default Dashboard;