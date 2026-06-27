import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, ShoppingCart, Check, Plus, Minus, Heart, Youtube } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState, useEffect } from 'react';
import { API_BASE } from '../config/api';
import '../../styles/pages/product-detail.css';


export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [record, setRecord] = useState<any>(null);
  const [relatedRecords, setRelatedRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE}/products.php?action=detail&id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setRecord(data.data);
          fetch(`${API_BASE}/products.php?action=list&category=${data.data.genre}`)
            .then(r => r.json())
            .then(d => {
              if (d.success && d.data) {
                setRelatedRecords(d.data.filter((i: any) => i.id != id).slice(0, 4));
              }
            });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const formatPrice = (price: number) => {
    return Number(price).toLocaleString('vi-VN') + 'đ';
  };

  if (loading) {
    return <div className="page page--gray page-centered" style={{ fontWeight: 700, fontSize: '1.25rem', textTransform: 'uppercase' }}>Đang tải...</div>;
  }

  if (!record) {
    return (
      <div className="page page--gray page-centered">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>Không tìm thấy sản phẩm</h2>
          <Link to="/shop" className="neo-btn neo-btn--primary">Quay lại cửa hàng</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (record) {
      addToCart({ id: record.id, title: record.title, artist: record.artist, price: record.price, image: record.image, stock: record.stock }, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (record) {
      addToCart({ id: record.id, title: record.title, artist: record.artist, price: record.price, image: record.image, stock: record.stock }, quantity);
      navigate('/checkout');
    }
  };

  const handleWishlistToggle = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) { alert('Vui lòng đăng nhập để sử dụng tính năng yêu thích!'); return; }
    const user = JSON.parse(userStr);
    const customerId = user.customer_id;
    if (!customerId) return;

    if (isInWishlist(record.id)) {
      fetch(`${API_BASE}/wishlist.php?action=remove`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ customer_id: customerId, product_id: record.id })
      }).then(res => res.json()).then(data => { if (data.success) removeFromWishlist(record.id); });
    } else {
      fetch(`${API_BASE}/wishlist.php?action=add`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ customer_id: customerId, product_id: record.id })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          addToWishlist({ id: record.id, title: record.title, artist: record.artist, price: record.price, image: record.image, genre: record.genre, year: record.year });
        } else { alert(data.message); }
      });
    }
  };

  const incrementQuantity = () => { if (quantity < record.stock) setQuantity(quantity + 1); };
  const decrementQuantity = () => { if (quantity > 1) setQuantity(quantity - 1); };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= record.stock) setQuantity(value);
  };

  return (
    <div className="pd-page">
      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="pd-back-btn">
          <ArrowLeft style={{ width: 20, height: 20 }} /> QUAY LẠI
        </button>

        {/* Product Details */}
        <div className="pd-grid">
          {/* Left Column */}
          <div className="flex-col flex-gap-8">
            <div className="pd-image-box">
              <div className="pd-image-frame">
                <img src={record.image} alt={record.title} />
              </div>
            </div>

            <div className="pd-notice">
              <h3 className="pd-notice-title">
                <ShoppingCart style={{ width: 24, height: 24 }} /> LƯU Ý KHI MUA HÀNG
              </h3>
              <ul className="pd-notice-list">
                <li>Vui lòng thanh toán 100% đơn hàng có <strong>sản phẩm PRE-ORDER</strong>.</li>
                <li>Giá sản phẩm <strong>PRE-ORDER</strong> cập nhật hàng tuần, Vọc Records sẽ liên hệ nếu có chênh lệch.</li>
                <li>Vận chuyển: Sản phẩm <strong>CÒN HÀNG 1-5 ngày</strong>, sản phẩm <strong>PRE-ORDER 2-5 tuần</strong>.</li>
                <li>Sản phẩm giá <strong>0 đ</strong> vui lòng <strong style={{ textDecoration: 'underline' }}>LIÊN HỆ</strong> để đặt hàng.</li>
                <li><strong>KHÔNG HUỶ/ HOÀN TIỀN</strong> sản phẩm PRE-ORDER.</li>
                <li>Khách hàng có thể <strong>HỦY ĐƠN HÀNG</strong> nếu cửa hàng chưa gửi cho đơn vị vận chuyển.</li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span className="pd-genre-badge">{record.genre}</span>
            </div>
            <h1 className="pd-title" style={{ fontFamily: 'var(--font-heading)' }}>{record.title}</h1>
            <p className="pd-artist">{record.artist}</p>

            <div style={{ marginBottom: '1.5rem' }}>
              <span className="pd-year-badge">NĂM PHÁT HÀNH: {record.year || 'N/A'}</span>
            </div>

            <div className="pd-price">{formatPrice(record.price)}</div>

            <div className="pd-stock">
              {record.stock > 0 ? (
                <div className="pd-stock-in">
                  <Check style={{ width: 20, height: 20 }} />
                  <span>CÒN HÀNG ({record.stock} SP)</span>
                </div>
              ) : (
                <span className="pd-stock-out">HẾT HÀNG</span>
              )}
            </div>

            <div className="pd-description">
              <h3>MÔ TẢ SẢN PHẨM</h3>
              <p>{record.description}</p>
            </div>

            {/* Quantity */}
            {record.stock > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 className="pd-qty-label">SỐ LƯỢNG</h3>
                <div className="qty-selector">
                  <button onClick={decrementQuantity} disabled={quantity <= 1} className="qty-btn" style={{ width: '3rem', height: '3rem' }}>
                    <Minus style={{ width: 16, height: 16 }} />
                  </button>
                  <input type="number" value={quantity} onChange={handleQuantityChange} min="1" max={record.stock} className="qty-input" />
                  <button onClick={incrementQuantity} disabled={quantity >= record.stock} className="qty-btn" style={{ width: '3rem', height: '3rem' }}>
                    <Plus style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>
            )}

            <div className="pd-actions">
              <div className="pd-actions-row">
                <button onClick={handleBuyNow} disabled={record.stock == 0} className="pd-btn-buy">
                  <ShoppingCart style={{ width: 24, height: 24 }} /> ĐẶT HÀNG NGAY
                </button>
                <Link to="/cart" className="pd-btn-goto-cart">TỚI GIỎ HÀNG</Link>
              </div>

              <div className="pd-actions-row">
                <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
                  <button onClick={handleAddToCart} disabled={record.stock == 0 || added} className="pd-btn-add">
                    {added ? <Check style={{ width: 20, height: 20 }} /> : <ShoppingCart style={{ width: 20, height: 20 }} />}
                    <span className="pd-btn-text">{added ? 'ĐÃ THÊM' : 'THÊM VÀO GIỎ'}</span>
                  </button>
                  <button onClick={handleWishlistToggle} className={`pd-btn-wishlist ${isInWishlist(record.id) ? 'pd-btn-wishlist--active' : ''}`}>
                    <Heart style={{ width: 20, height: 20 }} fill={isInWishlist(record.id) ? '#fff' : 'none'} />
                    <span className="pd-btn-text">{isInWishlist(record.id) ? 'ĐÃ LƯU' : 'YÊU THÍCH'}</span>
                  </button>
                </div>
                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(record.artist + ' ' + record.title + ' full album')}`} target="_blank" rel="noopener noreferrer" className="pd-btn-youtube">
                  <Youtube style={{ width: 24, height: 24 }} />
                  <span className="pd-btn-text">NGHE THỬ</span>
                </a>
              </div>
            </div>

            {/* Info Table */}
            <div className="pd-info-table">
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>THÔNG TIN ĐĨA</h3>
              <table>
                <tbody>
                  <tr><td>Thể Loại</td><td>{record.genre}</td></tr>
                  <tr><td>Định Dạng</td><td>{record.genre.includes('Vinyl') ? 'Vinyl (LP)' : record.genre.includes('Cassette') ? 'Cassette' : 'Thiết bị'}</td></tr>
                  <tr><td>Tình Trạng (Bìa/Đĩa)</td><td style={{ fontWeight: 700 }}>{record.stock > 0 ? 'Brand New (SS)' : 'N/A'}</td></tr>
                  <tr><td>Số Lượng</td><td>1 x {record.genre.includes('Vinyl') ? 'Vinyl' : 'Album'}</td></tr>
                  <tr><td>Năm Sản Xuất</td><td>{record.year || 'Đang cập nhật'}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Tracklist */}
            <div className="pd-tracklist">
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>TRACKLIST</h3>
              <ul>
                <li>1. Intro / Title Track</li>
                <li>2. Popular Song 1</li>
                <li>3. Popular Song 2</li>
                <li>4. Interlude</li>
                <li>5. Hidden Gem</li>
                <li>6. Acoustic Version</li>
                <li>7. Extended Mix</li>
                <li>8. Outro</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedRecords.length > 0 && (
          <section className="pd-related">
            <h2 style={{ fontFamily: 'var(--font-heading)' }}>Sản phẩm cùng thể loại ({record.genre})</h2>
            <div className="grid-4-col">
              {relatedRecords.map((r) => (
                <Link key={r.id} to={`/product/${r.id}`} className="product-card">
                  <div className="product-card-image">
                    <img src={r.image} alt={r.title} />
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-name line-clamp-1">{r.title}</h3>
                    <p className="product-card-artist line-clamp-1">{r.artist}</p>
                    <div className="product-card-footer">
                      <span className="product-card-price">{formatPrice(r.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="mobile-sticky-bar">
        <div>
          <span className="mobile-sticky-price-label">Tổng cộng</span>
          <span className="mobile-sticky-price">{formatPrice(record.price * quantity)}</span>
        </div>
        <button onClick={handleBuyNow} disabled={record.stock == 0} className="neo-btn neo-btn--primary active-neo shadow-neo-sm" style={{ flex: 1, fontSize: '0.875rem' }}>
          ĐẶT HÀNG NGAY
        </button>
      </div>
    </div>
  );
}