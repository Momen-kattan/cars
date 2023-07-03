import * as yup from "yup";


export const checkoutSchema = yup.object().shape({
    mileage: yup.string().required("required"),
    color: yup.string().required("required"),
    manufacturingyear: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .required("required"),
      cleantitle: yup.string().required("required"),
      EngineType: yup.string().required("required"),
      geartype: yup.string().required("required"),
      Fuel: yup.string().required("required"),
      type: yup.string().required("required"),
      Drive: yup.string().required("required"),
      price: yup.string().required("required"),
      Notes: yup.string().required("required"),
      location: yup.string().required("required"),
  });     