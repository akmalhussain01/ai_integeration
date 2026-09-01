const userInput = document.getElementById("input")
const sendButton = document.getElementById("sendBtn")
const messagesContainer = document.getElementById("messages")
const threadId = Date.now().toString(36) + Math.random().toString(36).substring(2, 10)


const loading = document.createElement("div")
loading.textContent = "Loading..."
loading.className = "my-6 animate-pulse text-gray-400"

userInput.addEventListener('keyup', handleEnter)
sendButton.addEventListener('click', sendchat)


async function handleEnter(event) {

    if (event.key === "Enter" && !event.shiftKey) {
        const usertext = userInput.value.trim()

        if (!usertext) {
            return;
        }
        console.log("User input:", usertext)
        await generate(usertext)
    }

}

async function generate(usertext) {

    const msg = document.createElement("div")
    msg.className = "max-w-[75%] bg-gray-800 rounded-2xl px-4 py-2.5 ml-auto mr-3 sm:mr-4 mb-2 sm:mb-3 break-words"
    msg.textContent = usertext
    messagesContainer.appendChild(msg)
    userInput.value = ""

    // disable input while waiting for a response
    userInput.disabled = true
    sendButton.disabled = true

    messagesContainer.appendChild(loading)

    try {
        // call the server for the response
        const assistantResponse = await callServer(usertext)

        const assismsg = document.createElement("div")
        assismsg.className = "max-w-[75%] px-4 py-2.5 mr-auto mr-3 sm:mr-4 mb-2 sm:mb-3 break-words"
        assismsg.textContent = assistantResponse ?? "Something went wrong. Please try again."
        messagesContainer.appendChild(assismsg)
    } finally {
        // always remove loading indicator and re-enable input,
        // even if callServer throws or returns an error
        loading.remove()
        userInput.disabled = false
        sendButton.disabled = false
        userInput.focus()
    }

}

async function callServer(usertext) {
    try {
        const response = await fetch("http://localhost:4000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ threadId, message: usertext })
        })

        if (!response.ok) {
            console.error("Error calling server:", response.statusText)
            return null
        }

        const result = await response.json()
        console.log("Server response:", result.message)
        return result.message
    } catch (err) {
        console.error("Network error calling server:", err)
        return null
    }
}

async function sendchat(e) {

    e.preventDefault()
    const usertext = userInput.value.trim()

    if (!usertext) {
        return;
    }
    await generate(usertext, threadId)
}