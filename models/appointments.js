const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Appointment = sequelize.define('appointments',{
    id:{
      type: Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    time:{
      type: Sequelize.DataTypes.TIME
    },
    slot:{
      type: Sequelize.INTEGER,
    }
  })

  module.exports = Appointment;














































// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute('INSERT INTO `products` (`title`, `price`, `description`, `imageUrl`) VALUES (?, ?, ?, ?)',
//       [this.title, this.price, this.description, this.imageUrl]);

//   }

//   static fetchAll() {

//     return db.execute('SELECT * FROM products');

//   }

//   static DeleteById(id) {
//     return db.execute('DELETE FROM products WHERE id = ?', [id]);
//   }
//   static findById(id) {
//     return db.execute('SELECT * FROM products where id = ?', [id]);
//   }
// };
