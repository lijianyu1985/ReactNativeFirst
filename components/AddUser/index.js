/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Text,Button, StyleSheet, View, Modal, TextInput} from 'react-native';
import {SERVER_HOST} from './../../constants';

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state={
            UserName:'',
            Age:''
        };
        this.saveUserToServer = 
        this.saveUserToServer.bind(this);
    }

    saveUserToServer(){
        var user = {
            UserName : this.state.UserName,
            Age : this.state.Age,
        };
        fetch(SERVER_HOST+'adduser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then((response) => response.json()).then((responseJson) => {
            this.props.onClose(responseJson);
            this.setState({
                UserName:'',
                Age:''
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    
    render() {
        return (<Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.visible}
          onRequestClose={() => {this.props.onClose();}}
          >
         <View style={{marginTop: 22,flex: 1, padding: 1,}}>
            <Text>User Info:</Text>
            <TextInput 
                style={{fontSize: 30 }}
                placeholder='User Name'
                onChangeText={(UserName) => this.setState({UserName})}
                value={this.state.UserName} />
            <TextInput 
                style={{fontSize: 30}}
                placeholder='Age'
                keyboardType="numeric"
                onChangeText={(Age) => this.setState({Age})}
                value={this.state.Age} />
         </View>
        <Button
            color="#841584"
            onPress={this.saveUserToServer}
            title="Submit"
            accessibilityLabel="add a user to server"
            />
        </Modal>);
    }
}
