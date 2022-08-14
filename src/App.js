import { useState } from 'react';
import './App.css';

function App() {
  //Set initial values for the inputs and states.
  const initValues = { email: '', password: '', confirmPassword: ''};
  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitCheck, setSubmitCheck] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  

  // adjust values on change in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  }

  //handle submission, check entered values for errors
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmitCheck(true)
  }

  //validate inputs
  const validate = (formValues) => {
    const errors = {};

    //regex string for email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //email validation
    if(!formValues.email) {
      errors.email = "Email is required"
    } else if(!regex.test(formValues.email)){
      errors.email = 'Please use valid email address'
    }
    //password and confirm password validation
    if(!formValues.password){
      errors.password = "Password is required"
    } else if(formValues.password.length < 6){
      errors.password = "Password must be more than 5 characters"
    } else if(formValues.password.length > 5){
      let countLetters = 0;
      let countNumbers = 0;
      for(let i = 0; i < formValues.password.length; i++){
        if(formValues.password[i].match(/[a-z]/i)) countLetters++;
        if(formValues.password[i].match(/[0-9]/)) countNumbers++; 
      
        if(i == formValues.password.length - 1){
          console.log(countLetters)
          console.log(countNumbers)
          if(countLetters == 0 || countNumbers == 0){
            errors.password = "Password must contain at least one number and one letter"
          }
          
        }
      }
    }
    if(!formValues.confirmPassword){
      errors.confirmPassword = "Confirm Password is required"
    } else if(formValues.confirmPassword != formValues.password){
      errors.confirmPassword = "Passwords must match";
    }

    
    return errors;
  }

  //hide or display password when icon clicked
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <div className="container">
      {Object.keys(formErrors).length == 0 && submitCheck ? 
      (<div className="ui message success">Thanks for signing up!</div>):(<div></div>)}
      <form onSubmit={handleSubmit}>
        <div style={{textAlign: 'center'}}>
          <h1>Create Account</h1>
        </div>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input 
              type="text" 
              name="email"
              placeholder="example@email.com" 
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input 
              type={passwordShown ? "text" : "password"}
              name="password" 
              placeholder="Enter password"
              value={formValues.password} 
              onChange={handleChange}
            />
           {passwordShown ?  
                <i 
                  className="far fa-eye-slash"
                  onClick={togglePassword} 
                  style={{marginLeft: '-30px', marginTop: '10px', cursor: 'pointer'}}
                ></i> 
                :
                <i 
                  className="far fa-eye"
                  onClick={togglePassword} 
                  style={{marginLeft: '-30px', marginTop: '10px', cursor: 'pointer'}}
                ></i>
              }
            <details style={{marginLeft: '10px'}}>
              <summary><small>Requirements</small></summary>
              <small>Must be over 5 characters, With at least 1 letter and 1 number</small>
            </details>
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Confirm Password</label>
            <input 
              type={passwordShown ? "text" : "password"}
              name="confirmPassword" 
              placeholder="Must Match Above"
              value={formValues.confirmPassword}
              onChange={handleChange} 
            />
              {passwordShown ?  
                <i 
                  className="far fa-eye-slash"
                  onClick={togglePassword} 
                  style={{marginLeft: '-30px', marginTop: '10px', cursor: 'pointer'}}
                ></i> 
                :
                <i 
                  className="far fa-eye"
                  onClick={togglePassword} 
                  style={{marginLeft: '-30px', marginTop: '10px', cursor: 'pointer'}}
                ></i>
              }
          <p>{formErrors.confirmPassword}</p>
          <button className="fluid ui button green">Submit</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default App;
