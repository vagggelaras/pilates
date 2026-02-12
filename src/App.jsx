import { useState, useEffect, useRef } from 'react'
import { Menu, X, Flower2, Users, Dumbbell, Baby, Heart, Clock, Phone, Mail, MapPin } from 'lucide-react'
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
    text: 'Μετά από χρόνια πόνους στη μέση, το Pilates στο SePilateVo μου άλλαξε τη ζωή. Η Ελένη είναι εξαιρετική!',
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

const schedule = [
  { time: '09:00 - 10:00', mon: 'Mat Pilates', tue: '—', wed: 'Mat Pilates', thu: '—', fri: 'Mat Pilates', sat: 'Mat Pilates' },
  { time: '10:00 - 11:00', mon: 'Reformer', tue: 'Reformer', wed: '—', thu: 'Reformer', fri: '—', sat: 'Group Session' },
  { time: '11:00 - 12:00', mon: 'Prenatal', tue: '—', wed: 'Recovery', thu: '—', fri: 'Prenatal', sat: '—' },
  { time: '17:00 - 18:00', mon: 'Reformer', tue: 'Mat Pilates', wed: 'Reformer', thu: 'Mat Pilates', fri: 'Reformer', sat: '—' },
  { time: '18:00 - 19:00', mon: 'Group Session', tue: 'Reformer', wed: 'Group Session', thu: 'Reformer', fri: 'Group Session', sat: '—' },
  { time: '19:00 - 20:00', mon: 'Personal', tue: 'Group Session', wed: 'Personal', thu: 'Group Session', fri: '—', sat: '—' },
]

/* ===== COMPONENTS ===== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="navbar-logo">SePilateVo</a>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <a href="#intro" onClick={() => setMenuOpen(false)}>Σχετικά</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Υπηρεσίες</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Κριτικές</a>
          <a href="#schedule" onClick={() => setMenuOpen(false)}>Πρόγραμμα</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Επικοινωνία</a>
          <a href="#schedule" className="navbar-cta" onClick={() => setMenuOpen(false)}>Κράτηση</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-decor-tl" />
      <div className="hero-decor-br" />
      <div className="hero-content">
        <p className="hero-tagline">SePilateVo Studio</p>
        <h1 className="hero-title">Κίνηση με Συνείδηση.</h1>
        <p className="hero-title-sub">Δύναμη με Αρμονία.</p>
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
    <section className="intro" id="intro">
      <div className="intro-inner fade-in" ref={ref}>
        <div className="section-divider" />
        <h2 className="intro-title">Καλώς ήρθατε στο SePilateVo</h2>
        <p className="intro-text">
          Στο SePilateVo πιστεύουμε ότι η άσκηση δεν είναι απλά κίνηση — είναι μια πράξη αγάπης
          προς τον εαυτό μας. Το studio μας δημιουργήθηκε με όραμα να προσφέρει ένα ζεστό,
          φιλόξενο χώρο όπου κάθε άνθρωπος μπορεί να ανακαλύψει τη δύναμη του σώματός του.
        </p>
        <p className="intro-text">
          Μέσα από εξατομικευμένα προγράμματα Pilates, συνδυάζουμε τη σωστή τεχνική με τη
          συνειδητή αναπνοή, βοηθώντας σας να χτίσετε δύναμη, ευλυγισία και ισορροπία —
          τόσο στο σώμα όσο και στο μυαλό.
        </p>
        <p className="intro-signature">Ελένη, η γυμνάστριά σας</p>
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

function Services() {
  const titleRef = useFadeIn()
  return (
    <section className="services" id="services">
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

function Testimonials() {
  const titleRef = useFadeIn()
  return (
    <section className="testimonials" id="testimonials">
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
      </div>
    </section>
  )
}

function Schedule() {
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const dayLabels = { mon: 'Δευτέρα', tue: 'Τρίτη', wed: 'Τετάρτη', thu: 'Πέμπτη', fri: 'Παρασκευή', sat: 'Σάββατο' }
  const dayLabelsShort = { mon: 'Δευ', tue: 'Τρι', wed: 'Τετ', thu: 'Πεμ', fri: 'Παρ', sat: 'Σαβ' }
  const titleRef = useFadeIn()
  const tableRef = useFadeIn()

  return (
    <section className="schedule" id="schedule">
      <div className="container">
        <div className="fade-in" ref={titleRef}>
          <div className="section-divider" />
          <h2 className="section-title">Εβδομαδιαίο Πρόγραμμα</h2>
          <p className="section-subtitle">
            Βρείτε το μάθημα που σας ταιριάζει και κλείστε τη θέση σας
          </p>
        </div>
        <div className="fade-in" ref={tableRef}>
          {/* Desktop table */}
          <div className="schedule-table-wrapper schedule-desktop">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Ώρα</th>
                  {days.map(d => <th key={d}>{dayLabelsShort[d]}</th>)}
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i}>
                    <td><strong>{row.time}</strong></td>
                    {days.map(d => (
                      <td key={d} className={row[d] === '—' ? 'no-class' : 'has-class'}>
                        {row[d]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="schedule-mobile">
            {days.map(d => {
              const classes = schedule.filter(row => row[d] !== '—')
              if (classes.length === 0) return null
              return (
                <div className="schedule-day-card" key={d}>
                  <h3 className="schedule-day-title">{dayLabels[d]}</h3>
                  <div className="schedule-day-classes">
                    {classes.map((row, i) => (
                      <div className="schedule-day-item" key={i}>
                        <span className="schedule-day-time">{row.time}</span>
                        <span className="schedule-day-name">{row[d]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="schedule-trainer">
            Όλα τα μαθήματα με τη γυμνάστρια <strong>Ελένη</strong>
          </p>
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
            +30 210 1234567</p>
          <p><Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
            info@sepilatevo.gr</p>
          <p><MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
            Αθήνα, Ελλάδα</p>
        </div>
        <div className="footer-col">
          <h4>Ωράριο</h4>
          <p>Δευτέρα - Παρασκευή: 09:00 - 21:00</p>
          <p>Σάββατο: 09:00 - 14:00</p>
          <p>Κυριακή: Κλειστά</p>
        </div>
      </div>
      <p className="footer-bottom">
        &copy; {new Date().getFullYear()} SePilateVo. Με αγάπη για την κίνηση.
      </p>
    </footer>
  )
}

/* ===== APP ===== */
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <Testimonials />
      <Schedule />
      <Footer />
    </>
  )
}

export default App
