import React, { Component } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { Card, FormGroup, InputGroup, Container, Col, Button } from 'react-bootstrap';

export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userName_ex: '',
            userPhone: '',
            isOpen: false,
            dataLoaded: false,
            isFormInvalid: false,
            rows: null,
            cols: null
        }
        this.fileHandler = this.fileHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.fileInput = React.createRef();
    }

    renderFile = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    dataLoaded: true,
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });
    }

    fileHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            let fileName = fileObj.name;


            //check for file extension and pass only if it is .xlsx and display error message otherwise
            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedFileName: fileName,
                    isFormInvalid: false
                });
                this.renderFile(fileObj)
            }
            else {
                this.setState({
                    isFormInvalid: true,
                    uploadedFileName: ""
                })
            }
        }
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    
      openFileBrowser = () => {
        this.fileInput.current.click();
      }

    // fileHandler = (event) => {
    //     let fileObj = event.target.files[0];

    //     //just pass the fileObj as parameter
    //     ExcelRenderer(fileObj, (err, resp) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             this.setState({
    //                 cols: resp.cols,
    //                 rows: resp.rows
    //             });
    //             console.log(resp.cols);
    //             console.log(JSON.stringify(resp.rows));
    //             console.log(resp.rows[0][0]);
    //         }

    //         var count = Object.keys(resp.rows).length;
    //         console.log(count);

    //         let xlsxJson = {
    //             name: resp.rows[1][0],
    //             name_ex: resp.rows[1][1],
    //             phone: resp.rows[1][2],
    //         }

    //         console.log(JSON.stringify(xlsxJson));
    //     });
    // }

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} />
                <Container>
                    <form>
                        <FormGroup row='true'>
                            <Col xs={4} sm={8} lg={10}>
                                <InputGroup>
                                    <Button color="info" style={{ color: "white", zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Browse&hellip;</Button>
                                    <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                                    <input type="text" className="form-control" value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </form>

                    {this.state.dataLoaded &&
                        <div>
                            <Card body outline color="secondary" className="restrict-card">
                                <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" />
                            </Card>
                        </div>}
                </Container>
            </div>
        );
    }
}

class PrintClass extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li>{this.props.name} {this.props.name_ex} {this.props.phone}</li>
        )
    }
}