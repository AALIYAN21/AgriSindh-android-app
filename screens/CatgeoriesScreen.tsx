import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CatgeoriesCard from '@/components/CatgeoriesCard'

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
      <CatgeoriesCard/>
      </View>
    </View>
  )
}

export default CatgeoriesScreen

const styles = StyleSheet.create({
    container: {
    marginBottom: 48,
    paddingHorizontal: 16,
    top: "5%"
  },
  categoryCardContainer: {
    marginTop: '5%'
  },

  label: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#2e7d32", // primary green
    fontWeight: "700",
    marginBottom: 8,
  },

  heading: {
    fontSize: 34,
    fontWeight: "800",
    color: "#215c24", // dark text
    lineHeight: 38,
    marginBottom: 12,
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