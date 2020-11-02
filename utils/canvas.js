export const canvas = ({params})=>{
  const {lineWidth,rate,sAngle,eAngle,color,id,x,y,r} = params;
  const ctx = wx.createCanvasContext(id);
  ctx.setLineWidth(lineWidth);
  ctx.setStrokeStyle(color);
  ctx.beginPath();
  ctx.arc(x,y,r,sAngle*Math.PI,eAngle*Math.PI,false);
  ctx.stroke();
  ctx.draw();
}