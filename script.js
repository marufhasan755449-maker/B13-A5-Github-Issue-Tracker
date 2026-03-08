const container = document.getElementById("issues-container");
const issueCount = document.querySelector("h2");
const searchInput = document.getElementById("searchInput");

function setActiveButton(clickedBtn){
    const buttons = document.querySelectorAll("section button");
    buttons.forEach(btn => btn.classList.remove("btn-primary"));
    clickedBtn.classList.add("btn-primary");
}
function displayIssues(issues){
    container.innerHTML = "";
    issueCount.innerText = `${issues.length} Issues`;

    issues.forEach(issue=>{
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded shadow border-t-4 hover:shadow-lg transition";

        if(issue.status === "open"){
            card.classList.add("border-green-500");
        } else {
            card.classList.add("border-purple-500");
        }

        card.innerHTML = `
            <h3 class="font-bold text-lg text-gray-800 mb-2">${issue.title}</h3>
            <p class="text-sm text-gray-500 mb-3">${issue.description}</p>
            <div class="text-sm space-y-1 text-gray-700">
                <p><b>Status:</b> ${issue.status}</p>
                <p><b>Author:</b> ${issue.author}</p>
                <p><b>Priority:</b> ${issue.priority}</p>
                <p><b>Label:</b> ${issue.label}</p>
                <p><b>Created:</b> ${issue.createdAt}</p>
            </div>
        `;

        container.appendChild(card);
    });
}
async function loadIssues(btn){
    if(btn) setActiveButton(btn);

    container.innerHTML = `<div class="flex justify-center col-span-4">
        <span class="loading loading-spinner loading-lg"></span>
    </div>`;

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    displayIssues(data.data);
}
async function openIssues(btn){
    setActiveButton(btn);

    container.innerHTML = `<div class="flex justify-center col-span-4">
        <span class="loading loading-spinner loading-lg"></span>
    </div>`;

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    const openData = data.data.filter(issue => issue.status === "open");

    displayIssues(openData);
}
async function closedIssues(btn){
    setActiveButton(btn);

    container.innerHTML = `<div class="flex justify-center col-span-4">
        <span class="loading loading-spinner loading-lg"></span>
    </div>`;

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    const closedData = data.data.filter(issue => issue.status === "closed");

    displayIssues(closedData);
}

async function searchIssue(){
    const text = searchInput.value.trim();

    if(text === ""){
        loadIssues();
        return;
    }

    container.innerHTML = `<div class="flex justify-center col-span-4">
        <span class="loading loading-spinner loading-lg"></span>
    </div>`;

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
    const data = await res.json();

    displayIssues(data.data);
}
loadIssues();