import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmCurrentPassword, setConfirmCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (currentPassword !== confirmCurrentPassword) {
      alert('Current password confirmation does not match.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/auth/reset-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password reset successfully! Please log in again.');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Error resetting password:', err);
      alert('Failed to reset password. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          required
        />
        <br />
        <input
          type="password"
          value={confirmCurrentPassword}
          onChange={(e) => setConfirmCurrentPassword(e.target.value)}
          placeholder="Confirm Current Password"
          required
        />
        <br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
