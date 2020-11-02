// pages/clock/clock.js
import {canvas} from '../../utils/canvas'
Page({
  data:{
    timeStr:'05:00',
    time:5,
    rate:'',
    mTime:300000,
    flag:true,
    timeId:null
  },
  startDraw(time){
    this.setData({
      mTime:this.data.time*60*1000,
      timeStr:this.data.time >= 10? this.data.time+':00': '0'+this.data.time+':00'
    })
    this.drawBg();
    this.drawActive();
  },
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
  },
  drawActive(){
    const lineWidth = 6/this.data.rate;
    let x = 400/this.data.rate/2;
    const y = 400/this.data.rate/2;
    const r = x - 2*lineWidth;
    this.setData({
      timeId:setInterval(()=>{
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
        }else{
          clearInterval(this.data.timeId);
          this.setData({
            timeStr:'00:00',
            flag:!this.data.flag
          })
        }
    },50)
  })
  },
  handlePause(){
    clearInterval(this.data.timeId)
    this.setData({
      flag:!this.data.flag
    });
  },
  handleContinue(){
    this.drawBg();
    this.drawActive();
    this.setData({
      flag:!this.data.flag
    })
  },
  handleCancle(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onShow(){
    const pages = getCurrentPages();
    const currentPage = pages[pages.length-1];
    const {time} = currentPage.options;
    this.setData({
      time
    })
    this.startDraw(time)
  },
  onLoad(options){
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          rate:750/result.screenWidth
        })
      },
    })
  }
})