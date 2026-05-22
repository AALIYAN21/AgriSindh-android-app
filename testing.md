# SWAT AMIS (AgriSindh) — Testing Document

**Project:** SWAT AMIS – Agriculture Management Information System  
**Platform:** Android (React Native / Expo)  
**Version:** 1.0.0  
**Date:** May 18, 2026  
**Prepared By:** SWAT AMIS Development Team

---

## Table of Contents

1. Functional Testing
2. UI/UX Testing
3. Offline Synchronization Testing
4. Security Testing
5. Performance Testing
6. Device Compatibility Testing
7. Pilot Field Testing
8. User Acceptance Testing (UAT)

---

## 1. Functional Testing

Functional testing validates that every feature of the SWAT AMIS application works as specified in the requirements.

### 1.1 Authentication Module

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-AUTH-01 | Valid Login | Enter valid email & password, grant location permission, tap Login | User is authenticated, JWT token is stored in AsyncStorage, user is navigated to Home tab | ☐ |
| FT-AUTH-02 | Invalid Credentials | Enter incorrect email/password, tap Login | Error alert "Login Failed" is displayed, user remains on login screen | ☐ |
| FT-AUTH-03 | Empty Fields Login | Leave email or password empty, tap Login | Appropriate validation message is shown | ☐ |
| FT-AUTH-04 | Location Permission Denied | Deny location permission on login | Alert "Location Required" is shown, login is blocked | ☐ |
| FT-AUTH-05 | Password Visibility Toggle | Tap eye icon on password field | Password text toggles between hidden (dots) and visible (plain text) | ☐ |
| FT-AUTH-06 | Forgot Password Flow | Tap "Forgot Password", enter email, tap "Send OTP" | User is navigated to OTP Verification screen | ☐ |
| FT-AUTH-07 | OTP Verification | Enter 4-digit OTP, tap Verify | User is navigated to Set New Password screen | ☐ |
| FT-AUTH-08 | OTP Auto-Focus | Enter a digit in OTP field | Cursor automatically moves to next input field | ☐ |
| FT-AUTH-09 | OTP Timer & Resend | Wait for 60s countdown to expire | Resend button becomes active after timer reaches 00:00 | ☐ |
| FT-AUTH-10 | Set New Password Validation | Enter password not meeting criteria | Password rules show red/grey indicators; Reset button remains disabled | ☐ |
| FT-AUTH-11 | Set New Password Success | Enter strong matching passwords, tap Reset | Success modal appears, user is redirected to Login screen | ☐ |
| FT-AUTH-12 | Logout | Navigate to Profile, tap Logout | Token is removed from AsyncStorage, user is redirected to Login | ☐ |

### 1.2 Commodity Management Module

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-CMD-01 | Category Selection | Toggle between Vegetables and Fruits tabs | Commodity dropdown items update to reflect selected category | ☐ |
| FT-CMD-02 | Add Commodity Row | Tap "+ Add Row" button | New empty row is appended to the table | ☐ |
| FT-CMD-03 | Remove Commodity Row | Tap remove (red circle) icon on a row | Row is removed from table (minimum 1 row must remain) | ☐ |
| FT-CMD-04 | Select Item from Dropdown | Tap item picker, select a commodity | Selected commodity name appears in the row | ☐ |
| FT-CMD-05 | Select Grade | Tap grade picker, choose Grade A or B | Selected grade is displayed in the row | ☐ |
| FT-CMD-06 | Enter Price | Tap price field, enter numeric value | Price is recorded; only numeric keyboard is shown | ☐ |
| FT-CMD-07 | Save Commodity to Local DB | Fill all fields, tap Save | Data is inserted into SQLite `items` table with `synced=0`, success modal appears | ☐ |
| FT-CMD-08 | Save with Missing Fields | Leave required fields empty, tap Save | Error message "Missing required fields at row X" is returned | ☐ |
| FT-CMD-09 | Navigate to Volume Entry | After save, modal redirects to Volume screen | Volume screen loads items without volume from DB | ☐ |
| FT-CMD-10 | Date Display (Locked) | Open Commodity Listing screen | Today's date is auto-displayed and locked (non-editable) | ☐ |

