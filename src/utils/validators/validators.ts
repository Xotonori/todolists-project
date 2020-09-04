import * as yup from "yup";

export const schemaSignInForm = yup.object().shape({
    email: yup.string().required().min(2),
    password: yup.string().required().min(8)
});