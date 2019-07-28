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
    if (values.price <= 0) {
      errors.price = 'Price must be higher than 0'
    }
    return errors;
  };