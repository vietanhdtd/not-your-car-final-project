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
    return errors;
  };