import StatusModal from '@/components/StatusModal';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface RowData {
    id: number;
    item: string;
    grade: string;
    kgs: string;
    price: string;
}

type CategoryType = 'Vegetables' | 'Fruits';

const CommodityListing = () => {
    const [category, setCategory] = useState<CategoryType>('Vegetables');
    const [isModalVisible, setModalVisible] = useState(false);

    const todaysDate = useMemo(() => {
        return new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }, []);

    const [listData, setListData] = useState<Record<CategoryType, RowData[]>>({
        Vegetables: [{ id: 1, item: '', grade: '', kgs: '', price: '' }],
        Fruits: [{ id: 1, item: '', grade: '', kgs: '', price: '' }],
    });

    const updateRow = (id: number, field: keyof RowData, value: string | null) => {
        const updatedList = listData[category].map(row =>
            row.id === id ? { ...row, [field]: value || '' } : row
        );
        setListData({ ...listData, [category]: updatedList });
    };

    const addRow = () => {
        const newRow: RowData = { id: Date.now(), item: '', grade: '', kgs: '', price: '' };
        setListData({
            ...listData,
            [category]: [...listData[category], newRow]
        });
    };

    const removeRow = (id: number) => {
        if (listData[category].length === 1) return;
        const filteredList = listData[category].filter(row => row.id !== id);
        setListData({ ...listData, [category]: filteredList });
    };

    const handleSave = () => setModalVisible(true);
    const handleCloseModal = () => setModalVisible(false);

    return (
        <View style={styles.safeArea}>
            {isModalVisible && (
                <StatusModal onClose={handleCloseModal} status="upload" />
            )}

            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>COMMODITY LISTING</Text>
                </View>

                <Text style={styles.mainTitle}>List Commodities</Text>
                <Text style={styles.subtitle}>List all market commodities from here.</Text>

                <Text style={styles.sectionLabel}>SELECT CATEGORY</Text>

                <View style={styles.segmentContainer}>
                    {(['Vegetables', 'Fruits'] as CategoryType[]).map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.segmentButton, category === cat && styles.activeSegment]}
                            onPress={() => setCategory(cat)}
                        >
                            <Text style={[styles.segmentText, category === cat && styles.activeSegmentText]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* DATE */}
                <View style={styles.card}>
                    <Text style={styles.cardLabel}>ENTRY DATE</Text>
                    <View style={styles.dateInput}>
                        <Text style={styles.dateText}>{todaysDate}</Text>
                        <MaterialIcons name="lock" size={18} color="#999" />
                    </View>
                </View>

                {/* TABLE */}
                <View style={styles.tableCard}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, { flex: 2.5 }]}>ITEM</Text>
                        <Text style={[styles.headerCell, { flex: 2 }]}>GRADE</Text>
                        <Text style={[styles.headerCell, { flex: 1.2 }]}>KGS</Text>
                        <Text style={[styles.headerCell, { flex: 1.5 }]}>PRICE/KG</Text>
                    </View>

                    {listData[category].map((row) => (
                        <View key={row.id} style={styles.tableRow}>

                            {/* ITEM PICKER */}
                            <View style={[styles.pickerWrapper, { zIndex: 100 }]}>
                                <RNPickerSelect
                                    onValueChange={(val) => updateRow(row.id, 'item', val)}
                                    items={DROPDOWN_DATA[category]}
                                    value={row.item}
                                    placeholder={{ label: 'Item...', value: null, color: '#000' }}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                    Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="#888" />}
                                    touchableWrapperProps={{ activeOpacity: 0.2 }}
                                    pickerProps={{
                                        // themeVariant: 'light',
                                        itemStyle: { color: '#000' }
                                    }}
                                />
                            </View>

                            {/* GRADE PICKER */}
                            <View style={[styles.pickerWrapper, { flex: 2, zIndex: 90 }]}>
                                <RNPickerSelect
                                    onValueChange={(val) => updateRow(row.id, 'grade', val)}
                                    items={GRADE_OPTIONS}
                                    value={row.grade}
                                    placeholder={{ label: 'Grade...', value: null, color: '#000' }}
                                    style={pickerSelectStyles}
                                    useNativeAndroidPickerStyle={false}
                                    Icon={() => <MaterialIcons name="arrow-drop-down" size={18} color="#888" />}
                                    touchableWrapperProps={{ activeOpacity: 0.2 }}
                                    pickerProps={{
                                        // themeVariant: 'light',
                                        itemStyle: { color: '#000' }
                                    }}
                                />
                            </View>

                            <TextInput
                                style={[styles.inputCell, { flex: 1.2 }]}
                                value={row.kgs}
                                keyboardType="numeric"
                                onChangeText={(val) => updateRow(row.id, 'kgs', val)}
                                placeholder="0"
                                placeholderTextColor="#CCC"
                            />

                            <View style={[styles.priceCell, { flex: 1.5 }]}>
                                <TextInput
                                    style={styles.inputCellPrice}
                                    value={row.price}
                                    keyboardType="numeric"
                                    onChangeText={(val) => updateRow(row.id, 'price', val)}
                                    placeholder="0"
                                    placeholderTextColor="#CCC"
                                />
                                <TouchableOpacity onPress={() => removeRow(row.id)} style={styles.removeBtn}>
                                    <MaterialIcons name="remove-circle-outline" size={20} color="#FF5252" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    ))}

                    <TouchableOpacity style={styles.addRowBtn} onPress={addRow}>
                        <MaterialIcons name="add-circle" size={20} color="#1F5D2B" />
                        <Text style={styles.addRowText}>Add Row</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <FontAwesome5 name="save" size={18} color="#FFF" style={{ marginRight: 8 }} />
                    <Text style={styles.saveBtnText}>Save and Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                    <Text style={styles.cancelText}>Cancel and Return</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

