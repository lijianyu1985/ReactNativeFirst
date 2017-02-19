/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet,
    View,
    Modal,
    TextInput,
    ToastAndroid
} from 'react-native';
import {SERVER_HOST} from './../../constants';

const styles = StyleSheet.create({
    fullWidthButton: {
        backgroundColor: 'blue',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullWidthButtonText: {
        fontSize: 24,
        color: 'white'
    }
});

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            Age: ''
        };
        this.saveUserToServer = this
            .saveUserToServer
            .bind(this);
    }

    saveUserToServer() {
        var user = {
            UserName: this.state.UserName,
            Age: this.state.Age
        };
        fetch(SERVER_HOST + 'adduser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => response.json()).then((responseJson) => {
            this
                .props
                .onClose(responseJson);
            this.setState({UserName: '', Age: ''});
            ToastAndroid.show('user created', ToastAndroid.SHORT);
        }).catch((err) => {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.props.visible}
                onRequestClose={() => {
                this.setState({UserName: '', Age: ''});
                this
                    .props
                    .onClose();
            }}>
                <View
                    style={{
                    marginTop: 22,
                    flex: 1,
                    padding: 1
                }}>
                    <Text>User Info:</Text>
                    <TextInput
                        style={{
                        fontSize: 30
                    }}
                        placeholder='User Name'
                        onChangeText={(UserName) => this.setState({UserName})}
                        value={this.state.UserName}/>
                    <TextInput
                        style={{
                        fontSize: 30
                    }}
                        placeholder='Age'
                        keyboardType="numeric"
                        onChangeText={(Age) => this.setState({Age})}
                        value={this.state.Age}/>
                </View>
                <TouchableHighlight
                    style={styles.fullWidthButton}
                    onPress={this.saveUserToServer}>
                    <Text style={styles.fullWidthButtonText}>Submit</Text>
                </TouchableHighlight>
            </Modal>
        );
    }
}
