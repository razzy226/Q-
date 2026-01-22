// script.js — patched version with more robust exercise matching + edge-case fixes

// Workouts (same as before)
const workouts = [
  {
    id: "home-1",
    type: "home",
    title: "Lower-body strength + bone support",
    text:
`Do 2–3 rounds (rest ~60s as needed)
- Chair sit-to-stand (or squat to chair): 8–12 reps
- Step-ups on a sturdy step (hold railing/chair): 8–10/leg
- Glute bridge: 10–15 reps
- Calf raises (hold wall): 12–20 reps
- Standing hip abduction (leg out to side): 10–15/leg`
  },
  {
    id: "home-2",
    type: "home",
    title: "Balance & mobility (Tandem / single-leg / short walks)",
    text:
`- Tandem stand (heel-to-toe, hold chair): 20–40 sec/side
- Single-leg stand (light fingertip support): 10–30 sec/side
- Reverse lunges to shallow range (or split-squat hold): 6–10/side
- Side steps (mini “shuffle” across room): 10–20 steps each way
- Heel-to-toe walk down hallway: 1–2 passes`
  },
  {
    id: "home-3",
    type: "home",
    title: "Low impact bone stimulus + strength circuit",
    text:
`Do 2 rounds
- March in place with strong arm swing: 60–90 sec
- Mini-squats (small range, slow): 10–15 reps
- Wall plank (forearms on wall): 20–40 sec
- Standing “good posture” hinge (tiny hip hinge, neutral spine): 8–12 reps
- Calf raises: 15–20 reps
If cleared by your clinician and comfortable: add “heel drops” (rise on toes → gently drop heels): 10–20 reps`
  },
  {
    id: "home-4",
    type: "home",
    title: "Full-body gentle strength + core stability",
    text:
`Do 2–3 rounds
- Sit-to-stand: 8–12 reps
- Standing wall press “plank” (hands on wall, lean): 20–40 sec
- Side-lying clam shells (no band): 10–15/side
- Farmer carry at home (optional, light bags/water bottles): 30–60 sec walking`
  },
  {
    id: "gym-1",
    type: "gym",
    title: "🏋️ WORKOUT 1 – Easy Full Body (Absolute Beginner)",
    text:
`Machine (1): Treadmill
Warm-up (5 min) - Treadmill walk at comfortable pace
Strength (15–18 min total) - Do 1–2 sets only, rest freely.
- Chair Squats (sit down, stand up) 8 reps
- Dumbbell Deadlift (very light) 8 reps
- Wall Push-Ups 6–8 reps
- One-Arm Dumbbell Row (bench supported) 8 reps/side
- Standing Calf Raises (holding rail) 10–12 reps
Cool-down (5 min) - Slow treadmill walk + gentle stretching`
  },
  {
    id: "gym-2",
    type: "gym",
    title: "🚶 WORKOUT 2 – Cardio + Just Enough Strength",
    text:
`Machine (1): Treadmill
Warm-up: 5 min easy walking
Cardio: Treadmill walk – 10–12 min (slightly faster but conversational)
Strength (10 min):
- Goblet Squat (very light DB) 6–8 reps
- Seated Dumbbell Chest Press (bench or chair) 8 reps
- Standing Dumbbell Curl 8–10 reps
Cool-down: Slow walk 3–5 min`
  },
  {
    id: "gym-3",
    type: "gym",
    title: "🦵 WORKOUT 3 – Lower Body & Bone Health (Very Gentle)",
    text:
`Machine (1): Treadmill
Warm-up: 5 min walk
Strength:
- Sit-to-Stand from Bench 8 reps
- Low Step-Ups (very low step) 5-6 reps per leg
- Dumbbell Deadlift (light) 8 reps
- Standing Calf Raises 12 reps
Optional Floor (2–3 min): Glute Bridges – 8 reps
Cool-down: Walk + stretch calves/hips`
  },
  {
    id: "gym-4",
    type: "gym",
    title: "💪 WORKOUT 4 – Upper Body & Posture (Easy)",
    text:
`Machine (1): Treadmill or Elliptical (slow)
Warm-up: 5 min easy cardio
Strength:
- One-Arm Dumbbell Row (very light) 8 reps/side
- Wall or Incline Push-Ups 6-8 reps
- Seated Dumbbell Shoulder Press (light) 6-8 reps
- Standing Dumbbell Lateral Raise 6-8 reps (very light)
Floor (Optional): Bent-Knee Crunch or Pelvic Tilt – 6-8 reps
Cool-down: Slow walk + shoulder stretches`
  },
  {
    id: "gym-5",
    type: "gym",
    title: "🔁 WORKOUT 5 – Super Simple Full-Body Circuit",
    text:
`Machine (1): Treadmill
Warm-up: 5 min treadmill walk
Circuit (2 rounds only). Move slowly, rest anytime.
- Chair Squats – 6–8 reps
- Dumbbell Row – 8 reps
- Wall Push-Ups – 6 reps
- March in Place – 45–60 seconds
(Rest 1–2 minutes, repeat once)
Cool-down: 5 min very easy walk`
  }
];

