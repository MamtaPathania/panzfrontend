
// import React, { useState} from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "./Landing.module.css";
// import axios from 'axios'
// import {requestPin}  from "../api/api";
// import img from '../assets/img1.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Spinner from "./Spinner";



// const SubscribePage = () => {
//   const [number, setNumber] = useState("");
//   const [operator,setOperator]=useState('')
//   const [loading, setLoading] = useState(false);
//   console.log(number)
//   console.log("op===",operator)
//   const navigate = useNavigate();
//   const notifySuccess = (result) => toast.success(result);
//   const notifyerror = (result) => toast.error(result);

//   const submitHandler = async () => {
//     setLoading(true)
//     const data={
//       MSISDN:number,
//       OPERATOR:operator
//      }

//      console.log("data",data)
// try{
//   const response= await axios.post(`${requestPin}`,data)
//   console.log("=====",response)
//   if(response.status===200){
    
//     localStorage.setItem("MSISDN",number)
//     // navigate("/otp");
//     notifySuccess(response.data.result.MessageEn)
    
//     setTimeout(() => {
//       navigate("/otp");
//     }, 3000);

//   }
// }catch(err)
// {
//     console.log("error",err.response.data.message.MessageEn)
// notifyerror(err.response.data.message.MessageEn)
// }
// finally {
//   setLoading(false); // Reset loading state regardless of success or failure
// }
// };
// const setFormattedNumber = (value) => {
//   return value.startsWith("0") ? value : `0${value}`;
// };


//   return (
//     <>
//     <style>
//     {`
//           .Toastify__toast {
//             font-size: 14px;
//             color:#0C0C0D /* Adjust the font size as needed */
//           }
//         `}
//     </style>
    
//    <ToastContainer/>
//     <div className={classes.container}>
//       <div className={classes.form_wrapper}>
//       <img src={img} alt="subscribe" className={classes.img_left} />
//         <div className={classes.form_wrapper_left}>
//           <h1>Enter Your Number</h1>
//           <form className={classes.form_signup}>
//             <div className={classes.input_group}>
//               <input
//                 type="number"
//                 value={number}
//                 onChange={(e) => setNumber(e.target.value)}
//                 // onChange={(e) => setNumber(setFormattedNumber(e.target.value))}

//                 placeholder="Number"
//               />
              
//               {/* <i className="fa-solid fa-mobile" style={{fontSize:'2rem'}}></i> */}
//             </div>
//             <div className={classes.input_group}>
//             {/* <label className="flex justify-start text-blue-5 00 text-2xl">Select operator:</label>

// <select className="border border-blue-600 lg:w-[140px]">
//     <option className="lg:text-xl">
//       hjghjg
//     </option>
//     <option>hjj</option>
//   </select> */}
//   <label for="underline_select" className="sr-only border-blue-600">Underline select</label>
// <select id="underline_select" 
// value={operator}
//                 onChange={(e) => setOperator(e.target.value)}

// className="block py-2.5 px-0 w-[250px] lg:ml-[72px] text-2xl text-blue-500 bg-transparent border-0 border-b-2 border-blue-300 appearance-none dark:text-blue-300
//  dark:border-blue-300 focus:outline-none focus:ring-0 focus:border-blue-300 peer">
  
//     <option >Select Operator</option>
    
//     <option value="JW">Jawwal</option>
//     <option value="WM">Ooredoo</option>
   
// </select>
//             </div>
            
// {/*             
//             <button
//               // className={classes.form_btn}
//               className="bg-blue-600 lg:mt-8 mt-12 rounded lg:w-[100px] lg:h-[40px] w-[90px] h-[30px] text-xl text-white"

//               onClick={submitHandler}
//               type="button"
//             >
//               Submit
//             </button> */}
//             {loading ? (
//                 <div className="text-center text-white">
//                   <Spinner />
//                 </div>
//               ) : (
//                 <>
//                 <p className="mt-7 lg:text-2xl text-blue-600">
//                 -Toonflix خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال
// </p>
//                 <button
//                   className="bg-blue-600 lg:mt-8 mt-12 rounded lg:w-[100px] lg:h-[40px] w-[90px] h-[30px] text-xl text-white"
//                   onClick={submitHandler}
//                   type="button"
//                 >
//                   Submit
//                 </button>
//                 </>
//               )}
            
//           </form>
          
      
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SubscribePage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Landing.module.css";
import img from '../assets/Toonflix (9).png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";
import { requestPin } from "../api/api";

