var openURL = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags="
var endURL = "&jsoncallback=?"




function formatPhotos(photosJSON) {
    var photo = photosJSON.photos.photo;
    var id;
    var serverId;
    var secret;
    var URI
    var string = "";
    for (var i=0; i < photo.length; i++) {
        farm = photo[i].farm;
        id = photo[i].id;
        serverId = photo[i].server;
        secret = photo[i].secret;
    
        URI = 'http://farm' + farm + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg'
        string += '<img src="' + URI + '"</img>'
    }
    return string
}


function addPhotosToDOM(photosJSON) {
    var newPhotos = formatPhotos(photosJSON);
    $('#feed').html(newPhotos);
}


function fetchJSON() {
  var input = $('#keyword').val();

    $.ajax ({
      url: openURL + input + endURL,
      contentType: 'application/json',
      dataType: 'jsonp'
    })
    .done(addPhotosToDOM);
}










/*

API url: 

https://www.flickr.com/services/api/request.rest.html

AJAX request URLwith tags=cat (search term = cat):

https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=cat&jsoncallback=?

JSON Snippet:

jsonFlickrApi({
    "photos": {
        "page": 1,
        "pages": 46641,
        "perpage": 100,
        "total": "4664056",
        "photo": [
            {
                "id": "7790251192",
                "owner": "80992738@N00",
                "secret": "50b0af1b38",
                "server": "8440",
                "farm": 9,
                "title": "Friends",
                "ispublic": 1,
                "isfriend": 0,
                "isfamily": 0
            },

info about creating photo url from son data: http://www.flickr.com/services/api/misc.urls.html

http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

Example Test:

http://farm9.staticflickr.com/8440/7790251192_50b0af1b38.jpg

*/