// Expert Tip Bank (unchanged)
const expertTips = [
  "Aim for a gradual weight loss of 7–10% of baseline body weight to improve liver and metabolic health.",
  "Maintain a daily caloric deficit of ~500–1000 kcal while ensuring adequate protein intake to preserve muscle mass.",
  "Break up prolonged periods of sitting with short walking or standing bouts throughout the day.",
  "Ensure follow-up bone mineral density scans every 1–2 years to monitor bone recovery after adopting a gluten-free lifestyle.",
  "Perform slow nasal breathing (e.g., 4-second inhale, 6-second exhale) to support relaxation and blood pressure control.",
  "Prioritize a Mediterranean or DASH-style dietary pattern rich in vegetables, fruits, whole grains, legumes, nuts, olive oil, and fish.",
  "Strictly avoid wheat, barley, rye, and non-certified oats to prevent malabsorption and bone loss.",
  "Choose naturally gluten-free staples such as rice, rice flour, lentils, or chickpea flour instead of atta, maida, or semolina.",
  "Choose low-glycemic index carbohydrates (e.g., oats, barley, lentils) instead of refined starches.",
  "Limit added sugars, especially fructose-sweetened beverages and desserts.",
  "Replace sugar-sweetened drinks with water, unsweetened tea, coffee, or zero-calorie beverages.",
  "Use olive oil as the primary added fat; minimize butter and shortening.",
  "Use ~1–2 teaspoons of oil per meal/serving when cooking.",
  "Limit saturated and trans fats from fatty meats, full-fat dairy, and processed foods.",
  "Emphasize lean proteins such as skinless poultry, fish, and legumes.",
  "Incorporate fatty fish 2–3 times per week; limit very fatty varieties (e.g., ilish) to once weekly and avoid deep-frying.",
  "Minimize sodium intake to ≤1500–2000 mg/day by avoiding processed and salty foods.",
  "Avoid high-sodium condiments and snacks (e.g., pickles, dried fish, packaged snack mixes).",
  "Aim for calcium intake of 1000–1200 mg/day from low-fat dairy, leafy greens, or fortified products.",
  "Maintain adequate vitamin D, magnesium, and vitamin K to support bone mineral density.",
  "Eat 4–5 smaller, more frequent meals per day to improve bile flow after gallbladder removal.",
  "Avoid large, high-fat, or deep-fried meals to prevent digestive urgency and diarrhea.",
  "Limit or avoid deep-fried Desi snacks and breads (e.g., luchi, porota, singara).",
  "Minimize intake of meats cooked in excessive oil (e.g., beef bhuna).",
  "Limit coconut-heavy curries after gallbladder removal.",
  "Avoid traditional sweet desserts (e.g., mishti doi, roshogolla).",
  "Fill at least half your plate with vegetables at main meals.",
  "Keep protein portions ~palm-sized.",
  "Limit cooked rice to ~½–1 cup per meal, depending on weight goals.",
  "Aim for ≥150 minutes of moderate-intensity or 75 minutes of vigorous aerobic activity per week.",
  "Distribute exercise across 3–5 days per week.",
  "Include resistance training for all major muscle groups at least 2 nonconsecutive days per week.",
  "Use moderate intensity (can talk but breathing and heart rate are increased).",
  "Combine aerobic and resistance training for optimal reduction in liver fat.",
  "Focus on weight-bearing and balance exercises to support bone density.",
  "Increase repetitions before increasing weight.",
  "Avoid holding your breath during exercise; exhale during the effort phase.",
  "Prioritize consistency over intensity.",
  "Hydrate well during activity and avoid very large meals immediately before workouts."
];

