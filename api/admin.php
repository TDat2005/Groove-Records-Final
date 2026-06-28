<?php
// Router: Admin (admin.php)
// Entry point - định tuyến request đến AdminController
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/AdminController.php';

header('Content-Type: application/json');

$db = new Database();
$pdo = $db->getConnection();
$controller = new AdminController($pdo);

$action = $_GET['action'] ?? '';
$data = json_decode(file_get_contents("php://input"), true);

try {
    switch ($action) {
        case 'dashboard_stats': $controller->dashboardStats(); break;
        case 'customers_list':  $controller->customersList(); break;
        case 'inventory_list':  $controller->inventoryList(); break;
        case 'revenue_report':  $controller->revenueReport(); break;
        case 'import_stock':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['success' => false, 'message' => 'Chi chap nhan phuong thuc POST']);
                break;
            }
            $controller->importStock($data);
            break;
        case 'activity_log':    $controller->activityLog(); break;
        case 'health':
            echo json_encode(['success' => true, 'message' => 'Admin API hoat dong', 'db' => $pdo ? 'connected' : 'down']);
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Hành động không hợp lệ']);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Lỗi máy chủ: ' . $e->getMessage()]);
}
