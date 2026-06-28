<?php
// Router: Đơn Hàng (orders.php)
// Entry point - định tuyến request đến OrderController
// Cap nhat: them xu ly action create don hang
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/OrderController.php';

header('Content-Type: application/json');

$db = new Database();
$pdo = $db->getConnection();
$controller = new OrderController($pdo);

// Lay action tu query string
$action = $_GET['action'] ?? '';
// Doc du lieu JSON tu body request
$data = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    case 'create':        $controller->create($data); break;        // Tao don hang moi
    case 'list':          $controller->list(); break;               // Lay danh sach don hang
    case 'update_status': $controller->updateStatus($data); break;  // Cap nhat trang thai
    case 'cancel_order':  $controller->cancelOrder($data); break;   // Huy don hang
    case 'order_detail':  $controller->orderDetail(); break;        // Chi tiet don hang
    case 'check_status':  $controller->checkStatus(); break;        // Kiem tra trang thai
    default:
     // Tra ve loi neu action khong hop le
        echo json_encode(['success' => false, 'message' => 'Hành động không hợp lệ']);
}
?>
