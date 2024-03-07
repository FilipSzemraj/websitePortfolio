import React, {useState, useRef, useEffect, useCallback, useLayoutEffect} from 'react';
import { styles } from './styles/style';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export const Path = ({}) => {
    const [clicked, setClicked] = useState(false);
    const containersRef = useRef([]);
    const [position, setPosition] = useState({x1:0, y1:0, x2:0, y2:0, x3:0, y3:0, x4:0, y4:0})
    const { contextSafe } = useGSAP();


    function handleOnClick(id){
        console.log("klikniety");
        //setClicked(!clicked);
        handleOnClickAnimation(id);
    };


    useLayoutEffect(() => {
        function handleResize(){
            const rect1 = containersRef.current[0].getBoundingClientRect();
            const x1 = rect1.left+rect1.width/2;
            const y1 = rect1.top+rect1.height/2;

            const rect2 = containersRef.current[1].getBoundingClientRect();
            const x2 = rect2.left+rect2.width/2;
            const y2 = rect2.top+rect2.height/2;

            const rect3 = containersRef.current[2].getBoundingClientRect();
            const x4 = rect3.left+rect3.width/2;
            const y4 = rect3.top+rect3.height/2;

            const rect4 = containersRef.current[3].getBoundingClientRect();
            const x3 = rect4.left+rect4.width/2;
            const y3 = rect4.top+rect4.height/2;

            if (rect1 && rect2 && rect3 && rect4) {
                setPosition({ x1, y1, x2, y2, x3, y3, x4, y4 });
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [containersRef]);


    const createPath = () => {
        const { x1, y1, x2, y2, x3, y3, x4, y4 } = position;

        // Center of the rhombus
        const cx = (x2 + x4) / 2;
        const cy = (y1 + y3) / 2;

        // Half lengths of the diagonals
        const rx = Math.sqrt((x2 - x4) ** 2 + (y2 - y4) ** 2) / 2; // Major axis radius
        const ry = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2) / 2; // Minor axis radius

        // SVG Path for an ellipse: M cx-rx cy a rx,ry 0 1,0 (rx*2),0 a rx,ry 0 1,0 -(rx*2),0
        const r = `M ${cx - rx} ${cy} a ${rx},${ry} 0 1,0 ${rx * 2},0 a ${rx},${ry} 0 1,0 ${-rx * 2},0`;


        return r;
    };


    const handleOnClickAnimation = contextSafe((projectId) => {
        gsap.to(containersRef.current[projectId-1], {
            duration: 2,
            ease: "power1.inOut",
            motionPath: {
                path: "#bezierPath",
                autoRotate: true
            },
        });
    });

    const setRef = useCallback((el, index) => {
        if (el) {
            containersRef.current[index] = el;
        }
    }, []);

    return(

      <div style={{
          width:'50%',
          height:'50%',
          display:'flex',
          flexDirection:'row',
          flexWrap:"wrap",
      }}>
          <svg width="100%" height="100%" style={{ position: 'absolute', left: 0, top: 0, zIndex: 10 }}>
              <path id="bezierPath" d={createPath()} fill="none" stroke="blue" strokeWidth="2" />
          </svg>
          <div style={{ flex:'1 1 33%', position:"relative"}}>

          </div>
          <div style={{ flex:'1 1 33%', position:"relative"}}>
              <div ref={el => setRef(el, 0)} style={{
                  backgroundColor:'white',
                  height:'50%',
                  width:'50%',
                  position:'absolute',
                  top:'-25%',
                  left:'25%',
                  display:'flex',
                  zIndex:'11',
              }}>
                  { clicked ? (
                      <div style={{
                      position:"absolute",
                      width:'300%',
                      height:'300%',
                      left:'-100%',
                      top:'-220%',
                      backgroundColor:'purple'
                      }}>esa</div>
                  ) : null}
                  <span onClick={() => handleOnClick(1)} style={{width:'100%', height:'100%', backgroundColor:'red'}}>
                      <p>x{position.x1}<br/>y{position.y1}</p>
                  </span>
              </div>
          </div>
          <div style={{ flex:'1 1 33%', position:"relative"}}>

          </div>
          <div  style={{flex:'1 1 33%', position:"relative"}}>
              <div ref={el => setRef(el, 1)} style={{
                  backgroundColor:'white',
                  height:'50%',
                  width:'50%',
                  position:'absolute',
                  top:'25%',
                  left:'-25%',
                  display:'flex',
                  zIndex:'11',
              }}>
                  { clicked ? (
                      <div style={{
                          position:"absolute",
                          width:'300%',
                          height:'300%',
                          left:'-100%',
                          top:'-220%',
                          backgroundColor:'purple'
                      }}></div>
                  ) : null}
                  <span onClick={() => handleOnClick(2)} style={{width:'100%', height:'100%', backgroundColor:'red'}}>
                      <p>x{position.x2}<br/>y{position.y2}</p>
                  </span>

              </div>
          </div>
          <div style={{backgroundColor:"green", flex:'1 1 33%', position:"relative", borderRadius:'25px'}}>
esa
          </div>
          <div  style={{ flex:'1 1 33%', position:"relative"}}>
              <div ref={el => setRef(el, 2)} style={{
                  backgroundColor:'white',
                  height:'50%',
                  width:'50%',
                  position:'absolute',
                  top:'25%',
                  left:'75%',
                  display:'flex',
                  zIndex:'11',
              }}>
                  { clicked ? (
                      <div style={{
                          position:"absolute",
                          width:'300%',
                          height:'300%',
                          left:'-100%',
                          top:'-220%',
                          backgroundColor:'purple',

                      }}>esa</div>
                  ) : null}
                  <span onClick={() => handleOnClick(3)} style={{width:'100%', height:'100%', backgroundColor:'red'}}>
                      <p>x{position.x3}<br/>y{position.y3}</p>
                  </span>

              </div>
          </div>
          <div style={{ flex:'1 1 33%', position:"relative"}}>

          </div>
          <div style={{ flex:'1 1 33%', position:"relative"}}>
              <div ref={el => setRef(el, 3)} style={{
                  backgroundColor:'white',
                  height:'50%',
                  width:'50%',
                  position:'absolute',
                  top:'75%',
                  left:'25%',
                  display:'flex',
                  zIndex:'11',
              }}>
                  { clicked ? (
                      <div style={{
                          position:"absolute",
                          width:'300%',
                          height:'300%',
                          left:'-100%',
                          top:'-220%',
                          backgroundColor:'purple'
                      }}>esa</div>
                  ) : null}
                  <span onClick={() => handleOnClick(4)} style={{width:'100%', height:'100%', backgroundColor:'red'}}>
                      <p>x4x{position.x4}<br/>y{position.y4}</p>
                  </span>

              </div>
          </div>
          <div style={{ flex:'1 1 33%', position:"relative"}}>

          </div>
      </div>
    )
};