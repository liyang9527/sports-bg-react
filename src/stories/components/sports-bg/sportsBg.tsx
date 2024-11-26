/* 场景运动组件 */
import React, { useState, useEffect } from 'react';
import './sportsBg.css';
// import nearbySceneryImg from '../../assets/images/sports-bg/nearby-scenery.png'

export interface SportsBgProps {
  id: string
  src: string // 图片url 变为可选
  width: number // 容器宽度
  height: number // 容器高度
  imgWidth: number // 图片宽度
  duration: number // 过渡到容器宽度距离需要的时长
  status: boolean // 动画是否启动
  // totalDuration: number // 动画的总时长
}

interface itemType {
  src: string
  width: number
  imgShow: boolean
}

/** 场景运动组件,用于模拟运动状态中的场景移动*/
export const SportsBg: React.FC<SportsBgProps> = ({
  id,
  // src = nearbySceneryImg, // 在这里设置默认值
  src,
  width,
  height,
  imgWidth,
  duration,
  status,
}) => {

  const [stateList, setStateList] = useState<Array<itemType>>([])
  const [durationState, setDurationState] = useState(duration) // 过渡时间
  const [moveBath, setMoveBath] = useState(0) //动画批次
  const [translateXOldValue, setTranslateXOldValue] = useState(0) // 上一份过渡值
  const [translateXValue, setTranslateXValue] = useState(0) // 最新的过渡值
  const [translateXLastUpdateTime, setTranslateXLastUpdateTime] = useState(0) // 最近更新translateX 的毫秒数
  const [moveUseDuration, setMoveUseDuration] = useState(duration) // 当前动画批次使用的
  let time: number | NodeJS.Timeout | undefined = undefined
  // src = src ? src : nearbySceneryImg

  /* 初始化 */
  const init = () => {
    setMoveBath(0)
    domLeftInit();
    setDurationState(duration)
    setStateList(() => {
      let l = []
      l = defaultImgList()
      return l
    })

  }

  /* 初始化元素 left */
  const domLeftInit = () => {
    const dom: HTMLElement | null = document.querySelector(`#${id} .sports-bg-list-content`)
    if (dom && dom.style) {
      dom.style.transform = `translateX(${0}px)`
      setTranslateXValue(-(0))
      setTranslateXLastUpdateTime(0)
      setMoveUseDuration(duration)
    }
  }


  /* 获取默认的图片列表 */
  const defaultImgList = (): Array<itemType> => {
    const ratio = Math.ceil(width / imgWidth) * 2
    const arr = []
    for (let i = 0; i < ratio; i++) {
      arr.push({
        src,
        width: imgWidth,
        imgShow: true
      })
    }
    // console.log("默认的图片列表 arr is ", arr);
    return arr
  }

  /* 动画开始 */
  const moveEvent = (dura?: number) => {
    if (!status) {
      return
    }

    // console.log("动画开始 1")
    setStateList((arr) => {
      if (time) clearTimeout(time)
      const dom: HTMLElement | null = document.querySelector(`#${id} .sports-bg-list-content`)
      if (dom && dom.style) {
        let translateXValue = -(imgWidth * moveBath)
        setTranslateXOldValue(-(imgWidth * (moveBath - 1)))
        dom.style.transform = `translateX(${translateXValue}px)`
        setTranslateXValue(-(imgWidth * moveBath))
        setTranslateXLastUpdateTime(new Date().getTime())
        setMoveUseDuration(durationState)
      } 
      time = setTimeout(
        () => {
          insertEvent()
          clearTimeout(time)
        },
        (dura || durationState) * 1000 - 100
      )
      return arr
    })
  }

  /* 图片插入填补事件 */
  const insertEvent = () => {
    setMoveBath((n) => {
      setStateList((arr) => {
        const l = [...arr]

        // 隐藏开头的一些图片 优化性能
        if (1) {
          if (l[n - 3]) l[n - 3].imgShow = false
        }

        l.push({
          src,
          width: imgWidth,
          imgShow: true
        })
        return l
      })
      return n + 1
    })
  }

  /* moveStopEvent 动画停止事件 */
  const moveStopEvent = () => {

    const timeS = new Date().getTime() // 当前时间

    const dom: HTMLElement | null = document.querySelector(`#${id} .sports-bg-list-content`)

    if (dom && dom.style) {
      /*
        计算方案2 ： 
        (当前时间 - 最近更新时间) / 存储过渡时间 * (存储新值 - 存储旧值) + 存储旧值   // (在过渡时间改变时会有误差，需要增加应对处理)
      */
      // console.log("动画停止事件 222 最新的过渡值",translateXValue)
      const newX =
        ((timeS - translateXLastUpdateTime) / 1000 / moveUseDuration) *
        (translateXValue - translateXOldValue) +
        translateXOldValue
      // console.log(
      //   '动画停止事件 newX is ',
      //   newX,
      //   'durationState is ',
      //   durationState
      // )
      dom.style.transform = `translateX(${newX}px)`
      setDurationState(0)
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!status) {
      if (moveBath) {
        moveStopEvent()
      }
      return
    }

    setMoveBath((n) => {
      return n + 1
    })
  }, [status])

  useEffect(() => {
    if (moveBath === 0) return
    let time = setTimeout(()=>{
      clearTimeout(time);
      moveEvent()
    })
    
  }, [moveBath])

  return (
    <div id={id} className='sports-bg'
      style={{
        width,
        height,
        left: 0,
        // border: '1px solid #000'
      }}
    >
      <div className='sports-bg-list-content'
        style={{
          transition: `all ${durationState}s linear`
        }}>
        {stateList.map((item, index) => {
          return (
            <div className="item" key={index} style={{
              width: item.width,
              minWidth: item.width
            }}>
              {item.imgShow && (
                <div>
                  <img src={item.src} alt="" style={{
                    width: imgWidth,
                    height: 'auto',
                  }} />
                </div>
              )}
            </div>
          )
        })}
      </div>


    </div>
  );
};
