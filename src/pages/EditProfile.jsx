import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: user.email,
    oldPassword: '',
    newPassword: '',
    profileImg: null,
    message: ''
  });
  
  const [selectedSection, setSelectedSection] = useState('email');
  
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-email/${user.id}`,
        { email: formData.email },
        config
      );
      setUser(response.data.user); // Updating the user state data
      alert('Email updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating email:', error);
      setFormData((prevState) => ({ ...prevState, message: 'Error updating email.' }));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-password/${user.id}`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        },
        config
      );
      setUser(response.data.user);
      alert('Password updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating password:', error);
      setFormData((prevState) => ({ ...prevState, message: 'Error updating password.' }));
    }
  };

  const handleProfileImgSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('profileImg', formData.profileImg);

    try {
      const response = await axios.put(
        `http://localhost:3001/user/update-profile-image/${user.id}`,
        data,
        config
      );
      setUser(response.data.user); // Update state
      alert('Profile image updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile image:', error);
      setFormData((prevState) => ({ ...prevState, message: 'Error updating profile image.' }));
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: user?.email || ''
    }));
  }, [user]);

  return (
    <div className="edit-profile-form">
      <h1>Edit Profile</h1>
      {formData.message && <p className="error">{formData.message}</p>}
      
      <div className="section-buttons">
        <button onClick={() => setSelectedSection('email')}>Edit Email</button>
        <button onClick={() => setSelectedSection('password')}>Change Password</button>
        <button onClick={() => setSelectedSection('profileImg')}>Update Profile Image</button>
      </div>

      {selectedSection === 'email' && (
        <form onSubmit={handleEmailSubmit}>
          <div>
            <label>New Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Email</button>
        </form>
      )}

      {selectedSection === 'password' && (
        <form onSubmit={handlePasswordSubmit}>
          <div>
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      )}

      {selectedSection === 'profileImg' && (
        <form onSubmit={handleProfileImgSubmit} encType="multipart/form-data">
          <div>
            <label>Profile Image:</label>
            <input
              type="file"
              name="profileImg"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Profile Image</button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
