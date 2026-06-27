<?php
// Config: PayOS — KHONG commit khoa that vao git. Dat gia tri that trong .env

define('PAYOS_CLIENT_ID', getenv('PAYOS_CLIENT_ID') ?: '');
define('PAYOS_API_KEY', getenv('PAYOS_API_KEY') ?: '');
define('PAYOS_CHECKSUM_KEY', getenv('PAYOS_CHECKSUM_KEY') ?: '');

define('PAYOS_RETURN_URL', getenv('PAYOS_RETURN_URL') ?: 'http://localhost:8080/payment-result');
define('PAYOS_CANCEL_URL', getenv('PAYOS_CANCEL_URL') ?: 'http://localhost:8080/payment-result');
