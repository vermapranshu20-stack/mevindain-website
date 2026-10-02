import React, { useEffect, useState } from "react";
import {
  Menu, X, Phone, MessageCircle, MapPin, Instagram, Gift,
  Scissors, Sparkles, Heart, Camera, Upload, ArrowRight, Clock
} from "lucide-react";

const PHONE = "7839437933";
const WHATSAPP = "917839437933";
const INSTAGRAM = "https://www.instagram.com/mevindain_/";
const ADDRESS = "Adarsh Nagar, Lakhimpur Road, Naipalapur, Near Embassy Tailor, Verma Brothers Street";

const services = [
  { icon: Gift, title: "Birthday Hampers", text: "Beautifully arranged birthday gift hampers made to match the person and occasion." },
  { icon: Scissors, title: "Boutique", text: "Boutique styling, custom looks and carefully selected fashion pieces." },
  { icon: Sparkles, title: "Handmade Crafts", text: "Creative handmade crafts for birthdays, celebrations, festivals and special moments." },
  { icon: Heart, title: "Customized Gifts", text: "Personalized gifts designed around your colors, theme, message and budget." },
  { icon: Gift, title: "Gift Wrapping", text: "Elegant wrapping and finishing touches that make every gift feel special." },
  { icon: Sparkles, title: "Festival Hampers", text: "Thoughtfully curated hampers for festivals, anniversaries and family celebrations." }
];

