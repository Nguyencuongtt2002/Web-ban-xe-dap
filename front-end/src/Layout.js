import React from 'react';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Client/Home';
import XemChiTiet from './Components/Client/XemChiTiet';
import LienHe from './Components/Client/LienHe';
import SanPham from './Components/Client/SanPham';
import TimKiem from './Components/Client/TimKiem';
import DanhMuc from './Components/Client/DanhMuc';
import GioiThieu from './Components/Client/GioiThieu';
import DangNhap from './Components/Auth/Login';
import GioHang from './Components/Client/GioHang';
import ThanhToan from './Components/Client/ThanhToan';
import Dangky from './Components/Auth/DangKy';
import ThongTinUser from './Components/Client/ThongTinUser.';
import LichSuGiaoDich from './Components/Client/LichSuGiaoDich';

const Layout = () => {
    return (
        <>

            <Router>
                <div className="app">
                    <div className="main">
                        <Routes>
                            <Route path="/" element={<App />} >
                                <Route index element={<Home />} />
                                <Route path='sanpham' element={<SanPham />} />
                                <Route path='XemChiTiet/:id' element={<XemChiTiet />} />
                                <Route path='danhmuc/:id' element={<DanhMuc />} />
                                <Route path='timkiem' element={<TimKiem />} />
                                <Route path='gioithieu' element={<GioiThieu />} />
                                <Route path='lienhe' element={<LienHe />} />
                                <Route path='giohang' element={<GioHang />} />
                                <Route path='thanhtoan' element={<ThanhToan />} />
                                <Route path='taikhoan' element={<ThongTinUser />} />
                                <Route path='lichsu' element={<LichSuGiaoDich />} />
                            </Route>
                            <Route path='/login' element={<DangNhap />} />
                            <Route path='/dangky' element={<Dangky />} />
                        </Routes>
                    </div>

                </div>
            </Router >

        </>
    )
}

export default Layout;