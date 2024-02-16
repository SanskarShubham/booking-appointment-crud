const Sequelize = require('sequelize');
const sequelize = require('../util/databse');

const Meeting = sequelize.define('meetings',{
    id:{
      type: Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    name: Sequelize.STRING,
    emailAdd:{
      type: Sequelize.STRING,
    },
    time:{
      type: Sequelize.DOUBLE
    },
    link:{
      type: Sequelize.STRING,
    }
  })

  module.exports = Meeting;














































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
