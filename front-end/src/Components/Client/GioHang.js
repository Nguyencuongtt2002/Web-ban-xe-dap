import React from 'react';
import { Button, Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { xoa1sp, tangSoLuong, giamSoLuong } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
const GioHang = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.account);
    const handleThanhToan = () => {
        if (!user?.account?.HoTen) {
            alert("Vui lòng đăng nhập trước khi thanh toán !")
            navigate("/login")
        } else {
            navigate("/thanhtoan")
        }
    }
    const deleteGioHang = (MaSanPham) => {
        dispatch(xoa1sp(MaSanPham))
    }
    const TangGioHang = (id) => {
        //console.log(id)
        dispatch(tangSoLuong(id))
    }
    const giamGioHang = (id) => {
        dispatch(giamSoLuong(id))
    }
    const items = useSelector((state) => state.cart.items);
    let totalQuantity = useSelector((state) => state.cart.totalQuantity);
    let totalPrice = useSelector((state) => state.cart.totalPrice);
    return (
        <div>
            <div className="cart block">
                <Container>
                    <table className="cart__table cart-table">
                        <thead className="cart-table__head">
                            <tr className="cart-table__row">
                                <th className="cart-table__column cart-table__column--image">Image</th>
                                <th className="cart-table__column cart-table__column--product">Product</th>
                                <th className="cart-table__column cart-table__column--price">Price</th>
                                <th className="cart-table__column cart-table__column--quantity">Quantity</th>
                                <th className="cart-table__column cart-table__column--total">Total</th>
                                <th className="cart-table__column cart-table__column--remove"></th>
                            </tr>
                        </thead>
                        <tbody className="cart-table__body">
                            {items.map(gh => (
                                <tr className="cart-table__row">
                                    <td className="cart-table__column cart-table__column--image"><a href="#"><img
                                        src={`data:image/jpg;base64,${gh.AnhDaiDien}`} alt="" /></a></td>
                                    <td className="cart-table__column cart-table__column--product"><Nav.Link
                                        className="cart-table__product-name">{gh.TenSP}</Nav.Link>
                                    </td>
                                    <td className="cart-table__column cart-table__column--price" data-title="Price">{gh.DonGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                                        <div className="input-number">
                                            <input className="form-control input-number__input"
                                                type="text" value={gh.SoLuong} />
                                            <div className="input-number__add" onClick={() => TangGioHang(gh.MaSanPham)}></div>
                                            <div className="input-number__sub" onClick={() => giamGioHang(gh.MaSanPham)}></div>
                                        </div>
                                    </td>
                                    <td className="cart-table__column cart-table__column--total" data-title="Total">
                                        {(gh.DonGia * gh.SoLuong).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </td>
                                    <td className="cart-table__column cart-table__column--remove">

                                        <button type="button" onClick={() => deleteGioHang(gh.MaSanPham)}
                                            className="btn btn-light btn-sm btn-svg-icon"><svg width="12px" height="12px">
                                                <use xlinkHref="/assets/images/sprite.svg#cross-12"></use>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Row className="justify-content-end pt-5">
                        <Col xs={12} md={7} lg={6} xl={5}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Tổng tiền : {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Card.Title>
                                    <Card.Title>Tổng số lượng : {totalQuantity}</Card.Title>
                                    <Button variant="primary" onClick={handleThanhToan} className="btn-xl btn-block cart__checkout-button">Tiến hành đặt hàng </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default GioHang;
