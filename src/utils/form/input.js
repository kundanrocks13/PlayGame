import React from 'react'
import { View, Text, TextInput  } from 'react-native'

const textInput = (props) => {
    let template = null

    switch(props.type) {
        case "textInput":
            template = 
            <TextInput
                {...props}
                maxLength={40}
                style={[{backgroundColor: 'transparent'},props.overrideStyle]}
            />
            break

        default:
            return template
    }

    return template
}

export default textInput