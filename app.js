// Remember.For.Me - Core Application Logic & Simulator Engine (Offline Mode)

// --- 1. State Management & Initial Settings ---
const DEFAULT_ROUTINES = [
  { id: '1', task: 'Breakfast & Multivitamins', time: '08:30', period: 'morning', voice: true },
  { id: '2', task: 'Blood Pressure Check', time: '10:15', period: 'morning', voice: true },
  { id: '3', task: 'Lunch & Take White Capsule', time: '12:30', period: 'afternoon', voice: true },
  { id: '4', task: 'Afternoon Nap & Rest', time: '13:45', period: 'afternoon', voice: false },
  { id: '5', task: 'Fresh Warm Tea & Cookie', time: '15:30', period: 'afternoon', voice: true },
  { id: '6', task: 'Dinner & Heart Medication', time: '18:45', period: 'evening', voice: true },
  { id: '7', task: 'Read Book & Evening Walk', time: '19:45', period: 'evening', voice: false },
  { id: '8', task: 'Warm Shower & Sleep Prep', time: '21:30', period: 'evening', voice: true }
];

const DEFAULT_TAGS = [
  { id: 'wallet', name: 'Leather Wallet Tag', location: 'Hallway Key Box', status: 'safe' },
  { id: 'keys', name: 'Front Door Keys Tag', location: 'Kitchen Hook', status: 'safe' },
  { id: 'pillbox', name: 'Pillbox Smart Tag', location: 'Dining Table Drawer', status: 'safe' }
];

const STATE = {
  currentView: 'cg', // cg | pk | split
  routines: JSON.parse(localStorage.getItem('remember_routines_off')) || DEFAULT_ROUTINES,
  tags: JSON.parse(localStorage.getItem('remember_tags_off')) || DEFAULT_TAGS,
  alerts: JSON.parse(localStorage.getItem('remember_alerts_off')) || [
    { time: getTimestamp(), content: '🟢 Info: Remember.For.Me Home Station Kiosk online.', level: 'success' },
    { time: getTimestamp(), content: '🟢 Info: Wearable Safety Tracker synced. Battery: 88%, Heart Rate: 72 BPM.', level: 'success' },
    { time: getTimestamp(), content: '🟢 Info: All 3 Smart BLE tags located within range.', level: 'success' }
  ],
  tracker: {
    heartRate: 72,
    battery: 88,
    isWandering: false,
    coords: { lat: 1.3521, lng: 103.8198 }
  },
  lastTriggeredMinute: '' // Prevent duplicate announcements within the same minute
};

// Help Utilities
function getTimestamp() {
  const now = new Date();
  return now.toTimeString().substring(0, 5) + ' ' + now.toLocaleDateString('en-SG', { day: '2-digit', month: 'short' });
}

function saveState() {
  localStorage.setItem('remember_routines_off', JSON.stringify(STATE.routines));
  localStorage.setItem('remember_tags_off', JSON.stringify(STATE.tags));
  localStorage.setItem('remember_alerts_off', JSON.stringify(STATE.alerts));
}

