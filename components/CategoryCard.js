import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'

export default function CategoryCard({imgUrl,title}) {


  return (
    <TouchableOpacity className='mr-2 relative'>
        <Image source={{uri:imgUrl}}
        className='w-20 h-20 rounded'
        />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  )
}