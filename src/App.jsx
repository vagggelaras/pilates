import { useState, useEffect, useRef, useCallback } from 'react'
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

/* ===== FULL-PAGE SCROLL HOOK ===== */
function useFullPageScroll() {
  const isScrolling = useRef(false)
  const currentSection = useRef(0)
  const touchStartY = useRef(0)

  const getSections = useCallback(() => {
    return document.querySelectorAll('.snap-section')
  }, [])

  const scrollToSection = useCallback((index) => {
    const sections = getSections()
    if (index < 0 || index >= sections.length || isScrolling.current) return
    isScrolling.current = true
    currentSection.current = index
    sections[index].scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      isScrolling.current = false
    }, 900)
  }, [getSections])

  const findCurrentSection = useCallback(() => {
    const sections = getSections()
    const scrollY = window.scrollY
    const viewportH = window.innerHeight
    let closest = 0
    let minDist = Infinity
    sections.forEach((sec, i) => {
      const dist = Math.abs(sec.offsetTop - scrollY - viewportH * 0.3)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })
    return closest
  }, [getSections])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (isScrolling.current) return
      const cur = findCurrentSection()
      if (e.deltaY > 0) {
        scrollToSection(cur + 1)
      } else {
        scrollToSection(cur - 1)
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isScrolling.current) return
      const diff = touchStartY.current - e.changedTouches[0].clientY
      const cur = findCurrentSection()
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          scrollToSection(cur + 1)
        } else {
          scrollToSection(cur - 1)
        }
      }
    }

    const handleKeyDown = (e) => {
      if (isScrolling.current) return
      const cur = findCurrentSection()
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        scrollToSection(cur + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        scrollToSection(cur - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [findCurrentSection, scrollToSection])

  return { scrollToSection, findCurrentSection }
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
    <section className="hero snap-section">
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
    <section className="intro snap-section" id="intro">
      <div className="intro-inner fade-in" ref={ref}>
        <div className="section-divider" />
        <h2 className="intro-title">Καλώς ήρθατε στο SePilateVo</h2>
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
    <section className="schedule snap-section" id="schedule">
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
            Όλα τα μαθήματα με τη γυμνάστρια <strong>Αγγελική</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer snap-section" id="contact">
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

/* ===== SECTION DOT NAV ===== */
const sectionNames = ['Αρχική', 'Σχετικά', 'Υπηρεσίες', 'Κριτικές', 'Πρόγραμμα', 'Επικοινωνία']

function DotNav({ scrollToSection }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target)
            if (index !== -1) setActive(index)
          }
        })
      },
      { threshold: 0.45 }
    )
    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
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
  const { scrollToSection } = useFullPageScroll()

  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <Services />
      <Testimonials />
      <Schedule />
      <Footer />
      <DotNav scrollToSection={scrollToSection} />
    </>
  )
}

export default App
