const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/register",  userController.registerUser);
router.post("/login", userController.loginUser);

//Laterszzz
// router.get("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.log('Error while destroying session:', err);
//         } else {
//             req.logout(() => {
//                 console.log('You are logged out');
//                 res.redirect('/');
//             });
//         }
//     });
// });

module.exports = router