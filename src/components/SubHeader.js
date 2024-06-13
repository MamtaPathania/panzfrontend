
// import React from 'react';

// function SubHeader({ names, onClick }) {
//   return (
//     <div className='bg-zinc-800 lg:mt-8 lg:mx-16 lg:p-5 rounded-lg text-white flex justify-center items-center gap-16 lg:h-[60px]'>
//       {names && names.length > 0 ? (
//         names.map((e) => (
//           <p 
//             key={e.id}
//             className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center'
//             onClick={() => {
//               // console.log(`Clicked on ${e.name} with ID ${e.sub_category_id}`)

//               onClick(e.sub_category_id)}}
//           >
//             {e.name}
//           </p>
//         ))
//       ) : (
//         <div className='gap-16 flex justify-center items-center  lg:mx-16 lg:p-5 '>
//           <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center'onClick={() => onClick(172)}>
//             T & T-Little Cooks
//           </p>
//           <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(173)}>
//             Kikool
//           </p>
//           <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(174)}>
//             Boom & Reds
//           </p>
//           <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(175)}>
//             Alex & The Sea
//           </p>
//           <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(176)}>
//             Alex & Jungle
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SubHeader;



import React, { useEffect, useState } from 'react';

function SubHeader({ names, onClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const [searchInput, setSearchInput] = useState('');
  // const [filteredNames, setFilteredNames] = useState(names);

// console.log("search",searchInput)
// console.log("filter",filteredNames)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   // Update filteredNames when names change
  //   setFilteredNames(names);
  // }, [names]);

  // const handleSearchInputChange = (e) => {
  //   const searchTerm = e.target.value.toLowerCase();
  //   setSearchInput(searchTerm);

    // Filter names based on the search input
  //   const filtered = names && names.length > 0 ? names.filter((e) =>
  //     e.name.toLowerCase().includes(searchTerm)
  //   ):[];
  //   console.log("Filtered Names:", filtered);

  //   setFilteredNames(filtered);
  // };

  const renderDesktopView = () => {
    return (
      <div className='bg-zinc-800 lg:mt-8 lg:mx-16 lg:p-5 rounded-lg text-white flex justify-center items-center gap-16 lg:h-[60px]'>
       {/* {filteredNames && filteredNames.length > 0 ? (
          filteredNames.map((e) => (  */}
        {names && names.length > 0 ? (
          names.map((e) => (
            <p
              key={e.id}
              className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center'
              onClick={() => onClick(e.sub_category_id)}
            >
              {e.name}
            </p>
          ))
        ) : (
          <div className='gap-16 flex justify-center items-center lg:text-2xl lg:mx-16 lg:p-5 '>
            
         <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(172)}>
           T & T-Little Cooks
          </p>
          <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(173)}>
            Kikool
          </p>
          <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(174)}>
           Boom & Reds
          </p>
            <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(175)}>
            Alex & The Sea
          </p>
           <p className='hover:bg-black hover:rounded-lg w-[170px] h-[40px] flex justify-center items-center' onClick={() => onClick(176)}>
             Alex & Jungle
          </p>
        </div>
        )}
      </div>
    );
  };

  const renderMobileView = () => {
    return (
      <div className='bg-zinc-800 lg:mt-8 lg:mx-16 lg:p-5 mx-4 p-3 mt-4 rounded-lg text-white flex justify-center items-center gap-2 lg:h-[60px]'>
        <h1 className='lg:text-2xl md:text-4xl text-3xl'>Categories</h1>
        {/* <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search..."
          className='mr-2 px-2 py-1 rounded-md border text-black border-white'
        /> */}

        <select
          onChange={(e) => onClick(parseInt(e.target.value))}
          className='hover:bg-black hover:rounded-lg  w-[120px] h-[40px] lg:text-2xl md:text-4xl text-2xl text-white bg-zinc-800 border border-white  hover:border-amber-600'
        >
         
            {/* {filteredNames && filteredNames.length > 0 ? (
            filteredNames.map((e) => ( */}
             {names && names.length > 0 ? (
            names.map((e) => (
              <option key={e.id} value={e.sub_category_id}>
                {e.name}
              </option>
            ))
          ) : (
            <>
              <option value={172}>T & T-Little Cooks</option>
              <option value={173}>Kikool</option>
              <option value={174}>Boom & Reds</option>
              <option value={175}>Alex & The Sea</option>
              <option value={176}>Alex & Jungle</option>
            </>
            
          )}
        </select>
      </div>
    );
  };

  return isMobile ? renderMobileView() : renderDesktopView();
}

export default SubHeader;
