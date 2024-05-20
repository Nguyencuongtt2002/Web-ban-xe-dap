import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
const MenuTop = () => {
    const dispatch = useDispatch();
    const navige = useNavigate();
    const user = useSelector((state) => state.user.account);
    const onLogout = () => {
        dispatch(logout());
        navige('/login');
    };
    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* Sidebar Toggle (Topbar) */}
                <form className="form-inline">
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>
                </form>

                {/* Topbar Search */}
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                            aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>

                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                    {/* Nav Item - Alerts */}
                    <li className="nav-item dropdown no-arrow mx-1">
                        {/* Your Alerts dropdown */}
                    </li>

                    {/* Nav Item - Messages */}
                    <li className="nav-item dropdown no-arrow mx-1">
                        {/* Your Messages dropdown */}
                    </li>

                    <div className="topbar-divider d-none d-sm-block"></div>

                    {user?.account?.HoTen ? (
                        <>
                            <li className="nav-item dropdown no-arrow">
                                <Link className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                    <img className="img-profile rounded-circle" src="/assets/img/undraw_profile.svg" alt="User" />
                                </Link>
                                {/* Dropdown - User Information */}
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" >
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </Link>
                                    <Link className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </Link>
                                    <Link className="dropdown-item" href="#">
                                        <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" onClick={onLogout} >
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to="/login">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Login</span>
                            </Link>
                        </>
                    )}

                </ul>
            </nav>
        </>
    )
}

export default MenuTop;
