import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../../services/userService';
import { loginSuccess } from '../../redux/slices/userSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

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
        let res = await Login(obj)
        console.log(res.data)
        dispatch(loginSuccess(res.data))
        if (res && res.data) {
            Swal.fire({
                icon: 'success',
                title: 'Login thành công!',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
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

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label style={{ color: '#333' }}>Tài khoản <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" value={taiKhoan} onChange={(e) => setTaiKhoan(e.target.value)} placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{ color: '#333' }}>Password <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} placeholder="Password" />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" style={{ borderRadius: '5px', width: '100%' }}>
                        Login
                    </Button>
                </Form>
                <p className="mt-3" style={{ color: '#666', fontSize: '14px' }}>Don't have an account? <a href="/dangky" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up</a></p>
            </div>
        </div>
    );
}

export default DangNhap;

