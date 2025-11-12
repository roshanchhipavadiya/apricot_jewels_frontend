
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAddProductMediaMutation, useGetMetalQuery, useGetProdctMediaQuery, useGetDiamondQuery, useGetProductQuery, useDeleteProductMediaMutation, useEditProdctMediaMutation } from "../services/apiSlice";
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

    const [product_media, setProduct_media] = useState({
        product_id: localStorage.getItem("product_id"),
        media_type: "Image",
        file: [],
        metal_id: "",
        diamond_id: ""
    });




    const [imageToDelete, setImageToDelete] = useState(null);
    const [images, setImages] = useState([]);

    const [viewMode, setViewMode] = useState("edit");
    const [selectedImages, setSelectedImages] = useState([]);
    const [mediaList, setMediaList] = useState([]); // All reordered media


    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const onDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            format: file.type.startsWith("video") ? "video" : "image", // 👈 important!
        }));

        setImages((prev) => [...prev, ...newImages]);
        setSelectedImages((prev) => [...prev, ...newImages]);
    };



    // Updated onDropInTab function to only process dropped files and set the viewMode
    // const onDropInTab = (e) => {
    //     e.preventDefault();
    //     const files = e.dataTransfer.files;

    //     if (files.length > 0) {
    //         const acceptedFiles = Array.from(files);
    //         onDrop(acceptedFiles); // Process files using onDrop

    //         // Set viewMode to "upload" if files are added
    //         setViewMode("upload");
    //     } else {
    //         // If no files were dropped, set viewMode to "edit"
    //         setViewMode("edit");
    //     }
    // };


    const handleDragStart = (index) => {
        dragItem.current = index;
    };

    const handleDragEnter = (index) => {
        dragOverItem.current = index;

        if (dragItem.current === null || dragItem.current === index) return;


        const updatedImages = [...images];
        const draggedItem = updatedImages[dragItem.current];

        // Remove the dragged item and insert it at the new index
        updatedImages.splice(dragItem.current, 1);
        updatedImages.splice(index, 0, draggedItem);



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





    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const [addProductMedia] = useAddProductMediaMutation();
    const [editProdctMedia] = useEditProdctMediaMutation()


    // 1. Then use it in useDropzone

    const { getRootProps, getInputProps, open } = useDropzone({
        accept: "image/*",
        multiple: true,
        onDrop,
    })

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === "upload" ? "open" : "upload"));
    };


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



    const diamondShapes = [Shape1, Shape2, Shape3, Shape4];
    const productMediaId = useMemo(() => localStorage.getItem("product_media_id"), []);
    const productId = useMemo(() => localStorage.getItem("product_id"), []);

    // ProductMedia
    const { data: productMediaData, error, isLoading } = useGetProdctMediaQuery(
        { product_media_id: productMediaId, product_id: productId },
        {
            skip: !productMediaId && !productId, // Skip query if neither parameter is available
        }
    );
    const productdata = productMediaData?.results || [];
    const { data: products } = useGetProductQuery({ product_id: localStorage.getItem("product_id") });

    const [activeIndex, setActiveIndex] = useState(""); // metal_id
    const [dimonindex, setdimonindex] = useState(0); // diamond weight
    const [dimond_shape, setdimond_shape] = useState(null); // diamond shape
    const [Dimon_id, setDimon_id] = useState(null); // diamond shape
    const [quantity, setQuantity] = useState(1);

    const diamond = products?.diamond_details || [];

    const metal = products?.metal_details;

    const productmedia = products?.product_media;

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

        const filtered = diamond.filter(item => item.diamond_shape == selectedShape);

        if (filtered.length > 0) {
            const firstWeight = filtered[0].diamond_weight_ct;
            const firstDiamond = filtered[0];

            setdimonindex(firstWeight); // Set weight
            setDiamond_id(firstDiamond.diamond_id); // Set diamond ID
            setDimon_id(firstDiamond.diamond_id); // Optional if you use both
        }
    };

    const toggledimond = (index, id) => {
        setdimonindex(index)
        setDimon_id(id);



    };

    const [uploading, setUploading] = useState(false);

    // Get selected diamond price
    // console.log(Dimon_id);
    const handleSubmit = async (mode = "upload") => {
        const { media_type, product_id } = product_media;

        if (!media_type) {
            toast.error("Please select type.");
            return;
        }

        if (mode === "upload" && images.length === 0) {
            toast.error("Please select at least one image to upload.");
            return;
        }

        if (mode === "edit" && images.length > 0) {
            toast.error("Edit mode only allows reordering existing images.");
            return;
        }

        if (uploading) return;
        setUploading(true);

        const allImages = [
            ...(matchedData || []).map((item, index) => ({
                type: "existing",
                product_media_id: item.product_media_id,
                file: item.file,
                ordering_priority: index + 1
            })),
            ...images.map((img, i) => ({
                type: "new",
                file: img.file,
                preview: img.preview,
                ordering_priority: (matchedData?.length || 0) + i + 1
            }))
        ];

        const formData = new FormData();

        formData.append("product_id", product_id);
        formData.append("media_type", media_type);
        formData.append("diamond_id", Dimon_id);
        formData.append("metal_id", activeIndex);

        const orderingData = [];

        allImages.forEach((img) => {
            if (img.type === "new") {
                if (mode === "upload") {
                    formData.append("file", img.file);
                    formData.append("is_ordering", img.ordering_priority);
                }
            } else {
                orderingData.push({
                    product_media_id: img.product_media_id,
                    ordering_priority: img.ordering_priority
                });
            }
        });

        // For edit mode, only send ordering info
        if (mode === "edit" && orderingData.length > 0) {
            formData.append(
                "is_ordering",
                JSON.stringify({ product: product_id, media: orderingData })
            );
        }

        try {
            await addProductMedia(formData).unwrap();
            toast.success(
                mode === "upload" ? "Media uploaded successfully!" : "Order updated successfully!"
            );
            setImages([]);
            setViewMode("edit");
        } catch (err) {
            toast.error("Upload failed. Please try again.");
        }

        setUploading(false);
    };



    const handleEdit = async () => {
        const { media_type, product_id } = product_media;

        if (!media_type) {
            toast.error("Please select type.");
            return;
        }

        if (images.length === 0 && existingImages.length === 0) {
            toast.error("Please select at least one image.");
            return;
        }

        if (uploading) return;
        setUploading(true);

        // 👇 Use the CURRENT `existingImages` state (reordered list!)
        const allImages = [
            ...existingImages.map((item, index) => ({
                type: "existing",
                id: item.product_media_id,
                file: item.file,
                index,
            })),
            ...images.map((img, i) => ({
                type: "new",
                file: img.file,
                preview: img.preview,
                index: existingImages.length + i,
            }))
        ];

        const isOrdering = allImages.map((img) => ({
            product_media_id: img.id,
            ordering_priority: img.index + 1,
        }));


        const isAllExisting = allImages.every((img) => img.type === "existing");

        const formData = new FormData();

        formData.append("product_id", product_id);
        formData.append("media_type", media_type);
        formData.append("diamond_id", Dimon_id);
        formData.append("metal_id", activeIndex);

        if (isAllExisting) {
            // ✅ Correct: Use reordered image state
            formData.append("is_ordering", JSON.stringify({ product: product_id, media: isOrdering }));
        } else {
            // Mixed: new and existing
            images.forEach((img) => {
                formData.append("file", img.file);
            });

            formData.append("ordering_priority", JSON.stringify(
                allImages.map((img, index) => ({
                    product_media_id: img.id || null,
                    ordering_priority: index + 1,
                }))
            ));
        }

        try {
            const response = await editProdctMedia(formData).unwrap();
            toast.success("Media updated successfully!");
            setImages([]);

        } catch (err) {

            toast.error("Upload failed. Please try again.");
        }

        setUploading(false);
    };









    const matchedData = useMemo(() => {
        if (!productdata?.length) return [];

        return productdata.flatMap((item) => {
            const { img_data, data } = item;



            if (!img_data || !Array.isArray(data)) return [];

            const isMatch = img_data.diamond_details === Dimon_id && img_data.metal === activeIndex;

            return isMatch ? data.filter(d => d && d.file) : [];
        });
    }, [productdata, Dimon_id, activeIndex]);

    useEffect(() => {
        setExistingImages(matchedData);
    }, [matchedData]);


















    const [existingImages, setExistingImages] = useState([]);

    const isExistingImagesInitialized = useRef(false);

    // Effect to initialize the existing images only once
    useEffect(() => {
        if (!productdata?.length) return;

        const matched = productdata.flatMap((item) => {
            const { img_data, data } = item;

            if (!img_data || !Array.isArray(data)) return [];

            const isMatch = img_data.diamond_details === Dimon_id && img_data.metal === activeIndex;

            return isMatch ? data.filter(d => d && d.file) : [];
        });

        setExistingImages(matched);
    }, [productdata, Dimon_id, activeIndex]);


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
    useEffect(() => {
        setExistingImages(matchedData);
    }, [matchedData]);

    const [deleteProductMedia] = useDeleteProductMediaMutation();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const removeImage = async (id, type, index = null) => {
        if (type == "existing") {
            const imageToDelete = matchedData.find((item) => item.product_media_id === id);
            if (!imageToDelete?.product_media_id) return;

            try {
                await deleteProductMedia(id).unwrap();
                toast.success("Image deleted successfully");

                const updatedMatched = matchedData.filter((item) => item.product_media_id !== id);
                // If matchedData is stateful, update it here:
                // setMatchedData(updatedMatched);
            } catch (err) {

                toast.error("Failed to delete image");
            }
        }
    };

    const removeaddImage = (index) => {

        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        setSelectedImages(updated);


        setProduct_media((prev) => ({
            ...prev,
            file: updated.map((img) => img.file),
        }));
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
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Product Media"} />

                    <form >
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold mb-2">Add Product Media</h3>
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
                                        <div key={index} onClick={() => toggledimondshape(value.diamond_shape, value.diamond_id)} className="mb-6">
                                            <div className={`relative w-[78px] h-[78px] rounded-full border p-[6px] ${dimond_shape === value.diamond_shape ? " border-[#999999] " : " border-white "}`}>

                                                <img src={Shape1} className={` w-[100%] max-sm:w-[45px] max-sm:h-[45px] relative  `} alt="" />
                                            </div>
                                            <span className='mt-[12px] block text-center text-[14px] font-[600]'> {value.diamond_shape}</span>
                                        </div>
                                    ))}

                                </div>
                                <div className="flex flex-wrap">
                                    {[...new Map(
                                        diamond?.filter(item => item.diamond_shape == dimond_shape)?.map(item => [item?.diamond_weight_ct, item])
                                    ).values()].map((value, index) => {
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
                                                    {/* {fraction && <span className="ml-[3px]">{frac   tion}</span>} */}
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

                            <div className="flex gap-4 mt-4">
                                <button
                                    type="button"
                                    className={`px-6 py-2 rounded transition text-white ${viewMode === "upload" ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                                    onClick={() => {
                                        setViewMode("upload");  // Change the view mode to "upload"
                                        open();  // Open the file selection dialog or modal
                                    }}
                                >
                                    Upload Image
                                </button>



                                <button
                                    type="button"
                                    className={`px-6 py-2 rounded transition text-white ${viewMode === "edit" ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                                    onClick={() => setViewMode("edit")}
                                >
                                    Edit Image
                                </button>


                            </div>
                            <div className="px-4">
                                <div   {...getRootProps()}
                                    // onDrop={onDropInTab}
                                    className="dropzone border-dashed border-2 border-gray-400 rounded-lg p-4 text-center cursor-pointer min-h-[150px] flex flex-col items-center justify-center w-full"
                                >
                                    <input {...getInputProps()} />

                                    {selectedImages.length == 0 && (!matchedData || matchedData.length === 0) ? (
                                        <p>
                                            Drag & drop images here, or{" "}
                                            <span className="text-blue-600 underline cursor-pointer" onClick={open}>
                                                click to select
                                            </span>
                                        </p>
                                    ) : viewMode === "upload" ? (
                                        <div className="grid grid-cols-9 gap-2 w-full" onClick={open}>
                                            {images
                                                .filter((img) => img && img.file)
                                                .map((img, index) => {
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
                                                            {img.format === "video" ? (
                                                                <video src={img.preview} controls className="w-full h-24 object-cover rounded-md" />
                                                            ) : (
                                                                <img src={img.preview} alt={`preview-${index}`} className="w-full h-24 object-cover rounded-md" />
                                                            )}
                                                            <span className="text-xs block text-center mt-1 truncate">{img.file.name}</span>
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeaddImage(index); // Pass the index of the image to remove
                                                                }}
                                                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs hidden group-hover:block"
                                                            >
                                                                ✕
                                                            </button>

                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    ) : viewMode === "edit" ? (
                                        <div className="grid grid-cols-9 gap-2 w-full" onClick={open}>
                                            {existingImages
                                                .filter((item) => item && item.file)
                                                .map((item, index) => {
                                                    const fileExtension = item.file?.split(".").pop();
                                                    return (
                                                        <div
                                                            key={`existing-${index}`}
                                                            draggable
                                                            onDragStart={() => handleExistingDragStart(index)}
                                                            onDragEnter={() => handleExistingDragEnter(index)}
                                                            onDragEnd={handleExistingDragEnd}
                                                            onDragOver={(e) => e.preventDefault()}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="relative group rounded-md overflow-hidden border p-1 bg-gray-50 shadow-sm"
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setImageToDelete(item?.product_media_id);  // Track the image to be deleted
                                                                    setShowConfirmModal(true);  // Show the confirmation modal
                                                                }}
                                                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs hidden group-hover:block"
                                                            >
                                                                ✕
                                                            </button>
                                                            <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center z-10">
                                                                {index + 1}
                                                            </span>
                                                            {item.media_type === "video" || fileExtension === "mp4" ? (
                                                                <video
                                                                    src={`http://192.168.1.7:8051/${item.file}`}
                                                                    controls
                                                                    className="w-full h-24 object-cover rounded-md"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={`http://192.168.1.7:8051/${item.file}`}
                                                                    alt={`media-${index}`}
                                                                    className="w-full h-24 object-cover rounded-md"
                                                                />
                                                            )}
                                                            <span className="text-xs block text-center mt-1 truncate">
                                                                {item.file?.name || `Media ${index + 1}`}{" "}
                                                                {item.media_type ? "" : `(${fileExtension?.toUpperCase()})`}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    ) : null}
                                </div>


                            </div>
                        </div>



                        <button
                            type="button"
                            onClick={() => {
                                if (viewMode == "edit") {
                                    handleEdit();
                                } else {
                                    handleSubmit();
                                }
                            }}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>


                    </form>



                </div>
            </div>
            {/* {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-md shadow-lg max-w-sm w-full">
                        <h3 className="text-lg mb-4">Are you sure you want to delete this image?</h3>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);  // Close the modal without deleting
                                }}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    removeImage(imageToDelete, "existing");  // Proceed with deletion
                                    setShowConfirmModal(false);  // Close the modal
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )} */}

            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                                <div className="bg-white ">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-medium text-gray">Delete</h3>
                                        <div onClick={() => {
                                            setShowConfirmModal(false);  // Close the modal without deleting
                                        }}>
                                            <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="pt-[14px] text-[#8492A6]">Are you sure you want to delete this user?</p>


                                </div>
                                <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                                    <button type="button" onClick={() => {
                                        removeImage(imageToDelete, "existing");  // Proceed with deletion
                                        setShowConfirmModal(false);  // Close the modal
                                    }} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Delete</button>
                                    <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={() => {
                                        setShowConfirmModal(false);  // Close the modal without deleting
                                    }} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default Add_product_Media
