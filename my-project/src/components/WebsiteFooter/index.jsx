import React, { useContext } from 'react'
import{ LiaShippingFastSolid } from 'react-icons/lia'
import { PiKeyReturnLight } from 'react-icons/pi'
import { BsWallet2 } from 'react-icons/bs'
import { LiaGiftSolid } from 'react-icons/lia'
import { BiSupport } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { IoChatboxOutline } from 'react-icons/io5'
import Button from '@mui/material/Button'
import { FaFacebook } from 'react-icons/fa'
import { AiOutlineYoutube } from 'react-icons/ai'
import { FaPinterest } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';    

import Drawer from '@mui/material/Drawer'
import CartPanel from '../CartPanel'
import { MyContext } from '../../App'

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ProductZoom } from '../ProductZoom'
import { ProductDetailsComponent } from '../ProductDetails'
import AddAddress from '../../Pages/MyAccount/addAddress'


const Footer = () => {


    const context = useContext(MyContext);
  return (
    <>
    <footer className='py-6 bg-[#01065d] text[#fff]'>
        <div className='container'>
            <div className='flex items-center justify-center gap-2 py-3 lg:py-8 pb-0 lg:pb-8 px-2! lg:px-5 scrollableBox footerBoxWrap'>
                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <LiaShippingFastSolid
                    className='text-[40px] text-[#fff] transition-all duration-300 group-hover:text-[#fff] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] text-[#fff]   font-[600] mt-3'>Free Shipping</h3>
                    <p className='text-[12px] text-[#fff]  font-[500]'>For all Orders Over  ₦500,000</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <PiKeyReturnLight
                    className='text-[40px] text-[#fff]  transition-all duration-300 group-hover:text-[#fff] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] text-[#fff]  font-[600] mt-3'>30 Days Return</h3>
                    <p className='text-[12px] text-[#fff]  font-[500]'>For an Exchange Product</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <BsWallet2
                    className='text-[35px] text-[#fff]  transition-all duration-300 group-hover:text-[#fff] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] text-[#fff]  font-[600] mt-3'>Secured Payment</h3>
                    <p className='text-[12px] text-[#fff]  font-[500]'>Payment Cards Accepted</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <LiaGiftSolid
                    className='text-[40px] text-[#fff]  transition-all duration-300 group-hover:text-[#fff] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] text-[#fff]  font-[600] mt-3'>Special Gifts</h3>
                    <p className='text-[12px] text-[#fff]  font-[500]'>Our First Product Order</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <BiSupport
                    className='text-[35px] text-[#fff]  transition-all duration-300 group-hover:text-[#fff] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] text-[#fff]  font-[600] mt-3'>Support 24/7</h3>
                    <p className='text-[12px] text-[#fff]  font-[500]'>Contact us Anytime</p>
                </div>

            </div>
            <br />

        <hr  className="bg-[#fff] text-[#fff]"/>

        <div className='footer flex px-3 lg:px-0 flex-col lg:flex-row py-8'>
            <div className='part1 w-full lg:w-[25%] border-r border-[#fff]'>
                <h2 className='text-[18px] text-[#fff]  font-[600] mb-4'>Contact us</h2>
                <p className='text-[13px] text-[#fff]  font-[400] pb-4'>Tech Portal Solutions Gadget Store</p>
                <Link to="mailto:info@techportalsolutions.com" className='link text-[13px] text-[#fff] hover:text-[#fff] '>info@techportalsolutions.com</Link> <br />
                        <div className='text-[10px] font-[600] text-[#fff] '>59 Ikot Ekpene Rd., Uyo.</div>


                <span className='text-[13px] font-[600] block w-full mt-3  mb-5 text-[#fff]'>
                    <a href="tel:07066965486">(+234) 706 696 5486</a>, <a href="tel:09159685595">(+234) 915 968 5595</a>
                </span>

                    <div className='flex items-center gap-2'>
                        <IoChatboxOutline className="text-[40px] text-[#fff]"/>
                        <span className='text-[16px] font-[600] text-[#fff] '>Online Chat<br/> Get Expert Help</span>
                    </div>
            </div>

            <div className='part2 w-full lg:w-[40%] flex pl-0 lg:pl-5 mt-5 lg:mt-0'>
                <div className='part2_col1 w-[50%]'>
                    <h2 className='text-[18px] font-[600] mb-4 text-[#fff] '>Context</h2>

                    <ul className='list'>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link text-[#fff] '>Contact us</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/products" className='link text-[#fff] '>Products</Link>
                        </li>
                    </ul>
                </div>

                <div className='part2_col2 w-[50%]'>
                    <h2 className='text-[18px] font-[600] mb-4 text-[#fff] '>Products</h2>

                    <ul className='list'>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/info/delivery" className='link text-[#fff] '>Delivery</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/info/legal-notice" className='link text-[#fff] '>Legal Notice</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/info/terms-and-conditions" className='link text-[#fff] '>Terms and condition of use</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="https://techportal-web.vercel.app/#about" className='link text-[#fff] '>About us</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/login" className='link text-[#fff] '>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='part2 w-ful lg:w-[35%] flex pl-0 lg:pl-8 flex-col pr-8 mt-5 lg:mt-0'>
                    <h2 className='text-[18px] font-[600] mb-2 lg:mb-4 text-[#fff] '>Subscribe to newsletter</h2>
                    <p className='text-[13px] text-[#fff] '>Subcribe to our latest newsletter to get news special discounts.</p>

                        <form action="/" className='mt-5'>
                            <input type="text" className='w-full h-[45px] border outline-none pl-4 pr-4 text-[#fff]  rounded-sm mb-4 focus:border-[#fff]' placeholder='Your Email Address' />
                            <Button className="btn-org block! text-[#fff] ">Subscribe</Button>
<FormControlLabel
  className="mt-3 lg:mt-0"
  control={
    <Checkbox
      sx={{
        color: "#fff",
        "&.Mui-checked": {
          color: "#fff",
        },
      }}
    />
  }
  label={
    <span className="text-white text-[13px]">
      I agree to the terms and conditions and the privacy policy.
    </span>
  }
/>
                       </form>
                </div>
        </div>

        </div>
    </footer>

    <div className='bottomStrip border-t border-[rgba(0,0,0,0.1)] pt-2  lg:pb-2 bg-white'>
        <div className='container flex items-center justify-between flex-col lg:flex-row  lg:gap-0'>
            <ul className='flex items-center gap-2'>
                <li className='list-none'>
                    <Link to="/" target='_blank'  className='w-[35px] text-[#01065d] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#01065d] transition-all'>
                    <FaFacebook className='text-[15px] group-hover:text-white' />
                    </Link>
                </li>
                <li className='list-none'>
                    <Link to="/" target='_blank'  className='w-[35px] text-[#01065d] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#01065d] transition-all'>
                    <AiOutlineYoutube className='text-[20px] group-hover:text-white' />
                    </Link>
                </li>
                <li className='list-none'>
                    <Link to="/" target='_blank'  className='w-[35px] text-[#01065d] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#01065d] transition-all'>
                    <FaPinterest className='text-[15px] group-hover:text-white' />
                    </Link>
                </li>
                <li className='list-none'>
                    <Link to="/" target='_blank'  className='w-[35px] text-[#01065d] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#01065d] transition-all'>
                    <FaInstagram className='text-[15px] group-hover:text-white' />
                    </Link>
                </li>
            </ul>

            <p className='text-[13px] text-center mb-0 text-[#01065d]'>
                &copy; 2026 - Tech Portal Solutions Official Store
            </p>

            <div className='flex items-center lg:gap-0'>
                <p className="text-[#01065d]">Built with ❤ by <a href="https://pluscodeltd.vercel.app">Pluscode LTD </a> </p>
            </div>
        </div>
    </div>



     <Drawer open={context.openCartPanel} onClose={context.toggleCartPanel(false)} anchor='right'
      className='cartPanel'>
        <div className='flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]'>
          <h4>Shopping Cart ({context?.cartData?.length})</h4>
          <IoCloseSharp className='text-[20px] cursor-pointer' onClick={context.toggleCartPanel(false)} />
        </div>

        {
            context?.cartData?.length !==0 ? <CartPanel data={context?.cartData} /> : 
            <>
                <div className='flex items-center justify-center flex-col pt-[100px] gap-5'>
                    
                    <img src="/empty-cart.png" alt="Empty Cart" className='w-[150px]' />
                    <h4>Your cart is currently empty</h4>
                    <Button className='btn-org btn-sm' onClick={context?.toggleCartPanel(false)} >Continue Shopping</Button>
                </div>
            </>
        }
        
      </Drawer>


        {/* Address Modal */}
        <Drawer open={context.openAddressPanel} onClose={context.toggleAddressPanel(false)} anchor='right'
            className='addressPanel'>
            <div className='flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]'>
                <h4>{context?.addressMode === "add" ? "Add" : "Edit"} Delivery Address </h4>
                <IoCloseSharp className='text-[20px] cursor-pointer' onClick={context.toggleAddressPanel(false)} />
            </div>

            <div className='w-full max-h-[100vh] overflow-auto'>
                <AddAddress /> 
            </div>
            

        </Drawer>




      <Dialog
        fullWidth={context?.fullWidth}
        maxWidth={context?.maxWidth}
        open={context?.openProductDetailsModal.open}
        onClose={context?.handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModal'
      >
        
        <DialogContent>
          <div className='flex items-center wfull productDetailsModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]' 
            onClick={context?.handleCloseProductDetailsModal}><IoCloseSharp className='text-[20px]' /></Button>
            {
              context?.openProductDetailsModal?.item?.length !== 0 &&
              <>
                <div className='col1 w-[40%] px-3 py-8'>
                  <ProductZoom images={context?.openProductDetailsModal?.item?.images} />
                </div>

                <div className='col2 w-[60%] py-8 px-8 pr-16 productContent'>
                  <ProductDetailsComponent item={context?.openProductDetailsModal?.item} />
                </div>
              </>
            }
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Footer;