/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, View, ListView} from 'react-native';

const styles = StyleSheet.create({
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
        padding: 1
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
            dataSource: ds.cloneWithRows(props.users || [])
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.users !== nextProps.users) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState({
                dataSource: ds.cloneWithRows(nextProps.users)
            });
        }
    }

    componentDidMount() {}

    render() {
        return (
            <ScrollView>
                <ListView
                    enableEmptySections={true}
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
