import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import User_side_menu from '../Componenet/user_side_menu'
import EmployList from '../Componenet/EmployList'
import Service_side_menu from '../Componenet/service_side_menu'
import SubHeader from '../Componenet/sub_header'
import Dropdown from '../Componenet/dropdown'
import Searchdropdown from '../Componenet/searchdropdown'
import { ToastContainer, toast } from "react-toastify";
import { useGetSubCategoriesQuery, useGetCategoriesQuery, useGetProductQuery, useEditProductMutation } from "../services/apiSlice";
import InputField from "../Componenet/inputField";
import { Link } from "react-router-dom";

const daily_logs = () => {
    const [modal, setModal] = useState(null);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        is_active: "",
        is_home: "",
        category: "",
        subcategory_id: "",
    });




    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRefs = useRef([]);

    const openModal = (modalId) => setModal(modalId);
    const closeModal = () => setModal(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenside, setIsOpenside] = useState(false);

    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };


    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setform((prev) => ({
                ...prev,
                product_img: file // store file for form submission
            }));
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const handleImageClick = (imageUrl) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal1 = () => {
        setIsModalOpen(false);
        setModalImage("");
    };

    const navigate = useNavigate()


    //----------------------------------------------------------------------------------------------------


    const product_id = localStorage.getItem('product_id')
    console.log(product_id);
    const { data: products, error, isLoading } = useGetProductQuery({ product_id: product_id });
    const productData = products;
    console.log(productData);
    console.log(products);


    const [form, setform] = useState({
        product_img: null,
        category: "",
        subcategory: "",
        name: "",
        description: "",
        stock: "",
        // sku: "",
        manufacture_date: "",
        height_mm: "",
        width_mm: "",
        length_inches: "",
        product_weight_g: "",
        gender: "",
        is_ring_size: "True",
        trending: "True",
        bestseller: "True",
        authenticity: "True",
        product_media: "",
        gst: "",
        making_charges: "",
        // total_gst: "",
        // total_price: ""
    });

    console.log(products);

    // Sync form with fetched product data
    useEffect(() => {
        if (products?.product) {
            setform({
                product_img: products.product.product_img || "",
                category: products.product.category || "",
                subcategory: products.product.subcategory || "",
                name: products.product.name || "",
                description: products.product.description || "",
                stock: products.product.stock || "",
                // sku: products.product.sku || "",
                manufacture_date: products.product.manufacture_date || "",
                height_mm: products.product.height_mm || "",
                width_mm: products.product.width_mm || "",
                length_inches: products.product.length_inches || "",
                product_weight_g: products.product.product_weight_g || "",
                gender: products.product.gender || "",
                gst: products.product.gst || "",
                making_charges: products.product.making_charges || "",
                trending: products.product.trending ?? true,
                is_ring_size: products.product.is_ring_size ?? true,
                bestseller: products.product.bestseller ?? true,
                authenticity: products.product.authenticity ?? true,

            });

            if (products.product.product_img) {
                setSelectedImage(`${import.meta.env.VITE_API_BASE_URL}/${products.product.product_img}`);
            }
        }
    }, [products]);


    let categoryOptions = [];
    const { data: categories } = useGetCategoriesQuery();
    const cateData = categories?.data;
    console.log(cateData);

    if (categories?.data) {
        categoryOptions = categories?.data.map((val) => ({ id: val.category_id, name: val.name })); // Store objects
    }


    let subcategoryopation = [];
    const { data: subcate } = useGetSubCategoriesQuery({ category_id: form?.category });
    console.log(subcate?.data);

    if (subcate?.data) {
        // subcategoryopation = subcate?.data?.map((val) => ({ id: val?.subcategory_id, name: val?.name })); // Store objects
        subcategoryopation = subcate.data
            .filter((val) => val.category == form.category) // Use correct field
            .map((val) => ({
                id: val.subcategory_id,
                name: val.name,
            }));
        console.log(subcategoryopation);

    }


    const [update] = useEditProductMutation();
    const handlesubmit = async () => {
        try {
            // if (!form.product_img) return toast.error("Please upload a product image");
            // if (!form.category) return toast.error("Category is required");
            // if (!form.subcategory) return toast.error("Subcategory is required");
            // if (!form.name?.trim()) return toast.error("Product name is required");
            // if (!form.description?.trim()) return toast.error("Description is required");
            // if (!form.stock) return toast.error("Stock is required");
            // // if (!form.sku?.trim()) return toast.error("SKU is required");
            // if (!form.manufacture_date) return toast.error("Manufacture date is required");
            // if (!form.height_mm) return toast.error("Height (mm) is required");
            // if (!form.width_mm) return toast.error("Width (mm) is required");
            // if (!form.length_inches) return toast.error("Length (inches) is required");
            // if (!form.product_weight_g) return toast.error("Product weight is required");
            // if (!form.gender) return toast.error("Gender is required");
            // if (!form.gst) return toast.error("Gender is required");
            // if (!form.making_charges) return toast.error("Gender is required");

            const formdata = new FormData();

            let imageBlob = null;

            if (form.product_img instanceof File) {
                // ✅ User selected a new image
                imageBlob = form.product_img;
            } else if (typeof form.product_img === "string" && form.product_img.startsWith("http")) {
                // ✅ Image is an existing URL – fetch and convert to blob
                try {
                    const response = await fetch(form.product_img);
                    imageBlob = await response.blob();
                } catch (err) {
                    return toast.error("Failed to load existing image.");
                }
            } else {
                // ✅ No new image selected, and it's not a valid string URL — skip
                imageBlob = null;
            }

            // Append only if imageBlob is valid (i.e., image changed or needs sending)
            if (imageBlob) {
                formdata.append("product_img", imageBlob);
            }



            formdata.append('product_id', localStorage.getItem('product_id'));
            formdata.append('category_id', form.category);
            formdata.append('subcategory_id', form.subcategory);
            formdata.append('name', form.name.trim());
            formdata.append('description', form.description.trim());
            // formdata.append('stock', form.stock);
            // formdata.append('sku', form.sku.trim());
            formdata.append('gst', form.gst);
            // formdata.append('manufacture_date', form.manufacture_date);
            formdata.append('making_charges', form.making_charges);
            formdata.append('height_mm', String(form.height_mm));
            formdata.append('width_mm', String(form.width_mm));
            formdata.append('length_inches', String(form.length_inches));
            formdata.append('product_weight_g', String(form.product_weight_g));
            formdata.append('trending', form.trending ? "True" : "False");
            formdata.append('is_ring_size', form.is_ring_size ? "True" : "False");
            formdata.append('bestseller', form.bestseller ? "True" : "False");
            formdata.append('authenticity', form.authenticity ? "True" : "False");


            const response = await update(formdata).unwrap();
            toast.success(response?.message);
            setTimeout(() => {
                navigate('/product');
            }, 1500);
        } catch (err) {
            console.error("Update Error:", err);
            toast.error("Failed to update data");
        }
    };



    //    const [openDropdown, setOpenDropdown] = useState(null);
    //     const dropdownRefs = useRef({});

    const handleDropdownSelect = (field, value) => {
        let newValue;
        if (field === "gender") {
            newValue = value; // Keep "Male"/"Female"
        } else {
            newValue = value === "Active"; // Converts to true/false
        }

        setform((prev) => ({ ...prev, [field]: newValue }));
        setOpenDropdown(null);
    };

    const toggleDropdown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    };

    const [openDropdown1, setOpenDropdown1] = useState(null);

    const toggleDropdown1 = (label) => {
        setOpenDropdown1((prev) => (prev === label ? null : label));
    };





    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}

            />
            <User_side_menu setIsOpen={setIsOpen} isOpenside={isOpenside} />
            <div className='flex inter'>
                <EmployList isOpen={isOpen} setIsOpen={setIsOpen} />
                <Service_side_menu isOpenside={isOpenside} setIsOpenside={setIsOpenside} />
                <div className="w-full width__right relative max-md:ms-0">
                    <SubHeader setIsOpenside={setIsOpenside} pageName={"Product"} />
                    <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block" >
                        <h3 className="text-[24px] font-[700] "> Product Details</h3>

                        <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb" >
                            <ol className="flex flex-wrap items-center ">

                                <li className="flex items-center">
                                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/product" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Product</Link>
                                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-primary font-medium text-[12px]">Edit Product Details</li>
                            </ol>
                        </nav>
                    </div>
                    <div>
                        <div className=" mt-[20px]     border  bg-white border-[#EBE9F1] shadow-[0px_4px_24px_0px_#0000000F] rounded-[10px] p-[30px] space-y-[15px] max-md:p-[20px] max-sm:p-[10px]">
                            <div className="mb-6">
                                <h5 className="text-[22px] font-[700] ">Edit Product</h5>
                            </div>

                            <div className=" mx-auto   rounded-2xl ">

                                {/* <div className="flex flex-col md:flex-row justify-between ">

                                    <div className="flex flex-col items-center w-[25%]">
                                        <div className="w-full overflow-hidden bg-white flex items-center justify-center rounded-[10px]">
                                            {selectedImage || (form.product_img && typeof form.product_img === "string") ? (
                                                <img
                                                    src={selectedImage || `${import.meta.env.VITE_API_BASE_URL}/${form.product_img}`}
                                                    alt="Product Preview"
                                                    className="max-h-[450px] w-[100%] object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center border-dashed rounded-lg">
                                                    <span className="text-gray-500">No Image Available</span>
                                                </div>
                                            )}
                                        </div>




                                    </div>


                                    <div className="w-[75%]  flex items-center justify-center" >
                                        <div className="bg-white rounded-[10px]">

                                            <div className="mb-5">

                                                <label className="block text-sm font-medium text-gray">Product Name</label>

                                                <input
                                                    type="text"
                                                    value={form.name}
                                                    onChange={(e) => setform({ ...form, name: e.target.value })}
                                                    className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <label className="block text-sm font-medium text-gray">Product Image</label>

                                                <div className="mt-[10px] w-full flex flex-col items-center">
                                               
                                                    <div className="relative w-full flex items-center h-[35px] sm:h-[40px] px-[12px] sm:px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm cursor-pointer">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                                                        />
                                                        {selectedImage ? (
                                                            selectedImage
                                                        ) : (
                                                            'Choose Image'
                                                        )}
                                                    </div>


                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                <label className="block text-sm font-medium text-gray">Description</label>
                                                <textarea
                                                    value={form.description}
                                                    onChange={(e) => setform({ ...form, description: e.target.value })}
                                                    placeholder="Enter product description..."
                                                    rows={4} 
                                                    className="w-full px-[12px] sm:px-[15px] py-[10px] border mt-[10px] border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-5 ">
                                                <Searchdropdown
                                                    label="Category"
                                                    options={categoryOptions?.map((val) => val.name) || []}
                                                    main_color="text-gray"
                                                    value={
                                                        categoryOptions?.find((cat) => cat.id == form.category)?.name || ""
                                                    }
                                                    labelclassName="text-[#9CA3AF]"
                                                    onSelect={(value) => {
                                                        const selectedCategory = categories?.data.find(
                                                            (category) => category.name === value
                                                        );
                                                        console.log("Selected Category:", selectedCategory);
                                                        setform({ ...form, category: selectedCategory?.category_id });
                                                    }}
                                                />

                                                <Searchdropdown
                                                    label="Sub Category"
                                                    options={subcategoryopation?.map((val) => val.name) || []}
                                                    main_color="text-gray"
                                                    value={
                                                        subcategoryopation?.find((sub) => sub.id == form.subcategory)?.name || ""
                                                    }
                                                    labelclassName="text-[#9CA3AF]"
                                                    onSelect={(value) => {
                                                        const selectedSubcategory = subcate?.data.find(
                                                            (sub) => sub.name === value
                                                        );
                                                        console.log("Selected Subcategory:", selectedSubcategory);
                                                        setform({ ...form, subcategory: selectedSubcategory?.subcategory_id });
                                                    }}
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-5">
                                                <div>

                                                    <label className="block text-sm font-medium text-[19px] text-gray ">Stock</label>

                                                    <input
                                                        type="text"
                                                        value={form.stock}
                                                        onChange={(e) => setform({ ...form, stock: e.target.value })}
                                                        className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                </div>
                                                <div>

                                                    <label className="block text-sm font-medium text-gray">SKU</label>

                                                    <input
                                                        type="text"
                                                        value={form.sku}
                                                        onChange={(e) => setform({ ...form, sku: e.target.value })}
                                                        className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray">Manufacture Date</label>
                                                    <div className="relative">

                                                        <input type="date" value={form.manufacture_date}
                                                            onChange={(e) => setform({ ...form, manufacture_date: e.target.value })} onFocus={(e) => e.target.showPicker()} placeholder="dd/mm/yyyy" className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] dateInput sm:px-[15px] px-[12px] border border-[#C8C8C8] text-gray rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-[42%]" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                            <path d="M18.9708 16.6319C18.8984 16.1199 17.0712 4.33241 16.874 2.87698C16.7754 2.14329 16.1453 1.58208 15.3919 1.58208H13.5923V0.724709C13.5923 0.325115 13.2672 0 12.8676 0H12.7189C12.3193 0 11.9942 0.325115 11.9942 0.724709V1.58205H8.98385V0.724709C8.98385 0.325115 8.65873 0 8.25914 0H8.11048C7.71085 0 7.38577 0.325115 7.38577 0.724709V1.58205H4.37538V0.724709C4.37538 0.325115 4.05027 0 3.65067 0H3.50201C3.10238 0 2.7773 0.325115 2.7773 0.724709V1.58205H1.49595C0.671086 1.58205 0 2.25313 0 3.07796V16.9739C0 17.7987 0.671086 18.4698 1.49595 18.4698H17.524C18.1474 18.4698 18.7115 18.0771 18.9268 17.4945C18.9561 17.4169 19.0458 17.126 18.9708 16.6319ZM12.5517 0.724709C12.5518 0.680366 12.5694 0.637853 12.6008 0.606498C12.6321 0.575143 12.6746 0.557506 12.719 0.557457H12.8676C12.912 0.557506 12.9545 0.575143 12.9858 0.606498C13.0172 0.637853 13.0348 0.680366 13.0349 0.724709V3.20239C13.0348 3.24673 13.0172 3.28925 12.9858 3.3206C12.9545 3.35196 12.912 3.36959 12.8676 3.36964H12.719C12.6746 3.36959 12.6321 3.35196 12.6008 3.3206C12.5694 3.28925 12.5518 3.24673 12.5517 3.20239V0.724709ZM12.1623 3.66585C12.1751 3.68125 12.1887 3.69591 12.2028 3.71016C12.2051 3.7125 12.2073 3.71487 12.2097 3.71717C12.2239 3.73135 12.2389 3.74482 12.2543 3.75773L12.2628 3.76475C12.2785 3.77751 12.2946 3.78965 12.3113 3.80104C12.3139 3.80278 12.3165 3.80445 12.3191 3.80616C12.3367 3.81778 12.3546 3.82891 12.3732 3.839C12.3741 3.83952 12.3751 3.83997 12.3761 3.84052C12.3946 3.85047 12.4135 3.8596 12.4329 3.86795L12.4391 3.87069C12.4584 3.87873 12.4781 3.88593 12.498 3.89229C12.5013 3.89337 12.5046 3.89448 12.508 3.89548C12.5518 3.90874 12.5966 3.9179 12.6421 3.92283C12.6449 3.92313 12.6477 3.92328 12.6505 3.92357C12.6731 3.92569 12.6959 3.92703 12.7189 3.92703H12.8676C12.8907 3.92703 12.9134 3.92569 12.936 3.92357C12.9388 3.92331 12.9417 3.92317 12.9445 3.92283C12.9693 3.92017 12.994 3.91622 13.0184 3.91099C13.0388 3.90665 13.0589 3.90153 13.0785 3.89548L13.0886 3.89229C13.1086 3.88587 13.1283 3.87875 13.1474 3.87069L13.1536 3.86795C13.1729 3.85965 13.1919 3.8505 13.2105 3.84052C13.2114 3.84 13.2124 3.83956 13.2134 3.839C13.232 3.82891 13.2499 3.81778 13.2674 3.80616C13.27 3.80445 13.2726 3.80278 13.2752 3.80104C13.2919 3.78965 13.3081 3.77747 13.3238 3.76475L13.3322 3.75773C13.3477 3.74478 13.3626 3.73135 13.3769 3.71717C13.3792 3.71487 13.3815 3.7125 13.3838 3.71016C13.3977 3.69591 13.4114 3.68125 13.4242 3.66585C13.4247 3.67591 13.4249 3.68596 13.4249 3.69606C13.4249 4.04444 13.1415 4.32784 12.7931 4.32784C12.4447 4.32784 12.1613 4.04444 12.1613 3.69606C12.1615 3.68596 12.1617 3.67591 12.1623 3.66585ZM7.9433 0.724709C7.94335 0.680366 7.96098 0.637853 7.99234 0.606498C8.02369 0.575143 8.06621 0.557506 8.11055 0.557457H8.25921C8.30355 0.557506 8.34607 0.575143 8.37742 0.606498C8.40878 0.637853 8.42641 0.680366 8.42646 0.724709V3.20239C8.42641 3.24673 8.40878 3.28925 8.37742 3.3206C8.34607 3.35196 8.30355 3.36959 8.25921 3.36964H8.11055C8.06621 3.36959 8.02369 3.35196 7.99234 3.3206C7.96098 3.28925 7.94335 3.24673 7.9433 3.20239V0.724709ZM7.55376 3.66585C7.5666 3.68125 7.58022 3.69591 7.59425 3.71016C7.59655 3.7125 7.59881 3.71487 7.60115 3.71717C7.61544 3.73135 7.63036 3.74482 7.64579 3.75773L7.65429 3.76475C7.66995 3.77751 7.68609 3.78965 7.70283 3.80104C7.70539 3.80278 7.70803 3.80445 7.71062 3.80616C7.72818 3.81778 7.7461 3.82891 7.76465 3.839C7.76562 3.83952 7.76662 3.83997 7.76759 3.84052C7.78607 3.85047 7.80507 3.8596 7.82444 3.86795L7.8306 3.87069C7.84991 3.87873 7.86956 3.88593 7.88949 3.89229C7.89283 3.89337 7.89613 3.89448 7.89951 3.89548C7.94326 3.90874 7.98814 3.9179 8.03359 3.92283C8.03641 3.92313 8.03923 3.92328 8.04208 3.92357C8.06461 3.92569 8.08739 3.92703 8.11048 3.92703H8.25914C8.28222 3.92703 8.30497 3.92569 8.32753 3.92357C8.33035 3.92331 8.33321 3.92317 8.33603 3.92283C8.36086 3.92017 8.38553 3.91622 8.40995 3.91099C8.43036 3.90665 8.45044 3.90153 8.4701 3.89548L8.48012 3.89229C8.50012 3.88587 8.51983 3.87875 8.53902 3.87069L8.54518 3.86795C8.56452 3.85965 8.58349 3.8505 8.60203 3.84052C8.60299 3.84 8.60399 3.83956 8.60496 3.839C8.62351 3.82891 8.64144 3.81778 8.65899 3.80616C8.66159 3.80445 8.66422 3.80278 8.66678 3.80104C8.68352 3.78965 8.69963 3.77747 8.71532 3.76475L8.72382 3.75773C8.73926 3.74478 8.75414 3.73135 8.76846 3.71717C8.7708 3.71487 8.77306 3.7125 8.77537 3.71016C8.78928 3.69591 8.8029 3.68125 8.81574 3.66585C8.81622 3.67591 8.81648 3.68596 8.81648 3.69606C8.81648 4.04444 8.53308 4.32784 8.18466 4.32784C7.83624 4.32784 7.55283 4.04444 7.55283 3.69606C7.55306 3.68596 7.55328 3.67591 7.55376 3.66585ZM3.3348 0.724709C3.33485 0.680366 3.35248 0.637853 3.38384 0.606498C3.41519 0.575143 3.45771 0.557506 3.50205 0.557457H3.65071C3.69505 0.557506 3.73756 0.575143 3.76892 0.606498C3.80027 0.637853 3.81791 0.680366 3.81796 0.724709V3.20239C3.81791 3.24673 3.80027 3.28925 3.76892 3.3206C3.73756 3.35196 3.69505 3.36959 3.65071 3.36964H3.50201C3.45767 3.36959 3.41516 3.35196 3.3838 3.3206C3.35245 3.28925 3.33481 3.24673 3.33476 3.20239L3.3348 0.724709ZM3.15619 3.83908C3.15715 3.8396 3.15816 3.84004 3.15912 3.8406C3.1776 3.85054 3.1966 3.85967 3.21597 3.86802L3.22213 3.87077C3.24145 3.8788 3.2611 3.88601 3.28103 3.89237C3.28437 3.89344 3.28767 3.89455 3.29101 3.89556C3.33475 3.90882 3.37964 3.91797 3.42508 3.92291C3.4279 3.9232 3.43072 3.92335 3.43358 3.92365C3.45611 3.92576 3.47889 3.9271 3.50197 3.9271H3.65063C3.67372 3.9271 3.69647 3.92576 3.71903 3.92365C3.72185 3.92339 3.7247 3.92324 3.72753 3.92291C3.75235 3.92025 3.77703 3.91629 3.80145 3.91107C3.82186 3.90673 3.84193 3.90161 3.8616 3.89556L3.87162 3.89237C3.89162 3.88595 3.91133 3.87882 3.93051 3.87077L3.93667 3.86802C3.95602 3.85972 3.97499 3.85057 3.99353 3.8406C3.99449 3.84008 3.99549 3.83963 3.99646 3.83908C4.01501 3.82898 4.03297 3.81785 4.05049 3.80623C4.05309 3.80453 4.05572 3.80286 4.05828 3.80111C4.07502 3.78972 4.09112 3.77755 4.10682 3.76482L4.11532 3.75781C4.13076 3.74486 4.14564 3.73142 4.15996 3.71725C4.1623 3.71495 4.16456 3.71257 4.16686 3.71023C4.18082 3.69595 4.19444 3.68129 4.20728 3.66589C4.20776 3.67594 4.20802 3.686 4.20802 3.69609C4.20802 4.04448 3.92461 4.32788 3.57619 4.32788C3.21527 4.32788 2.9276 4.0247 2.94515 3.66585C3.00424 3.73608 3.07579 3.79481 3.15619 3.83908ZM0.557494 3.07796C0.557494 2.56051 0.9785 2.1395 1.49599 2.1395H2.77738V2.81579C1.97492 3.54495 2.49253 4.88534 3.57642 4.88534C4.23218 4.88534 4.7657 4.35182 4.7657 3.69606C4.7657 3.35896 4.62201 3.03978 4.37545 2.81575V2.13954H7.38584V2.81582C7.13929 3.03985 6.9956 3.35899 6.9956 3.69609C6.9956 4.35189 7.52912 4.88538 8.18488 4.88538C8.84064 4.88538 9.37416 4.35185 9.37416 3.69609C9.37416 3.35899 9.23047 3.03981 8.98392 2.81579V2.13954H11.9943V2.81582C11.7478 3.03985 11.6041 3.35899 11.6041 3.69609C11.6041 4.35189 12.1376 4.88538 12.7933 4.88538C13.4491 4.88538 13.9826 4.35185 13.9826 3.69609C13.9826 3.35899 13.8389 3.03981 13.5924 2.81579V2.13954H15.392C15.9095 2.13954 16.3305 2.56055 16.3305 3.078V5.926H0.557494V3.07796ZM18.4046 17.2992C18.2691 17.666 17.9152 17.9124 17.524 17.9124H16.5557C16.7632 17.6556 16.8878 17.3291 16.8878 16.9739V13.2822C16.8878 13.2082 16.8585 13.1373 16.8062 13.0851C16.7539 13.0328 16.683 13.0034 16.6091 13.0034C16.5352 13.0034 16.4643 13.0328 16.412 13.0851C16.3598 13.1373 16.3304 13.2082 16.3304 13.2822V16.9739C16.3304 17.4914 15.9093 17.9124 15.3919 17.9124H1.49595C0.978463 17.9124 0.557457 17.4914 0.557457 16.9739V7.52411H7.53632C7.61024 7.52411 7.68114 7.49474 7.73341 7.44247C7.78568 7.3902 7.81505 7.31931 7.81505 7.24538C7.81505 7.17146 7.78568 7.10056 7.73341 7.04829C7.68114 6.99602 7.61024 6.96665 7.53632 6.96665H0.557494V6.48349H16.3305V6.96665H8.83337C8.75944 6.96665 8.68855 6.99602 8.63628 7.04829C8.584 7.10056 8.55464 7.17146 8.55464 7.24538C8.55464 7.31931 8.584 7.3902 8.63628 7.44247C8.68855 7.49474 8.75944 7.52411 8.83337 7.52411H16.3305V11.9814C16.3305 12.0553 16.3598 12.1262 16.4121 12.1785C16.4644 12.2308 16.5353 12.2601 16.6092 12.2601C16.6831 12.2601 16.754 12.2308 16.8063 12.1785C16.8586 12.1262 16.8879 12.0553 16.8879 11.9814V6.73257L18.4185 16.708L18.4191 16.7122C18.4781 17.0966 18.4061 17.2953 18.4046 17.2992Z" fill="#0057AD"></path>
                                                            <path d="M6.35253 8.95313H5.43486C5.36093 8.95313 5.29004 8.98249 5.23777 9.03476C5.18549 9.08703 5.15613 9.15793 5.15613 9.23185C5.15613 9.30578 5.18549 9.37667 5.23777 9.42894C5.29004 9.48122 5.36093 9.51058 5.43486 9.51058H6.35253C6.38914 9.51059 6.42539 9.50338 6.4592 9.48937C6.49302 9.47537 6.52375 9.45484 6.54964 9.42896C6.57552 9.40307 6.59605 9.37234 6.61006 9.33852C6.62406 9.3047 6.63127 9.26846 6.63126 9.23185C6.63127 9.19525 6.62406 9.159 6.61006 9.12518C6.59605 9.09136 6.57552 9.06064 6.54964 9.03475C6.52375 9.00887 6.49302 8.98834 6.4592 8.97433C6.42539 8.96033 6.38914 8.95312 6.35253 8.95313ZM8.90377 8.95313H7.98598C7.91205 8.95313 7.84116 8.98249 7.78889 9.03476C7.73662 9.08703 7.70725 9.15793 7.70725 9.23185C7.70725 9.30578 7.73662 9.37667 7.78889 9.42894C7.84116 9.48122 7.91205 9.51058 7.98598 9.51058H8.90377C8.94037 9.51059 8.97662 9.50338 9.01044 9.48937C9.04426 9.47537 9.07499 9.45484 9.10087 9.42896C9.12675 9.40307 9.14728 9.37234 9.16129 9.33852C9.17529 9.3047 9.1825 9.26846 9.1825 9.23185C9.1825 9.19525 9.17529 9.159 9.16129 9.12518C9.14728 9.09136 9.12675 9.06064 9.10087 9.03475C9.07499 9.00887 9.04426 8.98834 9.01044 8.97433C8.97662 8.96033 8.94037 8.95312 8.90377 8.95313ZM11.455 8.95313H10.5372C10.4633 8.95313 10.3924 8.98249 10.3401 9.03476C10.2878 9.08703 10.2585 9.15793 10.2585 9.23185C10.2585 9.30578 10.2878 9.37667 10.3401 9.42894C10.3924 9.48122 10.4633 9.51058 10.5372 9.51058H11.455C11.529 9.51058 11.5999 9.48122 11.6521 9.42894C11.7044 9.37667 11.7338 9.30578 11.7338 9.23185C11.7338 9.15793 11.7044 9.08703 11.6521 9.03476C11.5999 8.98249 11.529 8.95313 11.455 8.95313ZM14.0062 8.95313H13.0884C13.0144 8.95313 12.9435 8.98249 12.8913 9.03476C12.839 9.08703 12.8096 9.15793 12.8096 9.23185C12.8096 9.30578 12.839 9.37667 12.8913 9.42894C12.9435 9.48122 13.0144 9.51058 13.0884 9.51058H14.0062C14.0428 9.51059 14.079 9.50338 14.1128 9.48937C14.1466 9.47537 14.1774 9.45484 14.2033 9.42896C14.2291 9.40307 14.2497 9.37234 14.2637 9.33852C14.2777 9.3047 14.2849 9.26846 14.2849 9.23185C14.2849 9.19525 14.2777 9.159 14.2637 9.12518C14.2497 9.09136 14.2291 9.06064 14.2033 9.03475C14.1774 9.00887 14.1466 8.98834 14.1128 8.97433C14.079 8.96033 14.0428 8.95312 14.0062 8.95313ZM3.80138 11.1988H2.88359C2.80966 11.1988 2.73877 11.2282 2.6865 11.2805C2.63422 11.3327 2.60486 11.4036 2.60486 11.4776C2.60486 11.5515 2.63422 11.6224 2.6865 11.6747C2.73877 11.7269 2.80966 11.7563 2.88359 11.7563H3.80138C3.83798 11.7563 3.87423 11.7491 3.90805 11.7351C3.94187 11.7211 3.97259 11.7005 3.99848 11.6747C4.02436 11.6488 4.04489 11.6181 4.0589 11.5842C4.0729 11.5504 4.08011 11.5142 4.0801 11.4776C4.08011 11.441 4.07291 11.4047 4.05891 11.3709C4.0449 11.3371 4.02437 11.3063 3.99849 11.2805C3.9726 11.2546 3.94187 11.234 3.90805 11.22C3.87423 11.206 3.83798 11.1988 3.80138 11.1988ZM6.35253 11.1988H5.43486C5.36093 11.1988 5.29004 11.2282 5.23777 11.2805C5.18549 11.3327 5.15613 11.4036 5.15613 11.4776C5.15613 11.5515 5.18549 11.6224 5.23777 11.6747C5.29004 11.7269 5.36093 11.7563 5.43486 11.7563H6.35253C6.38914 11.7563 6.42539 11.7491 6.4592 11.7351C6.49302 11.7211 6.52375 11.7005 6.54964 11.6747C6.57552 11.6488 6.59605 11.6181 6.61006 11.5842C6.62406 11.5504 6.63127 11.5142 6.63126 11.4776C6.63127 11.441 6.62406 11.4047 6.61006 11.3709C6.59605 11.3371 6.57552 11.3063 6.54964 11.2805C6.52375 11.2546 6.49302 11.234 6.4592 11.22C6.42539 11.206 6.38914 11.1988 6.35253 11.1988ZM8.90377 11.1988H7.98598C7.91205 11.1988 7.84116 11.2282 7.78889 11.2805C7.73662 11.3327 7.70725 11.4036 7.70725 11.4776C7.70725 11.5515 7.73662 11.6224 7.78889 11.6747C7.84116 11.7269 7.91205 11.7563 7.98598 11.7563H8.90377C8.94037 11.7563 8.97662 11.7491 9.01044 11.7351C9.04426 11.7211 9.07499 11.7005 9.10087 11.6747C9.12675 11.6488 9.14728 11.6181 9.16129 11.5842C9.17529 11.5504 9.1825 11.5142 9.1825 11.4776C9.1825 11.441 9.1753 11.4047 9.1613 11.3709C9.14729 11.3371 9.12676 11.3063 9.10088 11.2805C9.07499 11.2546 9.04426 11.234 9.01044 11.22C8.97662 11.206 8.94037 11.1988 8.90377 11.1988ZM11.455 11.1988H10.5372C10.4633 11.1988 10.3924 11.2282 10.3401 11.2805C10.2878 11.3327 10.2585 11.4036 10.2585 11.4776C10.2585 11.5515 10.2878 11.6224 10.3401 11.6747C10.3924 11.7269 10.4633 11.7563 10.5372 11.7563H11.455C11.529 11.7563 11.5999 11.7269 11.6521 11.6747C11.7044 11.6224 11.7338 11.5515 11.7338 11.4776C11.7338 11.4036 11.7044 11.3327 11.6521 11.2805C11.5999 11.2282 11.529 11.1988 11.455 11.1988ZM14.0062 11.1988H13.0884C13.0144 11.1988 12.9435 11.2282 12.8913 11.2805C12.839 11.3327 12.8096 11.4036 12.8096 11.4776C12.8096 11.5515 12.839 11.6224 12.8913 11.6747C12.9435 11.7269 13.0144 11.7563 13.0884 11.7563H14.0062C14.0428 11.7563 14.079 11.7491 14.1128 11.7351C14.1466 11.7211 14.1774 11.7005 14.2033 11.6747C14.2291 11.6488 14.2497 11.6181 14.2637 11.5842C14.2777 11.5504 14.2849 11.5142 14.2849 11.4776C14.2849 11.441 14.2777 11.4047 14.2637 11.3709C14.2497 11.3371 14.2292 11.3063 14.2033 11.2805C14.1774 11.2546 14.1467 11.234 14.1128 11.22C14.079 11.206 14.0428 11.1988 14.0062 11.1988ZM3.80138 13.4446H2.88359C2.80966 13.4446 2.73877 13.4739 2.6865 13.5262C2.63422 13.5785 2.60486 13.6494 2.60486 13.7233C2.60486 13.7972 2.63422 13.8681 2.6865 13.9204C2.73877 13.9727 2.80966 14.002 2.88359 14.002H3.80138C3.83798 14.002 3.87423 13.9948 3.90805 13.9808C3.94187 13.9668 3.97259 13.9463 3.99848 13.9204C4.02436 13.8945 4.04489 13.8638 4.0589 13.83C4.0729 13.7962 4.08011 13.7599 4.0801 13.7233C4.08011 13.6867 4.0729 13.6505 4.0589 13.6166C4.04489 13.5828 4.02436 13.5521 3.99848 13.5262C3.97259 13.5003 3.94187 13.4798 3.90805 13.4658C3.87423 13.4518 3.83798 13.4446 3.80138 13.4446ZM6.35253 13.4446H5.43486C5.36093 13.4446 5.29004 13.4739 5.23777 13.5262C5.18549 13.5785 5.15613 13.6494 5.15613 13.7233C5.15613 13.7972 5.18549 13.8681 5.23777 13.9204C5.29004 13.9727 5.36093 14.002 5.43486 14.002H6.35253C6.38914 14.002 6.42539 13.9948 6.4592 13.9808C6.49302 13.9668 6.52375 13.9463 6.54964 13.9204C6.57552 13.8945 6.59605 13.8638 6.61006 13.83C6.62406 13.7962 6.63127 13.7599 6.63126 13.7233C6.63127 13.6867 6.62406 13.6505 6.61006 13.6166C6.59605 13.5828 6.57552 13.5521 6.54964 13.5262C6.52375 13.5003 6.49302 13.4798 6.4592 13.4658C6.42539 13.4518 6.38914 13.4446 6.35253 13.4446ZM8.90377 13.4446H7.98598C7.91205 13.4446 7.84116 13.4739 7.78889 13.5262C7.73662 13.5785 7.70725 13.6494 7.70725 13.7233C7.70725 13.7972 7.73662 13.8681 7.78889 13.9204C7.84116 13.9727 7.91205 14.002 7.98598 14.002H8.90377C8.94037 14.002 8.97662 13.9948 9.01044 13.9808C9.04426 13.9668 9.07499 13.9463 9.10087 13.9204C9.12675 13.8945 9.14728 13.8638 9.16129 13.83C9.17529 13.7962 9.1825 13.7599 9.1825 13.7233C9.1825 13.6867 9.17529 13.6505 9.16129 13.6166C9.14728 13.5828 9.12675 13.5521 9.10087 13.5262C9.07499 13.5003 9.04426 13.4798 9.01044 13.4658C8.97662 13.4518 8.94037 13.4446 8.90377 13.4446ZM11.455 13.4446H10.5372C10.4633 13.4446 10.3924 13.4739 10.3401 13.5262C10.2878 13.5785 10.2585 13.6494 10.2585 13.7233C10.2585 13.7972 10.2878 13.8681 10.3401 13.9204C10.3924 13.9727 10.4633 14.002 10.5372 14.002H11.455C11.529 14.002 11.5999 13.9727 11.6521 13.9204C11.7044 13.8681 11.7338 13.7972 11.7338 13.7233C11.7338 13.6494 11.7044 13.5785 11.6521 13.5262C11.5999 13.4739 11.529 13.4446 11.455 13.4446ZM14.0062 13.4446H13.0884C13.0144 13.4446 12.9435 13.4739 12.8913 13.5262C12.839 13.5785 12.8096 13.6494 12.8096 13.7233C12.8096 13.7972 12.839 13.8681 12.8913 13.9204C12.9435 13.9727 13.0144 14.002 13.0884 14.002H14.0062C14.0428 14.002 14.079 13.9948 14.1128 13.9808C14.1466 13.9668 14.1774 13.9463 14.2033 13.9204C14.2291 13.8945 14.2497 13.8638 14.2637 13.83C14.2777 13.7962 14.2849 13.7599 14.2849 13.7233C14.2849 13.6867 14.2777 13.6505 14.2637 13.6166C14.2497 13.5828 14.2291 13.5521 14.2033 13.5262C14.1774 13.5003 14.1466 13.4798 14.1128 13.4658C14.079 13.4518 14.0428 13.4446 14.0062 13.4446ZM3.80138 15.6904H2.88359C2.80966 15.6904 2.73877 15.7197 2.6865 15.772C2.63422 15.8243 2.60486 15.8952 2.60486 15.9691C2.60486 16.043 2.63422 16.1139 2.6865 16.1662C2.73877 16.2185 2.80966 16.2478 2.88359 16.2478H3.80138C3.83798 16.2478 3.87423 16.2406 3.90805 16.2266C3.94187 16.2126 3.97259 16.1921 3.99848 16.1662C4.02436 16.1403 4.04489 16.1096 4.0589 16.0758C4.0729 16.0419 4.08011 16.0057 4.0801 15.9691C4.08011 15.9325 4.0729 15.8962 4.0589 15.8624C4.04489 15.8286 4.02436 15.7979 3.99848 15.772C3.97259 15.7461 3.94187 15.7256 3.90805 15.7116C3.87423 15.6976 3.83798 15.6904 3.80138 15.6904ZM6.35253 15.6904H5.43486C5.36093 15.6904 5.29004 15.7197 5.23777 15.772C5.18549 15.8243 5.15613 15.8952 5.15613 15.9691C5.15613 16.043 5.18549 16.1139 5.23777 16.1662C5.29004 16.2185 5.36093 16.2478 5.43486 16.2478H6.35253C6.38914 16.2478 6.42539 16.2406 6.4592 16.2266C6.49302 16.2126 6.52375 16.1921 6.54964 16.1662C6.57552 16.1403 6.59605 16.1096 6.61006 16.0758C6.62406 16.0419 6.63127 16.0057 6.63126 15.9691C6.63127 15.9325 6.62406 15.8962 6.61006 15.8624C6.59605 15.8286 6.57552 15.7979 6.54964 15.772C6.52375 15.7461 6.49302 15.7256 6.4592 15.7116C6.42539 15.6976 6.38914 15.6904 6.35253 15.6904ZM8.90377 15.6904H7.98598C7.91205 15.6904 7.84116 15.7197 7.78889 15.772C7.73662 15.8243 7.70725 15.8952 7.70725 15.9691C7.70725 16.043 7.73662 16.1139 7.78889 16.1662C7.84116 16.2185 7.91205 16.2478 7.98598 16.2478H8.90377C8.94037 16.2478 8.97662 16.2406 9.01044 16.2266C9.04426 16.2126 9.07499 16.1921 9.10087 16.1662C9.12675 16.1403 9.14728 16.1096 9.16129 16.0758C9.17529 16.0419 9.1825 16.0057 9.1825 15.9691C9.1825 15.9325 9.17529 15.8962 9.16129 15.8624C9.14728 15.8286 9.12675 15.7979 9.10087 15.772C9.07499 15.7461 9.04426 15.7256 9.01044 15.7116C8.97662 15.6976 8.94037 15.6904 8.90377 15.6904ZM11.455 15.6904H10.5372C10.4633 15.6904 10.3924 15.7197 10.3401 15.772C10.2878 15.8243 10.2585 15.8952 10.2585 15.9691C10.2585 16.043 10.2878 16.1139 10.3401 16.1662C10.3924 16.2185 10.4633 16.2478 10.5372 16.2478H11.455C11.529 16.2478 11.5999 16.2185 11.6521 16.1662C11.7044 16.1139 11.7338 16.043 11.7338 15.9691C11.7338 15.8952 11.7044 15.8243 11.6521 15.772C11.5999 15.7197 11.529 15.6904 11.455 15.6904Z" fill="#0057AD"></path>
                                                        </svg>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-4 gap-4 max-md:grid-2 mb-5">
                                                <div>

                                                    <label className="block text-sm font-medium text-gray">Height MM</label>

                                                    <input
                                                        type="text"
                                                        value={form.height_mm}
                                                        onChange={(e) => setform({ ...form, height_mm: e.target.value })}
                                                        className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                </div>
                                                <div>

                                                    <label className="block text-sm font-medium text-gray">Width MM</label>

                                                    <input
                                                        type="text"
                                                        value={form.width_mm}
                                                        onChange={(e) => setform({ ...form, width_mm: e.target.value })}
                                                        className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                </div>
                                                <div>

                                                    <label className="block text-sm font-medium text-gray">Length Inches</label>

                                                    <input
                                                        type="text"
                                                        value={form.length_inches}
                                                        onChange={(e) => setform({ ...form, length_inches: e.target.value })}
                                                        className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                </div>
                                                <div>

                                                    <label className="block text-sm font-medium text-gray">Product Weight (g)</label>

                                                    <input
                                                        type="text"
                                                        value={form.product_weight_g}
                                                        onChange={(e) => setform({ ...form, product_weight_g: e.target.value })}
                                                        className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                </div>

                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mb-5">

                                                <div>

                                                    <label className="block text-sm font-medium text-gray">Gender</label>

                                                    <input
                                                        type="text"
                                                        value={form.gender}
                                                        onChange={(e) => setform({ ...form, gender: e.target.value })}
                                                        className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] sm:px-[15px] px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500"
                                                    />

                                                </div>

                                                <Dropdown
                                                    label="Trending "
                                                    options={[
                                                        "Active",
                                                        "Inactive",
                                                    ]}
                                                    defaultValue="Trending"
                                                    value={form.trending == true ? 'Active' : 'Inactive'}
                                                    onSelect={(value) => setform({ ...form, trending: value == 'Active' ? 'True' : 'False' })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 mb-4 gap-5">

                                                <Dropdown
                                                    label="Bestseller "
                                                    options={[
                                                        "Active",
                                                        "Inactive",
                                                    ]}
                                                    defaultValue="Bestseller"
                                                    value={form.bestseller == true ? 'Active' : 'Inactive'}
                                                    onSelect={(value) => setform({ ...form, bestseller: value == 'Active' ? 'True' : 'False' })}
                                                />
                                                <Dropdown
                                                    label="Authenticity "
                                                    options={[
                                                        "Active",
                                                        "Inactive",
                                                    ]}
                                                    defaultValue="Authenticity"
                                                    value={form.authenticity == true ? 'Active' : 'Inactive'}
                                                    onSelect={(value) => setform({ ...form, authenticity: value == 'Active' ? 'True' : 'False' })}
                                                />
                                            </div>




                                        </div>
                                    </div>
                                </div> */}

                                <div className="flex  gap-6 max-xl:block">
                                    {/* Left Column - Image Upload */}
                                    <div className="flex flex-col w-[30%] max-xl:w-[50%] max-lg:w-[100%] items-center max-lg:mb-[20px]">
                                        {/* Hidden File Input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />

                                        {/* Image Upload Area */}
                                        <div
                                            className="w-full overflow-hidden bg-white flex items-center justify-center rounded-[10px] cursor-pointer"
                                            onClick={handleUploadClick}
                                        >
                                            {selectedImage || (form.product_img && typeof form.product_img === "string") ? (
                                                <img
                                                    src={selectedImage || `${import.meta.env.VITE_API_BASE_URL}/${form.product_img}`}
                                                    alt="Product Preview"
                                                    className="max-h-[500px] max-lg:h-[250px] max-lg:w-[250px] w-full object-contain"
                                                />
                                            ) : (
                                                <div className="w-full min-h-[350px] max-lg:min-h-[250px] max-lg:w-[250px] bg-gray-200 flex items-center justify-center border-2 border-dashed rounded-lg">
                                                    <span className="text-gray-500 text-sm">Click to upload image</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                    {/* Right Column - Product Info Form */}
                                    <div className="w-[70%]  bg-white rounded-[10px] p-4 max-xl:w-[100%]">
                                        <div className="mb-[60px]">
                                            <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5 ">
                                                <h5 className="font-bold text-gray-400">General Information</h5>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray">Product Name</label>
                                                <input
                                                    type="text"
                                                    value={form.name}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setform({ ...form, name: value });

                                                    }}
                                                    className="mt-[10px] w-full h-[40px] px-[15px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] text-sm focus:ring-blue-500 focus:border-blue-500"
                                                />

                                            </div>


                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray">Description</label>
                                                <textarea
                                                    value={form.description}
                                                    onChange={(e) => setform({ ...form, description: e.target.value })}
                                                    rows={4}
                                                    placeholder="Enter product description..."
                                                    className="w-full mt-[10px] px-[15px] py-[10px] border border-[#C8C8C8] rounded-lg text-sm text-[#9CA3AF]  focus:ring-blue-500 focus:border-blue-500 resize-y"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 ">
                                                {/* Category Dropdown */}
                                                <Searchdropdown
                                                    label="Category"
                                                    onToggle={toggleDropdown1}
                                                    isOpen={openDropdown1 === "Category"}
                                                    options={categoryOptions?.map((val) => val.name) || []}
                                                    value={categoryOptions?.find((cat) => cat.id == form.category)?.name || ""}
                                                    onSelect={(value) => {
                                                        const selectedCategory = categories?.data.find((cat) => cat.name == value);
                                                        setform({ ...form, category: selectedCategory?.category_id });
                                                    }}
                                                />

                                                {/* Subcategory Dropdown */}
                                                <Searchdropdown
                                                    label="Sub Category"
                                                    onToggle={toggleDropdown1}
                                                    isOpen={openDropdown1 === "Sub Category"}
                                                    options={subcategoryopation?.map((val) => val.name) || []}
                                                    value={subcategoryopation?.find((sub) => sub.id == form.subcategory)?.name || ""}
                                                    onSelect={(value) => {
                                                        const selectedSubcategory = subcate?.data.find((sub) => sub.name === value);
                                                        setform({ ...form, subcategory: selectedSubcategory?.subcategory_id });
                                                    }}
                                                />

                                                <div>


                                                    <Dropdown
                                                        label="Gender"
                                                        options={["Male", "Female"]}
                                                        value={form.gender}
                                                        onSelect={(val) => handleDropdownSelect("gender", val)}
                                                        isOpen={openDropdown === 0}
                                                        onToggle={() => toggleDropdown(0)}
                                                        ref={(el) => (dropdownRefs.current[0] = el)}
                                                    />




                                                </div>
                                            </div>


                                        </div>

                                        {/* <div className="mb-[60px]">
                                            <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5">
                                                <h5 className="font-bold"> Stock</h5>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-2">
                                                <InputField label="Stock" type="number" value={form.stock} onChange={(val) => setform({ ...form, stock: val })} />
                                                <div className="relative">
                                                    <label className="block text-sm font-medium text-gray">Manufacture Date</label>

                                                    <input type="date" value={form.manufacture_date}
                                                        onChange={(e) => setform({ ...form, manufacture_date: e.target.value })} onFocus={(e) => e.target.showPicker()} placeholder="dd/mm/yyyy" className="mt-[10px] w-[100%]  h-[35px] sm:h-[40px] dateInput sm:px-[15px] px-[12px] border border-[#C8C8C8] text-gray rounded-[7px] bg-transparent  text-sm focus:ring-blue-500 focus:border-blue-500" />
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-[55%]" onFocus={(e) => e.target.showPicker()} width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                        <path d="M18.9708 16.6319C18.8984 16.1199 17.0712 4.33241 16.874 2.87698C16.7754 2.14329 16.1453 1.58208 15.3919 1.58208H13.5923V0.724709C13.5923 0.325115 13.2672 0 12.8676 0H12.7189C12.3193 0 11.9942 0.325115 11.9942 0.724709V1.58205H8.98385V0.724709C8.98385 0.325115 8.65873 0 8.25914 0H8.11048C7.71085 0 7.38577 0.325115 7.38577 0.724709V1.58205H4.37538V0.724709C4.37538 0.325115 4.05027 0 3.65067 0H3.50201C3.10238 0 2.7773 0.325115 2.7773 0.724709V1.58205H1.49595C0.671086 1.58205 0 2.25313 0 3.07796V16.9739C0 17.7987 0.671086 18.4698 1.49595 18.4698H17.524C18.1474 18.4698 18.7115 18.0771 18.9268 17.4945C18.9561 17.4169 19.0458 17.126 18.9708 16.6319ZM12.5517 0.724709C12.5518 0.680366 12.5694 0.637853 12.6008 0.606498C12.6321 0.575143 12.6746 0.557506 12.719 0.557457H12.8676C12.912 0.557506 12.9545 0.575143 12.9858 0.606498C13.0172 0.637853 13.0348 0.680366 13.0349 0.724709V3.20239C13.0348 3.24673 13.0172 3.28925 12.9858 3.3206C12.9545 3.35196 12.912 3.36959 12.8676 3.36964H12.719C12.6746 3.36959 12.6321 3.35196 12.6008 3.3206C12.5694 3.28925 12.5518 3.24673 12.5517 3.20239V0.724709ZM12.1623 3.66585C12.1751 3.68125 12.1887 3.69591 12.2028 3.71016C12.2051 3.7125 12.2073 3.71487 12.2097 3.71717C12.2239 3.73135 12.2389 3.74482 12.2543 3.75773L12.2628 3.76475C12.2785 3.77751 12.2946 3.78965 12.3113 3.80104C12.3139 3.80278 12.3165 3.80445 12.3191 3.80616C12.3367 3.81778 12.3546 3.82891 12.3732 3.839C12.3741 3.83952 12.3751 3.83997 12.3761 3.84052C12.3946 3.85047 12.4135 3.8596 12.4329 3.86795L12.4391 3.87069C12.4584 3.87873 12.4781 3.88593 12.498 3.89229C12.5013 3.89337 12.5046 3.89448 12.508 3.89548C12.5518 3.90874 12.5966 3.9179 12.6421 3.92283C12.6449 3.92313 12.6477 3.92328 12.6505 3.92357C12.6731 3.92569 12.6959 3.92703 12.7189 3.92703H12.8676C12.8907 3.92703 12.9134 3.92569 12.936 3.92357C12.9388 3.92331 12.9417 3.92317 12.9445 3.92283C12.9693 3.92017 12.994 3.91622 13.0184 3.91099C13.0388 3.90665 13.0589 3.90153 13.0785 3.89548L13.0886 3.89229C13.1086 3.88587 13.1283 3.87875 13.1474 3.87069L13.1536 3.86795C13.1729 3.85965 13.1919 3.8505 13.2105 3.84052C13.2114 3.84 13.2124 3.83956 13.2134 3.839C13.232 3.82891 13.2499 3.81778 13.2674 3.80616C13.27 3.80445 13.2726 3.80278 13.2752 3.80104C13.2919 3.78965 13.3081 3.77747 13.3238 3.76475L13.3322 3.75773C13.3477 3.74478 13.3626 3.73135 13.3769 3.71717C13.3792 3.71487 13.3815 3.7125 13.3838 3.71016C13.3977 3.69591 13.4114 3.68125 13.4242 3.66585C13.4247 3.67591 13.4249 3.68596 13.4249 3.69606C13.4249 4.04444 13.1415 4.32784 12.7931 4.32784C12.4447 4.32784 12.1613 4.04444 12.1613 3.69606C12.1615 3.68596 12.1617 3.67591 12.1623 3.66585ZM7.9433 0.724709C7.94335 0.680366 7.96098 0.637853 7.99234 0.606498C8.02369 0.575143 8.06621 0.557506 8.11055 0.557457H8.25921C8.30355 0.557506 8.34607 0.575143 8.37742 0.606498C8.40878 0.637853 8.42641 0.680366 8.42646 0.724709V3.20239C8.42641 3.24673 8.40878 3.28925 8.37742 3.3206C8.34607 3.35196 8.30355 3.36959 8.25921 3.36964H8.11055C8.06621 3.36959 8.02369 3.35196 7.99234 3.3206C7.96098 3.28925 7.94335 3.24673 7.9433 3.20239V0.724709ZM7.55376 3.66585C7.5666 3.68125 7.58022 3.69591 7.59425 3.71016C7.59655 3.7125 7.59881 3.71487 7.60115 3.71717C7.61544 3.73135 7.63036 3.74482 7.64579 3.75773L7.65429 3.76475C7.66995 3.77751 7.68609 3.78965 7.70283 3.80104C7.70539 3.80278 7.70803 3.80445 7.71062 3.80616C7.72818 3.81778 7.7461 3.82891 7.76465 3.839C7.76562 3.83952 7.76662 3.83997 7.76759 3.84052C7.78607 3.85047 7.80507 3.8596 7.82444 3.86795L7.8306 3.87069C7.84991 3.87873 7.86956 3.88593 7.88949 3.89229C7.89283 3.89337 7.89613 3.89448 7.89951 3.89548C7.94326 3.90874 7.98814 3.9179 8.03359 3.92283C8.03641 3.92313 8.03923 3.92328 8.04208 3.92357C8.06461 3.92569 8.08739 3.92703 8.11048 3.92703H8.25914C8.28222 3.92703 8.30497 3.92569 8.32753 3.92357C8.33035 3.92331 8.33321 3.92317 8.33603 3.92283C8.36086 3.92017 8.38553 3.91622 8.40995 3.91099C8.43036 3.90665 8.45044 3.90153 8.4701 3.89548L8.48012 3.89229C8.50012 3.88587 8.51983 3.87875 8.53902 3.87069L8.54518 3.86795C8.56452 3.85965 8.58349 3.8505 8.60203 3.84052C8.60299 3.84 8.60399 3.83956 8.60496 3.839C8.62351 3.82891 8.64144 3.81778 8.65899 3.80616C8.66159 3.80445 8.66422 3.80278 8.66678 3.80104C8.68352 3.78965 8.69963 3.77747 8.71532 3.76475L8.72382 3.75773C8.73926 3.74478 8.75414 3.73135 8.76846 3.71717C8.7708 3.71487 8.77306 3.7125 8.77537 3.71016C8.78928 3.69591 8.8029 3.68125 8.81574 3.66585C8.81622 3.67591 8.81648 3.68596 8.81648 3.69606C8.81648 4.04444 8.53308 4.32784 8.18466 4.32784C7.83624 4.32784 7.55283 4.04444 7.55283 3.69606C7.55306 3.68596 7.55328 3.67591 7.55376 3.66585ZM3.3348 0.724709C3.33485 0.680366 3.35248 0.637853 3.38384 0.606498C3.41519 0.575143 3.45771 0.557506 3.50205 0.557457H3.65071C3.69505 0.557506 3.73756 0.575143 3.76892 0.606498C3.80027 0.637853 3.81791 0.680366 3.81796 0.724709V3.20239C3.81791 3.24673 3.80027 3.28925 3.76892 3.3206C3.73756 3.35196 3.69505 3.36959 3.65071 3.36964H3.50201C3.45767 3.36959 3.41516 3.35196 3.3838 3.3206C3.35245 3.28925 3.33481 3.24673 3.33476 3.20239L3.3348 0.724709ZM3.15619 3.83908C3.15715 3.8396 3.15816 3.84004 3.15912 3.8406C3.1776 3.85054 3.1966 3.85967 3.21597 3.86802L3.22213 3.87077C3.24145 3.8788 3.2611 3.88601 3.28103 3.89237C3.28437 3.89344 3.28767 3.89455 3.29101 3.89556C3.33475 3.90882 3.37964 3.91797 3.42508 3.92291C3.4279 3.9232 3.43072 3.92335 3.43358 3.92365C3.45611 3.92576 3.47889 3.9271 3.50197 3.9271H3.65063C3.67372 3.9271 3.69647 3.92576 3.71903 3.92365C3.72185 3.92339 3.7247 3.92324 3.72753 3.92291C3.75235 3.92025 3.77703 3.91629 3.80145 3.91107C3.82186 3.90673 3.84193 3.90161 3.8616 3.89556L3.87162 3.89237C3.89162 3.88595 3.91133 3.87882 3.93051 3.87077L3.93667 3.86802C3.95602 3.85972 3.97499 3.85057 3.99353 3.8406C3.99449 3.84008 3.99549 3.83963 3.99646 3.83908C4.01501 3.82898 4.03297 3.81785 4.05049 3.80623C4.05309 3.80453 4.05572 3.80286 4.05828 3.80111C4.07502 3.78972 4.09112 3.77755 4.10682 3.76482L4.11532 3.75781C4.13076 3.74486 4.14564 3.73142 4.15996 3.71725C4.1623 3.71495 4.16456 3.71257 4.16686 3.71023C4.18082 3.69595 4.19444 3.68129 4.20728 3.66589C4.20776 3.67594 4.20802 3.686 4.20802 3.69609C4.20802 4.04448 3.92461 4.32788 3.57619 4.32788C3.21527 4.32788 2.9276 4.0247 2.94515 3.66585C3.00424 3.73608 3.07579 3.79481 3.15619 3.83908ZM0.557494 3.07796C0.557494 2.56051 0.9785 2.1395 1.49599 2.1395H2.77738V2.81579C1.97492 3.54495 2.49253 4.88534 3.57642 4.88534C4.23218 4.88534 4.7657 4.35182 4.7657 3.69606C4.7657 3.35896 4.62201 3.03978 4.37545 2.81575V2.13954H7.38584V2.81582C7.13929 3.03985 6.9956 3.35899 6.9956 3.69609C6.9956 4.35189 7.52912 4.88538 8.18488 4.88538C8.84064 4.88538 9.37416 4.35185 9.37416 3.69609C9.37416 3.35899 9.23047 3.03981 8.98392 2.81579V2.13954H11.9943V2.81582C11.7478 3.03985 11.6041 3.35899 11.6041 3.69609C11.6041 4.35189 12.1376 4.88538 12.7933 4.88538C13.4491 4.88538 13.9826 4.35185 13.9826 3.69609C13.9826 3.35899 13.8389 3.03981 13.5924 2.81579V2.13954H15.392C15.9095 2.13954 16.3305 2.56055 16.3305 3.078V5.926H0.557494V3.07796ZM18.4046 17.2992C18.2691 17.666 17.9152 17.9124 17.524 17.9124H16.5557C16.7632 17.6556 16.8878 17.3291 16.8878 16.9739V13.2822C16.8878 13.2082 16.8585 13.1373 16.8062 13.0851C16.7539 13.0328 16.683 13.0034 16.6091 13.0034C16.5352 13.0034 16.4643 13.0328 16.412 13.0851C16.3598 13.1373 16.3304 13.2082 16.3304 13.2822V16.9739C16.3304 17.4914 15.9093 17.9124 15.3919 17.9124H1.49595C0.978463 17.9124 0.557457 17.4914 0.557457 16.9739V7.52411H7.53632C7.61024 7.52411 7.68114 7.49474 7.73341 7.44247C7.78568 7.3902 7.81505 7.31931 7.81505 7.24538C7.81505 7.17146 7.78568 7.10056 7.73341 7.04829C7.68114 6.99602 7.61024 6.96665 7.53632 6.96665H0.557494V6.48349H16.3305V6.96665H8.83337C8.75944 6.96665 8.68855 6.99602 8.63628 7.04829C8.584 7.10056 8.55464 7.17146 8.55464 7.24538C8.55464 7.31931 8.584 7.3902 8.63628 7.44247C8.68855 7.49474 8.75944 7.52411 8.83337 7.52411H16.3305V11.9814C16.3305 12.0553 16.3598 12.1262 16.4121 12.1785C16.4644 12.2308 16.5353 12.2601 16.6092 12.2601C16.6831 12.2601 16.754 12.2308 16.8063 12.1785C16.8586 12.1262 16.8879 12.0553 16.8879 11.9814V6.73257L18.4185 16.708L18.4191 16.7122C18.4781 17.0966 18.4061 17.2953 18.4046 17.2992Z" fill="#0057AD"></path>
                                                        <path d="M6.35253 8.95313H5.43486C5.36093 8.95313 5.29004 8.98249 5.23777 9.03476C5.18549 9.08703 5.15613 9.15793 5.15613 9.23185C5.15613 9.30578 5.18549 9.37667 5.23777 9.42894C5.29004 9.48122 5.36093 9.51058 5.43486 9.51058H6.35253C6.38914 9.51059 6.42539 9.50338 6.4592 9.48937C6.49302 9.47537 6.52375 9.45484 6.54964 9.42896C6.57552 9.40307 6.59605 9.37234 6.61006 9.33852C6.62406 9.3047 6.63127 9.26846 6.63126 9.23185C6.63127 9.19525 6.62406 9.159 6.61006 9.12518C6.59605 9.09136 6.57552 9.06064 6.54964 9.03475C6.52375 9.00887 6.49302 8.98834 6.4592 8.97433C6.42539 8.96033 6.38914 8.95312 6.35253 8.95313ZM8.90377 8.95313H7.98598C7.91205 8.95313 7.84116 8.98249 7.78889 9.03476C7.73662 9.08703 7.70725 9.15793 7.70725 9.23185C7.70725 9.30578 7.73662 9.37667 7.78889 9.42894C7.84116 9.48122 7.91205 9.51058 7.98598 9.51058H8.90377C8.94037 9.51059 8.97662 9.50338 9.01044 9.48937C9.04426 9.47537 9.07499 9.45484 9.10087 9.42896C9.12675 9.40307 9.14728 9.37234 9.16129 9.33852C9.17529 9.3047 9.1825 9.26846 9.1825 9.23185C9.1825 9.19525 9.17529 9.159 9.16129 9.12518C9.14728 9.09136 9.12675 9.06064 9.10087 9.03475C9.07499 9.00887 9.04426 8.98834 9.01044 8.97433C8.97662 8.96033 8.94037 8.95312 8.90377 8.95313ZM11.455 8.95313H10.5372C10.4633 8.95313 10.3924 8.98249 10.3401 9.03476C10.2878 9.08703 10.2585 9.15793 10.2585 9.23185C10.2585 9.30578 10.2878 9.37667 10.3401 9.42894C10.3924 9.48122 10.4633 9.51058 10.5372 9.51058H11.455C11.529 9.51058 11.5999 9.48122 11.6521 9.42894C11.7044 9.37667 11.7338 9.30578 11.7338 9.23185C11.7338 9.15793 11.7044 9.08703 11.6521 9.03476C11.5999 8.98249 11.529 8.95313 11.455 8.95313ZM14.0062 8.95313H13.0884C13.0144 8.95313 12.9435 8.98249 12.8913 9.03476C12.839 9.08703 12.8096 9.15793 12.8096 9.23185C12.8096 9.30578 12.839 9.37667 12.8913 9.42894C12.9435 9.48122 13.0144 9.51058 13.0884 9.51058H14.0062C14.0428 9.51059 14.079 9.50338 14.1128 9.48937C14.1466 9.47537 14.1774 9.45484 14.2033 9.42896C14.2291 9.40307 14.2497 9.37234 14.2637 9.33852C14.2777 9.3047 14.2849 9.26846 14.2849 9.23185C14.2849 9.19525 14.2777 9.159 14.2637 9.12518C14.2497 9.09136 14.2291 9.06064 14.2033 9.03475C14.1774 9.00887 14.1466 8.98834 14.1128 8.97433C14.079 8.96033 14.0428 8.95312 14.0062 8.95313ZM3.80138 11.1988H2.88359C2.80966 11.1988 2.73877 11.2282 2.6865 11.2805C2.63422 11.3327 2.60486 11.4036 2.60486 11.4776C2.60486 11.5515 2.63422 11.6224 2.6865 11.6747C2.73877 11.7269 2.80966 11.7563 2.88359 11.7563H3.80138C3.83798 11.7563 3.87423 11.7491 3.90805 11.7351C3.94187 11.7211 3.97259 11.7005 3.99848 11.6747C4.02436 11.6488 4.04489 11.6181 4.0589 11.5842C4.0729 11.5504 4.08011 11.5142 4.0801 11.4776C4.08011 11.441 4.07291 11.4047 4.05891 11.3709C4.0449 11.3371 4.02437 11.3063 3.99849 11.2805C3.9726 11.2546 3.94187 11.234 3.90805 11.22C3.87423 11.206 3.83798 11.1988 3.80138 11.1988ZM6.35253 11.1988H5.43486C5.36093 11.1988 5.29004 11.2282 5.23777 11.2805C5.18549 11.3327 5.15613 11.4036 5.15613 11.4776C5.15613 11.5515 5.18549 11.6224 5.23777 11.6747C5.29004 11.7269 5.36093 11.7563 5.43486 11.7563H6.35253C6.38914 11.7563 6.42539 11.7491 6.4592 11.7351C6.49302 11.7211 6.52375 11.7005 6.54964 11.6747C6.57552 11.6488 6.59605 11.6181 6.61006 11.5842C6.62406 11.5504 6.63127 11.5142 6.63126 11.4776C6.63127 11.441 6.62406 11.4047 6.61006 11.3709C6.59605 11.3371 6.57552 11.3063 6.54964 11.2805C6.52375 11.2546 6.49302 11.234 6.4592 11.22C6.42539 11.206 6.38914 11.1988 6.35253 11.1988ZM8.90377 11.1988H7.98598C7.91205 11.1988 7.84116 11.2282 7.78889 11.2805C7.73662 11.3327 7.70725 11.4036 7.70725 11.4776C7.70725 11.5515 7.73662 11.6224 7.78889 11.6747C7.84116 11.7269 7.91205 11.7563 7.98598 11.7563H8.90377C8.94037 11.7563 8.97662 11.7491 9.01044 11.7351C9.04426 11.7211 9.07499 11.7005 9.10087 11.6747C9.12675 11.6488 9.14728 11.6181 9.16129 11.5842C9.17529 11.5504 9.1825 11.5142 9.1825 11.4776C9.1825 11.441 9.1753 11.4047 9.1613 11.3709C9.14729 11.3371 9.12676 11.3063 9.10088 11.2805C9.07499 11.2546 9.04426 11.234 9.01044 11.22C8.97662 11.206 8.94037 11.1988 8.90377 11.1988ZM11.455 11.1988H10.5372C10.4633 11.1988 10.3924 11.2282 10.3401 11.2805C10.2878 11.3327 10.2585 11.4036 10.2585 11.4776C10.2585 11.5515 10.2878 11.6224 10.3401 11.6747C10.3924 11.7269 10.4633 11.7563 10.5372 11.7563H11.455C11.529 11.7563 11.5999 11.7269 11.6521 11.6747C11.7044 11.6224 11.7338 11.5515 11.7338 11.4776C11.7338 11.4036 11.7044 11.3327 11.6521 11.2805C11.5999 11.2282 11.529 11.1988 11.455 11.1988ZM14.0062 11.1988H13.0884C13.0144 11.1988 12.9435 11.2282 12.8913 11.2805C12.839 11.3327 12.8096 11.4036 12.8096 11.4776C12.8096 11.5515 12.839 11.6224 12.8913 11.6747C12.9435 11.7269 13.0144 11.7563 13.0884 11.7563H14.0062C14.0428 11.7563 14.079 11.7491 14.1128 11.7351C14.1466 11.7211 14.1774 11.7005 14.2033 11.6747C14.2291 11.6488 14.2497 11.6181 14.2637 11.5842C14.2777 11.5504 14.2849 11.5142 14.2849 11.4776C14.2849 11.441 14.2777 11.4047 14.2637 11.3709C14.2497 11.3371 14.2292 11.3063 14.2033 11.2805C14.1774 11.2546 14.1467 11.234 14.1128 11.22C14.079 11.206 14.0428 11.1988 14.0062 11.1988ZM3.80138 13.4446H2.88359C2.80966 13.4446 2.73877 13.4739 2.6865 13.5262C2.63422 13.5785 2.60486 13.6494 2.60486 13.7233C2.60486 13.7972 2.63422 13.8681 2.6865 13.9204C2.73877 13.9727 2.80966 14.002 2.88359 14.002H3.80138C3.83798 14.002 3.87423 13.9948 3.90805 13.9808C3.94187 13.9668 3.97259 13.9463 3.99848 13.9204C4.02436 13.8945 4.04489 13.8638 4.0589 13.83C4.0729 13.7962 4.08011 13.7599 4.0801 13.7233C4.08011 13.6867 4.0729 13.6505 4.0589 13.6166C4.04489 13.5828 4.02436 13.5521 3.99848 13.5262C3.97259 13.5003 3.94187 13.4798 3.90805 13.4658C3.87423 13.4518 3.83798 13.4446 3.80138 13.4446ZM6.35253 13.4446H5.43486C5.36093 13.4446 5.29004 13.4739 5.23777 13.5262C5.18549 13.5785 5.15613 13.6494 5.15613 13.7233C5.15613 13.7972 5.18549 13.8681 5.23777 13.9204C5.29004 13.9727 5.36093 14.002 5.43486 14.002H6.35253C6.38914 14.002 6.42539 13.9948 6.4592 13.9808C6.49302 13.9668 6.52375 13.9463 6.54964 13.9204C6.57552 13.8945 6.59605 13.8638 6.61006 13.83C6.62406 13.7962 6.63127 13.7599 6.63126 13.7233C6.63127 13.6867 6.62406 13.6505 6.61006 13.6166C6.59605 13.5828 6.57552 13.5521 6.54964 13.5262C6.52375 13.5003 6.49302 13.4798 6.4592 13.4658C6.42539 13.4518 6.38914 13.4446 6.35253 13.4446ZM8.90377 13.4446H7.98598C7.91205 13.4446 7.84116 13.4739 7.78889 13.5262C7.73662 13.5785 7.70725 13.6494 7.70725 13.7233C7.70725 13.7972 7.73662 13.8681 7.78889 13.9204C7.84116 13.9727 7.91205 14.002 7.98598 14.002H8.90377C8.94037 14.002 8.97662 13.9948 9.01044 13.9808C9.04426 13.9668 9.07499 13.9463 9.10087 13.9204C9.12675 13.8945 9.14728 13.8638 9.16129 13.83C9.17529 13.7962 9.1825 13.7599 9.1825 13.7233C9.1825 13.6867 9.17529 13.6505 9.16129 13.6166C9.14728 13.5828 9.12675 13.5521 9.10087 13.5262C9.07499 13.5003 9.04426 13.4798 9.01044 13.4658C8.97662 13.4518 8.94037 13.4446 8.90377 13.4446ZM11.455 13.4446H10.5372C10.4633 13.4446 10.3924 13.4739 10.3401 13.5262C10.2878 13.5785 10.2585 13.6494 10.2585 13.7233C10.2585 13.7972 10.2878 13.8681 10.3401 13.9204C10.3924 13.9727 10.4633 14.002 10.5372 14.002H11.455C11.529 14.002 11.5999 13.9727 11.6521 13.9204C11.7044 13.8681 11.7338 13.7972 11.7338 13.7233C11.7338 13.6494 11.7044 13.5785 11.6521 13.5262C11.5999 13.4739 11.529 13.4446 11.455 13.4446ZM14.0062 13.4446H13.0884C13.0144 13.4446 12.9435 13.4739 12.8913 13.5262C12.839 13.5785 12.8096 13.6494 12.8096 13.7233C12.8096 13.7972 12.839 13.8681 12.8913 13.9204C12.9435 13.9727 13.0144 14.002 13.0884 14.002H14.0062C14.0428 14.002 14.079 13.9948 14.1128 13.9808C14.1466 13.9668 14.1774 13.9463 14.2033 13.9204C14.2291 13.8945 14.2497 13.8638 14.2637 13.83C14.2777 13.7962 14.2849 13.7599 14.2849 13.7233C14.2849 13.6867 14.2777 13.6505 14.2637 13.6166C14.2497 13.5828 14.2291 13.5521 14.2033 13.5262C14.1774 13.5003 14.1466 13.4798 14.1128 13.4658C14.079 13.4518 14.0428 13.4446 14.0062 13.4446ZM3.80138 15.6904H2.88359C2.80966 15.6904 2.73877 15.7197 2.6865 15.772C2.63422 15.8243 2.60486 15.8952 2.60486 15.9691C2.60486 16.043 2.63422 16.1139 2.6865 16.1662C2.73877 16.2185 2.80966 16.2478 2.88359 16.2478H3.80138C3.83798 16.2478 3.87423 16.2406 3.90805 16.2266C3.94187 16.2126 3.97259 16.1921 3.99848 16.1662C4.02436 16.1403 4.04489 16.1096 4.0589 16.0758C4.0729 16.0419 4.08011 16.0057 4.0801 15.9691C4.08011 15.9325 4.0729 15.8962 4.0589 15.8624C4.04489 15.8286 4.02436 15.7979 3.99848 15.772C3.97259 15.7461 3.94187 15.7256 3.90805 15.7116C3.87423 15.6976 3.83798 15.6904 3.80138 15.6904ZM6.35253 15.6904H5.43486C5.36093 15.6904 5.29004 15.7197 5.23777 15.772C5.18549 15.8243 5.15613 15.8952 5.15613 15.9691C5.15613 16.043 5.18549 16.1139 5.23777 16.1662C5.29004 16.2185 5.36093 16.2478 5.43486 16.2478H6.35253C6.38914 16.2478 6.42539 16.2406 6.4592 16.2266C6.49302 16.2126 6.52375 16.1921 6.54964 16.1662C6.57552 16.1403 6.59605 16.1096 6.61006 16.0758C6.62406 16.0419 6.63127 16.0057 6.63126 15.9691C6.63127 15.9325 6.62406 15.8962 6.61006 15.8624C6.59605 15.8286 6.57552 15.7979 6.54964 15.772C6.52375 15.7461 6.49302 15.7256 6.4592 15.7116C6.42539 15.6976 6.38914 15.6904 6.35253 15.6904ZM8.90377 15.6904H7.98598C7.91205 15.6904 7.84116 15.7197 7.78889 15.772C7.73662 15.8243 7.70725 15.8952 7.70725 15.9691C7.70725 16.043 7.73662 16.1139 7.78889 16.1662C7.84116 16.2185 7.91205 16.2478 7.98598 16.2478H8.90377C8.94037 16.2478 8.97662 16.2406 9.01044 16.2266C9.04426 16.2126 9.07499 16.1921 9.10087 16.1662C9.12675 16.1403 9.14728 16.1096 9.16129 16.0758C9.17529 16.0419 9.1825 16.0057 9.1825 15.9691C9.1825 15.9325 9.17529 15.8962 9.16129 15.8624C9.14728 15.8286 9.12675 15.7979 9.10087 15.772C9.07499 15.7461 9.04426 15.7256 9.01044 15.7116C8.97662 15.6976 8.94037 15.6904 8.90377 15.6904ZM11.455 15.6904H10.5372C10.4633 15.6904 10.3924 15.7197 10.3401 15.772C10.2878 15.8243 10.2585 15.8952 10.2585 15.9691C10.2585 16.043 10.2878 16.1139 10.3401 16.1662C10.3924 16.2185 10.4633 16.2478 10.5372 16.2478H11.455C11.529 16.2478 11.5999 16.2185 11.6521 16.1662C11.7044 16.1139 11.7338 16.043 11.7338 15.9691C11.7338 15.8952 11.7044 15.8243 11.6521 15.772C11.5999 15.7197 11.529 15.6904 11.455 15.6904Z" fill="#0057AD"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div> */}



                                        <div className="mb-[60px]">
                                            <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5">
                                                <h5 className="font-bold"> Dimensions & Weight</h5>
                                            </div>

                                            <div className="grid grid-cols-4 gap-4 mb-5 max-md:grid-cols-2">
                                                <InputField label="Product Weight (g)" type="number" value={form.product_weight_g} onChange={(val) => setform({ ...form, product_weight_g: val })} />
                                                <InputField label="Length Inches" type="number" value={form.length_inches} onChange={(val) => setform({ ...form, length_inches: val })} />
                                                <InputField label="Height MM" type="number" value={form.height_mm} onChange={(val) => setform({ ...form, height_mm: val })} />
                                                <InputField label="Width MM" type="number" value={form.width_mm} onChange={(val) => setform({ ...form, width_mm: val })} />
                                            </div>
                                        </div>


                                        <div className="mb-[60px]">
                                            <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5">
                                                <h5 className="font-bold"> Status & Attributes</h5>
                                            </div>
                                            <div className="">

                                                <div className="grid grid-cols-4 gap-4">
                                                    <Dropdown
                                                        label="Trending"
                                                        options={["Active", "Inactive"]}
                                                        value={form.trending ? "Active" : "Inactive"}
                                                        onSelect={(val) => handleDropdownSelect("trending", val)}
                                                        isOpen={openDropdown === 1}
                                                        onToggle={() => toggleDropdown(1)}
                                                        ref={(el) => (dropdownRefs.current[1] = el)}
                                                    />
                                                    <Dropdown
                                                        label="Bestseller"
                                                        options={["Active", "Inactive"]}
                                                        value={form.bestseller ? "Active" : "Inactive"}
                                                        onSelect={(val) => handleDropdownSelect("bestseller", val)}
                                                        isOpen={openDropdown === 2}
                                                        onToggle={() => toggleDropdown(2)}
                                                        ref={(el) => (dropdownRefs.current[2] = el)}
                                                    />

                                                    <Dropdown
                                                        label="Authenticity"
                                                        options={["Active", "Inactive"]}
                                                        value={form.authenticity ? "Active" : "Inactive"}
                                                        onSelect={(val) => handleDropdownSelect("authenticity", val)}
                                                        isOpen={openDropdown === 3}
                                                        onToggle={() => toggleDropdown(3)}
                                                        ref={(el) => (dropdownRefs.current[3] = el)}
                                                    />
                                                    <Dropdown
                                                        label="Ring Size"
                                                        options={["Active", "Inactive"]}
                                                        value={form.is_ring_size ? "Active" : "Inactive"}
                                                        onSelect={(val) => handleDropdownSelect("is_ring_size", val)}
                                                        isOpen={openDropdown === 4}
                                                        onToggle={() => toggleDropdown(4)}
                                                        ref={(el) => (dropdownRefs.current[4] = el)}
                                                    />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-[60px]">
                                            <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5">
                                                <h5 className="font-bold">Pricing Details</h5>
                                            </div>

                                            <div className="grid grid-cols-4 gap-4 mb-5 max-md:grid-cols-2">
                                                <InputField
                                                    label="Gst"
                                                    type="number"
                                                    value={form.gst}
                                                    onChange={(val) => setform({ ...form, gst: val })}
                                                />
                                                <InputField
                                                    label="Making Charge"
                                                    type="number"
                                                    value={form.making_charges}
                                                    onChange={(val) => setform({ ...form, making_charges: val })}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end items-center  " >
                                            <div className="pt-[30px] max-lg:pt-0 flex flex-row-reverse gap-3">


                                                <button id="" onClick={handlesubmit} className="shadow-[0px_8px_20px_1px_#3DB0F733] text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] bg-primary border-[1px] hover:border-[rgba(34,117,252,1)] hover:bg-white hover:text-primary">
                                                    Edit Product
                                                </button>
                                                <Link to="/product" className="max-sm:hidden">
                                                    <button
                                                        type="button"
                                                        onClick={closeModal}
                                                        className="shadow-[0px_8px_20px_1px_#3DB0F733] hover:text-white text-[14px] h-[50px] w-[208px] font-bold max-sm:h-[40px] max-sm:w-[180px] flex items-center justify-center gap-2 rounded-[12px] hover:bg-primary border-[1px] border-[rgba(34,117,252,1)] bg-white text-primary "
                                                    >
                                                        Cancel
                                                    </button>

                                                </Link>

                                            </div>
                                        </div>

                                        {/* <div className="mb-[60px]">
                                            <div className="border-t-[1px] border-b-[1px] border-[#C8C8C8] py-2 mb-5">
                                                <h5 className="font-bold"> Pricing</h5>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-2">
                                                <div className="grid grid-cols-2 gap-4 mb-5">
                                                    <InputField label="gold_price" value={form.gold_price} onChange={(val) => setform({ ...form, gold_price: val })} />
                                                    <InputField label="gst" value={form.gst} onChange={(val) => setform({ ...form, gst: val })} />
                                                </div>
                                                <InputField label="Total Price" value={form.total_price} onChange={(val) => setform({ ...form, total_price: val })} />
                                                <InputField label="Total Gst" value={form.total_gst} onChange={(val) => setform({ ...form, total_gst: val })} />
                                            </div>
                                        </div> */}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}
export default daily_logs
