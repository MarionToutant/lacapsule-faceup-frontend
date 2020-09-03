import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';

import { withNavigationFocus } from 'react-navigation';
import { Camera } from 'expo-camera';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

import Constants from 'expo-constants';

function SnapScreen(props) {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [visible, setVisible] = useState(false);
    var camera = useRef(null);

    // CAMERA PERMISSIONS

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    
    // CAMERA DISPLAY

    var cameraDisplay;

    if (hasPermission && props.isFocused) {
        cameraDisplay = <Camera ref={ref => (camera = ref)} type={type} flashMode={flash} ratio="16:9" style={{ flex: 1 }}>
            <View
                style={{flex:1, backgroundColor: 'transparent', flexDirection:"row"}}
            >
                <TouchableOpacity
                    style={{alignSelf:'flex-end', alignItems:'center'}}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                    }}
                >
                    <IconIonic
                        name="md-reverse-camera"
                        size={20}
                        color="#ffffff"
                    />
                    <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{alignSelf:'flex-end', alignItems:'center'}}
                    onPress={() => {
                        setFlash(
                            flash === Camera.Constants.FlashMode.off
                            ? Camera.Constants.FlashMode.torch
                            : Camera.Constants.FlashMode.off
                        );
                    }}
                >
                    <IconFontAwesome
                        name="flash"
                        size={20}
                        color="#ffffff"
                    />
                    <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>Flash</Text>
                </TouchableOpacity>
            </View>
        </Camera>
        
    }
    else {
        cameraDisplay = <View style={{ flex: 1 }}></View>
    }

    // CALLBACK
    
    return (
        <View style={{ flex: 1 }}>
            <Overlay isVisible={visible} width="auto" height="auto">
                <Text>Loading</Text>
            </Overlay>
            {cameraDisplay}
            <Button
                icon={<IconFontAwesome name="save" size={20} color="#ffffff"/>}
                title=" Snap"
                buttonStyle={{backgroundColor: "#009788"}}
                type="solid"
                onPress={async () => {
                    setVisible(true);
                    if (camera) {
                        let photo = await camera.takePictureAsync({quality : 0.7});

                        var data = new FormData();
                        data.append('photo', {
                            uri: photo.uri,
                            type: 'image/jpeg',
                            name: 'photo.jpg',
                        });
                        var rawResponse = await fetch(`${Constants.manifest.extra.backendURL}/upload`, {
                            method: 'post',
                            body: data
                        })
                        var response = await rawResponse.json();
                        props.onSnap(response.url, response.attributes);
                        setVisible(false);

                    }
                }}
            />
        </View>
    );
      
}

function mapDispatchToProps(dispatch) {
    return {
      onSnap: function(url, attributes) {
          dispatch( {type: 'addPicture', url: url, attributes: attributes} )
      }
    }
}

var snapScreenRedux = connect(
    null, 
    mapDispatchToProps
)(SnapScreen)
export default withNavigationFocus(snapScreenRedux);

