import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Body, Header } from 'native-base'
import styles from '../lib/FeStyle'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import signOut from '../images/sign_out_29068.png'
import tymLineLogo from '../images/tymline_logo.jpg'


const TitleHeader = (props) => {
    return (
        <Header searchBar style={[{ backgroundColor: '#c005E0' }, styles.header]}>
            <Body>
                <View
                    style={[styles.row, styles.width100]}>
                    <View style={[styles.headerLeft]}>
                        {(props.pageName == 'TymLine') ? 
                        <View style = {{width : 50, height : 25}}>
                        <Image resizeMode={'contain'} style={[{ flex: 1, height: null, width: null }]} source={require('../images/tymline_logo.jpg')} />
                        </View>
                        : <TouchableOpacity style={[]} onPress={() => props.goBack(null)}>
                            <MaterialIcons name={"arrow-back"} style={[styles.fontWhite, styles.fontXl, styles.fontLeft]} />
                        </TouchableOpacity>
                        }
                    </View>
                    <View style={[styles.headerBody]}>
                        <Text style={[styles.fontCenter, styles.fontWhite, styles.fontLg, styles.alignCenter, styles.justifyCenter]}>{props.pageName}</Text>
                    </View>
                    {props.pageName == 'TymLine' ? <TouchableOpacity style={[styles.headerRight]} onPress= {props.onLogoutPress}>
                        <Image resizeMode={'contain'} style={[{ flex: 1, height: null, width: null}]} source={signOut} />
                    </TouchableOpacity> :
                    <View style={[styles.headerRight]}>
                        <Image resizeMode={'contain'} style={[{ flex: 1, height: null, width: null}]} source={tymLineLogo} />
                    </View>}

                </View>
            </Body>
        </Header>
    )
}

export default TitleHeader