/*
近景已完全兼容

剩余一个 远景过渡时间改变后 元素的过渡动画速度并没有改变的问题
*/
import * as React from 'react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
interface Type {
  id: string
  src: string // 图片url
  width: number // 容器宽度
  height: number // 容器高度
  imgWidth: number // 图片宽度
  duration: number // 过渡到容器宽度距离 需要的时长
  status: boolean // 动画是否启动
  totalDuration: number // 动画的总时长
}

interface itemType {
  src: string
  width: number
  imgShow: boolean
}

/* 一张图片的运动场景组件 */
const SportsBg = (props: Type) => {
  const { id, src, width, imgWidth, duration, height } = props
  const [list, setList] = useState<Array<itemType>>([])
  const [moveBath, setMoveBath] = useState(0) //动画批次
  const [durationState, setDurationState] = useState(duration) // 过渡时间
  const [translateXOldValue, setTranslateXOldValue] = useState(0) // 上一份过渡值
  const [translateXValue, setTranslateXValue] = useState(0) // 最新的过渡值
  const [translateXLastUpdateTime, setTranslateXLastUpdateTime] = useState(0) // 最近更新translateX 的毫秒数
  const [moveUseDuration, setMoveUseDuration] = useState(duration) // 当前动画批次使用的 过渡时间
  let time: number | NodeJS.Timeout | undefined = undefined
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
    return arr
  }

  /* moveStopEvent 动画停止事件 */
  const moveStopEvent = () => {
    // return;
    // console.log('translateX值:', translateXValue);
    const timeS = new Date().getTime() // 当前时间

    const dom: HTMLElement | null = document.querySelector(
      `#${id} .a-p-o-a-container`
    )

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

  /* moveStopEvent 动画停止事件 */
  // const moveStopEvent2 = () => {
  //   console.log("动画停止事件 222")
  //   const dom: HTMLElement | null = document.querySelector(
  //     `#${id} .a-p-o-a-container`
  //   )
  //   console.log("动画停止事件 id is ", id);
  //   if (dom && dom.style) {
  //     // dom.style.transform = `none`;
  //   }
  // }

  const moveEvent = (dura?: number) => {
    if (!props.status) {
      return
    }

    setList((arr) => {
      if (time) clearTimeout(time)
      const dom: HTMLElement | null = document.querySelector(
        `#${id} .a-p-o-a-container`
      )
      if (dom && dom.style) {
        // console.log(
        //   'moveEvent 动画属性设置 ',
        //   `getTransformValueX is`,
        //   getTransformValueX
        // )

        setTranslateXOldValue(-(imgWidth * (moveBath - 1)))
        dom.style.transform = `translateX(-${imgWidth * moveBath}px)`
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
      setList((arr) => {
        const l = [...arr]
        if (l[n - 3]) l[n - 3].imgShow = false
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

  useEffect(() => {
    setMoveBath(0)
    setDurationState(duration)
    setList(() => {
      let l = []
      l = defaultImgList()
      return l
    })
  }, [])

  useEffect(() => {
    if (!props.status) {
      if (moveBath) {
        moveStopEvent()
      }
      return
    }
    // if(initStatus) return;
    // initStatus = true;
    setMoveBath((n) => {
      return n + 1
    })
  }, [props.status])

  useEffect(() => {
    if (moveBath === 0) return
    moveEvent()
  }, [moveBath])

  useEffect(() => {
    if (moveBath === 0) return
    // console.log('111 更新 过渡值 props.duration] is ', props.duration)
    setDurationState((n) => {
      let newN = n
      if (props.duration !== durationState) {
        newN = props.duration
      }
      return newN
    })
    // console.log(
    //   '远景兼容处理 判断 props.duration > props.totalDuration',
    //   props.duration,
    //   props.totalDuration
    // )
    // 远景兼容处理
    // if(props.duration > props.totalDuration){
    //   console.log("远景兼容处理 111")
    //   setMoveBath((n)=>{
    //     return n+1;
    //   })
    // }
    // moveEvent()
  }, [props.duration])

  // useEffect(()=>{

  //   console.log('场景封装过渡时间改变 props.duration is ',props.duration)

  // },[props.duration])

  return (
    <div
      id={id}
      className="a-picture-of-a-sports-scene"
      style={{ width: width, maxWidth: width, height: height || '100%' }}
    >
      <div
        className={styles.flexLeftCenter}
        style={{
          // transition: `${props.status ? `all ${durationState}s linear` : 'none'
          //   } `
          transition: `all ${durationState}s linear`
        }}
      >
        {list.map((item, index) => {
          return (
            <div className="item" key={index} style={{ width: item.width }}>
              {item.imgShow && (
                <div>
                  <img src={item.src} style={{ width: item.width }} alt="" />
                  {/* <div className="test-dom">{index}</div> */}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SportsBg
