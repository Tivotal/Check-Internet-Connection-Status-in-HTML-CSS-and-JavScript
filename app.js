/* Created by Tivotal */

let popup = document.querySelector(".popup");
let icon = document.querySelector(".icon i");
let title = document.querySelector(".title");
let desc = document.querySelector(".desc");
let button = document.querySelector(".reconnect-btn");
let isOnline = true,
  intervalId,
  timer = 10;

let checkConnection = async () => {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false;
  }

  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

let handlePopup = (status) => {
  if (status) {
    icon.className = "bx bx-wifi";
    title.innerText = "Connection restored";
    desc.innerText = "Your device is connected to internet successfully";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }

  icon.className = "bx bx-wifi-off";
  title.innerText = "Connection lost";
  desc.innerHTML = `Your network is unavailable. We will attempt to reconnect in
  <b>10</b> seconds`;
  popup.classList.remove("online");
  popup.classList.add("show");

  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection();
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};

//checking connection every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
button.addEventListener("click", checkConnection);
