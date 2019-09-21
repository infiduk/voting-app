import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            userName_ex: '',
            userPhone: '',
        }
    }

    fileHandler = (event) => {
        let fileObj = event.target.files[0];

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    cols: resp.cols,
                    rows: resp.rows
                });
                console.log(resp.cols);
                console.log(JSON.stringify(resp.rows));
                console.log(resp.rows[0][0]);
            }

            var count = Object.keys(resp.rows).length;
            console.log(count);

            let xlsxJson = {
                name: resp.rows[1][0],
                name_ex: resp.rows[1][1],
                phone: resp.rows[1][2],
            }

            console.log(JSON.stringify(xlsxJson));
        });
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} />
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