// EcoBala - Supabase Client & Auth Helper - v20260310-2
// Requires: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>

const SUPABASE_URL  = 'https://zngfwsuaaygryzpmynuv.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZ2Z3c3VhYXlncnl6cG15bnV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjA1NDksImV4cCI6MjA4ODUzNjU0OX0.M8Xx4DxYzWVN94ChFM5LDWrUdEi1jv1kk2JopcfpfrA';

// Expose for pages that create their own client (index.html carousel/stats)
try {
    window.SUPABASE_URL = SUPABASE_URL;
    window.SUPABASE_ANON = SUPABASE_ANON;
} catch(e) {}

const _PF_EXTRA_SB = [
    // RU roots
    'бля', 'бляд', 'блять', 'пизд', 'пизда', 'пиздец', 'хуй', 'хуё', 'хуе', 'хуя', 'хуйн', 'еба', 'ёба', 'ебл', 'ебан', 'сука', 'суч', 'мраз', 'гандон',
    // KZ / RU-KZ common
    'шлюха', 'простит', 'твар',
    // KZ roots (common obscene)
    'сик', 'сік', 'сикир', 'секс', 'боқ', 'бок', 'шошқа', 'шошка'
];

function _normProfanitySb(t) {
    if (t == null) return '';
    var s = String(t).toLowerCase();
    // map common latin lookalikes -> cyrillic to reduce bypasses
    s = s
      .replace(/a/g, 'а')
      .replace(/b/g, 'в')
      .replace(/c/g, 'с')
      .replace(/e/g, 'е')
      .replace(/k/g, 'к')
      .replace(/m/g, 'м')
      .replace(/h/g, 'н')
      .replace(/o/g, 'о')
      .replace(/p/g, 'р')
      .replace(/t/g, 'т')
      .replace(/x/g, 'х')
      .replace(/y/g, 'у');
    // keep only letters/digits
    s = s.replace(/[^0-9\p{L}]+/gu, '');
    // leetspeak digits
    s = s.replace(/0/g, 'о').replace(/3/g, 'з').replace(/4/g, 'а').replace(/6/g, 'б').replace(/8/g, 'в');
    return s;
}

const _PF_SB = (function(){
    try {
        return atob('0YXRg9C5LNGF0YPRjyzRhdGD0Y4s0YXRg9GP0Lws0YXRg9GP0LzQuCzRhdGD0LXQsizRhdGD0LnQvdGPLNGF0YPQudC90Y4s0L/QuNC30LTQsCzQv9C40LfQtNGLLNC/0LjQt9C00LXRhizQv9C40LfQtNCw0YIs0L/QuNC30LTQsNC90YPQuyzQv9C40LfQtNCw0L3Rg9GCLNC10LHQsNGC0Yws0LXQsdCw0Lss0LXQsdCw0LvQuCzQtdCx0LDQvdGL0Lks0LXQsdCw0L3Rg9GCLNC10LHQsNC90LDRjyzQtdCx0LDQvdGM0LrQvizRgdGD0LrQsCzRgdGD0LrQuCzRgdGD0LrQsNC8LNGB0YPQutC1LNGB0YPRh9C60LAs0YHRg9GH0LDRgCzQsdC70Y/RgtGMLNCx0LvRj9C00Yws0LHQu9GP0LTQtdC5LNCx0LvRj9C00LjQvSzQsdC70Y/QtNGB0Los0LHQu9GP0LTQuNC90LAs0LHQu9GP0LTRgdGC0LLQvizQvNGD0LTQsNC6LNC80YPQtNCw0LrQuCzQvNGD0LTQsNC60LDQvCzQvNGD0LTQuNC70LAs0LzRg9C00LjQuyzQt9Cw0LvRg9C/0LAs0LfQsNC70YPQv9C40L0s0ZHQsdCw0L0s0ZHQsdCw0L3Ri9C5LNGR0LEs0ZHQsdC90YPRgizRkdCx0L3Rg9C7LNGR0LHQvdGD0YLRjCzQv9C40LfQtNC10YLRjCzQv9C40LfQtNC40YIs0L/QuNC30LTQsNCx0L7QuyzQv9C40LfQtNCw0L3Rg9GC0Yws0YjQu9GO0YXQsCzRiNC70Y7RhdC4LNGI0LvRjtGF0LDQvCzQvNGA0LDQt9GMLNC80YDQsNC30Lgs0YPQtdCx0LDQvSzRg9GR0LHQsNC9LNGD0ZHQsSzQv9C40LfQtNGO0Los0L/QuNC30LfRjtC60Lgs0LPQsNC90LTQvtC9LNCz0LDQvdC00L7QvdGLLNC90LDRhdGD0Lks0L/QvtGF0YPQuSzQvdCw0YXQtdGALGFzcyxmdWNrLHNoaXQsYml0Y2gsY29jayxkaWNrLHB1c3N5LGN1bnQsbmlnZ2VyLGZhZ2dvdCzRgdC40LrQsNC6LNGB0LjQutGW0L0s0YHQuNC60Lgs0YHQuNC60LBxLNCx0L7SmyzQsdC+0LrRgtGLLNGI0LXRiNGW0qMs0YjQtdGI0LXSo9C00ZYs0YjQtdGI0LXSo9C90ZbSoyzQsdCw0LnSk9GL0Lcs0LHQsNC50pPRi9C30YvQvSzQuNGC0ZbSoyzQuNGC0YHRltKjLNC40YLRgtC10Lks0LjRgtC/0ZbQvSzQtdGB0LXQuizQtdGB0LXQs9GW0qMs0LXRgdC10LrRgdGW0qMs0L/Ri9GB0YvSmyzQv9GL0YjRi9C6LNC/0LXQt9C00LXRgizQv9GW0LfQtNC10YIs0LbQtdGB0ZbRgCzQttC10YHRltGA0LTQtdC5LNGB0LLQvtC70L7Rh9GMLNGD0LHQu9GO0LTQvtC6LNGD0LHQu9GO0LTQutC4LNC70L7RiNCw0Lo=').split(',');
    } catch(e) {
        return [];
    }
})();

