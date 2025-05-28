const playlistEle = {
    playlistBtn : document.querySelectorAll(".playlist-button"),
    playlistContainer : document.querySelector(".playlist-container"),
    playlistPfp : document.querySelectorAll(".card-image"),
    playlistPfpContainer : document.querySelector(".playlist-header-pfp"),
    playlistTitle : document.querySelectorAll(".card-disc"),
    playlistTitleContainer : document.querySelector(".playlist-header-title")
};
let isPlaylistOpen = false;
let backBtn = document.querySelector("#Back-btn");
let homeBtn = document.querySelector("#Home-btn");

// Hiding Playlist
const hidePlaylist = () => {
    if(isPlaylistOpen){
        playlistEle.playlistContainer.classList.add("hide");
        isPlaylistOpen = false;
    }
}

// Activating Playlist
const activatePlaylist = () => {
    if(isPlaylistOpen == false){
        playlistEle.playlistContainer.classList.remove("hide");
        isPlaylistOpen = true;
    }
}

// Filling Up Playlist
const fillPLaylist = (idx) => {
    playlistEle.playlistPfpContainer.innerHTML = playlistEle.playlistPfp[idx].innerHTML;
    playlistEle.playlistTitleContainer.innerHTML = playlistEle.playlistTitle[idx].innerHTML;
}

playlistEle.playlistBtn.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        window.history.pushState({ view: "playlist"}, "", "#playlist");
        fillPLaylist(idx);
        activatePlaylist();
    })
});

homeBtn.addEventListener("click", () => {
    window.history.pushState({view : "home"}, "", "#home");
    hidePlaylist();
});

backBtn.addEventListener("click", () => {
    window.history.back();
});

window.addEventListener("popstate", (data) => {
    if( !data.state || data.state.view !== "playlist"){
        hidePlaylist();
    }
    if( data.state.view === "playlist"){
        activatePlaylist();
    }
});