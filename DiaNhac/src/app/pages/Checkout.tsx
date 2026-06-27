import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_BASE } from '../config/api';


export function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart, appliedDiscount, setAppliedDiscount } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [payosModalData, setPayosModalData] = useState<any>(null);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddrId, setSelectedAddrId] = useState<any>(null);
  const [orderNote, setOrderNote] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrForm, setNewAddrForm] = useState({ recipientName: '', recipientPhone: '', address: '' });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if(loggedInUser) {
      const u = JSON.parse(loggedInUser); setUser(u);
      if(u.customer_id) {
        fetch(`${API_BASE}/account.php?action=get_addresses&customer_id=${u.customer_id}`)
        .then(res => res.json())
        .then(addrData => {
          if(addrData.success && addrData.data && addrData.data.length > 0) { setSavedAddresses(addrData.data); setSelectedAddrId(addrData.data[0].MaDC); }
          else {
            fetch(`${API_BASE}/account.php?action=get_profile&customer_id=${u.customer_id}`)
            .then(res => res.json()).then(data => {
              if(data.success && data.data && (data.data.address || data.data.phone)) {
                const profileAddr = { MaDC: 'default_profile', TenNguoiNhan: data.data.full_name || '', SDTNhan: data.data.phone || '', DiaChiChiTiet: data.data.address || '' };
                setSavedAddresses([profileAddr]); setSelectedAddrId('default_profile');
              }
            });
          }
        });
      }
    } else { alert("Bạn cần đăng nhập để tiến hành đặt hàng!"); navigate('/login', { state: { returnUrl: '/checkout' } }); }
  }, [navigate]);

  if (items.length === 0) {
    return (
      <div className="page page--gray page-centered">
        <div className="empty-state" style={{ maxWidth: '28rem', padding: '3rem' }}>
          <ShoppingBag className="empty-state-icon" />
          <h2 className="empty-state-title">Giỏ hàng trống</h2>
          <p className="empty-state-desc">Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
          <Link to="/shop" className="neo-btn neo-btn--primary">MUA SẮM NGAY</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = savedAddresses.find(a => a.MaDC === selectedAddrId);
    if (!selected) { alert('Vui lòng chọn hoặc thêm địa chỉ giao hàng!'); return; }
    if (!selected.NguoiNhan || !selected.SoDienThoai || !selected.DiaChi) { alert('Thông tin địa chỉ giao hàng không đầy đủ!'); return; }
    if (!user || !user.customer_id) { alert('Vui lòng Đăng nhập để tiến hành Thanh toán.'); navigate('/login'); return; }
    const isPayos = paymentMethod === 'online';
    const payload = { customer_id: user.customer_id, items: items.map(i => ({ id: i.id, qty: i.quantity, price: i.price })), total: getCartTotal(), address: selected.DiaChi, nguoiNhan: selected.NguoiNhan, sdtNhan: selected.SoDienThoai, ghiChu: orderNote, saveAddress: selected.isNew ? true : false, discountCode: appliedDiscount?.code || null, phuongThucThanhToan: isPayos ? 'payos' : 'cod', maGiaoDich: isPayos ? 'MOCK-PAYOS-' + Date.now() : null };
    if (isPayos) { if(!window.confirm(`Bạn sẽ được chuyển hướng tới cổng thanh toán PayOS.\nTổng tiền: ${getCartTotal().toLocaleString('vi-VN')}đ\nNhấn OK để tiếp tục.`)) return; }
    fetch(`${API_BASE}/orders.php?action=create`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) })
    .then(res => res.json()).then(data => {
      if(data.success) { if (isPayos && data.payos_data) { setPayosModalData({ ...data.payos_data, order_id: data.order_id }); } else { alert('Đặt hàng thành công! Mã đơn hàng: ' + data.order_id); clearCart(); navigate('/account'); } }
      else { alert('Lỗi đặt hàng: ' + data.message); }
    }).catch(err => { alert("Có lỗi xảy ra!"); console.error(err); });
  };

  const handleAddNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newAddrForm.recipientName.trim();
    const phone = newAddrForm.recipientPhone.trim();
    const address = newAddrForm.address.trim();

    if(!name || !phone || !address) return;

    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam (10 số, đầu 03, 05, 07, 08, 09).");
      return;
    }

    if (address.length < 10) {
      alert("Vui lòng nhập địa chỉ cụ thể hơn (tối thiểu 10 ký tự).");
      return;
    }

    const newAddr = { MaDC: 'new_' + Date.now(), NguoiNhan: name, SoDienThoai: phone, DiaChi: address, isNew: true };
    setSavedAddresses([newAddr, ...savedAddresses]); setSelectedAddrId(newAddr.MaDC); setShowAddressModal(false); setNewAddrForm({ recipientName: '', recipientPhone: '', address: '' });
  };

  useEffect(() => {
    if (!payosModalData) return;
    const interval = setInterval(() => {
      fetch(`${API_BASE}/orders.php?action=check_status&order_id=${payosModalData.order_id}`)
        .then(res => res.json()).then(data => { if (data.success && data.status === 'dathanhtoan') { clearInterval(interval); clearCart(); navigate('/payment-result?orderCode=' + payosModalData.orderCode); } }).catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, [payosModalData]);

  const handleCheckPaid = () => {
    fetch(`${API_BASE}/orders.php?action=check_status&order_id=${payosModalData.order_id}`)
    .then(res => res.json()).then(data => { if(data.success && data.status === 'dathanhtoan') { clearCart(); navigate('/payment-result?orderCode=' + payosModalData.orderCode); } else { alert('Hệ thống chưa ghi nhận thanh toán. Đang kiểm tra tự động mỗi 5 giây...'); } });
  };

  const handleApplyCoupon = () => {
    if (!couponInput) return; setCouponLoading(true);
    fetch(`${API_BASE}/discount.php?action=check`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: couponInput, cartTotal: getCartTotal() }) })
    .then(res => res.json()).then(data => { setCouponLoading(false); if (data.success) { setAppliedDiscount({ code: data.data.code, amount: data.data.discountAmount }); setCouponInput(''); } else { alert(data.message); } })
    .catch(() => { setCouponLoading(false); alert('Có lỗi xảy ra!'); });
  };

  const handleCancelPayos = () => { setPayosModalData(null); navigate('/cart'); };

  return (
    <div className="page page--gray">
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div className="page-header">
          <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>Thanh Toán</h1>
          <p className="page-subtitle">Hoàn tất đơn hàng của bạn</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Address Book */}
            <div className="neo-box">
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2 className="neo-box-title" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck style={{ width: 24, height: 24 }} /> Sổ Địa Chỉ Giao Hàng
                </h2>
                <button type="button" onClick={() => setShowAddressModal(true)} className="neo-btn neo-btn--primary neo-btn--sm">+ Thêm Mới</button>
              </div>

              {savedAddresses.length === 0 ? (
                <div className="empty-state empty-state--dashed" style={{ padding: '2rem' }}>
                  <p className="empty-state-desc">Bạn chưa có địa chỉ nào được lưu.</p>
                  <button type="button" onClick={() => setShowAddressModal(true)} style={{ color: '#000', textDecoration: 'underline', fontWeight: 700, textTransform: 'uppercase', background: 'none', border: 'none' }}>Nhấn vào đây để thêm địa chỉ giao hàng</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 700 }}>
                  {savedAddresses.map(addr => (
                    <label key={addr.MaDC} style={{ display: 'flex', alignItems: 'flex-start', padding: '1rem', border: `2px solid ${selectedAddrId === addr.MaDC ? '#000' : 'var(--gray-300)'}`, cursor: 'pointer', background: selectedAddrId === addr.MaDC ? '#fef9c3' : '#fff', transition: 'all 0.2s' }}>
                      <input type="radio" name="saved_address" style={{ width: '1.25rem', height: '1.25rem', accentColor: '#000', marginTop: '0.25rem' }} checked={selectedAddrId === addr.MaDC} onChange={() => setSelectedAddrId(addr.MaDC)} />
                      <div style={{ marginLeft: '0.75rem', flex: 1, fontSize: '0.875rem' }}>
                        <div style={{ textTransform: 'uppercase' }}>Người nhận: <span style={{ color: 'var(--color-danger)', fontSize: '1rem' }}>{addr.NguoiNhan}</span> - {addr.SoDienThoai}</div>
                        <div style={{ fontWeight: 500, marginTop: '0.25rem', textTransform: 'uppercase', color: 'var(--gray-700)' }}>{addr.DiaChi}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px dashed #000' }}>
                <label htmlFor="note" className="neo-label">Ghi chú đơn hàng (Tùy chọn)</label>
                <textarea id="note" rows={2} value={orderNote} onChange={(e) => setOrderNote(e.target.value)} className="neo-textarea" placeholder="LỜI NHẮN DÀNH CHO CỬA HÀNG" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="neo-box">
              <h2 className="neo-box-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard style={{ width: 24, height: 24 }} /> Phương Thức Thanh Toán</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <label style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '2px solid #000', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ width: '1.25rem', height: '1.25rem', accentColor: '#000' }} />
                  <div style={{ marginLeft: '0.75rem' }}>Thanh toán tiền mặt (COD)</div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '2px solid #000', cursor: 'pointer' }}>
                  <input type="radio" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} style={{ width: '1.25rem', height: '1.25rem', accentColor: '#000' }} />
                  <div style={{ marginLeft: '0.75rem' }}>Thanh toán Online (MoMo, VNPay)</div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="neo-box neo-box--shadow sticky-summary">
              <h2 className="neo-box-title">Đơn Hàng</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', border: '2px solid #000', padding: '0.5rem' }}>
                    <div style={{ width: '5rem', height: '5rem', flexShrink: 0, borderRight: '2px solid #000', overflow: 'hidden', background: 'var(--gray-100)' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                      <p className="line-clamp-1" style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>{item.title}</p>
                      <p style={{ fontSize: '0.875rem', fontWeight: 700 }}>x{item.quantity}</p>
                      <p style={{ fontSize: '0.875rem', fontWeight: 700 }}>{item.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid #000', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                <div className="flex-between"><span>Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)})</span><span>{getCartTotal().toLocaleString('vi-VN')}đ</span></div>
                <div className="flex-between" style={{ borderBottom: '2px solid #000', paddingBottom: '1rem' }}><span style={{ color: 'var(--gray-600)' }}>PHÍ VẬN CHUYỂN</span><span>Miễn phí</span></div>
                {appliedDiscount && (
                  <div className="flex-between" style={{ borderBottom: '2px dashed #000', paddingBottom: '1rem', color: 'var(--color-danger)' }}>
                    <span>GIẢM GIÁ ({appliedDiscount.code})</span><span>-{appliedDiscount.amount.toLocaleString('vi-VN')}đ</span>
                  </div>
                )}
                {!appliedDiscount && (
                  <div style={{ paddingBottom: '1rem', borderBottom: '2px solid #000' }}>
                    <label className="neo-label" style={{ fontSize: '0.75rem' }}>Mã Giảm Giá</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="text" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} className="neo-input" style={{ flex: 1, fontSize: '0.875rem' }} placeholder="NHẬP MÃ" />
                      <button type="button" onClick={handleApplyCoupon} disabled={couponLoading} className="neo-btn neo-btn--primary neo-btn--sm">{couponLoading ? '...' : 'ÁP DỤNG'}</button>
                    </div>
                  </div>
                )}
                <div className="flex-between" style={{ borderTop: '2px solid #000', paddingTop: '1rem', fontSize: '1.25rem', fontWeight: 900 }}>
                  <span>TỔNG TIỀN</span><span>{(getCartTotal() - (appliedDiscount?.amount || 0)).toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              <button type="submit" className="neo-btn neo-btn--primary neo-btn--full" style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Xác nhận Đặt hàng</button>
              <Link to="/cart" style={{ display: 'block', textAlign: 'center', fontWeight: 700, textTransform: 'uppercase' }}>← QUAY LẠI GIỎ HÀNG</Link>
            </div>
          </div>
        </form>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="neo-modal-overlay">
          <div className="neo-modal">
            <h2 className="neo-modal-title">Thêm Địa Chỉ Mới</h2>
            <form onSubmit={handleAddNewAddressSubmit} className="auth-form">
              <div className="form-group"><label className="neo-label">Tên người nhận *</label><input type="text" required minLength={2} value={newAddrForm.recipientName} onChange={e => setNewAddrForm({...newAddrForm, recipientName: e.target.value})} className="neo-input" placeholder="HỌ VÀ TÊN" /></div>
              <div className="form-group"><label className="neo-label">Số điện thoại *</label><input type="tel" required pattern="^(0[3|5|7|8|9])+([0-9]{8})$" title="Số điện thoại Việt Nam gồm 10 chữ số, bắt đầu bằng 03, 05, 07, 08 hoặc 09" value={newAddrForm.recipientPhone} onChange={e => setNewAddrForm({...newAddrForm, recipientPhone: e.target.value})} className="neo-input" placeholder="SỐ ĐIỆN THOẠI" /></div>
              <div className="form-group"><label className="neo-label">Địa chỉ giao hàng *</label><textarea required minLength={10} rows={3} value={newAddrForm.address} onChange={e => setNewAddrForm({...newAddrForm, address: e.target.value})} className="neo-textarea" placeholder="ĐỊA CHỈ CHI TIẾT" /></div>
              <div className="neo-modal-actions">
                <button type="submit" className="neo-btn neo-btn--primary" style={{ flex: 1 }}>LƯU & CHỌN</button>
                <button type="button" onClick={() => setShowAddressModal(false)} className="neo-btn neo-btn--secondary" style={{ flex: 1 }}>HỦY BỎ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PayOS QR Modal */}
      {payosModalData && (
        <div className="neo-modal-overlay">
          <div className="neo-modal" style={{ textAlign: 'center', maxWidth: '28rem' }}>
            <h2 className="neo-modal-title">Thanh Toán Đơn Hàng</h2>
            <p style={{ fontWeight: 700, color: 'var(--gray-600)', marginBottom: '1.5rem', borderBottom: '2px solid #000', paddingBottom: '1rem', fontSize: '0.875rem' }}>Vui lòng mở ứng dụng ngân hàng và quét mã QR bên dưới.</p>
            <div style={{ background: 'var(--gray-100)', padding: '1rem', border: '2px solid #000', display: 'inline-block', marginBottom: '1.5rem' }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(payosModalData.qrCode)}`} alt="QR Code" style={{ margin: '0 auto' }} />
            </div>
            <div style={{ textAlign: 'left', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', border: '2px solid #000', padding: '1rem', marginBottom: '1.5rem', background: '#fef9c3' }}>
              <p className="flex-between" style={{ marginBottom: '0.5rem' }}><span>Ngân hàng:</span><span>{payosModalData.bin}</span></p>
              <p className="flex-between" style={{ marginBottom: '0.5rem' }}><span>Chủ tk:</span><span>{payosModalData.accountName}</span></p>
              <p className="flex-between" style={{ marginBottom: '0.5rem' }}><span>Số tài khoản:</span><span>{payosModalData.accountNumber}</span></p>
              <p className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '1.125rem', color: 'var(--color-danger)' }}><span>Số tiền:</span><span>{payosModalData.amount.toLocaleString()}đ</span></p>
              <p className="flex-between"><span>Nội dung:</span><span>{payosModalData.description}</span></p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={handleCheckPaid} className="neo-btn neo-btn--yellow neo-btn--full shadow-neo-sm">Tôi Đã Thanh Toán</button>
              <button onClick={handleCancelPayos} className="neo-btn neo-btn--secondary neo-btn--full">Huỷ Lệnh Thanh Toán</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}