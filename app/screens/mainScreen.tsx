import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import EditableNumber from '../../src/components/EditableNumber';
import HistoryPanel from '../../src/components/HistoryPanel';
import TimerDisplay from '../../src/components/TimerDisplay';
import { useLandscapeLock } from '../../src/hooks/useOrientation';
import { usePlayers } from '../../src/hooks/usePlayers';
import { useTimer } from '../../src/hooks/useTimer';
import { COLORS } from '../../src/styles/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function MainScreen() {
    useLandscapeLock();

    const [jugadoresDeseados, setJugadoresDeseados] = useState(12);
    const [cantidadInput, setCantidadInput] = useState('5');
    const [editandoCantidad, setEditandoCantidad] = useState(false);

    const [tiempoPorTurno, setTiempoPorTurno] = useState(30);
    const [tiempoInput, setTiempoInput] = useState('30');
    const [editandoTiempo, setEditandoTiempo] = useState(false);

    const [panelVisible, setPanelVisible] = useState(false);

    const { players, currentIndex, addOrNext, reset: resetPlayers, incrementCycleForCurrent, history } = usePlayers(1);

    const onExpire = () => {
        incrementCycleForCurrent();
    };

    const { timeLeft, isRunning, start, stop, reset: resetTimer, setTimeLeft } = useTimer(tiempoPorTurno, onExpire);
    
    const togglePanel = () => setPanelVisible(v => !v);

    const toggleRun = () => {
        if (isRunning) stop(); else start();
    };

    const agregarJugador = () => {
        addOrNext(jugadoresDeseados);
        setTimeLeft(tiempoPorTurno);
    };

    const reiniciar = () => {
        resetPlayers();
        resetTimer(tiempoPorTurno);
        stop();
    };

    const actualizarTiempo = () => {
        const nuevo = parseInt(tiempoInput, 10);
        if (!isNaN(nuevo)) {
            setTiempoPorTurno(nuevo);
            setTimeLeft(nuevo);
            setEditandoTiempo(false);
        }
    };

    const actualizarCantidad = () => {
        const nuevo = parseInt(cantidadInput, 10);
        if (!isNaN(nuevo) && nuevo >= 1 && nuevo <= 12) {
            setJugadoresDeseados(nuevo);
            setEditandoCantidad(false);
        }
    };

    const [fontsLoaded] = useFonts({
        Digital: require('../../assets/fonts/DS-DIGIB.ttf'),
    });

    if (!fontsLoaded) return null;

    const jugadorActual = players[currentIndex] ?? { id: 1, ciclosCompletados: 0 };

    return (
        <LinearGradient colors={[COLORS.backgroundStart, COLORS.backgroundEnd]} style={styles.container}>
            <StatusBar style="light" />

            <TouchableOpacity onPress={togglePanel} style={styles.historialButton}>
                <Text style={styles.historialTitulo}>Historial</Text>
            </TouchableOpacity>

            {editandoCantidad ? (
                <EditableNumber value={cantidadInput} onChange={setCantidadInput} onConfirm={actualizarCantidad} />
            ) : (
                <TouchableOpacity onPress={() => setEditandoCantidad(true)}>
                    <Text style={styles.jugadorTexto}>JUGADOR {jugadorActual.id}</Text>
                </TouchableOpacity>
            )}

            <Text style={styles.ciclosTexto}>Ciclos: {jugadorActual.ciclosCompletados}</Text>

            {editandoTiempo ? (
                <EditableNumber value={tiempoInput} onChange={setTiempoInput} onConfirm={actualizarTiempo} />
            ) : (
                <TimerDisplay timeLeft={timeLeft} onPress={() => setEditandoTiempo(true)} fontFamily="Digital" />
            )}

            <View style={styles.buttonRow}>
                <Button title={isRunning ? '⏹ Detener' : '▶ Iniciar'} onPress={toggleRun} />
                <Button title="➡ Siguiente" onPress={agregarJugador} />
                <Button title="🔄 Reiniciar" onPress={reiniciar} />
            </View>

            {panelVisible &&(
                <TouchableWithoutFeedback onPress={() => setPanelVisible(false)}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>
            )}

            <HistoryPanel visible={panelVisible} items={history} onClose={() => setPanelVisible(false)} />
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

    historialButton:{
        position: 'absolute',
        top: 30,
        right: 30,
        zIndex: 5
    },

    historialTitulo:{
        fontSize: 20,
        color: COLORS.primary
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
