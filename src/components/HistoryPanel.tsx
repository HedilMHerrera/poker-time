import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type Props = {
    visible: boolean;
    items: string[];
    onClose: () => void;
};

export default function HistoryPanel({ visible, items, onClose }: Props) {
    const slideAnim = useRef(new Animated.Value(screenWidth)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, { toValue: screenWidth * 0.3, duration: 300, useNativeDriver: false }).start();
        } else {
            Animated.timing(slideAnim, { toValue: screenWidth, duration: 300, useNativeDriver: false }).start();
        }
    }, [visible, slideAnim]);

    if (!visible) return null;

    return (
        <View style={styles.container} pointerEvents="box-none">
            <Animated.View style={[styles.panel, { transform: [{ translateX: slideAnim }] }]}>
                <View style={styles.header}>
                    <Text style={styles.title}>📋 Historial</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.close}>✖</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scroll}>
                    {Array.isArray(items) ? (
                        items.map((it, idx) => (
                            <Text key={idx} style={styles.item}>{it}</Text>
                        ))
                    ) : (
                        <Text style={styles.item}>Sin historial</Text>
                    )}
                </ScrollView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth,
        height: screenHeight,
    },

    panel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: screenWidth * 0.74,
        backgroundColor: '#001122',
        padding: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00FFFF'
    },

    close:{
        fontSize: 22,
        color: '#00FFFF'
    },

    scroll:{
        paddingBottom: 24
    },

    item:
    { color: '#00FFFF',
        fontSize: 16,
        marginBottom: 6
    },
});
