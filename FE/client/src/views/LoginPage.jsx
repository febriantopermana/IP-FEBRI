import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import instance from "../utils/axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await instance.post('/login', {
                email,
                password
            })
            localStorage.setItem("access_token", data.access_token)

            nav('/')
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCredentialResponse({ credential }) {
        try {
            console.log("Encoded JWT ID token: " + credential);

            const { data } = await instance.post('/g-login', {
                googleToken: credential
            })
            localStorage.setItem("access_token", data.access_token)

            nav('/')
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "548353521029-3gmpm1sguec3bmpt9orufi2401gq91lp.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
    }, [])

    return (
        <>
            <div className="d-flex justify-content-center my-4">
                <form className="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/">
                        <button className="btn btn-primary me-3">
                            Back
                        </button>
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
            <div id="buttonDiv" className="d-flex justify-content-center"></div>
        </>
    )
}