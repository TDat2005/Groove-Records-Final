import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, User } from 'lucide-react';
import { blogPosts, categories } from '../data/blog';

export function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredPosts = blogPosts.filter((post) => {
    return selectedCategory === 'Tất cả' || post.category === selectedCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="page page--gray" style={{ padding: '2rem 0' }}>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>CHUYÊN TRANG BÀI VIẾT</h1>
          <p className="page-subtitle">Tin tức, kiến thức và câu chuyện thú vị về thế giới âm nhạc Analog</p>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`category-filter-btn ${selectedCategory === category ? 'category-filter-btn--active' : ''}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid-3-col">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="article-card">
              <div className="article-card-image">
                <img src={post.image} alt={post.title} />
                <div className="article-card-category">{post.category}</div>
              </div>
              <div className="article-card-body">
                <h2 className="article-card-title line-clamp-2">{post.title}</h2>
                <p className="article-card-desc line-clamp-3">{post.description}</p>
                <div className="article-card-meta">
                  <div className="article-card-meta-item"><Calendar style={{ width: 16, height: 16 }} />{formatDate(post.date)}</div>
                  <div className="article-card-meta-item"><User style={{ width: 16, height: 16 }} />{post.author}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="empty-state" style={{ marginTop: '2rem' }}>
            <p className="page-subtitle">KHÔNG CÓ BÀI VIẾT NÀO TRONG MỤC NÀY.</p>
          </div>
        )}
      </div>
    </div>
  );
}
