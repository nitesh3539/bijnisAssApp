import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Body, Header } from 'native-base'
import styles from '../lib/FeStyle'
import signOut from '../images/sign_out_29068.png'


const TitleHeader = (props) => {
    return (
        <Header searchBar style={[{ backgroundColor: '#c005E0' }, styles.header]}>
            <Body>
                <View
                    style={[styles.row, styles.width100]}>
                    <View style={[styles.headerLeft]}>
                 
                    </View>
                    <View style={[styles.headerBody]}>
                        <Text style={[styles.fontCenter, styles.fontWhite, styles.fontLg, styles.alignCenter, styles.justifyCenter]}>{props.pageName}</Text>
                    </View>
                    {<TouchableOpacity style={[styles.headerRight]} onPress= {props.onLogoutPress}>
                        <Image resizeMode={'contain'} style={[{ flex: 1, height: null, width: null}]} source={signOut} />
                    </TouchableOpacity>
                }

                </View>
            </Body>
        </Header>
    )
}

export default TitleHeader