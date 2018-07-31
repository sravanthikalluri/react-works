import React, {Component} from "react";
import ReactPlayer from 'react-player'
import {AgGridReact} from "ag-grid-react";
import {Col, Row} from "react-bootstrap";
import {Player} from "video-react";



export default class EditorComponentsExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rowData: this.createRowData(),
            columnDefs: this.createColumnDefs(),
            searchText:''
        };

        this.onGridReady = this.onGridReady.bind(this);
        this.getUserType = this.getUserType.bind(this);
    }

    onGridReady(params) {
        console.log(params);
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
        this.gridApi.setQuickFilter(this.state.searchText);

        // this.gridApi.api.setSortModel(this.state.sort);
    }
    getUserType(event) {
      console.log(event.target.value);
      this.setState({searchText:event.target.value});
        this.gridApi.setQuickFilter(event.target.value);
    }
    createColumnDefs() {
        return [
            {
                headerName: "Name",
                field: "name",
                width: 300,

            },
            {
                headerName: "Mood",
                field: "mood",
                cellRendererFramework:null,
                cellEditorFramework: null,
                editable: true,
                width: 250
            },
            {
                headerName: "Numeric",
                field: "number",
                cellEditorFramework: null,
                editable: true,
                width: 250
            },
            /*{
                headerName:"Custom Created",
                cellRendererFramework:'<div>Added Customaly</div>'
            }*/
        ];
    }
    createNewCol() {
        
    }
    createRowData() {
        return [
            {name: "Bob", mood: "Happy", number: 10},
            {name: "Harry", mood: "Sad", number: 3},
            {name: "Sally", mood: "Happy", number: 20},
            {name: "Mary", mood: "Sad", number: 5},
            {name: "John", mood: "Happy", number: 15},
            {name: "Jack", mood: "Happy", number: 25},
            {name: "Sue", mood: "Sad", number: 43},
            {name: "Sean", mood: "Sad", number: 13},
            {name: "Niall", mood: "Happy", number: 2},
            {name: "Alberto", mood: "Happy", number: 13},
            {name: "Fred", mood: "Sad", number: 53},
            {name: "Jenny", mood: "Happy", number: 34},
            {name: "Larry", mood: "Happy", number: 13},
        ];
    }

    render() {
        return (
        <div className="content-area">
            <Row>
                <Col xs={10}>
                    <input type="text" onChange={this.getUserType.bind(this)}/>
                        <div style={{height: 400, width: 945}}
                             className="ag-fresh">
                            <h1>Cell Editor Component Example</h1>
                           <AgGridReact
                                columnDefs={this.state.columnDefs}
                                rowData={this.state.rowData}
                                enableSorting="true"
                                enableFilter="true"
                                groupHeaders="true"
                                onGridReady={this.onGridReady}>
                            </AgGridReact>
                           {/* <Player
                                playsInline
                               poster="/assets/images/statistic.jpg">
                                <source src="https://www.youtube.com/watch?v=JGwWNGJdvx8"></source>
                            </Player>*/}
                            {/*<ReactPlayer url='https://www.youtube.com/watch?v=JGwWNGJdvx8' playing controls={true} ></ReactPlayer>*/}
                        </div>
                </Col>
            </Row>
        </div>
        );
    }
};