import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/DeleteContact.css";
import Axios from "axios";

export function DeleteContact(props) {
  const history = useHistory();
  const [viewDelete, setViewDelete] = useState([]);

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3001/deleteContact/${id}`);
    alert("Data Deleted");
    setTimeout(() => history.push("/"), 500);
  };

  useEffect(() => {
    Axios.get(
      "http://localhost:3001/viewContact/" + props.match.params.id
    ).then((response) => {
      setViewDelete(response.data);
    });
  });

  return (
    <div className="Container">
      <div className="FormContainer">
        <h3>Are you sure you want to delete this data?</h3>

        {viewDelete.map((vals, key) => {
          return (
            <div className="center">
              <div className="ContentControl">
                <label>ID:&nbsp;&nbsp;</label>
                {vals.id}
              </div>

              <div className="ContentControl">
                <label>Full Name:&nbsp;&nbsp;</label>
                {vals.fullName}
              </div>

              <div className="ContentControl">
                <label>Email:&nbsp;&nbsp;</label>
                {vals.email}
              </div>

              <div className="ContentControl">
                <label>Contact:&nbsp;&nbsp;</label>
                {vals.contactNumber}
              </div>

              <div className="ContentControl">
                <label>Location:&nbsp;&nbsp;</label>
                {vals.location}
              </div>

              <div className="ContentControl bottom-space">
                <label>Registered Date:&nbsp;&nbsp;</label>
                {vals.registeredDate}
              </div>
            </div>
          );
        })}

        {viewDelete.map((vals, key) => {
          return (
            <div className="OptionControl">
              <div className="LinkControl">
                <Link to="/">Back</Link>
              </div>
              <div className="LinkControl">
                <Link
                  className="Yes"
                  onClick={() => {
                    deleteContact(vals.id);
                  }}
                  to="/"
                >
                  Yes
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
