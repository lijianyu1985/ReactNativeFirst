/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

export default class ReactNativeFirst extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            openAddUser: false,
            users:[]
        }
        this.openAddUser =
            this.openAddUser.bind(this);
    }

    openAddUser(visible){
      this.setState({openAddUser:visible});
    }

  render() {
    return (
      <View style={styles.container}>
        <UserList users={this.state.users}/>
        <AddUser onClose={(users)=>{this.setState({users:users||this.state.users});this.openAddUser(false);}} visible={this.state.openAddUser}/>
        <Button
          color="#841584"
          onPress={()=>{this.openAddUser(true);}}
          title="Add User"
          accessibilityLabel="add a user to server"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ReactNativeFirst', () => ReactNativeFirst);
