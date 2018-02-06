
// Event constructor.
function Event() {
    this.title = "";
    this.image = "";
    this.featured = false;
    this.dateRanges = [];
    this.timeRanges = [];
    this.location = "";
    this.description = "";
}

// SeasonParser is a client-side implementation that can be utilized to parse
// season data serialized into a human-readable format for PYTCo to manage.
module.exports = function Parse(ds) {
    var events = [];

    // Split the data string on the section delimeter ##.
    ds.split(/##/).forEach(function(s) {
        var lines = s.split(/\r?\n/);

        // If there is nothing in the section, then skip it.
        if (lines.length <= 1) return;

        var event = new Event();

        var parsingDescription = false;
        var parsingDateRanges = false;
        var parsingTimeRanges = false;

        lines.forEach(function(l, idx) {
            if (parsingDescription && l.match(/^[a-zA-Z]+:/)) {
                parsingDescription = false;
            }

            if (parsingDescription) {
                event.description += l.trimLeft() + " ";
            }

            l = l.trim();

            // If the line only contains whitespace, then skip it.
            if (l.length <= 0) return;

            if (parsingDateRanges && l.startsWith("]")) {
                parsingDateRanges = false;
            }

            if (parsingDateRanges) {
                event.dateRanges.push(l);
            }

            if (parsingTimeRanges && l.startsWith("]")) {
                parsingTimeRanges = false;
            }

            if (parsingTimeRanges) {
                event.timeRanges.push(l);
            }

            // Parse the title information.
            if (l.startsWith("Title:")) {
                event.title = l.replace("Title:", "").trim();
            }

            // Parse the image information.
            if (l.startsWith("Image:")) {
                event.image = l.replace("Image:", "").trim();
            }

            // Parse the featured information.
            if (l.startsWith("Featured:")) {
                var isFeatured = l.replace("Featured:", "").trim();
                event.featured = (isFeatured === 'Yes') ? true : false;
            }

            // Parse the date ranges information.
            if (l.startsWith("DateRanges: [")) {
                parsingDateRanges = true;
            }

            // Parse the time ranges information.
            if (l.startsWith("TimeRanges: [")) {
                parsingTimeRanges = true;
            }

            // Parse the location information.
            if (l.startsWith("Location:")) {
                event.location = l.replace("Location:", "").trim();
            }

            // Parse the description information.
            if (l.startsWith("Description:")) {
                parsingDescription = true;

                event.description = l.replace("Description:", "").trimLeft();
            }
        })

        if (JSON.stringify(event) === JSON.stringify(new Event())) return;

        event.description = event.description.trimRight();

        events.push(event);
    })

    return events;
};