function _containsProfanitySb(t) {
    if (!t) return false;
    const l = _normProfanitySb(t);
    if (!l) return false;
    if (_PF_SB.some(function(w){
        return l.includes(_normProfanitySb(w));
    })) return true;
    return _PF_EXTRA_SB.some(function(w){
        return l.includes(_normProfanitySb(w));
    });
}

function _enforceNoProfanitySb(values) {
    if (!Array.isArray(values)) return;
    for (var i = 0; i < values.length; i++) {
        var v = values[i];
        if (v && _containsProfanitySb(v)) {
            throw new Error('⚠️ Нельзя использовать такие слова! / ⚠️ Бұл сөзді қолдануға болмайды!');
        }
    }
}

// Lazy client — created on first use so window.supabase is guaranteed ready
let _sbClient = null;


var ECO_LEVEL_META = [
    { lvl: 1, min: 0, icon: '🌱', name: { ru: 'Росток', kz: 'Өскін' } },
    { lvl: 2, min: 100, icon: '🌿', name: { ru: 'Листок', kz: 'Жапырақ' } },
    { lvl: 3, min: 200, icon: '🌼', name: { ru: 'Цветение', kz: 'Гүлдеу' } },
    { lvl: 4, min: 300, icon: '🌺', name: { ru: 'Сад', kz: 'Бақ' } },
    { lvl: 5, min: 400, icon: '🌸', name: { ru: 'Эко-магия', kz: 'Эко сиқыр' } },
    { lvl: 6, min: 500, icon: '🪴', name: { ru: 'Оранжерея', kz: 'Жылыжай' } },
    { lvl: 7, min: 700, icon: '🌻', name: { ru: 'Цветущий двор', kz: 'Гүлді аула' } },
    { lvl: 8, min: 1000, icon: '🌷', name: { ru: 'Большой букет', kz: 'Үлкен гүлзар' } },
    { lvl: 9, min: 1500, icon: '🌹', name: { ru: 'Эко-аура', kz: 'Эко аура' } },
    { lvl: 10, min: 1800, icon: '🌳', name: { ru: 'Дерево жизни', kz: 'Өмір ағашы' } }
];

function calcEcoLevel(pts) {
    var value = Number(pts || 0);
    var lvl = 1;
    for (var i = 0; i < ECO_LEVEL_META.length; i++) {
        if (value >= ECO_LEVEL_META[i].min) lvl = ECO_LEVEL_META[i].lvl;
    }
    return lvl;
}

function getEcoLevelMetaByLevel(level) {
    var lvl = Math.max(1, Math.min(10, Number(level || 1)));
    for (var i = 0; i < ECO_LEVEL_META.length; i++) {
        if (ECO_LEVEL_META[i].lvl === lvl) return ECO_LEVEL_META[i];
    }
    return ECO_LEVEL_META[0];
}

function getEcoLevelMetaByPoints(pts) {
    return getEcoLevelMetaByLevel(calcEcoLevel(pts));
}

function getProfileStateCacheKey(userId) {
    return 'ecobala-profile-state:' + userId;
}

function safeParseProfileState(value) {
    if (!value) return null;
    if (typeof value === 'object') return value;
    if (typeof value !== 'string') return null;
    try { return JSON.parse(value); } catch (e) { return null; }
}

function mergeUnique(arr, extras) {
    var base = Array.isArray(arr) ? arr.slice() : [];
    (extras || []).forEach(function(item) {
        if (item && base.indexOf(item) === -1) base.push(item);
    });
    return base;
}

