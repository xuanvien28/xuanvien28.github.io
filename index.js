const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Chứa file login.html

// Cấu hình kết nối SQL Server
const config = {
  user: 'sa',
  password: '123456',
  server: 'DESKTOP-1KV7QIS',
  database: 'QLBH',
  options: {
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

// Route GET để hiển thị form đăng nhập
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route POST để xử lý đăng nhập
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT * FROM TAIKHOAN WHERE TAIKHOAN = ${username} AND MATKHAU = ${password}
    `;

    if (result.recordset.length > 0) {
      res.send('✅ Đăng nhập thành công!');
    } else {
      res.send('❌ Sai tài khoản hoặc mật khẩu!');
    }
  } catch (err) {
    console.error('❌ Lỗi truy vấn:', err);
    res.send('Có lỗi xảy ra khi kết nối database.');
  } finally {
    sql.close();
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
