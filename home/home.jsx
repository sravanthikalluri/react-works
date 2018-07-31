import * as React from "react";
import {
    Button, Checkbox, Col, DropdownButton, FormControl, Modal,
    Row
} from "react-bootstrap";
import Emp from "./Emp.jsx";


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            getTitle:'Add An Employee',
            userType:'All',
            reverse:false,
            searchDetails:{
              "eName":'',
                "empId":''
            },
            isChecked:false,
            showModal :false,
            result:[],
             searchResults:[],
           addedDetails:{
                "empId":"",
                "eName":"",
                "sal":"",
                "active":""
            },
            isEdit:false,
        };

        this.getEmployeesDetails();
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.add = this.add.bind(this);
       this.doSearch = this.doSearch.bind(this);
       this.reset = this.reset.bind(this);
       this.getActiveEmployees = this.getActiveEmployees.bind(this);
    }
    getEmployeesDetails() {
        fetch(`http://localhost:8081/SpringMVCHibernate/persons`)
            .then((data)=> {
                return data.json()
            })
            .then((data) => {
                this.setState({result: data,searchResults:data});
            });
    }
    doSearch(searchText) {
        var sa = new Array();
        this.state.searchDetails[searchText.target.name] = searchText.target.value;
        if(searchText && searchText.target.value) {
            let stringMatch = new RegExp(searchText.target.value, 'i');
            this.state.searchResults.forEach((data) => {
                if (stringMatch.test(data[searchText.target.name])) {
                    sa.push(data);
                }
            });
            this.setState({searchResults:sa});
        }
        else {
           this.setState({searchResults:this.state.result});
        }
    }
    sortBy(field,order) {

        var sortResults = this.state.result;
        if(order) {
            sortResults.sort((a, b) => {
                if ( a[field] < b[field] ){
                    return 1;
                }else if( a[field] > b[field] ){
                    return -1;
                }else{
                    return 0;
                }
            });
        }
        else {
            sortResults.sort((a, b) => {
                if ( a[field] < b[field] ){
                    return -1;
                }else if( a[field] > b[field] ){
                    return 1;
                }else{
                    return 0;
                }
            });
        }
       this.setState({searchResults:sortResults});
    }
    reset() {
        var sd = {
            "eName":'',
            "empId":''
        }
        this.setState({searchDetails:sd});
        this.setState({searchResults:this.state.result});
        this.setState({userType:'All'});
        this.setState({isChecked:false});
    }
    getActiveEmployees(event) {
        this.setState({isChecked:!this.state.isChecked});
        if(!this.state.isChecked) {
            this.state.searchResults = this.state.searchResults.filter((data) => {
               return  data.active == "active";
            });
            this.setState({searchResults:this.state.searchResults});
        }
        else {
            this.setState({searchResults:this.state.result});
        }
    }
    getUserType(event) {
        this.setState({userType:event.target.value});
        if(event.target.value != 'all') {
            this.state.searchResults = this.state.result.filter(data => {
                return data.active == event.target.value;
            });
        }
        else {
            this.state.searchResults = this.state.result;
        }
        this.setState({searchResults:this.state.searchResults});
    }
    onChange(event) {
        this.state.addedDetails[event.target.name] = event.target.value;
        this.setState({addedDetails: this.state.addedDetails});
    }
    open() {
        this.setState({showModal: true});
    }
    close()  {
        this.setState({showModal: false,isEdit:false,addedDetails:{}});
    }
    add() {
        var scope = this;
        if(!this.state.isEdit) {
            fetch('http://localhost:8081/SpringMVCHibernate/person/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.addedDetails)
            })
                .then(function(response) {
                    if(response.status != 200) {
                        console.log("Error");
                    }
                    else {
                        scope.getEmployeesDetails();
                        scope.close();
                    }
                })
                .catch(function(res) {
                    console.log("error" + res);
                }) ;
        }
        else {
            fetch('http://localhost:8081/SpringMVCHibernate/person/update/'+this.state.addedDetails.empId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.addedDetails)
            })
                .then(function(response) {
                    if(response.status != 200) {
                        console.log("Error");
                    }
                    else {
                        scope.getEmployeesDetails();
                        scope.close();
                    }
                })
                .catch(function(res) {
                    console.log("error" + res);
                }) ;
        }
        this.setState({addedDetails: {}});
        this.close();
    }
    getEmployeeInfo(data,scope,action) {
        scope.setState({addedDetails:data});
        if(action == "edit") {
            scope.setState({isEdit:true,getTitle:'Edit Existing Employee'});
            scope.open();
        }
       else {
            scope.deleteEmployee(data);
        }

    }
    deleteEmployee(data) {
        var scope = this;
        fetch('http://localhost:8081/SpringMVCHibernate/remove/'+data.empId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(function(response) {
                if(response.status != 200) {
                    console.log("Error");
                }
                else {
                    scope.getEmployeesDetails();
                }
            })
            .catch(function(res) {
                console.log("error" + res);
            }) ;
    }
    handlePageClick(event) {
        alert(event.selected);
    }
    render() {
        var empDetails = this.state.searchResults.map((data,index) => {
            return <Emp key={index} employee={data} empInfo={this.getEmployeeInfo} scope={this}></Emp>
        });

        return (
            <div className="content-area">
                <Row>
                <Col xs={10}>
                <div className="body" >
                   <div className="search-bar">
                       <Row className="show-grid">
                           <Col xs={1}>
                               <Button bsStyle="danger" onClick={this.reset}>reset</Button>
                           </Col>
                           <Col xs={3}>
                               <FormControl type="text"  placeholder="Search All"/>
                           </Col>
                           <Col xs={3}>
                               <FormControl type="text"  placeholder="Search ById" name="empId" value={this.state.searchDetails.empId} onChange={this.doSearch}/>
                           </Col>
                           <Col xs={3}>
                               <FormControl type="text"  placeholder="Search ByName" name="eName" value={this.state.searchDetails.eName} onChange={this.doSearch} />
                           </Col>
                           <Col xs={2}>
                               <Button bsStyle="danger" onClick = {this.open}>Add New User</Button>
                           </Col>
                       </Row>
                       <Row className="show-grid no-margin">
                           <Col xs={2}>
                               <Row>
                                   <label>Search By User Type</label>
                               </Row>
                               <Row>
                                   <select onChange={this.getUserType.bind(this)} value={this.state.userType} name="active">
                                       <option value="all">All</option>
                                       <option value="active">Active</option>
                                       <option value="terminated">Terminated</option>
                                   </select>
                               </Row>
                           </Col>
                           <Col xs={2}>
                               <Row>
                                   <label>Check Active Users</label>
                               </Row>
                               <Row>
                                   <Checkbox bsSize="large" checked={this.state.isChecked} onChange={this.getActiveEmployees}/>
                               </Row>
                           </Col>
                           <Col xs={3}>
                               <Row>
                                   <label>Items per page</label>
                               </Row>
                               <Row>
                                   <DropdownButton bsSize="small" title = "5" id="itemsPerPage">
                                   </DropdownButton>
                               </Row>
                           </Col>
                       </Row>
                       <Row>
                           <table className="table table-bordered">
                               <thead>
                               <tr>
                                   <th className="col-md-4">Employee ID <span className="glyphicon glyphicon-sort-by-order" onClick={this.sortBy.bind(this,'empId',0)} ></span></th>
                                   <th >Employee Name <span className="glyphicon glyphicon-sort-by-alphabet" onClick={this.sortBy.bind(this,'eName',0)}></span> </th>
                                   <th>Salary</th>
                                   <th>User Type</th>
                                   <th></th>
                                   <th></th>
                               </tr>
                               </thead>
                               <tbody >
                               { empDetails }
                               </tbody>
                           </table>
                       </Row>

                   </div>
                    {/*<ReactPaginate previousLabel={"previous"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageCount={4}
                                   pageRangeDisplayed={2}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   activeClassName={"active"} />*/}
                    <div className="pagination pull-right">
                        <button disabled="true"  className="btn btn-default btn-sm glyphicon glyphicon-triangle-left pull-left"></button>
                        <button  className="btn btn-default btn-sm middlebtn pull-left">{1} of {1}</button>
                        <button  onClick={this.handlePageClick}  className="btn btn-default btn-sm glyphicon glyphicon-triangle-right pull-left"></button>
                   </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.close} keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.getTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="add-employee-modal">
                        <Row>
                            <Col xs={3}>
                                <label>Employee ID</label>
                            </Col>
                            <Col xs={5}>
                                <FormControl type="text" name="empId" value={this.state.addedDetails.empId} onChange={this.onChange.bind(this)} disabled={this.state.isEdit}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label>Employee Name</label>
                            </Col>
                            <Col xs={5}>
                                <FormControl type="text"  name="eName" value={this.state.addedDetails.eName} onChange={this.onChange.bind(this)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label>Salary</label>
                            </Col>
                            <Col xs={5}>
                                <FormControl type="text" name="sal" value={this.state.addedDetails.sal} onChange={this.onChange.bind(this)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label>User Type</label>
                            </Col>
                            <Col xs={5}>
                                <select onChange={this.onChange.bind(this)} value={this.state.addedDetails.active} name="active">
                                    <option value="active">Active</option>
                                    <option value="terminated">Terminated</option>
                                </select>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.add}>Save</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
                </Col>
                </Row>
            </div>
        );
    }
}

export default Home;