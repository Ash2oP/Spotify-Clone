const playlistEle = {
    playlistBtn : document.querySelectorAll(".playlist-button"),
    playlistContainer : document.querySelector(".playlist-container"),
    playlistPfp : document.querySelectorAll(".card-image"),
    playlistPfpContainer : document.querySelector(".playlist-header-pfp"),
    playlistTitle : document.querySelectorAll(".card-disc"),
    playlistTitleContainer : document.querySelector(".playlist-header-title"),
    playlistMenuIcon : document.querySelector("#topbar-menu-icon"),
    playlistTopbarMenu : document.querySelector(".topbar-menu-dropdown")
};
const bools = {
    isPlaylistOpen : false,
    isPlaylistMenuOpen : false,
};
const songsUI = {
    songsContainer : document.querySelector(".song-container"),
    volumeBar : document.querySelector(".volume-bar > input"),
};
const btns = {
    backBtn : document.querySelector("#Back-btn"),
    homeBtn : document.querySelector("#Home-btn"),
    volumeOn : document.querySelector(".volume-on"),
    volumeOff : document.querySelector(".volume-off")
};
const musicPlayerUI = {
    playerSongImg : document.querySelector(".player-song-img img"),
    playerSongName : document.querySelector(".player-song-name a"),
    playerSongArtist : document.querySelector(".player-song-artist a"),
    playerContainer : document.querySelector(".player-audio"),
    playerPlayBtn : document.querySelector(".music-player-play"),
    playerPauseBtn : document.querySelector(".music-player-pause"),
};
let libraryContent = document.querySelector(".left-content");

// Fetch Song Data
const getSongData = async () => {
    const res = await fetch('songData.json');
    const data = await res.json();
    return data;
}

// Fill Songs List
const fillSongs = async (data, i) => {
    // Clearing the Container
    songsUI.songsContainer.innerHTML = "";
    
    // Add Songs Template
    for(let j = 0; j < Object.keys(data[Object.keys(data)[i]]).length; j++){
        songsUI.songsContainer.innerHTML += `<div class="song-card-container flex items-center">
                        <!-- Inner Box -->
                        <button class="song-card full-width grid curved-border">
                            <!-- Items -->
                        <div class="song-idx full-height full-width flex items-center justify-content-center"><span>idx</span></div>
                        <div class="song-data full-height flex items-center">
                            <div class="song-img curved-border"><img src="" alt=""></div>
                            <div class="song-name flex justify-content-center">
                                <a id="song-title" href="#">Name</a>
                                <a id="song-artist" href="#">Artist</a>
                            </div>
                        </div>
                        <div class="song-album full-height full-width flex items-center"><a href="#">Album</a></div>
                        <div class="song-length full-height full-width flex items-center"><span>time</span></div>
                        <audio src="" class="song"></audio>
                    </button>
                    
                    </div>`;
    }
}

// Fill Up Song Details
const fillSongDetails = async (data, i) => {
    const tempSongsUI = {
        songIdx : document.querySelectorAll(".song-idx"),
        songImg : document.querySelectorAll(".song-img"),
        playlistKey : Object.keys(data)[i],
        songKeys : Object.keys(data[Object.keys(data)[i]]),
        songsListArr : data[Object.keys(data)[i]],
        songTitle : document.querySelectorAll("#song-title"),
        songArtist : document.querySelectorAll("#song-artist"),
        songAlbum : document.querySelectorAll(".song-album a"),
        songBtn : document.querySelectorAll(".song-card"),
        songs : document.querySelectorAll(".song")
    }

    // Added Index
    tempSongsUI.songIdx.forEach((ele, idx) => {
        ele.innerHTML = `<span>${tempSongsUI.songKeys[idx]}</span>`;
    })

    // Add Img
    tempSongsUI.songImg.forEach((ele, idx) => {
        ele.innerHTML = `<img src="${tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_img"]}" alt="">`;
    })

    // Add Song Name
    tempSongsUI.songTitle.forEach((ele, idx) => {
        ele.innerHTML = `${tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_name"]}`;
    })
    
    // Add Artist Name
    tempSongsUI.songArtist.forEach((ele, idx) => {
        ele.innerHTML = `${tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_artist"]}`;
    })

    // Add Album
    tempSongsUI.songAlbum.forEach((ele, idx) => {
        ele.innerHTML = `${tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_album"]}`;
    })

    // Connect the Songs
    tempSongsUI.songs.forEach((ele, idx) => {
        ele.setAttribute("src", `${tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_dir"]}`);
        ele.load();
    })

    let currSongIndex = -1;

    // Play Song
    tempSongsUI.songBtn.forEach((ele, idx) => {
        ele.addEventListener("click", async () => {
           const songDetails = {
                imgDir : tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_img"],
                songName : tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_name"],
                songArtist : tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_artist"],
                songDir : tempSongsUI.songsListArr?.[tempSongsUI.songKeys[idx]]?.["song_dir"],
           };
            await loadSong(songDetails.imgDir, songDetails.songName, songDetails.songArtist, songDetails.songDir);

           if(currSongIndex == idx && !musicPlayerUI.playerContainer.querySelector("audio").paused){
                await pauseSong();
                currSongIndex = -1;
           } else {
                await playSong();
                currSongIndex = idx;
           } 
            
        })
    })
    
}

