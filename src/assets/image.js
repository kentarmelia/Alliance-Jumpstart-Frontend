function openFullscreen() {
  var hiddenImg = document.getElementById('hidden_image');
  var fullscreen = document.createElement("div");
  fullscreen.className = "fullscreen";
  var imgElem = document.createElement("img");
  imgElem.src = hiddenImg.src;
  imgElem.onload = function() {
    var imgWidth = this.offsetWidth;
    var imgHeight = this.offsetHeight;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var widthRatio = imgWidth / windowWidth;
    var heightRatio = imgHeight / windowHeight;
    var maxRatio = Math.max(widthRatio, heightRatio);
    var scaledWidth = imgWidth / maxRatio;
    var scaledHeight = imgHeight / maxRatio;
    var leftOffset = (windowWidth - imgWidth / maxRatio) / 2;
    var topOffset = (windowHeight - imgHeight / maxRatio) / 2;
    imgElem.style.width = scaledWidth + "px";
    imgElem.style.height = scaledHeight + "px";
    imgElem.style.left = leftOffset + "px";
    imgElem.style.top = topOffset + "px";
  };
  imgElem.onclick = function () {
    if (document.body.contains(fullscreen)) {
      document.body.removeChild(fullscreen);
    }
    if (document.body.contains(imgElem)) {
      document.body.removeChild(imgElem);
    }
  };
  fullscreen.appendChild(imgElem);
  document.body.appendChild(fullscreen);

  if (fullscreen.requestFullscreen) {
    fullscreen.requestFullscreen();
  } else if (fullscreen.webkitRequestFullscreen) { /* Safari */
    fullscreen.webkitRequestFullscreen();
  } else if (fullscreen.msRequestFullscreen) { /* IE11 */
    fullscreen.msRequestFullscreen();
  }
}