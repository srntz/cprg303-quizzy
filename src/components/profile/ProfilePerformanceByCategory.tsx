import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface CategoryData {
    categoryId: string;
    categoryName: string;
    score: number; // Score for the category
}

interface ProfilePerformanceByCategoryProps {
    data: CategoryData[]; // Array of objects with categoryId, categoryName, and score
}

export default function ProfilePerformanceByCategory({
    data,
}: ProfilePerformanceByCategoryProps) {
    // Find the maximum score to normalize bar heights
    const maxScore = 10;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Top Performance by Category</Text>
                <View style={styles.iconContainer}>
                    <Ionicons name="bar-chart" size={20} color="rgba(255, 255, 255, 0.8)" />
                </View>
            </View>

            {/* Graph Container */}
            <View style={styles.graphContainer}>
                {/* Y-Axis Labels */}
                <View style={styles.yAxis}>
                    {["100%", "75%", "50%", "25%", "0%"].map((label, index) => (
                        <Text key={index} style={styles.yAxisText}>
                            {label}
                        </Text>
                    ))}
                </View>

                {/* Scrollable X-Axis and Bars */}
                <ScrollView
                    horizontal
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                >
                    {data.map((item) => (
                        <View key={item.categoryId} style={styles.barContainer}>
                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: (200 * item.score) / maxScore, // Normalize bar height
                                        backgroundColor: getRandomPastelColor(),
                                    },
                                ]}
                            />
                            <Text style={styles.barLabel}>{item.categoryName}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

// Function to generate pastel colors
const getRandomPastelColor = (): string => {
    const randomValue = () => Math.floor(150 + Math.random() * 105); // Ensure values are in the pastel range (150-255)
    const r = randomValue();
    const g = randomValue();
    const b = randomValue();
    return `rgb(${r}, ${g}, ${b})`;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6c63ff",
        borderRadius: 16,
        padding: 16,
        width: "95%",
        alignSelf: "center",
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    headerText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    iconContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 8,
        padding: 8,
    },
    graphContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    yAxis: {
        marginRight: 10,
        justifyContent: "space-between",
        height: 200,
    },
    yAxisText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
        textAlign: "right",
    },
    scrollView: {
        flex: 1,
        height: 240,
    },
    scrollContent: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: 20, // Add padding for X-axis labels
    },
    barContainer: {
        alignItems: "center",
        width: 50,
    },
    bar: {
        width: 40,
        borderRadius: 8,
    },
    barLabel: {
        marginTop: 8,
        color: "white",
        fontSize: 12,
        textAlign: "center",
    },
});
