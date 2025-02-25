import React, { useState } from 'react';

function Login() {
  const [message,setMessage] = useState('');
  const [loginName,setLoginName] = React.useState('');
  const [loginPassword,setPassword] = React.useState('');

  function handleSetLoginName(e: any): void {
    setLoginName(e.target.value);
  }
  function handleSetPassword(e: any): void {
    setPassword(e.target.value);
  }
  async function doLogin(event: any): Promise<void> {
    event.preventDefault();
    
    // Prepare the login object
    const obj = { login: loginName, password: loginPassword };
    const js = JSON.stringify(obj);
    
    try {
      // Call the API endpoint
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Debug: log the raw response status
      console.log("Response status:", response.status);
      
      // Parse the JSON response
      const res = await response.json();
      console.log("API response:", res);
      
      // Check if the login is successful
      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      } else {
        // Store user data in localStorage
        const user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        
        // Redirect to the cards page
        window.location.href = '/cards';
      }
    } catch (error: any) {
      alert(error.toString());
      console.error("Error during login:", error);
    }
  }
  

  return (
    <div id="loginDiv">
      <span id="inner-title">PLEASE LOG IN</span><br />
      <input type="text" id="loginName" placeholder="Username" onChange={handleSetLoginName} /><br />
      <input type="password" id="loginPassword" placeholder="Password" onChange={handleSetPassword} /><br />
      <input type="submit" id="loginButton" className="buttons" value="Do It" onClick={doLogin} />
      <span id="loginResult">{message}</span>
    </div>
  );
}
export default Login;
