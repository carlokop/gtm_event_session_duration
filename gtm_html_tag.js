/*
  set the threshold for the session_duration_conv event here (in seconds)
  if a session passes this threshold, a session_duration_conv event will
  be pushed to the datalayer
*/
var sessionDurationThreshold = 120;  //change only this number (seconds)

function gtm_getCookie(name) {
  var cookies = decodeURIComponent(document.cookie);
  var cookiesArray = cookies.split(';');
  var cookie = cookiesArray.find(function (item) {
    return name == item.trim().substring(0, name.length);
  });
  return cookie;
}


(function() {
  var startCookie = gtm_getCookie("gtm_session_start");
  var thresholdCookie = gtm_getCookie("gtm_session_threshold");
  var d1 =  new Date();
  // The getTime() method returns the number of milliseconds from
  //midnight of January 1, 1970 to the specified date
  var now = d1.getTime();
  // convert the threshold to milliseconds
  var durationThreshold = sessionDurationThreshold*1000-1;
  var cookieExpiry = new Date();
  // Set expiry time of 30 mins (in milliseconds)
  cookieExpiry.setTime(cookieExpiry.getTime() + 30 * 60 * 1000);
  var expires = "expires=" + cookieExpiry.toUTCString();
  // if no session start cookie exists, create it and be done
  if (!startCookie) {
	  document.cookie = "gtm_session_start" + "=" + now + ";" + expires + ";path=/";
  } else if (!thresholdCookie){
	  // get the start time - the slice removes the name of the cookie
	  var startTime = startCookie.trim().slice(18);
	  var elapsedTime = now - startTime;
	  if (elapsedTime > durationThreshold) {
		  window.dataLayer = window.dataLayer || [];
		  dataLayer.push({ 'event': 'session_duration_conversion' });
		  // once the event has been sent, set a threshold cookie so we
		  // don't send it again
		  document.cookie = "gtm_session_threshold=true;" + expires + ";path=/";
	  }
  }
})();
