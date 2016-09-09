var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

//Third Album for Assigment in Checkpoint-10 DOM Scripting - Album View
var albumBackInBlack = {
    title: 'Back In Black',
    artist: 'AC/DC',
    label: 'EMI Records',
    year: '1980',
    albumArtUrl: 'assets/images/album_covers/01.png',
    //albumArtUrl: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjgvamstenOAhUG_WMKHaOMA-YQjRwIBw&url=http%3A%2F%2Fwww.listal.com%2Flist%2Ffavorite-album-covers-1980s&psig=AFQjCNE8hcA-7TDnKZ7H3ROFVf0nBGQhYQ&ust=1472656020065868';
    songs: [
        { title: 'Hells Bells', duration: '5:12' },
        { title: 'What Do You Do For Money Honey?', duration: '3:35' },
        { title: 'Back In Black', duration: '4:15'},
        { title: 'Rock N Roll Aint Noise Pollution', duration: '4:15' },
        { title: 'Shoot To Thrill', duration: '5:18'}
    ]
};

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     return $(template);
 };

// var albumImage = document.getElementsByClassName('album-cover-art')[0];
// var albumTitle = document.getElementsByClassName('album-view-title')[0];
// var albumArtist = document.getElementsByClassName('album-view-artist')[0];
// var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
//
// var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

     // #3
       $albumSongList.empty();

     // #4
     for (var i = 0; i < album.songs.length; i++) {
        // albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;
 window.onload = function() {
     setCurrentAlbum(albumPicasso);

     var findParentByClassName = function(element,targetClass){
       if (element) {
          var parent = element.parentElement;
          while(parent.className != targetClass && parent.className!==null)
            {
              parent=parent.parentElement;
            }
          return parent;
        }
     };

     var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function(targetElement) {
      var songItem = getSongItem(targetElement);

    if (currentlyPlayingSong === null) {
      songItem.innerHTML = pauseButtonTemplate;
      currentlyPlayingSong = songItem.getAttribute('data-song-number');
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
      songItem.innerHTML = playButtonTemplate;
      currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
          var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
          currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
          songItem.innerHTML = pauseButtonTemplate;
          currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }

};

     songListContainer.addEventListener('mouseover', function(event) {
         // #1
         console.log(event.target);
         // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
          //      // Change the content from the number to the play button's HTML
          //     event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');

             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
          }
     });

     for (var i = 0; i < songRows.length; i++) {
       songRows[i].addEventListener('mouseleave', function(event) {
         // Selects first child element, which is the song-item-number element
        //  this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');

         var songItem = getSongItem(event.target);
         var songItemNumber = songItem.getAttribute('data-song-number');

         // #2
         if (songItemNumber !== currentlyPlayingSong) {
             songItem.innerHTML = songItemNumber;
         }
       });

       songRows[i].addEventListener('click', function(event) {
     // Event handler call
                  clickHandler(event.target);
      });
     }

    //  var albumArr = [albumBackInBlack,albumMarconi,albumPicasso];
    //  var i = 0;
    //  albumImage.addEventListener("click",function(event){
    //       setCurrentAlbum(albumArr[i]);
    //       i++;
    //       if(i == albumArr.length){
    //         i = 0;
    //       }
    //  });
 };