// --- 2. Interface View Switcher System ---
const domElements = {
  btnCgView: document.getElementById('btn-cg-view'),
  btnPkView: document.getElementById('btn-pk-view'),
  btnSplitView: document.getElementById('btn-split-view'),
  cgView: document.getElementById('cg-view'),
  pkView: document.getElementById('pk-view'),
  splitView: document.getElementById('split-view'),
  splitCgContainer: document.getElementById('split-cg-container'),
  splitPkContainer: document.getElementById('split-pk-container'),
  
  // Caregiver Elements
  txtHeartRate: document.getElementById('txt-heart-rate'),
  txtBattery: document.getElementById('txt-battery'),
  txtSafetyStatus: document.getElementById('txt-safety-status'),
  txtCoords: document.getElementById('txt-coords'),
  boxHeartRate: document.getElementById('box-heart-rate'),
  boxBattery: document.getElementById('box-battery'),
  boxGps: document.getElementById('box-gps'),
  bleTagList: document.getElementById('ble-tag-list'),
  routineListFeed: document.getElementById('routine-list-feed'),
  alertTimelineFeed: document.getElementById('alert-timeline-feed'),
  mapTracker: document.getElementById('map-tracker'),
  mapTrackerGlow: document.getElementById('map-tracker-glow'),
  mapGeofence: document.getElementById('map-geofence'),
  
  // Modals
  btnAddRoutine: document.getElementById('btn-add-routine'),
  addRoutineModal: document.getElementById('add-routine-modal'),
  btnCancelModal: document.getElementById('btn-cancel-modal'),
  btnSaveModal: document.getElementById('btn-save-modal'),
  btnOpenSetup: document.getElementById('btn-open-setup-guide'),
  setupGuideModal: document.getElementById('setup-guide-modal'),
  btnCloseSetup: document.getElementById('btn-close-setup'),
  
  // Kiosk Elements
  kioskClock: document.getElementById('kiosk-clock'),
  kioskCalendarDate: document.getElementById('kiosk-calendar-date'),
  kioskMorningEvents: document.getElementById('kiosk-morning-events'),
  kioskAfternoonEvents: document.getElementById('kiosk-afternoon-events'),
  kioskEveningEvents: document.getElementById('kiosk-evening-events'),
  
  // Voice announcement overlay
  voiceOverlay: document.getElementById('voice-announcement-overlay'),
  voiceText: document.getElementById('voice-announcement-text'),
  btnDismissAnnouncement: document.getElementById('btn-dismiss-announcement'),
  
  // Simulator Controls
  btnToggleSim: document.getElementById('btn-toggle-sim'),
  simulatorPanel: document.getElementById('simulator-panel'),
  simBtnWandering: document.getElementById('sim-btn-wandering'),
  simWanderingStatus: document.getElementById('sim-wandering-status'),
  simSliderHr: document.getElementById('sim-slider-hr'),
  simValHr: document.getElementById('sim-val-hr'),
  simBtnTagWallet: document.getElementById('sim-btn-tag-wallet'),
  simBtnTagKeys: document.getElementById('sim-btn-tag-keys'),
  simBtnTagPillbox: document.getElementById('sim-btn-tag-pillbox'),
  simStatusTagWallet: document.getElementById('sim-status-tag-wallet'),
  simStatusTagKeys: document.getElementById('sim-status-tag-keys'),
  simStatusTagPillbox: document.getElementById('sim-status-tag-pillbox'),
  simBtnTriggerVoice: document.getElementById('sim-btn-trigger-voice'),
  
  // Form inputs
  inputTaskName: document.getElementById('input-task-name'),
  selectPeriod: document.getElementById('select-period'),
  inputTime: document.getElementById('input-time'),
  checkVoice: document.getElementById('check-voice')
};

// Store original DOM parents
const originalCgDashboard = domElements.cgView.querySelector('.cg-dashboard');
const originalPkContainer = domElements.pkView.querySelector('.pk-screen-container');

function switchView(viewName) {
  STATE.currentView = viewName;
  
  // Deactivate buttons
  [domElements.btnCgView, domElements.btnPkView, domElements.btnSplitView].forEach(btn => btn.classList.remove('active'));
  // Hide screens
  [domElements.cgView, domElements.pkView, domElements.splitView].forEach(scr => scr.classList.remove('active'));
  
  // Move elements based on layouts
  if (viewName === 'cg') {
    domElements.cgView.appendChild(originalCgDashboard);
    domElements.cgView.classList.add('active');
    domElements.btnCgView.classList.add('active');
    document.body.style.backgroundColor = 'var(--cg-bg)';
  } else if (viewName === 'pk') {
    domElements.pkView.appendChild(originalPkContainer);
    domElements.pkView.classList.add('active');
    domElements.btnPkView.classList.add('active');
    document.body.style.backgroundColor = 'var(--pk-bg)';
  } else if (viewName === 'split') {
    domElements.splitCgContainer.appendChild(originalCgDashboard);
    domElements.splitPkContainer.appendChild(originalPkContainer);
    domElements.splitView.classList.add('active');
    domElements.btnSplitView.classList.add('active');
    document.body.style.backgroundColor = 'var(--cg-bg)';
  }
  
  // Trigger map re-render center adjustment in case sizing changes
  updateMapTrackerPosition();
}

