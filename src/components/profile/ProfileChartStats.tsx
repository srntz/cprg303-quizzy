import React, { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ProfileChartStatsProps {
    data: {
        daily: number;
        monthly: number;
        yearly: number;
    };
}

export default function ProfileChartStats({ data }: ProfileChartStatsProps) {
    const [selectedOption, setSelectedOption] = useState("Month");
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const options = ["Day", "Month", "Year"];

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setDropdownVisible(false);
    };

    // Get the total quizzes played based on the selected option
    const getTotalQuizzes = () => {
        if (selectedOption === "Day") return data.daily;
        if (selectedOption === "Month") return data.monthly;
        if (selectedOption === "Year") return data.yearly;
        return 0;
    };

    return (
        <View style={styles.container}>
            {/* Dropdown Button */}
            <View style={styles.dropdownContainer}>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setDropdownVisible(true)}
                >
                    <Text style={styles.dropdownText}>{selectedOption}</Text>
                </TouchableOpacity>
            </View>

            {/* Dropdown Modal */}
            <Modal
                transparent
                animationType="fade"
                visible={isDropdownVisible}
                onRequestClose={() => setDropdownVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setDropdownVisible(false)}
                >
                    <View style={styles.dropdownMenu}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Quiz Stats Text */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    You have played a total{" "}
                    <Text style={styles.highlight}>
                        {getTotalQuizzes()} {getTotalQuizzes() > 1 ? 'quizzes': 'quiz'}
                    </Text>{" "}
                    this {selectedOption.toLowerCase()}!
                </Text>
            </View>

            {/* Quiz Played Circle */}
            <View style={styles.circleContainer}>
                <View style={styles.circle}>
                    <Text style={styles.quizCount}>{getTotalQuizzes()}</Text>
                    <Text style={styles.quizPlayedText}>quizzes played</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F3EEFF", // Light purple background
        borderRadius: 16,
        padding: 20,
        paddingBottom: 100,
        width: "95%",
        marginTop: 20,
    },
    dropdownContainer: {
        alignItems: "flex-end",
    },
    dropdown: {
        backgroundColor: "white",
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    dropdownText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#6c63ff", // Purple text
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    dropdownMenu: {
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 10,
        width: 150,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    dropdownItemText: {
        fontSize: 14,
        color: "#333",
        textAlign: "center",
    },
    textContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        color: "#1A1A1A", // Dark text
    },
    highlight: {
        color: "#6c63ff", // Purple highlight
        fontWeight: "700",
    },
    circleContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 8,
        borderColor: "#6c63ff", // Purple border
        justifyContent: "center",
        alignItems: "center",
       
    },
    quizCount: {
        fontSize: 40,
        fontWeight: "800",
        color: "#1A1A1A", // Dark text
    },
    quizPlayedText: {
        fontSize: 14,
        fontWeight: "600",
        color: "black", // Gray text
        marginTop: 2,
    },
});
