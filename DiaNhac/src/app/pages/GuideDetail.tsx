import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Info } from 'lucide-react';
import { guides, Guide } from '../data/guides';

export function GuideDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const guide = guides.find(g => g.id === Number(id));

  if (!guide) {
    return (
      <div className="page page--white page-centered">
        <div className="neo-box" style={{ textAlign: 'center', maxWidth: '28rem', padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>Không tìm thấy hướng dẫn</h2>
          <Link to="/guides" className="neo-btn neo-btn--primary">Quay lại Cẩm Nang</Link>
        </div>
      </div>
    );
  }

  const getDifficultyClass = (difficulty: Guide['difficulty']) => {
    const map: Record<string, string> = { 'Dễ': 'badge--easy', 'Trung bình': 'badge--medium', 'Nâng cao': 'badge--hard' };
    return map[difficulty] || 'badge--medium';
  };

  return (
    <div className="page page--gray" style={{ paddingBottom: '4rem' }}>
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '56rem' }}>
        <button onClick={() => navigate(-1)} className="neo-btn neo-btn--secondary neo-btn--sm" style={{ marginBottom: '1.5rem', width: 'max-content' }}>
          <ArrowLeft style={{ width: 20, height: 20 }} /> QUAY LẠI
        </button>

        <article className="neo-box" style={{ padding: 0 }}>
          <div className="article-detail-hero article-detail-hero--standard" style={{ borderBottom: '2px solid #000' }}>
            <img src={guide.image} alt={guide.title} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }} />
            <div className={`article-detail-badge ${getDifficultyClass(guide.difficulty)}`} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>ĐỘ KHÓ: {guide.difficulty}</div>
            <div className="article-detail-badge badge--dark" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>{guide.category}</div>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase', lineHeight: 1.2, fontFamily: 'var(--font-heading)' }}>{guide.title}</h1>

            <div className="prose">
              <p style={{ fontSize: '1.25rem', fontWeight: 700, background: 'var(--gray-100)', padding: '1.5rem', border: '2px solid #000', display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <Info style={{ width: 32, height: 32, flexShrink: 0, marginTop: '0.25rem' }} />
                {guide.description}
              </p>
              <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '0.5rem', textTransform: 'uppercase' }}>Bước 1: Chuẩn bị dụng cụ</h3>
              <ul>
                <li>Bộ chảo cọ làm sạch chuyên dụng</li>
                <li>Dung dịch vệ sinh đĩa than (được kiểm định)</li>
                <li>Khăn lau sợi Microfiber siêu mịn</li>
              </ul>
              <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '0.5rem', textTransform: 'uppercase' }}>Bước 2: Tiến hành vệ sinh</h3>
              <p>Đặt đĩa than lên một mặt phẳng sạch, có lót nhung bảo vệ. Xịt một lượng vừa đủ dung dịch trải đều bề mặt. Dùng chảo cọ đưa theo chiều các rãnh đĩa từ trong ra ngoài...</p>
              <div style={{ padding: '1.5rem', background: 'var(--color-warning)', border: '2px solid #000', margin: '2rem 0', fontWeight: 700, textTransform: 'uppercase' }}>
                <p style={{ marginBottom: 0 }}>Lưu ý quan trọng: Tuyệt đối không xịt trực tiếp bất kỳ hóa chất gia dụng nào lên bề mặt đĩa than để tránh phá hủy rãnh âm thanh.</p>
              </div>
              <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '0.5rem', textTransform: 'uppercase' }}>Bước 3: Bảo quản</h3>
              <p>Sau khi lau khô bằng khăn Microfiber, hãy cất trữ đĩa trong bao chống tĩnh điện Polyethylene rồi nhét vào bìa giấy cứng. Đặt đĩa dựng thẳng đứng tại nơi khô ráo, tránh ánh sáng mặt trời!</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
