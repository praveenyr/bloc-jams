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
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     return template;
 };

var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];

var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 var setCurrentAlbum = function(album) {
     // #1


     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);

     // #3
     albumSongList.innerHTML = '';

     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };


 window.onload = function() {
     setCurrentAlbum(albumPicasso);

     var albumArr = [albumBackInBlack,albumMarconi,albumPicasso];
     var i = 0;
     albumImage.addEventListener("click",function(event){
          setCurrentAlbum(albumArr[i]);
          i++;
          if(i == albumArr.length){
            i = 0;
          }
     });
 };
