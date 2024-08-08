import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ search, setSearch, fetchAnimes }) {
    const nav = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        nav('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    IP-FEBRI
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recommend">
                                Recommendation
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex me-5" role="search" type="submit" onSubmit={(e) => {
                        e.preventDefault()
                        fetchAnimes()
                    }}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search by title"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                    {!localStorage.access_token &&
                        <Link to="/login">
                            <button className="btn" >
                                Login
                            </button>
                        </Link>
                    }
                    {localStorage.access_token &&
                        <button className="btn" onClick={handleLogout}>
                            Logout
                        </button>
                    }
                </div>
            </div>
        </nav>

    )
}