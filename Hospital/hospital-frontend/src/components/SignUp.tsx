// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import { Button, TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();

//   // ✅ State to store form input
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     contact: "",
//     dob: "",
//   });

//   const [error, setError] = useState(""); // ✅ Handle errors

//   // ✅ Handle form input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle registration request
//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3000/graphql", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           query: `mutation {
//             register(
//               firstName: "${formData.firstName}",
//               lastName: "${formData.lastName}",
//               email: "${formData.email}",
//               password: "${formData.password}",
//               gender: "Prefer not to say",
//               bloodgroup: "Unknown"
//             ) {
//               token
//               userId
//             }
//           }`,
//         }),
//       });

//       const result = await response.json();
//       console.log("🚀 Registration Response:", result);

//       if (result.errors) {
//         throw new Error(result.errors[0].message);
//       }

//       alert("🎉 Registration successful! Please log in.");
//       navigate("/");
//     } catch (err: any) {
//       console.error("❌ Registration failed:", err.message);
//       setError(err.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="signupForm flex justify-center items-center min-h-screen bg-gray-100">
//         <Box
//           component="form"
//           sx={{ "& .MuiTextField-root": { m: 1, width: "80%" } }}
//           noValidate
//           autoComplete="off"
//           className="p-8 bg-white rounded border-black border-2 shadow-lg"
//           onSubmit={handleSignUp} // ✅ Attach submit handler
//         >
//           <div className="flex justify-center items-center">
//             <h4>SignUp</h4>
//           </div>

//           {/* First Name */}
//           <TextField
//             required
//             name="firstName"
//             label="First Name"
//             fullWidth
//             onChange={handleChange}
//           />
          
//           {/* Last Name */}
//           <TextField
//             required
//             name="lastName"
//             label="Last Name"
//             fullWidth
//             onChange={handleChange}
//           />

//           {/* Email */}
//           <TextField
//             required
//             name="email"
//             label="Email"
//             type="email"
//             fullWidth
//             onChange={handleChange}
//           />

//           {/* Password */}
//           <TextField
//             required
//             name="password"
//             label="Password"
//             type="password"
//             fullWidth
//             onChange={handleChange}
//           />

//           {/* Confirm Password */}
//           <TextField
//             required
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             fullWidth
//             onChange={handleChange}
//           />

//           {/* Contact Number */}
//           <TextField
//             required
//             name="contact"
//             label="Contact Number"
//             type="tel"
//             fullWidth
//             onChange={handleChange}
//           />

//           {/* Date of Birth */}
//           <TextField
//             name="dob"
//             label="Date of Birth"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             onChange={handleChange}
//           />

//           {/* Error Message */}
//           {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//           {/* Submit Button */}
//           <div className="flex justify-center items-center mb-2">
//             <Button variant="contained" type="submit">
//               SignUp
//             </Button>
//           </div>

//           {/* Navigate to Login */}
//           <div className="flex justify-center items-center mb-2">
//             <Button variant="text" color="primary" onClick={() => navigate("/")}>
//               Already have an account? Login
//             </Button>
//           </div>
//         </Box>
//       </div>
//     </>
//   );
// };

// export default SignUp;
