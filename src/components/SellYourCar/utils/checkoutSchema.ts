import * as yup from "yup";


export const checkoutSchema = yup.object().shape({
    mileage: yup.string().required("required"),
    color: yup.string().required("required"),
    manufacturing_year: yup.string().required("required"),
    cylinders: yup.string().required("required"),
      cleantitle: yup.string().required("required"),
      engine_type: yup.string().required("required"),
      gear_type: yup.string().required("required"),
      car_models: yup.string().required("required"),
      type: yup.string().required("required"),
      clean_title: yup.string().required("required"),
      engine_capacity: yup.string().required("required"),
      notes: yup.string().required("required"),
      location: yup.string().required("required"),
  });     