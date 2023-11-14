import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post('http://yourbackend.com/api/verify-email', { token });
        navigate('/email-verified'); // Redirect to a success page or login page
      } catch (err) {
        setError('Verification failed. Please try again or contact support.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]); // Updated dependency array

  if (loading) return <p>Verifying...</p>;
  if (error) return <p>{error}</p>;
  return null; // Redirect will handle the UI change
}

export default VerifyEmail;
