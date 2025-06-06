const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  username: {  type: String, maxLength: 255 },
  password: { type: String, maxLength: 600 },
  role : { type: String, maxLength: 255 }, // Phân quyền
  createdAt: { type: Date, default: Date.now }, // Thời gian tạo
  updatedAt: { type: Date, default: Date.now }, // Thời gian cập nhật
});

module.exports = mongoose.model('Account', Account); 
