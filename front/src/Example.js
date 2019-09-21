import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { ExcelRenderer } from 'react-excel-renderer';

export default class Example extends Component {

    handleChange(e) {
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            console.log(fileReader.result);
        };
        fileReader.readAsText(file);
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Use reader.result
            console.log(reader.result)
        }
        reader.readAsBinaryString(files);
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
                console.log(resp.rows[0][0]);
            }

            var count = Object.keys(resp.rows).length;
            console.log(count);

            let xlsxJson = {
                name: resp.rows[1][0],
                name_ex: resp.rows[1][1],
                phone: resp.rows[1][2],
            }

            console.log(xlsxJson);
        });
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange.bind(this)} />
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.xlsx'}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
                <input type="file" onChange={this.fileHandler.bind(this)} style={{ "padding": "10px" }} />
            </div>
        );
    }
}