import React, { useState, useEffect } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import axios from 'axios';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();

const App = () => {
    const [token, setToken] = useState('');
    const [nfcId, setNfcId] = useState('');

    useEffect(() => {
        // Cleanup function to stop NFC manager when the component is unmounted
        return () => {
            NfcManager.setEventListener(NfcTech.Ndef, null);
            NfcManager.stop()
                .catch(error => console.warn('NFC stop error:', error));
        };
    }, []);

    const startNfc = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            handleNfcTagDiscovered(tag)
            console.log('NFC Tag:', tag); 
            NfcManager.cancelTechnologyRequest().catch(error => console.warn('Cancel request error:', error));
        } catch (ex) {
            console.warn('NFC Error:', ex);
            Alert.alert('Error', 'Failed to detect NFC tag');
            NfcManager.cancelTechnologyRequest().catch(error => console.warn('Cancel request error:', error));
        }
    };

    const handleNfcTagDiscovered = async (tag) => {
        if (tag && tag.id) {
            setNfcId(tag.payload);
            // Send NFC data to API
            try {
                const res = await axios.post('http://10.13.10.225:5000/api/users/login', { tag });
                //setToken(res.data.token);
                Alert.alert('Success', 'NFC data sent to server successfully');
            } catch (error) {
                console.error('API Error:', error);
                Alert.alert('Error', 'Failed to send NFC data');
            }
        } else {
            console.warn('NFC Tag is null or does not contain an ID');
            Alert.alert('Error', 'NFC Tag is null or does not contain an ID');
        }
    };

    return (
        <View style={{ padding: 20, marginTop: 50 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>NFC Authentication</Text>
            <Button title="Start NFC Scan" onPress={startNfc} />
            {token && (
                <Text style={{ marginTop: 20 }}>Token: {token}</Text>
            )}
            {nfcId && (
                <Text style={{ marginTop: 20 }}>NFC ID: {nfcId}</Text>
            )}
        </View>
    );
};

export default App;
