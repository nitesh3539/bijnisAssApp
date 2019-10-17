'use strict'

import React from 'react'
import { View } from 'react-native'
import { Spinner } from 'native-base'

const Loader = () => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Spinner color={'#008000'} size={'small'} />
        </View>
    )
}
export default Loader