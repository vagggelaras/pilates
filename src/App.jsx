import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { Menu, X, Flower2, Users, Dumbbell, Baby, Heart, Clock, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import ShinyText from './reactBits/ShinyText'
import ScrollFloat from './reactBits/scroll-float'
import './App.css'

/* ===== FADE-IN HOOK ===== */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

/* ===== DATA ===== */
const services = [
  {
    icon: <Flower2 size={26} />,
    title: 'Mat Pilates',
    desc: 'Κλασικό Pilates στο στρώμα. Ενδυνάμωση του κορμού, βελτίωση της ευλυγισίας και της στάσης του σώματος με ασκήσεις χαμηλής κρούσης.',
  },
  {
    icon: <Dumbbell size={26} />,
    title: 'Reformer Pilates',
    desc: 'Προπόνηση με ειδικό μηχάνημα Reformer για πιο στοχευμένη ενδυνάμωση, αυξημένη αντίσταση και βαθύτερη εργασία στους μύες.',
  },
  {
    icon: <Users size={26} />,
    title: 'Group Sessions',
    desc: 'Ομαδικά μαθήματα σε μικρά γκρουπ για προσωπική προσοχή. Ιδανικά για κοινωνικοποίηση και κίνητρο μέσα από την ομάδα.',
  },
  {
    icon: <Heart size={26} />,
    title: 'Personal Training',
    desc: 'Εξατομικευμένο πρόγραμμα προπόνησης προσαρμοσμένο στις ανάγκες και τους στόχους σας. Ένα-προς-ένα καθοδήγηση.',
  },
  {
    icon: <Baby size={26} />,
    title: 'Prenatal Pilates',
    desc: 'Ειδικά σχεδιασμένο πρόγραμμα για εγκύους. Ήπιες ασκήσεις που βοηθούν στην προετοιμασία του σώματος για τον τοκετό.',
  },
  {
    icon: <Clock size={26} />,
    title: 'Recovery & Rehab',
    desc: 'Θεραπευτικό Pilates για αποκατάσταση τραυματισμών και χρόνιων πόνων. Συνεργασία με φυσικοθεραπευτές.',
  },
]

const testimonials = [
  {
    text: 'Μετά από χρόνια πόνους στη μέση, το Pilates στο SePilateVo μου άλλαξε τη ζωή. Η Αγγελική είναι εξαιρετική!',
    author: 'Μαρία Κ.',
    stars: 5,
  },
  {
    text: 'Ξεκίνησα ως αρχάρια και μέσα σε λίγους μήνες ένιωσα τεράστια διαφορά στο σώμα και την ενέργειά μου.',
    author: 'Κατερίνα Π.',
    stars: 5,
  },
  {
    text: 'Τα ομαδικά μαθήματα είναι φανταστικά! Η ατμόσφαιρα είναι ζεστή και η γυμνάστρια προσεκτική σε κάθε λεπτομέρεια.',
    author: 'Αγγελική Σ.',
    stars: 5,
  },
]


/* ===== COMPONENTS ===== */

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <a href="#" className="navbar-logo">SePilateVo</a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="navbar-links">
          <a href="#intro">Σχετικά</a>
          <a href="#services">Υπηρεσίες</a>
          <a href="#testimonials">Κριτικές</a>
          <a href="#schedule">Πρόγραμμα</a>
          <a href="#contact">Επικοινωνία</a>
          <a href="#schedule" className="navbar-cta">Κράτηση</a>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ menuOpen, setMenuOpen }) {
  const close = () => setMenuOpen(false)
  return (
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
      <a href="#intro" onClick={close}>Σχετικά</a>
      <a href="#services" onClick={close}>Υπηρεσίες</a>
      <a href="#testimonials" onClick={close}>Κριτικές</a>
      <a href="#schedule" onClick={close}>Πρόγραμμα</a>
      <a href="#contact" onClick={close}>Επικοινωνία</a>
      <a href="#schedule" className="navbar-cta" onClick={close}>Κράτηση</a>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero snap-section">
      <div className="hero-bg" />
      <div className="hero-decor-tl" />
      <div className="hero-decor-br" />
      <div className="hero-content">
        <p className="hero-tagline">SePilateVo Studio</p>
        <h1 className="hero-title">
          <ShinyText text="Κίνηση με Συνείδηση." color="#ffffff" shineColor="#f0d9b0" speed={4} />
        </h1>
        <p className="hero-title-sub">
          <ShinyText text="Δύναμη με Αρμονία." color="rgba(237, 230, 216, 0.7)" shineColor="#ffffff" speed={4} delay={1} />
        </p>
        <a href="#schedule" className="btn btn-primary">Κάνε Κράτηση</a>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}

function Intro() {
  const ref = useFadeIn()
  return (
    <section className="intro snap-section" id="intro">
      <div className="intro-inner fade-in" ref={ref}>
        <div className="section-divider" />
        <ScrollFloat 
          containerClassName="intro-title" 
          scrollStart="center bottom+=50%" 
          scrollEnd="center bottom-=70%"
        >Καλώς ήρθατε στο SePilateVo</ScrollFloat>
        <p className="intro-text">
          Στο SePilateVo πιστεύουμε ότι η άσκηση δεν είναι απλά μια κίνηση- είναι μια πράξη αγάπης
          προς τον εαυτό μας. Μέσα απο το πιλάτες προτρέπουμε σε μια ασταμάτητη διάθεση για
          θετικές σκέψεις που προέρχονται απο την κίνηση. Μέσα σε ένα ζεστό φιλόξενο χώρο
          εχουμε την τύχη μαζί σε όλη τη διάρκεια της χρονιάς να βλέπουμε μικρά θαύματα να
          συμβαίνουν κάθε μέρα. Αναγνωρίζουμε ότι υπάρχει ένας μόνο λόγος που συμβαίνει αυτό
          και είναι ότι φτάνουμε όλες στο σημείο να πιστέψουμε ότι μπορούμε με το μυαλό μας
          μπορούμε να κυριαρχήσουμε στο σώμα μας.
        </p>
        <p className="intro-text">
          Στο sepilatevo θα δίνουμε πάντα ένα συνεχή θετικό βομβαρδισμό επιτυχίας για να
          καταφέρνετε να πιστέψετε στην θετική τροφοδότηση απο τον ίδιο σας τον εαυτό.
          Σταματήστε να προδίδετε τις δυνάμεις σας και αφοσιωθείτε σε αυτές.
        </p>
        <p className="intro-signature">Αγγελική,  pilates instructor</p>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const ref = useFadeIn()
  return (
    <div className={`service-card fade-in fade-in-delay-${index + 1}`} ref={ref}>
      <div className="service-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
    </div>
  )
}

function ServicesMobileCarousel() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState('next')

  const prev = () => {
    setDir('prev')
    setCurrent((c) => (c === 0 ? services.length - 1 : c - 1))
  }
  const next = () => {
    setDir('next')
    setCurrent((c) => (c === services.length - 1 ? 0 : c + 1))
  }
  const goTo = (i) => {
    setDir(i > current ? 'next' : 'prev')
    setCurrent(i)
  }

  const s = services[current]

  return (
    <div className="services-carousel">
      <button className="carousel-arrow carousel-arrow-left" onClick={prev}>
        <ChevronLeft size={22} />
      </button>
      <div className="carousel-track">
        <div key={current} className={`carousel-card carousel-slide-${dir}`}>
          <div className="service-icon">{s.icon}</div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      </div>
      <button className="carousel-arrow carousel-arrow-right" onClick={next}>
        <ChevronRight size={22} />
      </button>
      <div className="carousel-dots">
        {services.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${current === i ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}

function Services() {
  const titleRef = useFadeIn()
  return (
    <section className="services snap-section" id="services">
      <div className="container">
        <div className="fade-in" ref={titleRef}>
          <div className="section-divider" />
          <h2 className="section-title">Οι Υπηρεσίες μας</h2>
          <p className="section-subtitle">
            Ανακαλύψτε το πρόγραμμα Pilates που ταιριάζει στις δικές σας ανάγκες
          </p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
        <ServicesMobileCarousel />
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }) {
  const ref = useFadeIn()
  return (
    <div className={`testimonial-card fade-in fade-in-delay-${index + 1}`} ref={ref}>
      <span className="testimonial-quote-icon">&ldquo;</span>
      <div className="testimonial-stars">
        {'★'.repeat(testimonial.stars)}
      </div>
      <p className="testimonial-text">{testimonial.text}</p>
      <p className="testimonial-author">{testimonial.author}</p>
    </div>
  )
}

function TestimonialsMobileCarousel() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState('next')

  const prev = () => {
    setDir('prev')
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  }
  const next = () => {
    setDir('next')
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))
  }
  const goTo = (i) => {
    setDir(i > current ? 'next' : 'prev')
    setCurrent(i)
  }

  const t = testimonials[current]

  return (
    <div className="testimonials-carousel">
      <button className="carousel-arrow carousel-arrow-left" onClick={prev}>
        <ChevronLeft size={22} />
      </button>
      <div className="carousel-track">
        <div key={current} className={`carousel-card testimonial-carousel-card carousel-slide-${dir}`}>
          <span className="testimonial-quote-icon">&ldquo;</span>
          <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
          <p className="testimonial-text">{t.text}</p>
          <p className="testimonial-author">{t.author}</p>
        </div>
      </div>
      <button className="carousel-arrow carousel-arrow-right" onClick={next}>
        <ChevronRight size={22} />
      </button>
      <div className="carousel-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${current === i ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}

function Testimonials() {
  const titleRef = useFadeIn()
  return (
    <section className="testimonials snap-section" id="testimonials">
      <div className="container">
        <div className="fade-in" ref={titleRef}>
          <div className="section-divider" />
          <h2 className="section-title">Τι Λένε για Εμάς</h2>
          <p className="section-subtitle" style={{ color: 'rgba(237, 230, 216, 0.6)' }}>
            Οι εμπειρίες των μαθητών μας μιλούν από μόνες τους
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
        <TestimonialsMobileCarousel />
      </div>
    </section>
  )
}

function Schedule() {
  const titleRef = useFadeIn()
  const contentRef = useFadeIn()

  return (
    <section className="schedule snap-section" id="schedule">
      <div className="container">
        <div className="fade-in" ref={titleRef}>
          <div className="section-divider" />
          <h2 className="section-title">Ωράριο & Κρατήσεις</h2>
          <p className="section-subtitle">
            Κλείστε τη θέση σας σε οποιοδήποτε μάθημα εντός του ωραρίου μας
          </p>
        </div>
        <div className="fade-in" ref={contentRef}>
          <div className="schedule-info">
            <div className="schedule-booking-card">
              <p className="schedule-booking-text">
                Όλα τα μαθήματα πραγματοποιούνται με τη γυμνάστρια
              </p>
              <p className="schedule-trainer-name">Αγγελική</p>
              <p className="schedule-booking-desc">
                Επικοινωνήστε μαζί μας για να κλείσετε θέση στο μάθημα που σας ενδιαφέρει
              </p>
              <a href="#contact" className="btn btn-primary">Επικοινωνία</a>
            </div>
            <div className="schedule-hours-card">
              <div className="schedule-hours-icon">
                <Clock size={28} />
              </div>
              <h3>Ωράριο Λειτουργίας</h3>
              <div className="schedule-hours-list">
                <div className="schedule-hours-row">
                  <span className="schedule-hours-days">Δευτέρα – Παρασκευή</span>
                  <span className="schedule-hours-time">09:00 – 21:00</span>
                </div>
                <div className="schedule-hours-row">
                  <span className="schedule-hours-days">Σάββατο</span>
                  <span className="schedule-hours-time">Κλειστά</span>
                </div>
                <div className="schedule-hours-row">
                  <span className="schedule-hours-days">Κυριακή</span>
                  <span className="schedule-hours-time">Κλειστά</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>SePilateVo</h4>
          <p className="footer-tagline">Κίνηση με Συνείδηση.<br />Δύναμη με Αρμονία.</p>
        </div>
        <div className="footer-col">
          <h4>Επικοινωνία</h4>
          <p><Phone size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
            +30 210 4820515</p>
          <p><Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
            info@sepilatevo.gr</p>
          <p><MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
            Άγιος Ιωάννης Ρέντης</p>
        </div>
        <div className="footer-col">
          <h4>Ωράριο</h4>
          <p>Δευτέρα - Παρασκευή: 09:00 - 21:00</p>
          <p>Σάββατο: Κλειστά</p>
          <p>Κυριακή: Κλειστά</p>
        </div>
      </div>
      <p className="footer-bottom">
        &copy; {new Date().getFullYear()} SePilateVo. Με αγάπη για την κίνηση.
      </p>
    </footer>
  )
}

/* ===== SECTION DOT NAV ===== */
const sectionNames = ['Αρχική', 'Σχετικά', 'Υπηρεσίες', 'Κριτικές', 'Πρόγραμμα', 'Επικοινωνία']

function DotNav() {
  const [active, setActive] = useState(0)

  const scrollToSection = (index) => {
    const sections = [...document.querySelectorAll('.snap-section'), document.getElementById('contact')]
    const target = sections[index]
    if (!target) return
    if (window.__lenis) {
      window.__lenis.scrollTo(target)
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const snapSections = [...document.querySelectorAll('.snap-section')]
    const contact = document.getElementById('contact')
    const sections = contact ? [...snapSections, contact] : snapSections

    const update = () => {
      let maxRatio = -1
      let bestIndex = 0
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect()
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        const ratio = visible / Math.min(rect.height, window.innerHeight)
        if (ratio > maxRatio) { maxRatio = ratio; bestIndex = i }
      })
      setActive(bestIndex)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="dot-nav">
      {sectionNames.map((name, i) => (
        <button
          key={i}
          className={`dot-nav-item ${active === i ? 'active' : ''}`}
          onClick={() => scrollToSection(i)}
          title={name}
        >
          <span className="dot-nav-dot" />
          <span className="dot-nav-label">{name}</span>
        </button>
      ))}
    </div>
  )
}

/* ===== APP ===== */
function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis()
    window.__lenis = lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => { lenis.destroy(); window.__lenis = null }
  }, [])

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Intro />
      <Services />
      <Testimonials />
      <Schedule />
      <Footer />
      <DotNav />
    </>
  )
}

export default App
