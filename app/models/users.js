const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
    company: { type: String, default: '' },
    ipaddress: { type: String, default: '0.0.0.0' },
    access: { type: Array, default: [] },//'cards', 'odds', 'tips', 'next_race'] },
    status: { type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)