### 1.3 Volume Entry Module

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-VOL-01 | Load Items Without Volume | Navigate to Volume screen | All items from DB with `volume IS NULL` are listed | ☐ |
| FT-VOL-02 | Enter Volume | Type numeric volume (kg) for an item | Volume value is updated in state | ☐ |
| FT-VOL-03 | Save Volume | Enter volumes for all items, tap Save | Volumes are saved to DB, success modal shown | ☐ |
| FT-VOL-04 | Empty State | Navigate when no items need volume | "No volume to enter" empty state is displayed | ☐ |

### 1.4 Image Upload Module

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-IMG-01 | Upload via Camera | Tap Upload, select "Take Photo" | Camera opens, captured photo appears as thumbnail | ☐ |
| FT-IMG-02 | Upload via Gallery | Tap Upload, select "Choose from Gallery" | Gallery opens, selected image(s) appear as thumbnails | ☐ |
| FT-IMG-03 | Remove Image | Tap red cancel icon on image thumbnail | Image is removed from the list | ☐ |
| FT-IMG-04 | Camera Permission Denied | Deny camera permission | Alert with option to open device Settings is shown | ☐ |
| FT-IMG-05 | Multiple Image Selection | Select multiple images from gallery | All selected images are displayed in horizontal scroll | ☐ |

### 1.5 Fee Collection Module

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-FEE-01 | View Unpaid Fees | Open Fee Collection, select UNPAID filter | Only unpaid fee records are displayed | ☐ |
| FT-FEE-02 | View Paid Fees | Select PAID filter | Only paid fee records are displayed | ☐ |
| FT-FEE-03 | Pay Fee | Tap Pay on unpaid item, enter amount, attach receipt, confirm | Item status changes to Paid | ☐ |
| FT-FEE-04 | Payment Modal | Tap Pay button | Modal opens with date, time, fixed fee, amount input, and image upload | ☐ |

### 1.6 Data Sync Module

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-SYN-01 | View Sync Stats | Navigate to Data Sync screen | Pie chart shows synced vs pending percentages | ☐ |
| FT-SYN-02 | Manual Sync | Tap "Sync Now" button with internet | Unsynced items are sent to server, chart updates | ☐ |
| FT-SYN-03 | Sync Without Data | Open sync screen with no data | "No data to sync" empty state with disabled button | ☐ |
| FT-SYN-04 | Sync Lock | Tap Sync rapidly multiple times | Only one sync operation runs (duplicate prevention) | ☐ |

### 1.7 Notification & Profile Modules

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-NOT-01 | View Notifications | Navigate to Alerts screen | List of system alerts with title, time, description is shown | ☐ |
| FT-PRF-01 | View Profile | Navigate to Profile tab | User avatar, name, email, and settings menu are displayed | ☐ |
| FT-PRF-02 | Account Info | Tap Account Info | Read-only profile form with name, email, phone, market, district | ☐ |
| FT-PRF-03 | Privacy & Security | Tap Security menu item | Data protection, security audit, and privacy policy info shown | ☐ |
| FT-PRF-04 | Help & Support | Tap Help, write complaint, submit | Success modal shown, complaint field is cleared | ☐ |
| FT-PRF-05 | Empty Complaint Submit | Tap Submit with empty complaint field | Error alert "Please write your complaint first" is shown | ☐ |

### 1.8 Localization Module

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| FT-L10N-01 | Switch to English | Select English from language toggle | All UI labels switch to English, LTR layout | ☐ |
| FT-L10N-02 | Switch to Urdu | Select Urdu from language toggle | All labels switch to Urdu, RTL layout applied | ☐ |
| FT-L10N-03 | Switch to Sindhi | Select Sindhi from language toggle | All labels switch to Sindhi, RTL layout applied | ☐ |
| FT-L10N-04 | Commodity Names Localized | Switch language on Commodity Listing | Dropdown items display in selected language | ☐ |

---

## 2. UI/UX Testing

