import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../../services/userService';
import { loginSuccess } from '../../redux/slices/userSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const DangNhap = () => {
    const formWidth = '500px';
    const dispatch = useDispatch();
    const [taiKhoan, setTaiKhoan] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const obj = {
            TaiKhoan: taiKhoan,
            MatKhau: matKhau
        };
        console.log(obj)
        let res = await Login(obj)
        console.log(res.data)
        if (res && res.data && res.data.Quyen === 1) {
            Swal.fire({
                icon: 'success',
                title: 'Login thành công!',
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(loginSuccess(res.data))
                    navigate('/');
                }
            });
        }
        else if (res && res.data && res.data.Quyen === 2) {
            Swal.fire({
                icon: 'error',
                title: 'Bạn không có quyền !',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Không tồn tại tài khoản!',
            });
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="sign-in" style={{ backgroundColor: '#f0f0f0', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', width: formWidth }}>
                <h4 className="mb-4" style={{ color: '#333' }}>Sign in</h4>
                <p className="mb-4" style={{ color: '#666' }}>Hello, Welcome to your account.</p>

                <form className="register-form outer-top-xs" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{ color: '#333' }}>Tài khoản <span className="text-danger">*</span></label>
                        <input type="text" value={taiKhoan} onChange={(e) => setTaiKhoan(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter username" style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: '#333' }}>Password <span className="text-danger">*</span></label>
                        <input type="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '15px', fontSize: '16px' }}>Login</button>
                </form>
                <p className="mt-3" style={{ color: '#666', fontSize: '14px' }}>Don't have an account? <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up</a></p>
            </div>
        </div>
    );
}

export default DangNhap;

