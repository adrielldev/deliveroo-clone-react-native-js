import { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'


export default function FeaturedRow({id,title,description}) {

  const [restaurants,setRestaurants] = useState([])


  useEffect(()=>{
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[]->{
          ...,
          dishes[]->
      }
  }[0]
    `,{ id:id })
    .then(data=>{
      setRestaurants(data?.restaurants)
    })
  },[])


  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color='#00CCBB' />
      </View>

      <Text className="text-xs text-gray-500 px-4">
        {description}
      </Text>

      <ScrollView horizontal
      contentContainerStyle={{
        paddingHorizontal:15,
      }}
      showsHorizontalScrollIndicator={false}
      className='pt-4'
      >

        {
          restaurants ? restaurants.map(res => 
            <RestaurantCard
            key={res._id}
            id={res._id}
            imgUrl={res.image}
            address={res.address}
            title={res.name}
            dishes={res.dishes}
            rating={res.rating}
            short_description={res.short_description}
            genre={res.type.title}
            long={res.long}
            lat={res.lat}
            />
            ) : <Text>Loading restaurants</Text>
        }



      </ScrollView>

    </View>
  )
}



