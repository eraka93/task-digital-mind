import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome5';

import Card from '../components/Card'

const Home = ({ navigation }) => {
   const [data, setData] = useState([]);
   const [page, setPage] = useState(0);
   const [search, setSearch] = useState('');
   const [pressedID, setPressedID] = useState(0);

   useEffect(() => {
      const windowWidth = Dimensions.get('window').width;

      if (search) {
         let url = `https://test-api.solsea.io/nft-listed/?Title=${search.replace(/\s/g, '')}`
         fetchData(url);
      }
      else if (page == -1) {
         let url = 'https://test-api.solsea.io/nft-listed/'
         fetchData(url);
      }
      else {
         let skip = (page * 10).toString();
         let url = `https://test-api.solsea.io/nft-listed/?$limit=10&$skip=${skip}`
         fetchData(url);
      }
   }, [page, search]);

   const fetchData = async (url) => {
      try {
         const response = await fetch(url);
         const json = await response.json();
         setData(json.data);
      } catch (error) {
         console.error(error);
      }
   };

   const handleOnLongPress = (id) => {
      setPressedID(id)
   }


   const handleOnPress = (Mint) => {
      navigation.navigate('NFT Page', { Mint: Mint })
   }

   const renderItem = ({ item }) => (
      <View style={{ width: '50%' }}>
         <Card item={item} onLongPressed={handleOnLongPress} onPressed={handleOnPress} pressedID={pressedID} />
      </View>
   );


   return (
      <View style={styles.content}>
         <View style={styles.searchBox}>
            <TextInput
               value={search}
               onChangeText={(text) => setSearch(text)}
               placeholder={'Search NFTs by title'}
               style={{ backgroundColor: 'transparent', flex: 1 }}
               underlineColor='transparent'
               activeUnderlineColor='transparent'
               selectionColor='transparent'
            />
            <TouchableOpacity
               onPress={() => {
                  if (search) {
                     setSearch('');
                  }
               }}
               style={styles.iconSearch}
            >
               <Icon name={search ? "times" : "search"} size={20} color="#fff" />
            </TouchableOpacity>
         </View>
         <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
         />
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginRight: 40, color: '#091639' }}>
               Page : {page < 0 ? 'List of all NTFs' : page + 1}
            </Text>
            <Button
               onPress={() => {
                  setSearch(''), setPage((prevPage) => prevPage + 1);
               }}
            >
               {page < 0 ? 'First page' : 'Next Page'}
            </Button>
            <Button
               onPress={() => {
                  setSearch(''), setPage(-1);
               }}
            >
               All NFTs
            </Button>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   content: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      backgroundColor: '#f6fbff',
      paddingVertical: 10,
      paddingHorizontal: 10
   },
   searchBox: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#232323',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   iconSearch: {
      backgroundColor: '#229af1',
      borderRadius: 100,
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
   },
})

export default Home