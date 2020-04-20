const Yup = require('yup');
const { sendEmail } = require('../utils/emails');

const Usermodel = require('../models/User');

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        roles: Yup.mixed().oneOf(['ADMIN', 'SALES']).required(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const user = await Usermodel.findOne({
        where: { email: req.body.email },
      });

      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const { id, name, email } = await Usermodel.create(req.body);

      await sendEmail(req);

      return res.status(201).json({ id, name, email });
    } catch (err) {
      return res.status(500).json({
        message: 'Operation user store failed',
        err,
      });
    }
  }

  async show(req, res) {
    try {
      const users = await Usermodel.findAll({
        attributes: ['id', 'name', 'email', 'roles', 'created_at'],
      });

      return res.status(200).json({
        total: users.length,
        data: users,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Operation users show failed',
        err,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const Exist = await Usermodel.findOne({
        where: { id },
      });

      if (!Exist) {
        return res.status(404).json({ message: 'Nonexistent user id' });
      }

      await Usermodel.destroy({
        where: { id },
      });

      return res.status(200).json({ message: 'User deleted sucessfuly' });
    } catch (err) {
      return res.status(500).json({
        message: 'Operation user delete failed',
        err,
      });
    }
  }
}

module.exports = new UserController();
