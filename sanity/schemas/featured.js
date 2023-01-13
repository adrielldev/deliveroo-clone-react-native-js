export default {
    name:"featured",
    type:"document",
    title:"Featured Menu categories",
    fields:[
        {
            name:"name",
            type:"string",
            title:"Featured Category Name",
            validation:R => R.required()

        },
        {
            name:"short_description",
            type:"string",
            title:"Short Description",
            validation: R => R.max(200)
        },
        {
            name:"restaurants",
            type:"array",
            title:"Restaurants",
            of:[{type:"reference",to:[{type:"restaurant"}]}]
        }
    ]
}