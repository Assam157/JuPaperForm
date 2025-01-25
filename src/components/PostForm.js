 import React, { useState } from "react";
import "./FormCss.css";

function PostPaperForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "2023", // Default to 2023
    abstract: "",
    url: "",
    department: "Computer Science", // Default department
  });

  const [responseMessage, setResponseMessage] = useState("");

  // List of departments
 
  const departments = [
    "IAR",
    "VLSI",
    "Nano",
    "ItCourseWare",
    "Control",
    "Illumination",
    "Enviromental Sciences",
    "Water Resource",
    "Other"
  ];
 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://jupaperbackend-15hi.onrender.com/post-paper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResponseMessage("Paper posted successfully!");
        setFormData({
          title: "",
          author: "",
          year: "2023",
          abstract: "",
          url: "",
          department: "Computer Science",
        }); // Clear form
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setResponseMessage("An error occurred while posting the paper.");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Post a New Paper</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author: </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year: </label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div>
          <label>Abstract: </label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label>URL: </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department: </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit Paper
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default PostPaperForm;

