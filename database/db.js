import mongoose from "mongoose";

const connectToMongoDb = (connection_string) => {
    mongoose.connect(connection_string)
}

export default connectToMongoDb;