const starterGallery = [
  { title: "Birthday Hamper", image: "/images/hamper-placeholder.svg" },
  { title: "Gift Wrapping", image: "/images/wrapping-placeholder.svg" },
  { title: "Handmade Craft", image: "/images/craft-placeholder.svg" },
  { title: "Boutique Collection", image: "/images/boutique-placeholder.svg" },
  { title: "Bridal Entry Chaddar / Chunni", image: "/images/bridal-chaddar-placeholder.svg" }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gallery, setGallery] = useState(starterGallery);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("mevindain_gallery");
    if (saved) {
      try { setGallery([...starterGallery, ...JSON.parse(saved)]); } catch {}
    }
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const addPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve({ title: file.name, image: reader.result });
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(items => {
      const custom = [...gallery.filter((_, i) => i >= starterGallery.length), ...items];
      localStorage.setItem("mevindain_gallery", JSON.stringify(custom));
      setGallery([...starterGallery, ...custom]);
    });
    e.target.value = "";
  };

  const order = (service = "customized gift") => {
    const message = encodeURIComponent(
      `Hello Mevindain! I would like to enquire about ${service}. Please share the available options and prices.`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${message}`, "_blank");
  };

  return (
    <div className="site">
      <header className="header">
        <div className="container nav">
          <button className="logo" onClick={() => scrollTo("home")} aria-label="Mevindain home">
            <span className="logo-mark">M</span>
            <span><b>Mevindain</b><small>Crafts • Boutique • Gifts</small></span>
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {["home","about","services","gallery","contact"].map(item =>
              <button key={item} onClick={() => scrollTo(item)}>{item[0].toUpperCase()+item.slice(1)}</button>
            )}
            <button className="nav-cta" onClick={() => order("a customized gift")}>Order on WhatsApp</button>
          </nav>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-pattern"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={16}/> Handmade with love</p>
              <h1>Little things that make <em>big moments</em> beautiful.</h1>
              <p className="hero-text">
                Crafts, boutique styling, gift wrapping and customized hampers — thoughtfully made for birthdays, celebrations and every special occasion.
              </p>
              <div className="hero-buttons">
                <button className="btn primary" onClick={() => order("a birthday hamper")}>Create My Gift <ArrowRight size={18}/></button>
                <button className="btn secondary" onClick={() => scrollTo("gallery")}>View Gallery</button>
              </div>
              <div className="hero-trust">
                <span><Heart size={17}/> Handmade</span>
                <span><Gift size={17}/> Customized</span>
                <span><Sparkles size={17}/> Beautifully wrapped</span>
              </div>
            </div>
            <div className="hero-art">
              <div className="art-card main-card">
                <div className="art-ribbon">MEVINDAIN</div>
                <div className="gift-box"><span>🎁</span></div>
                <div className="art-caption"><b>Made for your moment</b><small>Custom gifts • Hampers • Crafts</small></div>
              </div>
              <div className="floating-card top">🎀 <b>Gift wrapping</b></div>
              <div className="floating-card bottom">✨ <b>Made with care</b></div>
            </div>
          </div>
        </section>

        <section className="quick-contact">
          <div className="container quick-grid">
            <a href={`tel:${PHONE}`}><Phone size={21}/><span><small>Call us</small><b>{PHONE}</b></span></a>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><MessageCircle size={21}/><span><small>WhatsApp</small><b>Chat with us</b></span></a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram size={21}/><span><small>Instagram</small><b>@mevindain_</b></span></a>
            <a href="#contact"><MapPin size={21}/><span><small>Visit us</small><b>Naipalapur</b></span></a>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="container two-col">
            <div className="photo-frame">
              <div className="photo-placeholder">
                <Heart size={52}/>
                <b>Your business photo</b>
                <span>Add your own photo in the Gallery section</span>
              </div>
              <div className="badge"><b>100%</b><span>made with care</span></div>
            </div>
            <div className="section-copy">
              <p className="eyebrow">Welcome to Mevindain</p>
              <h2>Thoughtful gifting, beautiful details.</h2>
              <p>
                Mevindain brings together handmade creativity, boutique style and beautiful gifting. Whether you are celebrating a birthday, anniversary, festival or simply want to make someone smile, we create pieces that feel personal.
              </p>
              <div className="feature-list">
                <div><span>01</span><b>Choose a theme</b><small>Tell us the occasion, colors and your budget.</small></div>
                <div><span>02</span><b>We create & arrange</b><small>We curate your gift, hamper or craft with care.</small></div>
                <div><span>03</span><b>Beautiful finishing</b><small>Everything is wrapped and prepared for your special moment.</small></div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section services">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">What we create</p>
              <h2>Our Services</h2>
              <p>Pick one service or combine them to create a completely customized gift experience.</p>
            </div>
            <div className="service-grid">
              {services.map(({icon: Icon, title, text}) =>
                <article className="service-card" key={title}>
                  <div className="service-icon"><Icon/></div>
                  <h3>{title}</h3><p>{text}</p>
                  <button onClick={() => order(title)} className="text-btn">Enquire now <ArrowRight size={16}/></button>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="hamper-banner">
          <div className="container hamper-grid">
            <div>
              <p className="eyebrow light">Your idea • Our creativity</p>
              <h2>Make every celebration beautifully memorable.</h2>
              <p>From birthday hampers to bridal entry chaddars and chunnis, tell us your theme, colors and budget. We can help you plan the perfect presentation.</p>
              <button className="btn light-btn" onClick={() => order("a customized birthday hamper or bridal entry chaddar/chunni")}>Plan My Gift <MessageCircle size={18}/></button>
            </div>
            <div className="hamper-visual">
              <div>🎂</div><div>🎁</div><div>💐</div><div>🍫</div><div>🧸</div>
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery">
          <div className="container">
            <div className="section-heading row-heading">
              <div><p className="eyebrow">Your work showcase</p><h2>Photo Gallery</h2><p>Add your own product photos below. They stay saved in this browser.</p></div>
              <label className="upload-btn"><Upload size={18}/> Add Photos<input type="file" accept="image/*" multiple onChange={addPhotos}/></label>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, i) =>
                <button className="gallery-card" key={i} onClick={() => setSelected(item)}>
                  <img src={item.image} alt={item.title}/>
                  <span>{item.title}</span>
                </button>
              )}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">Let's create something special</p>
              <h2>Contact Mevindain</h2>
              <p className="contact-intro">For orders, customized hampers, boutique enquiries or gift wrapping, call or WhatsApp us.</p>
              <div className="contact-items">
                <a href={`tel:${PHONE}`}><span className="contact-icon"><Phone/></span><span><small>Phone</small><b>{PHONE}</b></span></a>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><span className="contact-icon"><MessageCircle/></span><span><small>WhatsApp</small><b>Message Mevindain</b></span></a>
                <a href={INSTAGRAM} target="_blank" rel="noreferrer"><span className="contact-icon"><Instagram/></span><span><small>Instagram</small><b>@mevindain_</b></span></a>
                <div><span className="contact-icon"><MapPin/></span><span><small>Address</small><b>{ADDRESS}</b></span></div>
                <div><span className="contact-icon"><Clock/></span><span><small>Business Hours</small><b>Contact us for current timings</b></span></div>
              </div>
            </div>
            <div className="contact-card">
              <h3>Ready to place an order?</h3>
              <p>Send us your occasion, preferred items and approximate budget on WhatsApp.</p>
              <button className="btn primary full" onClick={() => order("a gift order")}>Start WhatsApp Enquiry <MessageCircle size={19}/></button>
              <a className="btn secondary full" href={`tel:${PHONE}`}><Phone size={18}/> Call {PHONE}</a>
              <div className="mini-note">📸 You can send reference photos on WhatsApp too.</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div><div className="footer-logo"><span className="logo-mark">M</span><b>Mevindain</b></div><p>Crafts • Boutique • Gifts</p></div>
          <div><p>© {new Date().getFullYear()} Mevindain. All rights reserved.</p><p>Made for beautiful moments.</p></div>
        </div>
      </footer>

      <a className="whatsapp-float" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle/></a>

      {selected && <div className="modal" onClick={() => setSelected(null)}>
        <div className="modal-box" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setSelected(null)}><X/></button>
          <img src={selected.image} alt={selected.title}/>
          <h3>{selected.title}</h3>
          <button className="btn primary full" onClick={() => order(selected.title)}>Enquire About This <MessageCircle size={18}/></button>
        </div>
      </div>}
    </div>
  );
}

export default App;