domElements.btnCgView.addEventListener('click', () => switchView('cg'));
domElements.btnPkView.addEventListener('click', () => switchView('pk'));
domElements.btnSplitView.addEventListener('click', () => switchView('split'));

// --- 3. Alerts Timeline System ---
function logAlert(content, level = 'info') {
  const alert = { time: getTimestamp(), content, level };
  STATE.alerts.unshift(alert);
  
  // Cap at 30 logs
  if (STATE.alerts.length > 30) STATE.alerts.pop();
  
  saveState();
  renderAlerts();
}

function renderAlerts() {
  domElements.alertTimelineFeed.innerHTML = STATE.alerts.map(alert => `
    <div class="alert-item ${alert.level}">
      <div class="alert-time">${alert.time}</div>
      <div class="alert-content">${alert.content}</div>
    </div>
  `).join('');
}

document.getElementById('btn-clear-alerts').addEventListener('click', () => {
  STATE.alerts = [{ time: getTimestamp(), content: '🧹 Log timeline cleared by caregiver.', level: 'info' }];
  saveState();
  renderAlerts();
});

// --- 4. Smart BLE Proximity Tags System ---
function toggleTag(tagId) {
  const tag = STATE.tags.find(t => t.id === tagId);
  if (!tag) return;
  
  if (tag.status === 'safe') {
    tag.status = 'away';
    logAlert(`⚠️ Warning: Proximity tag '${tag.name}' moved out of range from ${tag.location}!`, 'warning');
  } else {
    tag.status = 'safe';
    logAlert(`🟢 Info: Proximity tag '${tag.name}' detected back near Home Station.`, 'success');
  }
  
  saveState();
  renderTags();
  updateSimulatorTagButtons();
}

function renderTags() {
  domElements.bleTagList.innerHTML = STATE.tags.map(tag => `
    <div class="tag-item">
      <div class="tag-info">
        <span class="tag-name">${tag.name}</span>
        <span class="tag-location">📍 ${tag.location}</span>
      </div>
      <span class="tag-status ${tag.status === 'safe' ? 'safe' : 'away'}">
        ${tag.status === 'safe' ? 'Near Station' : 'Away / Misplaced'}
      </span>
    </div>
  `).join('');
}

function updateSimulatorTagButtons() {
  const walletTag = STATE.tags.find(t => t.id === 'wallet');
  const keysTag = STATE.tags.find(t => t.id === 'keys');
  const pillboxTag = STATE.tags.find(t => t.id === 'pillbox');

  domElements.simStatusTagWallet.textContent = walletTag.status === 'safe' ? 'In Range' : 'Out of Range';
  domElements.simStatusTagWallet.style.color = walletTag.status === 'safe' ? 'var(--status-safe)' : 'var(--status-danger)';

  domElements.simStatusTagKeys.textContent = keysTag.status === 'safe' ? 'In Range' : 'Out of Range';
  domElements.simStatusTagKeys.style.color = keysTag.status === 'safe' ? 'var(--status-safe)' : 'var(--status-danger)';

  domElements.simStatusTagPillbox.textContent = pillboxTag.status === 'safe' ? 'In Range' : 'Out of Range';
  domElements.simStatusTagPillbox.style.color = pillboxTag.status === 'safe' ? 'var(--status-safe)' : 'var(--status-danger)';
}

domElements.simBtnTagWallet.addEventListener('click', () => toggleTag('wallet'));
domElements.simBtnTagKeys.addEventListener('click', () => toggleTag('keys'));
domElements.simBtnTagPillbox.addEventListener('click', () => toggleTag('pillbox'));

