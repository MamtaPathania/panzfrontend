import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../pages/Landing.module.css";
import img2 from '../assets/Toonflix (9).png';
import axios from "axios";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
  const [messagenumber, setMessageNumber] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [message, setMessage] = useState(false);
  const [value, setValue] = useState({ number: '' });

  const notifyError = (result) => toast.error(result);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const enteredNumber = e.target.value;
    const formattedNumber = enteredNumber.startsWith("0") ? enteredNumber : `0${enteredNumber}`;

    setValue({ ...value, [e.target.name]: formattedNumber });
  }
 
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setLanguage('ar');
      localStorage.setItem('language', 'ar');
    }
    
    const urlParams = new URLSearchParams(window.location.search)
    const extRef=urlParams.get('ext_ref');
    if (extRef) {
      localStorage.setItem('extref',extRef)
    }
    
  }, []); 

  const handleClick = (e) => {
    e.preventDefault();
    if (!value.number) {
      setMessageNumber(true);
      return;
    }
    axios.post('https://oor.toon-flix.com/api/login', { MSISDN: value.number })
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data && res.data.result === 'Login Success') {
          const username = res.data.username;
          Cookies.set('username', username); 
          setMessage(false);
          setMessageNumber(false);
          localStorage.removeItem("extref")
          navigate('/video');
        } else {
          console.log('Error:', res.data);
          notifyError(language === 'en' ? 'Login failed' : 'فشل تسجيل الدخول');
        }
      })
      .catch((err) => {
        console.log('Error:', err);
        notifyError(language === 'en' ? err.response.data.message.messageEn : err.response.data.message.messageAr);
        setMessage(true);
        setMessageNumber(false);
      });
    setValue({ number: '' });
  }

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

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
      
      <ToastContainer/>
      <div className={classes.container}>
        <div className={classes.language_buttons}>
          <button 
            type="button"
            className={`text-white lg:mt-4 mt-2 font-medium rounded-lg text-[12px] lg:text-[14px] px-10 py-4 mr-3 lg:px-10 lg:py-3 lg:mr-5 lg:mb-2  ${language === 'en' ? 'bg-blue-800' : 'bg-blue-500'} language-button`}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
          <button
            type="button"
            className={`text-white lg:mt-4 mt-2 font-medium rounded-lg lg:text-[14px] lg:px-10 lg:py-3 px-10 py-4 mr-3 lg:mr-2 lg:mb-2 ${language === 'ar' ? 'bg-blue-800' : 'bg-blue-500'} language-button`}
            onClick={() => handleLanguageChange('ar')}
          >
            AR
          </button>
        </div>
        <div className={classes.form_wrapper}>
          <img src={img2} className={classes.img_left} alt='toonflix'/>
          <div className={classes.form_wrapper_left}>
            <form className={classes.form_signup}>
              <div className="bg-gray-100 px-8 rounded-lg shadow-2xl shadow-blue-400 ">
                <div className="flex flex-col items-center">
                  {message === true ? <p className="text-red-500 lg:text-2xl text-lg lg:mb-1 font-mono">{language === 'en' ? '• Insufficient credit please top-up.' : '• الرصيد غير كافي، يرجى تعبئة الرصيد.'}</p> : null}
                  {messagenumber === true ? <p className="text-red-500 lg:text-2xl text-lg lg:mb-2 font-mono">{language === 'en' ? 'Please Enter Number' : 'الرجاء إدخال الرقم'}</p> : null}
                  <label className='lg:text-2xl text-xl lg:mt-6 mt-4 text-blue-700'>{language === 'en' ? 'Enter Number:' : 'أدخل رقم الهاتف لتسجيل الدخول'}</label>
                  <input 
                    type="text"
                    placeholder={language === 'en' ? "Enter Number" : 'أدخل رقم'}
                    name="number"
                    value={value.number}
                    onChange={handleChange}
                    className="border mt-2 border-black lg:text-xl text-2xl lg:p-2 hover:border-blue-300 lg:w-[180px] lg:h-[25px] w-[160px] h-[30px] lg:mb-8 mb-6"
                  />
                </div>
                <button 
                  className="bg-blue-600 rounded lg:w-[100px] lg:h-[40px] lg:text-xl w-[70px] h-[45px] text-2xl text-white"
                  type="button"
                  onClick={handleClick}
                >
                  {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                </button>
                <p className="lg:mt-8 lg:text-2xl mt-4 text-xl text-blue-700">{language === 'en' ? '-OR-' : '-أو-'}</p>
                <p className="lg:mt-1 lg:text-2xl mt-2 text-xl text-blue-700">{language === 'en' ? 'Do You Want TO Subscribe?' : 'للاشتراك في الخدمة اضغط على اشترك'}</p>
                <button
                  className="bg-blue-600 lg:mt-6 rounded lg:w-[100px] lg:h-[40px] lg:text-xl w-[80px] h-[45px] text-2xl text-white mb-6 mt-4"
                  onClick={() => navigate('/subscribe')}
                  type="button"
                >
                  {language === 'en' ? 'Subscriber' : 'اشترك'}
                </button>
              </div>
            </form>
            <p
              style={{ direction: "rtl" }}
              className="lg:text-2xl text-md lg:mt-8 mt-2 lg:mx-6 text-blue-600"
            >
              {language === 'en' ? 'Toonflix is ​​a distinguished service that provides many animated games for children. This service applies to Jawwal and Ooredoo users. The cost of the service is 1 shekel. Renewed daily. To cancel the subscription, send unsub oo a free message to the number 37637 for Jawwal users and to the number 7902 for Ooredoo users. The service is automatically renewed unless cancelled' : '-Toonflix خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال. تنطبق هذه الخدمة على مستخدمي جوال وأوريدو. حيث تبلغ تكلفة الخدمة 1 شيكل ش.ض. تجدد يوميا ولإلغاء الإشتراك أرسل unsub oo  برسالة مجانية إلى الرقم 37637 لمستخدمي جوال و الى الرقم 7902 لمستخدمي اوريدو. يتم تجديد الخدمة تلقائيًا ما لم يتم إلغاؤها.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "../pages/Landing.module.css";
// import img2 from '../assets/Toonflix (9).png';
// import axios from "axios";
// import Cookies from 'js-cookie';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LandingPage = () => {
//   const [messagenumber, setMessageNumber] = useState(false);
//   const [language, setLanguage] = useState('ar');
//   const [message, setMessage] = useState(false);
//   const [value, setValue] = useState({ number: '' });

//   const notifyError = (result) => toast.error(result);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedLanguage = localStorage.getItem('language');
//     if (storedLanguage) {
//       setLanguage(storedLanguage);
//     } else {
//       setLanguage('ar');
//       localStorage.setItem('language', 'ar');
//     }

//     // Extract ext_ref from URL and store it in localStorage
//     const urlParams = new URLSearchParams(window.location.search);
//     const extRef = urlParams.get('ext_ref');
//     if (extRef) {
//       localStorage.setItem('extref', extRef);
//     }
//   }, []); 

//   // Rest of your component code...
// };

