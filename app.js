let playlistBtn = document.querySelectorAll(".playlist-button");
let playlistContainer = document.querySelector(".playlist-container");
let backBtn = document.querySelector("#Back-btn");
let homeBtn = document.querySelector("#Home-btn");
let isPlaylistOpen = false;

for(let btn of playlistBtn) {
    btn.addEventListener("click", () => {
        window.history.pushState({ view: "playlist"}, "", "#playlist");
        playlistContainer.classList.remove("hide");
        isPlaylistOpen = true;
    });
}

homeBtn.addEventListener("click", () => {
    window.history.pushState({view : "home"}, "", "#home");
});

backBtn.addEventListener("click", () => {
    window.history.back();
});

window.addEventListener("popstate", (data) => {
    if( !data.state || data.state.view !== "playlist"){
        playlistContainer.classList.add("hide");
        isPlaylistOpen = false;
    }
});