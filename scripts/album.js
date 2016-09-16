// setSong(),getSongNumberCell(),updatePayerBarSong(),setVolume() are global helper functions
var setSong = function(songNumber){
  if (currentSoundFile) {
    currentSoundFile.stop();
  }

  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
      formats: [ 'mp3' ],
      preload: true
  });
    setVolume(currentVolume);
};

var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
};

var setVolume = function(volume){
  if(currentSoundFile){
    currentSoundFile.setVolume(volume);
  }
};


var getSongNumberCell = function(number){
    var songNumberElement = $('.song-item-number[data-song-number="' + number + '"]');
    return songNumberElement;
};

var updatePlayerBarSong = function(){

  $(".currently-playing .song-name").text(currentSongFromAlbum.title);
  $(".currently-playing .artist-song-mobile").text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  $(".currently-playing .artist-name").text(currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);

};


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

     // clickHandler logic
      var clickHandler = function() {

       var songNumber = parseInt($(this).attr('data-song-number'));
        if (currentlyPlayingSongNumber !== null) {
           // Revert to song number for currently playing song because user started playing new song.
           var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
           currentlyPlayingCell.html(currentlyPlayingSongNumber);
         }

         if (currentlyPlayingSongNumber === songNumber) {

            if(currentSoundFile.isPaused()){
              $(this).html(pauseButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPauseButton);
              currentSoundFile.play();
              updateSeekBarWhileSongPlays();
            } else {
              $(this).html(playButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
              currentSoundFile.pause();
            }

         } else if (currentlyPlayingSongNumber !== songNumber) {
               setSong(songNumber);
               currentSoundFile.play();
               //Update CSS of the volume seek bar based on current volume
               $(".volume .seek-bar .fill").css({'width': currentVolume + '%'});
               $(".volume .seek-bar .thumb").css({'left': currentVolume + '%'});
               updateSeekBarWhileSongPlays();
               $(this).html(pauseButtonTemplate);
               currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
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

    $albumSongList.empty();
     for (var i = 0; i < album.songs.length; i++) {
        // albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

 var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        currentSoundFile.bind('timeupdate', function(event) {
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }
};

 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;

    offsetXPercent = Math.max(0, offsetXPercent);//Making sure the percentage it not less than 0
    offsetXPercent = Math.min(100, offsetXPercent);////Making sure the percentage is not more than 100

    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

 var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left; //pageX is the jquery specific event value
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().hasClass("seek-control")){
          seek(seekBarFillRatio * currentSoundFile.getDuration());
        }else if ($(this).parent().hasClass("volume")){
          setVolume(seekBarFillRatio * 100);
        }
        updateSeekPercentage($(this), seekBarFillRatio);
    });

    $seekBars.find('.thumb').mousedown(function(event) {

      var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });

        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};
//Helper function used in nextSong() and previousSong() functions
 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

 var nextSong = function(){

   var previousSongIdx = trackIndex(currentAlbum,currentSongFromAlbum);
   var currentSongIdx = previousSongIdx + 1;
     if (currentSongIdx === currentAlbum.songs.length) {
       currentSongIdx = 0;
     }

   setSong(currentSongIdx + 1);
   currentSoundFile.play();
   updateSeekBarWhileSongPlays();
   //Update the player bar
   updatePlayerBarSong();
   //Update HTMLs of the previous and the next(current) songs
   $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]').html(pauseButtonTemplate);
  $('.song-item-number[data-song-number="' + (previousSongIdx + 1) + '"]').html(previousSongIdx + 1);
 };

 var previousSong = function(){

   var curSongIdx = trackIndex(currentAlbum,currentSongFromAlbum);
   var prevSongIdx = curSongIdx - 1;
     if (prevSongIdx < 0) {
       prevSongIdx = currentAlbum.songs.length - 1;
     }
   setSong(prevSongIdx + 1);
   currentSoundFile.play();
   updateSeekBarWhileSongPlays();
   //Update the player bar
   updatePlayerBarSong();
   //Update HTMLs of the previous and the next(current) songs
   $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]').html(pauseButtonTemplate);
   $('.song-item-number[data-song-number="' + (curSongIdx + 1) + '"]').html(curSongIdx + 1);
 };

// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// Play/Pause Templayes for player bar when a song is played or paused.
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;
// Store state of playing songs

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     setupSeekBars();
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
