const log = console.log

// document.getElementById('yale').onclick = async function () {
//   const tab = await chrome.tabs.getCurrent();
//   log(tab.id);
// };

document.getElementById("yale").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    action: "createTabWithGroup",
    url: "https://google.com"
  });
});

document.getElementById("deposit").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    action: "depositAll",
    url: "https://google.com"
  });
});

/*
currentId
(await chrome.tabs.getCurrent()).id

currentGroupId
(await chrome.tabs.get((await chrome.tabs.getCurrent()).id)).groupId

*/