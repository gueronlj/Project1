# Goal
Users should be able to get articles filtered by country of origin, language, topic, and specify a range of dates.

# Game-plan
If a user selects a filter, it will update the values of the 'settings' object.

The filter function will take the values in settings and return an end-point URL.

The ajax Call function will use the URL determined by the filter function.

To display the articles we will use ajax to grab the data and jQuery to put the data into html tags.

## Link to live app
https://jovial-albattani-df047c.netlify.app/

## Issues
1. This project was designed 'mobile first' so it looks best on mobile. A  media query was added for screens over 1024. However, trying to add an 'in between' breaking point- is still an un-solved problem.
Any attempt to add another media query overrides the 'default' CSS, ruining the mobile version.

2. The date range for articles is currently hardcoded as taking a user input would require more visual features and there can be no more features until issue #1 is resolved.

3. There are many countries to explore and the carousel is limiting that. A modal and a button to open/close the modal would be great but it requires a new set of icons with new ID's to be hardcoded in. This is caused by the way the icons are currently appended to the carousel.
--------------------------------------------------------------------------
## Known Bugs
Sometimes a user can combine filters in such a way that the search finds 0 articles. When this happens, the filters can 'stick' and any new searches will return 0 results. A refresh is required.
