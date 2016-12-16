var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: {
      listType: 'playlist',
      list: 'PLZSbJpuGcivE8kB4JQi6_4afIbDEwKX1z'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}


function onPlayerReady(event) {
  event.target.playVideo();
  setTimeout(_ => player.setShuffle(true), 1000)
}


function onPlayerStateChange(event) {
  // event: -1 is unstarted. Always fires when the video changes
  if (event.data === -1)
    httpGetAsync('/clear', _ => console.log('Response: ', _))
}


function stopVideo() {
  player.stopVideo();
}


const ws = new WebSocket('ws://localhost:1337')
ws.onmessage = event => player.nextVideo()

