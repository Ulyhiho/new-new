import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../css/ViewContact.css";

export function ViewContact(props) {
  const [viewDelete, setViewDelete] = useState([]);

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
        <h3>Contact Data</h3>

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

        <div className="OptionControl">
          <div className="LinkControl">
            <Link to="/">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
