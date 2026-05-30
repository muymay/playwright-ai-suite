Feature: Login form edge cases

Edge Case 1 — Whitespace username
Acceptance criteria:
- User enters only spaces in username field
- User enters any value in password field
- Clicks submit
- Error message "Your username is invalid!" appears

Edge Case 2 — Outdated/wrong credentials
Acceptance criteria:
- User enters previously valid username with wrong password
- Clicks submit
- Error message appears confirming login failed