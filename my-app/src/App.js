import React, { useState, useEffect } from 'react';
import Styles from "./Pagination.module.css"

function PaginationTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  async function fetchData() {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setTotalPages(Math.ceil(jsonData.length / rowsPerPage));
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }

  function goToPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className={Styles.wrapper}>
      <h1>Employee Data Table</h1>
      <div className={Styles.topRow}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              currentData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={Styles.btn}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <p>{currentPage}</p>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationTable;

