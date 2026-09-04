async function sayHello(){
  let[tab]=await chrome.tabs.query({active:true,
    currentWindow:true
  });
  chrome.scripting.executeScript({
    target:{tabId:tab.id},
    func:()=>{
      alert('Hello from my extention!')
    }
  })
}
document.getElementById("myButton").addEventListener("click",sayHello);