
import React, { Component } from 'react';
import { Platform, Image, Text, Dimensions, View, BackHandler, Animated, TouchableOpacity } from 'react-native';



let { width, height } = Dimensions.get('window');

export default class First extends React.Component {

    componentDidMount() {
        console.log("hiii first component")
    }

    render() {

        return (
            <View>
                <View>
                    <Image
                       source={require('../../assets/logo.png')}
                        resizeMode={'cover'}
                        style={{
                            width: 300,
                            height: 300
                        }}
                    />

                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{color:'pink', fontSize:150}}>Your overlay text</Text>
                    </View>
                </View>
            </View>
        )
    }
}




