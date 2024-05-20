var express = require('express');
var route = express();
var db = require('./dbconnect');

const ensureToken = require('./auth');

//Lấy về danh sách đơn hàng sắp xếp theo ngày đặt---------------------------
route.get('/get-desc', ensureToken, function(req, res){
    var sql = "CALL sp_donhang_getall_desc()";

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy danh sách thành công", data: rows[0] });
    });
});

//Lấy về danh sách đơn hàng theo người dùng-----------------------------
route.get('/get-by-nguoi-dung/:id', ensureToken, function(req, res){
    var id = req.params.id;
    
    var sql = "CALL sp_donhang_getbynguoidung(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy theo ID thành công", data: rows[0] });
    });
});

//Lấy về danh sách chi tiết đơn hàng theo đơn hàng----------------------
route.get('/get-by-don-hang/:id', ensureToken, function(req, res){
    var id = req.params.id;
    
    var sql = "CALL sp_ctdonhang_getbydonhang(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy theo ID thành công", data: rows[0] });
    });
});

//Lấy về 1------------------------------------------------------------
route.get('/get-by-id/:id', function(req, res){
    var id = req.params.id;
    
    var sql = "CALL sp_donhang_getbyid(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy theo ID thành công", data: rows[0] });
    });
});

//Thêm---------------------------------------------------------------
route.post('/create', function(req, res) {
    var hoten = req.body.HoTen;
    var noigiao = req.body.NoiGiao;
    var sdt = req.body.SDT; 
    var trangthai = req.body.TrangThai;
    var idnguoidung = req.body.NguoiDung_ID;
    var listchitiet = req.body.ListChiTiet; // Không cần chuyển đổi thành chuỗi JSON

    var jsonData = JSON.stringify(listchitiet);

    var sql = "CALL sp_donhang_create(?, ?, ?, ?, ?, ?)";

    db.query(sql, [hoten, noigiao, sdt, trangthai, idnguoidung, jsonData], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra"});
        res.json({ success: true, message: "Thêm thành công", data: rows[0] });
    });
});

//Sửa thay đổi trạng thái--------------------------------------------
route.put('/update', ensureToken, function(req, res){
    var id = req.body.ID;
    var trangthai = req.body.TrangThai;

    var sql = "CALL sp_donhang_update(?, ?)";

    db.query(sql, [id, trangthai], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Xử lý thành công", data: rows[0] });
    });
});

module.exports = route;