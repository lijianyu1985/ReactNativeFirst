/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View, ListView} from 'react-native';
import {SERVER_HOST} from './../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    user: {
        flex: 1,
        fontSize: 30,
        padding: 12,
        backgroundColor: 'yellow',
        alignSelf: 'stretch',
        textAlign: 'center'
    },
    list: {
        flex: 1,
        padding: 1,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    },
    userView: {
        flex: 1
    }
});

export default class UserList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([])
        };
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.reloadUsersFlag !== nextProps.reloadUsersFlag) {
            const host = nextProps.ip
            if (!host) {
                return;
            }
            fetch(host + '/findusers').then((response) => response.json()).then((responseJson) => {

                const ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState({
                    dataSource: ds.cloneWithRows(responseJson)
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    componentDidMount() {}

    render() {
        return (
            <ScrollView>
                <ListView
                    style={styles.list}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, index) => <View style={styles.userView}>
                    <Text key={index} style={styles.user}>{rowData.UserName}
                        - {rowData.Age}</Text>
                </View>}/>
            </ScrollView>
        );
    }
}
