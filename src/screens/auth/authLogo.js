import React from 'react'
import { View, Image, Text } from 'react-native'
import Applogo from "../../assets/Brand-Chinese-artwork-icon.png"

const LogoImage = () => (
    <View>
        
        <Image
        style={{width: 250, height: 250}}
        resizeMode={"contain"}
        source={Applogo}
        />
    </View>
)


export default LogoImage