function getDefaultProfileState(role) {
    return {
        version: 1,
        role: role || 'kids',
        unlockedThemes: ['forest'],
        unlockedBanners: ['meadow'],
        unlockedNickColors: ['emerald'],
        unlockedFrames: ['leaf'],
        unlockedAuras: [],
        unlockedFlowers: ['starter'],
        selectedTheme: 'forest',
        selectedBanner: 'meadow',
        selectedNickColor: 'emerald',
        selectedFrame: 'leaf',
        selectedAura: '',
        garden: { mainLevel: 1, secondaryLevel: 0, treeLevel: 0, potStyle: 'clay' },
        lastLevelReward: null
    };
}

function getLevelRewardConfig(level) {
    var map = {
        1: { themes: ['forest'], banners: ['meadow'], nickColors: ['emerald'], frames: ['leaf'], auras: [], flowers: ['starter'] },
        2: { themes: ['mint'], banners: ['dew'], nickColors: ['mint'], frames: ['sprout'], auras: [], flowers: ['bud'] },
        3: { themes: ['sky'], banners: ['river'], nickColors: ['gold'], frames: ['petal'], auras: ['soft-glow'], flowers: ['daisy'] },
        4: { themes: ['sunrise'], banners: ['sun'], nickColors: ['sunset'], frames: ['bloom'], auras: ['mist'], flowers: ['tulip'] },
        5: { themes: ['berry'], banners: ['blossom'], nickColors: ['rose'], frames: ['butterfly'], auras: ['spark'], flowers: ['orchid'] },
        6: { themes: ['aurora'], banners: ['aurora'], nickColors: ['ocean'], frames: ['glass'], auras: ['pulse'], flowers: ['violet'] },
        7: { themes: ['cosmic'], banners: ['galaxy'], nickColors: ['neon'], frames: ['crown'], auras: ['orbit'], flowers: ['lily'] },
        8: { themes: ['garden'], banners: ['garden'], nickColors: ['rainbow'], frames: ['royal'], auras: ['flora'], flowers: ['bouquet'] },
        9: { themes: ['sunset'], banners: ['sunset'], nickColors: ['amber'], frames: ['legend'], auras: ['halo'], flowers: ['rose'] },
        10:{ themes: ['tree'], banners: ['tree'], nickColors: ['prism'], frames: ['mythic'], auras: ['forest-ring'], flowers: ['tree-bloom'] }
    };
    return map[level] || map[1];
}

function growGardenState(level, role) {
    var lvl = Math.max(1, Math.min(10, Number(level || 1)));
    return {
        mainLevel: Math.min(lvl, 8),
        secondaryLevel: lvl >= 8 ? Math.min(lvl - 7, 2) : 0,
        treeLevel: lvl >= 10 ? 1 : 0,
        potStyle: role === 'teen' ? 'stone' : 'clay'
    };
}

function normalizeProfileState(user) {
    var role = (user && user.role) || 'kids';
    var base = getDefaultProfileState(role);
    var dbState = safeParseProfileState(user && user.profile_state);
    var localState = safeParseProfileState(user && user.id ? localStorage.getItem(getProfileStateCacheKey(user.id)) : null);
    var raw = Object.assign({}, base, dbState || {}, localState || {});

    raw.unlockedThemes = mergeUnique(base.unlockedThemes, raw.unlockedThemes);
    raw.unlockedBanners = mergeUnique(base.unlockedBanners, raw.unlockedBanners);
    raw.unlockedNickColors = mergeUnique(base.unlockedNickColors, raw.unlockedNickColors);
    raw.unlockedFrames = mergeUnique(base.unlockedFrames, raw.unlockedFrames);
    raw.unlockedAuras = mergeUnique(base.unlockedAuras, raw.unlockedAuras);
    raw.unlockedFlowers = mergeUnique(base.unlockedFlowers, raw.unlockedFlowers);

    var level = calcEcoLevel((user && user.points) || 0);
    for (var i = 1; i <= level; i++) {
        var reward = getLevelRewardConfig(i);
        raw.unlockedThemes = mergeUnique(raw.unlockedThemes, reward.themes);
        raw.unlockedBanners = mergeUnique(raw.unlockedBanners, reward.banners);
        raw.unlockedNickColors = mergeUnique(raw.unlockedNickColors, reward.nickColors);
        raw.unlockedFrames = mergeUnique(raw.unlockedFrames, reward.frames);
        raw.unlockedAuras = mergeUnique(raw.unlockedAuras, reward.auras);
        raw.unlockedFlowers = mergeUnique(raw.unlockedFlowers, reward.flowers);
    }

    raw.selectedTheme = raw.unlockedThemes.indexOf(raw.selectedTheme) >= 0 ? raw.selectedTheme : raw.unlockedThemes[0];
    raw.selectedBanner = raw.unlockedBanners.indexOf(raw.selectedBanner) >= 0 ? raw.selectedBanner : raw.unlockedBanners[0];
    raw.selectedNickColor = raw.unlockedNickColors.indexOf(raw.selectedNickColor) >= 0 ? raw.selectedNickColor : raw.unlockedNickColors[0];
    raw.selectedFrame = raw.unlockedFrames.indexOf(raw.selectedFrame) >= 0 ? raw.selectedFrame : raw.unlockedFrames[0];
    raw.selectedAura = raw.selectedAura && raw.unlockedAuras.indexOf(raw.selectedAura) >= 0 ? raw.selectedAura : (raw.unlockedAuras[0] || '');
    raw.garden = growGardenState(level, role);
    return raw;
}

