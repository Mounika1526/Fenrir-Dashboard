export const orgStats = {
  org: 'Project X',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
}

export const severityStats = [
  { level: 'Critical', count: 86, change: 2.0,  direction: 'up' },
  { level: 'High',     count: 16, change: 0.9,  direction: 'up' },
  { level: 'Medium',   count: 26, change: 0.9,  direction: 'down' },
  { level: 'Low',      count: 16, change: 0.9,  direction: 'up' },
]

export const scans = [
  { id: '1',  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '2',  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '3',  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '4',  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '5',  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '6',  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '7',  name: 'Web App Servers', type: 'Greybox',  status: 'Completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: '8',  name: 'Web App Servers', type: 'Greybox',  status: 'Scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago' },
  { id: '9',  name: 'Web App Servers', type: 'Greybox',  status: 'Scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago' },
  { id: '10', name: 'IoT Devices',     type: 'Blackbox', status: 'Failed',    progress: 10,  vuln: { critical: 2, high: 4,  medium: 8,  low: 1 },  lastScan: '3d ago' },
  { id: '11', name: 'Temp Data',       type: 'Blackbox', status: 'Failed',    progress: 10,  vuln: { critical: 2, high: 4,  medium: 8,  low: 1 },  lastScan: '3d ago' },
]

export const activeScan = {
  id: 'new',
  project: 'Private Assets',
  name: 'New Scan',
  status: 'In Progress',
  progress: 0,
  steps: ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'],
  activeStep: 0,
  scanType: 'Grey Box',
  targets: 'google.com',
  startedAt: 'Nov 22, 09:00AM',
  credentials: '2 Active',
  files: 'Control.pdf',
  checklists: '40/350',
}

// Each segment: { text, type: 'normal'|'url'|'code'|'path'|'bold' }
export const activityLog = [
  {
    time: '09:00:00',
    segments: [
      { text: "I'll begin a systematic penetration test on ", type: 'normal' },
      { text: 'helpdesk.democorp.com', type: 'url' },
      { text: '. Let me start with reconnaissance and enumeration.', type: 'normal' },
    ],
  },
  {
    time: '09:01:00',
    segments: [
      { text: 'Good! target is online. Now let me perform port scanning to identify running services.', type: 'normal' },
    ],
  },
  {
    time: '09:02:00',
    segments: [
      { text: 'Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.', type: 'normal' },
    ],
  },
  {
    time: '09:03:00',
    segments: [
      { text: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: ', type: 'normal' },
      { text: '"TODO: Delete the testing account (test:test)"', type: 'url' },
      { text: '. Let me test this credential. The login redirects to ', type: 'normal' },
      { text: '/password/test', type: 'path' },
      { text: '. Let me follow that path and explore it.', type: 'normal' },
    ],
  },
  {
    time: '09:04:00',
    segments: [
      { text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to ", type: 'normal' },
      { text: "'#'", type: 'url' },
      { text: ' which means the current page. Let me try a different approach.', type: 'normal' },
    ],
  },
  {
    time: '09:05:00',
    segments: [
      { text: 'It redirects back to /password/test. Let me check if there\'s an /api endpoint or look for other paths. Let me also try exploring with the ', type: 'normal' },
      { text: 'test:test', type: 'url' },
      { text: ' password directly on other endpoints.', type: 'normal' },
    ],
  },
  {
    time: '09:06:00',
    segments: [
      { text: "Great! I can access the dashboard using the ", type: 'normal' },
      { text: "'X-UserId: 10032'", type: 'code' },
      { text: ' header.\nThe dashboard shows "Welcome, John Doe". This suggests an ', type: 'normal' },
      { text: '**IDOR vulnerability**', type: 'bold' },
      { text: ' - I can access any user\'s dashboard by just changing the X-UserId header. Let me explore more of the application...', type: 'normal' },
    ],
  },
]

export const verificationLoops = [
  {
    time: '09:10:00',
    segments: [
      { text: 'Verification loop initiated. Testing IDOR on ', type: 'normal' },
      { text: '/api/users/{id}', type: 'path' },
      { text: ' with IDs 10001–10050.', type: 'normal' },
    ],
  },
  {
    time: '09:11:00',
    segments: [
      { text: 'Confirmed: 47/50 user records accessible without authorization. Severity: ', type: 'normal' },
      { text: 'CRITICAL', type: 'bold' },
    ],
  },
]

export const findings = [
  {
    id: 1,
    severity: 'Critical',
    time: '10:45:23',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
  },
  {
    id: 2,
    severity: 'High',
    time: '10:45:23',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
  },
  {
    id: 3,
    severity: 'Medium',
    time: '10:45:23',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
  },
]

export const statusBarData = {
  subAgents: 0,
  parallelExecutions: 2,
  operations: 1,
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
}
