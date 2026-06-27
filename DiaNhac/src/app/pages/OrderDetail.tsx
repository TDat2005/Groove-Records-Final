import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Package, Truck, CheckCircle2, Clock, XCircle, CreditCard } from 'lucide-react';
import { API_BASE } from '../config/api';


export function OrderDetail() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    const user = loggedInUser ? JSON.parse(loggedInUser) : null;
    const url = `${API_BASE}/orders.php?action=order_detail&order_id=${id}${user && user.customer_id ? `&customer_id=${user.customer_id}` : ''}`;
    fetch(url).then(res => res.json()).then(data => { if(data.success) setOrderData(data.data); setLoading(false); });
  }, [id]);

  if (loading) return <div className="page page--gray" style={{ paddingTop: '6rem', textAlign: 'center', fontWeight: 700 }}>ĐANG TẢI...</div>;

  if (!orderData || !orderData.info) {
    return (
      <div className="page page--gray" style={{ paddingTop: '6rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Không tìm thấy đơn hàng</h2>
        <Link to="/account" className="neo-btn neo-btn--primary">Quay lại</Link>
      </div>
    );
  }

  const { info, items } = orderData;
  const statuses = [
    { id: 'choxacnhan', label: 'CHỜ XÁC NHẬN', icon: Clock },
    { id: 'dangchuanbihang', label: 'ĐANG CHUẨN BỊ', icon: Package },
    { id: 'danggiaohang', label: 'ĐANG GIAO', icon: Truck },
    { id: 'hoanthanh', label: 'HOÀN THÀNH', icon: CheckCircle2 }
  ];
  let currentStatusIndex = statuses.findIndex(s => s.id === info.TrangThai);
  const isCanceled = info.TrangThai === 'dahuy';

  return (
    <div className="page page--gray" style={{ padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '56rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/account" style={{ color: '#000', fontWeight: 700, textTransform: 'uppercase', textDecoration: 'none' }}>← QUAY LẠI TÀI KHOẢN</Link>
          <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>CHI TIẾT ĐƠN HÀNG #{info.MaDH}</h1>
          <p style={{ color: 'var(--gray-600)', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.5rem' }}>ĐẶT NGÀY: {new Date(info.NgayDat).toLocaleString('vi-VN')}</p>
        </div>

        {/* Timeline */}
        <div className="neo-box neo-box--shadow" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 className="neo-box-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>TRẠNG THÁI ĐƠN HÀNG</h2>
          {isCanceled ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-danger)', border: '2px solid var(--color-danger)', padding: '1rem', fontWeight: 700, background: '#fef2f2' }}>
              <XCircle style={{ width: 32, height: 32 }} />
              <span style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>ĐƠN HÀNG ĐÃ BỊ HỦY</span>
            </div>
          ) : (
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '100%', height: '4px', background: 'var(--gray-200)', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', height: '4px', background: '#000', zIndex: 0, transition: 'all 0.5s', width: `${(Math.max(0, currentStatusIndex) / (statuses.length - 1)) * 100}%` }}></div>
              {statuses.map((s, idx) => {
                const Icon = s.icon;
                const isCompleted = idx <= currentStatusIndex;
                const isActive = idx === currentStatusIndex;
                return (
                  <div key={s.id} style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', transition: 'all 0.3s', background: isCompleted ? '#000' : 'var(--gray-200)', color: isCompleted ? '#fff' : 'var(--gray-400)' }}>
                      <Icon style={{ width: 24, height: 24 }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: isActive ? '#000' : isCompleted ? 'var(--gray-700)' : 'var(--gray-400)' }}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid-2-col" style={{ marginBottom: '2rem' }}>
          <div className="neo-box neo-box--shadow">
            <h3 className="neo-box-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Truck style={{ width: 20, height: 20 }} /> THÔNG TIN GIAO HÀNG</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>
              <p><span style={{ color: 'var(--gray-500)' }}>Người nhận:</span> {info.NguoiNhan || 'N/A'}</p>
              <p><span style={{ color: 'var(--gray-500)' }}>Số điện thoại:</span> {info.SDTNhan || 'N/A'}</p>
              <p><span style={{ color: 'var(--gray-500)' }}>Địa chỉ:</span> {info.DiaChiGiao}</p>
              <p><span style={{ color: 'var(--gray-500)' }}>Ghi chú:</span> {info.GhiChu || 'Không có'}</p>
            </div>
          </div>
          <div className="neo-box neo-box--shadow">
            <h3 className="neo-box-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard style={{ width: 20, height: 20 }} /> THÔNG TIN THANH TOÁN</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>
              <p><span style={{ color: 'var(--gray-500)' }}>Phương thức:</span> {info.ThanhToanHinhThuc?.toUpperCase() || 'COD'}</p>
              <p><span style={{ color: 'var(--gray-500)' }}>Trạng thái:</span>
                <span className={`status-badge ${info.TrangThaiTT === 'dathanhtoan' ? 'status-badge--done' : 'status-badge--pending'}`} style={{ marginLeft: '0.5rem' }}>
                  {info.TrangThaiTT === 'dathanhtoan' ? 'ĐÃ THANH TOÁN' : 'CHƯA THANH TOÁN'}
                </span>
              </p>
              {info.MaGiaoDich && <p><span style={{ color: 'var(--gray-500)' }}>Mã giao dịch:</span> {info.MaGiaoDich}</p>}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="neo-box neo-box--shadow">
          <h3 className="neo-box-title">SẢN PHẨM ĐÃ ĐẶT</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {items.map((item: any) => (
              <div key={item.MaCTDH} style={{ display: 'flex', gap: '1rem', border: '2px solid #000', padding: '1rem', alignItems: 'center' }}>
                <div style={{ width: '5rem', height: '5rem', background: 'var(--gray-100)', border: '2px solid #000', flexShrink: 0 }}>
                  <img src={item.HinhAnh} alt={item.TenSP} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 className="line-clamp-1" style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '1.125rem' }}>{item.TenSP}</h4>
                  <p className="line-clamp-1" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gray-600)' }}>{item.NgheSi}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, fontWeight: 700 }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>SL: {item.SoLuong}</p>
                  <p style={{ fontSize: '1.125rem' }}>{Number(item.DonGia).toLocaleString('vi-VN')}đ</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '2px solid #000', paddingTop: '1rem', textAlign: 'right' }}>
            <span style={{ fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', marginRight: '1rem' }}>TỔNG TIỀN PHẢI TRẢ:</span>
            <span style={{ fontSize: '1.875rem', fontWeight: 900 }}>{Number(info.TongTien).toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
