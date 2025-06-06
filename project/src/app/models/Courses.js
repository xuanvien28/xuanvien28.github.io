const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: {  type: String, maxLength: 255 },
  description: { type: String, maxLength: 600 },
  image: { type: String, maxLength: 255 },
  cratedAt: { type: Date, default: Date.now }, // Thời gian tạo
  updatedAt: { type: Date, default: Date.now }, // Thời gian cập nhật
});

module.exports = mongoose.model('Course', Course); //đặt tên là Course
