const { User } = require('../db/models');

class UserController {
    async getUserList(req, res) {
        await User.findAll().then((user) => {
            if (user.length === 0) {
                res.status(200).json({ status: "success", message: 'No records found.', data: [] })
            }
            res.status(200).json({ status: "success", message: 'Record found.', data: user })
        }).catch((err) => {
            log('error', err);
            res.status(500).json({ status: "success", message: 'Something went wrong.' })
        });
    }
}

module.exports = new UserController();