// Exercise descriptions dictionary (canonical name -> description)
const exerciseDescriptions = {
  "chair sit-to-stand": "Sit on the edge of a sturdy chair with feet flat and shoulder-width apart. Lean slightly forward, engage your core, and press through your heels to stand up fully until your hips and knees are extended. Pause briefly at the top, then slowly lower yourself back down until your bottom gently touches the seat. Keep your chest up and avoid rounding your back.",
  "chair squats": "Stand in front of a chair, feet hip-width. Lower yourself until your buttocks touch the chair (or tap it lightly) then push through the heels to stand back up. Use a slow controlled tempo.",
  "sit-to-stand": "Same as Chair Sit-to-Stand: sit near edge of a chair, feet flat, lean forward and push through heels to stand fully, then slowly lower back until the seat is touched.",
  "step-ups": "Stand facing a sturdy step or low platform. Place one foot flat on the step and press through that foot to lift your body up, straightening the hip and knee. Step down slowly and controlled. Hold a railing or chair for support if needed. Repeat on each leg.",
  "low step-ups": "Use a very low step. Step one foot up, press through the heel to stand tall, then lower slowly. Focus on control rather than height.",
  "glute bridge": "Lie on your back with knees bent and feet flat hip-width. Engage glutes and press through heels to lift hips until your body forms a straight line from shoulders to knees. Avoid overextending the lower back. Lower slowly back to the start.",
  "glute bridges": "Same as Glute Bridge: lie on your back, knees bent, lift hips by contracting glutes until hips are aligned with shoulders and knees; lower with control.",
  "calf raises": "Stand tall holding a wall or chair for balance. Rise up onto the balls of your feet, lifting heels as high as comfortable, hold briefly, then lower slowly until heels touch the ground. Keep weight centered over the feet.",
  "standing calf raises": "Same as Calf Raises: stand holding support, push up onto toes, pause, then lower slowly.",
  "standing hip abduction": "Stand tall beside a chair for support. Keep the supporting leg slightly bent and lift the other leg straight out to the side (no leaning), leading with the heel. Pause briefly at the top, then lower slowly. Keep torso upright throughout.",
  "tandem stand": "Stand with one foot directly in front of the other so the heel of the front foot touches the toes of the back foot. Use a chair lightly for support if needed. Keep a tall posture and hold the position for the prescribed time, then switch sides.",
  "single-leg stand": "Stand on one leg with the knee slightly bent, using a fingertip on a chair for light support if required. Keep hips level and maintain a tall posture. Hold for the prescribed time, then repeat on the other side.",
  "reverse lunges": "Stand tall with feet hip-width. Step one foot backward, lower your back knee toward the ground while keeping the front knee aligned over the ankle (shallow range is fine). Keep torso upright and push through the front heel to return to start. Repeat on each side.",
  "side steps": "Take small side-to-side steps (mini shuffle) across the room. Keep knees soft and move deliberately, maintaining balance and posture. Turn and return the other way.",
  "heel-to-toe walk": "Walk in a straight line placing the heel of one foot directly in front of the toes of the other foot each step. Walk slowly and deliberately for the specified passes; use a wall/chair nearby for support if needed.",
  "march in place": "Stand tall and lift your knees up toward hip level (or comfortably higher) while taking strong arm swings. Keep core engaged and land softly. Continue for the prescribed time.",
  "mini-squats": "Stand with feet hip-width. Bend knees slightly (small range), keeping chest up and sitting back a little, then return to standing. Move slowly and control the descent and ascent.",
  "wall plank": "Place forearms against the wall at shoulder height and step your feet back so your body forms an angled straight line. Keep core engaged, neck neutral, and hold for the target time. Do not let hips sag or rise.",
  "standing good posture hinge": "Stand tall, feet hip-width, hinge at the hips with a small controlled movement while keeping a neutral spine and slight knee bend. Think of pushing hips back a little and then returning to standing. Keep shoulders relaxed.",
  "standing wall press “plank”": "Stand facing a wall, place your hands on the wall at chest height and walk your feet back slightly so your body forms a slight lean. Hold the position keeping a straight line from head to heels, engaging core and shoulder stabilizers.",
  "side-lying clam shells": "Lie on one side with knees bent and stacked, hips slightly angled. Keeping heels together, lift the top knee up while keeping pelvis steady (do not roll back). Lower with control. Repeat for reps, then switch sides.",
  "farmer carry": "Hold a light weight (water bottle or bag) in each hand at your sides. Stand tall, shoulders down and back, and walk steadily for the prescribed time or distance while breathing normally.",
  "dumbbell deadlift": "Hold light dumbbells in front of your thighs with a neutral spine. Hinge at the hips, pushing them back while allowing the weights to slide down along the thighs toward the knees (keep slight knee bend). Maintain a straight back and soft knees; when you feel a stretch in the hamstrings, drive the hips forward to stand up.",
  "wall push-ups": "Stand facing a wall with hands flat on it at chest height. Step back so your body is angled. Bend elbows to bring chest toward the wall, then press back to the start. Keep body aligned and core engaged.",
  "one-arm dumbbell row": "Place one knee and the same-side hand on a bench for support. With the other hand hold a light dumbbell, hinge at the hips to a flat back, and pull the dumbbell toward your hip, squeezing the shoulder blade. Lower slowly and repeat. Keep torso stable.",
  "goblet squat": "Hold a light dumbbell or kettlebell close to your chest. Stand with feet slightly wider than hip-width, lower into a squat by pushing hips back and down while keeping chest up, then stand back up. Keep knees tracking over toes.",
  "seated dumbbell chest press": "Sit on a bench or chair with back support, hold dumbbells at chest level and press up until arms are extended. Lower with control to chest level.",
  "standing dumbbell curl": "Stand tall holding light dumbbells, curl the weights toward the shoulders while keeping elbows close to the body. Lower slowly.",
  "seated dumbbell shoulder press": "Sit with back support, hold dumbbells at shoulder height, press overhead while keeping core engaged and lower with control. Avoid arching the lower back.",
  "standing dumbbell lateral raise": "Stand tall holding light dumbbells at your sides. With a slight bend in the elbow, lift arms out to the sides up to shoulder height (or less), then lower slowly. Move with control and avoid shrugging shoulders.",
  "bent-knee crunch": "Lie on your back with knees bent and feet on the floor. Engage the core and gently lift the shoulders off the ground a few inches, focusing on the upper abdominal contraction. Lower with control.",
  "pelvic tilt": "Lie on your back with knees bent and feet flat. Flatten your lower back against the floor by gently tilting the pelvis upward and engaging the lower abdominals, then relax.",
  "heel drops": "Stand on a step with the balls of your feet on the edge and heels hanging off. Rise up onto toes, then slowly lower the heels below the step level until you feel a gentle stretch in the calf. Use support for balance and perform only if comfortable and cleared by a clinician.",
  "warm-up": "Gentle activity to raise heart rate and warm muscles, typically walking or light marching for 5 minutes.",
  "cool-down": "Slow walking and gentle stretching to bring heart rate down and aid recovery."
};

