import React, { useEffect, useState } from 'react';
import { timKiem, GetByID } from '../../services/sanphamService';
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
const TimKiem = () => {
    const [data, setData] = useState([]);
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('query');
    useEffect(() => {
        if (search) {
            handleSearch();
        }
    }, [search]);
    const handleSearch = async () => {
        const obj = {
            Ten: search,
        };
        console.log(obj)
        const res = await timKiem(obj);
        setData(res.data)

    }
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
    console.log(data.length)
    return (
        <>
            <br />
            <div className="block block-products-carousel" data-layout="grid-4">
                <Container>
                    {data.length === 0 ? (
                        <Container className="not-found-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <h1>Không tìm thấy sản phẩm</h1>
                        </Container>
                    ) : (
                        <>
                            <div className="block-header">
                                <h3 className="block-header__title">Sản phẩm tìm thấy</h3>
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
                                                    <a href={`/XemChiTiet/${item.ID}`}>
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
                                                        <Button onClick={() => { Themvaogio(item.ID, 1) }} variant="primary" className="product-card__addtocart" type="button">
                                                            Add To Cart
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    )}
                </Container>
            </div>
        </>
    )
}

export default TimKiem;