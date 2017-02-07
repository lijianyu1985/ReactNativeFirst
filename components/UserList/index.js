/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

export default class UserList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        fetch('http://172.16.90.26:8075/getlist').then((response) => response.json()).then((responseJson) => {
            this.setState({list: responseJson});
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return ((this.state.list || []).map((item) => <Text style={styles.welcome}>
            {item.UserName}
            - {item.Age}
        </Text>));
    }
}
