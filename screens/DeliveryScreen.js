import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import {selectRestaurant} from '../features/restaurantSlice'
import { SafeAreaView } from 'react-native-safe-area-context';
import {XMarkIcon} from 'react-native-heroicons/solid'
import * as Progress from 'react-native-progress'

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)


  return (
    <View className='bg-[#00ccbb] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <XMarkIcon color="white" size={30}/>
            </TouchableOpacity>
            <Text className='font-light text-white text-lg'>
                Ajuda com o pedido
            </Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
            <View className='flex-row justify-between'>

            
            <View>
                <Text className='text-lg text-gray-400'>
                    Tempo estimado:
                </Text>
                <Text className='text-4xl font-bold'>
                    45-55 Minutos
                </Text>
            </View>
            <Image
            source={{
                uri:"https://links.papareact.com/fls"
            }}
            className='h-20 w-20'
            />
        </View>
        <Progress.Bar size={30} color='#00ccbb' indeterminate={true}/>
        <Text className='mt-3 text-gray-500'>
            Seu pedido no {restaurant.title} já está sendo preparado

        </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen