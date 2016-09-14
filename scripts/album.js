
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     //return $(template);
      var $row = $(template);

      var updatePlayerBarSong = function(){

        $(".currently-playing .song-name").text(currentSongFromAlbum.title);
        $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
        $(".currently-playing .artist-name").text(currentAlbum.artist);
        $('.main-controls .play-pause').html(playerBarPauseButton);

      };

      var setSong = function(songNumber){
        currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      };

      var getSongNumberCell = function(number){
          var songNumberElement = $('.song-item-number[data-song-number="' + number + '"]');
          return songNumberElement;
      };

      var clickHandler = function() {
    // clickHandler logic
       var songNumber = parseInt($(this).attr('data-song-number'));
 //
         if (currentlyPlayingSongNumber !== null) {
           // Revert to song number for currently playing song because user started playing new song.
          // var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
           var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
           currentlyPlayingCell.html(currentlyPlayingSongNumber);
         }

         if (currentlyPlayingSongNumber === songNumber) {
           $(this).html(playButtonTemplate);
           currentlyPlayingSongNumber = null;
           currentSongFromAlbum = null;
           $('.main-controls .play-pause').html(playerBarPlayButton);
         } else if (currentlyPlayingSongNumber !== songNumber) {
               $(this).html(pauseButtonTemplate);
               setSong(songNumber);
              //  currentlyPlayingSongNumber = songNumber;
              //  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
               updatePlayerBarSong(); //Pausing when a new song is selected
         }
      };

      var onHover = function(event) {
          var songNumberCell = $(this).find('.song-item-number');
          var songNumber = parseInt(songNumberCell.attr('data-song-number'));

          if (songNumber !== currentlyPlayingSongNumber) {
              songNumberCell.html(playButtonTemplate);
          }
      };

      var offHover = function(event) {
          var songNumberCell = $(this).find('.song-item-number');
          var songNumber = parseInt(songNumberCell.attr('data-song-number'));

          if (songNumber !== currentlyPlayingSongNumber) {
              songNumberCell.html(songNumber);
          }
      };

      $row.find('.song-item-number').click(clickHandler);
      $row.hover(onHover, offHover);
      return $row;
 };


var setCurrentAlbum = function(album) {
    currentAlbum = album;

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

//Helper function used in nextSong() and previousSong() functions
 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

//Assignment for merging nextSong and previousSong functions
 var nextOrPrevSong = function(event){
   
   var updatePlayerBarSong = function(){

     $(".currently-playing .song-name").text(currentSongFromAlbum.title);
     $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
     $(".currently-playing .artist-name").text(currentAlbum.artist);
     $('.main-controls .play-pause').html(playerBarPauseButton);

   };

   var previousSongIdx = trackIndex(currentAlbum,currentSongFromAlbum);
   var currentSongIdx = null;
   if (event.target == $(".ion-skip-forward").get(0)) {
     console.log("Inside skip Forw - ");
      currentSongIdx = previousSongIdx + 1;
      console.log("currentSongIdx - " + currentSongIdx);
      if (currentSongIdx === currentAlbum.songs.length) {
        currentSongIdx = 0;
      }
   } else {
     currentSongIdx = previousSongIdx - 1;
     if (currentSongIdx < 0) {
       currentSongIdx = currentAlbum.songs.length - 1;
     }
   }
   currentSongFromAlbum = currentAlbum.songs[currentSongIdx];
   updatePlayerBarSong();
   currentlyPlayingSongNumber = currentSongIdx + 1;
   $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]').html(pauseButtonTemplate);
   $('.song-item-number[data-song-number="' + (previousSongIdx + 1) + '"]').html(previousSongIdx + 1);
};
 //  var nextSong = function(){
 //
 //   var previousSongIdx = trackIndex(currentAlbum,currentSongFromAlbum);
 //   var currentSongIdx = previousSongIdx + 1;
 //     if (currentSongIdx === currentAlbum.songs.length) {
 //       currentSongIdx = 0;
 //     }
 //   currentSongFromAlbum = currentAlbum.songs[currentSongIdx];
 //
 //   //Update the player bar
 //   $(".currently-playing .song-name").text(currentSongFromAlbum.title);
 //   $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
 //   $(".currently-playing .artist-name").text(currentAlbum.artist);
 //   $('.main-controls .play-pause').html(playerBarPauseButton);
 //   //Update HTMLs of the previous and the next(current) songs
 //   currentlyPlayingSongNumber = currentSongIdx + 1;
 //   $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]').html(pauseButtonTemplate);
 //  $('.song-item-number[data-song-number="' + (previousSongIdx + 1) + '"]').html(previousSongIdx + 1);
 // };
 //
 // var previousSong = function(){
 //
 //   var curSongIdx = trackIndex(currentAlbum,currentSongFromAlbum);
 //   var prevSongIdx = curSongIdx - 1;
 //     if (prevSongIdx < 0) {
 //       prevSongIdx = currentAlbum.songs.length - 1;
 //     }
 //   currentSongFromAlbum = currentAlbum.songs[prevSongIdx];
 //   //Update the player bar
 //   $(".currently-playing .song-name").text(currentSongFromAlbum.title);
 //   $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
 //   $(".currently-playing .artist-name").text(currentAlbum.artist);
 //   $('.main-controls .play-pause').html(playerBarPauseButton);
 //   //Update HTMLs of the previous and the next(current) songs
 //   currentlyPlayingSongNumber = prevSongIdx + 1;
 //   $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]').html(pauseButtonTemplate);
 //   $('.song-item-number[data-song-number="' + (curSongIdx + 1) + '"]').html(curSongIdx + 1);
 // };

// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// Play/Pause Templayes for player bar when a song is played or paused.
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
// Store state of playing songs

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(nextOrPrevSong);
     $nextButton.click(nextOrPrevSong);
//      var findParentByClassName = function(element,targetClass){
//        if (element) {
//           var parent = element.parentElement;
//           while(parent.className != targetClass && parent.className!==null)
//             {
//               parent=parent.parentElement;
//             }
//           return parent;
//         }
//      };
//
//      var getSongItem = function(element) {
//     switch (element.className) {
//         case 'album-song-button':
//         case 'ion-play':
//         case 'ion-pause':
//             return findParentByClassName(element, 'song-item-number');
//         case 'album-view-song-item':
//             return element.querySelector('.song-item-number');
//         case 'song-item-title':
//         case 'song-item-duration':
//             return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
//         case 'song-item-number':
//             return element;
//         default:
//             return;
//     }
// };

// var clickHandler = function(targetElement) {
//       var songItem = getSongItem(targetElement);
//
//     if (currentlyPlayingSong === null) {
//       songItem.innerHTML = pauseButtonTemplate;
//       currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//       songItem.innerHTML = playButtonTemplate;
//       currentlyPlayingSong = null;
//     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//           var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//           currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//           songItem.innerHTML = pauseButtonTemplate;
//           currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     }
//
// };



    //  for (var i = 0; i < songRows.length; i++) {
     //
    //    songRows[i].addEventListener('click', function(event) {
    //  // Event handler call
    //               clickHandler(event.target);
    //   });
    //  }
});
