import { StyleSheet, Text, View, Image, ImageBackground, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({ item, onLongPressed, onPressed, pressedID }) => {
   const { Title, _id, nft_collection, liked, views, Mint, Preview_URL, price } = item
   const image = { uri: Preview_URL };
   const priceValue = price / 1000000;
   const priceWithK = priceValue / 1000 > 1;

   const imageNFTPro = { uri: 'https://raw.githubusercontent.com/allartprotocol/token-list/main/assets/mainnet/F3nefJBcejYbtdREjui1T9DPh5dBgpkKq7u2GAAMXs5B/logo.jpg' }

   const [longPress, setLongPress] = useState(false)
   const [checked, setChecked] = useState(false)

   useEffect(() => {
      if (pressedID != _id) setLongPress(false)
   }, [pressedID, longPress])

   const handlePress = () => {
      setChecked(!checked);
   };

   const handleLongPress = () => {
      setLongPress(true);
      onLongPressed(_id);
   };

   const handleOnPress = () => {
      onPressed(Mint);
   }

   return (
      <Pressable
         onLongPress={handleLongPress}
         onPress={handleOnPress}
         style={longPress ? styles.longPressContainer : styles.container}>
         <ImageBackground source={image} resizeMode='contain' style={{ width: '100%', aspectRatio: 1, backgroundColor: 'white', }} >
            {longPress && <LinearGradient
               colors={['rgba(2,15,51,0.6)', 'transparent']}
               style={{ height: 80 }}
            >
               <View style={styles.info}>

                  <Icon name={'info-circle'} size={20} color={'white'} style={styles.infoIcon} />
                  <Icon name={'eye'} size={15} color={'white'} style={styles.infoIconSmall} />
                  <Text style={styles.infoText}>{views}</Text>
                  <Icon name={'heart'} size={15} color={'white'} style={styles.infoIconSmall} />
                  <Text style={styles.infoText}>{liked}</Text>
                  <Pressable onPress={handlePress}><Icon name={checked ? 'check-circle' : 'circle'} size={20} color={checked ? '#229af1' : 'white'} solid={checked} style={checked ? styles.infoIconChecked : styles.infoIcon} /></Pressable>
               </View>
            </LinearGradient>}
         </ImageBackground>
         <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
            {Title}
         </Text>
         <View style={styles.collection}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.collectionTitle} >{nft_collection ? nft_collection.title : 'Kolekcija'} </Text>
            <Icon name={'check-circle'} size={14} color={'#229af1'} solid style={{ paddingTop: 5 }} />
         </View>
         <Text style={[styles.collectionTitle, styles.price]}>Price</Text>
         <View style={styles.priceValue}>
            <Image
               source={imageNFTPro}
               resizeMode='contain'
               style={styles.logo}
            ></Image>
            <Text style={[styles.priceValueText, priceWithK ? { color: '#E8CC68' } : null]}>{priceWithK ? priceValue / 1000 + 'K' : priceValue}</Text>
            {priceWithK ? <View style={styles.goldLogo}><Text style={styles.goldText}>Gold</Text></View> : null}
         </View>
      </Pressable>
   )
}

export default Card

const styles = StyleSheet.create({
   longPressContainer: {
      width: "90%",
      margin: '5%',
      padding: 5,
      backgroundColor: 'white',
      borderRadius: 3,
      elevation: 5,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowColor: 'black',
   },
   container: {
      width: "90%",
      margin: '5%',
      padding: 5,
      backgroundColor: 'transparent',
   },
   info: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: 10,
   },
   infoText: {
      color: 'white',
      fontSize: 12,
      paddingHorizontal: 1,
   },
   infoIcon: {
      marginHorizontal: 8,
   },
   infoIconChecked: {
      marginHorizontal: 8,
      backgroundColor: 'white',
      borderRadius: 10
   },
   infoIconSmall: {
      marginHorizontal: 5,
   },
   title: {
      fontWeight: 'bold',
      color: '#020f33',
      paddingTop: 5,
      paddingLeft: 2,
      paddingRight: 10,
   },
   collection: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   collectionTitle: {
      color: '#7C7C7C',
      paddingRight: 5,
      paddingLeft: 2,
      paddingTop: 5,
      fontSize: 12,
      fontWeight: '600'
   },
   price: {
      fontWeight: '400',
      fontSize: 11
   },
   priceValue: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5
   },
   logo: {
      width: 18,
      height: 18,
      borderRadius: 50
   },
   priceValueText: {
      paddingHorizontal: 5,
      fontWeight: '900',
      color: '#15348D',
      fontSize: 18,
      textAlignVertical: 'center',
      letterSpacing: 1
   },
   goldLogo: {
      backgroundColor: '#E8CC68',
      borderRadius: 5,
      paddingVertical: 2,
      paddingHorizontal: 8,
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 5,
   },
   goldText: {
      fontSize: 11,
      color: 'white',
      textAlignVertical: 'center'
   }
})