// --- 5. Routines Setup & Management ---
function getTaskIcon(taskName) {
  const lower = taskName.toLowerCase();
  if (lower.includes('breakfast') || lower.includes('lunch') || lower.includes('dinner') || lower.includes('eat') || lower.includes('cookie') || lower.includes('milk')) return '🥛';
  if (lower.includes('medicine') || lower.includes('capsule') || lower.includes('pill') || lower.includes('vitamin')) return '💊';
  if (lower.includes('blood') || lower.includes('pressure') || lower.includes('vitals') || lower.includes('doctor')) return '🩺';
  if (lower.includes('nap') || lower.includes('sleep') || lower.includes('bed') || lower.includes('rest')) return '😴';
  if (lower.includes('walk') || lower.includes('exercise') || lower.includes('garden')) return '🚶';
  if (lower.includes('shower') || lower.includes('bath') || lower.includes('wash')) return '🧼';
  if (lower.includes('tea') || lower.includes('coffee') || lower.includes('water')) return '🍵';
  return '📝';
}

function renderRoutines() {
  // Sort routines by time ascending
  STATE.routines.sort((a, b) => a.time.localeCompare(b.time));
  saveState();
  
  // Render Caregiver list
  domElements.routineListFeed.innerHTML = STATE.routines.map(r => `
    <div class="routine-card">
      <div class="routine-card-left">
        <span class="routine-time-badge">${r.time}</span>
        <div class="routine-details">
          <span class="routine-text">${r.task}</span>
          <span class="routine-sub">
            <span>${r.period.toUpperCase()}</span>
            ${r.voice ? '<span class="voice-badge">🔊 Voice</span>' : ''}
          </span>
        </div>
      </div>
      <button class="routine-delete-btn" onclick="deleteRoutine('${r.id}')" title="Delete routine">🗑️</button>
    </div>
  `).join('');

  // Render Kiosk lists
  const morningList = STATE.routines.filter(r => r.period === 'morning');
  const afternoonList = STATE.routines.filter(r => r.period === 'afternoon');
  const eveningList = STATE.routines.filter(r => r.period === 'evening');

  const mapKioskItem = r => `
    <div class="kiosk-event-item">
      <span class="kiosk-event-time">${r.time}</span>
      <span class="kiosk-event-title">${r.task}</span>
      <span class="kiosk-event-icon">${getTaskIcon(r.task)}</span>
    </div>
  `;

  domElements.kioskMorningEvents.innerHTML = morningList.length ? morningList.map(mapKioskItem).join('') : '<div style="font-size:0.9rem; color:var(--pk-text-secondary); text-align:center; padding:0.5rem 0;">No morning routines.</div>';
  domElements.kioskAfternoonEvents.innerHTML = afternoonList.length ? afternoonList.map(mapKioskItem).join('') : '<div style="font-size:0.9rem; color:var(--pk-text-secondary); text-align:center; padding:0.5rem 0;">No afternoon routines.</div>';
  domElements.kioskEveningEvents.innerHTML = eveningList.length ? eveningList.map(mapKioskItem).join('') : '<div style="font-size:0.9rem; color:var(--pk-text-secondary); text-align:center; padding:0.5rem 0;">No evening routines.</div>';
}

window.deleteRoutine = function(id) {
  const rIndex = STATE.routines.findIndex(r => r.id === id);
  if (rIndex === -1) return;
  const deleted = STATE.routines.splice(rIndex, 1)[0];
  logAlert(`🟢 Info: Removed routine task '${deleted.task}' scheduled for ${deleted.time}.`, 'info');
  renderRoutines();
};

// Modal Operations
domElements.btnAddRoutine.addEventListener('click', () => {
  domElements.addRoutineModal.classList.add('active');
});

domElements.btnCancelModal.addEventListener('click', () => {
  domElements.addRoutineModal.classList.remove('active');
  clearForm();
});

domElements.btnSaveModal.addEventListener('click', () => {
  const task = domElements.inputTaskName.value.trim();
  const period = domElements.selectPeriod.value;
  const time = domElements.inputTime.value;
  const voice = domElements.checkVoice.checked;
  
  if (!task) {
    alert('Please enter a routine task description.');
    return;
  }
  
  const newRoutine = {
    id: Date.now().toString(),
    task,
    time,
    period,
    voice
  };
  
  STATE.routines.push(newRoutine);
  logAlert(`🟢 Info: Added routine task '${task}' scheduled for ${time} (${period.toUpperCase()}).`, 'success');
  
  renderRoutines();
  domElements.addRoutineModal.classList.remove('active');
  clearForm();
});

