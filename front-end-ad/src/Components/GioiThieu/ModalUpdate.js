import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import _ from "lodash";
import { UpdateGioiThieu } from "../../services/gioithieuService";
const ModalUpdate = (props) => {
    const { show, setShow, dataEdit, setDataEdit, getAllGioiThieu } = props;
    const [noiDung, setNoiDung] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataEdit)) {
            setNoiDung(dataEdit.NoiDung)
        }
    }, [dataEdit])
    const handleClose = () => {
        setShow(false);
        setNoiDung("");
        setDataEdit({});
    }

    const hanleUpdate = async () => {
        const obj = {
            ID: dataEdit.ID,
            NoiDung: noiDung
        };
        console.log(obj);
        const res = await UpdateGioiThieu(obj);
        Swal.fire("Thành công!", "Cập nhật thành công!", "success");
        await getAllGioiThieu();
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
                    <Button variant="primary" onClick={hanleUpdate}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate;
