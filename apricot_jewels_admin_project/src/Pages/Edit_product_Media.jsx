import React, { useEffect, useState } from "react";
import { useEditProdctMediaMutation, useGetProdctMediaQuery } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";

// Layout Components
import User_side_menu from '../Componenet/user_side_menu';
import EmployList from '../Componenet/EmployList';
import Service_side_menu from '../Componenet/service_side_menu';
import SubHeader from '../Componenet/sub_header';


const Edit_product_Media = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const location = useLocation();
    const mediaId = location.state?.productMediaId;
    const [media, setMedia] = useState({
        product_media_id: mediaId,
        media_type: "",
        file: "",

    });

    const [editProdctMedia] = useEditProdctMediaMutation();
    const { data: product_mediaData, isSuccess } = useGetProdctMediaQuery(mediaId);
    console.log(product_mediaData?.data || []);

    const mediaData = product_mediaData?.data
    console.log(mediaData || []);


    const [selectedImage, setSelectedImage] = useState(null); // for preview
    const [selectedFile, setSelectedFile] = useState(null);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // preview
            setSelectedFile(file);                       // actual file
            setMedia((prev) => ({ ...prev, file }));
        }
    };



    useEffect(() => {
        if (isSuccess && product_mediaData?.data) {
            const data = product_mediaData.data;

            setMedia((prev) => ({ ...prev, ...data }));

            if (data.file && typeof data.file === "string") {
                fetch(data.file)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const previewUrl = URL.createObjectURL(blob);
                        setSelectedImage(previewUrl); // for preview
                        setSelectedFile(blob);        // actual file
                    })
                    .catch((err) => {
                        console.error("Failed to convert file to blob", err);
                    });
            }
        }
    }, [isSuccess, product_mediaData]);

    const handleEditProductMedia = async () => {
        try {
            const formData = new FormData();
            formData.append("product_media_id", media.product_media_id);
            formData.append("media_type", media.media_type);

            if (selectedFile) {
                formData.append("file", selectedFile);
            } else if (selectedImage) {
                const response = await fetch(selectedImage);
                const blob = await response.blob();
                formData.append("file", blob);
            } else {
                toast.error("Please select a file.");
                return;
            }

            const res = await editProdctMedia(formData);
            if (res?.data) {
                toast.success("Product Media updated successfully!");
                setInterval(() => {
                    navigate('/product_media    ')
                }, 1500)
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while updating.");
        }
    };



    if (!mediaId) {
        return <div className="p-10 text-red-500">No diamond selected for editing.</div>;
    }
    return (
        <div>
            <ToastContainer position="top-center" />

            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className="flex inter">
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} />
                <div className="w-full width__right relative max-2xl:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Edit Diamond"} />
                    <div className="flex justify-between gap-[10px] mb-[50px] flex-wrap">
                        <h3 className="text-[26px] text-gray font-semibold">Edit Product Media</h3>

                    </div>

                    <form>
                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow rounded-[10px] p-[30px] space-y-[15px]">

                            <div>
                                <div className='my-[15px]'>
                                    <label className="block text-sm text-gray font-medium">Product Media Type:</label>
                                    <select
                                        value={media?.media_type}
                                        onChange={(e) => setMedia({ ...media, media_type: e.target.value })}
                                        className="mt-[10px] w-full h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select Media Type</option>
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>

                            </div>

                            <div className="my-[15px]">
                                <label className="block text-sm text-gray font-medium">
                                    Image&nbsp;<span className="text-[#F44336]">*</span>
                                </label>

                                <div className="mt-[10px] w-full flex flex-col items-center">
                                    {/* File Input */}
                                    <div className="relative w-full flex items-center h-[35px] sm:h-[40px] px-[12px] sm:px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*,video/*"

                                            onChange={handleImageChange}
                                            className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                                        />
                                        {selectedImage ? (
                                            selectedImage
                                        ) : (
                                            (media.file ? media.file : 'Choose File')
                                        )}
                                    </div>

                                    {/* Show Image Preview */}

                                </div>
                            </div>

                            <div className="pt-[30px] flex flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    onClick={handleEditProductMedia}
                                    className="inline-flex items-center justify-center h-[40px] w-[154px] py-2 text-sm font-semibold text-white rounded-md bg-[#D86A37] shadow"
                                >
                                    Save Changes
                                </button>
                                <Link to="/all_diamonds">
                                    <button
                                        type="button"
                                        className="text-[#D86A37] inline-flex items-center justify-center h-[40px] w-[114px] py-2 text-sm font-semibold bg-white rounded-md ring-1 ring-gray-300 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit_product_Media
