import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import _ from "lodash";
import { TablePagination } from "@material-ui/core";
import "../css/Home.css";

export function Home(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/contacts").then((response) => {
      setContactList(response.data);
    });
  }, []);

  return (
    <div className="Container">
      <div className="TableContainer">
        <table>
          <thead className="TableHead">
            <th colspan="2" className="TableTitle">
              Contact List
            </th>
            <th colspan="4"></th>
            <th colspan="3" className="TableButton">
              <button>
                <Link to="/AddContact">Add Contact</Link>
              </button>
            </th>
          </thead>
          <thead>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>Registered Date</th>
            <th colspan="3">Action</th>
          </thead>
          <tbody>
            {contactList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((val, key) => {
                return (
                  <tr>
                    <td>{val.id}</td>
                    <td>{val.fullName}</td>
                    <td>{val.email}</td>
                    <td>{val.contactNumber}</td>
                    <td>{val.location}</td>
                    <td>{val.registeredDate}</td>
                    <td>
                      <Link className="blue" to={"/ViewContact/" + val.id}>
                        View
                      </Link>
                    </td>
                    <td>
                      <Link className="green" to={"/UpdateContact/" + val.id}>
                        Update
                      </Link>
                    </td>
                    <td>
                      <Link className="red" to={"/DeleteContact/" + val.id}>
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="Showing">
          <p>Showing</p>
          <TablePagination
            onPageChange={handleChangePage}
            rowsPerPageOptions={5}
            count={contactList.length}
            rowsPerPage={5}
            page={page}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
