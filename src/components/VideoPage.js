import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideosId } from './store/Slice';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Header from './Header';
import SimilarVideos from './SimilarVideos';
import Footer from './Footer';
import Spinner from './Spinner';

function VideoPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.video);
  console.log("VIDEO STATE",state)
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    // Dispatch the fetchVideos action to load video details based on the id
    dispatch(fetchVideosId(id))
      .then(() => setLoading(false)) // Set loading to false once data is fetched
      .catch(() => setLoading(false)); // Handle any errors
  }, [dispatch,id]);

  const selectedVideo = state.data.result?.find((video) => video.id === parseInt(id));
  console.log('Rendering VideoPage:', selectedVideo);

  // if (loading) {
  //   return <p>Loading...</p>;
  // } 

  if (!selectedVideo) {
    return <Spinner/>
  }
   

  return (
    <div>
        <div>
            <Header/>
            <h1 className='bg-zinc-800 lg:mt-6 lg:text-2xl md:text-4xl text-3xl lg:mx-16 lg:p-3 p-4 mt-2 mx-4 rounded-lg text-white lg:h-[50px]'>
            {selectedVideo.name}</h1>
        </div>
      <div className='mt-4 flex justify-center items-center lg:px-16 px-6'>
        <ReactPlayer
          width="100%" 
          
          playsinline={true}
          url={selectedVideo.vurl}
          controls
          className="bg-black"
                  />
  
</div>
<SimilarVideos/>
      <Footer/>

      </div>
  );
}

export default VideoPage;
