import { v2 as cloudinary } from 'cloudinary'
import { CLOUD_NAME, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } from '../config.js'

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY_CLOUDINARY,
    api_secret: API_SECRET_CLOUDINARY
});

export const getImage = async (id) => {
    try {
        const url = cloudinary.url(id, {
            version: Date.now()
        })
        return url
    } catch (error) {
        console.log(error)
    }
}

export const createImage = async (url, id) => {
    try {
        const createResult = await cloudinary.uploader.upload(
            url,
            { public_id: id }
        )
        return createResult.secure_url
    } catch (error) {
        console.log(error)
    }
}

export const deleteImage = async (id) => {
    try {
        const deleteResult = await cloudinary.uploader.destroy(id)
        return deleteResult.secure_url
    } catch (error) {
        console.log(error)
    }
}

export const updateImage = async (imageUrl, imageId) => {
    try {
        const updateResult = await cloudinary.uploader.upload(
            imageUrl,
            {
                public_id: imageId,
                invalidate: true
            }
        )
        return updateResult.secure_url
    } catch (error) {
        console.log(error)
    }
}