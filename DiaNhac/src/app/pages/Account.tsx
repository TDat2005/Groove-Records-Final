import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Package, Heart, Edit2, Save, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_BASE } from '../config/api';
import '../../styles/pages/account.css';


type Tab = 'profile' | 'orders' | 'wishlist';

interface Order {
  MaDH: number;
  NgayDat: string;
  TrangThai: 'choxacnhan' | 'daxacnhan' | 'dangchuanbihang' | 'danggiaohang' | 'hoanthanh' | 'dahuy';
  TongTien: number;
}

export function Account() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { addToCart } = useCart();
  const [profileData, setProfileData] = useState({ fullName: '', email: '', phone: '', address: '' });
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) { navigate('/login'); return; }
    const userData = JSON.parse(loggedInUser); setUser(userData);
    if (userData.customer_id) {
      fetch(`${API_BASE}/account.php?action=get_profile&customer_id=${userData.customer_id}`).then(res => res.json()).then(data => { if(data.success) setProfileData(data.data) });
      fetchOrdersData(userData.customer_id);
      fetch(`${API_BASE}/wishlist.php?action=list&customer_id=${userData.customer_id}`).then(res => res.json()).then(data => { if(data.success) setWishlist(data.data) });
    }
  }, [navigate]);

  const fetchOrdersData = (custId: any) => {
    fetch(`${API_BASE}/orders.php?action=list&customer_id=${custId}`).then(res => res.json()).then(data => { if(data.success) setOrders(data.data) });
  };

  const handleCancelOrder = (orderId: number) => {
    if (!window.confirm('BẠN CHẮC CHẮN MUỐN HỦY ĐƠN HÀNG NÀY?')) return;
    fetch(`${API_BASE}/orders.php?action=cancel_order`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ order_id: orderId, customer_id: user.customer_id }) })
    .then(res => res.json()).then(data => { if(data.success) { alert('Đã hủy đơn hàng!'); fetchOrdersData(user.customer_id); } else { alert(data.message); } });
  };

  const handleProfileChange = (field: string, value: string) => setProfileData(prev => ({ ...prev, [field]: value }));

  const handleSaveProfile = () => {
    if(!user || !user.customer_id) return;
    fetch(`${API_BASE}/account.php?action=update_profile`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ customer_id: user.customer_id, ...profileData }) })
    .then(res => res.json()).then(data => { if(data.success) { alert("Đã lưu thông tin."); setIsEditing(false); } else { alert(data.message); } });
  };

  const handleRemoveWishlist = (productId: number) => {
    if(!user || !user.customer_id) return;
    fetch(`${API_BASE}/wishlist.php?action=remove`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ customer_id: user.customer_id, product_id: productId }) })
    .then(res => res.json()).then(data => { if(data.success) setWishlist(wishlist.filter(i => i.id != productId)); });
  };

  const getStatusClass = (status: Order['TrangThai']) => {
    const map: Record<string, string> = { choxacnhan: 'order-status--pending', daxacnhan: 'order-status--confirmed', dangchuanbihang: 'order-status--processing', danggiaohang: 'order-status--shipping', hoanthanh: 'order-status--completed', dahuy: 'order-status--canceled' };
    return map[status] || '';
  };

  const getStatusText = (status: Order['TrangThai']) => {
    const texts: Record<string, string> = { choxacnhan: 'Chờ xác nhận', daxacnhan: 'Đã xác nhận', dangchuanbihang: 'Đang xử lý', danggiaohang: 'Đang giao', hoanthanh: 'Đã giao', dahuy: 'Đã hủy' };
    return texts[status] || status;
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  const formatPrice = (price: number | string) => Number(price).toLocaleString('vi-VN') + 'đ';

  const tabs = [
    { id: 'profile' as Tab, label: 'TÀI KHOẢN', icon: User },
    { id: 'orders' as Tab, label: 'ĐƠN HÀNG', icon: Package },
    { id: 'wishlist' as Tab, label: 'WISHLIST', icon: Heart },
  ];

  return (
    <div className="page page--gray" style={{ padding: '2rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Quản Lý Tài Khoản</h1>
          <p style={{ color: 'var(--gray-600)' }}>Xin chào, {profileData.fullName || user?.name || ''}</p>
        </div>

        {/* Tabs */}
        <div className="account-tabs">
          <div className="account-tabs-inner">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`account-tab ${activeTab === tab.id ? 'account-tab--active' : ''}`}>
                  <Icon style={{ width: 20, height: 20 }} /> {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="account-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>Thông tin cá nhân</h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="neo-btn neo-btn--secondary neo-btn--sm"><Edit2 style={{ width: 16, height: 16 }} /> Chỉnh sửa</button>
                ) : (
                  <button onClick={handleSaveProfile} className="neo-btn neo-btn--primary neo-btn--sm"><Save style={{ width: 16, height: 16 }} /> Lưu thông tin</button>
                )}
              </div>
              <div className="grid-2-col" style={{ gap: '1.5rem' }}>
                <div className="form-group"><label className="neo-label">Họ và tên</label><input type="text" value={profileData.fullName} onChange={(e) => handleProfileChange('fullName', e.target.value)} disabled={!isEditing} className="neo-input" /></div>
                <div className="form-group"><label className="neo-label">Email</label><input type="email" value={profileData.email} disabled className="neo-input" style={{ background: 'var(--gray-200)' }} title="Không thể đổi email" /></div>
                <div className="form-group"><label className="neo-label">Số điện thoại</label><input type="tel" value={profileData.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} disabled={!isEditing} className="neo-input" /></div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}><label className="neo-label">Địa chỉ nhận hàng</label><textarea value={profileData.address || ''} onChange={(e) => handleProfileChange('address', e.target.value)} disabled={!isEditing} rows={3} className="neo-textarea" /></div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Đơn hàng của tôi</h2>
              {orders.length === 0 ? (
                <div className="empty-state empty-state--dashed">
                  <Package style={{ width: 64, height: 64, color: 'var(--gray-300)', margin: '0 auto 1rem' }} />
                  <p className="empty-state-desc">Bạn chưa có đơn hàng nào</p>
                  <Link to="/shop" className="neo-btn neo-btn--primary neo-btn--sm">Mua sắm ngay</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {orders.map((order) => (
                    <div key={order.MaDH} className="order-card">
                      <div className="order-card-header">
                        <div>
                          <h3 style={{ fontWeight: 700, fontSize: '1.125rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Đơn hàng #{order.MaDH}</h3>
                          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gray-500)' }}>{formatDate(order.NgayDat)}</p>
                        </div>
                        <span className={`order-status ${getStatusClass(order.TrangThai)}`}>{getStatusText(order.TrangThai)}</span>
                      </div>
                      <div style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--gray-500)' }}>TỔNG TIỀN: </span><span style={{ fontSize: '1.125rem' }}>{formatPrice(order.TongTien)}</span>
                      </div>
                      <div className="order-actions">
                        <Link to={`/order/${order.MaDH}`} className="neo-btn neo-btn--secondary neo-btn--sm">Chi tiết</Link>
                        {(order.TrangThai === 'choxacnhan' || order.TrangThai === 'daxacnhan' || order.TrangThai === 'dangchuanbihang') && (
                          <button onClick={() => handleCancelOrder(order.MaDH)} className="neo-btn neo-btn--danger neo-btn--sm">Hủy đơn hàng</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Sản phẩm yêu thích</h2>
              {wishlist.length === 0 ? (
                <div className="empty-state empty-state--dashed">
                  <Heart style={{ width: 64, height: 64, color: 'var(--gray-300)', margin: '0 auto 1rem' }} />
                  <p className="empty-state-desc">Danh sách yêu thích trống</p>
                  <Link to="/shop" className="neo-btn neo-btn--primary neo-btn--sm">Khám phá</Link>
                </div>
              ) : (
                <div className="grid-4-col">
                  {wishlist.map((item) => (
                    <div key={item.id} className="product-card">
                      <Link to={`/product/${item.id}`} className="product-card-image"><img src={item.image} alt={item.title} /></Link>
                      <div className="product-card-body">
                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', marginBottom: '0.5rem', display: 'block' }}>
                          <h3 className="product-card-name line-clamp-1">{item.title}</h3>
                          <p className="product-card-artist line-clamp-1">{item.artist}</p>
                        </Link>
                        <div style={{ marginBottom: '1rem' }}><span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatPrice(item.price)}</span></div>
                        <div className="product-card-footer" style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => addToCart({ id: item.id, title: item.title, artist: item.artist, price: item.price, image: item.image, stock: item.stock || 99 })} className="neo-btn neo-btn--primary neo-btn--sm" style={{ flex: 1 }}>VÀO GIỎ</button>
                          <button onClick={() => handleRemoveWishlist(item.id)} className="neo-btn neo-btn--danger neo-btn--sm" title="Xóa"><Trash2 style={{ width: 16, height: 16 }} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}