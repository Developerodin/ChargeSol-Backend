import mongoose from 'mongoose'

const connection = async () => {
  try {
    mongoose.connect(
      'mongodb://127.0.0.1:27017/ChatApp',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
    console.log('DB CONNECTION ESTABLISHED')
  } catch (err) {
    console.log(err)
  }
}

export default connection
