import React, { useState } from "react";
import "./FormCss.css"

function PostPaperForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    abstract: "",
    url: "",
    department: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

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
          year: "",
          abstract: "",
          url: "",
          department: "",
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
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
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
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
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