UI/UX testing ensures the application is visually consistent, user-friendly, and accessible.

### 2.1 Visual Consistency

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| UI-VIS-01 | Color Theme Consistency | Primary green (#154212, #1F5D2B) is used consistently across all screens | ☐ |
| UI-VIS-02 | Font Consistency | Typography is uniform across headings, labels, and body text | ☐ |
| UI-VIS-03 | Icon Consistency | MaterialIcons are used consistently throughout the app | ☐ |
| UI-VIS-04 | Spacing & Padding | Uniform spacing and padding across all screens and cards | ☐ |
| UI-VIS-05 | Status Bar | Light-content status bar on dark headers, dark on light backgrounds | ☐ |

### 2.2 Navigation & Layout

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| UI-NAV-01 | Onboarding Flow | 3-stage onboarding with progress indicators, left/right tap navigation | ☐ |
| UI-NAV-02 | Skip Onboarding | "SKIP ONBOARDING" link navigates directly to Login | ☐ |
| UI-NAV-03 | Tab Navigation | Bottom tabs (Home, Categories, Profile) are accessible and highlighted correctly | ☐ |
| UI-NAV-04 | Back Navigation | Back buttons and Android back gesture return to previous screen | ☐ |
| UI-NAV-05 | Splash Screen | Animated splash with fade-in/scale, auto-redirects after 3 seconds | ☐ |

### 2.3 Responsive Design & RTL

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| UI-RTL-01 | RTL Layout (Urdu) | Text aligns right, icons/chevrons flip, row directions reverse | ☐ |
| UI-RTL-02 | RTL Layout (Sindhi) | Same RTL behavior as Urdu with Sindhi text | ☐ |
| UI-RTL-03 | LTR Layout (English) | Default left-to-right layout with left-aligned text | ☐ |
| UI-RTL-04 | Keyboard Avoiding | Keyboard does not overlap input fields on Login, OTP, Password screens | ☐ |
| UI-RTL-05 | Keyboard Dismiss | Tapping outside input fields dismisses keyboard | ☐ |

### 2.4 Modals & Feedback

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| UI-MOD-01 | Status Modal (Upload) | Success animation with checkmark appears after save operations | ☐ |
| UI-MOD-02 | Status Modal (Password Reset) | Confirmation modal appears after password reset | ☐ |
| UI-MOD-03 | Payment Modal | Blur overlay, rounded card with form fields, image preview area | ☐ |
| UI-MOD-04 | Alert Dialogs | Native alert dialogs for errors and confirmations are readable | ☐ |

---

## 3. Offline Synchronization Testing

The app uses SQLite for local storage and syncs to the server when connectivity is restored.

### 3.1 Local Database Operations

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| OS-DB-01 | DB Initialization | Launch app for first time | SQLite database `local_data.db` is created with `items` table and index | ☐ |
| OS-DB-02 | Bulk Insert | Save commodities on Commodity Listing | All rows inserted into `items` table with `synced=0` | ☐ |
| OS-DB-03 | Volume Update | Update volume on Volume screen | Volume field updated, `synced` reset to 0 | ☐ |
| OS-DB-04 | Query Unsynced Items | Check sync screen | Only items with `synced=0 AND volume IS NOT NULL` are returned | ☐ |
| OS-DB-05 | Mark as Synced | After successful API sync | Synced item IDs are updated to `synced=1` in DB | ☐ |

### 3.2 Network Detection & Auto-Sync

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| OS-NET-01 | Offline Data Entry | Turn off WiFi/data, add commodities | Data saves to local SQLite without errors | ☐ |
| OS-NET-02 | Network State Detection | Toggle airplane mode on/off | `NetInfo` correctly reports online/offline status | ☐ |
| OS-NET-03 | Auto-Sync on Reconnect | Enter data offline, then enable WiFi | Auto-sync triggers within 10s cooldown, pending items are synced | ☐ |
| OS-NET-04 | Sync Cooldown | Rapidly toggle network on/off | Sync does not fire more than once per 10 seconds | ☐ |
| OS-NET-05 | Sync Timeout | Simulate slow server (>15s response) | AbortController cancels request, "Sync timeout" message returned | ☐ |
| OS-NET-06 | Server Error Handling | Server returns non-200 status | "Server error" message returned, data remains unsynced locally | ☐ |
| OS-NET-07 | Invalid Server Response | Server returns unexpected JSON | "Invalid server response" message, no items marked as synced | ☐ |

### 3.3 Data Integrity

| Test ID | Test Case | Steps | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| OS-INT-01 | No Data Loss on Crash | Force-close app during data entry | Previously saved data persists in SQLite on relaunch | ☐ |
| OS-INT-02 | Partial Sync Recovery | Sync interrupted mid-transfer | Only confirmed IDs are marked synced; remaining stay pending | ☐ |
| OS-INT-03 | Duplicate Sync Prevention | Trigger sync while another is running | Returns "Sync already running", no duplicate API calls | ☐ |

---

## 4. Security Testing

### 4.1 Authentication Security

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| ST-AUTH-01 | JWT Token Storage | Auth token is stored in AsyncStorage (encrypted on device) | ☐ |
| ST-AUTH-02 | Token Attached to Requests | All private API calls include `Authorization: Bearer <token>` header | ☐ |
| ST-AUTH-03 | Public Routes Skip Token | Login, signup, forgot-password, OTP endpoints do not attach token | ☐ |
| ST-AUTH-04 | 401 Unauthorized Handling | Server returns 401 → app logs "Unauthorized" and can redirect to login | ☐ |
| ST-AUTH-05 | Token Removal on Logout | After logout, token is removed from AsyncStorage | ☐ |
| ST-AUTH-06 | Password Masking | Password fields use `secureTextEntry` by default | ☐ |

### 4.2 Password Policy

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| ST-PWD-01 | Minimum 8 Characters | Passwords shorter than 8 chars are rejected | ☐ |
| ST-PWD-02 | Uppercase Required | At least one uppercase letter required | ☐ |
| ST-PWD-03 | Number Required | At least one numeric digit required | ☐ |
| ST-PWD-04 | Special Character Required | At least one of @$!%*#?& required | ☐ |
| ST-PWD-05 | Password Match | New password and confirm password must match | ☐ |

### 4.3 Data & Network Security

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| ST-NET-01 | HTTPS Communication | All API calls use HTTPS endpoints | ☐ |
| ST-NET-02 | API Timeout | Requests timeout after 10s (apiClient) or 15s (sync) | ☐ |
| ST-NET-03 | Input Sanitization | Commodity names are cleaned of extra commas and whitespace | ☐ |
| ST-NET-04 | SQL Injection Prevention | Parameterized queries used for all DB operations (no string concat) | ☐ |
| ST-NET-05 | Permission Requests | Camera, location, gallery permissions requested only when needed | ☐ |

---

## 5. Performance Testing

### 5.1 App Launch & Navigation

| Test ID | Test Case | Benchmark | Status |
|---------|-----------|-----------|--------|
| PT-APP-01 | Cold Start Time | App launches and displays splash screen within 2 seconds | ☐ |
| PT-APP-02 | Splash to Login Navigation | Transition from splash to login completes within 3 seconds | ☐ |
| PT-APP-03 | Screen Transition Speed | Tab switches and screen navigations complete within 300ms | ☐ |
| PT-APP-04 | Onboarding Swipe | Tap-based stage transitions are instant with no frame drops | ☐ |

### 5.2 Data Operations

| Test ID | Test Case | Benchmark | Status |
|---------|-----------|-----------|--------|
| PT-DAT-01 | Bulk Insert (10 items) | Completes within 500ms | ☐ |
| PT-DAT-02 | Bulk Insert (50 items) | Completes within 2 seconds | ☐ |
| PT-DAT-03 | Query Unsynced Items | Returns results within 200ms for up to 500 records | ☐ |
| PT-DAT-04 | Sync Stats Query | Pie chart data loads within 300ms | ☐ |
| PT-DAT-05 | API Sync (batch) | 50 items sync completes within 15s timeout window | ☐ |

### 5.3 Memory & Resources

| Test ID | Test Case | Benchmark | Status |
|---------|-----------|-----------|--------|
| PT-MEM-01 | Memory Usage (Idle) | App consumes less than 150MB RAM at idle | ☐ |
| PT-MEM-02 | Memory with Images | Memory stays under 250MB with 10 captured images loaded | ☐ |
| PT-MEM-03 | No Memory Leaks | Extended use (30+ minutes) shows stable memory, no leaks | ☐ |
| PT-MEM-04 | Battery Consumption | Background sync listener does not cause excessive battery drain | ☐ |

---

## 6. Device Compatibility Testing

### 6.1 Android Version Compatibility

| Test ID | Android Version | API Level | Expected Result | Status |
|---------|----------------|-----------|-----------------|--------|
| DC-AND-01 | Android 10 | API 29 | All features functional, UI renders correctly | ☐ |
| DC-AND-02 | Android 11 | API 30 | All features functional, scoped storage handled | ☐ |
| DC-AND-03 | Android 12 | API 31 | All features functional, new permission model supported | ☐ |
| DC-AND-04 | Android 13 | API 33 | All features functional, granular media permissions | ☐ |
| DC-AND-05 | Android 14 | API 34 | All features functional, predictive back gesture handled | ☐ |

### 6.2 Screen Size & Resolution

| Test ID | Device Category | Screen Size | Expected Result | Status |
|---------|----------------|-------------|-----------------|--------|
| DC-SCR-01 | Small Phone | 5.0" – 5.5" | UI elements are accessible, no overflow or clipping | ☐ |
| DC-SCR-02 | Standard Phone | 6.0" – 6.5" | Primary target; all layouts render as designed | ☐ |
| DC-SCR-03 | Large Phone | 6.7" – 7.0" | Content scales proportionally, no excessive whitespace | ☐ |
| DC-SCR-04 | Tablet (if applicable) | 8" – 10" | Layout adapts, content remains readable and centered | ☐ |
| DC-SCR-05 | HD Display (720p) | 720 × 1280 | Images and text render clearly without pixelation | ☐ |
| DC-SCR-06 | FHD Display (1080p) | 1080 × 1920 | Crisp rendering, icons and images sharp | ☐ |

### 6.3 Hardware Feature Compatibility

| Test ID | Feature | Expected Result | Status |
|---------|---------|-----------------|--------|
| DC-HW-01 | GPS/Location | Location services work accurately for geo-tagging login | ☐ |
| DC-HW-02 | Camera | Camera capture works for commodity and payment receipt photos | ☐ |
| DC-HW-03 | Network (WiFi) | App detects WiFi connectivity and syncs accordingly | ☐ |
| DC-HW-04 | Network (Mobile Data) | App detects mobile data and syncs accordingly | ☐ |
| DC-HW-05 | Low Storage | App handles low storage gracefully when saving to SQLite | ☐ |

---

## 7. Pilot Field Testing

Pilot field testing validates the application in real-world agricultural market environments in Sindh.

### 7.1 Test Environment

- **Location:** Selected agricultural markets in Hyderabad, Sindh
- **Duration:** 2 weeks
- **Participants:** 5–10 market data collectors (field agents)
- **Devices:** Mix of budget and mid-range Android devices commonly used by field staff

### 7.2 Field Test Scenarios

| Test ID | Scenario | Steps | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| PF-01 | Morning Data Collection | Agent logs in at market, records vegetable prices and grades | All commodity data saved to local DB successfully | ☐ |
| PF-02 | Afternoon Volume Entry | Agent returns to enter volume data for morning entries | Volume screen loads correct items, volumes saved | ☐ |
| PF-03 | Photo Documentation | Agent photographs commodity displays at market stalls | Photos captured and attached to correct commodity category | ☐ |
| PF-04 | Low Connectivity Area | Agent works in area with intermittent signal | Data saves offline, syncs automatically when signal returns | ☐ |
| PF-05 | End-of-Day Sync | Agent reaches area with stable WiFi at end of day | All pending records sync successfully, pie chart shows 100% | ☐ |
| PF-06 | Multi-Language Use | Agent switches between Sindhi and Urdu during entry | All labels, dropdowns, and grades update correctly in real-time | ☐ |
| PF-07 | Fee Payment Recording | Agent records fee payment with receipt photo | Payment marked as paid with receipt image attached | ☐ |
| PF-08 | Help & Support | Agent submits a complaint about an issue encountered | Complaint submitted successfully via Help & Support screen | ☐ |

### 7.3 Field Testing Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Data Entry Accuracy | >95% of entries match physical records | Cross-check digital entries with paper logs |
| Sync Success Rate | >98% of records synced within 24 hours | Server-side sync logs vs local pending count |
| App Crash Rate | <1% during daily use | Crash analytics and field agent reports |
| Average Task Completion Time | <5 minutes per commodity batch | Observation and time tracking |
| User Satisfaction Score | >4.0/5.0 | Post-pilot survey questionnaire |

---

## 8. User Acceptance Testing (UAT)

UAT ensures that end-users (field agents, supervisors, and administrators) confirm the application meets business requirements.

### 8.1 UAT Participants

| Role | Count | Responsibility |
|------|-------|---------------|
| Field Data Collectors | 5 | Test daily commodity data entry workflow |
| Market Supervisors | 2 | Verify data accuracy and sync status |
| District Administrators | 2 | Review aggregated data and reports |
| IT Support Staff | 1 | Evaluate setup, troubleshooting, and maintenance |

### 8.2 UAT Test Scenarios

| Test ID | User Story | Acceptance Criteria | Status |
|---------|-----------|---------------------|--------|
| UAT-01 | As a field agent, I can log in with my credentials and location | Login succeeds with valid credentials; location is geo-tagged | ☐ |
| UAT-02 | As a field agent, I can record commodity prices for vegetables and fruits | Commodity listing allows item, grade, and price entry for both categories | ☐ |
| UAT-03 | As a field agent, I can enter volume data for previously recorded items | Volume screen shows only items without volume; kg values can be entered | ☐ |
| UAT-04 | As a field agent, I can take photos of commodities as evidence | Camera and gallery upload work; multiple images can be attached | ☐ |
| UAT-05 | As a field agent, I can work without internet and sync later | Offline data entry works; auto-sync fires when connectivity returns | ☐ |
| UAT-06 | As a field agent, I can use the app in my preferred language | Switching between English, Urdu, and Sindhi works across all screens | ☐ |
| UAT-07 | As a field agent, I can view my sync progress | Pie chart accurately reflects synced vs pending data | ☐ |
| UAT-08 | As a field agent, I can record fee payments with receipt photos | Payment modal allows amount entry, receipt capture, and confirmation | ☐ |
| UAT-09 | As a field agent, I can reset my password if forgotten | Forgot password → OTP → Set new password flow works end-to-end | ☐ |
| UAT-10 | As a field agent, I can submit support complaints | Help & Support form accepts text and submits successfully | ☐ |
| UAT-11 | As a supervisor, I can verify that field data is synced to server | Sync stats show accurate counts; server receives correct data | ☐ |
| UAT-12 | As an admin, I can confirm the app meets data collection requirements | All required fields (item, grade, price, volume, location) are captured | ☐ |

### 8.3 UAT Sign-Off Criteria

| Criteria | Threshold | Status |
|----------|-----------|--------|
| All critical test cases pass | 100% of critical (FT-AUTH, FT-CMD, OS-*) tests pass | ☐ |
| All high-priority test cases pass | ≥95% of high-priority tests pass | ☐ |
| No Severity-1 (blocker) defects remain open | 0 open blockers | ☐ |
| No Severity-2 (critical) defects remain open | 0 open critical defects | ☐ |
| Field pilot success rate | ≥95% successful data collection sessions | ☐ |
| User satisfaction | Average satisfaction score ≥4.0/5.0 | ☐ |

### 8.4 UAT Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Manager | | | |
| Lead Developer | | | |
| QA Lead | | | |
| Field Operations Lead | | | |
| Client Representative | | | |

---

**Document End**
