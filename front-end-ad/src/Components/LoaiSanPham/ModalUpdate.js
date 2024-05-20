import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import _ from "lodash";
import { UpdateLoaiSanPham } from "../../services/loaisanphamService";
const ModalUpdate = (props) => {
    const { show, setShow, dataEdit, setDataEdit, getAllLoaisp } = props;
    const [ten, setTen] = useState("");
    const [moTa, setMoTa] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataEdit)) {
            setTen(dataEdit.Ten);
            setMoTa(dataEdit.MoTa)
        }
    }, [dataEdit])
    const handleClose = () => {
        setShow(false);
        setTen("");
        setMoTa("");
        setDataEdit({});
    }

    const hanleUpdateLoaisp = async () => {
        const obj = {
            ID: dataEdit.ID,
            Ten: ten,
            MoTa: moTa
        };
        console.log(obj);
        const res = await UpdateLoaiSanPham(obj);
        Swal.fire("Thành công!", "Cập nhật thành công!", "success");
        await getAllLoaisp();
        handleClose();
    }
    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-md-12 control-label">Tên Loại Sản Phẩm :</label>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <input type="text" id="idTenLoaiSanPham"
                                className="form-control" name="TenLoaiSanPham"
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
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanleUpdateLoaisp}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate;
