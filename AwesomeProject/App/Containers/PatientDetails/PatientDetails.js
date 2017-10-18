//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput, TouchableHighlight, AsyncStorage } from 'react-native';
import { Container, Header, Right, Left, Body, Content, Item, Input, Button, Label } from 'native-base';
import { connect } from 'react-redux';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { editEntry, deleteEntry } from '../../store/middlewares/EntryMiddleware';
import Modal from 'react-native-modal'






function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        update: (newDetails, callback) => dispatch(editEntry(newDetails, callback)),
        delete: (entry) => dispatch(deleteEntry(entry)),
    }
}

// create a component
class PatientDetails extends Component {
    constructor(props) {
        super(props);
        const { patientName, diseases, medicationProvided, cost, } = this.props.navigation.state.params;
        this.state = {
            patient: this.props.navigation.state.params,
            patientName: patientName,
            diseases: diseases,
            medicationProvided: medicationProvided,
            cost: cost,
            editingMode: false,
            modalVisible: false
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    update = () => {
        const { patientName, diseases, medicationProvided, cost } = this.state;
        if (patientName === '' || diseases === '' || medicationProvided === '' || cost === null) {
            this.setState({ error: 'Please Enter Complete Details' });
        } else {
            const entryDetails = {
                ...this.props.navigation.state.params,
                patientName,
                diseases,
                medicationProvided,
                cost,
            }
            this.props.update(entryDetails, (updatedPatient) => {
                this.setState({
                    editingMode: false,
                    patient: updatedPatient,
                    patientName,
                    diseases,
                    medicationProvided,
                    cost,

                })
            });
            // console.log(entryDetails)
        }
    }
    delete = async () => {
        await this.props.delete(this.props.navigation.state.params);  
        const { navigate } = this.props.navigation;
        navigate('HomePage');
    }
    render() {

        const { patientName, diseases, medicationProvided, cost, patient, } = this.state;
        return (
            <Container>
                <Header style={{ backgroundColor: '#e44747' }}>
                    <StatusBar
                        backgroundColor="rgba(0,0,0,1)"
                    />
                    <Left>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('HomePage') }}>
                            <View style={{ width: 40, }}>
                                <EIcon name="chevron-thin-left" style={{ color: '#fff', fontSize: 20 }} />
                            </View>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#fff' }} >Patient Details</Text>
                    </Body>
                </Header>

                <Content style={styles.container}>
                    {
                        this.state.editingMode ?
                            <Body >
                                <Item floatingLabel style={{ marginBottom: 15 }}>
                                    <Label>Patient Name</Label>
                                    <Input value={patientName} onChangeText={(patientName) => { this.setState({ patientName: patientName }) }} />
                                </Item>
                                <Item floatingLabel style={{ marginBottom: 15 }}>
                                    <Label>Diseases</Label>
                                    <Input value={diseases} onChangeText={(diseases) => { this.setState({ diseases: diseases }) }} />
                                </Item>
                                <Item floatingLabel style={{ marginBottom: 15 }}>
                                    <Label>Medication</Label>
                                    <Input value={medicationProvided} onChangeText={(medicationProvided) => { this.setState({ medicationProvided: medicationProvided }) }} />
                                </Item>
                                <Item floatingLabel style={{ marginBottom: 15 }}>
                                    <Label>Cost</Label>
                                    <Input value={cost} onChangeText={(cost) => { this.setState({ cost: cost }) }} />
                                </Item>
                                <Button
                                    bordered
                                    rounded
                                    danger
                                    onPress={() => { this.update() }}
                                >
                                    <Text style={{ color: '#e44747', fontSize: 18, fontWeight: 'bold', }}> Save </Text>
                                </Button>
                            </Body>
                            :
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    // alignItems: 'center',
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ editingMode: true }) }}
                                    >
                                        <View style={{ width: 40, }}>
                                            <FIcon name="pencil-square" size={30} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setModalVisible(true) }}
                                    >
                                        <View style={{ width: 40, }}>
                                            <FIcon name="trash-o" size={30} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Modal
                                    isVisible={this.state.modalVisible}
                                    animationIn={'slideInLeft'}
                                    animationOut={'slideOutRight'}
                                    style={{
                                        flex: 0.3,
                                        backgroundColor: 'white',
                                        alignItems: 'center',

                                        padding: 22,
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        borderColor: 'rgba(0, 0, 0, 0.1)',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <View style={{
                                        flex: 1,
                                        width: '100%',
                                        backgroundColor: '#fff',
                                        padding: 22,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 4,
                                        borderColor: 'rgba(0, 0, 0, 0.1)',
                                    }}>
                                        <View style={{ minHeight: 10 }}>
                                            <Text>Are you sure, you want to Delete ?</Text>
                                            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
                                                <Button light style={{ marginRight: 10 }}>
                                                    <Text onPress={() => this.setState({ modalVisible: false })}> No </Text>
                                                </Button>
                                                <Button danger onPress={() => this.delete()}>
                                                    <Text> Yes </Text>
                                                </Button>
                                            </View>


                                        </View>
                                    </View>
                                </Modal>

                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <Text style={{ fontSize: 18 }}>Name: </Text>
                                        <Text style={{ fontSize: 20 }}>{patient.patientName}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <Text style={{ fontSize: 18 }}>Diseases: </Text>
                                        <Text style={{ fontSize: 20 }}>{patient.diseases}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <Text style={{ fontSize: 18 }}>Medication: </Text>
                                        <Text style={{ fontSize: 20 }}>{patient.medicationProvided}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <Text style={{ fontSize: 18 }}>Cost: </Text>
                                        <Text style={{ fontSize: 20 }}>{patient.cost}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                        <Text style={{ fontSize: 18 }}>Created At: </Text>
                                        <Text style={{ fontSize: 20 }}>{(new Date(patient.createdAt)).toLocaleString()}</Text>
                                    </View>
                                </View>
                            </View>

                    }
                </Content>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        margin: 30,
    },
    content: {


    },
    input: {
        marginBottom: 40
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);
