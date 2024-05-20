var express = require('express');
var route = express();
var db = require('./dbconnect');

const ensureToken = require('./auth');

//Lấy về danh sách giới thiệu sắp xếp theo tăng dần------------------------------
route.get('/get-asc', function(req, res){
    var sql = "CALL sp_gioithieu_getall_asc()";

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy danh sách thành công", data: rows[0] });
    });
});

//Lấy về danh sách giới thiệu sắp xếp theo giảm dần------------------------------
route.get('/get-desc', function(req, res){
    var sql = "CALL sp_gioithieu_getall_desc()";

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy danh sách thành công", data: rows[0] });
    });
});

//Lấy về 1------------------------------------------------------------
route.get('/get-by-id/:id', function(req, res){
    var id = req.params.id;
    
    var sql = "CALL sp_gioithieu_getbyid(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Lấy theo ID thành công", data: rows[0] });
    });
});

//Thêm---------------------------------------------------------------
route.post('/create', ensureToken, function(req, res) {
    var noidung = req.body.NoiDung;

    var sql = "CALL sp_gioithieu_create(?)";

    db.query(sql, [noidung], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Thêm thành công", data: rows[0] });
    });
});

//Sửa---------------------------------------------------------------
route.put('/update', ensureToken, function(req, res){
    var id = req.body.ID;
    var noidung = req.body.NoiDung;

    var sql = "CALL sp_gioithieu_update(?, ?)";

    db.query(sql, [id, noidung], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Sửa thành công", data: rows[0] });
    });
});

//Xoá---------------------------------------------------------------
route.delete('/delete/:id', ensureToken, function(req,res){
    var id = req.params.id;
    
    var sql = "CALL sp_gioithieu_delete(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Xoá thành công", data: rows[0] });
    });
});

module.exports = route;