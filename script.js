(function(){
  "use strict";

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- project data ---------- */
  var PROJECTS = {
    loopereco: {
      tag: "Marketplace · Live",
      title: "Loopereco",
      lede: "A food marketplace connecting local vendors with buyers — built to make discovering and ordering from nearby vendors as easy as browsing a feed.",
      stats: [["2","sided marketplace"],["Live","in market"],["NGN","native payments"]],
      problem: "Local food vendors had no simple digital storefront, and buyers had no single place to discover and order from them. Loopereco needed vendor onboarding, catalog management, ordering, and payment collection working together from day one.",
      approach: "Built as a React Native app on top of a Node.js/Express API, with a Postgres-backed catalog and order system. Vendor and buyer flows were designed separately but share the same order and payment pipeline underneath.",
      stack: ["React Native","Node.js","Express","PostgreSQL","Payments"]
    },
    termfees: {
      tag: "Fintech · Live",
      title: "TermFees",
      lede: "A payment collection platform built first for school fees, then generalized for multi-industry collection — with dedicated virtual accounts and instant WhatsApp confirmations.",
      stats: [["1:1","virtual accounts per payer"],["WhatsApp","payment alerts"],["Multi","industry ready"]],
      problem: "Schools and small institutions needed a reliable way to collect fees at scale without manual bank reconciliation, and payers needed confirmation they could trust without waiting on a receptionist.",
      approach: "Each payer gets a dedicated virtual account, so incoming payments reconcile automatically against the right record. A WhatsApp notification pipeline confirms payment the moment it lands, closing the loop without any manual follow-up.",
      stack: ["Node.js","Express","Virtual Accounts","WhatsApp API","MySQL"]
    },
    polykut: {
      tag: "AI · In development",
      title: "Polykut",
      lede: "An AI-driven document digitization platform — turning shelves of paper records into structured, searchable data. A proposal is in with Kwara State's Teaching Service Commission.",
      stats: [["OCR","+ structuring pipeline"],["Gov't","pilot proposed"],["Solo-built","concept to pilot"]],
      problem: "Institutions across Kwara State are sitting on decades of paper records that are slow to search, easy to lose, and expensive to digitize by hand.",
      approach: "Polykut runs scanned documents through an OCR and structuring pipeline, extracting fields into a searchable schema rather than just producing raw text. It's built to be reused across document types with light reconfiguration.",
      stack: ["Python","OCR / AI","Node.js API"]
    },
    cart: {
      tag: "Consumer · Live · 5,000+ downloads",
      title: "Market Cart",
      lede: "A React Native e-commerce app on Google Play — product catalog, cart, and checkout — with real, ongoing usage.",
      stats: [["5,000+","downloads"],["Google Play","published"],["Redux","state layer"]],
      problem: "Building and shipping a consumer mobile shopping experience that holds up under real usage, not just a demo — catalog browsing, cart persistence, and checkout all needed to feel instant.",
      approach: "React Native front end with a Redux-managed cart and checkout flow, talking to a REST API for catalog and order data. Shipped to Google Play and iterated on based on real usage.",
      stack: ["React Native","Redux","REST API","Google Play"]
    },
    aegis: {
      tag: "Go · Building now",
      title: "Aegis Pipeline",
      lede: "A concurrent document-processing service written in Go — the project I'm using to go deeper on backend infrastructure beyond Node.",
      stats: [["Go","first production service"],["Queues","+ retry logic"],["API","REST / gRPC"]],
      problem: "My stack has been Node-heavy. I wanted a real, non-trivial backend project to build genuine range in Go — something with concurrency, failure handling, and infrastructure decisions, not another CRUD API.",
      approach: "Aegis ingests documents into a queue, processes them concurrently through an OCR pipeline (the same problem Polykut solves, rebuilt as a standalone Go service), retries failed jobs automatically, and exposes results through a clean REST/gRPC API.",
      stack: ["Go","Goroutines & Channels","Worker Queues","gRPC","REST"]
    }
  };

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- liquid smooth scroll ---------- */
  var container = document.getElementById('scroll-container');
  var space = document.getElementById('scroll-space');

  if(!reduced && container && space){
    var current = window.scrollY || 0;
    var target = current;

    function setSpaceHeight(){
      space.style.height = container.getBoundingClientRect().height + 'px';
    }
    setSpaceHeight();
    window.addEventListener('resize', setSpaceHeight);
    window.addEventListener('load', function(){ setTimeout(setSpaceHeight, 200); });
    setTimeout(setSpaceHeight, 600);
    setTimeout(setSpaceHeight, 1500);

    function loop(){
      target = window.scrollY || 0;
      current += (target - current) * 0.22;
      if(Math.abs(target - current) < 0.05){ current = target; }
      container.style.transform = 'translate3d(0,' + (-current) + 'px,0)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---------- overlay case study ---------- */
  var overlay = document.getElementById('overlay');
  var overlayContent = document.getElementById('overlay-content');
  var overlayClose = document.getElementById('overlay-close');
  var lastFocused = null;

  function renderProject(key){
    var p = PROJECTS[key];
    if(!p) return;
    var statsHtml = p.stats.map(function(s){
      return '<div class="stat"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>';
    }).join('');
    var stackHtml = p.stack.map(function(s){ return '<span class="pill">'+s+'</span>'; }).join('');
    overlayContent.innerHTML =
      '<div class="overlay-tag">'+p.tag+'</div>' +
      '<h2>'+p.title+'</h2>' +
      '<p class="overlay-lede">'+p.lede+'</p>' +
      '<div class="overlay-grid">'+statsHtml+'</div>' +
      '<div class="overlay-body">' +
        '<div><h4>The problem</h4><p>'+p.problem+'</p>' +
        '<h4>The approach</h4><p>'+p.approach+'</p></div>' +
        '<div><h4>Stack</h4><div class="stack-row">'+stackHtml+'</div></div>' +
      '</div>';
  }

  function openOverlay(key, originEl){
    renderProject(key);
    lastFocused = document.activeElement;
    if(originEl){
      var rect = originEl.getBoundingClientRect();
      overlay.style.setProperty('--ox', (rect.left + rect.width / 2) + 'px');
      overlay.style.setProperty('--oy', (rect.top + rect.height / 2) + 'px');
    }
    overlay.classList.add('open');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    overlayClose.focus();
  }
  function closeOverlay(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if(lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll('.card').forEach(function(card){
    card.setAttribute('tabindex','0');
    card.addEventListener('click', function(){
      openOverlay(card.getAttribute('data-project'), card);
    });
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openOverlay(card.getAttribute('data-project'), card);
      }
    });
  });

  overlayClose.addEventListener('click', closeOverlay);
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
  });

  /* ---------- smooth in-page nav ---------- */
  document.querySelectorAll('nav a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if(target){
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
      }
    });
  });
})();
