import React from 'react';
import { ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'

export default function HomeScreen({navigation}) {

    return (
        <ImageBackground source={require('../assets/home.jpg')} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Input
                containerStyle={{marginBottom: 25, width:'70%'}}
                inputStyle={{marginLeft: 10}}
                placeholder='John'
                leftIcon={<Icon name='user' size={24} color='#009788' style={{marginLeft:15}}/>}
            />
            <Button 
                buttonStyle={{backgroundColor:'#009788'}}
                title="Go to gallery"
                type="solid"
                onPress={() => navigation.navigate('Gallery')}
            >  
            </Button>
        </ImageBackground>
    );
}
