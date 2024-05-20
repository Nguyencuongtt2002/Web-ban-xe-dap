import React, { useState } from "react";
import { CreateLoaiSP } from "../../services/loaisanphamService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalAddNew = (props) => {
    const { show, setShow, getAllLoaisp } = props;
    const [ten, setTen] = useState("");
    const [moTa, setMoTa] = useState("");
    const handleClose = () => {
        setShow(false);
        setTen("");
        setMoTa("");
    }

    const hanleCreateLoaisp = async () => {
        const obj = {
            Ten: ten,
            MoTa: moTa
        };
        console.log(obj)
        await CreateLoaiSP(obj);
        alert("Tạo mới thành công !")
        handleClose();
        await getAllLoaisp();
    }

    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-md-12 control-label">Tên Loại Sản Phẩm :</label>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <input type="text" id="idTenLoaiSanPham"
                                className="form-control" name="ten"
                                value={ten}
                                onChange={(event) => setTen(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-12 control-label">Mô tả :</label>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <textarea
                                value={moTa}
                                onChange={(event) => setMoTa(event.target.value)}
                                className="form-control"
                                id="inputPassword4"
                            />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanleCreateLoaisp}>
                        Thêm mới
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;
