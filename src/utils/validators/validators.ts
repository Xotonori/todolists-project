import * as yup from "yup";

export const schemaSignInForm = yup.object().shape({
    email: yup.string().required().min(2, 'require more or equal 2' ),
    password: yup.string().required().min(4, 'require more or equal 4' )
});