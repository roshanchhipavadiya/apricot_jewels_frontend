import React, { useState, useEffect, useRef } from "react";
import { useAddProductMediaMutation, useGetMetalQuery, useGetProdctMediaQuery, useGetDiamondQuery, useDeleteProductMediaMutation, useGetProductQuery } from "../services/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from '../Componenet/dropdown';
// Layout Components (✅ make sure these are correctly imported)
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import Service_side_menu from '../Componenet/service_side_menu'
import SubHeader from '../Componenet/sub_header'
import { useDropzone } from "react-dropzone";
import Shape1 from '../assets/shape1.png'
import Shape2 from '../assets/shape2.png'
import Shape3 from '../assets/shape3.png'
import Shape4 from '../assets/shape4.png'


const Add_product_Media = () => {
    const [images, setImages] = useState([]);
    console.log(images);

    const [selectedImages, setSelectedImages] = useState([]);

    console.log(selectedImages);

    const [deleteProductMedia] = useDeleteProductMediaMutation();




    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
    };

    console.log(images);

    const handleDragStart = (index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (index) => {
        dragOverItem.current = index;

        if (dragItem.current === null || dragItem.current === index) return;

        console.log([...images]);


        const updatedImages = [...images];
        const draggedItem = updatedImages[dragItem.current];

        // Remove the dragged item and insert it at the new index
        updatedImages.splice(dragItem.current, 1);
        updatedImages.splice(index, 0, draggedItem);
        console.log(updatedImages);


        // Update both images and selectedImages
        setImages(updatedImages);
        setSelectedImages(updatedImages);

        // Update dragItem to the new index
        dragItem.current = index;
    };
    const handleDragEnd = () => {
        dragItem.current = null;
        dragOverItem.current = null;
    };



    useEffect(() => {
        setProduct_media((prev) => ({
            ...prev,
            file: selectedImages.map((img) => img.file),
        }));
    }, [selectedImages]);




    // api data
    const [product_media, setProduct_media] = useState({
        product_id: localStorage.getItem("product_id"),
        media_type: "Image",
        file: [],
        metal_id: "",
        diamond_id: ""
    });



    const handleDrop = (newFiles) => {
        const formatted = Array.from(newFiles).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        const updatedImages = [...images, ...formatted];
        setImages(updatedImages);
        setSelectedImages(updatedImages);

        // 🔁 Update product_media.file
        setProduct_media((prev) => ({
            ...prev,
            file: updatedImages.map((img) => img.file),
        }));
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const [addProductMedia] = useAddProductMediaMutation();


    // 1. Then use it in useDropzone

    const { getInputProps, open } = useDropzone({
        accept: "image/*",
        multiple: true,
        onDrop,
    });


    const karats = [
        { label: "14K", color: "#C3C3C3" },
        { label: "14K", color: "#EFE2BA" },
        { label: "14K", color: "#F2D4C9" },
        { label: "18K", color: "#C3C3C3" },
        { label: "18K", color: "#EFE2BA" },
        { label: "18K", color: "#F2D4C9" },
    ];

    const [selectedKarat, setSelectedKarat] = useState(karats[0]);


    const { data: MetalData } = useGetMetalQuery();
    const metaldata = MetalData?.data || [];



    const { data: diamondData } = useGetDiamondQuery();
    const diamonddata = diamondData?.data || [];



    const simplifiedMetalData = metaldata.map((item) => ({
        label: `${item.metal_purity} ${item.metal_type} (${item.metal_color})`,
        metal_id: item.metal_id,
    }));

    console.log(simplifiedMetalData);


    const diamondShapes = [Shape1, Shape2, Shape3, Shape4];

    // ProductMedia
    const { data: product_mediaData } = useGetProdctMediaQuery(localStorage.getItem("product_id"));
    const productdata = product_mediaData?.results || [];
    console.log(productdata);

    const { data: products } = useGetProductQuery({ product_id: localStorage.getItem("product_id") });




    const [activeIndex, setActiveIndex] = useState(""); // metal_id
    const [dimonindex, setdimonindex] = useState(0); // diamond weight
    const [dimond_shape, setdimond_shape] = useState(null); // diamond shape
    const [Dimon_id, setDimon_id] = useState(null); // diamond shape
    const [quantity, setQuantity] = useState(1);

    const diamond = products?.diamond_details;
    console.log(diamond);

    const metal = products?.metal_details;
    console.log(metal);

    const productmedia = products?.product_media;
    console.log(productmedia);






    useEffect(() => {
        if (diamond?.length > 0) {
            setdimonindex(diamond[0]?.diamond_weight_ct);
            setDimon_id(diamond[0]?.diamond_id);
            setdimond_shape(diamond[0]?.diamond_shape);
        }
    }, [diamond]);

    // Set initial metal
    useEffect(() => {
        if (metal?.length > 0) {
            setActiveIndex(metal[0]?.metal_id);
        }
    }, [metal]);
    const colorScheme = ["#C3C3C3", "#F5E1A4", "#F5C3C3"];
    const activeColorScheme = ["#A1A1A1", "#EACD83", "#E6A1A1"];



    const toggleActive = (index) => setActiveIndex(index);
    const [diamond_id, setDiamond_id] = useState(null);

    const toggledimondshape = (selectedShape) => {
        setdimond_shape(selectedShape);

        const filteredWeights = diamond?.filter(item => item.diamond_shape === selectedShape);
        console.log(filteredWeights);

        const matched = filteredWeights?.find(item => item.diamond_weight_ct === dimonindex);


        if (matched) {
            setDiamond_id(matched.diamond_id); // same weight available in new shape
            setDimon_id(matched.diamond_id);
        } else if (filteredWeights.length > 0) {
            setdimonindex(filteredWeights[0].diamond_weight_ct); // fallback to first weight
        }
    };


    const toggledimond = (index, id) => {
        setdimonindex(index)
        setDimon_id(id);
    };

    // Get selected diamond price
    console.log(Dimon_id);
    const handleSubmit = async () => {
        const { media_type, product_id } = product_media;

        if (!media_type) {
            toast.error("Please selecte type.")
        }

        // Ensure that images are selected
        if (images.length === 0 && (!matchedData || matchedData.length === 0)) {
            toast.error("Please select at least one image.");
            return;
        }

        const allImages = [
            ...(matchedData || []).map((item, index) => ({
                type: "existing",
                id: item.product_media_id, // Use the appropriate ID
                file: item.file,
                index,
            })),
            ...images.map((img, i) => ({
                type: "new",
                file: img.file,
                preview: img.preview,
                index: (matchedData?.length || 0) + i,
            }))
        ];

        const formData = new FormData();

        formData.append("product_id", product_id);
        formData.append("media_type", media_type);
        formData.append("diamond_id", Dimon_id);
        formData.append("metal_id", activeIndex);

        // Append new files to the formData (single 'file' key for each file)
        allImages.forEach((img) => {
            if (img.type === "new") {
                formData.append("file", img.file); // Add each new file under the same 'file' key
            }
        });

        try {
            const response = await addProductMedia({ formData, product_id }).unwrap();

            toast.success("Upload successful!");
            setImages([]); // Clear only new images after successful upload

            console.log("Upload response:", response);
        } catch (err) {
            console.error("Image upload failed", err);
            toast.error("Upload failed. Please try again.");
        }
    };




    console.log(diamondData?.data);
    console.log(Dimon_id);
    console.log(activeIndex);

    const matchedData = productdata?.flatMap((item, index) => {
        const { img_data, data } = item;

        if (!img_data || typeof img_data !== 'object' || !Array.isArray(data)) {
            console.warn(`⚠️ Invalid item at index ${index}`, item);
            return [];
        }

        const isMatch = img_data.diamond_details === Dimon_id && img_data.metal === activeIndex;

        console.log(isMatch); // Log whether a match was found

        if (isMatch) {
            console.log(`✅ Match found at index ${index}, returning ${data.length} media item(s)`);
            return data; // Return matching media items
        }

        return [];
    }) || [];

    console.log("🔍 Final Matched Image Data:", matchedData);







    // const matcheDiamond = productdata?.img_data?.filter(item => item.diamond_details == Dimon_id);

    // console.log(Dimon_id);
    // console.log(activeIndex);

    // console.log("Matched Media:", matcheDiamond);
    // const matchedMetal = productmedia?.filter(item => item.metal == activeIndex);

    // console.log("Matched Metal:", matchedMetal);

    // // item.diamond_details.includes(Dimon_id) // if it's an array
    // const matchedData = productmedia?.filter(
    //     item => item.diamond_details == Dimon_id && item.metal == activeIndex
    // );

    // console.log(productmedia);

    console.log("Matched Data (diamond + metal):", matchedData);

    const [existingImages, setExistingImages] = useState([]);

    const isExistingImagesInitialized = useRef(false);

    // Effect to initialize the existing images only once
    useEffect(() => {
        if (matchedData?.length && !isExistingImagesInitialized.current) {
            // Filter out invalid (undefined, null, or missing 'file') items from matchedData
            const validImages = matchedData.filter(item => item && item.file);
            setExistingImages(validImages);
            isExistingImagesInitialized.current = true;
        }
    }, [matchedData]);

    const existingDragItem = useRef(null);
    const existingDragOverItem = useRef(null);

    // Handle the start of dragging an item
    const handleExistingDragStart = (index) => {
        existingDragItem.current = index;
    };

    // Handle dragging an item over another item to reorder
    const handleExistingDragEnter = (index) => {
        if (existingDragItem.current === null || existingDragItem.current === index) return;

        existingDragOverItem.current = index;

        const list = [...existingImages];
        const draggedItem = list[existingDragItem.current];

        // Remove the dragged item and insert it at the new position
        list.splice(existingDragItem.current, 1);
        list.splice(index, 0, draggedItem);

        existingDragItem.current = index;
        setExistingImages(list);
    };

    // Reset the drag state after the drag ends
    const handleExistingDragEnd = () => {
        existingDragItem.current = null;
        existingDragOverItem.current = null;
    };

    const removeImage = async (id, type = "new") => {
        if (type === "existing") {
            const imageToDelete = matchedData.find((item) => item.product_media_id === id);
            console.log(imageToDelete);

            if (!imageToDelete?.product_media_id) return;

            try {

                await deleteProductMedia(id).unwrap();
                toast.success("Image deleted successfully");


                const index = matchedData.findIndex((item) => item.product_media_id === id);
                if (index !== -1) {

                    const updatedMatched = [...matchedData];
                    updatedMatched.splice(index, 1)
                    // setMatchedData(updatedMatched); 
                }
            } catch (err) {
                console.error("Failed to delete image", err);
                toast.error("Failed to delete image");
            }
        } else {

            const index = images.findIndex((img) => img.id === id);
            if (index !== -1) {
                const updated = [...images];
                updated.splice(index, 1);
                setImages(updated);
                setSelectedImages(updated);

                setProduct_media((prev) => ({
                    ...prev,
                    file: updated.map((img) => img.file),
                }));
            }
        }
    };




    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}

            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className="flex inter">
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} />
                <div className="w-full width__right relative max-2xl:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Category"} />

                    {/* <form>
                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] space-y-[15px]">
                            <div>
                                <div className='my-[15px]'>

                                    <Dropdown
                                        label="Product Media Type : "
                                        options={[
                                            "Image",
                                            "Video",
                                        ]}
                                        defaultValue="Select Type"
                                        onSelect={(value) => setProduct_media({ ...product_media, media_type: value })}
                                    />
                                </div>

                            </div>
                            <div className="my-[15px]">
                                <label className="block text-sm text-gray font-medium">
                                    Image&nbsp;<span className="text-[#F44336]">*</span>
                                </label>

                                <div className="mt-[10px] w-full flex flex-col items-center">
                                
                                    <div className="relative w-full flex items-center h-[40px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*,video/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                                        />
                                        <span>
                                            {selectedImages.length > 0
                                                ? `${selectedImages.length} file(s) selected`
                                                : (product_media.file ? 'Files selected previously' : 'Choose File')}
                                        </span>
                                    </div>

                                 
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {selectedImages.map((img, index) => (
                                            <div key={index} className="relative">
                                               
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center  z-10"
                                                    title="Remove Image"
                                                >
                                                   
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-3 w-3"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 8.586L15.95 2.636a1 1 0 111.414 1.414L11.414 10l5.95 5.95a1 1 0 01-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 01-1.414-1.414L8.586 10 2.636 4.05a1 1 0 011.414-1.414L10 8.586z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>

                                             
                                                <img
                                                    src={img.preview}
                                                    alt={`preview-${index}`}
                                                    className="w-16 h-16 object-cover rounded shadow-[0px_0px_10px_rgba(0,0,0,0.1)]"
                                                />
                                            </div>
                                        ))}
                                    </div>

                      

                                </div>
                            </div>
                            <div>
                                <div className='my-[15px]'>
                                    <Dropdown
                                        label="Metal Type : "
                                        options={simplifiedMetalData.map((val) => val.label)}
                                        defaultValue="Select Metal Type"
                                        onSelect={(selectedLabel) => {
                                            const selected = simplifiedMetalData.find(val => val.label === selectedLabel);
                                            if (selected) {
                                                setProduct_media({ ...product_media, metal_id: selected.metal_id });
                                            }
                                        }}
                                    />


                                </div>
                            </div>

                            <div>
                                <div className='my-[15px]'>
                                <Dropdown
                                        label="Dimond Type : "
                                        options={simplifiedMetalData.map((val) => val.label)}
                                        defaultValue="Select Metal Type"
                                        onSelect={(selectedLabel) => {
                                            const selected = simplifiedMetalData.find(val => val.label === selectedLabel);
                                            if (selected) {
                                                setProduct_media({ ...product_media, metal_id: selected.metal_id });
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="pt-[30px] flex flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="inline-flex items-center justify-center h-[35px] sm:h-[40px] w-[154px] py-2 text-sm font-semibold text-white rounded-md bg-[#D86A37] shadow-[0px_8px_20px_1px_#3DB0F733]"
                                >
                                    Add Product Media
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="text-[#D86A37] inline-flex items-center justify-center h-[35px] sm:h-[40px] w-[114px] py-2 text-sm font-semibold bg-white rounded-md ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form> */}


                    <form >


                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold mb-2">Add Category</h3>

                        </div>

                        <div>
                            <div>
                                <div className='my-[15px]'>

                                    <Dropdown
                                        label="Product Media Type : "
                                        options={["Image", "Video"]}
                                        defaultValue={product_media.media_type} // make sure your Dropdown supports this
                                        onSelect={(value) =>
                                            setProduct_media((prev) => ({ ...prev, media_type: value }))
                                        }
                                    />

                                </div>

                            </div>
                        </div>

                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] space-y-[15px]">
                            <div className="px-4">
                                <h3 className="font-nunito font-semibold text-[17px] leading-[100%] text-justify mb-[20px]">
                                    Diamond
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {[...new Map(diamond?.map(item => [item?.diamond_shape, item])).values()].map((value, index) => (
                                        <div key={index} onClick={() => toggledimondshape(value.diamond_shape, value.diamond_id)}>
                                            <div className={`relative w-[78px] h-[78px] rounded-full border p-[6px] ${dimond_shape === value.diamond_shape ? " border-[#999999] " : " border-white "}`}>

                                                <img src={Shape1} className={` w-[100%] max-sm:w-[45px] max-sm:h-[45px] relative  `} alt="" />
                                            </div>
                                            <span className='mt-[12px] block text-center text-[14px] font-[600]'> {value.diamond_shape}</span>
                                        </div>
                                    ))}

                                </div>
                                {[...new Map(
                                    diamond?.filter(item => item.diamond_shape === dimond_shape)?.map(item => [item?.diamond_weight_ct, item])).values()].map((value, index) => {
                                        const weight = parseFloat(value?.diamond_weight_ct);

                                        // Convert weight to integer and fraction
                                        const formatWeight = (num) => {
                                            const intPart = Math.floor(num);
                                            const decimalPart = +(num - intPart).toFixed(2);

                                            const fractionMap = {
                                                0.25: "¼",
                                                0.33: "⅓",
                                                0.5: "½",
                                                0.66: "⅔",
                                                0.75: "¾"
                                            };

                                            const fraction = fractionMap[decimalPart] || (decimalPart ? decimalPart.toFixed(2) : "");

                                            return (
                                                <span className="flex items-center">
                                                    {intPart > 0 ? <span>{intPart}</span> : ""}
                                                    {fraction && <span className="ml-[3px]">{fraction}</span>}
                                                </span>
                                            );
                                        };

                                        return (
                                            <span
                                                key={index}
                                                onClick={() => toggledimond(value?.diamond_weight_ct, value?.diamond_id)}
                                                className={`w-[50px] cursor-pointer h-[50px] border text-[20px] font-[500] rounded-full flex items-center justify-center 
                ${dimonindex === value?.diamond_weight_ct ? 'border-primary' : 'border-[#8B8B8B]'}`}
                                            >
                                                {formatWeight(weight)}
                                            </span>
                                        );


                                    })}


                            </div>
                        </div>

                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] space-y-[15px]">

                            <div className="px-4">
                                <h3 className="font-nunito font-semibold text-[17px] leading-[100%]  text-justify mb-[20px] ">
                                    Metal Color : {selectedKarat.label} {selectedKarat.color}
                                </h3>
                                <div className="flex gap-2">
                                    {metal?.map((value, index) => (
                                        <div
                                            key={index}
                                            className={`w-[55px] h-[55px] relative max-md:w-[45px] max-md:h-[45px] max-sm:w-[35px] max-sm:h-[35px] text-[18px] max-md:text-[16px] max-sm:text-[14px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300  ${activeIndex == value.metal_id ? "active_k" : ""}`}
                                            style={{
                                                backgroundColor: value.metal_color == 'Yellow'
                                                    ? activeColorScheme[index % activeColorScheme.length]
                                                    : colorScheme[index % colorScheme.length],
                                            }}
                                            onClick={() => toggleActive(value.metal_id)}
                                        >
                                            {value.metal_purity}
                                        </div>
                                    ))}

                                    {/* Optional Debug Output */}
                                    {/* <div className="ml-4 text-sm">
        <p><strong>Selected:</strong> {selectedKarat.label}</p>
        <p><strong>Color:</strong> <span style={{ color: selectedKarat.color }}>{selectedKarat.color}</span></p>
      </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="border mt-[30px] bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] space-y-[15px]">
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                                    onClick={handleSubmit}
                                >
                                    Upload Image
                                </button>
                            </div>
                            <div className="px-4">
                                <div
                                    className="border-dashed border-2 border-gray-400 rounded-lg p-4 text-center cursor-pointer min-h-[150px] flex flex-col items-center justify-center w-full"
                                >
                                    <input {...getInputProps()} />

                                    {images.length === 0 && (!matchedData || matchedData.length === 0) ? (
                                        <p>
                                            Drag & drop images here, or{" "}
                                            <span
                                                className="text-blue-600 underline cursor-pointer"
                                                onClick={open}
                                            >
                                                click to select
                                            </span>
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-9 gap-2 w-full" onClick={open}>

                                            {[...existingImages, ...matchedData]
                                                .filter((item) => item && item.file)  // Ensure the item is valid and has a 'file' property
                                                .map((item, index) => (
                                                    <div
                                                        key={`existing-${index}`}
                                                        draggable
                                                        onDragStart={() => handleExistingDragStart(index)}
                                                        onDragEnter={() => handleExistingDragEnter(index)}
                                                        onDragEnd={handleExistingDragEnd}
                                                        onDragOver={(e) => e.preventDefault()}
                                                        className="relative group rounded-md overflow-hidden border p-1 bg-gray-50 shadow-sm"
                                                    >
                                                        <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-10">
                                                            {index + 1}
                                                        </span>

                                                        <img
                                                            src={`http://192.168.1.7:8051/${item?.file}`}
                                                            alt={`media-${index}`}
                                                            className="w-full h-24 object-cover rounded-md"
                                                        />
                                                        <span className="text-xs block text-center mt-1 truncate">
                                                            {item?.file?.name || `Image ${index + 1}`}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeImage(item?.product_media_id, "existing"); // Correctly identifies existing image
                                                            }}
                                                            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs hidden group-hover:block"
                                                        >
                                                            ✕
                                                        </button>


                                                    </div>
                                                ))}

                                            {/* ➕ Show newly selected images */}
                                            {images
                                                .filter((img) => img && img.file)  // Ensure the img is valid and has a 'file' property
                                                .map((img, index) => {
                                                    // Start display index from existingImages.length
                                                    const displayIndex = (existingImages.length || 0) + index;

                                                    return (
                                                        <div
                                                            key={`new-${index}`}
                                                            draggable
                                                            onDragStart={(e) => {
                                                                e.stopPropagation();
                                                                handleDragStart(index);
                                                            }}
                                                            onDragEnter={(e) => {
                                                                e.stopPropagation();
                                                                handleDragEnter(index);
                                                            }}
                                                            onDragEnd={(e) => {
                                                                e.stopPropagation();
                                                                handleDragEnd();
                                                            }}
                                                            onDragOver={(e) => e.preventDefault()}
                                                            className="relative group rounded-md overflow-hidden border p-1 bg-gray-50 shadow-sm"
                                                        >
                                                            <span className="absolute top-1 left-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-10">
                                                                {displayIndex + 1}
                                                            </span>

                                                            <img
                                                                src={img.preview}
                                                                alt={`preview-${index}`}
                                                                className="w-full h-24 object-cover rounded-md transition-all duration-200"
                                                            />
                                                            <span className="text-xs block text-center mt-1 truncate">
                                                                {img.file.name}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeImage(index); // Properly remove the image
                                                                }}
                                                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs hidden group-hover:block"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                        </div>



                                    )}
                                </div>

                            </div>
                        </div>


                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>


                    </form>



                </div>
            </div>
        </div>
    )
}

export default Add_product_Media
