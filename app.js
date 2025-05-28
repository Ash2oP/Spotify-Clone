let playlistBtn = document.querySelectorAll(".playlist-button");
let playlistContainer = document.querySelector(".playlist-container");
let backBtn = document.querySelector("#Back-btn");
let homeBtn = document.querySelector("#Home-btn");
let isPlaylistOpen = false;

// Hiding Playlist
const hidePlaylist = () => {
    if(isPlaylistOpen){
        playlistContainer.classList.add("hide");
        isPlaylistOpen = false;
    }
}

// Activating Playlist
const activatePlaylist = () => {
    if(isPlaylistOpen == false){
        playlistContainer.classList.remove("hide");
        isPlaylistOpen = true;
    }
}

for(let btn of playlistBtn) {
    btn.addEventListener("click", () => {
        window.history.pushState({ view: "playlist"}, "", "#playlist");
        activatePlaylist();
    });
}

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