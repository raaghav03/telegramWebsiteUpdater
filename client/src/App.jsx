import React, { useState, useEffect } from "react";
import axios from "axios";

const DataList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <strong>Message:</strong> {item.entry} <br />
          <strong>Date:</strong> {item.timestamp}
        </li>
      ))}
    </ul>
  );
};

export default DataList;
