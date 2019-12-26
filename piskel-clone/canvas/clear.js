import {ctx,} from '../index'

function clearCanvas(){
    const black = '#000000'
    ctx.fillStyle = black;
    ctx.fillRect(0, 0, 512, 512);
}

export { clearCanvas }