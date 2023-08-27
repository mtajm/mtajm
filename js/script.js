
const albumSection = document.getElementById('album-section');
//connect to json
// async function mainFunc() {
//     const requestURL = 'sampledata.json';
//     const request = new Request(requestURL);
//     const response = await fetch(request);
//     const myData = await response.json();

//     createCollapsableAlbums(myData);
// }
//create collpase header div
function createCollapsableAlbums(jsonData) {
    totalAlbums = Object.keys(jsonData).length;
    parentKeys = Object.keys(jsonData);
    for (i = 0; i < totalAlbums - 1; i++) {
        var album = parentKeys[i];
        var collapseDiv = document.createElement('div');
        //collapseDiv.id = parentKeys[i];
        collapseDiv.classList.add("container", "mt-3");

        var link = document.createElement('a');
        link.href = "#" + parentKeys[i];
        link.setAttribute("data-bs-toggle", "collapse");
        //link.setAttribute("data-target", "#"+parentKeys[i]);
        link.textContent = jsonData[album]["name"];

        var collapseContent = document.createElement("div");
        collapseContent.id = parentKeys[i];
        collapseContent.classList.add("collapse");

        var songs = jsonData[album]["songs"];
        //console.log(songs);
        for (const song of songs) {
            const para = document.createElement('p');
            para.textContent = song.songname;

            const source = document.createElement('source');
            source.src = song.url;

            const audio = document.createElement('audio');
            audio.controls = true;
            audio.appendChild(source);

            collapseContent.appendChild(para);
            collapseContent.appendChild(audio);
        }


        collapseDiv.appendChild(link);
        collapseDiv.appendChild(collapseContent);

        albumSection.appendChild(collapseDiv);
    }
} //end of createCollapseAlbums


//create collapse content

//mainFunc();

window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    createCollapsableAlbums(langData);
    toggleArabicStylesheet(userPreferredLanguage);
});

async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
  }

  function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = langData["message"][key];
      //console.log(key);
    });
  }

  function toggleArabicStylesheet(lang) {
    const head = document.querySelector('head');
    const link = document.querySelector('#styles-link');
  
    if (link) {
      head.removeChild(link); // Remove the old stylesheet link
    }
    else if (lang === 'tr') {
        const newLink = document.createElement('link');
        newLink.id = 'styles-link';
        newLink.rel = 'stylesheet';
        newLink.href = './css/style-tr.css'; // Path to Arabic stylesheet
        head.appendChild(newLink);
      }
  }

  //change languge
  async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);

    toggleArabicStylesheet(lang);// Toggle Arabic stylesheet
  }

  function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }