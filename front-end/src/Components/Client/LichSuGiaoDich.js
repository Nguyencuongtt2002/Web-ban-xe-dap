import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { getDonHangByNguoiDung, getByDonHang } from '../../services/hoadonService';
import { useSelector } from 'react-redux';
const LichSuGiaoDich = () => {

    const user = useSelector((state) => state.user.account);
    const [showModal, setShowModal] = useState(false);
    const [transactions, setTransaction] = useState([]);
    const [data, setData] = useState([])
    const handleClose = () => setShowModal(false);

    const handleShowModal = async (item) => {
        try {
            const res = await getByDonHang(Number(item?.ID));
            const data = res && res.data ? res.data : res
            console.log(data)
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setShowModal(true);

    }
    useEffect(() => {
        GetDHByNguoiDung();
    }, [])
    const GetDHByNguoiDung = async () => {
        try {
            const res = await getDonHangByNguoiDung(Number(user?.account?.ID));
            const data = res && res.data ? res.data : res
            setTransaction(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <br />
            <Container>
                <Row>
                    <Col>
                        <h2>Lịch sử giao dịch</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Ngày Mua</th>
                                    <th>Địa Chỉ</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.map((item, index) => (
                                    <tr key={index + 1}>
                                        <td>{index + 1}</td>
                                        <td>{item.HoTen}</td>
                                        <td>{new Date(item.NgayDat).toLocaleDateString()}</td>
                                        <td>{item.NoiGiao}</td>
                                        <td>{item.SDT}</td>
                                        <td>
                                            <Button variant="primary" onClick={() => handleShowModal(item)}>Xem</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết giao dịch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.TenSanPham}</td>
                                        <td>{item.SoLuong}</td>
                                        <td>{item.Gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default LichSuGiaoDich;
