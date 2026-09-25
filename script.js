(function(){
  "use strict";

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- project data ---------- */
  var PROJECTS = {
    termfees: {
      tag: "Fintech · In development",
      title: "TermFees",
      lede: "A payment collection platform built first for school fees, then generalized for multi-industry collection — with dedicated virtual accounts and instant WhatsApp confirmations.",
      stats: [["1:1","virtual accounts per payer"],["WhatsApp","payment alerts"],["Multi","industry ready"]],
      problem: "Schools and small institutions needed a reliable way to collect fees at scale without manual bank reconciliation, and payers needed confirmation they could trust without waiting on a receptionist.",
      approach: "Each payer gets a dedicated virtual account, so incoming payments reconcile automatically against the right record. A WhatsApp notification pipeline confirms payment the moment it lands, closing the loop without any manual follow-up.",
      stack: ["Node.js","Express","Virtual Accounts","WhatsApp API","MySQL"]
    },
    conashop: {
      tag: "PWA · Live · Collaboration",
      title: "Conashop",
      lede: "A progressive web app that gives Nigerian SMEs and kiosk stores real-time inventory and profit tracking — built for shop owners who've been running the numbers with pen, paper, and prayer.",
      stats: [["500+","shop owners"],["PWA","installs like an app"],["Backend","my contribution"]],
      problem: "Small shop and kiosk owners in Nigeria were tracking stock and profit by hand — no visibility into real margins, no easy way to convert bulk purchases into retail units, and no backup if a paper ledger got lost.",
      approach: "Conashop is a PWA built on React and Supabase. I built the backend as part of a small team — real-time inventory sync, automatic profit-margin calculation from cost and sale prices, and a unit-conversion engine so a shop buying in bulk (drums, bags) but selling in small units (cups, sachets) doesn't have to do the math by hand. It also handles PDF/CSV exports and growth analytics.",
      stack: ["React","Supabase","PWA","REST API"],
      link: "https://conashop.com",
      linkLabel: "conashop.com"
    },
    polykut: {
      tag: "AI · Live",
      title: "Polykut",
      lede: "Polykut turns the paper trail industries already have — invoices, receipts, contracts — into a searchable, well-documented database, while preserving the original documents.",
      stats: [["11s","PDF → searchable"],["Local-first","encrypted bundles"],["Gov't","Kwara State pilot"]],
      problem: "Institutions were sitting on decades of paper records — invoices, receipts, contracts — that were slow to search, easy to lose, and expensive to digitize by hand, all while needing to keep the original documents intact.",
      approach: "Polykut runs scanned documents through an AI extraction and OCR pipeline, pulling out vendors, totals, dates, and terms automatically, then indexes every field for plain-language search — \"invoices over $200 in August\" style queries — while archiving the original file to encrypted, per-workspace storage. A pilot is proposed with Kwara State's Teaching Service Commission.",
      stack: ["Python","OCR / AI","Node.js API","Semantic Search"],
      link: "https://polykut.orionisx.com",
      linkLabel: "polykut.orionisx.com"
    },
    hrms: {
      tag: "HR Tech · Multi-platform",
      title: "HRMS",
      lede: "A complete HR system spanning a staff-facing mobile app and PWA and a separate admin web dashboard, all backed by one API.",
      stats: [["3","client surfaces"],["React Native","staff app"],["React","admin dashboard"]],
      problem: "HR teams needed one system that worked for both staff — checking in, viewing HR info from a phone — and administrators managing staff records, approvals, and reporting from a desktop-grade dashboard, without duplicating logic across separate codebases.",
      approach: "Built as three coordinated front ends — a React Native mobile app and a PWA for staff, and a React admin dashboard for HR teams — sharing one backend API for HR data, approvals, and records.",
      stack: ["React Native","React","Node.js","PWA"]
    },
    dbwatcher: {
      tag: ".NET · Windows Service",
      title: "DB Watcher",
      lede: "A lightweight Windows service that watches a database's availability around the clock and reports status back to a remote monitoring server.",
      stats: [["24/7","availability checks"],["Windows Service","background process"],["Remote","status reporting"]],
      problem: "Database outages or slowdowns were only discovered after someone noticed the application acting up — there was no automated, always-on watcher reporting status independently of the application itself.",
      approach: "Built as a standalone Windows service, separate from the main application, that periodically checks database availability and pushes status back to a remote server, so outages surface immediately instead of being discovered secondhand.",
      stack: [".NET","Windows Service","Monitoring / Alerts"]
    },
    frappeschool: {
      tag: "EdTech · Frappe/ERPNext",
      title: "Frappe School App",
      lede: "A school management system built on Frappe/ERPNext, customized to fit Nigeria's education system — grading scale, terms, and other local conventions the out-of-the-box module doesn't handle.",
      stats: [["Custom","grading scale"],["Frappe","ERPNext base"],["Nigeria","education context"]],
      problem: "Frappe's education module ships with grading and term conventions that don't match how Nigerian schools actually grade and structure the academic year, so schools adopting it needed real customization, not just configuration.",
      approach: "Extended Frappe/ERPNext's education module to support Nigeria's grading scale and school-term conventions, adapting the existing framework rather than building a school system from scratch.",
      stack: ["Frappe / ERPNext","Python","Grading Engine"]
    },
    // aegis: {
    //   tag: "Go · Building now",
    //   title: "Aegis Pipeline",
    //   lede: "A concurrent document-processing service written in Go — the project I'm using to go deeper on backend infrastructure beyond Node.",
    //   stats: [["Go","first production service"],["Queues","+ retry logic"],["API","REST / gRPC"]],
    //   problem: "My stack has been Node-heavy. I wanted a real, non-trivial backend project to build genuine range in Go — something with concurrency, failure handling, and infrastructure decisions, not another CRUD API.",
    //   approach: "Aegis ingests documents into a queue, processes them concurrently through an OCR pipeline (the same problem Polykut solves, rebuilt as a standalone Go service), retries failed jobs automatically, and exposes results through a clean REST/gRPC API.",
    //   stack: ["Go","Goroutines & Channels","Worker Queues","gRPC","REST"]
    // }
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
    var linkHtml = p.link ?
      '<a class="overlay-visit" href="'+p.link+'" target="_blank" rel="noopener">Visit '+p.linkLabel+' <svg class="icon"><use href="#ph-arrow-up-right"/></svg></a>' : '';
    overlayContent.innerHTML =
      '<div class="overlay-tag">'+p.tag+'</div>' +
      '<h2>'+p.title+'</h2>' +
      '<p class="overlay-lede">'+p.lede+'</p>' +
      linkHtml +
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

  /* ---------- mobile nav toggle ---------- */
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');
  if(nav && navToggle){
    navToggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function closeNav(){
    if(nav && nav.classList.contains('open')){
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  /* ---------- smooth in-page nav ---------- */
  document.querySelectorAll('nav a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      closeNav();
      if(target){
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
      }
    });
  });
})();
