import React from 'react';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoaiSanPham from './Components/LoaiSanPham/loaisanpham';
import DonHangAd from './Components/DonHang/donhang';
import SanPham from './Components/SanPham/sanpham';
import DangNhap from './Components/Auth/Login';
import Dashboard from './Components/Dashboard';
import Slide from './Components/Slide/slide';
import GioiThieu from './Components/GioiThieu/gioithieu';
import LienHe from './Components/LienHe/lienhe';


const Layout = () => {
    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<App />} >
                        <Route index element={<Dashboard />} />
                        <Route path='ad-sanpham' element={<SanPham />} />
                        <Route path='ad-slide' element={<Slide />} />
                        <Route path='ad-loaisp' element={<LoaiSanPham />} />
                        <Route path='ad-gioithieu' element={<GioiThieu />} />
                        <Route path='ad-lienhe' element={<LienHe />} />
                        <Route path='ad-donhang' element={<DonHangAd />} />
                    </Route>
                    <Route path='/login' element={<DangNhap />} />
                </Routes>
            </Router >

        </>
    )
}

export default Layout;
