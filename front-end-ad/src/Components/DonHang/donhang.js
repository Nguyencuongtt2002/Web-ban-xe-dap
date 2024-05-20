import { useEffect, useState } from 'react';
import TableDonHang from './TableDonHang';
import { getALL, getByDonHang, duyetDon } from '../../services/donhangService';
import ModalChiTiet from './ModalChiTiet';
//import ModalChiTiet from './ModalChiTiet';
const DonHangAd = (props) => {
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [showModalChiTiet, setShowModalChiTiet] = useState(false)
    useEffect(() => {
        getDonHang();
    }, [])

    const hanldeDuyetDon = async (item) => {
        try {
            const obj = {
                ID: item.ID,
                TrangThai: 1
            };

            // Hiển thị cửa sổ xác nhận
            const confirmed = window.confirm('Bạn có chắc chắn muốn duyệt đơn hàng này không?');

            if (confirmed) {
                const res = await duyetDon(obj);
                if (res) {
                    alert('Duyệt đơn thành công!');
                    await getDonHang();
                }

            } else {
                // Người dùng đã hủy bỏ xác nhận
                console.log('Duyệt đơn đã bị hủy bỏ.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleXemChiTiet = async (item) => {
        setShowModalChiTiet(true);
        const res = await getByDonHang(item.ID)
        console.log(res && res.data ? res.data : res)
        setData1(res && res.data ? res.data : res)
    }
    const getDonHang = async () => {
        try {
            const res = await getALL()
            const data = res && res.data ? res.data : res
            console.log(data)
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="card shadow mb-4">

                <div className="card-body">
                    <div className="table-responsive">
                        <TableDonHang
                            data={data}
                            hanldeDuyetDon={hanldeDuyetDon}
                            handleXemChiTiet={handleXemChiTiet}
                        />
                        <ModalChiTiet
                            show={showModalChiTiet}
                            setShow={setShowModalChiTiet}
                            data1={data1}
                            setData1={setData1}
                        />
                    </div>
                </div>
            </div>

        </>


    )
}

export default DonHangAd;