function persistProfileStateLocal(userId, state) {
    if (!userId) return;
    try { localStorage.setItem(getProfileStateCacheKey(userId), JSON.stringify(state)); } catch (e) {}
}

function normalizeUserProfile(user) {
    if (!user) return null;
    var state = normalizeProfileState(user);
    var next = Object.assign({}, user, {
        level: calcEcoLevel(user.points || 0),
        profile_state: state
    });
    persistProfileStateLocal(user.id, state);
    return next;
}

function computeLevelBonusProgress(oldPts, gainedPts) {
    var startPts = Number(oldPts || 0);
    var points = startPts + Number(gainedPts || 0);
    var beforeLevel = calcEcoLevel(startPts);
    var granted = [];
    var currentLevel = calcEcoLevel(points);
    while (currentLevel > beforeLevel && beforeLevel < 10) {
        beforeLevel += 1;
        var bonus = Math.max(10, Math.round(points * 0.1));
        points += bonus;
        granted.push({ level: beforeLevel, bonus: bonus });
        currentLevel = calcEcoLevel(points);
    }
    return {
        points: points,
        level: currentLevel,
        totalBonus: granted.reduce(function(sum, item) { return sum + item.bonus; }, 0),
        granted: granted
    };
}

function buildProgressPayload(user, pointsEarned) {
    var progress = computeLevelBonusProgress((user && user.points) || 0, pointsEarned || 0);
    var state = normalizeProfileState(user);
    state.garden = growGardenState(progress.level, (user && user.role) || 'kids');
    if (progress.granted.length) {
        var lastReward = progress.granted[progress.granted.length - 1];
        state.lastLevelReward = {
            level: lastReward.level,
            bonus: progress.totalBonus,
            unlocks: getLevelRewardConfig(lastReward.level),
            at: new Date().toISOString()
        };
    }
    return { progress: progress, profileState: state };
}

async function updateUserWithOptionalProfileState(sb, userId, updates, profileState) {
    var variants = [
        Object.assign({}, updates, { profile_state: profileState }),
        updates
    ];
    var lastError = null;
    for (var i = 0; i < variants.length; i++) {
        var result = await sb.from('users').update(variants[i]).eq('id', userId).select().single();
        if (!result.error) {
            var normalized = normalizeUserProfile(result.data);
            persistProfileStateLocal(userId, normalized.profile_state);
            return normalized;
        }
        lastError = result.error;
    }
    persistProfileStateLocal(userId, profileState);
    throw lastError;
}

window.EcoBalaProfile = {
    levels: ECO_LEVEL_META,
    calcLevel: calcEcoLevel,
    getLevelMetaByLevel: getEcoLevelMetaByLevel,
    getLevelMetaByPoints: getEcoLevelMetaByPoints,
    normalizeUser: normalizeUserProfile,
    getProfileState: function(user) { return normalizeProfileState(user || {}); },
    getLevelRewardConfig: getLevelRewardConfig,
    saveLocalState: persistProfileStateLocal
};

function getSB() {
    if (!_sbClient) {
        if (!window.supabase) {
            throw new Error('supabase.min.js not loaded yet');
        }
        _sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
            auth: {
                persistSession: true,
                storageKey: 'ecobala-auth',
                storage: window.localStorage,
                autoRefreshToken: true,
                detectSessionInUrl: false
            }
        });
    }
    return _sbClient;
}
window.getSupabaseClient = function() { return getSB(); };

