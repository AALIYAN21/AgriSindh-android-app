import CommodityTable from '@/components/commodityTable';
import DataSyncStatus from '@/components/DataSync';
import { ScrollView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <CommodityTable />
          <DataSyncStatus />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  content: {
    marginBottom: 70,
    flex: 1,
  },
});