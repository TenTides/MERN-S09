import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post('http://yourbackend.com/api/verify-email', { token });
        setVerified(true);
        setError(null);
      } catch (err) {
        setError('Verification failed. Please try again or contact support.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (loading) return <p>Verifying...</p>;
  if (error) return <p>{error}</p>;
  return <div>{verified ? <p>Email verified successfully!</p> : <p>Verification failed.</p>}</div>;
}

export default VerifyEmail;
