# Vọc Record — Website bán đĩa nhạc (frontend gốc đầy đủ)

Đồ án môn **Quy trình và công cụ phát triển phần mềm** (UTT).
Kiến trúc: **React SPA (frontend) + PHP API (backend) + MySQL**, đóng gói bằng Docker.

## Công nghệ
- Frontend: React + Vite (đã build sẵn trong `DiaNhac/dist/`)
- Backend: PHP 8.2 + Apache, API tại `/api`
- CSDL: MySQL 8.0
- Docker + Docker Compose

## Cách chạy
```bash
git clone <repo-url>
cd clonevocrecord
docker compose up -d --build
```
Mở: <http://localhost:8080>  ·  API: <http://localhost:8080/api/products.php?action=list>

Dừng: `docker compose down` (giữ data) · `docker compose down -v` (xóa data)

## Cấu trúc
```
clonevocrecord/
├─ Dockerfile            # serve SPA (dist) ở /, API (PHP) ở /api
├─ docker-compose.yml    # web + db (MySQL) + volume db_data
├─ .htaccess             # điều hướng React Router về index.html
├─ database.sql          # 18 bảng + dữ liệu mẫu (tự nạp lần đầu)
├─ .env.example          # mẫu khóa bí mật (copy thành .env)
├─ DiaNhac/              # frontend React (src + dist đã build)
└─ api/                  # backend PHP (products, orders, auth, admin...)
```

## ⚠️ BẢO MẬT — đọc kỹ
File code KHÔNG còn chứa khóa thật. Khóa cũ (Gmail App Password + PayOS) **đã bị lộ** trong lịch sử git cũ → **phải thu hồi/đổi ngay** ở Google và PayOS.
- Khóa thật điền vào `.env` (đã được `.gitignore` bỏ qua).
- Tính năng email OTP / thanh toán PayOS chỉ hoạt động khi có `.env`. Duyệt web, giỏ hàng, admin vẫn chạy bình thường khi không có khóa.

## Khái niệm Docker trong đồ án
- Image/Container: `web` build từ Dockerfile; `db` từ image `mysql:8.0`.
- Port mapping `-p 8080:80`.
- Volume `db_data` ở `/var/lib/mysql` giữ dữ liệu khi xóa/tạo lại container.
- Network: API kết nối db bằng tên dịch vụ `db` (xem `api/config/database.php`).
