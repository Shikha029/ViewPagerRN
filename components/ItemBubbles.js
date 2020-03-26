/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ItemBubbles = ({type, loading, itemData}) => {
  return (
    <View style={styles.infoBlock}>
      <Text style={[styles.highlightLabel, styles.underlineLabel]}>
        {type}
      </Text>
      {
        loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={[styles.textBubblesContainer]}>
            {
              itemData.map((character, index) => (
                <Text key={index} style={styles.textBubble}>{character}</Text>
              ))
            }
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  infoBlock: {
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  highlightLabel: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  underlineLabel: {
    textDecorationLine: 'underline',
  },
  textBubblesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textBubble: {
    alignSelf:'flex-start',
    padding: '2%',
    margin: '2%',
    borderRadius: 15,
    backgroundColor: '#c1c3c5',
  },
});

export default ItemBubbles;
