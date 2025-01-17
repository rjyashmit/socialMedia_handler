
// const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("socialHandle", socialHandle);
//     Array.from(images).forEach((file) => {
//       formData.append("images", file);
//     });
  
//     try {
//       console.log("Submitting data:", formData);
//       const response = await axios.post("http://localhost:5000/submit", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Response from backend:", response.data);
//       alert("Data submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Error submitting data.");
//     }
//   };
  



// RUnning

// import React, { useState } from "react";
// import axios from "axios";

// const UserForm = () => {
//   const [name, setName] = useState("");
//   const [socialHandle, setSocialHandle] = useState("");
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("socialHandle", socialHandle);
//     images.forEach((image) => {
//       formData.append("images", image);
//     });

//     try {
//       const response = await axios.post("http://localhost:5000/submit", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Error submitting the form");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>User Submission Form</h2>
//       {message && <div className="alert alert-info">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Social Media Handle</label>
//           <input
//             type="text"
//             className="form-control"
//             value={socialHandle}
//             onChange={(e) => setSocialHandle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Upload Images</label>
//           <input
//             type="file"
//             className="form-control"
//             multiple
//             onChange={(e) => setImages([...e.target.files])}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;





import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [name, setName] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !socialHandle.trim() || images.length === 0) {
      setMessage("All fields are required. Please fill them out.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("socialHandle", socialHandle);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post("http://localhost:5000/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message || "Form submitted successfully!");
      setName("");
      setSocialHandle("");
      setImages([]);
    } catch (error) {
      setMessage("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      setMessage("You can upload up to 5 images only.");
      return;
    }
    setImages(selectedFiles);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor: "#f4f4f4",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#4A5568",
            fontWeight: "bold",
          }}
        >
          User Submission Form
        </h2>

        {message && (
          <div
            className={`alert ${
              message.includes("error") || message.includes("Error")
                ? "alert-danger"
                : "alert-success"
            }`}
            style={{
              fontSize: "14px",
              marginBottom: "20px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ fontWeight: "500" }}>
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="socialHandle" className="form-label" style={{ fontWeight: "500" }}>
              Social Media Handle <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="socialHandle"
              className="form-control"
              placeholder="e.g., @username"
              value={socialHandle}
              onChange={(e) => setSocialHandle(e.target.value)}
              required
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="images" className="form-label" style={{ fontWeight: "500" }}>
              Upload Images <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="file"
              id="images"
              className="form-control"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
            <span className="text-muted" style={{ fontSize: "12px", display: "block" }}>
              (Max 5 images)
            </span>
          </div>

          {images.length > 0 && (
            <div className="mb-3">
              {images.map((img, index) => (
                <span
                  key={index}
                  className="badge bg-primary me-1"
                  style={{
                    fontSize: "12px",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    backgroundColor: "#5A67D8",
                  }}
                >
                  {img.name}
                </span>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 mt-3"
            style={{
              backgroundColor: "#4A5568",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "16px",
              color: "#fff",
              transition: "background-color 0.3s ease",
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;