window.EcoBalaAuth = {

    registerKid: async function(userData) {
        console.log('registerKid start:', userData.email);
        _enforceNoProfanitySb([
            userData.fullName,
            userData.nickname,
            userData.child_name,
            userData.child_surname
        ]);
        var sb = getSB();
        var signUpResult = await sb.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: { data: { role: 'kids' } }
        });
        if (signUpResult.error) throw signUpResult.error;
        var authData = signUpResult.data;
        console.log('signUp done. hasSession:', !!authData.session, 'hasUser:', !!authData.user);

        var uid = authData.user.id;
        var insertResult = await sb.from('users').insert([{
            id: uid, email: userData.email, role: 'kids',
            full_name: userData.fullName || '',
            child_name: userData.child_name || '',
            child_surname: userData.child_surname || '',
            nickname: userData.nickname || '',
            age: userData.age || null,
            class: userData.class || '',
            school: userData.school || '',
            parent_phone: userData.parent_phone || '',
            points: 0, level: 1, badges: [], is_active: true
        }]).select().single();
        if (insertResult.error) throw insertResult.error;
        console.log('profile inserted');

        if (authData.session) {
            console.log('setting session...');
            await sb.auth.setSession(authData.session);
            console.log('session set OK');
        } else {
            console.log('NO SESSION - email confirm still on?');
        }
        return insertResult.data;
    },

    registerTeen: async function(userData) {
        console.log('registerTeen start:', userData.email);
        _enforceNoProfanitySb([
            userData.fullName,
            userData.nickname
        ]);
        var sb = getSB();
        var signUpResult = await sb.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: { data: { role: 'teen' } }
        });
        if (signUpResult.error) throw signUpResult.error;
        var authData = signUpResult.data;
        console.log('signUp done. hasSession:', !!authData.session, 'hasUser:', !!authData.user);

        var uid = authData.user.id;
        var insertResult = await sb.from('users').insert([{
            id: uid, email: userData.email, role: 'teen',
            full_name: userData.fullName || '',
            nickname: userData.nickname || '',
            age: userData.age || null,
            class: userData.class || '',
            school: userData.school || '',
            phone: userData.phone || '',
            points: 0, level: 1, badges: [], is_active: true
        }]).select().single();
        if (insertResult.error) throw insertResult.error;
        console.log('profile inserted');

        if (authData.session) {
            console.log('setting session...');
            await sb.auth.setSession(authData.session);
            console.log('session set OK');
        } else {
            console.log('NO SESSION - email confirm still on?');
        }
        return insertResult.data;
    },

    login: async function(email, password) {
        var sb = getSB();
        var result = await sb.auth.signInWithPassword({ email: email, password: password });
        if (result.error) throw result.error;
        var profileResult = await sb.from('users').select('*').eq('id', result.data.user.id).single();
        if (profileResult.error) throw profileResult.error;
        return profileResult.data;
    },

    logout: async function() {
        await getSB().auth.signOut().catch(function() {});
    },

    getCurrentUser: async function() {
        var CACHE_KEY = 'ecobala-user-cache';
        try {
            var sessionResult = await getSB().auth.getSession();
            var session = sessionResult.data.session;
            if (!session) {
                // Try to restore — Supabase sometimes needs a tick after reload
                await new Promise(function(r){ setTimeout(r, 300); });
                sessionResult = await getSB().auth.getSession();
                session = sessionResult.data.session;
            }
            if (!session) {
                console.log('getCurrentUser: no session');
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            var userResult = await getSB().auth.getUser();
            var user = userResult.data.user;
            if (!user) return null;
            var profileResult = await getSB().from('users').select('*').eq('id', user.id).single();
            var profile = profileResult.data ? normalizeUserProfile(profileResult.data) : null;
            if (profile) {
                try { localStorage.setItem(CACHE_KEY, JSON.stringify(profile)); } catch(e) {}
            }
            return profile;
        } catch(e) {
            console.error('getCurrentUser error:', e);
            // Return cached profile as fallback (for network issues)
            try {
                var cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                    console.log('getCurrentUser: using cached profile');
                    return normalizeUserProfile(JSON.parse(cached));
                }
            } catch(e2) {}
            return null;
        }
    },

    requireRole: async function(role, redirectTo) {
        var user = await this.getCurrentUser();
        if (!user || user.role !== role) {
            window.location.href = redirectTo || 'index.html';
            return null;
        }
        return user;
    },

    autoRedirectIfLoggedIn: async function() {
        try {
            var user = await this.getCurrentUser();
            if (user) {
                console.log('autoRedirect: found user role=' + user.role);
                if (user.role === 'teen') window.location.href = 'teen.html';
                else if (user.role === 'kids') window.location.href = 'kids.html';
                else if (user.role === 'admin') window.location.href = 'admin.html';
            } else {
                console.log('autoRedirect: no user');
            }
        } catch(e) {
            console.error('autoRedirect error:', e);
        }
    }
};

