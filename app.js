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
    isSongTemplateIn : false
};
const songsUI = {
    songsContainer : document.querySelector(".song-container")
}
let backBtn = document.querySelector("#Back-btn");
let homeBtn = document.querySelector("#Home-btn");

// Fetch Song Data
const getSongData = async () => {
    const res = await fetch('songData.json');
    const data = await res.json();
    return data;
}

// Fill Songs List
const fillSongs = async (data, i) => {
    if(bools.isSongTemplateIn == true){
        return;
    }
    
    // Add Songs Template
    for(let j = 0; j < Object.keys(data[Object.keys(data)[i]]).length; j++){
        songsUI.songsContainer.innerHTML += `<div class="song-card-container flex items-center">
                        <!-- Inner Box -->
                        <button class="song-card full-width grid curved-border">
                            <!-- Items -->
                        <div class="song-idx full-height full-width flex items-center justify-content-center"><span>idx</span></div>
                        <div class="song-data full-height flex items-center">
                            <div class="song-img curved-border"><img src="assets/dilnu_img.jpg" alt=""></div>
                            <div class="song-name flex justify-content-center">
                                <a id="song-title" href="#">Name</a>
                                <a href="#">Artist</a>
                            </div>
                        </div>
                        <div class="song-album full-height full-width flex items-center"><a href="#">Album</a></div>
                        <div class="song-length full-height full-width flex items-center"><span>time</span></div>

                    </button>
                    </div>`;
    }
    bools.isSongTemplateIn = true;
}

// Fill Up Song Details
const fillSongDetails = async (data, i) => {
    const tempSongsUI = {
        songIdx : document.querySelectorAll(".song-idx"),
        songImg : document.querySelectorAll(".song-img"),
        playlistKey : Object.keys(data)[i],
        songKeys : Object.keys(data[Object.keys(data)[i]])
    }

    // Added Index
    tempSongsUI.songIdx.forEach((ele, idx) => {
        ele.innerHTML = `<span>${tempSongsUI.songKeys[idx]}</span>`;
    })

    // Add Img
    tempSongsUI.songImg.forEach((ele, idx) => {
        ele.innerHTML = `<img src="${data[tempSongsUI.playlistKey]?.[tempSongsUI.songKeys[idx]]?.["song_img"]}" alt="">`
    })
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

homeBtn.addEventListener("click", () => {
    window.history.pushState({view : "home"}, "", "#home");
    hidePlaylist();
    hidePLaylistTopbarMenu();
});

backBtn.addEventListener("click", () => {
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