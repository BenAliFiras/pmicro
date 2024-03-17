import React from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBanUser = async (e, user) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/users/${user._id}/ban`);
      // Update the 'banned' property in the users state
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, banned: !u.banned } : u
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const pageSize = 5;
  const pageCount = Math.ceil(users.length / pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="content">
      <center>
        {" "}
        <div className="stand-with-palestine-banner">
          <p>Stand with Palestine</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/2560px-Flag_of_Palestine.svg.png"
            alt="Palestinian Flag"
            style={{ width: "100px", height: "auto" }}
          />
        </div>
      </center>
      <h1 className="mb-4">Users List</h1>
      <Card>
        <CardBody>
          <Table striped bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Ban</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.last_name}</td>
                  <td>{user.first_name}</td>
                  <td>
                    <Button
                      color={user.banned ? "danger" : "success"}
                      onClick={(e) => handleBanUser(e, user)}
                    >
                      {user.banned ? "Unban User" : "Ban User"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter className="py-4">
          <nav aria-label="...">
            <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0"
            >
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  onClick={() => handlePageClick(currentPage - 1)}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              {pages.map((page) => (
                <PaginationItem key={page} active={currentPage === page}>
                  <PaginationLink onClick={() => handlePageClick(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage === pageCount}>
                <PaginationLink
                  onClick={() => handlePageClick(currentPage + 1)}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UsersList;
