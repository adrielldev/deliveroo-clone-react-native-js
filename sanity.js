import sanityClient from "@sanity/client"
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId:'rulspk9q',
    dataset:'production',
    apiVersion: '2021-10-21',
    useCdn:true
});


const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);

export default client