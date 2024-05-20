import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { DeleteSlide } from '../../services/slideService';
const ModalDelete = (props) => {
    const { show, setShow, dataDelete, getAllSlide } = props;
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
                const res = await DeleteSlide(dataDelete.ID)
                if (res) {
                    // Hiển thị thông báo xóa thành công
                    Swal.fire("Thành công!", "Xóa thành công!", "success");
                    // Cập nhật danh sách loại sản phẩm
                    await getAllSlide();
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
                    <Modal.Title>Xác nhận xóa loại sản phẩm </Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa ảnh ó ID:
                    {dataDelete && dataDelete.ID ? dataDelete.ID : ""} không ?</Modal.Body>
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