# gtm_event_session_duration
GTM tag that fires events based on session duration rather than time on page

Create a GTM script tag and add the js in there.
Wrap the JS between <Script></script> tags
Set this tag to be triggered at page views and add a scroll trigger firing everty 15% or so

This script works by placing a 1st party cookie with the current timestamp that will expire after 30 minutes
Every time this script is fired there will be checked if the cookie excist and evaluate how much time has passed
When more time is passed than the threshold a dataLayer event (session_duration_conversion) is pushed where you can fire events on
This event will only fire once and a new cookie is set that remembers that the event is fired

