import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './Verify.css';

const Verify = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [message, setMessage] = useState("");
  const [resk, setResk] = useState("");


  useEffect(() => {
    
    const verification = async () => {
      console.log('Entering Verification');
      try {

        setResk(await fetch(`/api/verify-email?token=${token}`,{                
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }));

        // if (!response.ok) {
        //   console.log('Token:', token);
        //   console.error('Error fetching data:', response);
        //   return;
        // }

        // const json = await response.json();
        // setMessage(json.message);
      } catch (error) {
        console.log('Token:', token);
        console.log('Token:', resk);
        console.error('Error fetching data:', error.message);
      }
    };

    verification();
  }, [token]);

  return (
    <div className="center-text">
      <h1>{message}</h1>
    </div>
  );
};

export default Verify;