const SubscribePage = () => {
  const [number, setNumber] = useState("");
  const [operator, setOperator] = useState('JW'); 
  const [loading, setLoading] = useState(false);
  const [language,setLanguage]=useState('ar')

  const notifySuccess = (result) => toast.success(result);
  const notifyError = (result) => toast.error(result);
  const navigate = useNavigate();

  const getNumberPrefix = () => {
    return operator === 'JW' ? '05' : operator === 'WM' ? '05' : '';
  };

  useEffect(() => {
    setNumber("");
  }, [operator]);

//  const language = localStorage.getItem('language')
// console.log('jiooii',language)
useEffect(() => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}, []);
  const submitHandler = async () => {
    setLoading(true);
    const data = {
      MSISDN: number,
      OPERATOR: operator
    };

    console.log("data",data)
    try {
      const response = await axios.post(`${requestPin}`, data);
      console.log(response,"response")
      if (response.status === 200) {
        if(response?.data?.result===1){
          localStorage.setItem("MSISDN", number);
          const language = localStorage.getItem('language')
          {language==='en'? notifySuccess('You are already subscribed'):notifySuccess('أنك بالفعل مشترك')};
          setTimeout(()=>{
            navigate('/')
          },2000)
        }else{
          localStorage.setItem("MSISDN", number);
          const language = localStorage.getItem('language')

       {language==='en'? notifySuccess(response.data.result.MessageEn):notifySuccess(response.data.result.MessageAr)};
        
       setTimeout(() => {
          navigate("/otp");
        }, 3000);
      }
      }

    
    } catch (err) {
     {language==='en'? notifyError(err.response.data.message.MessageEn):notifyError(err.response.data.message.MessageAr)};
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const enteredValue = e.target.value;
    const prefix = getNumberPrefix();

    if (enteredValue.startsWith(prefix)) {
      setNumber(enteredValue);
    } else {
      setNumber(prefix + enteredValue);
    }
  };  
// const handleLanguageChange=(selectedLanguage)=>{
//   setLanguage(selectedLanguage)
// }

  return (
    <>
      <style>
        {`
          .Toastify__toast {
            font-size: 14px;
            color: #0C0C0D;
          }
        `}
      </style>
    
      <ToastContainer />
      
      <div className={classes.container}>
      {/* <div className={classes.language_buttons}>
      <button 
            type="button"
            className={`text-white lg:mt-4 mt-2 font-medium rounded-lg lg:text-[14px] text-[12px] lg:px-10 px-10 py-4 mr-3 lg:py-3 lg:mr-5 lg:mb-2  ${language === 'en' ? 'bg-blue-800' : 'bg-blue-500'} language-button`}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`text-white lg:mt-4 mt-2 font-medium rounded-lg lg:text-[14px] px-10 py-4 mr-1 lg:px-10 lg:py-3 lg:mr-2 lg:mb-2 ${language === 'ar' ? 'bg-blue-800' : 'bg-blue-500'} language-button`}
            onClick={() => handleLanguageChange('ar')}
          >
            AR
          </button>
  </div> */}
        <div className={classes.form_wrapper}>
          <img src={img} alt="subscribe" className={classes.img_left} />
          <div className={classes.form_wrapper_left}>
            <h1>{language==='en'?'Enter Your Number':'أدخل رقمك'}</h1>
            <form className={classes.form_signup}>
              <div className={classes.input_group}>
                <input
                  type="number"
                  value={number}
                  onChange={handleChange}
                  placeholder={`${getNumberPrefix()} Number`}
                />
              </div>
              <div className='gap-6'>
                <label className="text-blue-600 text-2xl lg:mr-[40px]">{language==='en'?'Select Operator:':'اختيار المشغل'}</label>
                <select className="border-2 border-blue-600 rounded-lg lg:px-8 lg:py-2 text-xl"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                >
                  <option value="JW">Jawwal</option>
                  <option value="WM">Ooredoo</option>
                </select>
              </div>
              <p style={{
            direction: "rtl"
          }}
              className="mt-7 mb-15 lg:text-2xl text-lg items-center text-blue-600 ">
                {language==='en'?'Toonflix is ​​a distinguished service that provides many animated games for children':
                    '-Toonflix خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال'} </p>
              {loading ? (
                <div className="text-center text-white">
                  <Spinner />
                </div>
              ) : (
                <>
                  <button
                    className="bg-blue-600 lg:mt-8 mt-12 rounded lg:w-[100px] lg:h-[40px] w-[90px] h-[30px] text-xl text-white"
                    onClick={submitHandler}
                    type="button"
                  >
                   {language==='en'?'Subscribe':'اشترك'}
                  </button>
                </>
              )}
            </form>
            <p  style={{
            direction: "rtl"
          }}  className="lg:text-2xl text-lg text-center font-sans text-blue-600 lg:mt-8 mt-6 lg:mx-6 ">
              {language==='en'?'Toonflix - a distinguished service that provides many animated games for children. This service applies to Jawwal and Ooredoo users. The cost of the service is 1 shekel. Renewed daily. To cancel the subscription, send unsub oo a free message to the number 37637 for Jawwal users and to the number 7902 for Ooredoo users. The service is automatically renewed unless cancelled ':'Toonflix   - خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال. تنطبق هذه الخدمة على مستخدمي جوال وأوريدو. حيث تبلغ تكلفة الخدمة 1 شيكل ش.ض. تجدد يوميا ولإلغاء الإشتراك أرسل unsub oo برسالة مجانية إلى الرقم 37637 لمستخدمي جوال و الى الرقم 7902 لمستخدمي اوريدو. يتم تجديد الخدمة تلقائيًا ما لم يتم إلغاؤها.'}
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribePage;
