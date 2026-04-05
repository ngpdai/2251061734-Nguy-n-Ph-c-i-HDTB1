import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { portfolioData } from '../data/mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Mail, Phone, MapPin, Clock, Facebook, Youtube, Globe, ChevronRight } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(lang || 'en');
  
  const data = portfolioData[language];

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'vi' : 'en';
    setLanguage(newLang);
    navigate(`/${newLang}`);
  };

  const navigateToDetail = (type, id) => {
    navigate(`/${language}/detail/${type}/${id}`);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="portfolio-nav">
        <div className="nav-content">
          <div className="nav-links">
            <button onClick={() => scrollToSection('hero')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('about')} className="nav-link">{data.about.title}</button>
            <button onClick={() => scrollToSection('experience')} className="nav-link">{data.experience.title}</button>
            <button onClick={() => scrollToSection('education')} className="nav-link">{data.education.title}</button>
            <button onClick={() => scrollToSection('skills')} className="nav-link">{data.skills.title}</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">{data.contact.title}</button>
          </div>
          <Button onClick={toggleLanguage} variant="outline" size="sm" className="lang-toggle">
            <Globe className="h-4 w-4 mr-2" />
            {language === 'en' ? 'VI' : 'EN'}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <Avatar className="hero-avatar">
            <AvatarImage 
              src="https://customer-assets.emergentagent.com/job_profile-deck-4/artifacts/z3hb0glu_image.png" 
              alt={data.name}
            />
            <AvatarFallback className="avatar-fallback">
              {data.name.split(' ').slice(-2).map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className="hero-name">{data.name}</h1>
          <p className="hero-title">{data.title}</p>
          <p className="hero-bio">{data.bio}</p>
          <Button onClick={() => scrollToSection('contact')} size="lg" className="hero-cta">
            {language === 'en' ? 'Get In Touch' : 'Liên Hệ'}
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="section-container">
          <h2 className="section-title">{data.about.title}</h2>
          <Card className="about-card">
            <CardContent className="about-content">
              <p className="about-text">{data.about.content}</p>
              <Separator className="my-6" />
              <h3 className="about-goals-title">
                {language === 'en' ? 'Career Goals' : 'Mục Tiêu Nghề Nghiệp'}
              </h3>
              <ul className="goals-list">
                {data.about.goals.map((goal, index) => (
                  <li key={index} className="goal-item">{goal}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section section-alt">
        <div className="section-container">
          <h2 className="section-title">{data.experience.title}</h2>
          <div className="timeline">
            {data.experience.jobs.map((job, index) => (
              <Card key={job.id} className="timeline-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="job-title">{job.position}</CardTitle>
                      <CardDescription className="company-name">{job.company}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="period-badge">{job.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="job-summary">{job.summary}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToDetail('job', job.id)}
                    className="details-toggle mt-3"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'View Details' : 'Xem Chi Tiết'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <div className="section-container">
          <h2 className="section-title">{data.education.title}</h2>
          {data.education.institutions.map((edu) => (
            <Card key={edu.id} className="education-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="school-name">{edu.school}</CardTitle>
                    <CardDescription className="degree-name">{edu.degree}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="period-badge">{edu.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="edu-summary">{edu.summary}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToDetail('education', edu.id)}
                  className="details-toggle mt-3"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'View Details' : 'Xem Chi Tiết'}
                </Button>
              </CardContent>
            </Card>
          ))}
          
          <div className="certifications-section">
            <h3 className="certifications-title">
              {language === 'en' ? 'Certifications' : 'Chứng Chỉ'}
            </h3>
            {data.education.certifications.map((cert) => (
              <Card key={cert.id} className="certification-card">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="cert-name">{cert.name}</CardTitle>
                    <Badge className="cert-score">Score: {cert.score}</Badge>
                  </div>
                  <CardDescription className="cert-date">{cert.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateToDetail('certification', cert.id)}
                    className="details-toggle"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'View Details' : 'Xem Chi Tiết'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-alt">
        <div className="section-container">
          <h2 className="section-title">{data.skills.title}</h2>
          
          {/* Technical Skills */}
          <div className="skills-category">
            <h3 className="skills-category-title">{data.skills.technical.category}</h3>
            <div className="skills-grid">
              {data.skills.technical.items.map((skill) => (
                <Card key={skill.id} className="skill-card">
                  <CardHeader>
                    <CardTitle className="skill-name">{skill.name}</CardTitle>
                    <Progress value={skill.level} className="skill-progress" />
                    <span className="skill-level">{skill.level}%</span>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateToDetail('tech-skill', skill.id)}
                      className="details-toggle"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'View Details' : 'Xem Chi Tiết'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="skills-category mt-8">
            <h3 className="skills-category-title">{data.skills.soft.category}</h3>
            <div className="soft-skills-grid">
              {data.skills.soft.items.map((skill) => (
                <Card key={skill.id} className="soft-skill-card">
                  <CardHeader>
                    <CardTitle className="soft-skill-name">{skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateToDetail('soft-skill', skill.id)}
                      className="details-toggle"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'View Details' : 'Xem Chi Tiết'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="section-container">
          <h2 className="section-title">{data.contact.title}</h2>
          <p className="contact-subtitle">{data.contact.subtitle}</p>
          
          <Card className="contact-card">
            <CardContent className="contact-content">
              <div className="contact-grid">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <p className="contact-label">{language === 'en' ? 'Email' : 'Email'}</p>
                    <a href={`mailto:${data.contact.info.email}`} className="contact-value">
                      {data.contact.info.email}
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div>
                    <p className="contact-label">{language === 'en' ? 'Phone' : 'Điện Thoại'}</p>
                    <a href={`tel:${data.contact.info.phone}`} className="contact-value">
                      {data.contact.info.phone}
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <p className="contact-label">{language === 'en' ? 'Location' : 'Vị Trí'}</p>
                    <p className="contact-value">{data.contact.info.location}</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <div>
                    <p className="contact-label">{language === 'en' ? 'Availability' : 'Khả Dụng'}</p>
                    <p className="contact-value">{data.contact.info.availability}</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="social-links">
                <h3 className="social-title">
                  {language === 'en' ? 'Connect With Me' : 'Kết Nối Với Tôi'}
                </h3>
                <div className="social-buttons">
                  {data.contact.social.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      className="social-button"
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      {social.icon === 'facebook' && <Facebook className="h-5 w-5 mr-2" />}
                      {social.icon === 'youtube' && <Youtube className="h-5 w-5 mr-2" />}
                      {social.platform}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2025 {data.name}. {language === 'en' ? 'All rights reserved.' : 'Bảo lưu mọi quyền.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
