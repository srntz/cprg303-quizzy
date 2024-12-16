import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
    points: number;
    worldRank: number;
    bestCategory: string;
}


const StatCard: React.FC<StatCardProps> = ({ points, worldRank, bestCategory }) => {
    return (
        <View style={styles.card}>
            {/* First Stat */}
            <View style={styles.stat}>
            <Ionicons size={22} name="star" color="white" />
                <Text style={styles.label}>POINTS</Text>
                <Text style={styles.value}>{points}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Second Stat */}
            <View style={styles.stat}>
            <Ionicons size={22} name="globe" color="white" />
                <Text style={styles.label}>WORLD RANK</Text>
                <Text style={styles.value}>#{worldRank}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Third Stat */}
            <View style={styles.stat}>
            <Ionicons size={22} name="cube" color="white" />
                <Text style={styles.label}>BEST CATEGORY</Text>
                <Text style={styles.value}>{bestCategory}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6c63ff',
        borderRadius: 16,
        padding: 2,
        paddingVertical: 20,
        width: '95%',
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        width: 1,
        height: 50,
        backgroundColor: '#ffffff',
        opacity: 0.5,
    },
    label: {
        fontSize: 12,
        textTransform: 'uppercase',
        color: '#ffffff',
        opacity: 0.8,
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});

export default StatCard;
