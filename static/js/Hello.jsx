import React from "react";
/*Hello class*/
import {Button, Col, Grid, Row} from "react-bootstrap";


var $ = require('jquery');

export default class Hello extends React.Component {

    /*Constructor*/
    constructor(props) {
        super(props);
        this.state = {textInput: '', emotion: 'Hi'};
        this.getEmotion = this.getEmotion.bind(this);
        this.setValue = this.setValue.bind(this);
    }


    setValue(input) {
        this.setState({textInput: input.target.value})
    }

    getEmotion(event) {
        event.preventDefault();

        $.ajax({
            type: "GET",
            url: 'http://' + this.props.url + '/' + this.props.method,
            data: {input: this.state.textInput}
        }).then(function (response) {
            this.setState({emotion: response})
        }.bind(this));

    }


    render() {
        return (
            <Grid>
                <form onSubmit={this.getEmotion}>
                    <Row>
                        <Col md={6} mdOffset={5}>
                            <input type="text" value={this.state.textInput} onChange={this.setValue}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} mdOffset={5}>
                            <Button type="submit" value="submit" bsSize="large" bsStyle="danger">
                                Ask Me
                            </Button>
                        </Col></Row>
                </form>
                <Row>
                    <div>
                        <h1>{this.state.emotion}</h1>
                    </div>
                </Row>

            </Grid>

        );
    }

}
