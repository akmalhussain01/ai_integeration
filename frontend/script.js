const userInput = document.getElementById("input")
const sendButton = document.getElementById("sendBtn")

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
    document.getElementById("messages").appendChild(msg)
    userInput.value = ""


    //call the server for the response
    const assistantResponse = await callServer(usertext)

    const assismsg= document.createElement("div")
    assismsg.className = "max-w-[75%] px-4 py-2.5 mr-auto mr-3 sm:mr-4 mb-2 sm:mb-3 break-words"
    assismsg.textContent = assistantResponse
    document.getElementById("messages").appendChild(assismsg)
    userInput.value = ""

}

async function callServer(usertext) {
    const response = await fetch("http://localhost:4000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: usertext })
    })

    if (!response.ok) {
        console.error("Error calling server:", response.statusText)
        return
    }

    const result = await response.json()
    console.log("Server response:", result.message)
    return result.message
}

async function sendchat(e) {

    e.preventDefault()
    const usertext = userInput.value.trim()

    if (!usertext) {
        return;
    }
    await generate(usertext)
}   