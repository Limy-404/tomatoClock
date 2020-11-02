// import {canvas} from '../../utils/canvas'
Page({
  data:{
    currentIndex:0,
    clockList:[
      {
        icon:'work',
        text:'工作'
      },
      {
        icon:'think',
        text:'思考'
      },
      {
        icon:'write',
        text:'写作'
      },
      {
        icon:'xuexi',
        text:'学习'
      },
      {
        icon:'yuedu',
        text:'阅读'
      },
      {
        icon:'yundong',
        text:'运动'
      }
    ],
    clockStart:false,
    rate:'',
    time:5,
    mTime:300000
  },
  //滑动条
  sliderChange(e){
    this.setData({
      time:e.detail.value
    })
  },
  //点击开始
  handleStart(){
    wx.navigateTo({
      url: '../clock/clock?time='+this.data.time,
    })
    // this.setData({
    //   clockStart:!this.data.clockStart,
    //   mTime:this.data.time*60*1000,
    //   timeStr:this.data.time >= 10? this.data.time+':00': '0'+this.data.time+':00'
    // });
    // this.drawBg();
    // this.drawActive()
  },
  //画图
  drawBg(){
    const lineWidth = 6/this.data.rate;
    let x = 400/this.data.rate/2;
    const y = 400/this.data.rate/2;
    const r = x - 2*lineWidth;
    const params = {
      rate:this.data.rate,
      sAngle:0,
      eAngle:2,
      color:'#000',
      id:'progess_bg',
      x,y,r,lineWidth
    }
    canvas({params:params})
    // const ctx = wx.createCanvasContext('progess_bg');
    // ctx.setLineWidth(lineWidth);
    // ctx.setStrokeStyle("#000");
    // ctx.beginPath();
    // ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,0,2*Math.PI,false);
    // ctx.stroke();
    // ctx.draw();
  },
  drawActive(){
    const lineWidth = 6/this.data.rate;
    let x = 400/this.data.rate/2;
    const y = 400/this.data.rate/2;
    const r = x - 2*lineWidth;
    const timeId = setInterval(()=>{
      let angle = 1.5+2*(this.data.time*60*1000-this.data.mTime)/(this.data.time*60*1000);
      const mTime = this.data.mTime - 50;
      this.setData({
        mTime
      })
      
      if(angle<3.5){
        if(mTime%1000 === 0){
          const timeSecond= mTime / 1000;
          const timeMin = parseInt(timeSecond / 60);
          const finalSecond = timeSecond - timeMin*60 >=10 ? timeSecond - timeMin*60: '0'+timeSecond - timeMin*60;
          const finalTime = timeMin >= 10 ? timeMin+':'+finalSecond : '0'+timeMin+':'+finalSecond;
          this.setData({
            timeStr:finalTime
          })
        }
        const params = {
          rate:this.data.rate,
          sAngle:1.5,
          eAngle:angle,
          color:'#fff',
          id:'progess_active',
          y,x,r,lineWidth
        }
        canvas({params:params})
        // const ctx = wx.createCanvasContext('progess_active');
        // ctx.setLineWidth(lineWidth);
        // ctx.setStrokeStyle("#fff");
        // ctx.beginPath();
        // ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2-2*lineWidth,1.5*Math.PI,angle*Math.PI,false);
        // ctx.stroke();
        // ctx.draw();
      }else{
        clearInterval(timeId);
        this.setData({
          timeStr:'00:00'
        })
      }
    },50)
  },
  //点击item
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    this.setData({
      currentIndex:index
    })
  },

  onLoad(){
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          rate:750/result.screenWidth
        })
      },
    })
  }
})