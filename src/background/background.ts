// listen to message from our popup and act on it
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    if (data && data.request === 'please_say_hello') {
        alert(`Background says: ${data.message}`)
    }
})
