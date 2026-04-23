import CatgeoriesCard from '@/components/CatgeoriesCard'
import { Colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CatgeoriesScreen = () => {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>THE CULTIVATED LEDGER</Text>

      {/* Heading */}
      <Text style={styles.heading}>
        List Commodities
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        Add new agricultural products to your ledger.
      </Text>
      <View style={styles.categoryCardContainer}>
        <CatgeoriesCard />
      </View>
    </View>
  )
}

export default CatgeoriesScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F7FB",
    marginBottom: 48,
    paddingHorizontal: 16,
    top: "8%"
  },
  categoryCardContainer: {
    backgroundColor: "#F6F7FB",
    marginTop: '5%'
  },

  label: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#2e7d32", // primary green
    fontWeight: "700",
    marginBottom: 3,
    marginTop: 5,
  },

  heading: {
    fontSize: 34,
    fontWeight: "800",
    color: Colors.light.primary,
    lineHeight: 38,
    marginBottom: 3,
  },
  description: {
    fontSize: 16,
    color: "#6b7280", // muted gray
    lineHeight: 24,
    maxWidth: 420,
  },

  highlight: {
    color: "#2e7d32", // primary green
  },

})