// Load Song 
const loadSong = async (imgDir, songName, artistName, songDir) => {
    musicPlayerUI.playerSongImg.setAttribute("src", `${imgDir}`);
    musicPlayerUI.playerSongName.innerHTML = `${songName}`;
    musicPlayerUI.playerSongArtist.innerHTML = `${artistName}`;
    musicPlayerUI.playerContainer.innerHTML = `<audio src="${songDir}"></audio>`;
    musicPlayerUI.playerContainer.querySelector("audio").load();
}

// Play Song
const playSong = async () => {
    musicPlayerUI.playerContainer.querySelector("audio").play();
    await exchangePlayPause();
}

// Pause Song
const pauseSong = async () => {
    musicPlayerUI.playerContainer.querySelector("audio").pause();
    await exchangePlayPause();
}

const exchangePlayPause = async () => {
    if(musicPlayerUI.playerContainer.querySelector("audio").paused){
        musicPlayerUI.playerPauseBtn.classList.add("hide");
        musicPlayerUI.playerPlayBtn.classList.remove("hide");
    } else {
        musicPlayerUI.playerPauseBtn.classList.remove("hide");
        musicPlayerUI.playerPlayBtn.classList.add("hide");
    }
}

// Hiding Playlist
const hidePlaylist = () => {
    if(bools.isPlaylistOpen){
        playlistEle.playlistContainer.classList.add("hide");
        bools.isPlaylistOpen = false;
    }
}

// Activating Playlist
const activatePlaylist = () => {
    if(bools.isPlaylistOpen == false){
        playlistEle.playlistContainer.classList.remove("hide");
        bools.isPlaylistOpen = true;
    }
}

// Filling Up Playlist
const fillPLaylist = (idx) => {
    playlistEle.playlistPfpContainer.innerHTML = playlistEle.playlistPfp[idx].innerHTML;
    playlistEle.playlistTitleContainer.innerHTML = playlistEle.playlistTitle[idx].innerHTML;
}

// Hiding Playlist Topbar Menu
const hidePLaylistTopbarMenu = () => {
    playlistEle.playlistTopbarMenu.classList.add("hide");
    bools.isPlaylistMenuOpen = false;
}

// Activate Playlist Topbar Menu
const activatePLaylistTopbarMenu = () => {
    playlistEle.playlistTopbarMenu.classList.remove("hide");
    bools.isPlaylistMenuOpen = true;
}

playlistEle.playlistBtn.forEach((btn, idx) => {
    btn.addEventListener("click",async () => {
        window.history.pushState({ view: "playlist"}, "", "#playlist");
        fillPLaylist(idx);
        const data = await getSongData();
        await fillSongs(data, idx);
        await fillSongDetails(data, idx);
        activatePlaylist();
    })
});

btns.homeBtn.addEventListener("click", () => {
    window.history.pushState({view : "home"}, "", "#home");
    hidePlaylist();
    hidePLaylistTopbarMenu();
});

btns.backBtn.addEventListener("click", () => {
    window.history.back();
});

window.addEventListener("popstate", (data) => {
    if( !data.state || data.state.view !== "playlist"){
        hidePlaylist();
        hidePLaylistTopbarMenu();
    }
    if( data.state.view === "playlist"){
        activatePlaylist();
    }
});

playlistEle.playlistMenuIcon.addEventListener("click", () => {
    if(bools.isPlaylistMenuOpen){
        hidePLaylistTopbarMenu();
    }
    else {
        activatePLaylistTopbarMenu();
    }
});

libraryContent.addEventListener("scroll", () => {
    if(bools.hasScrolledLibrary == false){
        libraryContent.classList.add("bottom-shadow");
    }
});

btns.volumeOn.addEventListener("click", () => {
    btns.volumeOff.classList.remove("hide");
    btns.volumeOn.classList.add("hide");
    songsUI.volumeBar.value = '0';
});

btns.volumeOff.addEventListener("click", () => {
    btns.volumeOff.classList.add("hide");
    btns.volumeOn.classList.remove("hide");
    songsUI.volumeBar.value = '100';
});

musicPlayerUI.playerPauseBtn.addEventListener("click", async () => {
    await pauseSong();
});

musicPlayerUI.playerPlayBtn.addEventListener("click", async () => {
    await playSong();
});