// -----------------------------
// Utilities for safe HTML + normalization
// -----------------------------
function escapeHtml(s){
  if(!s) return "";
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}
function escapeAttr(s){
  if(!s) return "";
  return escapeHtml(s).replaceAll("'","&#39;");
}
function normalizeForMatch(s){
  return normalizeForMatchWithMap(s).normalized;
}
function normalizeForMatchWithMap(s){
  if(!s) return { normalized: "", map: [] };
  let normalized = "";
  const map = [];
  let sawNonSpace = false;
  let lastWasSpace = false;
  for(let i = 0; i < s.length; i++){
    let ch = s[i];
    if(ch === '“' || ch === '”') ch = '"';
    if(ch === '‘' || ch === '’') ch = "'";
    if(ch === '\u2013' || ch === '\u2014') ch = '-';
    if(/\s/.test(ch)){
      if(!sawNonSpace) continue;
      if(lastWasSpace) continue;
      normalized += ' ';
      map.push(i);
      lastWasSpace = true;
      continue;
    }
    sawNonSpace = true;
    lastWasSpace = false;
    normalized += ch.toLowerCase();
    map.push(i);
  }
  if(normalized.endsWith(' ')){
    normalized = normalized.slice(0, -1);
    map.pop();
  }
  return { normalized, map };
}

// Build normalized-key -> original-key map
const exerciseKeyMap = {};
Object.keys(exerciseDescriptions).forEach(orig => {
  const nk = normalizeForMatch(orig);
  exerciseKeyMap[nk] = orig; // last-one-wins for colliding normalized keys
});
// sorted normalized keys by length desc (so longer matches first)
const exerciseKeys = Object.keys(exerciseKeyMap).sort((a,b)=> b.length - a.length);

// -----------------------------
// DOM references
// -----------------------------
const chooser = document.getElementById('chooser');
const homeBtn = document.getElementById('homeBtn');
const gymBtn = document.getElementById('gymBtn');

const app = document.getElementById('app');
const categoryLabel = document.getElementById('categoryLabel');
const changeCatBtn = document.getElementById('changeCatBtn');

