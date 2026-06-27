import { useState } from 'react';
import { Link } from 'react-router';
import { BookOpen } from 'lucide-react';
import { guides, guideCategories, Guide } from '../data/guides';

export function Guides() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredGuides = guides.filter((guide) => {
    return selectedCategory === 'Tất cả' || guide.category === selectedCategory;
  });

  const getDifficultyClass = (difficulty: Guide['difficulty']) => {
    const map: Record<string, string> = { 'Dễ': 'badge--easy', 'Trung bình': 'badge--medium', 'Nâng cao': 'badge--hard' };
    return map[difficulty] || 'badge--medium';
  };

  return (
    <div className="page page--gray" style={{ padding: '2rem 0' }}>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)' }}>HƯỚNG DẪN</h1>
          <p className="page-subtitle">Tất cả những gì bạn cần biết để bắt đầu và nâng cao kiến thức về vinyl</p>
        </div>

        <div className="category-filters">
          {guideCategories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} className={`category-filter-btn ${selectedCategory === category ? 'category-filter-btn--active' : ''}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid-3-col">
          {filteredGuides.map((guide) => (
            <Link key={guide.id} to={`/guide/${guide.id}`} className="article-card">
              <div className="article-card-image">
                <img src={guide.image} alt={guide.title} />
                <div className={`article-detail-badge ${getDifficultyClass(guide.difficulty)}`} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                  {guide.difficulty}
                </div>
                <div className="article-detail-badge badge--dark" style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                  {guide.category}
                </div>
              </div>
              <div className="article-card-body">
                <h2 className="article-card-title line-clamp-2">{guide.title}</h2>
                <p className="article-card-desc line-clamp-3">{guide.description}</p>
                <div className="article-card-meta">
                  <div className="article-card-meta-item"><BookOpen style={{ width: 20, height: 20 }} />Đọc Bài Viết</div>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="empty-state" style={{ marginTop: '2rem' }}>
            <p className="page-subtitle">KHÔNG TÌM THẤY HƯỚNG DẪN NÀO.</p>
          </div>
        )}
      </div>
    </div>
  );
}
