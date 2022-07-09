import {useState} from 'react'
import DrawingArea from './DrawingArea';
import './css/style.css'
const App = () => {
  const [linkInput,setLinkInput] = useState('');
  const [search,setSearch]=useState();
  const handleChange=(e)=>{
    setLinkInput(e.target.value);    
  }
  const handleSearch=(e)=>{
    e.preventDefault();
   
    let tmp=linkInput.replace('youtu.be','www.youtube.com/embed');
    console.log(tmp);
    tmp+='?autoplay=1';
    let pattern=/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;//Validating the youtube link
    let match=tmp.match(pattern);
    if(match)
      setSearch( <><iframe title="video" className='videoPlay' width="640" height="360" src={tmp} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div className='drawingContainer'>
          <DrawingArea/>
        </div></>);
    else
      setSearch(<div className='invalidLink'>Invalid Link</div>);
   
  }
  return (
    <div className='container'>
      <h2>Enter youtube video url : </h2>
      <input type="text" placeholder='Enter url' onChange={(e)=>handleChange(e)}/>
      <button className='' onClick={(e)=>handleSearch(e)}>Submit</button>
      <div className='videoContainer'>
        {search}
        
      </div>
     
    </div>
  )
}

export default App
//