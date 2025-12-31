import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { formatTiempo } from '../utils/formatTiempo';

type Props = {
    timeLeft: number;
    onPress?: () => void;
    fontFamily?: string;
};

export default function TimerDisplay({ timeLeft, onPress, fontFamily }: Props) {
    return (
        <TouchableOpacity onPress={onPress} accessibilityRole="button">
            <Text style={[styles.timeText, fontFamily ? { fontFamily } : {}]}>{formatTiempo(timeLeft)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    timeText: {
        fontSize: 250,
        color: '#00BFFF',
        textAlign: 'center',
        transform: [{ scaleY: 1.2 }, { scaleX: 1.05 }],
    },
});
