export default function validate(values) {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.name) {
        errors.name = "Name is required"
    }
    if (!values.password) {
        errors.password = "Password is required"
    }
    if (!values.confirm) {
        errors.confirm = "Password is required"
    }
    if (values.password != values.confirm) {
        errors.confirm = "Passwords do not match"
    }
    return errors;
};