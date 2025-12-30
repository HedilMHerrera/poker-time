import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Button,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import { useLandscapeLock } from '../../src/hooks/useOrientation';
import { COLORS } from '../../src/styles/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MainScreen() {
    useLandscapeLock();

    const [fontsLoaded] = useFonts({
        Digital: require('../../assets/fonts/DS-DIGIB.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundEnd]} style={styles.container}>
            <StatusBar style="light" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },

    jugadorTexto: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 0
    },

    tiempoTexto: {
        fontFamily: 'Digital',
        fontSize: 250,
        color: COLORS.timer,
        textAlign: 'center'
    },

    ciclosTexto: {
        fontSize: 20,
        color: COLORS.primary,
        marginBottom: 0
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginVertical: 16
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999
    },
});
