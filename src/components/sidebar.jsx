const Button=(props)=>{
    return (
<div className="w-3/4 mx-3 my-1 h-10 flex rounded-2xl gap-5 hover:bg-slate-700 items-center transition-all">
    <span className="material-symbols-outlined w-8 h-8 mx-3 text-white grid place-content-center">{props.logo}</span> <span className="font-medium text-sm text-white">{props.title}</span>
</div>
    )
}
const Sidebar=()=>{
    
    var logos=['home','Subscriptions','Photo_Camera_Front','History','Playlist_Play','Thumb_Up','Local_Fire_Department','Music_Note','Sports_esports','News',"Shopping_bag"]
    var titles=['Home','Subscriptions',"Your Channel",'History','Your Playlists','Liked Videos',"Trending",'Music','Gaming','News',"Shopping"]
    return (
        <>
        <div className="mt-4 h-screen w-56 bg-[rgb(29, 22, 29)  flex flex-col transition-all transit">

        {logos.map((logo, index) => (
          <Button key={index} title={titles[index]} logo={logo} />
        ))}
        </div>
        </>
    )
}
export default Sidebar;