import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert
} from 'react-native'
import styles from '../lib/FeStyle'
import TitleHeader from '../component/TitleHeader'
import { Button, Content, Item, Input, Right, ActionSheet } from 'native-base'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SET_PROFILE_DETAILS_MODAL } from '../lib/Constants'

import * as globalActions from "../modules/GlobalAction";
import * as profileDetailsAction from '../modules/profileDetails/ProfileDetailsActions'
import SeparatorIcon from '../images/SeparatorIcon'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function mapStateToProps(state) {
    return {
        profilePostList: state.ProfileDetailsReducer.profilePostList,
        showDetailsModalView: state.ProfileDetailsReducer.showDetailsModalView,
        loader: state.ProfileDetailsReducer.loader,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...globalActions, ...profileDetailsAction }, dispatch)
    };
}

class ProfileDetails extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: <TitleHeader pageName={'Profile Details'} goBack={() => { navigation.goBack() }} />
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            height: 0,
            editable: false,
        }
    }

    componentDidMount() {
        this.props.actions.getProfileDetailsList(this.props.navigation.state.params)
    }

    renderData(item) {
        return (
            <View style={{ marginBottom: 10 }}>
                <View
                    style={[styles.justifyCenter, styles.alignCenter, { borderBottomColor: "#e4e4e4", borderBottomWidth: 1, padding: 15 }]}
                >
                    <Text style={[styles.fontGray, { fontSize: 16, color: '#9b9b9b', alignItems: 'center' }]}>{item.title}</Text>
                    <Right style={{ position: 'absolute', right: 0, top: 0, left: 0, margin: 10 }}>
                        <TouchableOpacity onPress={() => { this._showActionSheet(item.id) }}>
                            <MaterialIcons
                                name={'more-vert'}
                                style={[
                                    styles.fontBlack,
                                    { fontSize: 25 },
                                ]}
                            />
                        </TouchableOpacity>
                    </Right>
                    <Text style={[styles.fontBlack, { fontSize: 14, marginBottom: 5, marginTop: 10 }]}>{item.content}</Text>
                </View>
                {this._footerButton(item.id)}
            </View>

        );
    }
    _showActionSheet(id) {
        let BUTTONS = []
        BUTTONS.push('Edit', 'Delete', 'Cancel')
        ActionSheet.show(
            {
                options: BUTTONS,
                title: 'Update Post',
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 1
            },
            buttonIndex => {
                (buttonIndex > -1 && buttonIndex < (BUTTONS.length - 1)) ? this.onActionSheetPress(BUTTONS[buttonIndex], id) : null
            }
        )
    }

    onActionSheetPress(button, id) {
        if (button == 'Edit') {
            let postItem = this.props.profilePostList[id]
            this.setState({ title: postItem.title, content: postItem.content, editable: true })
            this.props.actions.setState(SET_PROFILE_DETAILS_MODAL, id - 1)
        } else if (button == 'Delete') {
            Alert.alert(
                'Deleting Posts',
                'Are you sure you want to delete this post?',
                [{ text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => this.props.actions.deletePostFormProfileItem(id, this.props.profilePostList, this.props.navigation.state.params) }],
                { cancelable: false }
            )
        }
    }



    modalDialogView() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 0
            }}>
                <Modal animationType={"fade"}
                    transparent={true}
                    visible={Number.isInteger(this.props.showDetailsModalView)}
                    onRequestClose={() => { }}
                    presentationStyle={"overFullScreen"}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={style.Alert_Main_View}>
                            <Text style={style.Alert_Title}>Create A New TymLine</Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginTop: 9 }} />
                            <View style={{ height: '70%' }}>
                                <View style={[styles.padding10, styles.marginBottom10, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                                    <Text style={[styles.fontCenter, styles.bold, styles.marginBottom10]}>{'Title: '}</Text>
                                    <Item regular style={{ width: '88%' }}>
                                        <Input
                                            onChangeText={(text) => { this.setState({ title: text }) }}
                                            style={{ height: 40, fontSize: 13 }}
                                            keyboardType='default'
                                            value={this.state.title}
                                            returnKeyType='done' />
                                    </Item>
                                </View>
                                <Text style={[styles.bold, styles.marginBottom10, { paddingLeft: 10 }]}>{'Content:            '}</Text>
                                <ScrollView style={{ paddingLeft: 10 }}>
                                    <Item regular style={{ width: '97%' }}>
                                        <Input
                                            onChangeText={(text) => { this.setState({ content: text }) }}
                                            style={{ fontSize: 13, height: Math.max(40, this.state.height) }}
                                            keyboardType='default'
                                            multiline={true}
                                            onContentSizeChange={(event) => {
                                                this.setState({ height: event.nativeEvent.contentSize.height })
                                            }}
                                            value={this.state.content}
                                            returnKeyType='done' />
                                    </Item>
                                </ScrollView>
                            </View>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#000' }} />
                            <View style={{ flexDirection: 'row', height: '20%' }}>
                                <TouchableOpacity
                                    style={style.buttonStyle}
                                    onPress={() => this._onCancelPress()}
                                    activeOpacity={0.7}
                                >
                                    <Text style={style.TextStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={{ width: 1, height: '79%', backgroundColor: '#000' }} />
                                <TouchableOpacity
                                    style={style.buttonStyle}
                                    onPress={() => this._onPostPress(this.props.showDetailsModalView)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={style.TextStyle}> Post </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    _onCancelPress() {
        this.props.actions.setState(SET_PROFILE_DETAILS_MODAL, false)
    }

    _onPostPress(id) {
        this.props.actions.addNewPostInProfileList(id, this.props.navigation.state.params, this.props.profilePostList, { content: this.state.content, title: this.state.title, editable: this.state.editable })
    }

    setModalViewId(id) {
        this.setState({ content: '', title: '', height: 0, editable: false })
        this.props.actions.setState(SET_PROFILE_DETAILS_MODAL, id)
    }

    _footerButton(id) {
        return (
            <TouchableOpacity style={[styles.justifyCenter, styles.alignCenter, { paddingLeft: '35%', paddingRight: '35%' }]}>
                <SeparatorIcon />
                <View style={{ position: 'absolute', marginRight: 10 }}>
                    <Button
                        full rounded success
                        onPress={() => this.setModalViewId(id)}
                        style={{ alignItems: 'center', width: 85, height: 23 }}
                    >
                        <Text style={[styles.fontWhite, { fontSize: 10 }]}>Add New Post</Text>
                    </Button>
                </View>
            </TouchableOpacity>
        )
    }

    _contentView(params) {
        let profileName = params.profileListObject[params.profileId].name
        return (
            <View>
                <View style={[{ flexDirection: 'row', borderBottomColor: "#e4e4e4", borderBottomWidth: 1, }]}>
                    <Image style={[{ width: '40%', height: 200, resizeMode: "cover", borderRadius: 7, margin: 20 }]}
                        source={require('../images/travel.jpg')} />
                    <View>
                        <View>
                            <Text style={[styles.fontWeight500, styles.fontXl, styles.fontBlack, { margin: 20 }]}>
                                {profileName}
                            </Text>
                        </View>
                    </View>
                </View>
                {this._footerButton(-1)}
                <View>
                    <FlatList
                        data={this.props.profilePostList}
                        renderItem={item => this.renderData(item.item)}
                        keyExtractor={item => String(item.id)}
                    />
                </View>
            </View>
        )
    }

    render() {
        const contentView = this._contentView(this.props.navigation.state.params)
        const modalDialogView = this.modalDialogView()
        return (
            <Content style={{ position: 'relative', backgroundColor: '#ffffff' }}>
                {modalDialogView}
                {contentView}
            </Content>
        )
    }
}

const style = StyleSheet.create({
    Alert_Main_View: {
        backgroundColor: "#e4e3e8",
        height: 330,
        width: '90%',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 7,
    },
    bottomView: {
        width: '30%',
        height: 40,
        backgroundColor: '#fff',
    },
    Alert_Title: {
        fontSize: 18,
        color: "#000",
        textAlign: 'center',
        marginTop: 12
    },
    Alert_Message: {
        fontSize: 22,
        color: "#000",
        textAlign: 'center',
        padding: 40,
        height: '22%'
    },
    buttonStyle: {
        width: '50%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        marginTop: -5
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDetails);