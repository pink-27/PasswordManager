/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./PasswordCard.css"; // Assuming you have a CSS file for styling
import PopupForm from "./PopupForm";

const CardNew = ({
  index,
  name,
  website,
  username,
  password,
  onDelete,
  onEdit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWebsite, setEditedWebsite] = useState(website);
  const [editedname, setEditedname] = useState(name);
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedPassword, setEditedPassword] = useState(password);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleButtonClick = () => {
    setFormVisible(true); // Open the popup form when the button is clicked
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(index, {
      website: editedWebsite,
      username: editedUsername,
      password: editedPassword,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div className="password-card">
      {isEditing ? (
        <>
          <input
            type="text"
            className="rounded-full border border-green-500 w-half p-4 py-1 m-2"
            value={editedWebsite}
            onChange={(e) => setEditedWebsite(e.target.value)}
          />
          <input
            type="text"
            className="rounded-full border border-green-500 w-half p-4 py-1 m-2"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
          />
          <input
            type="password"
            className="rounded-full border border-green-500 w-half p-4 py-1 m-2"
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
          />
          <button onClick={handleSave} className="toggle-button">
            Save
          </button>
        </>
      ) : (
        <>
          <h3>
            <strong>Name:</strong> {name}
          </h3>
          <h3>
            <strong>Website:</strong> {website}
          </h3>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Password:</strong>
            <span className="password-field">
              {showPassword ? (
                <input
                  placeholder="Enter password"
                  value={password}
                  className="rounded-full border border-green-500 w-half p-4 py-1 m-2"
                  type={showPassword ? "text" : "password"}
                  readOnly="readonly"
                  name=""
                  id=""
                  style={{ marginRight: "40px" }} // Add right margin to create space for the button
                />
              ) : (
                "••••••••"
              )}
            </span>
          </p>
          <button className="toggle-button" onClick={handleButtonClick}>
            {name}
            {isFormVisible && (
              <PopupForm
                onSubmit={onEdit}
                index={index}
                name={name}
                website={website}
                username={username}
                password={password}
                closeForm={setFormVisible}
              />
            )}
          </button>
          <button className="toggle-button" onClick={handleEdit}>
            Edit
          </button>
          <button className="toggle-button" onClick={handleDelete}>
            Delete
          </button>
          <button
            onClick={togglePasswordVisibility}
            className="toggle-button m-2"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </>
      )}
    </div>
  );
};

export default CardNew;
