/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import eyeIcon from "../assets/eye-password-hide-icon-2048x2048-c8pmhg0p.png";
import downloadIcon from "../assets/eye.256x193.png";
import Card from "./Card";
import CardNew from "./CardNew";
import axios from "axios"; // Axios for making API requests

const Manage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState('');
  const [name, setname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const closeForm = () => {
    setFormVisible(false); // Function to close the form
  };


  // Fetch passwords from API
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/passwords");
        console.log(response)
        setPasswords(response.data); // Assuming your API returns an array of password objects
      } catch (error) {
        console.error("Error fe tching passwords:", error);
      }
    };

    fetchPasswords();
  }, []); // Empty dependency array means this effect runs only on component mount
  // const addPassword = (newPassword) => {
  //   setPasswords([...passwords, newPassword]);
  // };

  const handleAddPassword = async () => {
    const newPassword = { name , website, username, password };
    try {
      const response = await axios.post('http://localhost:3000/api/passwords', newPassword);
      
      // Update the state with the newly added password
      setPasswords([...passwords, response.data]);
      
      // Clear the input fields
      setWebsite('');
      setname('');
      setUsername('');
      setPassword('');
      
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };
  const deletePassword = async (index, id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/passwords/${id}`);
      // Update state after successful deletion
      const newPasswords = passwords.filter((_, i) => i !== index);
      setPasswords(newPasswords);
    } catch (error) {
      console.error("Error deleting password:", error);
    }};
  

 
  const editPassword = (index, updatedPassword) => {
    const newPasswords = passwords.map((password, i) =>
      i === index ? updatedPassword : password
    );
    setPasswords(newPasswords);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
        <div className=" mycontainer">
          <h1 className="text-4xl text-center">
            <span className="text-green-700">&lt;</span>
            <span>Pass</span>
            <span className="text-green-700">OP/&gt;</span>
          </h1>
          <p className="text-lg text-center">Your own Password Manager</p>
          <div className="flex flex-col p-4 text-black gap-8">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              placeholder="Enter website URL"
              type="text"
              name=""
              id=""
              onChange={(e) => setWebsite(e.target.value)}
            />
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1"
              placeholder="Enter website Name"
              type="text"
              name=""
              id=""
              onChange={(e) => setname(e.target.value)}
            />
            <div className="flex w-full justify-between gap-8">
              <input
                placeholder="Enter username"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="text"
                name=""
                id=""
                onChange={(e) => setUsername(e.target.value)}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="Enter password"
                  className="rounded-full border border-green-500 w-full p-4 py-1"
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginRight: "40px" }} // Add right margin to create space for the button
                />
                <button
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "-10px",
                  }}
                >
                  {showPassword ? (
                    <img
                      className="h-10 w-10"
                      src={downloadIcon}
                      alt="Hide Password"
                    />
                  ) : (
                    <img
                      className="h-10 w-10"
                      src={eyeIcon}
                      alt="Show Password"
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              className="flex justify-center items-center bg-green-500 rounded-full px-2 py-2 hover:bg-green-400"
              onClick={handleAddPassword}
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Add Password
            </button>
          </div>
          <div className="password-cards">
            {passwords.map((passwordData, index) => (
              <CardNew
              key={passwordData._id}
              index={index}
              id={passwordData._id}
              name={passwordData.name}
              website={passwordData.website}
              username={passwordData.username}
              password={passwordData.password}
              onDelete={() => deletePassword(index, passwordData._id)}
              onEdit={editPassword}
              closeForm={closeForm}
              className="password-cards"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;
