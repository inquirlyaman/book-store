import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        require: true
    }
})
const Book = mongoose.model('book', bookSchema);
export { Book };