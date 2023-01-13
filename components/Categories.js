import { View, Text, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../sanity'

export default function Categories() {
  const [categories,setCategories] = useState([])
  useEffect(()=>{
    sanityClient.fetch(`
     *[_type=="category"]
    `).then(data=>{
      setCategories(data)
    })
  },[])
  
   return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop:10,
    }}
    >
       {categories ?
        categories.map(cat => 
        <CategoryCard
        key={cat._id}
        imgUrl={urlFor(cat.image).width(200).url()}
        title ={cat.name}
        />)
        :
         <Text>Loading Categories</Text>}

    </ScrollView>
  )
}