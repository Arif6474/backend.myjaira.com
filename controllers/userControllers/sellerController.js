import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import Seller from '#models/sellerModel.js'
import { generateToken } from '#utils/helperFunction.js'
import SellerInvite from '#models/sellerInviteModel.js'
import { sendForgotPasswordMail } from '#config/email/emailFormats/sendMail.js'
import { getDocumentsWithQuery } from '#crudServices/crudServices.js'

const { genSalt, hash, compare } = bcrypt
const { verify } = jwt

// Get All Sellers with Query
const getAllSellerWithQuery = asyncHandler(async (req, res) => {
    await getDocumentsWithQuery({ model: Seller, req, res });
})
// Login Seller
const loginSeller = asyncHandler (async (req,res) => {

    const {email, password} = req.body

    const seller = await Seller.findOne({email})

    if(!seller) {
        res.status(400)
        throw new Error('No seller found with this email')
    }

    // Check if password matches
    if (seller && (await compare(password, seller.password))) {
        res.status(200).json({
            _id: seller._id,
            name: seller.name,
            email: seller.email,
            level: seller.level,
            image: seller.image,
            token: generateToken(seller._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

})

// Register Seller
const registerSeller = asyncHandler (async (req,res) => {
    const {name, email, password} = req.body
    
    // if(!req.file) {
    //     res.status(400)
    //     throw new Error('Please add an image')
    // }

    //Seller Email Present Or Not
    const isExistSeller = await Seller.findOne({email})

    if (isExistSeller) {
        res.status(400)
        throw new Error('Seller already exists with this email')
    }

    const sellerInvitation =await SellerInvite.findOne({email});
    if(!sellerInvitation){
        res.status(400)
        throw new Error('Seller invitation not found')
    }

    // Hash Password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    const seller = await Seller.create({
        name,
        email,
        level:'seller',
        password: hashedPassword,
        // image: req.file.path
    })

    if (seller) {
        await SellerInvite.deleteOne({ email });
        
        return res.status(201).json({
          _id: seller.id,
          name: seller.name,
          email: seller.email,
          level: seller.level,
          // dp: seller.dp,
          token: generateToken(seller._id),
        });
      }
    else {
        res.status(400)
        throw new Error('Invalid Seller Data')
    }
})

// change Seller Password
const changeSellerPassword = asyncHandler (async (req,res) => {

    const { oldPassword, newPassword } = req.body;
    const {_id, email} = req.seller

    if(!oldPassword || !newPassword) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check for seller email
    const seller = await Seller.findOne({email})

    if(!seller) {
        res.status(400)
        throw new Error('No seller found with this email!!')
    }

    const checkPassword = await compare(oldPassword, seller.password)
    
    if (!checkPassword) {
        res.status(400)
        throw new Error('Old Password does not match')
    }

    // Hash Password
    const salt = await genSalt(10)
    const hashedPassword = await hash(newPassword, salt)

    const updateData = {
        password: hashedPassword
    }

    const updatedData = await Seller.findByIdAndUpdate(_id, updateData)

    res.status(200).json(updatedData)
})

// seller forgot password
const forgotSellerPassword = asyncHandler (async (req,res) => {
    const {email} = req.body

    if (!email) {
        res.status(400)
        throw new Error('Please add an email')
    }
    
    //Seller Present Or Not
    const isExistSeller = await Seller.findOne({email});

    if(!isExistSeller){
        res.status(400)
        throw new Error('No seller found with this email!!')
    }

    const token = generateToken(isExistSeller._id)

    //send mail
    const link = process.env.SELLER_APP_LINK + 'auth/resetPassword/' + token

    const sendMail = await sendForgotPasswordMail(isExistSeller.email, link)

    res.status(201).json({
        id: isExistSeller._id,
        email: isExistSeller.email,
        sendMail
    })

})

// Reset Seller Password
const resetSellerPassword = asyncHandler (async (req,res) => {
    const { token, newPassword } = req.body;

    if (!newPassword) {
        res.status(400)
        throw new Error('Please add new Password')
    }

    const decoded = verify(token, process.env.JWT_SECRET)

    const sellerFromToken = await Seller.findById(decoded.id)

    if (!sellerFromToken) {
        res.status(400)
        throw new Error('Could not generate seller from token')
    }

    // Hash Password
    const salt = await genSalt(10)
    const hashedPassword = await hash(newPassword, salt)

    const updateData = {
        password: hashedPassword
    }

    const updatedData = await Seller.findByIdAndUpdate(sellerFromToken._id, updateData)

    res.status(200).json(updatedData)

}
)


// get email from token
const getEmailFromToken = asyncHandler (async (req,res) => {
    const { token } = req.params

    const decoded = verify(token, process.env.JWT_SECRET);

    const invite = await SellerInvite.findOne({_id: decoded.id});

    if(invite) {

        const {email} = invite

        res.status(201).json({
            email
        })

    } else {
        res.status(400)
        throw new Error('No Email Found with Token!!')
    }

})
export {
    getAllSellerWithQuery,
    loginSeller,
    registerSeller,
    changeSellerPassword,
    forgotSellerPassword,
    resetSellerPassword,
    getEmailFromToken,

}