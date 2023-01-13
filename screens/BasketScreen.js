import { View, Text, TouchableOpacity,Image, ScrollView } from 'react-native'
import React, { useMemo,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import {selectRestaurant} from '../features/restaurantSlice'
import {removeFromBasket, selectBasketItems, selectBasketTotal} from '../features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch();
    const [groupedItemsInBasket,setGroupedItemsInBasket] = useState([]);
    const basketTotal = useSelector(selectBasketTotal)

    useMemo(()=>{
       const groupedItems = items.reduce((results,item)=>{
       (results[item.id] = results[item.id] || []).push(item);
       return results;
      },{}) 
      setGroupedItemsInBasket(groupedItems)
    },[items])


  return (
    <SafeAreaView className='flex-1 bg-white '>
      <View className='flex-1 bg-gray-100 '>
        <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
          <View>
             <Text className='text-lg font-bold text-center'>Carrinho</Text>
              <Text className='text-center text-gray-400'>{restaurant.title}
              </Text>
          </View>
          <TouchableOpacity
          onPress={navigation.goBack}
          className='rounded-full bg-gray-100 absolute top-3 right-5'
          >
            <XCircleIcon color='#00ccbb' height={50} width={50}/>

          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5 '>
          <Image
          source={{
            uri:"https://links.papareact.com/wru"
          }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1'>Entregas em 50-75 minutos</Text>
          <TouchableOpacity>
              <Text className='text-[#00ccbb]'>Trocar</Text>
            </TouchableOpacity>          
        </View>
        <ScrollView className='divide-y-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key,items])=>
              <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5 h-20'>
                <Text className='text-[#00ccbb]'>{items.length}x</Text>
                 <Text className='flex-1'>{items[0]?.name}</Text>
                 <Text className='text-gray-600'>
                  {items[0]?.price} R$
                 </Text>
                 <TouchableOpacity>
                  <Text
                  className='text-[#00ccbb] text-xs'
                  onPress={()=>dispatch(removeFromBasket({id:key}))}>
                    Remover
                  </Text>
                 </TouchableOpacity>
              </View>
          )}
        </ScrollView>
        <View className='p-5 bg-white mt-5 space-y-4 '>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal:</Text>
            <Text className='text-gray-400'>
              R$ {basketTotal}

            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Taxa de entrega:</Text>
            <Text className='text-gray-400'>
              R$ 5

            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text >Total:</Text>
            <Text className='font-extrabold'>
              R$ {basketTotal + 5}

            </Text>
          </View>
          <TouchableOpacity className='rounded-lg bg-[#00ccbb] p-4 '
          onPress={()=>navigation.navigate('PreparingOrder')}
          >
            <Text className='text-center text-white text-lg font-bold'>
              Fazer Pedido
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default BasketScreen