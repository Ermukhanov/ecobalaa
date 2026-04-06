(function(){
  var shownRewardAt = '';
  var lastBadgeDelta = [];
  var lastKzDateKey = '';
  function langOf(){ try { return (typeof lang !== 'undefined' && lang) ? lang : (window.lang || 'ru'); } catch(e) { return window.lang || 'ru'; } }
  function userRef(){ try { return (typeof cu !== 'undefined' && cu) ? cu : (window.cu || null); } catch(e) { return window.cu || null; } }
  function profileState(user){ try { return window.EcoBalaProfile && window.EcoBalaProfile.getProfileState ? (window.EcoBalaProfile.getProfileState(user || userRef()) || {}) : (((user || userRef()) || {}).profile_state || {}); } catch(e) { return (((user || userRef()) || {}).profile_state || {}); } }
  function t(ru, kz){ return langOf() === 'kz' ? kz : ru; }
  function kzNowParts(){
    try {
      var parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Almaty',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function(part){ if(part.type !== 'literal') map[part.type] = part.value; });
      return {
        year: Number(map.year || 0),
        month: Number(map.month || 0),
        day: Number(map.day || 0),
        hour: Number(map.hour || 0),
        minute: Number(map.minute || 0),
        second: Number(map.second || 0)
      };
    } catch (e) {
      var now = new Date();
      return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      };
    }
  }
  function kzDateKey(){
    var p = kzNowParts();
    return String(p.year) + '-' + String(p.month).padStart(2, '0') + '-' + String(p.day).padStart(2, '0');
  }
  function isNightSky(){
    var h = kzNowParts().hour;
    return h >= 21 || h < 6;
  }
  var badgeDict = {
    first:{ru:'Первый шаг',kz:'Бірінші қадам'}, student:{ru:'Ученик',kz:'Оқушы'}, scholar:{ru:'Отличник',kz:'Үздік'},
    explorer:{ru:'Исследователь',kz:'Зерттеуші'}, hero:{ru:'Эко-герой',kz:'Эко-батыр'}, gamer:{ru:'Игрок',kz:'Ойыншы'},
    streak:{ru:'Серия x5',kz:'Жалғасым x5'}, reporter:{ru:'Репортер',kz:'Репортер'}, champion:{ru:'Чемпион',kz:'Чемпион'},
    gold:{ru:'Золото',kz:'Алтын'}
  };
  var unlockDict = {
    forest:{ru:'Лесная тема',kz:'Орман тақырыбы'}, mint:{ru:'Мятная тема',kz:'Жалбыз тақырыбы'}, sky:{ru:'Небесная тема',kz:'Аспан тақырыбы'},
    sunrise:{ru:'Тема рассвета',kz:'Таң тақырыбы'}, berry:{ru:'Ягодная тема',kz:'Жидек тақырыбы'}, aurora:{ru:'Тема сияния',kz:'Шұғыла тақырыбы'},
    cosmic:{ru:'Космическая тема',kz:'Ғарыш тақырыбы'}, garden:{ru:'Садовая тема',kz:'Бақ тақырыбы'}, sunset:{ru:'Тема заката',kz:'Күнбату тақырыбы'},
    tree:{ru:'Тема дерева жизни',kz:'Өмір ағашы тақырыбы'}, meadow:{ru:'Фон Луг',kz:'Шалғын фоны'}, dew:{ru:'Фон Роса',kz:'Шық фоны'},
    river:{ru:'Фон Река',kz:'Өзен фоны'}, sun:{ru:'Фон Солнце',kz:'Күн фоны'}, blossom:{ru:'Фон Цветение',kz:'Гүлдеу фоны'},
    galaxy:{ru:'Фон Галактика',kz:'Галактика фоны'}, emerald:{ru:'Ник Изумруд',kz:'Изумруд ник'}, gold:{ru:'Ник Золото',kz:'Алтын ник'},
    sunset:{ru:'Ник Закат',kz:'Күнбату ник'}, rose:{ru:'Ник Роза',kz:'Раушан ник'}, ocean:{ru:'Ник Океан',kz:'Мұхит ник'},
    neon:{ru:'Ник Неон',kz:'Неон ник'}, rainbow:{ru:'Ник Радуга',kz:'Кемпірқосақ ник'}, amber:{ru:'Ник Янтарь',kz:'Кәріптас ник'},
    prism:{ru:'Ник Призма',kz:'Призма ник'}, leaf:{ru:'Рамка Лист',kz:'Жапырақ жиек'}, sprout:{ru:'Рамка Росток',kz:'Өскін жиек'},
    petal:{ru:'Рамка Лепесток',kz:'Күлте жиек'}, bloom:{ru:'Рамка Цветение',kz:'Гүлдеу жиек'}, butterfly:{ru:'Рамка Бабочка',kz:'Көбелек жиек'},
    glass:{ru:'Рамка Стекло',kz:'Шыны жиек'}, crown:{ru:'Рамка Корона',kz:'Тәж жиек'}, royal:{ru:'Рамка Royal',kz:'Royal жиек'},
    legend:{ru:'Рамка Легенда',kz:'Аңыз жиек'}, mythic:{ru:'Рамка Миф',kz:'Аңыздық жиек'}, 'soft-glow':{ru:'Аура Мягкий свет',kz:'Жұмсақ жарық аурасы'},
    mist:{ru:'Аура Туман',kz:'Тұман аурасы'}, spark:{ru:'Аура Искры',kz:'Ұшқын аурасы'}, pulse:{ru:'Аура Пульс',kz:'Пульс аурасы'},
    orbit:{ru:'Аура Орбита',kz:'Орбита аурасы'}, flora:{ru:'Аура Флора',kz:'Флора аурасы'}, halo:{ru:'Аура Ореол',kz:'Ореол аурасы'},
    'forest-ring':{ru:'Аура Лесное кольцо',kz:'Орман сақинасы'}, starter:{ru:'Цветок Старт',kz:'Бастапқы гүл'}, bud:{ru:'Цветок Бутон',kz:'Бүршік гүл'},
    daisy:{ru:'Ромашка',kz:'Түймедақ'}, tulip:{ru:'Тюльпан',kz:'Қызғалдақ'}, orchid:{ru:'Орхидея',kz:'Орхидея'}, violet:{ru:'Фиалка',kz:'Күлгін гүл'},
    lily:{ru:'Лилия',kz:'Лалагүл'}, bouquet:{ru:'Букет',kz:'Гүл шоғы'}, 'tree-bloom':{ru:'Цветущее дерево',kz:'Гүлдеген ағаш'}
  };
  function ensureStyles(){
    if(document.getElementById('eco-reward-boost-style')) return;
    var s=document.createElement('style');
    s.id='eco-reward-boost-style';
    s.textContent='.eco-inline-name-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-width:0}.eco-inline-name-row .profile-name{margin:0;min-width:0}.profile-streak-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:900;line-height:1;white-space:nowrap;box-shadow:0 10px 20px rgba(0,0,0,.08)}.profile-streak-badge.good{background:rgba(57,181,74,.14);color:#168a34;border:1px solid rgba(57,181,74,.22)}.profile-streak-badge.off{background:rgba(140,148,156,.14);color:#6f7780;border:1px solid rgba(140,148,156,.22)}.eco-reward-fallback{position:fixed;inset:0;z-index:9800;display:none;align-items:center;justify-content:center;padding:20px;background:radial-gradient(circle at top,rgba(79,255,141,.18),rgba(4,15,9,.92))}.eco-reward-fallback.show{display:flex}.eco-reward-panel{width:min(460px,100%);border-radius:28px;overflow:hidden;background:linear-gradient(180deg,#071425 0%,#12311f 58%,#1f6c44 100%);color:#fff;box-shadow:0 24px 80px rgba(0,0,0,.42)}.eco-reward-panel-top{padding:24px 22px 18px;text-align:center}.eco-reward-planet-shot{width:170px;height:170px;margin:0 auto 14px;border-radius:50%;overflow:hidden;display:grid;place-items:center;background:radial-gradient(circle,#baf4ff,#173456 72%,#08131f 100%);box-shadow:0 0 0 1px rgba(255,255,255,.1) inset,0 24px 40px rgba(0,0,0,.28)}.eco-reward-planet-shot img{width:100%;height:100%;object-fit:cover;animation:ecoRewardSpin 9s linear infinite}.eco-reward-planet-shot span{font-size:58px;filter:drop-shadow(0 8px 18px rgba(0,0,0,.28))}.eco-reward-unlocks{display:grid;gap:8px;margin-top:14px;text-align:left}.eco-reward-unlock{padding:10px 12px;border-radius:14px;background:rgba(255,255,255,.08);font-size:13px;line-height:1.4}.eco-reward-badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.eco-reward-badge{padding:7px 10px;border-radius:999px;background:rgba(255,242,181,.14);color:#fff4b2;font-size:12px;font-weight:800}.eco-reward-actions{display:flex;gap:10px;padding:18px 20px 22px;background:rgba(255,255,255,.06)}.eco-reward-actions button{flex:1;border:none;border-radius:999px;padding:13px 16px;font-family:Nunito,sans-serif;font-size:15px;font-weight:900;cursor:pointer}.eco-reward-close{background:linear-gradient(135deg,#ecfff2,#c4ffd6);color:#114120}.eco-reward-share{background:linear-gradient(135deg,#27c65c,#9cffc3);color:#fff}@keyframes ecoRewardSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@media (max-width:767px){.profile-streak-badge{padding:5px 10px;font-size:11px}.eco-reward-panel-top{padding:20px 16px 16px}.eco-reward-actions{flex-direction:column}.eco-reward-planet-shot{width:146px;height:146px}}';
    document.head.appendChild(s);
  }
  function ensureSceneStyles(){
    if(document.getElementById('eco-scene-boost-style')) return;
    var s = document.createElement('style');
    s.id = 'eco-scene-boost-style';
    s.textContent = '.eco-card.planet{position:relative;overflow:hidden;min-height:520px;background:linear-gradient(180deg,#05111f 0%,#102843 24%,#14371f 60%,#1d6a42 100%)!important}.eco-card.planet .eco-head,.eco-card.planet .eco-planet-center{position:relative;z-index:3}.eco-card.planet .eco-planet-center{min-height:430px;justify-content:center;padding:14px 0 20px}.eco-card.planet .eco-planet-wrap{width:100%;min-height:340px;display:grid;place-items:center;position:relative}.eco-card.planet .eco-planet-shell{width:min(360px,78vw)!important;height:min(360px,78vw)!important;z-index:3}.eco-card.planet .eco-planet-scene{background:radial-gradient(circle at 50% 50%,rgba(166,225,255,.12),rgba(12,28,46,.06) 52%,rgba(0,0,0,0) 78%)!important}.eco-card.planet .eco-globe{animation:ecoPlanetHover 9s ease-in-out infinite;filter:drop-shadow(0 32px 60px rgba(3,8,20,.46)) saturate(1.08)}.eco-card.planet .eco-globe-atmos{inset:-12%!important;filter:blur(12px)!important;opacity:1!important}.eco-card.planet .eco-globe-ring{inset:-16%!important;box-shadow:0 0 0 1px rgba(136,221,255,.12) inset,0 0 60px rgba(104,182,255,.14)!important}.eco-cosmos-backdrop{position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden;border-radius:22px}.eco-cosmos-backdrop.is-night{background:radial-gradient(circle at 50% 20%,rgba(132,183,255,.12),rgba(4,10,28,0) 32%),linear-gradient(180deg,#040913 0%,#0b1730 44%,#13335a 66%,#183f2f 100%)}.eco-cosmos-backdrop.is-day{background:radial-gradient(circle at 16% 18%,rgba(255,232,170,.22),rgba(255,232,170,0) 20%),linear-gradient(180deg,#8fd0ff 0%,#68c5ff 24%,#76c87d 78%,#3b8150 100%)}.eco-cosmos-stars{position:absolute;inset:0;opacity:1;transition:opacity .4s ease}.eco-cosmos-backdrop.is-day .eco-cosmos-stars{opacity:0}.eco-cosmos-star{position:absolute;width:3px;height:3px;border-radius:50%;background:#f6fbff;box-shadow:0 0 8px rgba(255,255,255,.95),0 0 18px rgba(147,199,255,.6);animation:ecoTwinkle 4.8s ease-in-out infinite}.eco-cosmos-star.big{width:4px;height:4px}.eco-cosmos-moon,.eco-cosmos-sun{position:absolute;border-radius:50%;transition:opacity .4s ease,transform .4s ease}.eco-cosmos-moon{top:52px;right:40px;width:56px;height:56px;background:radial-gradient(circle at 34% 34%,#fffdf4 0%,#f1f6ff 44%,#d7deef 72%,rgba(215,222,239,0) 100%);box-shadow:0 0 20px rgba(218,230,255,.5),0 0 54px rgba(160,188,255,.18)}.eco-cosmos-moon:before,.eco-cosmos-moon:after{content:\"\";position:absolute;border-radius:50%;background:rgba(136,149,188,.2)}.eco-cosmos-moon:before{width:10px;height:10px;left:16px;top:17px}.eco-cosmos-moon:after{width:8px;height:8px;right:13px;bottom:12px}.eco-cosmos-sun{top:50px;left:34px;width:58px;height:58px;background:radial-gradient(circle,#fff6cf 0%,#ffd45c 36%,#ffb248 68%,rgba(255,178,72,0) 100%);box-shadow:0 0 22px rgba(255,212,101,.7),0 0 72px rgba(255,176,82,.34);animation:ecoSunPulse 5.2s ease-in-out infinite}.eco-cosmos-sun:before{content:\"\";position:absolute;inset:-14px;border-radius:50%;border:1px solid rgba(255,227,164,.34)}.eco-cosmos-rays{position:absolute;inset:-22px;border-radius:50%;background:conic-gradient(from 0deg,rgba(255,226,162,.6) 0deg,rgba(255,226,162,0) 20deg,rgba(255,226,162,.32) 42deg,rgba(255,226,162,0) 64deg,rgba(255,226,162,.55) 88deg,rgba(255,226,162,0) 112deg,rgba(255,226,162,.35) 138deg,rgba(255,226,162,0) 160deg,rgba(255,226,162,.55) 188deg,rgba(255,226,162,0) 214deg,rgba(255,226,162,.32) 246deg,rgba(255,226,162,0) 270deg,rgba(255,226,162,.48) 300deg,rgba(255,226,162,0) 326deg,rgba(255,226,162,.4) 360deg);filter:blur(1px);animation:ecoRotateOnly 18s linear infinite}.eco-cosmos-backdrop.is-night .eco-cosmos-sun{opacity:0;transform:scale(.8)}.eco-cosmos-backdrop.is-day .eco-cosmos-moon{opacity:0;transform:scale(.84)}.eco-cosmos-asteroids{position:absolute;right:14px;top:128px;width:140px;height:168px;opacity:.9}.eco-cosmos-backdrop.is-night .eco-cosmos-asteroids{opacity:0}.eco-cosmos-asteroid{position:absolute;border-radius:48% 52% 44% 56%/56% 42% 58% 44%;background:linear-gradient(135deg,#7c776f,#b3ab9d 58%,#665f56 100%);box-shadow:inset -8px -8px 16px rgba(0,0,0,.16),inset 6px 6px 12px rgba(255,255,255,.16),0 12px 24px rgba(0,0,0,.18);animation:ecoRockFloat 10s ease-in-out infinite}.eco-cosmos-asteroid.a1{width:40px;height:28px;right:28px;top:8px}.eco-cosmos-asteroid.a2{width:26px;height:18px;right:74px;top:44px;animation-delay:-2s}.eco-cosmos-asteroid.a3{width:54px;height:34px;right:8px;top:76px;animation-delay:-3.5s}.eco-cosmos-asteroid.a4{width:22px;height:16px;right:86px;top:122px;animation-delay:-1.2s}.eco-cosmos-asteroid.a5{width:30px;height:20px;right:42px;top:138px;animation-delay:-5s}.eco-planet-glow-orbit{position:absolute;left:50%;top:50%;width:min(440px,92vw);height:min(440px,92vw);transform:translate(-50%,-50%);border-radius:50%;border:1px solid rgba(196,230,255,.15);box-shadow:0 0 60px rgba(90,160,255,.14),inset 0 0 34px rgba(255,255,255,.04);z-index:2;animation:ecoSpinSlow 20s linear infinite}.eco-planet-glow-orbit:before{content:\"\";position:absolute;inset:7%;border-radius:50%;border:1px dashed rgba(217,245,255,.12)}.eco-flower-life{position:absolute;inset:-8px;pointer-events:none}.eco-flower-life span{position:absolute;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#fff7bf,#82ffb0 70%,rgba(130,255,176,0) 100%);box-shadow:0 0 12px rgba(164,255,190,.42);animation:ecoPetalFloat 3.4s ease-in-out infinite}.eco-flower-life span:nth-child(1){left:18px;top:24px}.eco-flower-life span:nth-child(2){right:20px;top:16px;animation-delay:-1s}.eco-flower-life span:nth-child(3){left:50%;top:2px;transform:translateX(-50%);animation-delay:-2s}.eco-flower-life span:nth-child(4){right:12px;bottom:38px;animation-delay:-1.6s}.eco-pot-wrap{position:relative}.eco-plant-svg{filter:drop-shadow(0 18px 22px rgba(22,92,45,.18));animation:ecoPlantAlive 5.6s ease-in-out infinite}.eco-plant-svg [fill=\"#ffd764\"],.eco-plant-svg [fill=\"#ff8fc4\"],.eco-plant-svg [fill=\"#ffe27a\"]{filter:drop-shadow(0 0 10px rgba(255,228,132,.34))}@keyframes ecoTwinkle{0%,100%{opacity:.22;transform:scale(.82)}50%{opacity:1;transform:scale(1.18)}}@keyframes ecoSunPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}@keyframes ecoSpinSlow{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes ecoRotateOnly{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes ecoRockFloat{0%,100%{transform:translate3d(0,0,0) rotate(0deg)}50%{transform:translate3d(-6px,-8px,0) rotate(8deg)}}@keyframes ecoPlanetHover{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.012)}}@keyframes ecoPetalFloat{0%,100%{transform:translateY(0) scale(.9);opacity:.3}50%{transform:translateY(-10px) scale(1.18);opacity:1}}@keyframes ecoPlantAlive{0%,100%{transform:translateY(0) rotate(-1.2deg)}50%{transform:translateY(-4px) rotate(1.4deg)}}@media (max-width:767px){.eco-card.planet{min-height:440px}.eco-card.planet .eco-planet-center{min-height:338px;padding:8px 0 14px}.eco-card.planet .eco-planet-shell{width:min(248px,68vw)!important;height:min(248px,68vw)!important}.eco-cosmos-moon{top:40px;right:20px;width:38px;height:38px}.eco-cosmos-sun{top:40px;left:18px;width:42px;height:42px}.eco-cosmos-asteroids{right:4px;top:116px;transform:scale(.75);transform-origin:top right}}';
    document.head.appendChild(s);
  }
  function mountHeaderStreakBadge(){
    ensureStyles();
    var nameEl=document.getElementById('profileName');
    if(!nameEl) return null;
    var row=nameEl.parentNode.querySelector('.eco-inline-name-row');
    if(!row){
      row=document.createElement('div');
      row.className='eco-inline-name-row';
      nameEl.parentNode.insertBefore(row,nameEl);
      row.appendChild(nameEl);
    }
    var badge=document.getElementById('profileStreakBadge');
    if(!badge){
      badge=document.createElement('div');
      badge.id='profileStreakBadge';
      badge.className='profile-streak-badge off';
      row.appendChild(badge);
    } else if(badge.parentNode!==row){
      row.appendChild(badge);
    }
    return badge;
  }
  function refreshHeaderStreakBadge(){
    var badge=mountHeaderStreakBadge(); if(!badge) return;
    var st=profileState(), days=Math.max(0, Number(st && st.streakDays || 0)), active=days > 0;
    badge.className='profile-streak-badge '+(active?'good':'off');
    badge.textContent=active ? ('🔥 '+t('Серия ','Серия ')+days) : ('⚪ '+t('Серия 0','Серия 0'));
  }
  function buildStarsHtml(){
    var html = '';
    for(var i=0;i<28;i++){
      var left = (6 + (i * 17) % 88);
      var top = (5 + (i * 23) % 58);
      var delay = ((i % 7) * -0.7).toFixed(1);
      html += '<span class="eco-cosmos-star'+(i % 6 === 0 ? ' big' : '')+'" style="left:'+left+'%;top:'+top+'%;animation-delay:'+delay+'s"></span>';
    }
    return html;
  }
  function ensurePlanetBackdrop(card){
    if(!card) return;
    ensureSceneStyles();
    var backdrop = card.querySelector('.eco-cosmos-backdrop');
    if(!backdrop){
      backdrop = document.createElement('div');
      backdrop.className = 'eco-cosmos-backdrop';
      backdrop.innerHTML = '<div class="eco-cosmos-stars">'+buildStarsHtml()+'</div><div class="eco-cosmos-moon"></div><div class="eco-cosmos-sun"><span class="eco-cosmos-rays"></span></div><div class="eco-cosmos-asteroids"><span class="eco-cosmos-asteroid a1"></span><span class="eco-cosmos-asteroid a2"></span><span class="eco-cosmos-asteroid a3"></span><span class="eco-cosmos-asteroid a4"></span><span class="eco-cosmos-asteroid a5"></span></div>';
      card.insertBefore(backdrop, card.firstChild);
    }
    backdrop.classList.toggle('is-night', isNightSky());
    backdrop.classList.toggle('is-day', !isNightSky());
    var wrap = card.querySelector('.eco-planet-wrap');
    if(wrap && !wrap.querySelector('.eco-planet-glow-orbit')){
      var orbit = document.createElement('div');
      orbit.className = 'eco-planet-glow-orbit';
      wrap.insertBefore(orbit, wrap.firstChild);
    }
  }
  function refreshPlanetBackdrop(){
    Array.prototype.forEach.call(document.querySelectorAll('.eco-card.planet'), ensurePlanetBackdrop);
  }
  function refreshPlantLife(){
    Array.prototype.forEach.call(document.querySelectorAll('.eco-pot-wrap'), function(pot){
      if(pot.querySelector('.eco-flower-life')) return;
      var fx = document.createElement('div');
      fx.className = 'eco-flower-life';
      fx.innerHTML = '<span></span><span></span><span></span><span></span>';
      pot.appendChild(fx);
    });
  }
  async function syncStreakIfNeeded(force){
    try {
      var current = userRef();
      if(!current || !window.EcoBalaProfile || typeof window.EcoBalaProfile.syncDailyVisit !== 'function') return;
      var key = kzDateKey();
      if(!force && lastKzDateKey && key === lastKzDateKey) return;
      lastKzDateKey = key;
      var updated = await window.EcoBalaProfile.syncDailyVisit(current);
      if(updated){
        try { if(typeof cu !== 'undefined') cu = updated; } catch (e) {}
        window.cu = updated;
        refreshHeaderStreakBadge();
        refreshBadgesForLang();
        if(typeof window.updateProfileStats === 'function') {
          window.updateProfileStats(updated.points || 0, updated.level || 1, updated);
        } else if(typeof window.updateTeenStats === 'function') {
          window.updateTeenStats(updated.points || 0, updated.level || 1, updated);
        }
      }
    } catch (e) {}
  }
  function translateUnlock(key){ var item=unlockDict[key]; return item ? (langOf()==='kz'?item.kz:item.ru) : key; }
  function translateBadge(key){ var item=badgeDict[key]; return item ? (langOf()==='kz'?item.kz:item.ru) : key; }
  function rewardUnlockList(reward){
    var out=[]; if(!reward || !reward.unlocks) return out;
    ['themes','banners','nickColors','frames','auras','flowers'].forEach(function(group){
      (reward.unlocks[group]||[]).forEach(function(key){ out.push(translateUnlock(key)); });
    });
    return out.filter(function(v,i,a){ return v && a.indexOf(v)===i; });
  }
  function planetShotDataUrl(){
    var canvas=document.querySelector('.eco-card.planet .eco-globe-canvas') || document.querySelector('.eco-globe-canvas');
    try { return canvas ? canvas.toDataURL('image/png') : ''; } catch(e) { return ''; }
  }
  function ensureFallbackPopup(){
    ensureStyles();
    var ov=document.getElementById('ecoRewardFallback');
    if(ov) return ov;
    ov=document.createElement('div');
    ov.id='ecoRewardFallback';
    ov.className='eco-reward-fallback';
    document.body.appendChild(ov);
    return ov;
  }
  function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
  function buildRewardCardBlob(reward, unlocks){
    return new Promise(function(resolve){
      var c=document.createElement('canvas'), ctx=c.getContext('2d'); c.width=1080; c.height=1350;
      var g=ctx.createLinearGradient(0,0,0,c.height); g.addColorStop(0,'#071425'); g.addColorStop(.55,'#12311f'); g.addColorStop(1,'#1f6c44');
      ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height);
      for(var i=0;i<42;i++){ ctx.fillStyle='rgba(255,255,255,'+(0.18+Math.random()*0.5)+')'; ctx.beginPath(); ctx.arc(Math.random()*c.width, Math.random()*420, 1+Math.random()*3, 0, Math.PI*2); ctx.fill(); }
      ctx.textAlign='center'; ctx.fillStyle='#9dffb8'; ctx.font='700 42px Nunito'; ctx.fillText(t('Достижение EcoBala','EcoBala жетістігі'), c.width/2, 92);
      ctx.fillStyle='#fff'; ctx.font='900 74px Nunito'; ctx.fillText(t('Уровень ','Деңгей ')+(reward.level||''), c.width/2, 176);
      ctx.fillStyle='rgba(255,255,255,.88)'; ctx.font='600 36px Nunito'; ctx.fillText((reward.bonus?('+'+reward.bonus+' Eco Pts  •  '):'')+t('Новая награда','Жаңа сыйлық'), c.width/2, 232);
      var imgSrc=planetShotDataUrl(), img=new Image();
      var drawBody=function(){
        ctx.save(); ctx.beginPath(); ctx.arc(c.width/2,470,180,0,Math.PI*2); ctx.closePath(); ctx.clip();
        if(img.complete && img.width) ctx.drawImage(img, c.width/2-180, 290, 360, 360);
        else { ctx.fillStyle='#0e2840'; ctx.fillRect(c.width/2-180,290,360,360); ctx.fillStyle='#fff'; ctx.font='900 96px Nunito'; ctx.fillText('🌍', c.width/2, 506); }
        ctx.restore();
        ctx.strokeStyle='rgba(255,255,255,.16)'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(c.width/2,470,188,0,Math.PI*2); ctx.stroke();
        ctx.fillStyle='#fff'; ctx.font='800 34px Nunito'; ctx.fillText(t('Что открылось','Не ашылды'), c.width/2, 730);
        ctx.textAlign='left'; ctx.font='600 30px Nunito';
        (unlocks.length?unlocks:[t('Новая награда профиля','Жаңа профиль сыйлығы')]).slice(0,6).forEach(function(item, idx){
          var y=800+idx*64;
          ctx.fillStyle='rgba(255,255,255,.08)'; roundRect(ctx,120,y-34,840,46,20); ctx.fill();
          ctx.fillStyle='#ecfff2'; ctx.fillText('• '+item, 150, y);
        });
        if(lastBadgeDelta.length){
          ctx.textAlign='center'; ctx.fillStyle='#fff4b2'; ctx.font='800 30px Nunito';
          ctx.fillText(t('Новые значки: ','Жаңа белгілер: ')+lastBadgeDelta.map(translateBadge).join(', '), c.width/2, 1230);
        }
        c.toBlob(resolve, 'image/png');
      };
      img.onload=drawBody; img.onerror=drawBody;
      if(imgSrc) img.src=imgSrc; else drawBody();
    });
  }
  async function shareRewardCard(reward){
    var unlocks=rewardUnlockList(reward), title=t('Достижение EcoBala','EcoBala жетістігі')+' - '+t('Уровень ','Деңгей ')+(reward.level||'');
    try{
      var blob=await buildRewardCardBlob(reward, unlocks);
      if(blob){
        var file=new File([blob], 'ecobala-level-'+(reward.level||'')+'.png', {type:'image/png'});
        if(navigator.canShare && navigator.canShare({files:[file]}) && navigator.share){
          await navigator.share({title:title, text: unlocks.join(', '), files:[file]});
          return true;
        }
        var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=file.name; a.click();
      }
      if(navigator.share){ await navigator.share({title:title, text:title+'\n'+unlocks.join(', '), url:location.href}); return true; }
    }catch(e){}
    return false;
  }
  function fillPopup(panel, reward){
    var unlocks=rewardUnlockList(reward), badgesHtml=lastBadgeDelta.length ? '<div class="eco-reward-badges">'+lastBadgeDelta.map(function(key){ return '<span class="eco-reward-badge">'+translateBadge(key)+'</span>'; }).join('')+'</div>' : '';
    var shot=planetShotDataUrl();
    panel.innerHTML='<div class="eco-reward-panel"><div class="eco-reward-panel-top"><div class="eco-reward-planet-shot">'+(shot?'<img src="'+shot+'" alt="">':'<span>🌍</span>')+'</div><div style="font-size:12px;font-weight:900;letter-spacing:.18em;opacity:.76;text-transform:uppercase;">'+t('Новая награда уровня','Жаңа деңгей сыйлығы')+'</div><div style="font-size:32px;font-weight:900;margin:10px 0 8px;">'+t('Уровень ','Деңгей ')+(reward.level||'')+'</div><div style="font-size:15px;line-height:1.72;opacity:.96;">'+(reward.bonus?('+'+reward.bonus+' Eco Pts<br>'):'')+t('Открылись новые оформления и награды профиля','Жаңа безендірулер мен профиль сыйлықтары ашылды')+'</div><div class="eco-reward-unlocks">'+(unlocks.length?unlocks.map(function(item){ return '<div class="eco-reward-unlock">'+item+'</div>'; }).join(''):'<div class="eco-reward-unlock">'+t('Новая награда профиля','Жаңа профиль сыйлығы')+'</div>')+'</div>'+badgesHtml+'</div><div class="eco-reward-actions"><button class="eco-reward-close" type="button">'+t('Закрыть','Жабу')+'</button><button class="eco-reward-share" type="button">'+t('Поделиться','Бөлісу')+'</button></div></div>';
    panel.querySelector('.eco-reward-close').onclick=function(){ panel.classList.remove('show'); };
    panel.querySelector('.eco-reward-share').onclick=async function(){ await shareRewardCard(reward); };
  }
  function showFallbackReward(reward){
    if(!reward || !reward.at) return;
    shownRewardAt = String(reward.at);
    var ov=ensureFallbackPopup();
    fillPopup(ov, reward);
    ov.classList.add('show');
  }
  function enhanceInternalRewardOverlay(){
    var overlay=document.querySelector('.eco-overlay.show');
    if(!overlay) return false;
    var reward=profileState().lastLevelReward; if(!reward) return false;
    shownRewardAt = String(reward.at || '');
    var shareBtn=overlay.querySelector('[data-share-reward="1"]');
    if(shareBtn && !shareBtn.dataset.boostBound){
      shareBtn.dataset.boostBound='1';
      shareBtn.onclick=async function(){ await shareRewardCard(reward); };
    }
    var mount=overlay.querySelector('.eco-modal-top');
    if(mount && !overlay.querySelector('.eco-reward-unlocks')){
      var unlocks=rewardUnlockList(reward), box=document.createElement('div');
      box.className='eco-reward-unlocks';
      box.innerHTML=(unlocks.length?unlocks:[t('Новая награда профиля','Жаңа профиль сыйлығы')]).slice(0,6).map(function(item){ return '<div class="eco-reward-unlock">'+item+'</div>'; }).join('')+(lastBadgeDelta.length?'<div class="eco-reward-badges">'+lastBadgeDelta.map(function(key){ return '<span class="eco-reward-badge">'+translateBadge(key)+'</span>'; }).join('')+'</div>':'');
      mount.appendChild(box);
    }
    return true;
  }
  function checkRewardPopup(){
    var reward=profileState().lastLevelReward;
    if(!reward || !reward.at || String(reward.at)===shownRewardAt) return;
    setTimeout(function(){ if(!enhanceInternalRewardOverlay()) showFallbackReward(reward); }, 260);
  }
  function refreshBadgesForLang(){
    try { if(typeof renderBadgesFromDB === 'function'){ var u=userRef(); renderBadgesFromDB((u && u.badges) || []); } } catch(e){}
  }
  function patchFns(){
    if(typeof window.saveLessonPoints === 'function' && !window.saveLessonPoints.__ecoRewardWrap){
      var oldSave=window.saveLessonPoints;
      window.saveLessonPoints=async function(earned){
        var before=((userRef() && userRef().badges) || []).slice();
        var result=await oldSave.apply(this, arguments);
        var after=((userRef() && userRef().badges) || []).slice();
        lastBadgeDelta=after.filter(function(x){ return before.indexOf(x)===-1; });
        refreshHeaderStreakBadge(); refreshBadgesForLang(); checkRewardPopup();
        return result;
      };
      window.saveLessonPoints.__ecoRewardWrap=true;
    }
    if(typeof window.updateTeenStats === 'function' && !window.updateTeenStats.__ecoRewardWrap){
      var oldUpdate=window.updateTeenStats;
      window.updateTeenStats=function(pts,lvl,cuData){
        var before=((userRef() && userRef().badges) || []).slice();
        var r=oldUpdate.apply(this, arguments);
        var after=((cuData && cuData.badges) || (userRef() && userRef().badges) || []).slice();
        lastBadgeDelta=after.filter(function(x){ return before.indexOf(x)===-1; });
        refreshHeaderStreakBadge(); refreshBadgesForLang(); checkRewardPopup();
        return r;
      };
      window.updateTeenStats.__ecoRewardWrap=true;
    }
    if(typeof window.updateProfileStats === 'function' && !window.updateProfileStats.__ecoHeaderWrap){
      var oldProfile=window.updateProfileStats;
      window.updateProfileStats=function(){ var r=oldProfile.apply(this, arguments); refreshHeaderStreakBadge(); checkRewardPopup(); return r; };
      window.updateProfileStats.__ecoHeaderWrap=true;
    }
    if(typeof window.applyLang === 'function' && !window.applyLang.__ecoHeaderWrap){
      var oldLang=window.applyLang;
      window.applyLang=function(){ var r=oldLang.apply(this, arguments); refreshHeaderStreakBadge(); refreshBadgesForLang(); setTimeout(checkRewardPopup, 80); return r; };
      window.applyLang.__ecoHeaderWrap=true;
    }
  }
  document.addEventListener('click', function(e){ if(e.target===document.getElementById('ecoRewardFallback')) e.target.classList.remove('show'); });
  if(window.MutationObserver){ new MutationObserver(function(){ enhanceInternalRewardOverlay(); refreshHeaderStreakBadge(); refreshPlanetBackdrop(); refreshPlantLife(); }).observe(document.body,{subtree:true,childList:true}); }
  window.addEventListener('load', function(){ ensureStyles(); ensureSceneStyles(); mountHeaderStreakBadge(); patchFns(); refreshHeaderStreakBadge(); refreshBadgesForLang(); refreshPlanetBackdrop(); refreshPlantLife(); syncStreakIfNeeded(true); setTimeout(checkRewardPopup, 400); setTimeout(checkRewardPopup, 1100); });
  setTimeout(function(){ ensureStyles(); ensureSceneStyles(); mountHeaderStreakBadge(); patchFns(); refreshHeaderStreakBadge(); refreshBadgesForLang(); refreshPlanetBackdrop(); refreshPlantLife(); syncStreakIfNeeded(true); }, 160);
  setInterval(function(){ patchFns(); refreshHeaderStreakBadge(); refreshPlanetBackdrop(); refreshPlantLife(); }, 1200);
  setInterval(function(){ var key = kzDateKey(); if(lastKzDateKey && key !== lastKzDateKey) syncStreakIfNeeded(true); }, 15000);
})();
