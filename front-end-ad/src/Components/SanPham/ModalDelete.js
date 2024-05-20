import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { DeleteSanPham } from '../../services/sanphamService';
const ModalDelete = (props) => {
    const { show, setShow, dataDelete, getAllSanPham } = props;
    const handleClose = () => {
        setShow(false);
    }
    const hanleSubmitDelete = async () => {
        // Hiển thị một cửa sổ xác nhận với SweetAlert
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa?",
            text: "Hành động này sẽ xóa !",
            icon: "warning",
            buttons: ["Hủy", "Xóa"],
            dangerMode: true,
        }).then(async (willDelete) => {
            // Nếu người dùng chọn "Xóa"
            if (willDelete) {
                // Gọi action deleteLoaisp từ Redux dispatch
                const res = await DeleteSanPham(dataDelete.ID)
                if (res) {
                    // Hiển thị thông báo xóa thành công
                    Swal.fire("Thành công!", "Xóa thành công!", "success");
                    // Cập nhật danh sách loại sản phẩm
                    await getAllSanPham();
                    // Đóng modal
                    handleClose();
                }

            } else {
                // Nếu người dùng chọn "Hủy", không làm gì cả
                Swal.fire("Hủy", "Dữ liệu không bị xóa :)", "info");
            }
        });
    }
    return (
        <>

            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa  </Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa :
                    {dataDelete && dataDelete.Ten ? dataDelete.Ten : ""} không ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanleSubmitDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;