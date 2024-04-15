const THICKNESS = 60;
const TOPWIDTH = 100;
const INDENT = 20;
const GAP = 20;
var RATIO = 0.1;
const colors = ['pink','blue','yellow','#bed722','cyan','green','black'];
function layer(n, i)
{
    let x = i * INDENT;
    let y = (n - i - 1) * THICKNESS;
    let width = 2 * (n - i - 1) * INDENT + TOPWIDTH;
    let height = THICKNESS;
    let ele = document.createElement("div");
    ele.className = "layer";
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
    ele.style.width = width + 'px';
    ele.style.height = (height - GAP) + 'px';
    ele.id = "layer" + i;
    ele.innerHTML = disk(width,height,   i);
    ele.style.backgroundColor = 'transparent';
    document.body.appendChild(ele);
}

function tower(n)
{
    for (let i = 0; i < n; i++)
        layer(n, i);
}

function move(i, x, y)
{
    let ele = document.getElementById("layer" + i);
    ele.style.left = x + "px";
    ele.style.top= y + "px";
}

function disk(w,h,i)
{
    let h1 = w*RATIO;
    
   // let color=colors[i];
    let color = 'rgb('+ Math.floor(Math.random()*256) + ","
                             + Math.floor(Math.random()*256) + ","
                             + Math.floor(Math.random()*256) + ")";
    let s = '<div style="margin-top:' + h1 + 'px;width:' + w + 'px;height:' + h + 'px;background-color:'+color+'"></div>'
            +'<div style="margin:-' + (h/2) + 'px 0px -' + (h * 2) + 'px 0px;width:' + w + 'px;height:' + h + 'px;background-color:'+color+';border-radius:' + (w/2) + 'px/' + h1 + 'px"></div>'
            +'<div style="width:' + (w - 2) + 'px;height:' + h + 'px;background-image:radial-gradient(#101010,#305020,15%,yellow,'+color+');border-radius:' + (w/2 - 1) + 'px/' + h1 + 'px;border:1px red solid"></div>';
    return s;
}
function moveDisk(i)
{
    let disk = document.getElementById('layer' + i);
    disk.style.animation = 'diskmove 2s 1';
}

tower(7);
//move(3,500,400)