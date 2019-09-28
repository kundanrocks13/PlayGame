import React from 'react'
import { Text, View, Button } from 'react-native'

class News extends React.Component{
    render() {
        return(
            <View  >
                <Text>
                    This is News Component
                </Text>
                {/* <Button
                onPress={()=>this.props.navigation.navigate("App")}
                title="Go to Tab Navigator"
                color="#841584"
                >
                </Button> */}
            </View>
        )
    }
}

export default News