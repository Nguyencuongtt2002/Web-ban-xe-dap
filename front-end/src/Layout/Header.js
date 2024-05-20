import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { GetLoaiSanPhamALL } from '../services/loaisanphamService';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
const Header = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const navige = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [loaisp, setLoaisp] = useState([]);
    useEffect(() => {
        getLoaiSP();
    }, [])
    let totalQuantity = useSelector((state) => state.cart.totalQuantity);
    //let totalPrice = useSelector((state) => state.cart.totalPrice);
    const user = useSelector((state) => state.user.account);

    const onLogout = () => {
        dispatch(logout());
        navige('/');
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const onSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            // Push to the search results page with the search term as a query parameter
            history(`/timkiem?query=${encodeURIComponent(searchTerm)}`);
        } else {
            console.error("Search term is undefined or empty.");
            // You may handle this case based on your requirements, such as showing an error message to the user.
        }
    };
    const getLoaiSP = async () => {
        try {
            const res = await GetLoaiSanPhamALL();
            const data = res && res.data ? res.data : res
            setLoaisp(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <>
            <header className="site__header d-lg-block d-none">
                <div className="site-header">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="about-us.html">About Us</Nav.Link>
                                <Nav.Link href="contact-us.html">Contacts</Nav.Link>
                                <Nav.Link href="#">Store Location</Nav.Link>
                                <Nav.Link href="track-order.html">Track Order</Nav.Link>
                                <Nav.Link href="blog-classic.html">Blog</Nav.Link>
                            </Nav>
                            <Nav style={{ marginRight: '120px' }}>
                                {user?.account?.HoTen ? (
                                    <NavDropdown title={user.account.HoTen} id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/taikhoan">Thông tin tài khoản</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/lichsu">Thông tin đơn hàng</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/dangky">Register</NavDropdown.Item>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="site-header__middle container">
                        <Container className="d-flex justify-content-center">
                            <Form className="search__form" onSubmit={onSearch}>
                                <FormControl
                                    style={{ width: '700px' }} // Đặt chiều rộng là 700px
                                    className="search__input"
                                    name="search"
                                    placeholder="Search over 10,000 products"
                                    aria-label="Site search"
                                    type="text"
                                    autoComplete="off"
                                    size="15"
                                    value={searchTerm}
                                    onChange={handleChange}
                                />
                                <Button className="search__button" type="submit">
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                    </svg>
                                </Button>
                                <div className="search__border"></div>
                            </Form>
                            <div className="site-header__phone">
                                <div className="site-header__phone-title">Customer Service</div>
                                <div className="site-header__phone-number">(800) 060-0730</div>
                            </div>
                        </Container>
                    </div>
                    <div className="site-header__nav-panel">
                        <div className="nav-panel">
                            <div className="nav-panel__container container">
                                <div className="nav-panel__row">
                                    <div className="nav-panel__departments">
                                        <div className="departments" data-departments-fixed-by="">
                                            <div className="departments__body">
                                                <div className="departments__links-wrapper">
                                                    <Nav className="departments__links">
                                                        <Nav.Item className="departments__item">
                                                            {loaisp.map((item, index) => (
                                                                <Nav.Link as={Link} to={`/danhmuc/${item.ID}`} className="text-white font-size-20">{item.Ten}</Nav.Link>
                                                            ))}
                                                        </Nav.Item>
                                                    </Nav>
                                                </div>
                                            </div>
                                            <Button variant="dark" className="departments__button">
                                                <svg className="departments__button-icon" width="18px" height="14px">
                                                    <use xlinkHref="/assets/images/sprite.svg#menu-18x14"></use>
                                                </svg>
                                                Danh Mục Sản Phẩm
                                                <svg className="departments__button-arrow" width="9px" height="6px">
                                                    <use xlinkHref="/assets/images/sprite.svg#arrow-rounded-down-9x6"></use>
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="nav-panel__nav-links nav-links">
                                        <ul className="nav-links__list">
                                            <Nav.Item className="nav-links__item">
                                                <Nav.Link as={Link} to="/"><span>Trang Chủ</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="nav-links__item">
                                                <Nav.Link as={Link} to="/sanpham" ><span>Sản Phẩm </span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="nav-links__item">
                                                <Nav.Link as={Link} to="/gioithieu" ><span>Giới Thiệu</span></Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item className="nav-links__item">
                                                <Nav.Link as={Link} to="/lienhe"  ><span>Liên Hệ</span></Nav.Link>
                                            </Nav.Item>
                                        </ul>
                                    </div>
                                    <div className="nav-panel__indicators">
                                        <div className="indicator">
                                            <Nav.Link className="indicator__button">
                                                <span className="indicator__area">
                                                    <svg width="20px" height="20px">
                                                        <use xlinkHref="/assets/images/sprite.svg#heart-20"></use>
                                                    </svg>
                                                    <span className="indicator__value">0</span>
                                                </span>
                                            </Nav.Link>
                                        </div>
                                        <Nav.Item className="indicator indicator--trigger--click">
                                            <Nav.Link className="indicator__button">
                                                <span className="indicator__area" onClick={() => navige(`giohang`)}>
                                                    <i className="fas fa-shopping-cart"></i>
                                                    <span className="indicator__value">{totalQuantity}</span>
                                                </span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
