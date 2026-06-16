const bcrypt = require("bcrypt");
const User = require('../models/People');
const { unlink } = require('fs');
const path = require('path');

// get users page
async function getUsers(req, res, next) {
    try {
        const users = await User.find();

        res.render("users", {
            users: users,
        })
    } catch (error) {
        next(error)
    }
}

// add user
async function addUser(req, res, next) {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const file = req.files && req.files.length > 0 ? req.files[0] : null;
        const filename = file ? file.filename : null;

        const newUser = new User({
            ...req.body,
            avatar: filename,
            password: hashedPassword,
        });

        await newUser.save();

        res.json({
            message: "User was added successfully!"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occurred!"
                }
            }
        });
    }
}

// remove user
async function removeUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (user && user.avatar) {
            unlink(
                path.join(
                    __dirname,
                    `/../public/uploads/avatars/${user.avatar}`
                ),
                (err) => {
                    if (err) console.log(err);
                }
            );
        }

        return res.status(200).json({
            message: "User was removed successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            errors: {
                common: {
                    msg: "Could not delete the user!"
                }
            }
        });
    }
}

module.exports = {
    getUsers,
    addUser,
    removeUser
}