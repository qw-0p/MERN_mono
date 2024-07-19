import mongoose from "mongoose"

export default (uri: string) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log('DB OK')
    })
    .catch((err) => console.log('DB error', err))
};
