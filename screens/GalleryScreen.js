import React from 'react';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native';
import { Card, Badge, Text } from 'react-native-elements'


function GalleryScreen(props) {

    // CARDLIST MAPPING
    
    var cardList = props.pictureList.map(function(picture,i) {
        return (
            <Card key={i} image={{uri: picture.url}} imageProps={{ style: {width: null, height: 150} }}>
                <Badge value={picture.attributes.gender} status="success" />
                <Badge value={picture.attributes.age} status="success" />
                <Badge value={picture.attributes.glasses} status="success" />
                <Badge value={picture.attributes.beard} status="success" />
                <Badge value={picture.attributes.smile} status="success" />
                <Badge value={picture.attributes.hairColor} status="success" />
            </Card>
        )
    });

    // CALLBACK

    return (
        <ScrollView style={{marginTop: 25}}>
            <Text h4 style={{textAlign: 'center'}}>Gallery</Text>
            {cardList}
        </ScrollView>
    );
}

function mapStateToProps(state) {
    return { pictureList: state.pictureList }
}
    
export default connect(
    mapStateToProps,
    null
)(GalleryScreen);