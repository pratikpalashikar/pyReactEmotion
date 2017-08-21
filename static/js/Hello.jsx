import React from "react";
/*Hello class*/
import {Button, Col, Grid, Row} from "react-bootstrap";


var $ = require('jquery');

export default class Hello extends React.Component {

    /*Constructor*/
    constructor(props) {
        super(props);
        this.state = {value: '', emotion: '',emoji:''};
        this.getEmotion = this.getEmotion.bind(this);
        this.setValue = this.setValue.bind(this);
        this.displayEmotion = this.displayEmotion(this);
    }


    setValue(input) {
        this.setState({value: input.target.value})
    }

    displayEmotion() {

        var positiveEmotion = ['\ud83d\ude07','\ud83d\ude3f','\ud83d\ude4b'];
        var negativeEmotion = ['\ud83d\ude07','\ud83d\ude3f','\ud83d\ude4b'];
        var neutralEmotion = ['\ud83d\ude07','\ud83d\ude3f','\ud83d\ude4b'];

        var arrayLength = positiveEmotion.length;
        if (this.state.emotion === 'postive') {
            var randNum = Math.floor(Math.random()*arrayLength);
            this.state.emoji = (positiveEmotion[randNum]);
        } else if (this.state.emotion === 'negative') {
            var randNum = Math.floor(Math.random()*arrayLength);
            this.state.emoji =  (negativeEmotion[randNum]);
        } else {
            var randNum = Math.floor(Math.random()*arrayLength);
            this.state.emoji =  (neutralEmotion[randNum]);
        }

    }

    setEmotionResult(result){
        this.setState = {emotion:result};
        this.displayEmotion();
    }

    getEmotion() {
        $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:5000/' + 'getemotion',
            data: {input: this.state.value}
        }).done(function (response) {
            this.setEmotionResult(response);
        });
    }

    render() {
        return (
            <Grid>
                <form onSubmit={this.getEmotion}>
                    <Row>
                        <Col md={6} mdOffset={5}>
                            <input type="text" value={this.state.value} onChange={this.setValue}/>
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
                        <h1>{this.state.emoji}</h1>
                    </div>
                </Row>

            </Grid>

        );
    }

}
