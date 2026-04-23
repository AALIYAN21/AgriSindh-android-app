import { Colors } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const categories = [
    'All Commodities',
    'Fruits',
    'Vegetables',
    'Grains',
    'Pulses',
];

const DATA = [
    { id: '1', category: 'Fruits', name: 'Banana', price: 248.5, volume: 12450, date: '2026-04-21', color: '#E9F9EF' },
    { id: '2', category: 'Fruits', name: 'Apple', price: 512, volume: 8900, date: '2026-04-20', color: '#E8F1FF' },
    { id: '3', category: 'Vegetables', name: 'Tomato', price: 120, volume: 15000, date: '2026-04-19', color: '#FFE9DD' },
    { id: '4', category: 'Vegetables', name: 'Potato', price: 90, volume: 25000, date: '2026-04-18', color: '#FFF6DB' },
    { id: '5', category: 'Grains', name: 'Wheat', price: 310, volume: 17800, date: '2026-04-17', color: '#FFF1D6' },
    { id: '6', category: 'Pulses', name: 'Lentils', price: 220, volume: 14500, date: '2026-04-16', color: '#FFE3E3' },
];

export default function CommodityTable() {
    const prev = new Date();
    prev.setDate(prev.getDate() - 1);

    const [selectedCommodity, setSelectedCommodity] = useState('All Commodities');
    const [showDropdown, setShowDropdown] = useState(false);

    const [date, setDate] = useState(prev);
    const [showPicker, setShowPicker] = useState(false);

    const [expanded, setExpanded] = useState(false);

    const selectedDate = date.toISOString().split('T')[0];

    // ✅ DATE HANDLER (FIXED)
    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }

        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const filteredData = useMemo(() => {
        return DATA.filter(item => {
            const matchCategory =
                selectedCommodity === 'All Commodities' ||
                item.category === selectedCommodity;

            const matchDate = item.date <= selectedDate;

            return matchCategory && matchDate;
        });
    }, [selectedCommodity, selectedDate]);

    const visibleData = expanded ? filteredData : filteredData.slice(0, 4);

    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Text style={styles.iconText}>
                    {item.name.charAt(0)}
                </Text>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.volume}>{item.volume}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily Volume of Commodities</Text>
            <Text style={styles.subtitle}>
                Latest trading metrics for active market entities.
            </Text>

            {/* FILTERS */}
            <View style={styles.filterRow}>

                {/* CATEGORY */}
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setShowDropdown(true)}
                >
                    <Text style={styles.dropdownText}>
                        {selectedCommodity}
                    </Text>
                </TouchableOpacity>

                {/* DATE */}
                <TouchableOpacity
                    style={styles.dateBox}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={styles.dateText}>{selectedDate}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterBtn}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>
                        Filter
                    </Text>
                </TouchableOpacity>
            </View>

            {/* HEADER */}
            <View style={styles.tableHeader}>
                <Text style={styles.h1}>Commodity</Text>
                <Text style={styles.h2}>Price</Text>
                <Text style={styles.h3}>Volume</Text>
            </View>

            <FlatList
                data={visibleData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
            />

            {filteredData.length > 4 && (
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    style={styles.expandBtn}
                >
                    <Text style={styles.expandText}>
                        {expanded ? 'Show Less' : 'Show More'}
                    </Text>
                </TouchableOpacity>
            )}

            {/* CATEGORY MODAL */}
            <Modal visible={showDropdown} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    onPress={() => setShowDropdown(false)}
                >
                    <View style={styles.modalBox}>
                        {categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => {
                                    setSelectedCommodity(item);
                                    setShowDropdown(false);
                                }}
                            >
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* ✅ ANDROID PICKER */}
            {showPicker && Platform.OS === 'android' && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            {/* ✅ iOS PICKER (MODAL STYLE) */}
            {showPicker && Platform.OS === 'ios' && (
                <Modal transparent animationType="slide">
                    <View style={styles.pickerModal}>
                        <View style={styles.pickerContainer}>

                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                onChange={onChangeDate}
                                textColor="#000"   // ✅ FIX: makes text visible on iOS
                            />

                            <TouchableOpacity
                                style={styles.doneBtn}
                                onPress={() => setShowPicker(false)}
                            >
                                <Text style={{ color: '#fff', fontWeight: '700' }}>
                                    Done
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F6F7FB',
    },

    title: {
        fontSize: 30,
        fontWeight: '900',
        color: Colors.light.primary,
    },

    subtitle: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 12,
    },
    pickerModal: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    pickerContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    doneBtn: {
        marginTop: 10,
        backgroundColor: '#0B6B3A',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    filterRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 15,
    },

    dropdown: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
    },

    dropdownText: {
        fontSize: 12,
    },

    dateBox: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
    },

    dateText: {
        fontSize: 12,
    },

    filterBtn: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 14,
        justifyContent: 'center',
        borderRadius: 8,
    },

    tableHeader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#E2E8F0',
        borderRadius: 8,
    },

    h1: { flex: 1, fontWeight: '700' },
    h2: { width: 80, fontWeight: '700' },
    h3: { width: 100, fontWeight: '700' },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginTop: 8,
        borderRadius: 10,
    },

    iconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    iconText: {
        fontWeight: '800',
    },

    name: { flex: 1 },
    price: { width: 80 },
    volume: { width: 100 },

    expandBtn: {
        marginTop: 10,
        alignSelf: 'center',
    },

    expandText: {
        color: Colors.light.primary,
        fontWeight: '700',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    modalBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
    },

    option: {
        padding: 12,
    },

    optionText: {
        fontSize: 14,
    },
});