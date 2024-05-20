var express = require('express');
var route = express();
var db = require('./dbconnect');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const ensureToken = require('./auth');

var router = express.Router();

const path = require('path');
const duongdan = path.join(__dirname, './upload/');

//Lấy về danh sách slide sắp xếp theo tăng dần------------------------------
route.get('/get-asc', function(req, res){
    var sql = "CALL sp_slide_getall_asc()";

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });

        rows[0].forEach(slide => {
            slide.Anh = Buffer.from(slide.Anh).toString('base64');
        });

        res.json({ success: true, message: "Lấy danh sách thành công", data: rows[0] });
    });
});

//Lấy về danh sách slide sắp xếp theo giảm dần------------------------------
route.get('/get-desc', function(req, res){
    var sql = "CALL sp_slide_getall_desc()";

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });

        rows[0].forEach(slide => {
            slide.Anh = Buffer.from(slide.Anh).toString('base64');
        });

        res.json({ success: true, message: "Lấy danh sách thành công", data: rows[0] });
    });
});

//Lấy về 1------------------------------------------------------------------
route.get('/get-by-id/:id', function(req, res){
    var id = req.params.id;
    
    var sql = "CALL sp_slide_getbyid(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });

        rows[0].forEach(slide => {
            slide.Anh = Buffer.from(slide.Anh).toString('base64');
        });

        res.json({ success: true, message: "Lấy theo ID thành công", data: rows[0] });
    });
});

//Thêm kiểm tra có upfile không---------------------------------------------
route.post('/create', ensureToken, function(req, res) {
    var fileupload;
    var pathupload;

    if (req.files) {
        fileupload = req.files.fileanh;
        var uniqueFilename = uuidv4() + '-' + fileupload.name;
        pathupload = path.join(duongdan, '', uniqueFilename);

        fileupload.mv(pathupload, (error) => {
            if (error) return res.status(500).send('Lỗi upload file');

            fs.readFile(pathupload, (err, data) => {
                if (err) return res.status(500).send('Lỗi đọc tệp tin');

                fs.unlink(pathupload, (err) => {
                    if (err) console.error('Lỗi xoá tệp tin:', err);
                    
                    create(req, res, data);
                });
            });
        });
    } else {
        create(req, res, req.body.anh);
    }
});

//Thêm-------------------------------------------------------------
function create(req, res, img) {
    var anh = img ? img : '';

    var sql = "CALL sp_slide_create(?)";

    db.query(sql, [anh], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Thêm thành công", data: rows[0] });
    });
}

//Sửa kiểm tra có upfile không--------------------------------------
route.put('/update', ensureToken, function(req, res) {
    var fileupload;
    var pathupload;

    if (req.files) {
        fileupload = req.files.fileanh;
        var uniqueFilename = uuidv4() + '-' + fileupload.name;
        pathupload = path.join(duongdan, '', uniqueFilename);

        fileupload.mv(pathupload, (error) => {
            if (error) return res.status(500).send('Lỗi upload file');

            fs.readFile(pathupload, (err, data) => {
                if (err) return res.status(500).send('Lỗi đọc tệp tin');

                fs.unlink(pathupload, (err) => {
                    if (err) console.error('Lỗi xoá tệp tin:', err);
                    
                    update(req, res, data);
                });
            });
        });
    } else {
        create(req, res, req.body.anh);
    }
});

//Sửa--------------------------------------------------------------
function update(req, res, img) {
    var id = req.body.ID;
    var anh = img ? img : null;

    var sql = "CALL sp_slide_update(?, ?)";

    db.query(sql, [id, anh], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Sửa thành công", data: rows[0] });
    });
}

//Xoá--------------------------------------------------------------
route.delete('/delete/:id', ensureToken, function(req,res){
    var id = req.params.id;
    
    var sql = "CALL sp_slide_delete(?)";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Có lỗi xảy ra" });
        res.json({ success: true, message: "Xoá thành công", data: rows[0] });
    });
});

module.exports = route;