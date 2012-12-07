var _currentSelectedDate = new Date();

function createWeekTextBoxNode(e, currYear, currMonth, currDate)
{
	_currentSelectedDate.setDate(currDate);
	_currentSelectedDate.setMonth(currMonth);
	_currentSelectedDate.setFullYear(currYear);

	var obj;
	if (window.event)
		obj = window.event.srcElement;
	else
		obj = e.target;

	if (obj.tagName != 'TD')	return false;
	var newBox = document.createElement('input');
	newBox.className = "inputBox";
	newBox.value = defaultCaption;
	newBox.size = 10;
	newBox.onblur = function(e)		{	initiateSaveWeekEvent(e);	}
	//newBox.onblur = function(e)		{	removeTextBoxNode(e);	}
	newBox.onkeypress = function(e) 	{	checkWeekKeyPressed(e);	}
	obj.appendChild(newBox);
	newBox.focus();
}

function initiateSaveWeekEvent(e)
{
	saveWeekEvent(e);
	removeTextBoxNode(e);
}

function saveWeekEvent(e)
{
	var newBox;
	if (window.event)
		newBox = window.event.srcElement;
	else
		newBox = e.target;

	var ownerTR = newBox.parentNode.parentNode;
	var timeTD = ownerTR.firstChild;
	var whatEvent = trim(newBox.value); 
	if (whatEvent.length <= 0)
	{
		return false;
	}
	if (!ValidateString(whatEvent))
	{
		return false;
	}

	showSavingIndicator('w');

	var fromDate = _currentSelectedDate;
	var toDate = _currentSelectedDate;

	var fromTime;
	if (window.event)
		fromTime = timeTD.innerText;
	else
		fromTime = timeTD.textContent;

	var x = fromTime.split(":");
	var y = ":00";
	var toTime = x[0];
	if (x[1] == "00")
		y = ":30";
	else
		toTime = parseInt(x[0]) + 1;
	toTime += y;

	var whereEvent = defaultPlace;
	var descriptionEvent = "";
	var fromMonth = fromDate.getMonth() + 1;
	var toMonth = toDate.getMonth() + 1;
	var colorEvent = defaultColor;
	
	var data = "";
	data += "s=" + spaceRef;
	data += "&";
	data += "what=" + whatEvent;
	data += "&";
	data += "fd=" + fromDate.getFullYear() + "/" + fromMonth + "/" + fromDate.getDate();
	data += "&";
	data += "ft=" + fromTime;
	data += "&";
	data += "td=" + toDate.getFullYear() + "/" + toMonth + "/" + toDate.getDate();
	data += "&";
	data += "tt=" + toTime;
	data += "&";
	data += "where=" + whereEvent;
	data += "&";
	data += "desc=" + descriptionEvent;
	data += "&";
	data += "color=" + colorEvent;
	
	var sUrl = getContextPath() + '/wcservice/calendar/SaveCalendarEvent?';
	sUrl += data;
	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callbackWeekViewSaveEvent, null);
}


function checkWeekKeyPressed(e)
{
	var key;
	if (window.event)
		key = window.event.keyCode;
	else
		key = e.which;
	if (key == 13)
	{
	    //saveWeekEvent(e);
	    window.focus();
	    return false;
	}
	else
	    return true;
}



var handleSuccessWeekViewSaveEvent = function(o)
{
	hideSavingIndicator('w');
	refreshAllViews();
}

var handleFailureWeekViewSaveEvent = function(o)
{
	hideSavingIndicator('w');
	alert("Unable to Save, " + o.statusText);
}

var callbackWeekViewSaveEvent =
{
	success:handleSuccessWeekViewSaveEvent,
	failure:handleFailureWeekViewSaveEvent,
	argument: { foo:"foo", bar:"bar" }
};
