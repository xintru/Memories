export const cloudinaryUploadService = async (file) => {
  const uploadData = new FormData()

  uploadData.append('file', file)
  uploadData.append('upload_preset', process.env.CLOUDINARY_PRESET)
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload?api_key=${process.env.CLODINARY_API_KEY}`,
      {
        method: 'POST',
        body: uploadData,
      },
    )
    return response.json()
  } catch (e) {
    console.log('smth is wrong with uploading the file')
  }
}
