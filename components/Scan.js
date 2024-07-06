import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Alert, Modal, StyleSheet, Animated } from "react-native";
import { wp } from "../helpers/common";
import { FontAwesome6 } from "@expo/vector-icons";
import axios from 'axios';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start();

const Scan = () => {
    const [message, setMessage] = useState('');
    const [nfcId, setNfcId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const animation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Cleanup function to stop NFC manager when the component is unmounted
        return () => {
            NfcManager.setEventListener(NfcTech.Ndef, null);
            NfcManager.stop()
                .catch(error => console.warn('NFC stop error:', error));
        };
    }, []);

    const startNfc = async () => {
      if(!isReading){
        try {
            setTimeout(() => {
              NfcManager.cancelTechnologyRequest();
              setIsReading(false);
              stopAnimation();
          }, 4500);
            setIsReading(true);
            startAnimation();
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            handleNfcTagDiscovered(tag);
            console.log('NFC Tag:', tag); 

            

        } catch (ex) {
            NfcManager.cancelTechnologyRequest().catch(error => console.warn('Cancel request error:', error));
            setIsReading(false);
            stopAnimation();
        }
      }
    };

    const handleNfcTagDiscovered = async (tag) => {
        if (tag && tag.id) {
            console.log("mytag", tag);
            setNfcId(tag.payload);
            // Send NFC data to API
            try {
                const res = await axios.post('http://3.253.54.34/api/nfc/authentication', { tag });
                console.log(res.data.data.code);
                setMessage(res.data.data.code);
                setModalVisible(true); // Show the modal with the received code
            } catch (error) {
                Alert.alert('Erreur', 'Carte invalide');
            }
        } else {
            console.warn('NFC Tag is null or does not contain an ID');
            Alert.alert('Error', 'NFC Tag is null or does not contain an ID');
        }
    };

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                })
            ])
        ).start();
    };

    const stopAnimation = () => {
        animation.stopAnimation();
        animation.setValue(1);
    };

    return (
        <View className="flex-1 justify-center items-center">
         <Animated.View style={{ transform: [{ scale: isReading ? animation : 1 }] }}>
            <View
                className="bg-cyan-200 p-3 rounded-full"
                style={{
                    width: wp(50),
                    height: wp(50),
                    backgroundColor: "#a5f3fc",
                }}
            >
                <Pressable
                    className=" flex-1 bg-cyan-500 p-6 rounded-full justify-center items-center"
                    onPress={startNfc}
                >
                   
                        <FontAwesome6 name="nfc-symbol" size={50} color="#cffafe" />
                        <Text className="text-center text-white text-2xl font-semibold">
                            NFC
                        </Text>
                    
                </Pressable>
            </View>
            </Animated.View>
            <Text className=" text-xl font-extrabold mt-6">S'authentifier</Text>
            <Text className="text-sm color-slate-500">
                Appuyez et rapprochez un NFC de votre appareil
            </Text>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Code: {message}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: 200,
        height: 200,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        marginTop: 45,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
    },
});

export default Scan;
