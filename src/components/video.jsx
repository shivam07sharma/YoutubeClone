import { useState, useEffect, useRef } from "react";
const VideoDetails=(props)=>{
   const a=useRef(null);
   const [subscribe,setsubscribe]=useState(false);
   const handleClick = () => {
        setsubscribe(!subscribe);
    if (subscribe) {
      
        a.current.style.backgroundColor = "#aaa";
        a.current.textContent = "Subscribed";
    }
    else{
        a.current.style.backgroundColor = "red";
        a.current.textContent = "Subscribe";
    }
};
    return ( <>
     <div className="w-screen h-56 my-2 p-0 md:w-2/3 md:h-auto md:my-4 ">
      <video className=" object-cover w-full h-full m-0 p-0" controls autoPlay src={props.videourl}></video>
     </div>
     <div className="w-screen px-4 font-semibold text-white text-base max-h-[76px] md:w-2/3 md:h-auto md:my-4 overflow-hidden">{props.title}</div>
     <div className="text-xs px-4 text-[#aaa] md:w-2/3 md:h-auto md:my-4 mt-1 ">{props.views} views</div>
     <div className="px-4  w-screen h-14 border-y-2  border-y-[#aaa]   flex justify-between items-center mt-4  md:w-2/3 md:h-16 md:my-4">
       <ul className="flex justify-around list-none text-[#aaa] font-light">
           <li className="w-1/5 flex justify-between mx-5"><span className="material-symbols-outlined">thumb_up</span></li>
           <li className="w-1/5 flex justify-between mx-5"><span className="material-symbols-outlined">thumb_down</span></li>
           <li className="w-1/5 flex justify-between mx-5"><span className="material-symbols-outlined">share</span></li>
           <li className="w-1/5 flex justify-between mx-5"><span className="material-symbols-outlined">bookmark</span></li>
           <li className="w-1/5 flex justify-between mx-5"><span className="material-symbols-outlined">flag</span></li>

       </ul>
     </div>
     <div className="px-4  w-screen h-14    flex justify-between items-center mb-3  md:w-2/3 md:h-16 md:my-4">
       <div className="text-white text-base font-medium flex items-center min-w-max max-w-2/4 ">{props.channel}</div><span className="text-xs flex items-center text-[#aaa] m-2  "> 1.2M</span> <><span ref={a} onClick={handleClick} className="h-7 w-[78px] grid place-content-center text-white text-sm rounded-full pt-1 bg-red-600 pb-2 mr-3" >Subscribe</span></>
     </div>
    
     </>)
}

var Getvideo = (props) => {
  
  var [res, setVdodata] = useState({});
  var [showVideo, setshowVideo] = useState(false);

  useEffect(() => {
      async function fetchData() {
         
              try {
                var url = `https://youtube-search-and-download.p.rapidapi.com/video?id=${props.ids}`;
                  var options = {
                      method: 'GET',
                      headers: {
                          'X-RapidAPI-Key': 'dee54dacf5msh86d25b8a02efa83p142929jsn5cdc83ca8500',
                          'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
                      }
                  };

                  const response = await fetch(url, options);
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const result = await response.json();
               
                  setVdodata(result);
                  setshowVideo(true);
              } catch (error) {
                  console.error('Error fetching data:', error);
              
              }
              
      }
      
      fetchData();
  }, []);

  return (
      <>
          {showVideo ?
              <VideoDetails videourl={res.streamingData.formats[0].url} title={res.videoDetails.title} views={res.videoDetails.viewCount} channel={res.videoDetails.author} /> :
              <div className='flex bg-slate-700 w-[88vw] md:w-[600px] rounded-full mt-3 mx-auto z-10 mb-3 text-white'></div>
          }
 
      </>
  );
};



  export default Getvideo;