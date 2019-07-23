export default function ValidateBookingDate(values) {
    let errors = {};
    if (values.location == "")
      errors.location = 'Location is required'
    if (values.pick_date == "")
      errors.pick_date = 'Pick Date is required'
    if (values.return_date == "")
      errors.return_date = 'Return Date is required'
    return errors;
  };