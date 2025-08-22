import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {BaseUrl as ServerBaseUrl} from "../Server";
import {BannerState, Banner} from "../components/Banner";

interface RegisterPageProps {
    setUser: (user: string) => void;
}

function RegisterPage({ setUser }: RegisterPageProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bannerMessage, setBannerMessage] = useState("");
    const [bannerState, setBannerState] = useState(BannerState.Hidden);

    function validateForm() {
        return email.length > 0 && password.length > 0 && firstName.length > 0 && lastName.length > 0;
    }

    let navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch(ServerBaseUrl + "register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, firstName, lastName })
            });
            const body = await response.json();
            if (body && body.account) {
                setUser(body.account.email);
                navigate("/");
            } else {
                setBannerMessage(body.message);
                setBannerState(BannerState.Error);
            }
        } catch (error: any) {
            setBannerMessage(error.message || "An error occurred.");
            setBannerState(BannerState.Error);
        }
    }

    return (
        <div className="RegisterPage">
            <Banner items={[bannerMessage]} state={bannerState} />
            <form className="RegisterForm" onSubmit={handleSubmit}>
                <div className="RegisterFormRow">
                    <label>Email: </label>
                    <input type="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="RegisterFormRow">
                    <label>Password: </label>
                    <input type="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="RegisterFormRow">
                    <label>First Name: </label>
                    <input type="text" value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="RegisterFormRow">
                    <label>Last Name: </label>
                    <input type="text" value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="RegisterFormRow">
                    <button type="submit" disabled={!validateForm()}>Register</button>
                </div>
                <div className="RegisterFormRow">
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;