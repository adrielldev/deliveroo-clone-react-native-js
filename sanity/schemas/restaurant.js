import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [{
    name:"name",
    type:"string",
    title:"Restaurant name",
    validation:(Rule) => Rule.required()
  },
  {
     name:"short_description",
     type:"string",
     title:"Short description",
     validation:(Rule)=>Rule.max(200)
  },
  {
    name:"image",
    type:"image",
    title:"Image of the restaurant"
  },
  {
    name:"lat",
    type:"number",
    title:"Latitute of the restaurant"
  },
  {
    name:"long",
    type:"number",
    title:"Longitude of the restaurant"
  },
  {
    name:"address",
    type:"string",
    title:"Restaurant Address",
    validation: (Rule) => Rule.required()
  },
  {
    name:"rating",
    type:"number",
    title:"Enter a rating from (1-5 Stars)",
    validation:(Rule) => Rule.required().min(1).max(5).error("Please enter a value between 1 and 5")
  },
  {
    name:"type",
    type:"string",
    title:"Category",
    validation:(Rule) => Rule.required(),
    type:"reference",
    to:[{type:"category"}]
  },
  {
    name:"dishes",
    type:"array",
    title:"Dishes",
    of:[{type:"reference",to:[{type:"dish"}]}]
  }
  ]
})
