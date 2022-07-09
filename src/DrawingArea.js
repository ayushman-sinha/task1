import { React } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { useEffect, useState, useRef } from 'react';

const DrawingArea = ({onClearLines, clearLines}) => {

    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const [color, setColor] = useState('#050c92');
    useEffect(() => {
        //loadImage();
    }, [clearLines])
    
    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y] }]);
    };
    
    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
          return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
    
        // To draw line
        let lastLine = lines[lines.length - 1];
        
        if(lastLine) {
            // add point
            lastLine.points = lastLine.points.concat([point.x, point.y]);
                
            // replace last
            lines.splice(lines.length - 1, 1, lastLine);
            setLines(lines.concat());
        }
        
    };
    
    const handleMouseUp = () => {
        isDrawing.current = false;
    };
    const eraseDrawing=(e)=>{
        setLines([]);
        onClearLines();
    }
    const checkColor=(e)=>{
        e.preventDefault();
        setColor(e.target.id);    
        console.log(e.target.id);
    }
    return (
        <div >
            <div className='choice'>
                <button onClick={(e)=>eraseDrawing(e)}>Erase</button>
                
                <div className='colorBox'>                   
                    <button className='greenColor' id="#0e4d03" onClick={(e)=>checkColor(e)}></button>
                    <button className='redColor'   id="#ff0000" onClick={(e)=>checkColor(e)}></button>
                    <button className='blueColor'  id="#050c92" onClick={(e)=>checkColor(e)}></button>
                    <button className='blackColor' id="#050c92" onClick={(e)=>checkColor(e)}></button>
                    <button className='purpleColor'id="#350450" onClick={(e)=>checkColor(e)}></button>
                    <button className='yellowColor'id="#f4e110" onClick={(e)=>checkColor(e)}></button>
                </div>
            </div>
            <Stage
                width={600}
                height={600}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                className="canvas-stage"
            >
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                        key={i}
                        points={line.points}
                        stroke={color}
                        strokeWidth={2}
                        tension={0.5}
                        lineCap="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                        />
                    ))}
                </Layer>                
            </Stage>
            
          
        </div>
    )
}

export default DrawingArea