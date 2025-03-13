/**
 * Add to Calendar - Webflow Custom Code
 * 
 * This script enables Webflow users to add an "Add to Calendar" button
 * to their website, supporting Google, Apple, Outlook, Office 365, Yahoo, and Facebook.
 * 
 * LICENSE:
 * This project is licensed under the MIT License.
 * 
 * Attribution:
 * If you use or modify this code, please include the following attribution:
 * "This script was created by Shane Jordan at Turtle Creek Enterprises, LLC. Source available at https://github.com/turtlecreekllc/webflow-add-to-calendar-js."
 * 
 * Support & Donations:
 * If this script is helpful, consider supporting at https://donate.stripe.com/cN216u9K82wb2YM3cg
 * Your support helps maintain and improve this project!
 */

(function () {
    "use strict";

    function $(id) {
        return document.getElementById(id);
    }

    var AddEventAtc = {
        isInitialized: false,
        settings: {
            appleIcal: false,
            google: true,
            office365: false,
            outlook: false,
            yahoo: false,
            facebook: false,
            defaultText: {
                apple: "Apple Calendar",
                google: "Google Calendar",
                office365: "Office 365",
                outlook: "Outlook",
                yahoo: "Yahoo Calendar",
                facebook: "Facebook Event"
            },
            eventOrder: "google,appleical,office365,outlook,yahoo,facebook"
        },

        initialize: function () {
            if (!this.isInitialized) {
                this.isInitialized = true;
                this.applyStyles();
                this.generateButtons();
            }
        },

        generateButtons: function () {
            var elements = document.querySelectorAll('.addeventatc');
            elements.forEach(function (element, index) {
                element.id = "addeventatc" + index;
                element.setAttribute("aria-haspopup", "true");
                element.setAttribute("tabindex", "0");

                element.onclick = function () {
                    AddEventAtc.toggleDropdown(this, index);
                    return false;
                };

                if (element.getAttribute("data-styling") === "none") {
                    return;
                }

                var icon = document.createElement("span");
                icon.className = "addeventatc_icon";
                element.appendChild(icon);
            });
        },

        toggleDropdown: function (element, index) {
            var dropdownId = element.id + "-drop";
            var dropdown = $(dropdownId);

            if (!dropdown) {
                this.createDropdown(element, index);
            } else {
                dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            }
        },

        createDropdown: function (element, index) {
            var dropdown = document.createElement("div");
            dropdown.id = element.id + "-drop";
            dropdown.className = "addeventatc_dropdown";
            dropdown.style.display = "block";
            dropdown.setAttribute("aria-labelledby", element.id);
            dropdown.setAttribute("role", "menu");

            var services = this.settings.eventOrder.split(',');

            services.forEach(function (service) {
                if (AddEventAtc.settings[service]) {
                    var item = document.createElement("div");
                    item.className = "addeventatc_item";
                    item.textContent = AddEventAtc.settings.defaultText[service];
                    item.onclick = function () {
                        AddEventAtc.handleClick(service, element);
                    };
                    dropdown.appendChild(item);
                }
            });

            element.appendChild(dropdown);
        },

        handleClick: function (service, element) {
            var title = element.getAttribute("data-event-title");
            var location = element.getAttribute("data-event-location");
            var start = element.getAttribute("data-event-start");
            var end = element.getAttribute("data-event-end");
            var description = element.getAttribute("data-event-description");
            var timezone = element.getAttribute("data-event-timezone") || "America/Toronto";
            var recurrence = element.getAttribute("data-event-recurrence") || "";

            if (service === 'google') {
                var googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
                    "&text=" + encodeURIComponent(title) +
                    "&details=" + encodeURIComponent(description) +
                    "&location=" + encodeURIComponent(location) +
                    "&dates=" + this.formatDate(start) + "/" + this.formatDate(end) +
                    (recurrence ? "&recur=" + encodeURIComponent(recurrence) : "") +
                    "&ctz=" + encodeURIComponent(timezone);
                
                window.open(googleCalendarUrl, '_blank');
            } else if (service === 'appleical') {
                var appleCalendarUrl = "data:text/calendar;charset=utf8," + encodeURIComponent(
                    "BEGIN:VCALENDAR\n" +
                    "VERSION:2.0\n" +
                    "BEGIN:VEVENT\n" +
                    "DTSTART:" + this.formatDate(start) + "\n" +
                    "DTEND:" + this.formatDate(end) + "\n" +
                    "SUMMARY:" + title + "\n" +
                    "DESCRIPTION:" + description + "\n" +
                    "LOCATION:" + location + "\n" +
                    (recurrence ? "RRULE:" + recurrence + "\n" : "") +
                    "END:VEVENT\n" +
                    "END:VCALENDAR"
                );
                window.open(appleCalendarUrl, '_blank');
            } else if (service === 'outlook' || service === 'office365') {
                var outlookCalendarUrl = "https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent" +
                    "&subject=" + encodeURIComponent(title) +
                    "&body=" + encodeURIComponent(description) +
                    "&location=" + encodeURIComponent(location) +
                    "&startdt=" + encodeURIComponent(start) +
                    "&enddt=" + encodeURIComponent(end) +
                    (recurrence ? "&recurrence=" + encodeURIComponent(recurrence) : "") +
                    "&allday=false" +
                    "&uid=" + encodeURIComponent(this.generateUID());
                
                window.open(outlookCalendarUrl, '_blank');
            }
        },

        formatDate: function (dateTime) {
            var date = new Date(dateTime);
            return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
        },

        generateUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        applyStyles: function () {
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = `
                .addeventatc { display: inline-block; position: relative; cursor: pointer; }
                .addeventatc_dropdown { position: absolute; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: none; z-index: 1000; padding: 10px; }
                .addeventatc_item { padding: 10px; cursor: pointer; }
                .addeventatc_item:hover { background: #f0f0f0; }
                .addeventatc_icon { background: url('path_to_icon.png') no-repeat left center; padding-left: 20px; }
                .addeventatc_description { margin-bottom: 10px; font-style: italic; color: #666; }
            `;
            document.head.appendChild(style);
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        AddEventAtc.initialize();
    });

})();
