import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

function Form() {
    console.log("Mounted")
    const storageAccounts = JSON.parse(localStorage.getItem('allAccounts'));

    const [newAccount, setNewAccount] = useState({name: "", email: "", phoneNumber: ""});
    const [allAccounts, setAllAccounts] = useState(storageAccounts ?? []);
    // const [count, setCount] = useState(0);

    const validateName = (name) => {
        if (name.length >= 3) {
            return true;
        } else {
            return false;
        }
    }

    const validateAge = (age) => {
        let y = parseInt(age)
        if (Number.isInteger(y)) {
            return true;
        } else {
            return false;
        }
    }

    const validateEmail = (email) => {
        const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(emailFormat)) {
            return true
        } else {
            return false
        }
    }

    const validatePhoneNumber = (phoneNumber) => {
        //const phoneFormat = ;
        const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phoneNumber.match(regEx))
        {
            return true;
        } else {
            return false;
        }
    }

    // console.log(validateEmail("baotranongtran@gmail.com"));
    // console.log(validatePhoneNumber("740-405-9687"));

    const handleChange = ({target}) => {
        const {name, value} = target;
        setNewAccount((prev) => ({...prev, [name]: value }));
    }

    const handleSubmit = () => {
        if (newAccount.name !== "" && newAccount.email !== "" && newAccount.phoneNumber !== "") {
            if (validateEmail(newAccount.email) && validatePhoneNumber(newAccount.phoneNumber) && validateName(newAccount.name)) {
                setAllAccounts(prev => {
                    const updatedAccs = [...prev, newAccount];
                    
                    return updatedAccs;
                });
                setNewAccount({name: "", email: "", phoneNumber: ""});
            } else {
                alert("Cannot verify your account. Please check your email and phone number!")
            }
        }
        else {
            alert("Please fulfill your form to sign up!")
        }
        
    }

    console.log(allAccounts);

    useEffect(() => {
        const jsonAccs = JSON.stringify(allAccounts);
        localStorage.setItem('allAccounts', jsonAccs);
        console.log("Updated Component!");
    }, [allAccounts])

    
    return (
        <div>
            {console.log("Render")}
            Name:  <input name = "name" value = {newAccount.name} onChange = {handleChange}/><br />
            Email:  <input name = "email" value = {newAccount.email} onChange = {handleChange}/><br />
            Phone Number:  <input name = "phoneNumber" value = {newAccount.phoneNumber} onChange = {handleChange}/>
            
            <p> My name is {newAccount.name}</p>
            <p> My email is {newAccount.email}</p>
            <p> My phone is {newAccount.phoneNumber}</p>
            <button onClick = {handleSubmit}> Click me </button>
            
        </div>
    )
}

export default Form