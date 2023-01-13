import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserIcon, ChevronDownIcon, AdjustmentsVerticalIcon } from 'react-native-heroicons/outline'
import { FontAwesome } from '@expo/vector-icons'
import Categories from '../components/Categories'
import sanityClient from '../sanity'

import FeaturedRow from '../components/FeaturedRow'

export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategories,setFeaturedCategories] = React.useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(()=>{
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]
        }
        `).then(data=>{
            setFeaturedCategories(data)
        })
    },[])


    return (
        <SafeAreaView className="bg-white pt-5 ">

            <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
                <Image
                    source={{ uri: 'https://links.papareact.com/wru' }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">
                        Peça agora!
                    </Text>
                    <Text className="font-bold text-xl ">

                        Localização atual
                        <ChevronDownIcon size={20} color='#00CCBB' />
                    </Text>
                </View>

                <UserIcon size={35} color='#00CCBB' />
            </View>


            <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
                <View className='flex-row space-x-2 flex-1  bg-gray-200 p-3'>
                    <FontAwesome name='search' size={20} color='gray' />

                    <TextInput placeholder='Restaurantes e cozinhas'
                        keyboardType='default'
                    />


                </View>
                <AdjustmentsVerticalIcon color='#00CCBB' />
            </View>

            <ScrollView className="bg-gray-100 flex-1"
                contentContainerStyle={{
                    paddingBottom: 100
                }}>
                <Categories />

               {featuredCategories ? featuredCategories.map(cat=>
               <FeaturedRow
               key={cat._id}
               id= {cat._id}
               title={cat.name}
               description ={cat.short_description}
               />
               )
               : <Text>AAAAA</Text>}
               

            </ScrollView>


        </SafeAreaView>
    )
}