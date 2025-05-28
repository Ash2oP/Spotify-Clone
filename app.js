let playlistBtn = document.querySelectorAll(".playlist-button");
let playlistContainer = document.querySelector(".playlist-container");
let isPlaylistOpen = false;

for(let btn of playlistBtn) {
    btn.addEventListener("click", ()=> {
        console.log("We r in");
        if(isPlaylistOpen){
            playlistContainer.classList.add("hide");
        } else {
            playlistContainer.classList.remove("hide");
        }
    });
}