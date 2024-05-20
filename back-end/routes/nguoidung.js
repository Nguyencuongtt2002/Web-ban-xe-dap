var express = require('express');
var route = express();
var db = require('./dbconnect');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ensureToken = require('./auth');

var router = express.Router();

//Đăng nhập với tài khoản và mật khẩu---------------------------------
route.post('/login', function(req, res) {
    var taikhoan = req.body.TaiKhoan;
    var matkhau = req.body.MatKhau;

    var hashedPassword = crypto.createHash('md5').update(matkhau).digest('hex');

    var sql = "CALL sp_nguoidung_login(?, ?)";

    db.query(sql, [taikhoan, hashedPassword], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        
        if (rows[0].length > 0) {
            const user = rows[0][0];

            // Tạo token JWT
            const token = jwt.sign({ taiKhoan: user.taiKhoan }, 'my_secret_key', { expiresIn: '1d' });

            user.Token = token;

            res.json({ success: true, message: "Đăng nhập thành công", data: user });
        } else {
            res.status(401).json({ success: false, message: "Tài khoản hoặc mật khẩu không đúng" });
        }
    });
});

//Lấy về danh sách người dùng sắp xếp theo tăng dần------------------------------
route.get('/get-asc', function(req, res){
    var sql = "CALL sp_nguoidung_getall_asc()";

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy danh sách thành công", data: rows[0] });
    });
});

//Lấy về danh sách người dùng sắp xếp theo giảm dần------------------------------
route.get('/get-desc', function(req, res){
    var sql = "CALL sp_nguoidung_getall_desc()";

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy danh sách thành công", data: rows[0] });
    });
});

//Lấy về 1------------------------------------------------------------
route.get('/get-by-id/:id', function(req, res){
    var id = req.params.id;
    
    var sql = "CALL sp_nguoidung_getbyid(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy theo ID thành công", data: rows[0] });
    });
});

//Thêm--------------------------------------------------------------
route.post('/create', function(req, res) {
    var taikhoan = req.body.TaiKhoan;
    var matkhau = req.body.MatKhau;
    var hoten = req.body.HoTen;
    var gmail = req.body.Gmail;
    var diachi = req.body.DiaChi;
    var sdt = req.body.SDT;
    var quyen = req.body.Quyen;

    var hashedPassword = crypto.createHash('md5').update(matkhau).digest('hex');

    // Truy vấn để kiểm tra tài khoản đã tồn tại chưa
    var checkAccountSql = "CALL sp_nguoidung_kiemtra(?, ?)";
    db.query(checkAccountSql, [taikhoan, gmail], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra khi kiểm tra tài khoản" });
        
        // Kiểm tra xem có bất kỳ hàng nào được trả về không
        if (rows[0].length > 0) {
            // Nếu có, tài khoản đã tồn tại, trả về thông báo lỗi
            return res.status(400).json({ error: "Tài khoản hoặc email đã tồn tại" });
        } else {
            // Nếu không có, tiến hành tạo tài khoản
            var createAccountSql = "CALL sp_nguoidung_create(?, ?, ?, ?, ?, ?, ?)";
            db.query(createAccountSql, [taikhoan, hashedPassword, hoten, gmail, diachi, sdt, quyen], (err, rows) => {
                if (err) return res.status(500).json({ error: "Có lỗi xảy ra khi tạo tài khoản" });
                res.json({ success: true, message: "Đăng ký thành công" + quyen, data: rows[0] });
            });
        }
    });
});


//Sửa--------------------------------------------------------------
route.put('/update', ensureToken, function(req, res){
    var id = req.body.ID;
    var matkhau = req.body.MatKhau;
    var hoten = req.body.HoTen;
    var diachi = req.body.DiaChi;
    var sdt = req.body.SDT;
    var quyen = req.body.Quyen;

    var hashedPassword = crypto.createHash('md5').update(matkhau).digest('hex');

    var sql = "CALL sp_nguoidung_update(?, ?, ?, ?, ?, ?)";

    db.query(sql, [id, hashedPassword, hoten, diachi, sdt, quyen], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Sửa thành công", data: rows[0] });
    });
});

//Xoá---------------------------------------------------------------
route.delete('/delete/:id', ensureToken, function(req,res){
    var id = req.params.id;
    
    var sql = "CALL sp_nguoidung_delete(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Xoá thành công", data: rows[0] });
    });
});

module.exports = route;