const drawBtn = document.getElementById('drawBtn');
const resultTitle = document.getElementById('resultTitle');
const resultBody = document.getElementById('resultBody');
const copyBtn = document.getElementById('copyBtn');
const printBtn = document.getElementById('printBtn');
const allWorkoutsDiv = document.getElementById('allWorkouts');

// Tip elements
const tipToast = document.getElementById('tipToast');
const tipText = document.getElementById('tipText');
const tipClose = document.getElementById('tipClose');
let tipTimer = null;

// Modal elements
const exerciseModal = document.getElementById('exerciseModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const exerciseModalTitle = document.getElementById('exerciseModalTitle');
const exerciseModalBody = document.getElementById('exerciseModalBody');

let lastFocusedElement = null; // for returning focus after closing modal

// -----------------------------
// Render all workouts (reference)
// -----------------------------
function renderAllWorkouts(){
  allWorkoutsDiv.innerHTML = '';
  workouts.forEach(w => {
    const article = document.createElement('article');
    article.className = 'workout';
    article.id = w.id;

    const title = document.createElement('strong');
    title.textContent = w.title;

    const pre = document.createElement('pre');
    pre.className = 'workout-pre';
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.margin = '8px 0 0 0';
    pre.innerHTML = linkifyExercises(w.text);

    article.appendChild(title);
    article.appendChild(pre);
    allWorkoutsDiv.appendChild(article);
  });
}

// -----------------------------
// Linkify exercises in a plain-text workout description
// - Works on raw line text (not HTML-escaped) for correct indexing
// - Escapes non-matched parts before assembling HTML
// -----------------------------
function linkifyExercises(text){
  if(!text) return '';
  return text.split('\n').map(line => {
    const { normalized, map } = normalizeForMatchWithMap(line);
    if(!normalized || exerciseKeys.length === 0) return escapeHtml(line);

    const matches = [];
    for(const nk of exerciseKeys){
      let startIndex = 0;
      while(startIndex < normalized.length){
        const idx = normalized.indexOf(nk, startIndex);
        if(idx === -1) break;
        matches.push({ start: idx, end: idx + nk.length, key: nk });
        startIndex = idx + nk.length;
      }
    }

    if(matches.length === 0) return escapeHtml(line);

    matches.sort((a,b) => {
      if(a.start !== b.start) return a.start - b.start;
      return (b.end - b.start) - (a.end - a.start);
    });

    let result = "";
    let cursor = 0;
    let lastEnd = -1;
    for(const match of matches){
      if(match.start < lastEnd) continue;
      const origStart = map[match.start];
      const origEnd = map[match.end - 1] + 1;
      if(origStart == null || origEnd == null) continue;
      result += escapeHtml(line.slice(cursor, origStart));
      const visible = line.slice(origStart, origEnd);
      result += `<button class="exercise-link" data-exname="${escapeAttr(match.key)}" aria-haspopup="dialog">${escapeHtml(visible)}</button>`;
      cursor = origEnd;
      lastEnd = match.end;
    }
    result += escapeHtml(line.slice(cursor));
    return result;
  }).join('\n');
}

// -----------------------------
// Pick & render random workout (in category)
// -----------------------------
function filteredWorkoutsForCategory(cat){
  return workouts.filter(w => w.type === cat);
}

function pickRandomInCategory(cat){
  const list = filteredWorkoutsForCategory(cat);
  if(!list || list.length === 0){
    resultTitle.textContent = "No workouts available";
    resultBody.textContent = "Try changing category.";
    return;
  }

  // animation: flash through entries
  drawBtn.disabled = true;
  drawBtn.textContent = "Drawing...";
  let cycles = 10;
  let i = 0;
  const flash = setInterval(()=>{
    const w = list[Math.floor(Math.random()*list.length)];
    resultTitle.textContent = w.title;
    resultBody.innerHTML = linkifyExercises(w.text);
    i++;
    if(i>=cycles){
      clearInterval(flash);
      const final = list[Math.floor(Math.random()*list.length)];
      resultTitle.textContent = final.title;
      resultBody.innerHTML = linkifyExercises(final.text);
      drawBtn.disabled = false;
      drawBtn.textContent = "Draw workout";
      drawBtn.focus();
    }
  },80);
}

// -----------------------------
// Category flow
// -----------------------------
let currentCategory = null;

function enterCategory(cat){
  currentCategory = cat;
  chooser.hidden = true;
  chooser.setAttribute('aria-hidden', 'true');

  app.hidden = false;
  app.removeAttribute('aria-hidden');

  categoryLabel.textContent = (cat === 'home') ? 'Home workouts' : 'Gym workouts';
  setTimeout(()=> pickRandomInCategory(cat), 120);
  showRandomTip('app');
}

function showChooser(){
  currentCategory = null;
  app.hidden = true;
  app.setAttribute('aria-hidden', 'true');

  chooser.hidden = false;
  chooser.removeAttribute('aria-hidden');
  homeBtn.focus();

  resultTitle.textContent = "Your workout will appear here";
  resultBody.textContent = "Pick Home or Gym to start — a workout will be drawn automatically.";
  showRandomTip('chooser');
}

// -----------------------------
// Tip toast functions
// -----------------------------
function showRandomTip(screen){
  if(!expertTips || expertTips.length === 0) return;
  const tip = expertTips[Math.floor(Math.random() * expertTips.length)];
  tipText.textContent = tip;
  showTipToast();
}

function showTipToast(){
  if(tipTimer){ clearTimeout(tipTimer); tipTimer = null; }
  tipToast.hidden = false;
  requestAnimationFrame(()=> tipToast.classList.add('show'));
  tipTimer = setTimeout(hideTipToast, 8000);
}
function hideTipToast(){
  tipToast.classList.remove('show');
  setTimeout(()=> { tipToast.hidden = true; }, 260);
  if(tipTimer){ clearTimeout(tipTimer); tipTimer = null; }
}

// -----------------------------
// Modal functions: normalized key -> original key -> description
// -----------------------------
function openExerciseModal(normalizedKey, visibleLabel){
  const origKey = exerciseKeyMap[normalizedKey];
  const desc = (origKey && exerciseDescriptions[origKey]) ? exerciseDescriptions[origKey] : "Description not available for this item.";
  exerciseModalTitle.textContent = visibleLabel || (origKey ? origKey : toTitleCase(normalizedKey));
  exerciseModalBody.textContent = desc;
  lastFocusedElement = document.activeElement;
  exerciseModal.hidden = false;
  exerciseModal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
}

function closeExerciseModal(){
  exerciseModal.hidden = true;
  exerciseModal.setAttribute('aria-hidden', 'true');
  if(lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
}

function toTitleCase(s){
  return s.split(/[\s\-]+/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

// -----------------------------
// Event handlers
// -----------------------------
function handleExerciseClick(e){
  const el = e.target.closest('.exercise-link');
  if(!el) return;
  const nk = el.getAttribute('data-exname');
  if(!nk) return;
  const visible = el.innerText || (exerciseKeyMap[nk] || toTitleCase(nk));
  openExerciseModal(nk, visible);
}

// Buttons & interactions
homeBtn.addEventListener('click', ()=> enterCategory('home'));
gymBtn.addEventListener('click', ()=> enterCategory('gym'));

homeBtn.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterCategory('home'); }
});
gymBtn.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enterCategory('gym'); }
});

