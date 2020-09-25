const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Pass joke to Voice RSS API
function tellMe(joke) {
  console.log('tell me:', joke);
  VoiceRSS.speech({
    key: 'bd675c5cd667446f89bd3619dea58367',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from API
async function getJokes() {
  let joke = '';
  const jokesApiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(jokesApiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Toggle button
    toggleButton();
  } catch (error) {
    // Process error here
    console.log('Whoops: ', error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
