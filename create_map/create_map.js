import { popup } from "../utils/utils.js";

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 1500;
let canvasHeight = 900;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
let scaleFactor = 1;

function create_map() {
    let mapProperties = {
        widthTilePixel: 50,
        heightTilePixel: 50,
        get areaOfTile() { return this.widthTilePixel * this.heightTilePixel; },
        mapTilesWidth: 50,
        mapTilesHeight: 50,
        get mapAreaInTiles() { return this.mapTilesWidth * this.mapTilesHeight; },
    };

    let mapArray = [];
    for (let i = 0; i < mapProperties.mapTilesWidth; i++) {
        let columnArray = [];
        mapArray.push(columnArray);
        for (let j = 0; j < mapProperties.mapTilesHeight; j++) {
            columnArray.push(0);
        }
    }

    let eachOutLineTileObject = {
        x: 0,
        y: 0,
        width: mapProperties.widthTilePixel,
        height: mapProperties.heightTilePixel,
        selected: false,
        renderOutlineTile: function(x, y) { 
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x, y, this.width, this.height);
        }
    };

    mapArray.forEach((eachColumn, columnIndex) => {
        eachOutLineTileObject.renderOutlineTile(0, columnIndex * eachOutLineTileObject.width);
        eachColumn.forEach((eachRowElement, rowIndex) => {
            eachOutLineTileObject.renderOutlineTile(rowIndex * eachOutLineTileObject.width, columnIndex * eachOutLineTileObject.width);
        });
    });
}

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0); 
    create_map(); 
}

// Lär mig wheel even
function handleWheelEvent(event) {
    event.preventDefault();
    if (event.deltaY < 0 && event.shiftKey === true) {
        // Zoom in
        scaleFactor *= 1.1;
    }
    if(event.deltaY > 0 && event.shiftKey === true){
        // Zoom out
        scaleFactor *= 0.9;
    }
    drawMap();
}

canvas.addEventListener('wheel', handleWheelEvent);

drawMap();

/*
    TODO: 
    
    1.förstå hur scaleFactor och set Transform fungerar det var GPT lösning.
    och fatta varför jag behör två clearRect för att ta bort den konstiga bugen, det var bara 
    något jag själv exprementerade med lolz.

    2. Fixa så att den rectanglen man hovrar på blir lätt blå

    3. Fixa så att när rectanglen man hovrar på och sedan klickar blir grön. Basicly börja implementera coordinate system med events och gör så att
    den kan bli selected, borde vara bra om man kan ha någon class som är rectanglen som blir highlighted. 

    
    4. Om formatera koden. Kom på nu att varje rectanglen som finns är ju det som kommer bli en del av bannan så det är inte en så kallad outlineTile utan det borde bara vara en tile
    så att skapa en tile class hade nog inte varit särklit dumt. Där kan man ju som min ide med objectet ha en boolean som represterar om den är selected eller även till och med hoverd och så kan man
    dynamiskt fixa styles på den beronde på. Tror det är dags att implementera en animation/gameloop så att värdena kan dynamiskt ändra sig.
    
    5. Gör så att man kan hålla in wheel knappen och då ska man kunna dra runt mappen d.v.s man ska ändra transform och på så sätt blir det som tiled.
    
*/