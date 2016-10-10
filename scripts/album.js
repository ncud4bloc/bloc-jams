var setSong = function(songNumber) {
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
     
     var clickHandler = function() {
//            var songNumber = $(this).attr('data-song-number');
            var songNumber = parseInt($(this).attr('data-song-number'));

	        if (currentlyPlayingSongNumber !== null) {
		          // Revert to song number for currently playing song because user started playing new song.
		          var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		          currentlyPlayingCell.html(currentlyPlayingSongNumber);
	        }
	        if (currentlyPlayingSongNumber !== songNumber) {
		          // Switch from Play -> Pause button to indicate new song is playing.
		          $(this).html(pauseButtonTemplate);
		          setSong(songNumber);
                  updatePlayerBarSong();
	        } else if (currentlyPlayingSongNumber === songNumber) {
		          // Switch from Pause -> Play button to pause currently playing song.
		          $(this).html(playButtonTemplate);
                  $('.main-controls .play-pause').html(playerBarPlayButton);
                  setSong(songNumber);
		      //    currentlyPlayingSongNumber = null;
              //    currentSongFromAlbum = null;
	        }
     };
 
      
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
//        var songNumber = songNumberCell.attr('data-song-number');
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
     };

     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
//        var songNumber = songNumberCell.attr('data-song-number');
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
     };
 
     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
 };

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     // #1
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     // #2
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };
 
 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};
var previousSong = function() {
    
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

/////var findParentByClassName = function(element, targetClass) {
/////    if (element) {
/////        var currentParent = element.parentElement;
/////        while (currentParent.className != targetClass && currentParent.className !== null) {
/////            currentParent = currentParent.parentElement;
/////        }
/////        return currentParent;
/////    }
/////};

/////var getSongItem = function(element) {
/////    switch (element.className) {
/////        case 'album-song-button':
/////        case 'ion-play':
/////        case 'ion-pause':
/////            return findParentByClassName(element, 'song-item-number');
/////        case 'album-view-song-item':
/////            return element.querySelector('.song-item-number');
/////        case 'song-item-title':
/////        case 'song-item-duration':
/////            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
/////        case 'song-item-number':
/////            return element;
/////        default:
/////            return;
/////    }  
/////};

 /////var clickHandler = function(targetElement) {
 /////    var songItem = getSongItem(targetElement);  
 /////    
 /////    if (currentlyPlayingSong === null) {
 /////        songItem.innerHTML = pauseButtonTemplate;
 /////        currentlyPlayingSong = songItem.getAttribute('data-song-number');
 /////    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
 /////        songItem.innerHTML = playButtonTemplate;
 /////        currentlyPlayingSong = null;
 /////    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
 /////        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
 /////        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
 /////        songItem.innerHTML = pauseButtonTemplate;
 /////        currentlyPlayingSong = songItem.getAttribute('data-song-number');
 /////    }
 /////};


// Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

 // Store state of playing songs
 // #1
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 
 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     
     
// later deletion in checkpoint 18     for (var i = 0; i < songRows.length; i++) {
/////         songRows[i].addEventListener('mouseleave', function(event) {
/////           // #1
/////             var songItem = getSongItem(event.target);
/////             var songItemNumber = songItem.getAttribute('data-song-number');
///// 
/////             // #2
/////             if (songItemNumber !== currentlyPlayingSong) {
/////                 songItem.innerHTML = songItemNumber;
/////             }
/////         });            
// later deletion in checkpoint 18         songRows[i].addEventListener('click', function(event) {
// later deletion in checkpoint 18             clickHandler(event.target);
// later deletion in checkpoint 18         });
// later deletion in checkpoint 18     }
 });