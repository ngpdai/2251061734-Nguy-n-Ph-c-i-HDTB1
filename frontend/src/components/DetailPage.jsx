import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { portfolioData } from '../data/mock';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft } from 'lucide-react';
import './DetailPage.css';

const DetailPage = () => {
  const { type, id, lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const language = lang || 'en';
  const data = portfolioData[language];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getItemData = () => {
    const itemId = parseInt(id);
    
    switch(type) {
      case 'job':
        return data.experience.jobs.find(job => job.id === itemId);
      case 'education':
        return data.education.institutions.find(edu => edu.id === itemId);
      case 'certification':
        return data.education.certifications.find(cert => cert.id === itemId);
      case 'tech-skill':
        return data.skills.technical.items.find(skill => skill.id === itemId);
      case 'soft-skill':
        return data.skills.soft.items.find(skill => skill.id === itemId);
      default:
        return null;
    }
  };

  const item = getItemData();

  if (!item) {
    return (
      <div className="detail-page-container">
        <div className="detail-page-error">
          <h2>Item not found</h2>
          <Button onClick={() => navigate(`/${language}`)} className="back-button">
            <ArrowLeft className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Back to Portfolio' : 'Quay Lại'}
          </Button>
        </div>
      </div>
    );
  }

  const getTitle = () => {
    if (type === 'job') return item.position;
    if (type === 'education') return item.degree;
    if (type === 'certification') return item.name;
    if (type === 'tech-skill' || type === 'soft-skill') return item.name;
    return '';
  };

  const getSubtitle = () => {
    if (type === 'job') return item.company;
    if (type === 'education') return item.school;
    if (type === 'certification') return `Score: ${item.score}`;
    if (type === 'tech-skill') return `${language === 'en' ? 'Proficiency' : 'Trình Độ'}: ${item.level}%`;
    return '';
  };

  const getPeriod = () => {
    if (type === 'job' || type === 'education') return item.period;
    if (type === 'certification') return item.date;
    return '';
  };

  return (
    <div className="detail-page-container fade-in">
      {/* Hero Section with Background */}
      <div 
        className={`detail-hero ${type === 'soft-skill' ? 'detail-hero-image' : ''}`}
        style={{ 
          background: type === 'soft-skill' && item.bgImage
            ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.bgImage}) center/cover no-repeat`
            : item.bgGradient 
        }}
      >
        <div className="detail-hero-overlay">
          <Button 
            onClick={() => navigate(`/${language}`)} 
            variant="outline" 
            className="back-button-hero"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Back to Portfolio' : 'Quay Lại'}
          </Button>
          
          <div className="detail-hero-content">
            <h1 className="detail-title">{getTitle()}</h1>
            {getSubtitle() && <p className="detail-subtitle">{getSubtitle()}</p>}
            {getPeriod() && (
              <Badge variant="secondary" className="detail-period">
                {getPeriod()}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="detail-content-section">
        <div className="detail-content-container">
          {/* Summary */}
          {item.summary && (
            <Card className="detail-card summary-card">
              <CardContent className="detail-card-content">
                <h2 className="detail-section-title">
                  {language === 'en' ? 'Overview' : 'Tổng Quan'}
                </h2>
                <p className="detail-summary">{item.summary}</p>
              </CardContent>
            </Card>
          )}

          {/* Details List */}
          {item.details && item.details.length > 0 && (
            <Card className="detail-card">
              <CardContent className="detail-card-content">
                <h2 className="detail-section-title">
                  {language === 'en' ? 'Key Responsibilities & Achievements' : 'Trách Nhiệm & Thành Tích Chính'}
                </h2>
                <ul className="detail-list">
                  {item.details.map((detail, index) => (
                    <li key={index} className="detail-list-item">
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Courses (for education) */}
          {item.courses && item.courses.length > 0 && (
            <Card className="detail-card">
              <CardContent className="detail-card-content">
                <h2 className="detail-section-title">
                  {language === 'en' ? 'Relevant Courses' : 'Các Môn Học Liên Quan'}
                </h2>
                <ul className="detail-list">
                  {item.courses.map((course, index) => (
                    <li key={index} className="detail-list-item">
                      {course}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Achievements (for education) */}
          {item.achievements && item.achievements.length > 0 && (
            <Card className="detail-card">
              <CardContent className="detail-card-content">
                <h2 className="detail-section-title">
                  {language === 'en' ? 'Achievements' : 'Thành Tích'}
                </h2>
                <ul className="detail-list">
                  {item.achievements.map((achievement, index) => (
                    <li key={index} className="detail-list-item">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Description (for skills) */}
          {item.description && type !== 'soft-skill' && (
            <Card className="detail-card">
              <CardContent className="detail-card-content">
                <h2 className="detail-section-title">
                  {language === 'en' ? 'Description' : 'Mô Tả'}
                </h2>
                <p className="detail-description">{item.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Detailed Description (for soft skills) */}
          {item.detailedDescription && type === 'soft-skill' && (
            <Card className="detail-card frosted-glass">
              <CardContent className="detail-card-content">
                <h2 className="detail-section-title">
                  {language === 'en' ? 'Detailed Description' : 'Mô Tả Chi Tiết'}
                </h2>
                <p className="detail-description">{item.detailedDescription}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
