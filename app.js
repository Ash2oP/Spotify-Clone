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
    isPlaylistMenuOpen : false
};
let backBtn = document.querySelector("#Back-btn");
let homeBtn = document.querySelector("#Home-btn");


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
    if(bools.isPlaylistMenuOpen){
        hidePLaylistTopbarMenu();
    }
    else {
        activatePLaylistTopbarMenu();
    }
});