window.EcoBalaDB = {

    getLeaderboard: async function(role) {
        var q = getSB().from('users').select('*').order('points', { ascending: false }).limit(100);
        var result = role ? await q.eq('role', role) : await q;
        return (result.data || []).map(function(u) {
            var normalized = normalizeUserProfile(u);
            return Object.assign({}, normalized, {
                name: normalized.nickname || (normalized.child_name ? (normalized.child_name + (normalized.child_surname ? ' ' + normalized.child_surname : '')).trim() : null) || normalized.full_name || 'Аноним',
                avatar: normalized.avatar_url || null
            });
        });
    },

    getAllUsers: async function() {
        var result = await getSB().from('users').select('*').order('points', { ascending: false });
        return result.data || [];
    },

    updateUser: async function(id, updates) {
        var sb = getSB();
        var safe = Object.assign({}, updates || {});
        if (Object.prototype.hasOwnProperty.call(safe, 'points')) {
            var baseRes = await sb.from('users').select('*').eq('id', id).single();
            if (baseRes.error) throw baseRes.error;
            var current = normalizeUserProfile(baseRes.data);
            var nextPoints = Math.max(0, Number(safe.points || 0));
            delete safe.points;
            if (safe.class !== undefined) safe.class = String(safe.class || '');
            if (safe.school !== undefined) safe.school = String(safe.school || '');
            var merged = Object.assign({}, current, safe, { points: nextPoints });
            var normalizedState = normalizeProfileState(merged);
            var level = calcEcoLevel(nextPoints);
            normalizedState.garden = growGardenState(level, merged.role || current.role || 'kids');
            if (!normalizedState.lastLevelReward || Number(normalizedState.lastLevelReward.level || 0) > level) {
                normalizedState.lastLevelReward = null;
            }
            return await updateUserWithOptionalProfileState(sb, id, Object.assign({}, safe, {
                points: nextPoints,
                level: level
            }), normalizedState);
        }
        var result = await sb.from('users').update(safe).eq('id', id).select().single();
        if (result.error) throw result.error;
        return normalizeUserProfile(result.data);
    },

    adjustUserPoints: async function(id, delta) {
        var sb = getSB();
        var res = await sb.from('users').select('*').eq('id', id).single();
        if (res.error) throw res.error;
        var user = normalizeUserProfile(res.data);
        var nextPoints = Math.max(0, Number(user.points || 0) + Number(delta || 0));
        var level = calcEcoLevel(nextPoints);
        var state = normalizeProfileState(Object.assign({}, user, { points: nextPoints, level: level }));
        state.garden = growGardenState(level, user.role || 'kids');
        if (Number(delta || 0) > 0 && level > Number(user.level || 1)) {
            state.lastLevelReward = {
                level: level,
                bonus: 0,
                unlocks: getLevelRewardConfig(level),
                at: new Date().toISOString()
            };
        } else if (Number(delta || 0) < 0 && Number(state.lastLevelReward && state.lastLevelReward.level || 0) > level) {
            state.lastLevelReward = null;
        }
        return await updateUserWithOptionalProfileState(sb, id, {
            points: nextPoints,
            level: level
        }, state);
    },
    deleteUser: async function(id) {
        var result = await getSB().from('users').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getTeenReports: async function() {
        var result = await getSB().from('teen_reports').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveTeenReport: async function(report) {
        var result = await getSB().from('teen_reports').upsert([report]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteTeenReport: async function(id) {
        var result = await getSB().from('teen_reports').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    deleteTeenReportsByUser: async function(userId) {
        await getSB().from('teen_reports').delete().eq('user_id', userId);
    },

    getTeenQuests: async function() {
        var result = await getSB().from('teen_quests').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveTeenQuest: async function(quest) {
        var result = await getSB().from('teen_quests').upsert([quest]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteTeenQuest: async function(id) {
        var result = await getSB().from('teen_quests').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getKidsLessons: async function() {
        var result = await getSB().from('kids_lessons').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveKidsLesson: async function(lesson) {
        var result = await getSB().from('kids_lessons').upsert([lesson]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteKidsLesson: async function(id) {
        var result = await getSB().from('kids_lessons').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getKidsGames: async function() {
        var result = await getSB().from('kids_games').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveKidsGame: async function(game) {
        var result = await getSB().from('kids_games').upsert([game]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },

    deleteKidsGame: async function(id) {
        var result = await getSB().from('kids_games').delete().eq('id', id);
        if (result.error) throw result.error;
    },

    getTeenQuestTakes: async function() {
        var sb = getSB();
        var result = await sb.from('teen_quest_takes').select('*').order('created_at', { ascending: false });
        if (result.error) result = await sb.from('teen_quest_takes').select('*');
        return result.data || [];
    },

    saveTeenQuestTake: async function(take) {
        var sb = getSB();
        var variants = [
            take,
            { id: take.id, user_id: take.user_id, quest_id: take.quest_id, status: take.status, updated_at: take.updated_at },
            { id: take.id, user_id: take.user_id, quest_id: take.quest_id, status: take.status },
            { user_id: take.user_id, quest_id: take.quest_id, status: take.status }
        ];
        var lastError = null;
        for (var i = 0; i < variants.length; i++) {
            var result = await sb.from('teen_quest_takes').upsert([variants[i]]).select().single();
            if (!result.error) return result.data;
            lastError = result.error;
        }
        throw lastError;
    },

    getTeenQuestReviews: async function() {
        var result = await getSB().from('teen_quest_reviews').select('*').order('created_at', { ascending: false });
        return result.data || [];
    },

    saveTeenQuestReview: async function(review) {
        var result = await getSB().from('teen_quest_reviews').upsert([review]).select().single();
        if (result.error) throw result.error;
        return result.data;
    },


    incrementLessonDone: async function(userId, pointsEarned) {
        var sb = getSB();
        var res = await sb.from('users').select('*').eq('id', userId).single();
        if (res.error) throw res.error;
        var u = normalizeUserProfile(res.data);
        var newLessons = (u.lessons_done || 0) + 1;
        var built = buildProgressPayload(u, pointsEarned || 0);
        var badges = Array.isArray(u.badges) ? u.badges.slice() : [];
        if (newLessons === 1 && !badges.includes('first')) badges.push('first');
        if (newLessons >= 5 && !badges.includes('student')) badges.push('student');
        if (newLessons >= 10 && !badges.includes('scholar')) badges.push('scholar');
        if (built.progress.level >= 3 && !badges.includes('gold')) badges.push('gold');
        return await updateUserWithOptionalProfileState(sb, userId, {
            lessons_done: newLessons,
            points: built.progress.points,
            level: built.progress.level,
            badges: badges
        }, built.profileState);
    },

    incrementQuestDone: async function(userId, pointsEarned) {
        var sb = getSB();
        var res = await sb.from('users').select('*').eq('id', userId).single();
        if (res.error) throw res.error;
        var u = normalizeUserProfile(res.data);
        var newQuests = (u.quests_done || 0) + 1;
        var newReports = (u.reports_sent || 0) + 1;
        var built = buildProgressPayload(u, pointsEarned || 0);
        var badges = Array.isArray(u.badges) ? u.badges.slice() : [];
        if (newQuests >= 1 && !badges.includes('explorer')) badges.push('explorer');
        if (newQuests >= 5 && !badges.includes('hero')) badges.push('hero');
        if (newQuests >= 10 && !badges.includes('champion')) badges.push('champion');
        if (newReports >= 1 && !badges.includes('reporter')) badges.push('reporter');
        if (built.progress.level >= 3 && !badges.includes('gold')) badges.push('gold');
        return await updateUserWithOptionalProfileState(sb, userId, {
            quests_done: newQuests,
            reports_sent: newReports,
            points: built.progress.points,
            level: built.progress.level,
            badges: badges
        }, built.profileState);
    },

    incrementGamePlayed: async function(userId, pointsEarned) {
        var sb = getSB();
        var res = await sb.from('users').select('*').eq('id', userId).single();
        if (res.error) throw res.error;
        var u = normalizeUserProfile(res.data);
        var newGames = (u.games_played || 0) + 1;
        var built = buildProgressPayload(u, pointsEarned || 0);
        var badges = Array.isArray(u.badges) ? u.badges.slice() : [];
        if (newGames >= 1 && !badges.includes('gamer')) badges.push('gamer');
        if (newGames >= 5 && !badges.includes('streak')) badges.push('streak');
        if (built.progress.level >= 3 && !badges.includes('gold')) badges.push('gold');
        return await updateUserWithOptionalProfileState(sb, userId, {
            games_played: newGames,
            points: built.progress.points,
            level: built.progress.level,
            badges: badges
        }, built.profileState);
    },

    getUserStats: async function(userId) {
        var res = await getSB().from('users')
            .select('points, level, badges, lessons_done, quests_done, games_played, reports_sent')
            .eq('id', userId).single();
        if (res.error) throw res.error;
        return res.data;
    },

    getDashboardStats: async function() {
        var results = await Promise.all([
            getSB().from('users').select('id, role, points, school'),
            getSB().from('teen_reports').select('id, status'),
            getSB().from('teen_quests').select('id'),
            getSB().from('kids_lessons').select('id')
        ]);
        var users   = results[0].data || [];
        var reports = results[1].data || [];
        var quests  = results[2].data || [];
        var lessons = results[3].data || [];
        var schoolMap = {};
        users.forEach(function(u) {
            var s = (u.school || '').trim();
            if (!s) return;
            if (!schoolMap[s]) schoolMap[s] = { score: 0, count: 0 };
            schoolMap[s].score += Number(u.points || 0);
            schoolMap[s].count += 1;
        });
        var schools = Object.entries(schoolMap)
            .map(function(e) { return Object.assign({ school: e[0] }, e[1]); })
            .sort(function(a, b) { return b.score - a.score; });
        return {
            users: users,
            kidsCount:   users.filter(function(u) { return u.role === 'kids'; }).length,
            teenCount:   users.filter(function(u) { return u.role === 'teen'; }).length,
            totalPoints: users.reduce(function(a, u) { return a + Number(u.points || 0); }, 0),
            topSchool:   schools[0] || null,
            reportCounts: { all: reports.length },
            questsCount:  quests.length,
            lessonsCount: lessons.length,
            schools: schools
        };
    }
};
/* ECOBALA PROFILE UPGRADE START */
(function() {
  var DAY_MS = 86400000;
  var MARKS = [10, 25, 50, 100];
  var oldState = normalizeProfileState;
  var oldUser = normalizeUserProfile;
  var oldGet = window.EcoBalaAuth && window.EcoBalaAuth.getCurrentUser;
  var oldLogin = window.EcoBalaAuth && window.EcoBalaAuth.login;
  var KZ_TZ = 'Asia/Almaty';
  function iso(d) {
    d = d ? new Date(d) : new Date();
    if (isNaN(d.getTime())) d = new Date();
    try {
      var parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: KZ_TZ,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).formatToParts(d);
      var map = {};
      for (var i = 0; i < parts.length; i++) if (parts[i].type !== 'literal') map[parts[i].type] = parts[i].value;
      if (map.year && map.month && map.day) return map.year + '-' + map.month + '-' + map.day;
    } catch (e) {}
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function gap(a, b) {
    if (!a || !b) return null;
    var da = new Date(a + 'T00:00:00');
    var db = new Date(b + 'T00:00:00');
    if (isNaN(da.getTime()) || isNaN(db.getTime())) return null;
    return Math.round((db.getTime() - da.getTime()) / DAY_MS);
  }
  function enrich(state) {
    var s = Object.assign({}, state || {});
    s.version = Math.max(2, Number(s.version || 1));
    s.streakDays = Math.max(0, Number(s.streakDays || 0));
    s.lastVisitDate = s.lastVisitDate || '';
    s.lastVisitAt = s.lastVisitAt || '';
    s.lastStreakMilestone = Math.max(0, Number(s.lastStreakMilestone || 0));
    s.lastStreakMilestoneAt = s.lastStreakMilestoneAt || '';
    s.selectedBanner = s.selectedBanner || 'meadow';
    s.selectedNickColor = s.selectedNickColor || 'emerald';
    s.selectedFrame = s.selectedFrame || 'leaf';
    s.selectedAura = s.selectedAura || '';
    return s;
  }
  normalizeProfileState = function(user) { return enrich(oldState(user)); };
  normalizeUserProfile = function(user) {
    var next = oldUser(user);
    if (!next) return null;
    next.profile_state = normalizeProfileState(next);
    persistProfileStateLocal(next.id, next.profile_state);
    return next;
  };
  function streakify(user) {
    var next = normalizeUserProfile(user);
    if (!next) return null;
    var state = normalizeProfileState(next);
    var today = iso();
    var changed = false;
    if (!state.lastVisitDate) {
      state.streakDays = 1;
      state.lastVisitDate = today;
      state.lastVisitAt = new Date().toISOString();
      changed = true;
    } else if (state.lastVisitDate !== today) {
      state.streakDays = gap(state.lastVisitDate, today) === 1 ? Math.max(1, state.streakDays + 1) : 1;
      state.lastVisitDate = today;
      state.lastVisitAt = new Date().toISOString();
      changed = true;
    } else if (!state.lastVisitAt) {
      state.lastVisitAt = new Date().toISOString();
      changed = true;
    }
    if (changed) {
      state.lastStreakMilestone = 0;
      for (var i = 0; i < MARKS.length; i++) if (state.streakDays === MARKS[i]) state.lastStreakMilestone = MARKS[i];
      state.lastStreakMilestoneAt = state.lastStreakMilestone ? today : '';
    }
    next.profile_state = enrich(state);
    return { user: next, changed: changed };
  }
  async function syncDailyVisit(user) {
    var built = streakify(user);
    if (!built) return null;
    if (!built.changed) return built.user;
    try { return await updateUserWithOptionalProfileState(getSB(), built.user.id, {}, built.user.profile_state); }
    catch (e) { persistProfileStateLocal(built.user.id, built.user.profile_state); return built.user; }
  }
  async function updateProfileCosmetics(userId, patch) {
    var sb = getSB();
    var res = await sb.from('users').select('*').eq('id', userId).single();
    if (res.error) throw res.error;
    var user = normalizeUserProfile(res.data);
    var state = normalizeProfileState(user);
    Object.assign(state, patch || {});
    return await updateUserWithOptionalProfileState(sb, userId, {}, state);
  }
  if (oldLogin) {
    window.EcoBalaAuth.login = async function(email, password) {
      var user = await oldLogin(email, password);
      user = normalizeUserProfile(user);
      try { return await syncDailyVisit(user); } catch (e) { return user; }
    };
  }
  if (oldGet) {
    window.EcoBalaAuth.getCurrentUser = async function() {
      var user = await oldGet.call(window.EcoBalaAuth);
      if (!user) return null;
      user = normalizeUserProfile(user);
      try { return await syncDailyVisit(user); } catch (e) { return user; }
    };
  }
  window.EcoBalaProfile = Object.assign({}, window.EcoBalaProfile || {}, {
    normalizeUser: normalizeUserProfile,
    getProfileState: function(user) { return normalizeProfileState(user || {}); },
    syncDailyVisit: syncDailyVisit,
    updateProfileCosmetics: updateProfileCosmetics
  });
  window.EcoBalaDB = Object.assign({}, window.EcoBalaDB || {}, {
    updateProfileCosmetics: updateProfileCosmetics
  });
})();
/* ECOBALA PROFILE UPGRADE END */







