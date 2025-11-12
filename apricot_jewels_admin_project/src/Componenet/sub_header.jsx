import React, { useEffect } from 'react';
import option from '../assets/option.png';
import User from '../assets/user.png'
import { useLocation } from 'react-router-dom';
import { useGetProfileQuery } from '../services/apiSlice'


const SubHeader = ({ setIsOpenside ,pageName: pageNameProp  }) => {


    const location = useLocation();

    const pageNameMap = {
        "/product_details": "Product Details",
        "/add_product": "Add Product",
        "/diamond": "Diamonds",
        "/add_diamond": "Add Diamond",
        "/edit_diamond": "Edit Diamond",
        "/metal": "Metals",
        "/add_metal": "Add Metal",
        "/edit_metal": "Edit Metal",
        "/product_media": "Product Media",
        "/add_product_media": "Add Product Media",
    };

    const showIconRoutes = Object.keys(pageNameMap); 
    const pageName = pageNameMap[location.pathname] || pageNameProp;


    const { data: user } = useGetProfileQuery();
    const userdata = user?.data || [];


    return (
        <div>
            <div className="flex mb-[30px] justify-between items-center p-[10px] sm:p-[15px] rounded-[10px] bg-white shadow-[0px_4px_4px_0px_#0000001A]">
                <div className="flex items-center gap-2">
                    {showIconRoutes.includes(location.pathname) && (
                        <div className="option-ico-1-1 hidden max-lg:flex">
                            <img src={option} onClick={() => setIsOpenside(true)} alt="option icon" />
                        </div>
                    )}
                    <h3 className="text-[18px] text-gray">{pageName}</h3>
                </div>
                <div className="flex items-center">
                    
                    <div className="account py-0 bg-white m-0 flex items-center">
                        <div className="ms-3 hide__ala">
                            <span>{userdata?.username}</span>
                            <p className='text-end'>{userdata?.email}</p>
                        </div>

                        <div className="ms-3">
                            <img
                                src={userdata?.profile_picture ? `${import.meta.env.VITE_API_BASE_URL}${userdata.profile_picture}` : User}  
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"  
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubHeader;
