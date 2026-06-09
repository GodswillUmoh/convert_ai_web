# RCCG New Convert AI Follow-Up System

RCCG New Convert AI Follow-Up System is a web application for collecting new convert details, receiving pastor follow-up feedback, automating email communication with AI, and monitoring live administrative analytics.

The system is designed around a simple ministry workflow: a new convert submits their information, Zapier triggers an AI-generated welcome or follow-up email, pastors submit feedback after contact or visitation, Zapier summarizes that feedback for admins, and the admin dashboard displays live reporting through Looker Studio and Google Sheet counters.

## What The Application Does

- Registers new converts through a public Google Form-powered web page.
- Collects pastor feedback after church visit or follow-up.
- Uses Zapier to trigger automated workflows when new form responses are received.
- Uses AI through Zapier, such as OpenAI, to generate personalized emails and feedback summaries.
- Sends welcome/follow-up emails to converts after registration.
- Sends summarized pastor feedback emails to admins.
- Displays live admin analytics using an embedded Looker Studio report.
- Calculates dashboard counters from Google Sheets:
  - Total converts
  - Converts who visited church
  - Converts yet to visit
  - Visited percentage
- Restricts admin dashboard access through an email check on the login page.

## Application Flow

1. A visitor opens `index.html` and chooses to register as a new convert.
2. The new convert submits their details through `register.html`.
3. The registration form sends the data to Google Forms and its connected Google Sheet.
4. Zapier detects the new response.
5. Zapier passes the convert details to an AI step to generate a warm welcome and follow-up email.
6. Zapier sends the email to the convert.
7. A pastor submits follow-up or visitation feedback through `feedback.html`.
8. Zapier detects the pastor feedback submission.
9. Zapier uses AI to summarize the pastor's report and recommend a next action.
10. Zapier emails the summary to the admin team.
11. Admins view live reporting through `admin.html`, which embeds Looker Studio and calculates summary counters from Google Sheets.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Landing page introducing the RCCG new convert follow-up system. |
| `register.html` | New convert registration form submitted to Google Forms. |
| `feedback.html` | Pastor feedback form submitted to Google Forms. |
| `login.html` | Admin access page that checks the submitted email against Supabase `admins`. |
| `admin.html` | Main admin dashboard with Looker Studio report and Google Sheet counters. |
| `success.html` | Confirmation page after successful form submission. |

## AI and Zapier Automation

Zapier acts as the automation bridge between Google Forms, AI, and email delivery.

### Convert Welcome Workflow

Trigger:

```text
New Google Form response or new Google Sheet row from register.html
```

AI action:

```text
Generate a personalized welcome and follow-up email for the new convert.
```

Email action:

```text
Send the generated email to the convert's email address.
```

Recommended message content:

- Welcome the convert to the RCCG follow-up system.
- Confirm that their information was received.
- Encourage them spiritually.
- Mention that they should go to the nearest RCCG church to show the pastor the message to receive their study packs.
- Include prayer, next steps, or service attendance information where applicable.

### Pastor Feedback Admin Workflow

Trigger:

```text
New Google Form response or new Google Sheet row from feedback.html
```

AI action:

```text
Summarize the pastor feedback and suggest a next follow-up action.
```

Email action:

```text
Send the AI-generated summary to the admin team.
```

Recommended admin email content:

- Convert name and contact details.
- Pastor name and parish.
- Visit status.
- Follow-up status.
- Pastor remark.
- AI-generated summary.
- Recommended next action.

## Recommended Zapier Zaps

| Zap | Trigger | AI Step | Final Action |
| --- | --- | --- | --- |
| Convert Welcome Email | New convert form response | Generate welcome/follow-up email | Send email to convert |
| Pastor Feedback Alert | New pastor feedback response | Summarize feedback and recommend next action | Send email to admin |

## Dashboard and Reporting

The admin dashboard combines an embedded Looker Studio report with live counter cards powered by Google Sheets.

The embedded Looker Studio report is used for visual reporting:

```text
https://datastudio.google.com/embed/reporting/e1d9288c-1125-4b8d-a87f-db7c0aa0b767/page/vCd0F
```

The dashboard counters in `admin.html` use these Google Sheet IDs:

```js
TOTAL_CONVERT_SHEET_ID = "1uUvoyH8xGhd_UuDheosXgqq2fcogSin-_MaAQZ8abds";
VISITED_CHURCH_SHEET_ID = "16cvbzQZ_eeAsU2CYvGtvfevdgEjqyunp6y4Ybrm9JnI";
```

The dashboard calculates:

```text
Yet To Visit = Total Converts - Visited Church
Visited Rate = Visited Church / Total Converts * 100
```

The Google Sheets must be shared publicly or published to the web so the browser can fetch CSV data.

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
- Zapier automation
- AI-generated email and summary workflows
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

For the best experience, run it through a local static server.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Setup Checklist

- Confirm the Google Form action URL in `register.html`.
- Confirm the Google Form action URL in `feedback.html`.
- Confirm all Google Form `entry.*` field names match the live forms.
- Connect each Google Form to the correct Google Sheet.
- Publish or publicly share the Google Sheets used by the dashboard counters.
- Configure the Looker Studio report and allow embedding.
- Create the two Zapier workflows for convert welcome emails and pastor feedback admin alerts.
- Configure the AI prompt used in each Zapier workflow.
- Configure the sender email account in Zapier.
- Confirm Supabase URL, anon key, and `admins` table settings in `login.html`.

## Security Note

This is a frontend-only project. Any keys, sheet IDs, form URLs, or report links placed in HTML or JavaScript are visible in the browser.

For stronger protection, move sensitive access control, private keys, and protected data fetching to a backend service or serverless function.
