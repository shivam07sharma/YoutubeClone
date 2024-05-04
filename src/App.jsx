
import { useState, useEffect } from 'react'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import { Link } from 'react-router-dom'
import Sidebar from './components/sidebar'
import Getvideo from './components/video';

function App() {
  var [videoidget,setvideoid]=useState("");
  var [getsearchbar, setsearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  var [searchData, setSearchData] = useState('');
  var [getresult, setGetresult] = useState(false);
  var [Results, setResults] = useState([]);
  var [loadingBar,setLoadingBar]=useState(false);
  useEffect(()=>{
    setLoadingBar(true);
    setSearchData("trending videos in India");
    getSearchResults();
    setLoadingBar(false);
  },[])
  const Homepage=()=>{
   
    return (
      <>
      <div className='w-screen scroll overflow-x-hidden h-max flex  mt-4 flex-wrap'>
  { loadingBar && <div className="w-[13vw] h-[13vw] border-4  md:w-[5vw] md:h-[5vw] mt-[40vh] rounded-full  md:border-8 ml-[45vw]  border-slate-400 bg-[#1d1d1d] animate-spin " style={{borderTop:"8px solid #1d1d1d",}}></div>}
        { getresult &&
          <>
            {Results.map(itm => (
            
                itm.video &&
             <VideoStructure title={itm.video.title} thumbnail={itm.video.thumbnails[0].url} channelName={itm.video.channelName} viewCount={itm.video.viewCountText} videoId={itm.video.videoId} length={itm.video.lengthText} publishTime={itm.video.publishedTimeText} />
       
            ))}
          </>
        }</div>
      </>
    )
    
  }
  const VideoStructure = (props) => {
    return (
      <Link to={`/searchvideo/:${props.videoId}`}> 
      <div  onClick={()=>{setvideoid(props.videoId)}} className="w-screen md:w-96 md:rounded-3xl  h-[290px] overflow-hidden md:m-6"><img className='w-full h-[68%]' src={props.thumbnail} alt="" />

        <div className="w-full max-h-[80] font-medium text-white  text-[14px] mt-3 mx-4">{props.title}</div>
        <div className="w-4/5 text-slate-400 font-bold text-[12px] mx-4 flex flex-wrap items-center mt-1">{props.channelName} • {props.viewCount} • {props.publishTime}</div>

      </div>
      </Link>
    )
  }
  const Searchbar = () => {

    return (
      <>
        <div className='flex bg-slate-700 w-[88vw] md:w-[600px] rounded-full mt-3 mx-auto z-10 mb-3 text-white'>
          <input type="text" onChange={handlechange} className='w-[89%] focus:outline-none px-4 md:w-[500px] rounded-full bg-slate-700 h-8  ' placeholder='Search Youtube' />
          <span onClick={() => { setLoadingBar(true); setGetresult(false); getSearchResults();}} className="material-symbols-outlined text-3xl mr-4"  >search</span>
        </div>
<div className='w-screen scroll overflow-x-hidden h-max flex  flex-wrap'>
  { loadingBar && <div className="w-[13vw] h-[13vw] border-4  md:w-[5vw] md:h-[5vw] mt-[40vh] rounded-full  md:border-8 ml-[45vw]  border-slate-400 bg-[#1d1d1d] animate-spin " style={{borderTop:"8px solid #1d1d1d",}}></div>}
        { getresult &&
          <>
            {Results.map(itm => (
            
                itm.video &&
             <VideoStructure title={itm.video.title} thumbnail={itm.video.thumbnails[0].url} channelName={itm.video.channelName} viewCount={itm.video.viewCountText} videoId={itm.video.videoId} length={itm.video.lengthText} publishTime={itm.video.publishedTimeText} />
       
            ))}
          </>
        }</div>
      </>
    )
  };
  const Navbar = () => {
    return (
      <>
        <nav onClick={() => { setsearch(true) }} className='flex gap-4 w-screen h-10 text-white items-center'>

          <div className="ml-5 text-3xl mt-2 ">
            <span onClick={() => { setSidebar(!sidebar) }} className="material-symbols-outlined text-3xl ">
              menu
            </span>
          </div>
          <div className='w-screen h-10 flex justify-between items-center'>
            <div className="w-12 h-10 flex justify-center mt-2 items-center ">
              <img src="https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png"
                className='w-11 h-10  ml-12' />
              <span className='text-lg font-medium'>YouTube</span>
            </div>
            <Link to={"/search-Youtube"}>    <span className="material-symbols-outlined mt-3 text-3xl mr-4" onClick={() => { setsearch(!getsearchbar)}}>search</span>
            </Link>  </div>

        </nav>
        {sidebar && <Sidebar />}

      </>
    )
  }
  
  var getSearchResults = () => {
    const query = searchData;
    const url = `https://youtube-search-and-download.p.rapidapi.com/search?query=${query}&hl=en&gl=IN`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '10d5998aebmsh5c3e76b52432dc6p1c0238jsn73eef527d006',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
      }
    };
    (async function () {
      let response = await fetch(url, options);
      let searchResult = await response.json();
      let final= await searchResult.contents;
      setResults([...searchResult.contents]);
    setLoadingBar(false);
     setGetresult(true);
    
    
    })();
  }

  var handlechange = (e) => {
    searchData = e.target.value;
  }
  var Router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Homepage/></>
    },
    {
      path: "/search-Youtube",
      element: <Searchbar/>
    },
    {
    path:"/searchvideo/:vdo",
    element:<><Navbar/><Getvideo ids={videoidget}/></>
    }
  ]);

  return (
    <>

      <RouterProvider router={Router} />
    </>
  )
}

export default App;
