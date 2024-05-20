import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import _ from "lodash";
import { UpdateSlide } from "../../services/slideService";
const ModalUpdate = (props) => {
    const { show, setShow, dataEdit, setDataEdit, getAllSlide } = props;
    const [anh, setAnh] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataEdit)) {
            setAnh(dataEdit.Anh)
        }
    }, [dataEdit])
    const handleClose = () => {
        setShow(false);
        setAnh("");
        setDataEdit({});
    }
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setAnh(event.target.files[0])
        }
    }
    const hanleUpdate = async () => {
        const data = new FormData();
        data.append("ID", dataEdit.ID)
        data.append("fileanh", anh);
        const res = await UpdateSlide(data);
        Swal.fire("Thành công!", "Cập nhật thành công!", "success");
        await getAllSlide();
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
                    <Button variant="primary" onClick={hanleUpdate}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate;
