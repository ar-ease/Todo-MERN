
import { check } from 'express-validator'

export const LoginSchema = [
  
    check('username', 'username is required').exists()
    .isAlphanumeric().withMessage("should be alphanumeric character only")
    .trim().isLength({min:1 , max : 32}),

    check('password', 'password is required').isLength({min:6 , max :16}).trim(),


]

