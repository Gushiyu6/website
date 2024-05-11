
const THICKNESS = 60;  //每个盘子高度、厚度60
const TOPWIDTH = 60;  //每个盘子宽度
const INDENT = 20;  //每增加一个盘子，他距离前一个盘子的缩进距离
const GAP = 20;  //盘子之间间隙、距离

var RATIO = 0.3;  //顶部圆形相对于圆盘宽度的比例
var N =6;  //有n个盘子
const colors = ['pink','blue','yellow','#bed722','cyan','green','black']; //每个盘子都有不一样的颜色


function layer(n, i)  //动态模块（控制每一层的盘子），n：总的层数，i：每一层的索引（从0开始）
{
    let x = i * INDENT;  //i层盘子的水平位置
    let y = (n - i - 1) * THICKNESS;  //i层盘子的垂直位置
    let width = 2 * (n - i - 1) * INDENT + TOPWIDTH;  //i层盘子的高度
    let height = THICKNESS;  //i层盘子的高度
    
    let ele = document.createElement("div");  //创一个新的模块，去设置盘子样式
    ele.className = "layer";  //设置每层盘子的外观
    ele.style.left = x + 'px';  //确定盘子的水平 左边位置
    ele.style.top = y + 'px';  //确定盘子的垂直位置
    ele.style.width = width + 'px';  
    ele.style.height = (height - GAP) + 'px';  //高度-间隙=为了让相邻两盘子之间保持一定的距离
    ele.id = "layer" + i;  //方便后面引用
    ele.innerHTML = disk(width,height, i);  //调用disk（），将这3个设置生成的html内容存储
    ele.style.backgroundColor = 'transparent';  //将背景颜色变成全透明
    document.body.appendChild(ele);  //将这个模块全部导入到<body>中
    
}

function tower(n)   //层数，最终生产一个有n层的完整的汉诺塔图像
{
    for (let i = 0; i < n; i++)  //层数从0-->n-1层
        layer(n, i);   //调用每一层盘子的div，并设置它的样式、位置、大小
    
}

function move(i, x, y)  //每层盘子的移动，i：移动层数的索引，x：移动后新的横坐标，y：移动后新的中坐标
                        //动态地移动和重新排列各层
{
    let ele = document.getElementById("layer" + i);   //获取表示第i层的div模块
    ele.style.left = x + "px";  //更改移动后新的x坐标
    ele.style.top= y + "px";  //更改移动后新的y坐标
}

function disk(w, h, i)  //制作单个盘子的三维外观，w：盘子宽厚度，h：高度，i：盘子的索引
{
    
    let h1 = w*RATIO;  //计算顶部圆形的高度
    //let color = colors[i]; 随机生成颜色
    let color = 'rgb(' + Math.floor(Math.random()*256) + ","    
                       + Math.floor(Math.random()*256) + ","    
                       + Math.floor(Math.random()*256) + ")";   
    let s ='<div style="margin-top:' + h1 + 'px;width:' + w + 'px;height:' + h + 'px;'
+'background-color:' + color + '"></div>'   //圆盘的主体部分，其高度为 h，宽度为 w，背景颜色为随机生成的RGB颜色

+'<div style="margin:-' + h1/2 + 'px 0px -'+ (h1 + h) + 'px 0px;width:' + w + 'px;height:' + h1 + 'px;'
+'background-color:' + color + ';border-radius:' + (w/2) + 'px/' + h1/2 + 'px"></div>'  //圆盘顶部圆形部分，其高度为 h1，宽度与圆盘相同，背景颜色也为随机生成的RGB颜色。该元素通过负的 margin 值来定位，使其位于圆盘主体的上方，并部分覆盖它。此外，它还设置了 border-radius 来创建圆形的外观

+'<div style="width:' + (w-2) + 'px;height:' + h1  + 'px;'
+'background-image:radial-gradient(#101010,#305020,15%,pink,' + color + ');'
+'border-radius:' + (w/2-1) + 'px/' + h1/2 + 'px;'
+'border:1px red solid;"></div>';   //添加一些额外的视觉效果的。用 radial-gradient 创建了一个径向渐变效果，从一种深色到浅绿色，再到黄色，并最终与随机颜色混合。这个 div 也设置了 border-radius 来创建圆形的外观，并添加了一个红色的边框

  return s;
}
function moveDisk(i)  //（制作整个图像的动态画面），i：移动的盘子的索引
{
    let disk = document.getElementById('layer' + i);   //获得图像中第i个盘子的HTML元素
    disk.style.animation = 'diskmove 2s 1';   //设置一个名为diskmove的CSS动画，持续时间为2s，只播放1次
    
}

tower(N);  //显示含有N层的图像
//moveDisk(2)


setTimeout('moveDisk(4)',2000);  //设置延迟执行，2000ms后执行moveDisk(4)这个函数（id=layer4）

var alldiv = document.querySelectorAll('div');  //查询所有div，并将全部都存储在alldiv中
for (let j = 0;j < alldiv.length; j++)  //遍历每一个div
    alldiv[j].classList.add('cls1');  //所有遍历到的div都会获得cls1这个类



var My = {
    println:function(x){document.writeln(x + '<br>');}, //打印字符串 x 并添加一个换行符
    $:function(x){return document.getElementById(x);}  //用于通过ID x 获取DOM元素
    
};
let instructions = [];  //存储图像移动过程中的移动指令，每个指令都是含有2个元素的数组：源头柱子、目标柱子的索引

let timerId = null; // 存储定时器句柄  
let isPaused = false; // 标记是否已暂停  
let step = 0; // 当前步骤（用于模拟逐步移动） 

