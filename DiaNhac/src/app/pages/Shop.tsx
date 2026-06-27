import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Filter, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { API_BASE } from '../config/api';
import '../../styles/pages/shop.css';


const genres = [
  "Tất cả", "Đĩa Than (Vinyl)", "Cassette", "Máy Quay Đĩa (Turntable)", "Phụ Kiện",
  "ROCK", "ELECTRONIC", "POP", "JAZZ", "BLUES", "REGGAE", "LATIN", "CLASSICAL", 
  "SOUNDTRACK", "HIP HOP", "FUNK / SOUL", "FOLK", "WORLD", "CHILDREN'S", "CITY POP", 
  "STAGE & SCREEN", "VIỆT NAM", "CHRISTMAS", "SMOOTH JAZZ", "CLASSIC ROCK", 
  "BRASS & MILITARY", "JAPANESE JAZZ", "VOCAL JAZZ"
];

export function Shop() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleQuickAddCart = (e: React.MouseEvent, record: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (record.stock <= 0) return;
    addToCart({ id: record.id, title: record.title, artist: record.artist, price: record.price, image: record.image, stock: record.stock });
  };

  const handleQuickWishlist = (e: React.MouseEvent, record: any) => {
    e.preventDefault();
    e.stopPropagation();
    const userStr = localStorage.getItem('user');
    if (!userStr) { alert('Vui lòng đăng nhập để sử dụng tính năng yêu thích!'); return; }
    const user = JSON.parse(userStr);
    const customerId = user.customer_id;
    if (!customerId) return;

    if (isInWishlist(record.id)) {
      fetch(`${API_BASE}/wishlist.php?action=remove`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ customer_id: customerId, product_id: record.id })
      }).then(r => r.json()).then(d => { if (d.success) removeFromWishlist(record.id); });
    } else {
      fetch(`${API_BASE}/wishlist.php?action=add`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ customer_id: customerId, product_id: record.id })
      }).then(r => r.json()).then(d => {
        if (d.success) addToWishlist({ id: record.id, title: record.title, artist: record.artist, price: record.price, image: record.image, genre: record.genre, year: record.year });
        else alert(d.message);
      });
    }
  };

  useEffect(() => {
    fetch(`${API_BASE}/products.php?action=list`)
      .then(res => res.json())
      .then(data => {
        if(data.success && data.data) {
          setRecords(data.data);
        }
      })
      .catch(err => console.error("Error fetching records: ", err));
  }, []);

  const filteredRecords = records
    .filter((record) => {
      const matchesGenre = selectedGenre === 'Tất cả' || record.genre === selectedGenre;
      const matchesSearch = searchQuery === '' || 
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.artist && record.artist.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'year': return b.year - a.year;
        case 'name': default: return a.title.localeCompare(b.title);
      }
    });

  useEffect(() => {
    if (searchQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchQuery]);

  const formatPrice = (price: number) => {
    return Number(price).toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="page page--gray shop-page">
      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Header */}
        <div className="page-header page-header--thick">
          <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>CỬA HÀNG</h1>
          {searchQuery && (
            <p className="page-subtitle">
              Kết quả tìm kiếm cho: "{searchQuery}" ({filteredRecords.length} đĩa than)
            </p>
          )}
          {!searchQuery && (
            <p className="page-subtitle">
              Khám phá bộ sưu tập đầy đủ với {records.length} sản phẩm
            </p>
          )}
        </div>

        <div className="catalog-layout">
          {/* Filters Sidebar */}
          <aside className="catalog-sidebar">
            <div className="catalog-sidebar-box">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="catalog-filter-toggle"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Filter style={{ width: 20, height: 20 }} /> BỘ LỌC</span>
                <span>{showFilters ? '-' : '+'}</span>
              </button>

              <div className={`catalog-filter-content ${showFilters ? 'catalog-filter-content--open' : ''}`}>
                {/* Genre Filter */}
                <div className="catalog-filter-group">
                  <h3 className="catalog-filter-title">THỂ LOẠI</h3>
                  <div className="catalog-filter-list custom-scrollbar">
                    {genres.map((genre) => (
                      <label key={genre} className="catalog-filter-label">
                        <input
                          type="radio"
                          name="genre"
                          checked={selectedGenre === genre}
                          onChange={() => setSelectedGenre(genre)}
                          className="catalog-filter-radio"
                        />
                        <span className="catalog-filter-text">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="catalog-filter-title">SẮP XẾP THEO</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="catalog-select"
                  >
                    <option value="name">Tên (A-Z)</option>
                    <option value="price-low">Giá (Thấp đến Cao)</option>
                    <option value="price-high">Giá (Cao đến Thấp)</option>
                    <option value="year">Năm (Mới nhất)</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="catalog-main">
            {filteredRecords.length === 0 ? (
              <div className="empty-state">
                <p className="page-subtitle">Không tìm thấy sản phẩm phù hợp.</p>
              </div>
            ) : (
              <div className="grid-3-col" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {filteredRecords.map((record) => (
                  <Link
                    key={record.id}
                    to={`/product/${record.id}`}
                    className="product-card"
                  >
                    <div className="product-card-image">
                      <img src={record.image} alt={record.title} />
                      <div className="product-card-badge">
                        {record.genre}
                      </div>
                      {/* Quick Action Buttons */}
                      <div className="quick-actions">
                        <button
                          onClick={(e) => handleQuickWishlist(e, record)}
                          className={`quick-action-btn ${isInWishlist(record.id) ? 'quick-action-btn--active' : ''}`}
                          title="Yêu thích"
                        >
                          <Heart style={{ width: 20, height: 20 }} fill={isInWishlist(record.id) ? 'currentColor' : 'none'} />
                        </button>
                        {record.stock > 0 && (
                          <button
                            onClick={(e) => handleQuickAddCart(e, record)}
                            className="quick-action-btn quick-action-btn--cart"
                            title="Thêm vào giỏ hàng"
                          >
                            <ShoppingCart style={{ width: 20, height: 20 }} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="product-card-body">
                      <h3 className="product-card-name line-clamp-1">{record.title}</h3>
                      <p className="product-card-artist line-clamp-1">{record.artist}</p>
                      <div className="product-card-footer" style={{ marginTop: 'auto' }}>
                        <div>
                          <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                            <span className="product-card-price">{formatPrice(record.price)}</span>
                            <span className="product-card-year">{record.year}</span>
                          </div>
                          <div className="product-card-stock">
                            {record.stock > 0 ? (
                              <span className="stock-badge stock-badge--in">Còn hàng</span>
                            ) : (
                              <span className="stock-badge stock-badge--out">Hết hàng</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}