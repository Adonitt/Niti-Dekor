import { useState } from 'react'
import './App.css'

const phones = [
  { label: '044 949 053', tel: '+38344949053', wa: '38344949053' },
  { label: '043 880 989', tel: '+38343880989', wa: '38343880989' },
]
const services = [
  ['Ngjyrosje', 'Mure dhe tavane me përgatitje të kujdesshme dhe ngjyrën që i përshtatet ambientit.', 'paint'],
  ['Fasada', 'Punime të jashtme për pamje të rregullt dhe përfundim të përshtatur me objektin.', 'house'],
  ['Suvatim', 'Përgatitja dhe rrafshimi i sipërfaqeve para fazës së përfundimit.', 'wall'],
  ['Glet', 'Lëmimi i mureve dhe përgatitja e tyre për ngjyrosje të njëtrajtshme.', 'smooth'],
  ['Knauf', 'Pllaka gipsi për ndarje, tavane dhe detaje dekorative në ambiente.', 'knauf'],
  ['Montim i pllakave', 'Vendosje e pllakave në dysheme e mure, me kujdes te rreshtimi.', 'tiles'],
  ['Dekorime të brendshme', 'Detaje dhe përfundime të përshtatura me hapësirën dhe dëshirën tuaj.', 'spark'],
]
const faqs = [
  ['Kur bëhet matja?', 'Na tregoni shërbimin dhe lokacionin, ose na dërgoni fotografi në WhatsApp. Pastaj caktojmë bashkë një termin për matje në terren dhe e konfirmojmë kohën me telefon ose WhatsApp.'],
  ['Si llogaritet çmimi?', 'Çmimi varet nga sipërfaqja, gjendja dhe përgatitja e bazës, materiali dhe përfundimi, lartësia e objektit, qasja në hapësirë dhe kompleksiteti. Pas bisedës dhe matjes mund të përgatitet ofertë për projektin konkret.'],
  ['Po nëse nuk e di sipërfaqen?', 'Plotëso formularin me informacionin që ke. Fusha e sipërfaqes është opsionale; mund të dërgosh fotografi e detaje në WhatsApp.'],
  ['Në cilat zona punoni?', 'Niti Dekor është në Podujevë dhe punon edhe në komunat përreth. Na trego vendndodhjen e projektit që ta konfirmojmë disponueshmërinë.'],
]
function Logo() {
  return <a className="brand" href="#ballina" aria-label="Niti Dekor - ballina">
    <img src="/niti-dekor-logo-transparent.png" alt="" width="1107" height="722"/>
  </a>
}
function Icon({ type }) {
  const p = {
    paint: <><path d="M4 5h14v7H4zM18 8h3v8h-3M7 12v8m0 0h4m-4 0v2M7 5l8-3"/></>,
    house: <><path d="m3 11 9-8 9 8v10H3zM8 21v-7h8v7"/></>,
    wall: <><path d="M3 4h18v16H3zM3 10h18M3 16h18M9 4v6m6 0v6m-6 0v4"/></>,
    smooth: <><path d="M4 18 18 4l3 3L7 21H4zM13 9l3 3M7 15l3 3M4 21h17"/></>,
    knauf: <><path d="M4 4h16v16H4zM12 4v16M4 12h16"/></>,
    tiles: <><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19z"/></>,
  }
  return <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p[type]}</svg>
}
function WaIcon() {
  return <svg className="wa-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" stroke="currentColor" strokeWidth="1.8"/><path d="M8.3 7.7c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.4.7 1.1 1.4 1.8 1.8.3.2.5.2.7 0l.8-.9c.2-.2.4-.3.7-.1l1.7.8c.3.2.5.3.5.5s-.1 1-.6 1.5c-.5.5-1.3.8-2 .7-.7-.1-1.8-.5-3.1-1.6-1.3-1.1-2.2-2.4-2.5-3.2-.3-.8-.2-1.8.1-2.3Z" fill="currentColor"/></svg>
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  function sendRequest(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const selected = phones.find((p) => p.wa === data.get('contact')) || phones[0]
    const lines = [
      'Përshëndetje Niti Dekor, dua të kërkoj një ofertë për punë.',
      '',
      'Emri: ' + data.get('name'),
      'Telefoni: ' + data.get('phone'),
      'Shërbimi: ' + data.get('service'),
      'Lokacioni: ' + data.get('location'),
      'Sipërfaqja e përafërt: ' + (data.get('area') || 'Nuk e di ende'),
      'Koha e dëshiruar: ' + (data.get('timing') || 'Për t’u dakorduar'),
      'Detaje: ' + (data.get('notes') || '—'),
      '',
      'Mund t’ju dërgoj edhe fotografi të hapësirës në këtë bisedë.',
    ]
    window.open('https://wa.me/' + selected.wa + '?text=' + encodeURIComponent(lines.join(String.fromCharCode(10))), '_blank', 'noopener,noreferrer')
    setSent(true)
    event.currentTarget.reset()
  }
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>PUNIME PËR SHTËPI DHE BIZNESE</span><span>● &nbsp;Podujevë · Komunat përreth</span></div></div>
    <header className="header"><div className="container header-inner">
      <Logo />
      <button className={'menu-toggle ' + (menuOpen ? 'open' : '')} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Mbyll menynë' : 'Hap menynë'} aria-expanded={menuOpen}><i/><i/></button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Navigimi kryesor">
        {[['Shërbimet','#sherbimet'],['Punët','#punet'],['Procesi','#procesi'],['Çmimet','#cmimet'],['Pyetje','#pyetjet']].map(([t,h]) => <a key={h} href={h} onClick={closeMenu}>{t}</a>)}
        <a className="nav-button" href="#kerkesa" onClick={closeMenu}>Kërko ofertë <b>↗</b></a>
      </nav>
    </div></header>

    <main id="ballina">
      <section className="hero"><div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><i/> NITI DEKOR · PODUJEVË</div>
          <h1>Hapësira jote,<br/><em>e punuar</em> me kujdes.</h1>
          <p className="hero-text">Nga përgatitja e mureve deri te përfundimi final — punime të brendshme dhe fasada për shtëpi e biznese.</p>
          <div className="hero-actions"><a className="button red-button" href="#kerkesa">Kërko ofertë <b>↗</b></a><a className="button line-button" href="tel:+38344949053">Telefono tani <b>↗</b></a></div>
          <div className="hero-note"><span>✓</span><p><strong>Një bisedë e qartë.</strong><br/>Puna dhe çmimi vlerësohen sipas projektit tënd.</p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=82" alt="Imazh ilustrues i një ambienti të brendshëm modern" fetchPriority="high"/><span className="image-caption">Imazh ilustrues</span></div>
          <div className="image-card"><span className="card-monogram">N</span><div><b>Prej bazës te detaji</b><small>Një kontakt për disa lloje punimesh</small></div><span className="card-arrow">↗</span></div>
          <div className="vertical-label">INTERIOR · EXTERIOR · FINISH</div><span className="red-orb"/>
        </div>
      </div><div className="container hero-services"><span>NGJYROSJE</span><i>·</i><span>FASADA</span><i>·</i><span>KNAUF</span><i>·</i><span>DEKORIME</span></div></section>

      <section className="intro"><div className="container intro-inner"><span className="micro">NJË VEND PËR PUNIME TË NDRYSHME</span><p>Kur vjen koha për ta rregulluar një hapësirë, <strong>nisemi nga nevoja jote.</strong></p><a href="#sherbimet">Shiko shërbimet <b>↘</b></a></div></section>

      <section className="section services" id="sherbimet"><div className="container">
        <div className="section-heading"><div><span className="label">ÇFARË BËJMË</span><h2>Puna që e sjell<br/>hapësirën në jetë.</h2></div><p>Shërbime të ndryshme për një projekt të ri apo për freskimin e ambientit ekzistues.</p></div>
        <div className="service-grid">{services.map((s,i) => <article className="service-card" key={s[0]}><div className="service-top"><span>0{i+1}</span><Icon type={s[2]}/></div><h3>{s[0]}</h3><p>{s[1]}</p><a href="#kerkesa" aria-label={'Kërko ofertë për ' + s[0]}>↗</a></article>)}</div>
      </div></section>

      <section className="media" id="punet"><div className="container">
        <div className="section-heading media-heading"><div><span className="label">INSPIRIM PËR HAPËSIRËN</span><h2>Një pamje e re<br/>fillon me detajet.</h2></div><p><b>✳</b>Këto janë imazhe ilustruese. Fotografitë e punimeve reale të Niti Dekor shtohen sapo të jenë gati.</p></div>
        <div className="gallery">
          <figure className="gallery-card gallery-one"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80" alt="Imazh ilustrues i ambientit me përfundim modern" loading="lazy"/><span className="gallery-tag">PAMJE ILUSTRUESE</span><figcaption><small>01 / AMBIENT I BRENDSHËM</small><strong>Ngjyra, tekstura<br/>dhe dritë natyrale.</strong></figcaption></figure>
          <figure className="gallery-card gallery-two"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" alt="Imazh ilustrues i shtëpisë me fasadë të përfunduar" loading="lazy"/><span className="gallery-tag">PAMJE ILUSTRUESE</span><figcaption><small>02 / JASHTË</small><strong>Fasadë me<br/>pamje të pastër.</strong></figcaption></figure>
          <figure className="gallery-card gallery-three"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" alt="Imazh ilustrues i një hapësire të organizuar dhe të ndriçuar" loading="lazy"/><span className="gallery-tag">PAMJE ILUSTRUESE</span><figcaption><small>03 / PËRFUNDIMI</small><strong>Detajet e vogla<br/>bëjnë dallimin.</strong></figcaption></figure>
        </div>
      </div></section>

      <section className="section process" id="procesi"><div className="container process-grid">
        <div className="process-intro"><span className="label">SI ECËN PUNA</span><h2>Qartë që<br/>nga fillimi.</h2><p>Fillimisht kuptojmë çfarë të duhet, pastaj dakordohemi për matjen dhe ofertën.</p><a className="button dark-button" href="#kerkesa">Nis kërkesën <b>↗</b></a></div>
        <div className="steps">
          <article><span>01</span><div><h3>Na tregon për projektin</h3><p>Plotëso formularin ose na shkruaj me llojin e punës dhe lokacionin.</p></div></article>
          <article><span>02</span><div><h3>Caktojmë matjen</h3><p>Diskutojmë kohën që të përshtatet. Termini konfirmohet me telefon ose WhatsApp.</p></div></article>
          <article><span>03</span><div><h3>Përgatitet oferta</h3><p>Pas vlerësimit të sipërfaqes dhe punës, flasim për çmimin dhe detajet.</p></div></article>
        </div>
      </div></section>

      <section className="pricing" id="cmimet"><div className="container pricing-grid">
        <div className="pricing-copy"><span className="label">TRANSPARENCË PËR OFERTËN</span><h2>Çmimi varet<br/>nga projekti.</h2><p>Nuk ka një çmim të vetëm për çdo hapësirë. Vlerësimi bëhet sipas punës konkrete, që oferta t’i përshtatet nevojës tënde.</p><a className="button light-button" href="#kerkesa">Kërko vlerësim <b>↗</b></a></div>
        <div className="factors">{[['Sipërfaqja','Metra katrorë dhe numri i hapësirave.'],['Gjendja e bazës','Përgatitja, rrafshimi ose riparimet e nevojshme.'],['Materiali dhe përfundimi','Lloji i punës, materiali dhe pamja e kërkuar.'],['Qasja dhe kompleksiteti','Lartësia, qasja në objekt dhe detajet e projektit.']].map(([t,d],i)=><div className="factor" key={t}><span>0{i+1}</span><div><b>{t}</b><p>{d}</p></div><i>+</i></div>)}</div>
      </div></section>

      <section className="section request" id="kerkesa"><div className="container request-grid">
        <aside className="request-aside"><span className="label">KËRKESË PËR PUNË</span><h2>Na trego<br/>çfarë të duhet.</h2><p>Plotëso disa të dhëna. Kërkesa hapet në WhatsApp, ku mund të dërgosh edhe fotografi të hapësirës.</p><div className="request-note"><b>↗</b><p><strong>Pas kërkesës</strong><br/>E diskutojmë projektin dhe caktojmë kohën e matjes bashkë.</p></div><div className="direct-call"><span>Preferon të telefonosh?</span>{phones.map(p=><a href={'tel:' + p.tel} key={p.tel}>↗ &nbsp;{p.label}</a>)}</div></aside>
        <form className="request-form" onSubmit={sendRequest}><div className="form-head"><div><span>HAPI 01</span><h3>Detajet e projektit</h3></div><small>* Të domosdoshme</small></div>
          <div className="fields">
            <label>Emri dhe mbiemri *<input name="name" autoComplete="name" placeholder="Si quheni?" required/></label>
            <label>Numri i telefonit *<input name="phone" type="tel" autoComplete="tel" placeholder="p.sh. 044 000 000" required/></label>
            <label>Shërbimi që ju duhet *<select name="service" defaultValue="" required><option value="" disabled>Zgjidhni shërbimin</option>{services.map(s=><option key={s[0]}>{s[0]}</option>)}<option>Ende nuk jam i sigurt</option></select></label>
            <label>Lokacioni i punës *<input name="location" placeholder="Komuna / vendbanimi" required/></label>
            <label>Sipërfaqja e përafërt<div className="unit-input"><input name="area" inputMode="decimal" placeholder="p.sh. 80"/><span>m²</span></div></label>
            <label>Kur dëshironi ta nisni?<select name="timing" defaultValue=""><option value="">Zgjidhni një mundësi</option><option>Sa më shpejt që të jetë e mundur</option><option>Brenda 1 muaji</option><option>Brenda 3 muajve</option><option>Jam duke planifikuar</option></select></label>
            <label className="full-field">Detaje shtesë<textarea name="notes" rows="3" placeholder="Përshkruani shkurt punën…"/></label>
            <label className="full-field">Në cilin numër ta dërgojmë kërkesën? *<select name="contact" defaultValue={phones[0].wa}>{phones.map(p=><option key={p.wa} value={p.wa}>{p.label} · WhatsApp</option>)}</select></label>
          </div>
          <div className="form-foot"><p>Hapet një mesazh i gatshëm në WhatsApp. Dërgimin final e bën vetë në aplikacion.</p><button type="submit" className="button red-button"><WaIcon/> Dërgo kërkesën <b>↗</b></button></div>
          {sent && <p className="success" role="status">WhatsApp u hap me kërkesën e plotësuar. Kontrolloje mesazhin dhe shtyp “Dërgo”.</p>}
        </form>
      </div></section>

      <section className="faq" id="pyetjet"><div className="container faq-grid"><div><span className="label">PYETJE TË SHPESHTA</span><h2>Para se<br/>të fillojmë.</h2><p>Nëse ke pyetje tjetër, na telefono ose na shkruaj.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<i>+</i></summary><p>{a}</p></details>)}</div></div></section>

      <section className="contact-banner"><div className="container banner-inner"><div><span className="label">HAPI I PARË ËSHTË I THJESHTË</span><h2>Ke një projekt<br/>në mendje?</h2><p>Na trego ku dhe çfarë pune të duhet.</p></div><div className="banner-actions"><a href="#kerkesa" className="button light-button">Plotëso kërkesën <b>↗</b></a><a href="https://wa.me/38344949053?text=P%C3%ABrsh%C3%ABndetje%20Niti%20Dekor%2C%20dua%20t%C3%AB%20diskutoj%20p%C3%ABr%20nj%C3%AB%20projekt." target="_blank" rel="noreferrer" className="button ghost-button"><WaIcon/> WhatsApp <b>↗</b></a></div><span className="banner-mark">N</span></div></section>
    </main>

    <footer className="footer"><div className="container footer-main"><div className="footer-about"><Logo/><p>Punime të brendshme dhe fasada për shtëpi e biznese në Podujevë dhe rrethinë.</p></div><div className="footer-col"><b>SHËRBIMET</b><a href="#sherbimet">Punime të brendshme</a><a href="#sherbimet">Fasada dhe suvatim</a><a href="#sherbimet">Knauf dhe pllaka</a><a href="#cmimet">Si llogaritet çmimi</a></div><div className="footer-col"><b>KONTAKTO</b>{phones.map(p=><a className="footer-phone" href={'tel:' + p.tel} key={p.tel}>{p.label}</a>)}<a href="#kerkesa" className="footer-offer">Kërko ofertë ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Niti Dekor</span><span>Podujevë, Kosovë</span><a href="#ballina">Kthehu lart ↑</a></div></footer>
    <div className="mobile-bar"><a href="tel:+38344949053">☎ &nbsp;Telefono</a><a href="https://wa.me/38344949053?text=P%C3%ABrsh%C3%ABndetje%20Niti%20Dekor%2C%20dua%20t%C3%AB%20k%C3%ABrkoj%20nj%C3%AB%20ofert%C3%AB." target="_blank" rel="noreferrer"><WaIcon/> WhatsApp</a></div>
  </>
}
export default App



