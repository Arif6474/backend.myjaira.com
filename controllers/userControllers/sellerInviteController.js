import asyncHandler from 'express-async-handler'
import Seller from '#models/sellerModel.js'
import SellerInvite from '#models/sellerInviteModel.js'
import { generateToken } from '#utils/helperFunction.js'
import { sendSellerInvitationEmail } from '#config/email/emailFormats/sendMail.js'

// invite seller
const inviteSeller = asyncHandler (async (req,res) => {

    const {email} = req.body

    if(req.seller.level !== 'admin' || req.seller.level !== 'superAdmin') {
        res.status(400)
        throw new Error('You Must Be An Admin  or Super Admin To Add Sellers!!')
    }
    
    if(!email){
        res.status(400)
        throw new Error('Please Enter an Email')
    }

    const isExistSeller = await Seller.findOne({email})

    if (isExistSeller) {
        res.status(400)
        throw new Error('Seller already exists with this email')
    }

    const emailExistsinInvite = await SellerInvite.findOne({email})

    if (emailExistsinInvite) {
        await SellerInvite.deleteOne({ email });
    }

    const sellerInvite = await SellerInvite.create({
        email,
        seller: req.seller._id
    })

    if (sellerInvite) {
        const token = generateToken(sellerInvite._id)

        //send mail
        const link = process.env.SELLER_APP_LINK + 'auth/register/' + token
        await sendSellerInvitationEmail(sellerInvite.email, link)
        res.status(201).json({
            id: sellerInvite._id,
            email: sellerInvite.email,
            token
        })
        
    } else {
        res.status(400)
        throw new Error('Failed to create seller invite')
    }
    
})


// get single invite
const getSingleInvite = asyncHandler (async (req,res) => {

    if(req.seller.level !== 'admin' || req.seller.level !== 'superAdmin') {
        res.status(400)
        throw new Error('You Must Be An Admin or Super Admin To View Invites!!')
    }

    const invite = await SellerInvite.findById(req.params.id)

    if(!invite) {
        res.status(400)
        throw new Error('Invite Not Found')
    }

    res.status(200).json(invite)
})

// get all invites
const getAllInvites = asyncHandler (async (req,res) => {

    if(req.seller.level !== 'admin' || req.seller.level !== 'superAdmin') {
        res.status(400)
        throw new Error('You Must Be An Admin or Super Admin To View Invites!!')
    }

    const invites = await SellerInvite.find()

    res.status(200).json(invites)
})
// delete invite
const deleteInvite = asyncHandler (async (req,res) => {

    if(req.seller.level !== 'admin' || req.seller.level !== 'superAdmin') {
        res.status(400)
        throw new Error('You Must Be An Admin To Delete Invites!!')
    }
    
    const inviteToDelete = await SellerInvite.findById(req.params.id)

    if(!inviteToDelete) {
        res.status(400)
        throw new Error('Invite Not Found')
    }

    await SellerInvite.deleteOne({ email : inviteToDelete.email});

    res.status(200).json({ message: 'Invite Deleted Successfully' })
})

export {
    inviteSeller,
    getAllInvites,
    getSingleInvite,
    deleteInvite,
}