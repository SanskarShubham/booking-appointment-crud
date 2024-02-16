const User = require('../models/user');


exports.postAddUser = (req, res, next) => {
  const name = req.body.name;
  const emailAdd = req.body.emailAdd;
  const phoneNo = req.body.phoneNo;
  

  // const product = new User(null, name, emailAdd, description, phoneNo);
  User.create({
    name: name,
    emailAdd: emailAdd,
    phoneNo: phoneNo

  })
    .then((users) => {
      return res.status(200).json({
        status: true,
        data: users,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });

};


exports.postEditUser = (req, res, next) => {

  const id = req.body.id;

  const name = req.body.name;
  const emailAdd = req.body.emailAdd;
  const phoneNo = req.body.phoneNo;

  // const product = new User(id, name, emailAdd, description, phoneNo);

  User.update({
    name: name,
    emailAdd: emailAdd,
    phoneNo: phoneNo

  }, { where: { id: id } })
    .then((users) => {
      return res.status(200).json({
        status: true,
        data: users,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });

};

exports.postDeleteUser = (req, res, next) => {
  const id = req.params.userid;
  console.log(req.params)
  User.findByPk(id)
    .then(user => {
      return user.destroy()
    })
    .then((users) => {
      return res.status(200).json({
        status: true,
        data: users,
      });
    })
    .catch((err) => {
      console.log(err)  ;
      return res.status(500).json({
        status: false,
        error: err,
      });
    });

};
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      return res.status(200).json({
        status: true,
        data: users,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
};
exports.getEditUser = (req, res, next) => {

  const userid = req.params.userid;
  // console.log(productId, editing);
  User.findByPk(userid)
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
  


};
