// These are the base constant variables I will need for my code.
const START_HOUR = 9;
const END_HOUR = 17;
const NOW_HOUR_24 = moment().format('H');
const NOW = moment().format('dddd' + ', ' + 'MMMM Do');

// This initiliases a variable called dateHeading.
// The value being the "currentDay" div from the HTML.
let dateHeading = $('#currentDay');
dateHeading.text(NOW);

// This initialises a variable called storedScheduleItems.
// The value being the string object parsed from JSON.
let storedScheduleItems = JSON.parse(localStorage.getItem("storedScheduleItems"));

// This initiliases an if statement. 
// If the storedScheduleItems variable is not equal to nothing, then... (i.e. if the plans were retrieved from localStorage, then...)
if (storedScheduleItems !== null) {
    // ... then - update the scheduleItemArray to it
    scheduleItemArray = storedScheduleItems;
} else {
    // ... else -
    // NB/ This should only occur the first time the app is loaded into the browser.
    // This sets the initial value of scheduleItemArr on load-up, to a Hobbit meal plan to helpfully remind the user that food and Lord of The Rings are awesome;
    scheduleItemArray = ["Breakfast", "Second Breakfast", "", "Elevenses", "Luncheon", "Afternoon Tea", "Dinner", "", "Supper"];
}

// This initialises a for loop.
// This forLoop creates the content of the page dynamically.
for (let hour = START_HOUR; hour <= END_HOUR; hour++) {

    let index = hour - START_HOUR;

    // This initialises a variable called containerDiv.
    // The value is the "container" div from the HTML document.
    let containerDiv = $('#container')

    // This builds the row component and utilises bootstrap for layout.
    let rowDiv = $('<div>');
    rowDiv.addClass('row');
    rowDiv.addClass('scheduleRow');
    rowDiv.attr('hour-index', hour);
    updateRowColor(rowDiv, hour);

    // This builds the column components for the boxes that will contain the times and utilises bootstrap for layout.
    let timeColDiv = $('<div>');
    timeColDiv.addClass('col-md-2');
    const timeBoxSpan = $('<span>');
    timeBoxSpan.addClass('timeBox');
    timeBoxSpan.text(hour + ":00");
    rowDiv.append(timeColDiv);
    timeColDiv.append(timeBoxSpan);

    // This builds the column components for the boxes that will contain the schedule and utilises bootstrap for layout.
    let scheduleDiv = $('<div>');
    scheduleDiv.addClass('col-md-9');
    let scheduleItems = $('<input>');
    scheduleItems.addClass('dailyPlan');
    scheduleItems.attr('id', `input-${index}`);
    scheduleItems.attr('type', 'text');
    scheduleItems.val(scheduleItemArray[index]);
    rowDiv.append(scheduleDiv);
    scheduleDiv.append(scheduleItems);

    // This builds the column components for the boxes that will contain the save icons and utilises bootstrap for layout and the save icon.
    let saveIconDiv = $('<div>');
    saveIconDiv.addClass('col-md-1 save_column');
    let saveBtn = $('<i>');
    saveBtn.attr('save-id', index);
    saveBtn.addClass('bi bi-save saveIcon');
    rowDiv.append(saveIconDiv);
    saveIconDiv.append(saveBtn);

    containerDiv.append(rowDiv);
};

// This creates a function that will update the color of the rows.
function updateRowColor(hourRow, hour) {

    if (hour < NOW_HOUR_24) {
        hourRow.css("background-color", "lightgrey")
    } else if (hour > NOW_HOUR_24) {
        hourRow.css("background-color", "lightgreen")
    } else {
        hourRow.css("background-color", "tomato")
    }
};

// This intialises an onclick function to the schedule area and sets it in local storage.
$(document).on('click', 'i', function(event) {

    event.preventDefault();

    let $index = $(this).attr('save-id');
    let inputId = '#input-' + $index;
    let value = $(inputId).val();

    scheduleItemArray[$index] = value;

    localStorage.setItem("storedScheduleItems", JSON.stringify(scheduleItemArray));
});