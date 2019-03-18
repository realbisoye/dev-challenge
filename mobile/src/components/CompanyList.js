import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  companyList: {
    flexDirection: 'row',
    padding: 20
  },
  imageWrapper: {
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  text: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
  },
  textName: {
    fontSize: 18
  },
  textPhrase: {
    fontSize: 14,

  }
});

export default memo(({ company }) => (
  <View style={styles.companyList}>
    <View style={[styles.imageWrapper, { borderColor: company.color }]}>
      <Image style={styles.image} source={{ uri: company.image }} />
    </View>
    <View style={styles.text}>
      <Text style={styles.textName}>{company.name}</Text>
      <Text style={styles.textPhrase}>{company.catchPhrase}</Text>
    </View>
  </View>
));
