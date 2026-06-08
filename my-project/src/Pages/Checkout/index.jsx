import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MyContext } from '../../App';
import { FaPlus } from 'react-icons/fa6';
import Radio from '@mui/material/Radio';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VITE_API_PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_API_PAYSTACK_PUBLIC_KEY;
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Checkout = () => {
    const [userData, setUserData] = useState(null);
    const [isChecked, setIsChecked] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const context = useContext(MyContext);
    const history = useNavigate();

    const goToFailed = (reason) => {
        history("/order/failed", { state: { reason } });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setUserData(context?.userData);
        setSelectedAddress(context?.userData?.address_details[0]?._id);
    }, [context?.userData]);

    useEffect(() => {
        const newTotal = context?.cartData?.length !== 0
            ? context?.cartData
                ?.map((item) => {
                    const subTotal = Number(item?.subTotal);
                    return Number.isFinite(subTotal) ? subTotal : parseInt(item?.price) * item?.quantity;
                })
                .reduce((total, value) => total + value, 0)
            : 0;
        setTotalAmount(newTotal);
    }, [context?.cartData]);

    const loadPaystackScript = () => {
        return new Promise((resolve, reject) => {
            if (window.PaystackPop) { resolve(); return; }
            const script = document.createElement('script');
            script.src = 'https://js.paystack.co/v1/inline.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

   const checkout = async (e) => {
    e.preventDefault();

    if (!userData?.address_details?.length) {
        context?.alertBox("error", "Please add a delivery address");
        return;
    }

    if (!context?.cartData?.length) {
        context?.alertBox("error", "Your cart is empty");
        return;
    }

    try {
        await loadPaystackScript();
    } catch {
        context?.alertBox("error", "Unable to load Paystack. Please try again.");
        goToFailed("PAYSTACK_SDK_LOAD_FAILED");
        return;
    }

    setIsProcessing(true);

  const paystackCallback = (response) => {
    // Handle async logic inside a non-async wrapper
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
        'Content-Type': 'application/json',
    };

    const payload = {
        reference: response.reference,
        products: context?.cartData,
        payment_status: "completed",
        delivery_address: selectedAddress,
        totalAmt: totalAmount,
        date: new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    };

    axios.post(
        `${VITE_API_URL}/api/order/verify-paystack`,
        payload,
        { headers }
    ).then((res) => {
        if (res?.data?.success) {
            context?.alertBox("Success", res?.data?.message);
            deleteData(`/api/cart/emptyCart/${context?.userData?._id}`).then((res) => {
                if (res?.error === false) {
                    context?.getCartItems();
                    history("/order/success");
                }
            });
        } else {
            context?.alertBox("error", res?.data?.message || "Order could not be placed.");
            goToFailed("PAYSTACK_ORDER_FAILED");
        }
    }).catch((error) => {
        const message = error?.response?.data?.message || "Order verification failed.";
        context?.alertBox("error", message);
        goToFailed("PAYSTACK_CAPTURE_FAILED");
    }).finally(() => {
        setIsProcessing(false);
    });
};

    const paystackOnClose = () => {
        setIsProcessing(false);
        context?.alertBox("error", "Payment was canceled.");
        goToFailed("PAYSTACK_CANCELED");
    };

     console.log("PaystackPop available:", !!window.PaystackPop);
    console.log("Email:", context?.userData?.email);
    console.log("Amount:", Math.round(totalAmount * 100));
    console.log("Key:", VITE_API_PAYSTACK_PUBLIC_KEY);
    console.log("callback type:", typeof paystackCallback);
    console.log("onClose type:", typeof paystackOnClose);


    const handler = window.PaystackPop.setup({
        key: VITE_API_PAYSTACK_PUBLIC_KEY,
        email: context?.userData?.email,
        amount: Math.round(totalAmount * 100),
        currency: "NGN",
        ref: `order_${Date.now()}_${context?.userData?._id}`,
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: context?.userData?.name
                }
            ]
        },
        callback: paystackCallback,
        onClose: paystackOnClose
    });

    handler.openIframe();
};

    const cashOnDelivery = () => {
        if (!userData?.address_details?.length) {
            context?.alertBox("error", "Please add address");
            return;
        }

        const user = context?.userData;
        const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: "",
            payment_status: "CASH ON DELIVERY",
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }),
        };

        postData(`/api/order/create`, payLoad).then((res) => {
            if (res?.error === false) {
                context?.alertBox("Success", res?.message);
                deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
                    if (res?.error === false) context?.getCartItems();
                });
                history("/order/success");
            } else {
                context?.alertBox("error", res?.message);
                goToFailed("COD_ORDER_FAILED");
            }
        });
    };

    const editAddress = (id) => {
        context?.setAddressMode("edit");
        context?.setOpenAddressPanel(true);
        context?.setAddressId(id);
    };

    const handleChange = (e, index) => {
        if (e.target.checked) {
            setIsChecked(index);
            setSelectedAddress(e.target.value);
        }
    };

    return (
        <section className='py-3 lg:py-10 px-3'>
            <form onSubmit={checkout}>
                <div className='w-full lg:w-[70%] m-auto flex flex-col md:flex-row gap-5'>
                    <div className='leftCol w-full md:w-[60%]'>
                        <div className='card bg-white p-5 rounded-md w-full'>
                            <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.1)] pb-3 mb-5">
                                <h2>Select Delivery Address</h2>
                                <Button variant='outlined'
                                    onClick={() => {
                                        context?.setOpenAddressPanel(true);
                                        context?.setAddressMode("add");
                                    }}
                                    className='btn'
                                >
                                    <FaPlus /> ADD {context?.windowWidth < 767 ? '' : 'NEW ADDRESS'}
                                </Button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {userData?.address_details?.length !== 0
                                    ? userData?.address_details?.map((address, index) => (
                                        <label key={index} className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative cursor-pointer ${isChecked === index && "bg-[#fff2f2]"}`}>
                                            <div>
                                                <Radio size='small' onChange={(e) => handleChange(e, index)}
                                                    checked={isChecked === index}
                                                    value={address?._id}
                                                />
                                            </div>
                                            <div className='info'>
                                                <span className='inline-block text-[13px] font-medium p-1 bg-[#f1f1f1] rounded-md'>{address?.addressType}</span>
                                                <h3>{userData?.name}</h3>
                                                <p className='text-[12px] mt-0! mb-0!'>{address?.address_line1 + ", " + address?.city + ", " + address?.state + ", " + address?.pincode}</p>
                                                <p className='text-[12px] font-medium mb-0!'>+{address?.mobile}</p>
                                            </div>
                                            <Button variant='text' className='absolute! top-[15px] right-[15px] btn-sm'
                                                onClick={() => editAddress(address?._id)}
                                            >Edit</Button>
                                        </label>
                                    ))
                                    : (
                                        <div className="flex items-center justify-between mt-5 flex-col p-5">
                                            <img src="No-location.png" width={80} />
                                            <h2 className="text-center">No Address Found in your account</h2>
                                            <p className='mt-0!'>Add a delivery address.</p>
                                            <Button className='btn-org'
                                                onClick={() => {
                                                    context?.setOpenAddressPanel(true);
                                                    context?.setAddressMode("add");
                                                }}
                                            >Add Address</Button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className='rightCol w-full md:w-[40%]'>
                        <div className='card shadow-md bg-white p-5 rounded-md'>
                            <h2 className='mb-4'>Your Order</h2>

                            <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
                                <span className='text-[14px] font-[600]'>Product</span>
                                <span className='text-[14px] font-[600]'>Subtotal</span>
                            </div>

                            <div className='scroll mb-5 Reviewscroll max-h-[250px] pr-2 overflow-y-scroll overflow-x-hidden'>
                                {context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => (
                                    <div className='flex items-center justify-between py-2' key={index}>
                                        <div className='part1 flex items-center gap-3'>
                                            <div className='img w-[50px] flex items-center h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                                <img src={item?.image} className='w-full transition-all group-hover:scale-105' />
                                            </div>
                                            <div className='info'>
                                                <h4 className='text-[14px]' title={item?.productTitle}>{item?.productTitle?.length > 35 ? `${item?.productTitle.slice(0, 35)}...` : item?.productTitle}</h4>
                                                <span className='text-[14px]'>Qty : {item?.quantity}</span>
                                            </div>
                                        </div>
                                        <span className='text-[14px] font-[500]'>{(item?.quantity * item?.price)?.toLocaleString('en-US', { style: 'currency', currency: "NGN" })}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col items-center gap-3 mb-2">
                                <Button
                                    type='submit'
                                    className="btn-org btn-lg w-full flex items-center gap-3"
                                    disabled={!context?.cartData?.length || isProcessing}
                                >
                                    <BsFillBagCheckFill className='text-[20px]' />
                                    {isProcessing ? "Processing..." : "Pay with Paystack"}
                                </Button>

                                <Button type='button' className='btn-dark btn-lg w-full flex gap-2 items-center'
                                    onClick={cashOnDelivery}
                                    disabled={!context?.cartData?.length || isProcessing}
                                >
                                    <BsFillBagCheckFill className='text-[20px]' />
                                    Cash on Delivery
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default Checkout;