changeCatBtn.addEventListener('click', showChooser);

drawBtn.addEventListener('click', ()=> {
  if(!currentCategory) return;
  pickRandomInCategory(currentCategory);
});

// Copy
copyBtn.addEventListener('click', async ()=>{
  const text = `${resultTitle.textContent}\n\n${resultBody.innerText || resultBody.textContent}`;
  try{
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(()=> copyBtn.textContent = "Copy",1200);
  }catch(e){
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); copyBtn.textContent = "Copied!"; }
    finally { ta.remove(); setTimeout(()=> copyBtn.textContent = "Copy",1200); }
  }
});

// Print
printBtn.addEventListener('click', ()=> window.print());

// Tips
tipClose.addEventListener('click', hideTipToast);
tipClose.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hideTipToast(); }
});

// Modal close
modalClose.addEventListener('click', closeExerciseModal);
modalClose.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeExerciseModal(); }
});
modalOverlay.addEventListener('click', closeExerciseModal);

window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    if(!exerciseModal.hidden) closeExerciseModal();
  }
});

// Delegated clicks for exercise links
resultBody.addEventListener('click', handleExerciseClick);
allWorkoutsDiv.addEventListener('click', handleExerciseClick);

// -----------------------------
// Init
// -----------------------------
renderAllWorkouts();

window.addEventListener('load', ()=>{
  homeBtn.focus();
  setTimeout(()=> showRandomTip('chooser'), 250);
});