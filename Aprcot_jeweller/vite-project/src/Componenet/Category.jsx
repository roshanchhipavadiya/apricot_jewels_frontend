import React from 'react';

const Category = ({ image, title  }) => {

    
    return (
        <div className='cursor-pointer'>
            <img src={`https://srv963148.hstgr.cloud:10443${image}`} alt={title} title={title} className="h-[240px] object-cover max-4xl:h-[200px] max-xl:h-[238px] max-2xl:h-[270px] max-md:h-[300px] max-sm:h-auto w-[100%] rounded-[30px] max-sm:rounded-[15px] overflow-hidden" />
            <div>
                <h5 className="font-semibold text-[20px] leading-[100%] text-center mb-[9px] mt-[17px] max-sm:text-[18px]">
                    {title}
                </h5>

                <div className="flex justify-center">
                    <button className="flex items-center font-normal text-[15px] leading-[100%]">
                        Explore
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            className="ml-1"
                        >
                            <path d="M1 0.666748L7 6.66675L1 12.6667" stroke="#4D4C4C" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;
