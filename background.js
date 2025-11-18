const log = console.log

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("tabo.html")
    });
  });


chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "createTabWithGroup") {
    // 先創建 tab
    const tab = await chrome.tabs.create({ url: msg.url });
    
    // 將 tab 加入 tab group
    chrome.tabs.group({ tabIds: tab.id, groupId: 1914414613 }, (groupId) => {
      console.log("New tab group id:", groupId);

      // 可選：設定 tab group 標題和顏色
      chrome.tabGroups.update(groupId, { title: "My Group", color: "blue" });
    });
  }
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === "depositAll") {

    async function listTabGroupsAndTabs() {
      // 取得所有 tab groups
      const tabGroups = await chrome.tabGroups.query({});
      
      // 取得所有 tabs
      const tabs = await chrome.tabs.query({});
    
      // 建立 groupId -> tabs 的映射
      const groupTabsMap = {};
      for (const tab of tabs) {
        const groupId = tab.groupId;
        if (!groupTabsMap[groupId]) {
          groupTabsMap[groupId] = [];
        }
        groupTabsMap[groupId].push(tab);
      }
    
      // 列出每個 tab group 與其 tabs
      for (const group of tabGroups) {
        // console.log(`Group ID: ${group.id}, Title: ${group.title}, Color: ${group.color}`);
        console.log(`${group.title}`);
        const groupTabs = groupTabsMap[group.id] || [];
        for (const tab of groupTabs) {
          // console.log(`  Tab ID: ${tab.id}, Title: ${tab.title}, URL: ${tab.url}`);
          console.log(` - ${tab.title} `);
        }
      }
    
      // 列出沒有加入任何 group 的 tabs
      const ungroupedTabs = groupTabsMap[chrome.tabGroups.TAB_GROUP_ID_NONE] || [];
      if (ungroupedTabs.length > 0) {
        console.log("Ungrouped Tabs:");
        for (const tab of ungroupedTabs) {
          console.log(`  Tab ID: ${tab.id}, Title: ${tab.title}, URL: ${tab.url}`);
        }
      }
    }
  
  // 呼叫
  listTabGroupsAndTabs();
    
  }
});