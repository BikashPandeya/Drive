const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// User Routes

router.get("/register", (req, res) => {
  res.render("register", { error: null });
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({min : 10}),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).render("register", {
          error: "Invalid input data"
        });
      }

      const {email, username, password} = req.body;
      
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).render("register", {
          error: "User with this email already exists"
        });
      }

      const hashPassword = await bcrypt.hash(password, 10); // Using recommended salt rounds
      const newUser = await userModel.create({
        email,
        username,
        password: hashPassword
      });
      
      // Send back user data without password
      const userResponse = {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username
      };
      
      res.redirect('/user/login');
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).render("register", {
        error: "Error registering user"
      });
    }
  }
);

router.get('/login' , (req , res) => {
    res.render('login', { error: null });
})

router.post('/login' , 
    body('email').trim().isEmail().isLength({min : 10}),
    body('password').trim().isLength({min : 5}),
    async (req , res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render('login', {
                error: "Invalid input data"
            });
        }

        const {email , password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).render('login', {
                error: "Username or Password is incorrect"
            });
        }
        
        const isPasswordValid = await bcrypt.compare(password , user.password);
        if(!isPasswordValid) {
            return res.status(400).render('login', {
                error: "Username or Password is incorrect"
            });
        }

        const token = jwt.sign({userId : user._id , email : user.email , username : user.username} , process.env.JWT_SECRET );
        
        res.cookie('token' , token)
        res.redirect('/home');
    }
);

module.exports = router;
