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
let isPlaylistOpen = false;
let isPlaylistMenuOpen = false;
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

// Hiding Playlist Topbar Menu
const hidePLaylistTopbarMenu = () => {
    playlistEle.playlistTopbarMenu.classList.add("hide");
    isPlaylistMenuOpen = false;
}

// Activate Playlist Topbar Menu
const activatePLaylistTopbarMenu = () => {
    playlistEle.playlistTopbarMenu.classList.remove("hide");
    isPlaylistMenuOpen = true;
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
    if(isPlaylistMenuOpen){
        hidePLaylistTopbarMenu();
    }
    else {
        activatePLaylistTopbarMenu();
    }
});