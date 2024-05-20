import React, { useState } from "react";
import { CreateSlide } from "../../services/slideService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalAddNew = (props) => {
    const { show, setShow, getAllSlide } = props;
    const [anh, setAnh] = useState("");
    const handleClose = () => {
        setShow(false);
        setAnh("");
    }

    const hanleCreate = async () => {
        const data = new FormData();
        data.append("fileanh", anh);
        await CreateSlide(data);
        alert("Tạo mới thành công !")
        handleClose();
        await getAllSlide();
    }
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setAnh(event.target.files[0])
        }
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
                        <label className="col-md-12 control-label">Ảnh :</label>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <input type="file" onChange={(event) => handleUploadImage(event)} class="form-control" id="inputPassword4" />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanleCreate}>
                        Thêm mới
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;
