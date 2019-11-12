const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});
//virtual field
userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

//Schema Methods
userSchema.methods = {
    authenticate: function (userpass){
        return this.hashed_password === encryptPassword(userpass)
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userSchema);