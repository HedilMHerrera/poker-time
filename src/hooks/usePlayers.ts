import { useCallback, useState } from 'react';
import { Player } from '../types';

type UsePlayersReturn = {
    players: Player[];
    currentIndex: number;
    round: number;
    history: string[];
    addOrNext: (desiredCount: number) => void;
    reset: () => void;
    incrementCycleForCurrent: () => void;
    setPlayers: (p: Player[]) => void;
};

export function usePlayers(initialCount = 1) {
    const [players, setPlayersState] = useState<Player[]>(() =>
        Array.from({ length: initialCount }, (_, i) => ({ id: i + 1, ciclosCompletados: 0 }))
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [round, setRound] = useState(1);
    const [history, setHistory] = useState<string[]>([]);

    const setPlayers = (p: Player[]) => setPlayersState(p);

    const incrementCycleForCurrent = useCallback(() => {
        setPlayersState(prev => {
            const copy = [...prev];
            if (copy[currentIndex]) copy[currentIndex] = { ...copy[currentIndex], ciclosCompletados: copy[currentIndex].ciclosCompletados + 1 };
            return copy;
        });
    }, [currentIndex]);

    const addOrNext = useCallback((desiredCount: number) => {
        setPlayersState(prevPlayers => {
            const current = prevPlayers[currentIndex];
            setHistory(prev => prev.length === 0 ? [`RONDA 1`, `Jugador ${current.id} - ${current.ciclosCompletados} ciclos`] : [...prev, `Jugador ${current.id} - ${current.ciclosCompletados} ciclos`]);

            if (prevPlayers.length < desiredCount) {
                const nuevoId = prevPlayers[prevPlayers.length - 1].id + 1;
                const nuevoJugador = { id: nuevoId, ciclosCompletados: 0 };
                setCurrentIndex(prevPlayers.length);
                return [...prevPlayers, nuevoJugador];
            }

            const siguiente = (currentIndex + 1) % desiredCount;

            if (siguiente === 0) {
                const nuevaRonda = round + 1;
                setRound(nuevaRonda);
                setHistory(prev => [...prev, `RONDA ${nuevaRonda}`]);
                const reiniciados = prevPlayers.map(j => ({ ...j, ciclosCompletados: 0 }));
                setCurrentIndex(0);
                return reiniciados;
            }

            setCurrentIndex(siguiente);
            return prevPlayers;
        });
    }, [currentIndex, round]);

    const reset = useCallback(() => {
        setPlayersState([{ id: 1, ciclosCompletados: 0 }]);
        setCurrentIndex(0);
        setHistory([]);
        setRound(1);
    }, []);

    return { players, currentIndex, round, history, addOrNext, reset, incrementCycleForCurrent, setPlayers } as UsePlayersReturn;
}
