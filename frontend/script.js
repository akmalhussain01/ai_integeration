const userInput = document.getElementById("input")
const sendButton = document.getElementById("sendBtn")

userInput.addEventListener('keyup', handleEnter)
sendButton.addEventListener('click', sendchat)

function handleEnter(event) {

    if (event.key === "Enter" && !event.shiftKey) {
        const usertext = userInput.value.trim()

        if (!usertext) {
            return;
        }
        console.log("User input:", usertext)
        generate(usertext)
    }

}

function generate(usertext) {

    const msg = document.createElement("div")
    msg.className = "max-w-[75%] bg-gray-800 rounded-2xl px-4 py-2.5 ml-auto mr-3 sm:mr-4 mb-2 sm:mb-3 break-words"
    msg.textContent = usertext
    document.getElementById("messages").appendChild(msg)
    userInput.value = ""

}

function sendchat(e) {

    e.preventDefault()
    const usertext = userInput.value.trim()

    if (!usertext) {
        return;
    }
    generate(usertext)
}   