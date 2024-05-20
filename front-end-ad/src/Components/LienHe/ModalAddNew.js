import React, { useState } from "react";
import { CreateLienHe } from "../../services/lienheService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalAddNew = (props) => {
    const { show, setShow, getAllLienHe } = props;
    const [noiDung, setNoiDung] = useState("");

    const handleClose = () => {
        setShow(false);
        setNoiDung("");
    }

    const hanleCreate = async () => {
        const obj = {
            NoiDung: noiDung,
        };
        console.log(obj)
        await CreateLienHe(obj);
        alert("Tạo mới thành công !")
        handleClose();
        await getAllLienHe();
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
                        <label className="col-md-12 control-label">Nội dung :</label>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12">
                            <textarea
                                value={noiDung}
                                onChange={(event) => setNoiDung(event.target.value)}
                                className="form-control"
                            />
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
