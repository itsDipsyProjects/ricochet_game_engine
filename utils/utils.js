export function popup(passHTML){
    let overlayDiv = document.createElement("div");
    overlayDiv.style = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    let windowDiv = document.createElement("div");
    windowDiv.style = `
        width: 300px;
        padding: 20px;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        text-align: center;
        position: relative;
    `;

    windowDiv.innerHTML = `
        <div class="close" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span>Create new map</span>
            <div id="closeBtn" style="cursor: pointer;">X</div>
        </div>
        <div>${passHTML}</div>
    `;

    overlayDiv.appendChild(windowDiv);
    document.body.appendChild(overlayDiv);

    document.getElementById("closeBtn").onclick = function() {
        document.body.removeChild(overlayDiv);
    };
}
