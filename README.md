# RCCG New Convert Follow-Up System

RCCG New Convert Follow-Up System is a static web application for collecting new convert information, receiving pastor follow-up feedback, and viewing live administrative analytics.

The application uses Bootstrap for the interface, Google Forms for public submissions, Google Sheets for dashboard counters, Looker Studio for embedded reporting, and Supabase on the login page for checking approved admin email addresses.

## Features

- Public landing page for the RCCG new convert follow-up system.
- New convert registration form.
- Pastor feedback form for parish follow-up updates.
- Admin dashboard with an embedded Looker Studio report.
- Live counter cards for total converts, visited church, yet to visit, and visited percentage.
- Admin access check using the `admins` table in Supabase.
- Responsive layout for desktop and mobile devices.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page with project introduction and links to registration and admin dashboard. |
| `register.html` | New convert registration form submitted to Google Forms. |
| `feedback.html` | Pastor feedback form submitted to Google Forms. |
| `admin.html` | Main admin dashboard with Looker Studio report and Google Sheet counters. |
| `login.html` | Admin access page that checks the submitted email against Supabase `admins`. |
| `success.html` | Confirmation page after successful form submission. |

## Data Flow

1. A new convert submits details through `register.html`.
2. The registration form posts to a connected Google Form.
3. A pastor submits follow-up information through `feedback.html`.
4. The feedback form posts to a separate Google Form.
5. `admin.html` displays the Looker Studio report.
6. `admin.html` also fetches row counts from two Google Sheets and calculates:
   - `Yet To Visit = Total Converts - Visited Church`
   - `Visited Rate = Visited Church / Total Converts * 100`

## Dashboard Data Sources

The admin dashboard currently uses these Google Sheet IDs:

```js
TOTAL_CONVERT_SHEET_ID = "1uUvoyH8xGhd_UuDheosXgqq2fcogSin-_MaAQZ8abds";
VISITED_CHURCH_SHEET_ID = "16cvbzQZ_eeAsU2CYvGtvfevdgEjqyunp6y4Ybrm9JnI";
```

The sheets must be shared publicly or published to the web so the browser can fetch CSV data from them.

The Looker Studio report is embedded in `admin.html` using:

```html
https://datastudio.google.com/embed/reporting/e1d9288c-1125-4b8d-a87f-db7c0aa0b767/page/vCd0F
```

## Admin Access

`login.html` checks admin access through Supabase.

Expected Supabase table:

```text
admins
```

Expected field:

```text
email
```

If the entered email exists in the `admins` table, the app stores:

```text
adminLoggedIn = true
adminEmail = entered email
```

The user is then redirected to `admin.html`.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.2
- Bootstrap Icons
- Google Forms
- Google Sheets CSV output
- Looker Studio embed
- Supabase JavaScript client for admin email access

## Project Structure

```text
convert_ai_web/
|-- admin.html
|-- feedback.html
|-- index.html
|-- login.html
|-- register.html
|-- success.html
|-- css/
|   `-- styles.css
|-- js/
|   `-- app.js
`-- images/
    |-- pastor-adeboye.png
    `-- rccglogo.png
```

## Running Locally

This is a static web application. You can open `index.html` directly in a browser.

For the best experience, run it through a local static server so browser requests behave like a deployed website.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Setup Notes

- Confirm the Google Form action URLs in `register.html` and `feedback.html`.
- Confirm all Google Form field `entry.*` names match the live forms.
- Confirm the Google Sheets used by `admin.html` are public or published.
- Confirm the Looker Studio report allows embedding.
- Confirm Supabase URL, anon key, and `admins` table settings in `login.html`.

## Important Security Note

This is a frontend-only project. Any keys or URLs placed in HTML or JavaScript are visible to users in the browser.

For stronger protection, move sensitive access control and data fetching to a backend service or serverless function.
