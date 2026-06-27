<?php
// Config: Cấu hình SMTP Email — KHÔNG commit khóa thật vào git
// Điền giá trị thật vào file .env (đã được .gitignore bỏ qua)

define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.gmail.com');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 587);
define('SMTP_USER', getenv('SMTP_USER') ?: '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');   // App Password 16 ky tu — dat trong .env
define('SMTP_FROM_EMAIL', getenv('SMTP_FROM_EMAIL') ?: '');
define('SMTP_FROM_NAME', getenv('SMTP_FROM_NAME') ?: 'Voc Records');
