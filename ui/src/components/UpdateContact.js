import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/UpdateContact.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const today = new Date();
const yesterday = new Date(Date.now() - 86400000);
const tomorrow = new Date(new Date(today) + 86400);

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name field cannot be blank")
    .matches(/^[aA-zZ\s]+$/, "Full Name field accept characters values only")
    .max(30, "Full Field field accept up to 45 in size only"),
  email: Yup.string()
    .email("Email Address field should have email domain")
    .required("Email Address field cannot be blank")
    .max(45, "Email Address field accept up to 45 in size only"),
  contactNumber: Yup.string()
    .required("Contact Number field cannot be blank")
    .matches(phoneRegExp, "Phone number is not valid")
    .max(11, "Contact Number field accept up to 11 in size only"),
  location: Yup.string().required("Location field cannot be blank"),
  registeredDate: Yup.date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Registered Date field cannot be blank")
    .min(yesterday, "Registered Date field accepts current date only")
    .max(tomorrow, "Registered date field accepts current date only"),
});

export function UpdateContact(props) {
  const history = useHistory();

  const [viewUpdateContact, setViewUpdateContact] = useState([]);

  useEffect(() => {
    Axios.get(
      "http://localhost:3001/viewContact/" + props.match.params.id
    ).then((response) => {
      setViewUpdateContact(response.data);
    });
  });

  const onSubmit = async (values, id) => {
    const { value, ...data } = values;

    const response = Axios.put(
      "http://localhost:3001/updateContact/" + props.match.params.id,
      data
    ).catch((err) => {
      if (err && err.response) console.log("Error: ", err);
    });

    if (response && response.data) {
    }
    alert("Data Successfully Updated");
    setTimeout(() => history.push("/"), 500);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      fullName: "",
      email: "",
      contactNumber: "",
      location: "",
      registeredDate: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="Container">
      {viewUpdateContact.map((vals, key) => {
        return (
          <div className="FormContainer">
            <h3>Update Contact</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="InputControl">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Last Name, First Name, Middle Initial"
                />
                <p>
                  {formik.touched.fullName && formik.errors.fullName
                    ? formik.errors.fullName
                    : ""}
                </p>
              </div>

              <div className="InputControl">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="example@gmail.com"
                />
                <p>
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""}
                </p>
              </div>

              <div className="InputControl">
                <label>Contact Number:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="09770367286"
                />
                <p>
                  {formik.touched.contactNumber && formik.errors.contactNumber
                    ? formik.errors.contactNumber
                    : ""}
                </p>
              </div>

              <div className="InputControl">
                <label>Location:</label>
                <select
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled selected hidden>
                    Select Location
                  </option>
                  <option>Manila</option>
                  <option>Cebu</option>
                </select>
                <p>
                  {formik.touched.location && formik.errors.location
                    ? formik.errors.location
                    : ""}
                </p>
              </div>

              <div className="InputControl">
                <label>Registered Date:</label>
                <input
                  type="date"
                  name="registeredDate"
                  value={formik.values.registeredDate}
                  onChange={formik.handleChange}
                />
                <p>
                  {formik.touched.registeredDate && formik.errors.registeredDate
                    ? formik.errors.registeredDate
                    : ""}
                </p>
              </div>
              <div className="ButtonControl">
                <Link to="/" className="RedButton">
                  Back
                </Link>
                <button>Update Contact</button>
              </div>
            </form>
          </div>
        );
      })}

      <div className="DataToUpdate">
        <h2>Data to update</h2>

        {viewUpdateContact.map((vals, key) => {
          return (
            <div className="DataControl">
              <label>{vals.fullName}</label>
              <br />
              <label>{vals.email}</label>
              <br />
              <label>{vals.contactNumber}</label>
              <br />
              <label>{vals.location}</label>
              <br />
              <label>{vals.registeredDate}</label>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
