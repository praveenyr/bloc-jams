var buildCollectionItemTemplate = function(index) {
    var template =
    '<div class="collection-album-container column fourth">'
  + '  <img src="assets/images/album_covers/01.png"/>'
  + '  <div class="collection-album-info caption">'
  + '    <p>'
  + '      <a class="album-name" href="/album.html"> The Colors </a>'
  + '      <br/>'
  + '      <a href="/album.html">Pablo Picasso#' + [index+1] + ' </a>'
  + '      <br/>'
  + '      X songs'
  + '      <br/>'
  + '    </p>'
  + '  </div>'
  + '</div>'
  ;
        // #2
      return $(template);
  };

 
 $(window).load(function() {
    // #3
    var $collectionContainer = $('.album-covers');
    // #2
    //collectionContainer.innerHTML = '';
    $collectionContainer.empty();
    // #3
    for (var i = 0; i < 12; i++) {
        //collectionContainer.innerHTML += collectionItemTemplate;
        var $newThumbnail = buildCollectionItemTemplate(i);
        $collectionContainer.append($newThumbnail);
    }
});
