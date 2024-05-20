import React, { useEffect, useState } from 'react';
import { Col, Card, Button, Nav, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { GetLoaiSanPhamALL } from '../../services/loaisanphamService';
import { getDanhMuc, GetByID } from '../../services/sanphamService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
const DanhMuc = () => {
    const { id } = useParams();
    const [loaisp, setLoaisp] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getLoaiSP();
        GetTheoDanhMuc();
    }, [id])
    const getLoaiSP = async () => {
        try {
            const res = await GetLoaiSanPhamALL();
            const data = res && res.data ? res.data : res
            console.log(data)
            setLoaisp(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const GetTheoDanhMuc = async () => {
        if (id) {
            let res = await getDanhMuc(Number(id)); // Convert id to number
            console.log(res)
            setProduct(res && res.data ? res.data : res);
        } else {
            console.error('ID is undefined');
        }
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
    return (
        <>
            <br />
            <div className="container">
                <div className="shop-layout shop-layout--sidebar--start">
                    <div className="shop-layout__sidebar">
                        <div className="block block-sidebar">
                            <div className="block-sidebar__item">
                                <Card>
                                    <Card.Header>
                                        <h4 className="widget__title">Danh Mục sản phẩm</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="filter-categories">
                                            <Nav className="filter-categories__list">
                                                {loaisp.map((item, index) => (
                                                    <Nav.Item key={index} className="filter-categories__item filter-categories__item--child">
                                                        <Nav.Link as={Link} to={`/danhmuc/${item.ID}`} className="text-black font-size-20 d-block">
                                                            {index + 1}: {item.Ten}
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                ))}
                                            </Nav>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </div>
                        </div>
                    </div>
                    <div className="shop-layout__content">
                        <div className="block">
                            <div className="products-view">
                                <div className="products-view__list products-list" data-layout="grid-3-sidebar" data-with-features="false">
                                    <div className="products-list__body">
                                        {product.length > 0 ? (
                                            product.map((item, index) => (
                                                <Col xs={12} sm={6} md={3} key={index}>
                                                    <Card className="product-card">
                                                        <Card.Body>
                                                            <div className="product-card__badges-list">
                                                                <div className="product-card__badge product-card__badge--hot">Hot</div>
                                                            </div>
                                                            <div className="product-card__image">
                                                                <a href="#">
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
                                            ))
                                        ) : (
                                            <Container>
                                                <Row className="justify-content-center align-items-center" style={{ height: '50vh' }}>
                                                    <Col xs={12} className="text-center">
                                                        <h1>Không có sản phẩm để hiển thị</h1>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DanhMuc;
