import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import _ from "lodash";
import { UpdateSanPham } from "../../services/sanphamService";
const ModalUpdate = (props) => {
    const { show, setShow, dataEdit, setDataEdit, getAllSanPham } = props;
    const [ten, setTen] = useState("");
    const [anh, setAnh] = useState("");
    const [gia, setGia] = useState("");
    const [soLuong, setSoLuong] = useState("");
    const [duongKinh, setDuongKinh] = useState("");
    const [mau, setMau] = useState("");
    const [chucNang, setChucNang] = useState("");
    const [noiSanXuat, setNoiSanXuat] = useState("");
    const [moTa, setMoTa] = useState("");
    const [danhMuc_ID, setDanhMuc_ID] = useState("");
    useEffect(() => {
        if (!_.isEmpty(dataEdit)) {
            setTen(dataEdit.Ten)
            setAnh(dataEdit.Anh)
            setGia(dataEdit.Gia)
            setSoLuong(dataEdit.SoLuong)
            setDuongKinh(dataEdit.DuongKinh);
            setMau(dataEdit.Mau);
            setChucNang(dataEdit.ChucNang);
            setNoiSanXuat(dataEdit.NoiSanXuat)
            setMoTa(dataEdit.MoTa)
            setDanhMuc_ID(dataEdit.DanhMuc_ID)
        }
    }, [dataEdit])
    const handleClose = () => {
        setShow(false);
        setTen("");
        setAnh("");
        setGia("");
        setSoLuong("");
        setDuongKinh("");
        setMau("");
        setChucNang("");
        setNoiSanXuat("");
        setMoTa("");
        setDanhMuc_ID("");
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
        data.append("Ten", ten)
        data.append("fileanh", anh);
        data.append("Gia", gia)
        data.append("SoLuong", soLuong)
        data.append("DuongKinh", duongKinh);
        data.append("Mau", mau);
        data.append("ChucNang", chucNang)
        data.append("NoiSanXuat", noiSanXuat)
        data.append("MoTa", moTa)
        data.append("DanhMuc_ID", danhMuc_ID);
        const res = await UpdateSanPham(data);
        console.log(res)
        Swal.fire("Thành công!", "Cập nhật thành công!", "success");
        await getAllSanPham();
        handleClose();
    }
    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Tên</label>
                            <input type="text" value={ten} onChange={(event) => setTen(event.target.value)} class="form-control" id="inputEmail4" />
                        </div>

                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Ảnh</label>
                            <input type="file" onChange={(event) => handleUploadImage(event)} class="form-control" id="inputPassword4" />
                        </div>

                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Giá</label>
                            <input type="text" value={gia} onChange={(event) => setGia(event.target.value)} class="form-control" id="inputPassword4" />
                        </div>

                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Số lượng</label>
                            <input type="text" value={soLuong} onChange={(event) => setSoLuong(event.target.value)} class="form-control" id="inputPassword4" />
                        </div>
                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Đường kính</label>
                            <input type="text" value={duongKinh} onChange={(event) => setDuongKinh(event.target.value)} class="form-control" id="inputPassword4" />
                        </div>

                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Màu</label>
                            <input type="text" value={mau} onChange={(event) => setMau(event.target.value)} class="form-control" id="inputPassword4" />
                        </div>
                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Chức năng</label>
                            <input type="text" value={chucNang} onChange={(event) => setChucNang(event.target.value)} class="form-control" id="inputPassword4" />
                        </div>

                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Nơi sản xuất</label>
                            <input type="text" value={noiSanXuat} onChange={(event) => setNoiSanXuat(event.target.value)} class="form-control" id="inputPassword4" />
                        </div>

                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Mô tả</label>
                            <textarea
                                value={moTa}
                                onChange={(event) => setMoTa(event.target.value)}
                                className="form-control"
                                id="inputPassword4"
                            />
                        </div>

                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Mã loại</label>
                            <input type="text" value={danhMuc_ID} onChange={(event) => setDanhMuc_ID(event.target.value)} class="form-control" id="inputPassword4" />
                        </div>
                    </form>
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
