const { default: mongoose } = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        quantity:{
            type: String,
            required: true
        },
        price:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: false
        }

    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('product', productSchema);

module.exports = Product;