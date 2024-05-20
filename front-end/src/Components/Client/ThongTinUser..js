import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
const ThongTinUser = () => {
    const user = useSelector((state) => state.user.account);
    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={12} lg={6} xl={7}>
                        <Card>
                            <Card.Body>
                                <h3 className="card-title">Thông tin tài khoản</h3>
                                <Row>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="checkout-first-name">Họ Tên</label>
                                            <input type="text" value={user?.account?.HoTen || ''} disabled className="form-control" id="TenKhachHang" placeholder="First Name" />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="checkout-first-name">Tài khoản</label>
                                            <input type="text" value={user?.account?.TaiKhoan || ''} disabled className="form-control" id="TenKhachHang" placeholder="First Name" />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="checkout-last-name">Gmail</label>
                                            <input type="text" className="form-control" value={user?.account?.Gmail || ''} disabled id="DiaChi" placeholder="Gmail" />
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="form-group">
                                            <label htmlFor="checkout-last-name">Địa Chỉ</label>
                                            <input type="text" className="form-control" disabled value={user?.account?.DiaChi || ''} id="DiaChi" placeholder="Địa Chỉ" />
                                        </div>
                                    </Col>
                                </Row>
                                <div className="form-group">
                                    <label htmlFor="checkout-company-name">Số điện thoại <span className="text-muted">(Optional)</span></label>
                                    <input type="text" className="form-control" disabled value={user?.account?.SoDienThoai || ''} id="SoDienThoai" placeholder="Company SĐT" />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default ThongTinUser;
