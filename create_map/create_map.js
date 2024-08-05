import { popup } from "../utils/utils.js";

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 800;
let canvasHeight = 800;
canvas.width = canvasWidth;
canvasHeight = canvasHeight;

function create_map(){
    let mapProperties = {
        widthTilePixel: 50,
        heightTilePixel: 50,
        get areaOfTile() { return this.widthTilePixel * this.heightTilePixel; },
        mapTilesWidth: 20,
        mapTilesHeight: 20,
        get mapAreaInTiles() { return this.mapTilesWidth * this.mapTilesHeight; },
    };
    
    let mapArray = [];
    for (let i = 0; i < mapProperties.mapTilesWidth; i++) {
        let columArray = [];
        mapArray.push(columArray);
        for (let j = 0; j < mapProperties.mapTilesHeight; j++) {
            columArray.push(0);
        }
    }    
    let eachOutLineTileObject = {
        x: 0,
        y: 0,
        width: mapProperties.widthTilePixel,
        height: mapProperties.heightTilePixel,
        selected: false,
        renderOutlineTile: function(x,y){ 
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x, y, this.width, this.height);
        }
    }
    mapArray.forEach((eachColum,columIndex) => {
        eachOutLineTileObject.renderOutlineTile(0,columIndex* eachOutLineTileObject.width)
        eachColum.forEach((eachRowElement, rowIndex) => {
           console.log(rowIndex * eachOutLineTileObject.width);
            eachOutLineTileObject.renderOutlineTile(rowIndex * eachOutLineTileObject.width,columIndex* eachOutLineTileObject.width)
            
        }) 
    })
}

create_map();