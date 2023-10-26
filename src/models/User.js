const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Password is too short!'],
        match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric!'],
        unique: [true, 'Username already exists'],

    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        validate: {

            // VALID EXAMPLE:
            // validator: function(value) {
            //     return this.repeatPassword === value;
            // },
            // message: `Password missmatch!`

            validator: function (value) {
                return /^[A-Za-z0-9]+$/.test(value);
            },
            message: `Invalid password characters!`
        },

        minLength: 8,
    },
    info: {
        documentNumber: {
            type: String,
        }
    },
});

//TODO: validate if user exists

userSchema.virtual('repeatPassword')
    .set(function(value) {

        if (value !== this.password) {
            throw new Error('Password missmatch!');
        }

    });

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;





// This stays here just for an example:
// userSchema.pre('validate', function() {
//     if(this.repeatPassword !== this.password) {
//         throw new mongoose.MongooseError('Password missmatch!');
//     }
// });