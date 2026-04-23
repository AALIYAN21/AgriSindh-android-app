import CommodityTable from '@/components/commodityTable';
import DataSyncStatus from '@/components/DataSync';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CommodityTable />
        <DataSyncStatus />
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB"
  },
  content: {
    flex: 1,
  },
});