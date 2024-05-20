import React, { useState } from "react";
import { CreateSanPham } from "../../services/sanphamService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalAddNew = (props) => {
    const { show, setShow, getAllSanPham } = props;
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
    }
    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setAnh(event.target.files[0])
        }
    }
    const hanleCreate = async () => {
        const data = new FormData();
        data.append("Ten", ten);
        data.append("fileanh", anh);
        data.append("Gia", gia)
        data.append("SoLuong", soLuong)
        data.append("DuongKinh", duongKinh);
        data.append("Mau", mau);
        data.append("ChucNang", chucNang)
        data.append("NoiSanXuat", noiSanXuat)
        data.append("MoTa", moTa)
        data.append("DanhMuc_ID", danhMuc_ID);
        let res = await CreateSanPham(data);
        console.log(res);
        alert("Tạo mới thành công !")
        handleClose();
        await getAllSanPham();
    }

    return (
        <>

            <Modal show={show}
                size="xl"
                onHide={handleClose}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới</Modal.Title>
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
                    <Button variant="primary" onClick={hanleCreate}>
                        Thêm mới
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNew;
