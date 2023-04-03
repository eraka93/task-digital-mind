import { StyleSheet, Text, View, Image, Pressable, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome5';

const NFTPage = ({ route }) => {
   const { Mint } = route.params;
   const [data, setData] = useState();
   const [checked, setChecked] = useState('Details');

   const windowWidth = Dimensions.get('window').width;

   useEffect(() => {
      fetchData();
   }, [Mint])


   const fetchData = async () => {
      try {
         const response = await fetch(`https://test-api.solsea.io/fetch-nft/${Mint}`);
         const json = await response.json();
         setData(json);
      } catch (error) {
         console.error(error);
      }
   };

   const price = data?.price;
   const priceValue = price / 1000000;
   const priceWithK = priceValue / 1000 > 1;

   console.log(data)

   const imageTitle = { uri: `https://content.solsea.io/files/preview/${data?.nft_collection?.iconImage?.filename}` }
   const image = { uri: data?.Preview_URL }
   const imageWidth = windowWidth > 400 ? 400 : '100%'
   const imageHeight = windowWidth > 400 ? 300 : null

   const logoCreator = { uri: `https://content.solsea.io/files/thumbnail/1653666998775-230211982.jpg` }
   const logoLicense = { uri: `https://solsea-test.ha.rs/assets/c_badge.svg` }
   const logoMinted = { uri: `https://solsea-test.ha.rs/assets/SolSea_Logo_Icon.svg` }
   const imageNFTPro = { uri: 'https://raw.githubusercontent.com/allartprotocol/token-list/main/assets/mainnet/F3nefJBcejYbtdREjui1T9DPh5dBgpkKq7u2GAAMXs5B/logo.jpg' }

   return (
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={styles.content}>
            <View style={styles.title}>
               <Image
                  source={imageTitle}
                  resizeMode='cover'
                  style={{
                     width: 60,
                     height: 60,
                     borderRadius: 5
                  }}
               />
               <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                  <View style={styles.collection}>
                     <Text numberOfLines={1} ellipsizeMode='tail' style={styles.collectionTitle} >{data?.nft_collection?.title} </Text>
                     <Icon name={'check-circle'} size={20} color={'#229af1'} solid />
                  </View>
                  <View style={windowWidth >= 400 ? { width: 300 } : null}><Text numberOfLines={1} ellipsizeMode='tail' style={styles.collectionDescription}>{data?.nft_collection?.description}</Text></View>
               </View>
            </View>
            <View style={{ padding: 10 }}>
               <Image
                  source={image}
                  resizeMode='contain'
                  style={{
                     width: imageWidth,
                     aspectRatio: 1,
                     height: imageHeight
                  }}
               />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
               <Icon name={'eye'} size={16} color={'#091639'} />
               <Text style={{ padding: 10, fontSize: 16 }}>{data?.views}</Text>
               <Text style={{ fontSize: 16, color: "#10052F80" }}>Views</Text>
               <Pressable style={styles.likes}>
                  <Icon name={'heart'} size={16} color={'#091639'} />
                  <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 16 }}>{data?.liked}</Text>
                  <Text style={{ fontSize: 16, color: "#10052F80" }}>Views</Text>
               </Pressable>
            </View>
            <Pressable style={[styles.likes, { alignSelf: 'center', marginVertical: 10 }]}>
               <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 16, color: "#10052F80" }}>Open Artwork</Text>
            </Pressable>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
               <Icon name='share-alt' size={16} color={"#229AF1"} />
               <Text style={{ padding: 10, fontSize: 16, fontWeight: '600', color: "#229AF1" }}>Share</Text>
            </Pressable>
            {!!data?.collectionCategory && <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
               <Pressable style={[styles.likes, { alignSelf: 'center', marginVertical: 10 }]}>
                  <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 16, color: "#10052F80" }}>{data?.collectionCategory?.split(' ')
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                     .join(' ')}</Text>
               </Pressable>
               <Pressable style={[styles.likes, { alignSelf: 'center', marginVertical: 10 }]}>
                  <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 16, color: "#10052F80" }}>{data?.collectionSubcategory?.split(' ')
                     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                     .join(' ')}</Text>
               </Pressable>
            </View>}

            <Pressable style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', margin: 10, paddingHorizontal: 10, borderRadius: 5, backgroundColor: "#00000011" }}>
               <Icon name={'redo'} size={16} color={'#091639'} />
               <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 18, color: '#091639' }}>Reload</Text>
            </Pressable>

            <Pressable style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
               <Image
                  source={logoCreator}
                  resizeMode='contain'
                  style={{
                     width: 30,
                     height: 30,
                     borderRadius: 50
                  }}
               />
               {data?.nft_collection?.subcategory && <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 18, color: '#091639', lineHeight: 25 }}>{data?.nft_collection?.subcategory[0]?.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ')}</Text>}
            </Pressable>

            <View style={{ paddingHorizontal: 20 }}><Text style={{ paddingVertical: 5, fontSize: 32, fontWeight: 'bold', color: '#091639', lineHeight: 40 }}>{data?.Title}</Text></View>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
               <Image
                  source={logoLicense}
                  resizeMode='contain'
                  style={{
                     width: 20,
                     height: 20,
                     borderRadius: 50
                  }}
               />
               <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 18, color: '#091639', lineHeight: 25 }}>License: Repr/Comm</Text>
            </Pressable>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
               <Image
                  source={logoMinted}
                  resizeMode='contain'
                  style={{
                     width: 20,
                     height: 20,
                     borderRadius: 50
                  }}
               />
               <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 18, color: '#091639', lineHeight: 25 }}>Minted on SolSea</Text>
            </Pressable>


            <View style={styles.priceValue}>
               <Image
                  source={imageNFTPro}
                  resizeMode='contain'
                  style={styles.logo}
               ></Image>
               <Text style={[styles.priceValueText, priceWithK ? { color: '#E8CC68' } : null]}>{priceValue}</Text>
               {priceWithK ? <View style={styles.goldLogo}><Text style={styles.goldText}>Gold</Text></View> : null}
            </View>

            <View style={styles.buttonBuyBid}>
               <Pressable style={styles.buttonBuy}><Text style={{ color: 'white', fontWeight: '600' }}>Buy NFT</Text></Pressable>
               <Pressable style={styles.buttonBid}><Text style={{ fontWeight: '600' }}>Place a bid</Text></Pressable>
            </View>

            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
               <Text style={{ fontSize: 10, paddingRight: 5 }}>Doublecheck everything before you buy!</Text>
               <Pressable><Text style={{ fontSize: 10, color: '#229AF1' }}>How to spot fakes?</Text></Pressable>
            </View>

            <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
               <Pressable onPress={() => setChecked("Details")} style={[styles.details, checked == "Details" ? { borderColor: '#229AF1', borderBottomWidth: 2 } : null]}><Text style={checked == "Details" ? { color: '#229AF1' } : null}>Details</Text></Pressable>
               <Pressable onPress={() => setChecked("History")} style={[styles.details, checked == "History" ? { borderColor: '#229AF1', borderBottomWidth: 2 } : null]}><Text style={checked == "History" ? { color: '#229AF1' } : null}>History</Text></Pressable>
               <Pressable onPress={() => setChecked("Bids")} style={[styles.details, checked == "Bids" ? { borderColor: '#229AF1', borderBottomWidth: 2 } : null]}><Text style={checked == "Bids" ? { color: '#229AF1' } : null}>Bids</Text></Pressable>
            </View>

            {checked == 'Details' && <View style={styles.detHisBid}>
               <Text style={styles.detailsInfoText}>Royalties on secondary sales: 10 %</Text>
               <Text style={styles.detailsText}>Listed by</Text>
               <Text style={styles.detailsText}>Mint address: </Text>
               <Text style={styles.detailsText}>NFT metadata: </Text>
            </View>}
            {checked == 'History' && <View style={styles.detHisBid}>
               <Text style={styles.detailsInfoText}>Please be aware that it can take a few minutes for the on-chain activity to be displayed here.</Text>
            </View>}
            {checked == 'Bids' && <View style={styles.detHisBid}>
               <Text style={styles.detailsInfoText}>No bids available</Text>
            </View>}

            <View style={{ alignSelf: 'center', padding: 20 }}>
               <Text style={{ paddingHorizontal: 8, paddingVertical: 5, fontSize: 18, color: '#091639', lineHeight: 25 }}>{data?.Description}</Text>
            </View>

         </View >
      </ScrollView >
   )
}

