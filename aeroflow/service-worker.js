chrome.action.onClicked.addListener(tab=>{
  chrome.scripting.executeScript({
    target:{
      tabId:tab.id
    },
    func:()=>{
      alert('hello from my extension!');
}
});
});