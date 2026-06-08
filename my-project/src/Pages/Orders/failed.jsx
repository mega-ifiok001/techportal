import Button from '@mui/material/Button';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const OrderFailed = () => {
  const location = useLocation();
  const reason = location?.state?.reason;

  const reasonMessage = (() => {
    switch (reason) {
case "PAYSTACK_CANCELED":
    return "Payment was canceled. Please try again.";
case "PAYSTACK_CAPTURE_FAILED":
    return "Payment verification failed. Please contact support if you were charged.";
case "PAYSTACK_SDK_LOAD_FAILED":
    return "Unable to load Paystack checkout. Please try again.";
case "PAYSTACK_ORDER_FAILED":
    return "Payment was received but order could not be placed. Please contact support.";
default:
    return "Your order could not be completed. Please try again.";
    }
  })();

  return (
    <section className='w-full p-10 py-8 lg:py-20 flex items-center justify-center flex-col gap-2'>
        <img src="/failed.png" className='w-[70px] sm:w-[120px]'/>
        <h3 className='mb-0 text-[20px] sm:text-[25px]'>Your order is failed</h3>
        <p className='mt-0 text-center'>{reasonMessage}</p>
        <Link to="/">
            <Button className='btn-org btn-border'>Back to home</Button>
        </Link>
    </section>
  )
}

export default OrderFailed;