function clearForm() {
  domElements.inputTaskName.value = '';
  domElements.selectPeriod.value = 'morning';
  domElements.inputTime.value = '08:00';
  domElements.checkVoice.checked = true;
}

// Setup Guide manual
domElements.btnOpenSetup.addEventListener('click', () => {
  domElements.setupGuideModal.classList.add('active');
});

domElements.btnCloseSetup.addEventListener('click', () => {
  domElements.setupGuideModal.classList.remove('active');
});

// --- 6. Safety Tracker & Geofencing Simulator ---
function toggleWandering() {
  STATE.tracker.isWandering = !STATE.tracker.isWandering;
  
  if (STATE.tracker.isWandering) {
    // Moves patient to a coordinate ~350 meters outside
    STATE.tracker.coords = { lat: 1.3552, lng: 103.8234 };
    domElements.txtSafetyStatus.innerHTML = '🔴 OUTSIDE SAFE ZONE (Geofence Breach!)';
    domElements.txtSafetyStatus.style.color = 'var(--status-danger)';
    domElements.txtCoords.textContent = '1.3552° N, 103.8234° E';
    domElements.boxGps.classList.add('danger');
    
    // Simulate smart tag leaving home since wallet goes with patient
    const wallet = STATE.tags.find(t => t.id === 'wallet');
    if (wallet && wallet.status === 'safe') {
      wallet.status = 'away';
      renderTags();
      updateSimulatorTagButtons();
    }
    
    logAlert(`🚨 ALERT: Patient has left the Safe Home Zone! Geofence breach detected at 1.3552° N, 103.8234° E. Please verify immediately!`, 'danger');
    speakAmbientComfortText("Alert. Geofence breach. Your relative has walked past the home boundaries. Please check their wearable locator.");
  } else {
    // Patient back home
    STATE.tracker.coords = { lat: 1.3521, lng: 103.8198 };
    domElements.txtSafetyStatus.innerHTML = '🟢 Safe inside Home Zone';
    domElements.txtSafetyStatus.style.color = 'var(--status-safe)';
    domElements.txtCoords.textContent = '1.3521° N, 103.8198° E';
    domElements.boxGps.classList.remove('danger');
    
    const wallet = STATE.tags.find(t => t.id === 'away');
    if (wallet && wallet.status === 'away') {
      wallet.status = 'safe';
      renderTags();
      updateSimulatorTagButtons();
    }
    
    logAlert(`🟢 Info: Patient has returned safely to the Home Zone.`, 'success');
  }
  
  updateMapTrackerPosition();
  updateSimulatorWanderingButton();
}

function updateMapTrackerPosition() {
  if (STATE.tracker.isWandering) {
    // Position outside geofence circle (radius is 75px, centered at 200, 150)
    domElements.mapTracker.setAttribute('cx', '270');
    domElements.mapTracker.setAttribute('cy', '85');
    domElements.mapTrackerGlow.setAttribute('cx', '270');
    domElements.mapTrackerGlow.setAttribute('cy', '85');
    domElements.mapTracker.setAttribute('fill', 'var(--status-danger)');
    domElements.mapTrackerGlow.setAttribute('fill', 'var(--status-danger-glow)');
  } else {
    // Position at center (home)
    domElements.mapTracker.setAttribute('cx', '200');
    domElements.mapTracker.setAttribute('cy', '150');
    domElements.mapTrackerGlow.setAttribute('cx', '200');
    domElements.mapTrackerGlow.setAttribute('cy', '150');
    domElements.mapTracker.setAttribute('fill', 'var(--cg-accent)');
    domElements.mapTrackerGlow.setAttribute('fill', 'var(--cg-accent-glow)');
  }
}