function move(n,source,destin,temp)   //n：盘子数量，s：源头柱子索引，d：目标柱子索引，t：临时柱子索引
{
    if  (n===1)
        instructions.push([source,destin]);  //只有1个盘子时，将他从源头柱子移动到目标柱子，并添加到数组中
    else  //多个盘子时
    {
        move(n-1,source,temp,destin);  //n-1是最上层的盘子
        instructions.push([source,destin]);
        move(n-1,temp,destin,source);
    }
}



for (let p of instructions)  //遍历全部数组
    My.println(p[0] + '-->' + p[1]);  //指令:源柱子索引-->目标柱子索引


let stack = [];   //搞出三个柱子
stack[0] = [];for (let i = 0;i < N;i++) stack[0].push(i);
stack[1] = [];
stack[2] = [];
//move(1,2) means: disk pop from 1, read out its (x0,y0)
//read out (x1,y1) from top of pier 2
//push the disk to  the pier 2

// 模拟移动一个盘子  
function simulateMove(from, to) {  
    // 在这里添加你的模拟移动逻辑，比如更新DOM来显示移动  
    console.log(`从${from}移动到${to}`);  
    document.getElementById('output').textContent += `从${from}移动到${to}\n`;  
  
    // 假设每次移动之间有个延迟  
    if (!isPaused) {  
        step++; // 增加步骤计数器  
        setTimeout(nextMove, 1000); // 1秒后继续下一个移动（模拟）  
    }  
}  

move(N,0,1,2);  //图像移动的过程，012：三个柱子的索引


function movedisk(k) //k-th instruction，用这个函数和settiomeout做出盘子移动的画面
{
    let p = instructions[k];  //从这个数组中取出第k条指令
    let s = p[0];  //分别得到源头柱子和目标柱子的索引
    let d = p[1];
    
    //从源头柱子移除盘子
    let topid = stack[s].pop();  //从源柱子的栈中移除并返回到最顶部的盘子ID
    let disk = My.$('layer' + topid); //通过ID获取对应的圆盘DOM元素
    
    //盘子的初始位置
    let x0 = disk.style.left;
    let y0 = disk.style.top;
  
    //计算盘子的目标位置
    let x1 = ((screen .width-THICKNESS*(N+1))/2.5 * d) + 'px';
    let y1 = (N -stack[d].length) * THICKNESS + 'px';
   
    
    
    
    //从目标柱子获得栈和顶部盘子信息
    let q = stack[d]; //从stack数组中取出目标柱子d对应的栈
    if (q.length > 0)
    {
        let topid1 = q[q.length-1];
        let disk1 = My.$('layer' + topid1);
        x1 = disk1.style.left;
        
        y1 = disk1.style.top;
        y1 = (parseInt(y1.substring(0, y1.length-2)) - THICKNESS) + 'px';  //新盘子应该放置的位置
        
    }
    q.push(topid); //将取出的盘子放入目标柱子的栈中
    
    //制作CSS键帧动画
    let kftext=" @keyframes diskmoveK{0%{left:X;top:Y}\n30%{left:X;top:0px}\n70%{left:U;top:0px}\n100%{left:U;top:V}}";
    My.$('dynamic').innerHTML = kftext.replace(/K/,k).replace(/X/g,x0).replace(/Y/,y0).replace(/U/g,x1).replace(/V/,y1);
    
    //应用动画、立刻设置盘子位置
    disk.style.animation = "diskmove" + k + " 1s 1";
    disk.style.left = x1;
    disk.style.top = y1;
}

//启动移动
movedisk(0);
for (let i = 1;i < instructions.length;i++)
    setTimeout('movedisk(' + i +')',i * 1010);  //剩下的移动指令，设置延迟，
                                                //每个指令都会在前一个指令执行后的i * 1010毫秒后执行



document.addEventListener('DOMContentLoaded', function() {  
    // 获取 wrap 容器  
    var wrap = document.querySelector('.wrap');  
  
    // 创建一个函数来创建列  
    function createColumn(className, left) {  
        var column = document.createElement('div');  
        column.className = className; // 设置类名，如 col-1, col-2, col-3  
        column.style.left = left + 'px'; // 直接设置 left 样式，因为 transform 已经在 CSS 中定义  
        wrap.appendChild(column); // 将列添加到 wrap 容器中  
    }  
  
    // 调用函数来创建列  
    createColumn('col-1', 'calc(16.5% - 9px)'); // 注意：这里需要调整 left 的值以考虑 border-radius  
    createColumn('col-2', 'calc(50% - 9px)');  
    createColumn('col-3', 'calc(82.5% - 9px)');  
});


function addDiskToPeg(pegClass, diskSize) {  
    // 创建一个新的盘子元素  
    var disk = document.createElement('div');  
    disk.classList.add('disk');  
    disk.style.width = diskSize + 'px'; // 根据需要设置盘子大小  
    disk.style.height = (diskSize * 1.25) + 'px'; // 假设高度是宽度的1.25倍  
  
    // 找到对应的柱子并添加盘子  
    var peg = document.querySelector('.' + pegClass);  
    var disks = peg.querySelectorAll('.disk');  
      
    // 如果没有其他盘子，或者新盘子比现有盘子小，则放在最上面  
    if (disks.length === 0 || parseInt(disk.style.width) < parseInt(disks[disks.length - 1].style.width)) {  
        peg.appendChild(disk);  
    } else {  
        // 否则，找到第一个比新盘子大的盘子，并插入其上方  
        for (var i = 0; i < disks.length; i++) {  
            if (parseInt(disk.style.width) < parseInt(disks[i].style.width)) {  
                peg.insertBefore(disk, disks[i]);  
                break;  
            }  
        }  
    }  
  
    // （可选）添加动画效果或其他逻辑  
}  
  
// 示例：在 col-1 上添加一个盘子  
addDiskToPeg('col-1', 16);
