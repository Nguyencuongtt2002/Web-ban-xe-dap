import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import _ from "lodash";

const ModalChiTiet = (props) => {
    const { show, setShow, data1 } = props;

    const handleClose = () => {
        setShow(false);
    }

    return (
        <Modal show={show} size="lg" onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Thông Tin Chi Tiết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tên Sản Phẩm</th>
                            <th>Số Lượng</th>
                            <th>Giá Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data1.map((item, index) => (
                            <tr key={index}>
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
    )
}

export default ModalChiTiet;