function updateSimulatorWanderingButton() {
  if (STATE.tracker.isWandering) {
    domElements.simWanderingStatus.className = 'sim-btn-status danger';
  } else {
    domElements.simWanderingStatus.className = 'sim-btn-status';
  }
}

domElements.simBtnWandering.addEventListener('click', toggleWandering);

// Vitals Heart Rate Slider
domElements.simSliderHr.addEventListener('input', (e) => {
  const hr = parseInt(e.target.value);
  STATE.tracker.heartRate = hr;
  domElements.simValHr.textContent = hr;
  domElements.txtHeartRate.textContent = hr;
  
  // Vitals Vibe & warnings check
  if (hr > 100) {
    domElements.boxHeartRate.className = 'vital-box danger pulse-animation';
    if (!STATE.boxHeartRateAlerted || STATE.boxHeartRateAlerted !== 'high') {
      logAlert(`🚨 ALERT: Patient heart rate exceeded threshold! Vitals spike: ${hr} BPM.`, 'danger');
      STATE.boxHeartRateAlerted = 'high';
    }
  } else if (hr < 50) {
    domElements.boxHeartRate.className = 'vital-box danger pulse-animation';
    if (!STATE.boxHeartRateAlerted || STATE.boxHeartRateAlerted !== 'low') {
      logAlert(`🚨 ALERT: Patient bradycardia warning! Vitals dropped: ${hr} BPM.`, 'danger');
      STATE.boxHeartRateAlerted = 'low';
    }
  } else {
    domElements.boxHeartRate.className = 'vital-box';
    if (STATE.boxHeartRateAlerted) {
      logAlert(`🟢 Info: Patient heart rate normalized: ${hr} BPM.`, 'success');
      STATE.boxHeartRateAlerted = null;
    }
  }
});

// Battery Simulation: drops 1% every 2 minutes
setInterval(() => {
  if (STATE.tracker.battery > 5) {
    STATE.tracker.battery -= 1;
    domElements.txtBattery.textContent = STATE.tracker.battery;
    
    if (STATE.tracker.battery === 15) {
      logAlert(`⚠️ Warning: Wearable tracker battery low (15%). Please place on charger soon.`, 'warning');
    }
  }
}, 120000);

// --- 7. Voice Announcement & Ambient Reassurance Systems ---
let speechUtterance = null;

function speakAmbientComfortText(text) {
  if ('speechSynthesis' in window) {
    // Cancel ongoing speech
    window.speechSynthesis.cancel();
    
    speechUtterance = new SpeechSynthesisUtterance(text);
    speechUtterance.lang = 'en-SG'; // Singapore localized voice if available
    speechUtterance.rate = 0.85;    // Slower, clearer voice for eldercare reassurance
    speechUtterance.pitch = 1.0;
    
    window.speechSynthesis.speak(speechUtterance);
  } else {
    console.warn("Speech synthesis not supported by this browser.");
  }
}

function triggerReminderVoiceAnnouncement(routine) {
  domElements.voiceText.textContent = routine.task;
  domElements.voiceOverlay.classList.add('active');
  
  // Create a gentle wording for patients with dementia
  const speechText = `Hello! Just a gentle reminder. It is now ${routine.time}. It is time to ${routine.task}. Please take your time, there is no rush.`;
  speakAmbientComfortText(speechText);
}

domElements.btnDismissAnnouncement.addEventListener('click', () => {
  domElements.voiceOverlay.classList.remove('active');
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
});

// Simulator force trigger reminder voice
domElements.simBtnTriggerVoice.addEventListener('click', () => {
  // Find a voice routine or construct a dummy comfort statement
  const voiceRoutines = STATE.routines.filter(r => r.voice);
  if (voiceRoutines.length) {
    // Pick random voice routine
    const randR = voiceRoutines[Math.floor(Math.random() * voiceRoutines.length)];
    triggerReminderVoiceAnnouncement(randR);
  } else {
    triggerReminderVoiceAnnouncement({ task: 'Drink a glass of water and rest comfortably on the sofa.', time: 'Now' });
  }
});

