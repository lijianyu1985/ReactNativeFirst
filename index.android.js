/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import {SERVER_HOST} from './constants';

export default class ReactNativeFirst extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openAddUser: false,
      users: []
    }
    this.openAddUser = this
      .openAddUser
      .bind(this);
    this.loadUsers = this
      .loadUsers
      .bind(this);
  }

  openAddUser(visible) {
    this.setState({openAddUser: visible});
  }

  loadUsers() {
    fetch(SERVER_HOST + '/findusers').then((response) => response.json()).then((responseJson) => {
      this.setState({users: responseJson});
      ToastAndroid.show('users loaded', ToastAndroid.SHORT);
    }).catch((err) => {
      ToastAndroid.show(err, ToastAndroid.SHORT);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <UserList users={this.state.users}/>
        <AddUser
          onClose={(users) => {/*this.setState({ users: users || this.state.users });*/
          this.openAddUser(false);
        }}
          visible={this.state.openAddUser}/>
        <TouchableHighlight
          style={styles.fullWidthButton}
          onPress={() => {
          this.loadUsers();
        }}>
          <Text style={styles.fullWidthButtonText}>Click Load Users</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.fullWidthButton}
          onPress={() => {
          this.openAddUser(true);
        }}>
          <Text style={styles.fullWidthButtonText}>Add User</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  fullWidthButton: {
    backgroundColor: 'blue',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: 'white'
  }
});

AppRegistry.registerComponent('ReactNativeFirst', () => ReactNativeFirst);