export default CommodityListing;

const GRADE_OPTIONS = [
    { label: 'Grade A', value: 'Grade A' },
    { label: 'Grade B', value: 'Grade B' },
    { label: 'Grade C', value: 'Grade C' },
];

const DROPDOWN_DATA: Record<CategoryType, { label: string; value: string }[]> = {
    Vegetables: [
        { label: 'Tomato', value: 'Tomato' },
        { label: 'Onion', value: 'Onion' },
        { label: 'Potato', value: 'Potato' },
        { label: 'Carrot', value: 'Carrot' },
    ],
    Fruits: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Banana', value: 'Banana' },
        { label: 'Orange', value: 'Orange' },
        { label: 'Mango', value: 'Mango' },
    ],
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F9FAF9' },
    container: { padding: 20 },
    tagContainer: {
        backgroundColor: '#C5E1A5',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 10,
    },
    tagText: { fontSize: 11, fontWeight: '800', color: '#33691E' },
    mainTitle: { fontSize: 26, fontWeight: 'bold', color: '#1B3C14' },
    subtitle: { fontSize: 14, color: '#666', marginBottom: 25 },
    sectionLabel: { fontSize: 12, fontWeight: '700', color: '#555', marginBottom: 12 },
    segmentContainer: {
        flexDirection: 'row',
        backgroundColor: '#EEE',
        borderRadius: 8,
        padding: 4,
        marginBottom: 25,
    },
    segmentButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
    activeSegment: { backgroundColor: '#1F5D2B' },
    segmentText: { fontWeight: '600', color: '#666' },
    activeSegmentText: { color: '#FFF' },
    card: { backgroundColor: '#F2F2F2', padding: 15, borderRadius: 12, marginBottom: 20 },
    cardLabel: { fontSize: 11, fontWeight: '800', color: '#555', marginBottom: 10 },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    dateText: { color: '#777', fontWeight: '600' },
    tableCard: { backgroundColor: '#FFF', borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, marginBottom: 30, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#F0F0F0', padding: 12 },
    headerCell: { fontSize: 10, fontWeight: '800', color: '#888' },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        alignItems: 'center',
    },
    pickerWrapper: {
        flex: 2.5,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    inputCell: { fontSize: 12, color: '#333', fontWeight: '500', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EEE', marginHorizontal: 4, textAlign: 'center' },
    inputCellPrice: { flex: 1, fontSize: 12, color: '#333', fontWeight: '500', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#EEE', textAlign: 'center' },
    priceCell: { flexDirection: 'row', alignItems: 'center' },
    removeBtn: { marginLeft: 5, padding: 2 },
    addRowBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15 },
    addRowText: { color: '#1F5D2B', fontWeight: '700', marginLeft: 5 },
    saveBtn: { backgroundColor: '#1F5D2B', flexDirection: 'row', height: 55, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 },
    saveBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    cancelBtn: { alignItems: 'center', paddingBottom: 40 },
    cancelText: { color: '#666', fontWeight: '500' },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOSContainer: {
        zIndex: 100,
    },
    inputIOS: {
        fontSize: 12,
        paddingVertical: 10,
        paddingHorizontal: 4,
        color: '#000', // ✅ Fixed: Visibility on iOS
        backgroundColor: '#fff', // ✅ CRITICAL FIX
        paddingRight: 20,
    },
    inputAndroid: {
        fontSize: 12,
        paddingHorizontal: 4,
        paddingVertical: 8,
        color: '#000', // ✅ Fixed: Visibility on Android
        paddingRight: 20,
    },
    iconContainer: {
        top: Platform.OS === 'ios' ? 10 : 12,
        right: 0,
    },
    placeholder: {
        color: '#999',
        fontSize: 12,
    },
});