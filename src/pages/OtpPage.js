import React, { useState } from "react";
import classes from "./Otp.module.css";
import OtpInput from "react-otp-input";
import { validatePin } from "../api/api";
import { v4 as uuidv4 } from 'uuid';


import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner";
import img from '../assets/Toonflix (9).png'; // Import the image

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false); // State for error message

  const navigate = useNavigate();
  const notifySuccess = (result) => toast.success(result);
  const notifyError = (result) => toast.error(result);
  const language = localStorage.getItem('language');
      // const extref = localStorage.getItem("extref");


  const loginApiCall = async (number) => {
    const loginData = {
      MSISDN: number,
    };

    try {
      const loginResponse = await axios.post('https://oor.toon-flix.com/api/login', loginData);
      console.log(loginResponse);

      if (loginResponse.status === 200) {
        localStorage.setItem("MSISDN", number);
        setTimeout(() => {
          localStorage.removeItem("extref")

          navigate("/video");

        }, 2000);
      } else {
        console.log('Login error:', loginResponse.data);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (loginError) {
      console.log('Login Error:', loginError);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const submitHandler = async () => {
    if (!otp) {
      setShowOtpErrorMessage(true); // Show error message if OTP is not entered
      return; // Prevent further execution if OTP is not entered
    }
    setLoading(true);
    const number = localStorage.getItem("MSISDN");
    const extref = localStorage.getItem("extref");
 
    let extRefValue=extref==undefined || extref==null || extref==''?uuidv4():extref;

    const data = {
      MSISDN: number,
      PIN: otp,
      extref: extRefValue,
    };

    console.log(data,"data")
    try {
      const response = await axios.post(`${validatePin}`, data);
      console.log(response);

      if (response.status === 200) {
        {language==='en'?notifySuccess(response.data.result.MessageEn):notifySuccess(response.data.result.MessageAr);}
         loginApiCall(number); // Invoke login API call

      }
    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
      {language==='en'?notifyError(err.response.data.message.MessageEn):notifyError(err.response.data.message.MessageAr)};
      setTimeout(() => {
        localStorage.removeItem("extref")

        navigate("/");

      }, 2000);
    }
  };

  return (
    <>
      <style>
        {`
          .Toastify__toast {
            font-size: 14px;
            color:#0C0C0D;
          }
        `}
      </style>
     
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.sub_container}>
          <div className={classes.image_wrapper}>
            <img src={img} alt="Toonflix" className={classes.img} />
          </div>
          <div className={classes.form_wrapper}>
            <div className={classes.heading}>
              <h4>{language==='en'?'Enter the OTP':'أدخل كلمة المرور لمرة واحدة'}</h4>
            </div>
            {showOtpErrorMessage && (
              <p className="text-red-500 text-2xl">Please enter the OTP</p>
            )}
            <div className={classes.input_container}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span style={{ color: "black", padding: "0 0.5rem 0 0.5rem" }}></span>}
                inputStyle={{
                  width: "6rem",
                  height: "5rem",
                  fontSize: "2rem",
                }}
                renderInput={(props) => (
                  <input
                    {...props}
                    type="number"
                  />
                )}
              />
            </div>
           
            {loading ? (
              <div className="text-center text-white">
                <Spinner />
              </div>
            ) : (
              
              <button
                className={classes.btn}
                onClick={submitHandler}
                type="submit"
              >
                {language==='en'?'Validate':'تأكيد'}
              </button>
            )}
             <p  style={{
            direction: "rtl"
          }}  className="lg:text-2xl text-lg lg:p-1 p-4 font-sans text-center text-blue-600 lg:mt-8 mt-6 lg:mx-6 ">
              {language==='en'?'Toonflix - a distinguished service that provides many animated games for children. This service applies to Jawwal and Ooredoo users. The cost of the service is 1 shekel. Renewed daily. To cancel the subscription, send unsub oo a free message to the number 37637 for Jawwal users and to the number 7902 for Ooredoo users. The service is automatically renewed unless cancelled ':'Toonflix   - خدمة متميزة توفر العديد من العاب الرسوم المتحركة للأطفال. تنطبق هذه الخدمة على مستخدمي جوال وأوريدو. حيث تبلغ تكلفة الخدمة 1 شيكل ش.ض. تجدد يوميا ولإلغاء الإشتراك أرسل unsub oo برسالة مجانية إلى الرقم 37637 لمستخدمي جوال و الى الرقم 7902 لمستخدمي اوريدو. يتم تجديد الخدمة تلقائيًا ما لم يتم إلغاؤها.'}
              </p>
          </div>
         
        </div>
        
      </div>
    </>
  );
};

export default OtpPage;


