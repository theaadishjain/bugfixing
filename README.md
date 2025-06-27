# Hackweek Countdown Crisis — Fixed Issues & Improvements

This document lists all the major errors, bugs, and issues fixed in the project, along with a summary of the improvements made to ensure a robust, production-ready Next.js app.

---

## 1. Hydration Mismatches & Data Loading Issues

**Problem:**
- The `CommunityInfo` component fetched data from `/cosc.json` on the client using `fetch` and `useEffect`.
- This caused UI flicker, hydration mismatches, and undefined values on first render.

**Fix:**
- Data is now loaded server-side in `app/page.js` using Node.js `fs/promises` and passed as props to both `CommunityInfo` and `Countdown`.
- All data is available on first render, eliminating hydration warnings and flicker.

---

## 2. Countdown Timer Logic & Flexibility

**Problem:**
- The countdown timer used a hardcoded end date, making it inflexible and error-prone.
- There was no handling for when the countdown reached zero.

**Fix:**
- The countdown now receives the end date from the JSON data (`cosc.json`), making it dynamic.
- When the countdown reaches zero, it displays "Hackweek is over 🎉".
- Handles missing or invalid end dates gracefully.

---

## 3. React/Next.js Build Errors (App Router)

**Problem:**
- The `Countdown` component used React hooks (`useEffect`, `useState`) but was not marked as a client component.
- This caused build errors: "You're importing a component that needs `useEffect`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive."

**Fix:**
- Added `'use client';` as the first line in `src/app/components/Countdown.js` to mark it as a client component, resolving the build error.

---

## 4. General Improvements
- Added fallback/default values in components to avoid undefined errors.
- Ensured all list-rendered elements have keys (if any are added in the future).
- Updated the event end date in `cosc.json` to reflect the correct Hackweek end time.

---

## How to Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

For further improvements (UI polish, deployment, documentation), see the main `README.md` or contact the maintainer. 
