import {ThreeDots} from 'react-loader-spinner'

const Spinner=()=>{
    return(
        <div className='flex justify-center items-center lg:mt-6'>
<ThreeDots 
height="60" 
width="70" 
radius="9"
color="blue" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
        </div>
    )
}
export default Spinner