import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { CreateNguoiDung } from '../../services/userService';
const Dangky = () => {
    const navigate = useNavigate();
    const formWidth = '500px';
    const [taiKhoan, setTaiKhoan] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [email, setEmail] = useState("");
    const [ten, setTen] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const obj = {
            TaiKhoan: taiKhoan,
            MatKhau: matKhau,
            Gmail: email,
            HoTen: ten,
            DiaChi: diaChi,
            SDT: soDienThoai,
            Quyen: 2
        };
        console.log(obj)
        let res = await CreateNguoiDung(obj)

        console.log(res)
        if (res) {
            Swal.fire({
                icon: 'success',
                title: 'dăng ký thành công!',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        }
    }
    return (
        <>
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
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label style={{ color: '#333' }}>Họ tên <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" value={ten} onChange={(e) => setTen(e.target.value)} placeholder="Enter họ tên" />
                        </Form.Group>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label style={{ color: '#333' }}>Gmail <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Gmail" />
                        </Form.Group>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label style={{ color: '#333' }}>Địa Chỉ <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} placeholder="Enter Địa Chỉ" />
                        </Form.Group>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label style={{ color: '#333' }}>SĐT <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" value={soDienThoai} onChange={(e) => setSoDienThoai(e.target.value)} placeholder="Enter SĐT" />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit" style={{ borderRadius: '5px', width: '100%' }}>
                            Đăng ký
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Dangky;