const styles = StyleSheet.create({
   content: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      backgroundColor: '#f6fbff',
      maxWidth: 400
   },
   title: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: '#eff7ff',
      padding: 20
   },
   collection: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   collectionTitle: {
      color: '#15348D',
      fontSize: 18,
      fontWeight: '700', paddingRight: 5, paddingTop: 2
   },
   collectionDescription: {
      color: '#091639',
      fontSize: 14
   },
   likes: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, paddingHorizontal: 10, borderColor: "#091639", borderWidth: 0.5, borderRadius: 5 },
   price: {
      fontWeight: '400',
      fontSize: 11
   },
   priceValue: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      paddingHorizontal: 20
   },
   logo: {
      width: 35,
      height: 35,
      borderRadius: 50,
      alignSelf: 'center'
   },
   priceValueText: {
      paddingHorizontal: 10,
      fontWeight: '900',
      color: '#15348D',
      fontSize: 40,
      letterSpacing: 1,
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
      fontSize: 14,
      color: '#091639',
      textAlignVertical: 'center'
   },
   buttonBuyBid: {
      width: '100%',
      flexDirection: 'row',
      alignSelf: 'center',
      margin: 20,
   },
   buttonBuy: {
      width: '45%',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: '#229AF1'
   },
   buttonBid: {
      width: '45%',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 5,
      borderRadius: 5,
      borderWidth: 1,
   },
   details: {
      marginHorizontal: 2,
      padding: 5
   },
   detHisBid: {
      flex: 1,
      marginHorizontal: 20,
      padding: 20,
      backgroundColor: '#eff7ff',
   },
   detailsInfoText: { fontSize: 10, paddingHorizontal: 5, paddingBottom: 10 },
   detailsText: {
      color: '#020F33',
      fontWeight: '600',
      paddingHorizontal: 5,
   }
})

export default NFTPage