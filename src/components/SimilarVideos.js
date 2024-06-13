import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import ReactPlayer from 'react-player';

function SimilarVideos() {
  const navigate = useNavigate()
  const [similarVideos, setSimilarVideos] = useState([]);
  console.log("similar=====",similarVideos)

  useEffect(() => {
    const fetchSimilarVideos = async () => {
      try {
        const response = await fetch('https://oor.toon-flix.com/api/videos');
        
        const data = await response.json();
        console.log(data.result)
        setSimilarVideos(data.result); 
      } catch (error) { 
        console.error('Error fetching similar videos:', error.message);
      }
    };

    fetchSimilarVideos();
  }, []);

  const handleVideoClick=(id)=>{
    localStorage.setItem("clickedvideo",id)
    navigate(`/videos/${id}`)
     
  }
 
  return (
    <div>
      <h1 className='bg-zinc-800 lg:mt-6 lg:text-2xl md:text-4xl text-3xl lg:mx-16 lg:p-3 p-4 mt-2 mx-4 rounded-lg text-white lg:h-[50px]'>
        Similar Video
      </h1>
      <div className='grid lg:grid-cols-4 rounded-lg lg:gap-10 lg:mt-10 lg:px-16 grid-cols-2 mt-4 px-4 gap-4 mb-4'>
         {similarVideos.map((video) => (
          <div key={video.id} onClick={()=>handleVideoClick(video.id)}
          className='transition ease-out-in  delay-150 hover:-translate-y-1 hover:scale-110'
          >
          <p className=''>
            {video.imgurl && <img src={video.imgurl} alt={video.name} className='rounded-t-2xl' />}
          </p>
          <p className='bg-zinc-400 rounded-b-2xl text-center lg:text-2xl md:text-4xl text-3xl truncate px-4 py-2'>{video.description}</p>
        </div>
        ))} 
      </div>
    </div>
  );
}

export default SimilarVideos;
