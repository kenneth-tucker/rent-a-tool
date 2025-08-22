import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {BaseUrl as ServerBaseUrl} from "../Server";
import {BannerState, Banner} from "../components/Banner";

interface LoginPageProps {
    setUser: (user: string) => void;
}

function LoginPage({ setUser }: LoginPageProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bannerMessage, setBannerMessage] = useState("");
    const [bannerState, setBannerState] = useState(BannerState.Hidden);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    let navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch(ServerBaseUrl + "login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
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
        <div className="LoginPage">
            <Banner items={[bannerMessage]} state={bannerState} />
            <form className="LoginForm" onSubmit={handleSubmit}>
                <div className="LoginFormRow">
                    <label>Email: </label>
                    <input type="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="LoginFormRow">
                    <label>Password: </label>
                    <input type="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="LoginFormRow">
                    <button type="submit" disabled={!validateForm()}>Login</button>
                </div>
                <div className="LoginFormRow">
                    <Link to="/login">Forgot Password</Link>
                </div>
                <div className="LoginFormRow">
                    <Link to="/register">New User</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;