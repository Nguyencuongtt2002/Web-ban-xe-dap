import React, { useEffect, useState } from 'react';
import { GetSanPham_asc, GetSanPhamNgauNhien, GetByID } from '../../services/sanphamService';
import { GetSlide_Asc } from '../../services/slideService';
import { Container, Row, Col, Card, Button, Carousel, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
const Home = () => {
    const [data, setData] = useState([]);
    const [listSlide, setListSlide] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [data1, setData1] = useState([]);
    useEffect(() => {
        getSlide();
        getSanPham_asc();
        getNgauNhien();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide === listSlide.length - 1 ? 0 : prevSlide + 1));
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [listSlide]);

    const dispatch = useDispatch();
    const Themvaogio = (MaSanPham, soluong) => {
        GetByID(MaSanPham).then(res => {
            console.log(res)
            const sanpham = {
                MaSanPham: res.data[0]?.ID,
                TenSP: res.data[0]?.Ten,
                AnhDaiDien: res.data[0]?.Anh,
                SoLuong: soluong,
                DonGia: res.data[0]?.Gia,
            };
            dispatch(addToCart(sanpham));
            alert("Sản phẩm đã được thêm vào giỏ hàng");
        });
    };
    const getSanPham_asc = async () => {
        try {
            const res = await GetSanPham_asc();
            const data = res && res.data ? res.data : res
            console.log(data)
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const getNgauNhien = async () => {
        try {
            const res = await GetSanPhamNgauNhien();
            const data = res && res.data ? res.data : res
            setData1(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const getSlide = async () => {
        try {
            const res = await GetSlide_Asc();
            const data = res && res.data ? res.data : res
            setListSlide(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <>
            <br />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-12 col-md-9">
                        <div className="block-slideshow block-slideshow--layout--with-departments block" style={{ width: '1500px' }}>
                            <Container>
                                <Row>
                                    <Col xs={12} sm={12} md={9} className="homebanner-holder">
                                        <Carousel activeIndex={currentSlide} onSelect={setCurrentSlide}>
                                            {listSlide.map((item, index) => (
                                                <Carousel.Item key={index}>
                                                    <img
                                                        className="d-block w-100"
                                                        src={`data:image/jpg;base64,${item.Anh}`}
                                                        style={{ height: '500px', objectFit: 'cover' }}
                                                    />
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block block-features block-features--layout--classic">
                <div className="container">
                    <div className="block-features__list">
                        <div className="block-features__item">
                            <div className="block-features__icon">
                                <svg width="48px" height="48px">
                                    <use xlinkHref="images/sprite.svg#fi-free-delivery-48"></use>
                                </svg>
                            </div>
                            <div className="block-features__content">
                                <div className="block-features__title">Free Shipping</div>
                                <div className="block-features__subtitle">For orders from $50</div>
                            </div>
                        </div>
                        <div className="block-features__divider"></div>
                        <div className="block-features__item">
                            <div className="block-features__icon">
                                <svg width="48px" height="48px">
                                    <use xlinkHref="images/sprite.svg#fi-24-hours-48"></use>
                                </svg>
                            </div>
                            <div className="block-features__content">
                                <div className="block-features__title">Support 24/7</div>
                                <div className="block-features__subtitle">Call us anytime</div>
                            </div>
                        </div>
                        <div className="block-features__divider"></div>
                        <div className="block-features__item">
                            <div className="block-features__icon">
                                <svg width="48px" height="48px">
                                    <use xlinkHref="images/sprite.svg#fi-payment-security-48"></use>
                                </svg>
                            </div>
                            <div className="block-features__content">
                                <div className="block-features__title">100% Safety</div>
                                <div className="block-features__subtitle">Only secure payments</div>
                            </div>
                        </div>
                        <div className="block-features__divider"></div>
                        <div className="block-features__item">
                            <div className="block-features__icon">
                                <svg width="48px" height="48px">
                                    <use xlinkHref="images/sprite.svg#fi-tag-48"></use>
                                </svg>
                            </div>
                            <div className="block-features__content">
                                <div className="block-features__title">Hot Offers</div>
                                <div className="block-features__subtitle">Discounts up to 90%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block block-products-carousel" data-layout="grid-4">
                <Container>
                    <div className="block-header">
                        <h3 className="block-header__title">Sản phẩm</h3>
                        <div className="block-header__divider"></div>
                    </div>
                    <Row className="block-products-carousel__slider">
                        {data.map((item, index) => (
                            <Col key={index} xs={12} sm={6} md={3}>
                                <Card className="product-card">
                                    <Card.Body>
                                        <div className="product-card__badges-list">
                                            <div className="product-card__badge product-card__badge--hot">Hot</div>
                                        </div>
                                        <div className="product-card__image">
                                            <a >
                                                <Card.Img variant="top" src={`data:image/jpg;base64,${item.Anh}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="product-card__info">
                                            <div className="product-card__name">
                                                <Nav.Link as={Link} to={`/XemChiTiet/${item.ID}`}>
                                                    {item.Ten.length > 25 ? `${item.Ten.substring(0, 25)}...` : item.Ten}
                                                </Nav.Link>
                                            </div>
                                        </div>
                                        <div className="product-card__actions">
                                            <div className="product-card__prices">{item.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                            <div className="product-card__buttons">
                                                <Button variant="primary" onClick={() => { Themvaogio(item.ID, 1) }} className="product-card__addtocart" type="button">
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            <div className="block block-products-carousel" data-layout="grid-4">
                <Container>
                    <div className="block-header">
                        <h3 className="block-header__title">Sản phẩm ngẫu nhiên</h3>
                        <div className="block-header__divider"></div>
                    </div>
                    <Row className="block-products-carousel__slider">
                        {data1.map((item, index) => (
                            <Col key={index} xs={12} sm={6} md={3}>
                                <Card className="product-card">
                                    <Card.Body>
                                        <div className="product-card__badges-list">
                                            <div className="product-card__badge product-card__badge--hot">Hot</div>
                                        </div>
                                        <div className="product-card__image">
                                            <a href="product.html">
                                                <Card.Img variant="top" src={`data:image/jpg;base64,${item.Anh}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="product-card__info">
                                            <div className="product-card__name">
                                                <Nav.Link as={Link} to={`/XemChiTiet/${item.ID}`}>
                                                    {item.Ten.length > 25 ? `${item.Ten.substring(0, 25)}...` : item.Ten}
                                                </Nav.Link>
                                            </div>
                                        </div>
                                        <div className="product-card__actions">
                                            <div className="product-card__prices">{item.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                            <div className="product-card__buttons">
                                                <Button variant="primary" onClick={() => { Themvaogio(item.ID, 1) }} className="product-card__addtocart" type="button">
                                                    Add To Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>

    );
}

export default Home;
