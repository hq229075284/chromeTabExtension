const fs = require('fs')
const path = require('path')

const json = {
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "manifest_version": 2,
  "background": {
    "scripts": ["consist.js", "background.js"],
    "persistent": false
  },
  "page_action": {
    "default_popup": "popup.html",
    // 浏览器右上角的小图标
    "default_icon": {
      "16": "images/get_started16.png",
      "32": "images/get_started32.png",
      "48": "images/get_started48.png",
      "128": "images/get_started128.png"
    }
  },
  "permissions": ["declarativeContent", "storage", "contextMenus", "notifications", "tabs", "debugger"],
  // 扩展程序展示页的大图标
  "icons": {
    "16": "images/get_started16.png",
    "32": "images/get_started32.png",
    "48": "images/get_started48.png",
    "128": "images/get_started128.png"
  },
  // "browser_action": {
  //   "default_icon": "images/get_started16.png",
  //   "default_popup": "popup.html"
  // },
  "options_page": "options.html",
}

fs.writeFileSync(path.join('./manifest.json'), JSON.stringify(json))

console.log('created')