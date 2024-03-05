
import { check } from 'express-validator'

export const RegisterSchema = [
    check('name')
    .trim()
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage("Name should be alphabets only"),

    check('username', 'username is required').exists()
    .isAlphanumeric().withMessage("should be alphanumeric character only")
    .trim().isLength({min:1 , max : 32}),

    check('password', 'password is required').exists().isLength({min:1, max :16}).trim(),

    check('email', 'email is required').exists().isEmail(),

]











// import { z } from 'zod';

// export const userSchema = z.object({
//   username: z.string({ message: 'Username is not valid' }),
//   password: z.string().min(4, { message: 'Password should have at least 4 characters' }).max(16, { message: 'Password should not exceed 8 characters' }), 
//   name: z.string().min(1, { message: 'Name should have at least 1 character' }).max(30, { message: 'Name should not exceed 50 characters' }),
//   email: z.string().email({ message: 'Invalid email address' }),
// });