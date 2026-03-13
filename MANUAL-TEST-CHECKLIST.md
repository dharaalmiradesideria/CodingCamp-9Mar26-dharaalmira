# Manual Test Checklist - Final Verification

## Test Instructions
Open `index.html` in a browser and perform the following tests:

---

## ✅ 1. Greeting Component Tests

### Test 1.1: Time Display
- [ ] Current time is displayed in 12-hour format (e.g., "10:30 AM")
- [ ] Time updates every second
- [ ] AM/PM indicator is correct

### Test 1.2: Date Display
- [ ] Day of week is displayed (e.g., "Monday")
- [ ] Month and day are displayed (e.g., "January 15")
- [ ] Date is accurate

### Test 1.3: Time-Based Greeting
- [ ] Greeting matches current time:
  - 5:00 AM - 11:59 AM: "Good morning"
  - 12:00 PM - 4:59 PM: "Good afternoon"
  - 5:00 PM - 8:59 PM: "Good evening"
  - 9:00 PM - 4:59 AM: "Good night"

---

## ✅ 2. Focus Timer Tests

### Test 2.1: Initial State
- [ ] Timer displays "25:00" on page load
- [ ] Start, Stop, and Reset buttons are visible

### Test 2.2: Start Functionality
- [ ] Click Start button
- [ ] Timer begins counting down (25:00 → 24:59 → 24:58...)
- [ ] Display updates every second

### Test 2.3: Stop Functionality
- [ ] Start the timer
- [ ] Click Stop button after a few seconds
- [ ] Timer pauses at current value
- [ ] Click Start again - timer resumes from paused value

### Test 2.4: Reset Functionality
- [ ] Start the timer and let it run for a few seconds
- [ ] Click Reset button
- [ ] Timer returns to "25:00"
- [ ] Timer is stopped (not running)

### Test 2.5: Timer Reaches Zero
- [ ] Manually set remainingSeconds to 3 in console: `app.components.timer.remainingSeconds = 3`
- [ ] Start the timer
- [ ] Timer counts down: 00:03 → 00:02 → 00:01 → 00:00
- [ ] Timer stops automatically at 00:00

---

## ✅ 3. Task List Tests

### Test 3.1: Add Task
- [ ] Type "Buy groceries" in task input
- [ ] Click Add button (or press Enter)
- [ ] Task appears in the list
- [ ] Input field clears

### Test 3.2: Empty Input Validation
- [ ] Try to add an empty task
- [ ] Task is not added (check console for error)

### Test 3.3: Toggle Task Completion
- [ ] Click checkbox next to a task
- [ ] Task text gets strikethrough styling
- [ ] Task opacity reduces
- [ ] Click checkbox again - styling reverts

### Test 3.4: Edit Task
- [ ] Click Edit button on a task
- [ ] Prompt appears with current task text
- [ ] Change text and click OK
- [ ] Task text updates in the list

### Test 3.5: Delete Task
- [ ] Click Delete button on a task
- [ ] Confirmation dialog appears
- [ ] Click OK
- [ ] Task is removed from the list

### Test 3.6: Local Storage Persistence
- [ ] Add 2-3 tasks
- [ ] Mark one as complete
- [ ] Refresh the page (F5)
- [ ] All tasks are still there with correct completion status

---

## ✅ 4. Quick Links Tests

### Test 4.1: Add Link
- [ ] Enter "GitHub" in name field
- [ ] Enter "https://github.com" in URL field
- [ ] Click Add button (or press Enter)
- [ ] Link appears in the list
- [ ] Input fields clear

### Test 4.2: URL Validation
- [ ] Try to add a link with URL "github.com" (no http/https)
- [ ] Link is not added (check console for error)
- [ ] Add link with "https://github.com" - should work

### Test 4.3: Open Link
- [ ] Click on a link in the list
- [ ] Link opens in a new browser tab
- [ ] Original tab remains on dashboard

### Test 4.4: Edit Link
- [ ] Click Edit button on a link
- [ ] Prompt appears for name - change it
- [ ] Prompt appears for URL - change it
- [ ] Link updates in the list

### Test 4.5: Delete Link
- [ ] Click Delete button on a link
- [ ] Confirmation dialog appears
- [ ] Click OK
- [ ] Link is removed from the list

### Test 4.6: Local Storage Persistence
- [ ] Add 2-3 links
- [ ] Refresh the page (F5)
- [ ] All links are still there

---

## ✅ 5. Visual Design Tests

### Test 5.1: Layout
- [ ] All four components are visible
- [ ] Components are well-spaced
- [ ] Layout is clean and organized

### Test 5.2: Typography
- [ ] Text is readable (minimum 14px)
- [ ] Font is consistent across components

### Test 5.3: Colors and Contrast
- [ ] Text has good contrast against background
- [ ] Primary color (blue) is used consistently
- [ ] Completed tasks have reduced opacity

### Test 5.4: Interactive Elements
- [ ] Buttons have hover effects
- [ ] Buttons have focus outlines (tab through elements)
- [ ] Inputs have focus styles
- [ ] Smooth transitions on interactions

---

## ✅ 6. Browser Compatibility Tests

Test in each browser:

### Chrome 90+
- [ ] All features work correctly
- [ ] No console errors

### Firefox 88+
- [ ] All features work correctly
- [ ] No console errors

### Edge 90+
- [ ] All features work correctly
- [ ] No console errors

### Safari 14+
- [ ] All features work correctly
- [ ] No console errors

---

## ✅ 7. Performance Tests

### Test 7.1: Load Time
- [ ] Page loads in under 500ms
- [ ] All components render immediately

### Test 7.2: Responsiveness
- [ ] Interactions feel instant (<100ms)
- [ ] No lag when adding/editing/deleting items
- [ ] Timer updates smoothly

---

## Test Results Summary

**Date Tested:** _______________  
**Browser:** _______________  
**Tester:** _______________

**Total Tests Passed:** _____ / _____  
**Issues Found:** _______________

**Overall Status:** [ ] PASS [ ] FAIL

---

## Notes

Use this space to document any issues or observations:

