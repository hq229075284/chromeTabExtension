chrome.runtime.onInstalled.addListener(function () {
  console.log('The color is green.');

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      // conditions: [new chrome.declarativeContent.PageStateMatcher({
      //   // pageUrl: { hostEquals: 'developer.chrome.com' },
      // })
      // ],
      conditions: [new chrome.declarativeContent.PageStateMatcher()],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

  // 右键菜单、扩展菜单
  chrome.contextMenus.create({
    id: MENU_MAP.pageCollection,
    title: '页面收集器',
    contexts: ['all'],
    type: 'normal'
  })
  chrome.contextMenus.create({
    parentId: MENU_MAP.pageCollection,
    id: MENU_MAP.showAllPage,
    title: '显示所有页面',
    contexts: ['all'],
    type: 'normal'
  })
  chrome.contextMenus.create({
    parentId: MENU_MAP.pageCollection,
    id: MENU_MAP.saveAndCloseAllPage,
    title: '存储并关闭页面',
    contexts: ['all'],
    type: 'normal'
  })

  chrome.contextMenus.onClicked.addListener(function (info, tabs) {
    // alert(JSON.stringify(info))
    // console.log(e)
    chrome.notifications.create('1', {
      type: 'basic',
      iconUrl: './images/get_started16.png',
      title: 'basic',
      message: JSON.stringify(tabs)
    }, function (notificationsId) {
      // alert(notificationsId)
    })

    // chrome.tabs.create({
    //   url: './other.html'
    // }, function (tab) {
    //   alert(JSON.stringify(tab))
    // })

    // chrome.debugger.attach({
    //   extensionId: 'nokhhifdlpgdmakjlickignglemglpii'
    // }, '1.3')

    switch (info.menuItemId) {
      case MENU_MAP.saveAndCloseAllPage: {
        chrome.tabs.query({ currentWindow: true }, function (tabs) {
          const urls = tabs.map(t => t.url)
          // alert(JSON.stringify(urls))
          chrome.storage.sync.set({ 'urls': urls }, function () {
            // chrome.storage.sync.get('urls', function (urls) {
            //   alert(JSON.stringify(urls))
            // })
          })
        })
        break;
      }
      case MENU_MAP.showAllPage: {
        chrome.storage.sync.get('urls', function (data) {
          const urls = data.urls
          // alert(data.urls)
          urls.map(function (url) {
            chrome.tabs.create({ url }, function () {
              console.log('create')
            })
          })
        })
      }
      default:
    }

  })

});