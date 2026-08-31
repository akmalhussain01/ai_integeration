const userInput = document.getElementById("input")

document.addEventListener('keyup', handleEnter)

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
    msg.className = `max-w-3xl bg-gray-800 rounded-lg  mx-auto px-3 sm:px-4 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6`
    msg.textContent = usertext
    document.getElementById("messages").appendChild(msg)
    userInput.value = ""
}