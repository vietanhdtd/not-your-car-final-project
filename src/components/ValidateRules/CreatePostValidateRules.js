export default function validate(values) {
    let errors = {};
    if (!values.door) {
      errors.door = 'Number of Door is required';
    }
    if (!values.gearbox) {
      errors.gearbox = 'Gear Box is required';
    }
    if (!values.fuel) {
      errors.fuel = 'Fuel is required';
    }
    if (!values.price) {
      errors.price = 'Price is required'
    }
    if (values.price <= 0) {
      errors.price = 'Price must be higher than 0'
    }
    if (!values.description) {
      errors.description = 'Description is required'
    }
    if (values.description.length < 10) {
      errors.description = 'Description must be longer than 10 characters'
    }
    if(!values.img) {
      errors.img = 'Image is required'
    }
    return errors;
  };