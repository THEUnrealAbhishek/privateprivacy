chrome.action.onClicked.addListener(tab=>{
  chrome.scripting.execute.Script({
    target:{
      tabId:tab.id
    },
    func:()=>{
      alert('hello from my extension!');
}
});
});