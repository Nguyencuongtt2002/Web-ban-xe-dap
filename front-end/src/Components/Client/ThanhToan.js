import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CreateHoaDon } from '../../services/hoadonService';
import { xoaAll } from '../../redux/slices/cartSlice';
import { useNavigate } from "react-router-dom";

const ThanhToan = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    //const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const user = useSelector((state) => state.user.account);
    const [customerInfo, setCustomerInfo] = useState({
        TenKhachHang: '',
        DiaChi: '',
        SoDienThoai: '',
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setCustomerInfo({ ...customerInfo, [id]: value });
    };
    const handlePayment = async () => {
        const { TenKhachHang, DiaChi, SoDienThoai } = customerInfo;
        const obj = {
            HoTen: TenKhachHang,
            NoiGiao: DiaChi,
            SDT: SoDienThoai,
            NguoiDung_ID: user.account.ID,
            TrangThai: 0,
            ListChiTiet: []
        };
        cart.forEach(sanpham => {
            obj.ListChiTiet.push({
                SanPham_ID: sanpham.MaSanPham,
                SoLuong: sanpham.SoLuong,
                Gia: sanpham.DonGia
            });
        });
        console.log(obj)
        try {
            const response = await CreateHoaDon(obj);
            console.log(response)
            if (response) {
                alert('Thanh toán thành công! Cảm ơn quý khách đã tin tưởng sản phẩm của shop.');
                dispatch(xoaAll())
                setCustomerInfo({
                    TenKhachHang: '',
                    DiaChi: '',
                    SoDienThoai: '',
                })
                navigate("/");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };
    return (
        <>
            <div className="checkout block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-7">
                            <div className="card mb-lg-0">
                                <div className="card-body">
                                    <h3 className="card-title">Thông tin đơn hàng </h3>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="checkout-first-name">Họ Tên</label>
                                            <input type="text" className="form-control" value={customerInfo.TenKhachHang} onChange={handleChange} id="TenKhachHang" placeholder="First Name" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="checkout-last-name">Địa Chỉ </label>
                                            <input type="text" value={customerInfo.DiaChi} onChange={handleChange} className="form-control" id="DiaChi" placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="checkout-company-name">Số điện thoại <span className="text-muted">(Optional)</span></label>
                                        <input type="text" className="form-control" value={customerInfo.SoDienThoai} onChange={handleChange} id="SoDienThoai" placeholder="Company SĐT" />
                                    </div>
                                    {/* Các phần còn lại của form */}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">đơn hàng của tôi</h3>
                                    <table className="checkout__totals">
                                        <thead className="checkout__totals-header">
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="checkout__totals-products">
                                            {cart.map(gh => (
                                                <tr>
                                                    <td>{gh.TenSP} × {gh.SoLuong}</td>
                                                    <td> {(gh.DonGia * gh.SoLuong).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="checkout__totals-footer">
                                            <tr>
                                                <th>Total</th>
                                                <td>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className="checkout__agree form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="checkout-terms" />
                                            <label className="form-check-label" htmlFor="checkout-terms">I have read and agree to the website <a target="_blank" href="terms-and-conditions.html">terms and conditions</a>*</label>
                                        </div>
                                    </div>
                                    <button type="submit" onClick={handlePayment} className="btn btn-primary btn-xl btn-block">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThanhToan;
