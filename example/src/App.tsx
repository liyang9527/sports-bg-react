import React from 'react'
import distantScenerImg from './images/distant-scenery.png'
import SportsBg from 'my-component'
import 'my-component/dist/index.css'


const SportsBgData1 = {
  width:390,
  height:120,
  imgWidth:100,
  duration:1,
  totalDuration:100, // 总体时长
}

const App = () => {
  return <div>
          <SportsBg
            key="a-p-distant-scenery"
            status={true}
            id="a-p-distant-scenery"
            src={distantScenerImg}
            width={SportsBgData1.width}
            height={SportsBgData1.height}
            imgWidth={SportsBgData1.imgWidth}
            duration={SportsBgData1.duration}
            totalDuration={SportsBgData1.totalDuration}
          ></SportsBg>
  </div>
}

export default App
