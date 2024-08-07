import { Link } from "react-router-dom";

export default function NavBar({ search, setSearch, fetchAnimes }) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    Navbar
                </a>
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
                            <Link className="nav-link active" aria-current="page" href="#">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Profile
                            </a>
                        </li>
                    </ul>
                    <form className="d-flex me-5" role="search" type="submit" onSubmit={() => fetchAnimes()}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
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
                            <button className="btn" type="submit" >
                                Login
                            </button>
                        </Link>
                    }
                    {localStorage.access_token &&
                        <button className="btn" type="submit" onClick={() => localStorage.clear()}>
                            Logout
                        </button>
                    }
                </div>
            </div>
        </nav>

    )
}