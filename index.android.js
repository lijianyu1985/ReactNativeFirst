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
  TextInput
} from 'react-native';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

export default class ReactNativeFirst extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openAddUser: false,
      users: [],
      ip: 'https://reactnativefirst-server-dsqqsllqmt.now.sh',
      reloadUsers: false
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
    this.setState({
      reloadUsers: !this.state.reloadUsers
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
          fontSize: 30
        }}
          //keyboardType="numeric"
          placeholder='IP and port - "ip:port"'
          onChangeText={(ip) => this.setState({ip})}
          value={this.state.ip}/>

        <UserList reloadUsersFlag={this.state.reloadUsers} ip={this.state.ip}/>
        <AddUser
          ip={this.state.ip}
          onClose={(users) => {
          this.setState({
            users: users || this.state.users
          });
          this.openAddUser(false);
        }}
          visible={this.state.openAddUser}/>
        <TouchableHighlight
          style={styles.fullWidthButton}
          onPress={() => {
          this.loadUsers();
        }}>
          <Text style={styles.fullWidthButtonText}>Load Users</Text>
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
