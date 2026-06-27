import { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Warehouse, Menu, Trash2, Edit, Search, PenTool, Tag } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AdminEmployees } from '../components/AdminEmployees';
import { AdminDiscounts } from '../components/AdminDiscounts';
import { API_BASE } from '../config/api';
import '../../styles/pages/admin.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type MenuSection = 'dashboard' | 'products' | 'orders' | 'customers' | 'inventory' | 'blog' | 'employees' | 'discounts';

export function Admin() {
  const [activeSection, setActiveSection] = useState<MenuSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ todayRevenue: 0, todayOrders: 0, totalProducts: 0, totalCustomers: 0, topProducts: [] as any[]});
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const menuItems = [
    { id: 'dashboard' as MenuSection, label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'products' as MenuSection, label: 'THÊM SẢN PHẨM', icon: Package },
    { id: 'inventory' as MenuSection, label: 'KHO HÀNG', icon: Warehouse },
    { id: 'orders' as MenuSection, label: 'ĐƠN HÀNG', icon: ShoppingCart },
    { id: 'customers' as MenuSection, label: 'KHÁCH HÀNG', icon: Users },
    { id: 'blog' as MenuSection, label: 'QUẢN LÝ BLOG', icon: PenTool },
    { id: 'discounts' as MenuSection, label: 'MÃ GIẢM GIÁ', icon: Tag },
  ];
  if (user && user.role === 'admin') { menuItems.push({ id: 'employees' as MenuSection, label: 'NHÂN SỰ', icon: Users }); }

  const fetchDashboard = () => {
    fetch(`${API_BASE}/admin.php?action=dashboard_stats`).then(res => res.json()).then(data => { if(data.success) setStats(data.data); }).catch(console.error);
    fetch(`${API_BASE}/admin.php?action=revenue_report`).then(res => res.json()).then(data => { if(data.success) setRevenueData(data.data); }).catch(console.error);
  };

  const fetchOrders = () => {
    fetch(`${API_BASE}/orders.php?action=list`).then(res => res.json()).then(data => {
      if (data.success && data.data) { setOrders(data.data.map((o: any) => ({ id: o.MaDH, order_code: 'ORD-' + o.MaDH.toString().padStart(3, '0'), customer: o.HoTen || o.MaKH || 'Khách vãng lai', total: parseFloat(o.TongTien), status: o.TrangThai, date: o.NgayDat }))); }
    }).catch(console.error);
  };

  const fetchCustomers = () => { fetch(`${API_BASE}/admin.php?action=customers_list`).then(res => res.json()).then(data => { if(data.success) setCustomers(data.data); }).catch(console.error); };
  const fetchInventory = () => { fetch(`${API_BASE}/admin.php?action=inventory_list`).then(res => res.json()).then(data => { if(data.success) setInventory(data.data); }).catch(console.error); };

  useEffect(() => {
    if(activeSection === 'dashboard') fetchDashboard();
    else if(activeSection === 'orders') fetchOrders();
    else if(activeSection === 'customers') fetchCustomers();
    else if(activeSection === 'inventory') { fetchInventory(); setEditingProduct(null); setSearchQuery(''); }
  }, [activeSection]);

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    try { const res = await fetch(`${API_BASE}/orders.php?action=update_status`, { method: 'POST', body: JSON.stringify({order_id: orderId, status}), headers: {'Content-Type': 'application/json'} }); const d = await res.json(); if(d.success) { alert('Cập nhật thành công!'); fetchOrders(); } else alert(d.message); } catch(e) { console.error(e); }
  };

  const handleDeleteProduct = async (productId: number) => {
    if(!window.confirm("XÓA SẢN PHẨM NÀY? KHÔNG THỂ HOÀN TÁC!")) return;
    try { const res = await fetch(`${API_BASE}/products.php?action=delete`, { method: 'POST', body: JSON.stringify({id: productId}), headers: {'Content-Type': 'application/json'} }); const d = await res.json(); if(d.success) { alert('Đã xóa!'); fetchInventory(); } else alert(d.message); } catch(e) { console.error(e); }
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault(); const formData = new FormData(e.currentTarget); const payload: any = Object.fromEntries(formData.entries()); payload.id = editingProduct.id;
    try { const res = await fetch(`${API_BASE}/products.php?action=update`, { method: 'POST', body: JSON.stringify(payload), headers: {'Content-Type': 'application/json'} }); const d = await res.json(); if(d.success) { alert('Cập nhật thành công!'); setEditingProduct(null); fetchInventory(); } else alert('Lỗi: ' + d.message); } catch { alert('Lỗi kết nối!'); }
  };

  const filteredInventory = inventory.filter(sp => sp.name.toLowerCase().includes(searchQuery.toLowerCase()) || sp.id.toString().includes(searchQuery));

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="admin-stat-grid">
              <div className="admin-stat-card admin-stat-card--yellow"><div className="admin-stat-label">DOANH THU HÔM NAY</div><div className="admin-stat-value">{stats.todayRevenue.toLocaleString('vi-VN')}đ</div></div>
              <div className="admin-stat-card admin-stat-card--pink"><div className="admin-stat-label">ĐƠN HÀNG HÔM NAY</div><div className="admin-stat-value">{stats.todayOrders}</div></div>
              <div className="admin-stat-card admin-stat-card--blue"><div className="admin-stat-label">TỔNG SẢN PHẨM</div><div className="admin-stat-value">{stats.totalProducts}</div></div>
              <div className="admin-stat-card admin-stat-card--green"><div className="admin-stat-label">TỔNG KHÁCH HÀNG</div><div className="admin-stat-value">{stats.totalCustomers}</div></div>
            </div>
            <div className="admin-table-box">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Biểu đồ Doanh Thu (30 Ngày Trước)</h3>
              <div style={{ width: '100%', height: '400px' }}>
                <Bar data={{ labels: revenueData.map(r => r.date), datasets: [{ label: 'Doanh thu (VNĐ)', data: revenueData.map(r => r.revenue), backgroundColor: '#facc15', borderColor: '#000', borderWidth: 2 }] }} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="admin-table-box">
              <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1rem' }}>SẢN PHẨM BÁN CHẠY</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead><tr><th>TÊN SP</th><th>ĐÃ BÁN</th><th>DOANH THU</th></tr></thead>
                  <tbody>{stats.topProducts.map((p, i) => (<tr key={i}><td style={{ textTransform: 'uppercase' }}>{p.name} <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>({p.artist})</span></td><td>{p.sales}</td><td style={{ color: '#15803d' }}>{Number(p.revenue).toLocaleString('vi-VN')}đ</td></tr>))}</tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="admin-form-box">
            <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Thêm Sản Phẩm Mới</h2>
            <form onSubmit={async (e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const payload = Object.fromEntries(fd.entries()); try { const res = await fetch(`${API_BASE}/products.php?action=create`, { method: 'POST', body: JSON.stringify(payload), headers: {'Content-Type': 'application/json'} }); const d = await res.json(); if(d.success) { alert('Thêm thành công!'); e.currentTarget.reset(); } else alert('Lỗi: ' + d.message); } catch { alert('Lỗi kết nối!'); } }} className="admin-form">
              <div className="form-group"><label className="neo-label">Tên sản phẩm *</label><input name="title" required className="neo-input" /></div>
              <div className="form-row">
                <div className="form-group"><label className="neo-label">Nghệ sĩ *</label><input name="artist" required className="neo-input" /></div>
                <div className="form-group"><label className="neo-label">Thể loại *</label><select name="genre" required className="neo-input"><option value="Đĩa Than (Vinyl)">Đĩa Than (Vinyl)</option><option value="Cassette">Cassette</option><option value="Máy Quay Đĩa (Turntable)">Máy Thu Âm (Turntable)</option><option value="Phụ Kiện">Phụ Kiện</option></select></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="neo-label">Giá bán (VNĐ) *</label><input type="number" name="price" required className="neo-input" /></div>
                <div className="form-group"><label className="neo-label">Số lượng *</label><input type="number" name="stock" required className="neo-input" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="neo-label">Năm phát hành</label><input type="number" name="year" defaultValue={2024} required className="neo-input" /></div>
                <div className="form-group"><label className="neo-label">Tình trạng</label><select name="status" required className="neo-input"><option value="conhang">Còn hàng</option><option value="saphethang">Sắp hết hàng</option><option value="hethang">Hết hàng</option><option value="preorder">Pre-order</option><option value="ngungkinhdoanh">Ngừng kinh doanh</option></select></div>
              </div>
              <div className="form-group"><label className="neo-label">URL Hình ảnh *</label><input name="image" required defaultValue="https://images.unsplash.com/photo-1603048588665-791ca8aea617" className="neo-input" /></div>
              <button type="submit" className="neo-btn neo-btn--primary neo-btn--full" style={{ marginTop: '1rem' }}>LƯU CƠ SỞ DỮ LIỆU</button>
            </form>
          </div>
        );

      case 'orders':
        return (
          <div className="admin-table-box">
            <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Quản Lý Đơn Hàng</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead><tr><th>MÃ ĐH</th><th>KHÁCH HÀNG</th><th>THỜI GIAN</th><th>TỔNG TIỀN</th><th>TRẠNG THÁI</th></tr></thead>
                <tbody>
                  {orders.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center' }}>TRỐNG</td></tr>}
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>{o.order_code}</td><td>{o.customer}</td><td>{new Date(o.date).toLocaleString('vi-VN')}</td><td>{o.total.toLocaleString('vi-VN')}đ</td>
                      <td><select value={o.status} onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)} className="neo-input" style={{ padding: '0.25rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <option value="choxacnhan">CHỜ X.NHẬN</option><option value="daxacnhan">ĐÃ XÁC NHẬN</option><option value="danggiaohang">ĐANG GIAO</option><option value="hoanthanh">HOÀN THÀNH</option><option value="dahuy">ĐÃ HỦY</option>
                      </select></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="admin-table-box">
            <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Danh Sách Khách Hàng</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead><tr><th>ID</th><th>HỌ TÊN</th><th>EMAIL</th><th>ĐƠN ĐÃ ĐẶT</th><th>TỔNG CHI TIÊU</th></tr></thead>
                <tbody>
                  {customers.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center' }}>TRỐNG</td></tr>}
                  {customers.map(c => (<tr key={c.id}><td>KH-{c.id}</td><td>{c.name}</td><td>{c.email}</td><td>{c.totalOrders} đơn</td><td>{Number(c.totalSpent).toLocaleString('vi-VN')}đ</td></tr>))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'inventory':
        if(editingProduct) {
          return (
            <div className="admin-form-box">
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontFamily: 'var(--font-heading)' }}>Sửa Sản Phẩm #{editingProduct.id}</h2>
                <button onClick={() => setEditingProduct(null)} className="neo-btn neo-btn--secondary neo-btn--sm">HUỶ BỎ</button>
              </div>
              <form onSubmit={handleEditSubmit} className="admin-form">
                <div className="form-group"><label className="neo-label">Tên sản phẩm *</label><input name="title" defaultValue={editingProduct.name} required className="neo-input" /></div>
                <div className="form-row"><div className="form-group"><label className="neo-label">Nghệ sĩ *</label><input name="artist" defaultValue={editingProduct.artist} className="neo-input" /></div><div className="form-group"><label className="neo-label">Thể loại *</label><select name="genre" defaultValue={editingProduct.genre} required className="neo-input"><option value="Đĩa Than (Vinyl)">Đĩa Than (Vinyl)</option><option value="Cassette">Cassette</option><option value="Máy Quay Đĩa (Turntable)">Máy Quy Đĩa (Turntable)</option><option value="Phụ Kiện">Phụ Kiện</option></select></div></div>
                <div className="form-row"><div className="form-group"><label className="neo-label">Giá bán (VNĐ) *</label><input type="number" name="price" defaultValue={editingProduct.price} required className="neo-input" /></div><div className="form-group"><label className="neo-label">Số lượng *</label><input type="number" name="stock" defaultValue={editingProduct.stock} required className="neo-input" /></div></div>
                <div className="form-row"><div className="form-group"><label className="neo-label">Năm phát hành</label><input type="number" name="year" defaultValue={editingProduct.year || 2024} required className="neo-input" /></div><div className="form-group"><label className="neo-label">Tình trạng</label><select name="status" defaultValue={editingProduct.status || 'conhang'} required className="neo-input"><option value="conhang">Còn hàng</option><option value="saphethang">Sắp hết hàng</option><option value="hethang">Hết hàng</option><option value="preorder">Pre-order</option><option value="ngungkinhdoanh">Ngừng kinh doanh</option></select></div></div>
                <div className="form-group"><label className="neo-label">URL Hình ảnh *</label><input name="image" defaultValue={editingProduct.image} className="neo-input" /></div>
                <button type="submit" className="neo-btn neo-btn--yellow neo-btn--full" style={{ marginTop: '1rem' }}>CẬP NHẬT THAY ĐỔI</button>
              </form>
            </div>
          );
        }
        return (
          <div className="admin-table-box">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.875rem', fontFamily: 'var(--font-heading)' }}>Quản Lý Kho Hàng</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={() => {
                    const ids = prompt("Nhập danh sách mã sản phẩm và số lượng (VD: 1:10, 2:5):"); if(!ids) return;
                    const parsed = ids.split(',').map(s => { const [id, qty] = s.split(':'); return {id: parseInt(id), qty: parseInt(qty), price: 0}; });
                    const note = prompt("Nhập ghi chú phiếu nhập:");
                    fetch(`${API_BASE}/admin.php?action=import_stock`, { method: 'POST', body: JSON.stringify({admin_id: user.customer_id, items: parsed, note}), headers: {'Content-Type': 'application/json'} }).then(r => r.json()).then(d => { if(d.success) { alert('Nhập kho thành công!'); fetchInventory(); } else alert('Lỗi: ' + d.message); });
                  }} className="neo-btn neo-btn--primary neo-btn--sm">+ Nhập kho</button>
                  <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #000', padding: '0.5rem' }}>
                    <Search style={{ width: 20, height: 20, margin: '0 0.5rem', color: 'var(--gray-500)' }} />
                    <input type="text" placeholder="TÌM KIẾM THEO TÊN / ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: 'none', outline: 'none', fontWeight: 700, textTransform: 'uppercase', width: '16rem' }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead><tr><th>MÃ SP</th><th>SẢN PHẨM</th><th>PHÂN LOẠI</th><th>GIÁ BÁN</th><th>TỒN KHO</th><th style={{ textAlign: 'center' }}>THAO TÁC</th></tr></thead>
                <tbody>
                  {filteredInventory.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center' }}>KHÔNG TÌM THẤY SẢN PHẨM</td></tr>}
                  {filteredInventory.map(sp => (
                    <tr key={sp.id}>
                      <td>SP-{sp.id}</td><td style={{ textTransform: 'uppercase', maxWidth: '16rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sp.name}</td><td style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>{sp.genre}</td><td>{Number(sp.price).toLocaleString('vi-VN')}đ</td>
                      <td><span className={`stock-badge ${sp.stock > 0 ? 'stock-badge--in' : 'stock-badge--out'}`}>{sp.stock > 0 ? sp.stock : 'HẾT HÀNG'}</span></td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <button onClick={() => { fetch(`${API_BASE}/products.php?action=detail&id=` + sp.id).then(res => res.json()).then(data => { if(data.success) { setEditingProduct({ id: sp.id, name: data.data.title, artist: data.data.artist, genre: data.data.genre, price: data.data.price, stock: data.data.stock, image: data.data.image, description: data.data.description }); } }); }} className="emp-action-btn" style={{ background: '#60a5fa' }}><Edit style={{ width: 20, height: 20 }} /></button>
                          <button onClick={() => handleDeleteProduct(sp.id)} className="emp-action-btn emp-action-lock"><Trash2 style={{ width: 20, height: 20 }} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="admin-form-box" style={{ maxWidth: '56rem' }}>
            <h2 style={{ fontSize: '1.875rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Quản Lý Blog & Hướng Dẫn</h2>
            <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const payload: any = Object.fromEntries(fd.entries()); payload.account_id = user.customer_id; fetch(`${API_BASE}/blog.php?action=create`, { method: 'POST', body: JSON.stringify(payload), headers:{'Content-Type': 'application/json'} }).then(r => r.json()).then(d => { if(d.success) { alert('Thêm bài viết thành công!'); e.currentTarget.reset(); } else alert('Lỗi: ' + d.message); }); }} style={{ border: '2px solid #000', padding: '1.5rem', background: 'var(--gray-50)' }}>
              <h3 style={{ fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', fontSize: '1.25rem' }}>Thêm bài viết mới</h3>
              <div className="admin-form">
                <div className="form-group"><label className="neo-label">Tiêu đề *</label><input name="title" required className="neo-input" /></div>
                <div className="form-row">
                  <div className="form-group"><label className="neo-label">Loại bài viết</label><select name="type" className="neo-input"><option value="blog">Blog / Tin tức</option><option value="huongdan">Hướng dẫn (Tips)</option></select></div>
                  <div className="form-group"><label className="neo-label">Trạng thái</label><select name="status" className="neo-input"><option value="daxuatban">Xuất bản</option><option value="nhap">Bản nháp</option></select></div>
                </div>
                <div className="form-group"><label className="neo-label">Nội dung * (HTML hỗ trợ)</label><textarea name="content" rows={6} required className="neo-textarea" /></div>
                <div className="form-group"><label className="neo-label">Link Ảnh Cover</label><input name="image" className="neo-input" /></div>
                <button type="submit" className="neo-btn neo-btn--primary neo-btn--full">LƯU BÀI VIẾT</button>
              </div>
            </form>
          </div>
        );
      case 'discounts': return <AdminDiscounts />;
      case 'employees': return <AdminEmployees />;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo"><h1 style={{ fontFamily: 'var(--font-heading)' }}>VỌC PANEL</h1></div>
        <nav className="admin-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => setActiveSection(item.id)} className={`admin-nav-btn ${activeSection === item.id ? 'admin-nav-btn--active' : ''}`}>
                <Icon style={{ width: 20, height: 20 }} /><span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(true)} className="admin-menu-btn"><Menu style={{ width: 24, height: 24 }} /></button>
            <h2 className="admin-header-title" style={{ fontFamily: 'var(--font-heading)' }}>{menuItems.find((item) => item.id === activeSection)?.label}</h2>
          </div>
        </header>
        <main className="admin-content">{renderContent()}</main>
      </div>
    </div>
  );
}
