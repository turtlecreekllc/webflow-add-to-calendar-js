# Add to Calendar - Webflow Custom Code

This script allows Webflow users to add an "Add to Calendar" button to their website, enabling visitors to add events to Google, Apple, Outlook, Office 365, Yahoo, and Facebook calendars.

## Features
- Supports multiple calendar platforms.
- Simple to integrate into Webflow.
- Customizable via Webflow CMS fields.

## Installation Instructions
### Step 1: Add Custom Code to Webflow
1. Open your **Webflow project**.
2. Go to **Page Settings**.
3. Scroll to the **Custom Code** section.
4. Paste the following script inside the **Before </body> tag** section:

```html
<script src="https://your-github-repo-url/script.js"></script>
```

5. Save and publish your Webflow site.

### Step 2: Add the Button to Your Page
1. Add a **Button** element where you want the "Add to Calendar" option.
2. Click the button and set the **Custom Attribute** as follows:
   - **Name:** `class`
   - **Value:** `addeventatc`
3. Add the following attributes to the button to specify event details:
   - `data-event-title="Your Event Title"`
   - `data-event-location="Event Location"`
   - `data-event-start="2025-05-15T10:00:00"` (ISO format: YYYY-MM-DDTHH:MM:SS)
   - `data-event-end="2025-05-15T12:00:00"`
   - `data-event-description="Short event details."`
   - `data-event-timezone="America/New_York"` (Optional)
   - `data-event-recurrence="FREQ=DAILY;COUNT=5"` (Optional for repeating events)

Example:
```html
<button class="addeventatc" data-event-title="Webflow Meetup" data-event-location="New York" data-event-start="2025-05-15T10:00:00" data-event-end="2025-05-15T12:00:00" data-event-description="Join us for an amazing Webflow meetup!" data-event-timezone="America/New_York">Add to Calendar</button>
```

### Step 3: Use Webflow CMS for Dynamic Event Data
To dynamically pull event data from Webflow CMS:
1. Create a **CMS Collection** (e.g., "Events").
2. Add fields:
   - **Event Title** (Plain Text)
   - **Location** (Plain Text)
   - **Start Time** (Date/Time)
   - **End Time** (Date/Time)
   - **Description** (Rich Text)
3. Bind these fields to your button by using Webflow's **CMS Field Bindings**:
   - Instead of `data-event-title="Your Event Title"`, use `data-event-title="{{Event Title}}"`
   - Replace static values with dynamic Webflow CMS values.

## Contributing
1. Fork the repository on GitHub.
2. Create a feature branch.
3. Submit a pull request.

## Attribution & License
This project is licensed under the **MIT License**. Feel free to use and modify it with attribution.
- Please include the following attribution in your project if using this code:
  ```
  This script was created by Shane Jordan at Turtle Creek Enterprises, LLC. Source available at [[GitHub Repository Link]](https://github.com/turtlecreekllc/webflow-add-to-calendar-js).
  ```

## Support & Donations
If this script is helpful, consider [supporting](https://donate.stripe.com/cN216u9K82wb2YM3cg).

Your support helps maintain and improve this project!

