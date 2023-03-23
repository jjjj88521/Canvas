// 紀錄是否正在畫畫
let painting = false;
// 設置初始位置
let startPoint = {
  x: undefined,
  y: undefined,
};

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// 滑鼠點著，開始畫畫
canvas.addEventListener("mousedown", (e) => {
  let x = e.offsetX;
  let y = e.offsetY;
  console.log(`${x} ${y}`);

  startPoint = {
    x: x,
    y: y,
  };
  painting = true;
});
// 滑鼠移動，新點連舊點形成線條
canvas.addEventListener("mousemove", (e) => {
  let x = e.offsetX;
  let y = e.offsetY;
  //   console.log(`${x} ${y}`);
  let newPoint = {
    x: x,
    y: y,
  };
  if (painting) {
    drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y);
    startPoint = newPoint;
  }
});
// 滑鼠移開，就不再畫畫
canvas.addEventListener("mouseup", () => {
  painting = false;
});
// 把點連在一起
function drawLine(xStart, yStart, xEnd, yEnd) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
  ctx.closePath();
}

// 按下重置，清除畫布
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  // 畫布全部設成白色
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// 按下儲存，儲存畫下的內容
const save = document.querySelector(".save");
save.addEventListener("click", () => {
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const compositeOperation = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const url = canvas.toDataURL("image/jpg");
  const link = document.createElement("a");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(data, 0, 0);
  ctx.globalCompositeOperation = compositeOperation;
  link.href = url;
  link.download = "畫布";
  link.target = "_blank";
  link.click();
});