// --- 8. Clock & Context-Aware Scheduler ---
function updateClockAndCheckSchedule() {
  const now = new Date();
  
  // Update Patient Kiosk time & date
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;
  
  domElements.kioskClock.textContent = timeStr;
  
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  domElements.kioskCalendarDate.textContent = now.toLocaleDateString('en-SG', options);
  
  // Highlight active period block & update schedules
  updateActiveKioskPeriodBlock(now.getHours());
  
  // Check active schedules for triggers
  if (timeStr !== STATE.lastTriggeredMinute) {
    const matchingRoutine = STATE.routines.find(r => r.time === timeStr);
    if (matchingRoutine) {
      STATE.lastTriggeredMinute = timeStr;
      
      // Update alerts log
      logAlert(`📢 Notification: Kiosk triggered schedule task: '${matchingRoutine.task}'.`, 'info');
      
      if (matchingRoutine.voice) {
        triggerReminderVoiceAnnouncement(matchingRoutine);
      }
    }
  }
}

function updateClockAndCheckSchedule() {
  const now = new Date();
  
  // Update Patient Kiosk time & date
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;
  
  if (domElements.kioskClock) domElements.kioskClock.textContent = timeStr;
  
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  if (domElements.kioskCalendarDate) domElements.kioskCalendarDate.textContent = now.toLocaleDateString('en-SG', options);
  
  // Highlight active period block & update schedules
  updateActiveKioskPeriodBlock(now.getHours());
  
  // Check active schedules for triggers
  if (timeStr !== STATE.lastTriggeredMinute) {
    const matchingRoutine = STATE.routines.find(r => r.time === timeStr);
    if (matchingRoutine) {
      STATE.lastTriggeredMinute = timeStr;
      
      // Update alerts log
      logAlert(`📢 Notification: Kiosk triggered schedule task: '${matchingRoutine.task}'.`, 'info');
      
      if (matchingRoutine.voice) {
        triggerReminderVoiceAnnouncement(matchingRoutine);
      }
    }
  }
}

function updateActiveKioskPeriodBlock(currentHour) {
  // Reset periods
  const morningBlock = document.getElementById('period-morning-block');
  const afternoonBlock = document.getElementById('period-afternoon-block');
  const eveningBlock = document.getElementById('period-evening-block');
  
  const indMorning = document.getElementById('ind-morning');
  const indAfternoon = document.getElementById('ind-afternoon');
  const indEvening = document.getElementById('ind-evening');
  
  if (!morningBlock || !afternoonBlock || !eveningBlock) return;
  
  [morningBlock, afternoonBlock, eveningBlock].forEach(block => block.classList.remove('active'));
  [indMorning, indAfternoon, indEvening].forEach(ind => { if (ind) ind.style.display = 'none'; });
  
  if (currentHour >= 5 && currentHour < 12) {
    morningBlock.classList.add('active');
    if (indMorning) indMorning.style.display = 'inline-block';
  } else if (currentHour >= 12 && currentHour < 17) {
    afternoonBlock.classList.add('active');
    if (indAfternoon) indAfternoon.style.display = 'inline-block';
  } else {
    eveningBlock.classList.add('active');
    if (indEvening) indEvening.style.display = 'inline-block';
  }
}

// Collapsible Simulator Panel logic
domElements.btnToggleSim.addEventListener('click', () => {
  const isCollapsed = domElements.simulatorPanel.classList.toggle('collapsed');
  domElements.btnToggleSim.textContent = isCollapsed ? '▲' : '▼';
});

// --- 9. Initial Load & Orchestration ---
function init() {
  renderRoutines();
  renderTags();
  renderAlerts();
  updateSimulatorTagButtons();
  updateMapTrackerPosition();
  updateSimulatorWanderingButton();
  
  // Run clock updates
  updateClockAndCheckSchedule();
  setInterval(updateClockAndCheckSchedule, 1000);
  
  // Trigger initial visual welcome log in console
  console.log("Remember.For.Me - Frontend Kiosk and caregiver simulator loaded successfully.");
}

window.onload = init;
