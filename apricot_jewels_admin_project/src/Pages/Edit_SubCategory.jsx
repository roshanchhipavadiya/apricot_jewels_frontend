
import React, { useState, useEffect, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu';
import { useLocation, useNavigate } from "react-router-dom";
import EmployList from '../Componenet/EmployList';
import SubHeader from '../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEditSubCategoryMutation, useGetSubCategoriesQuery, useGetCategoriesQuery } from "../services/apiSlice";
import Dropdown from "../Componenet/dropdown";
import Searchdropdown from '../Componenet/searchdropdown'

const Edit_SubCategory = () => {
  const [modal, setModal] = useState(null);

  const openModal = (modalId) => {
    console.log("Opening modal:", modalId);
    setModal(modalId);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    is_active: "True",
    is_home: "True",
    subcategory_id: "",
    file: "",
    category: ""
  });


  console.log(category.file);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const navigate = useNavigate();
  const location = useLocation();
  const subcategory_id = location?.state?.subcategory_id;
  console.log(subcategory_id);



  const { data: subcategories } = useGetSubCategoriesQuery();
  const subCategoriesData = subcategories?.data || [];


  const matedData = subCategoriesData.find(c => c.subcategory_id == subcategory_id);
  console.log(matedData);


  useEffect(() => {
    if (subcategory_id && subCategoriesData.length > 0) {
      const selectedCategory = subCategoriesData.find(c => c.subcategory_id === subcategory_id);
      console.log(selectedCategory);

      if (selectedCategory) {
        setCategory(prev => ({
          ...prev,
          name: selectedCategory.name || "",
          description: selectedCategory.description || "",
          is_home: selectedCategory.is_home?.toString() || "True",
          is_active: selectedCategory.is_active?.toString() || "True",
          category: selectedCategory.category,
          subcategory_id: selectedCategory.subcategory_id,
          file: selectedCategory.subcategory_img, // ✅ just store the path here
        }));
        setSelectedImage(`${import.meta.env.VITE_API_BASE_URL}${selectedCategory.subcategory_img}`)
        console.log(selectedCategory.file);

      }
    }
  }, [subCategoriesData, subcategory_id]);



  let categoryOptions = [];
  const { data: categories } = useGetCategoriesQuery();

  if (categories?.data) {
    categoryOptions = categories.data.map((val) => ({
      id: val.category_id,  // keep using category_id here
      name: val.name,
    }));
  }



  const [editCategory] = useEditSubCategoryMutation();
  const handleEditCategory = async () => {
    try {
      // === Validate form fields ===
      // if (!category.name?.trim()) {
      //   return toast.error("Category name is required");
      // }


      // if (!category.is_active) {
      //   return toast.error("Please select active status");
      // }

      // if (!category.is_home) {
      //   return toast.error("Please select homepage status");
      // }

      // if (!category.category) {
      //   return toast.error("Please select a category");
      // }

      // if (!category.subcategory_id) {
      //   return toast.error("Subcategory ID is missing");
      // }

      // if (!selectedImage) {
      //   return toast.error("Please upload or select an image");
      // }

      // === Handle image conversion ===
      let imageBlob = null;
      // const filePath = selectedImage;
      // console.log(filePath);

      // if (typeof filePath === "string" && !filePath.startsWith("data:")) {
      //   const response = await fetch(filePath);
      //   imageBlob = await response.blob();
      // } else if (filePath instanceof File || filePath instanceof Blob) {
      //   imageBlob = filePath;
      // }

      // if (!imageBlob || !(imageBlob instanceof Blob)) {
      //   return toast.error("Invalid image data");
      // }

      // Optional: Image preview
      // const previewURL = URL.createObjectURL(imageBlob);
      // setSelectedImage(previewURL);
      // URL.revokeObjectURL(previewURL); // Clean up

      // === Capitalize booleans ===
      const capitalizeBoolean = (val) =>
        val.toString().charAt(0).toUpperCase() + val.toString().slice(1);


      const formData = new FormData();

      if (selectedImage instanceof File) {
        // ✅ User selected a new image
        imageBlob = selectedImage;
      } else if (typeof selectedImage === "string" && !selectedImage.startsWith("http")) {
        // ✅ Image is an existing URL – fetch and convert to blob
        try {
          const response = await fetch(selectedImage);
          imageBlob = await response.blob();
        } catch (err) {

        }
      } else {
        // ✅ No new image selected, and it's not a valid string URL — skip
        imageBlob = null;
      }

      // Append only if imageBlob is valid (i.e., image changed or needs sending)
      if (imageBlob) {
        formData.append("subcategory_img", imageBlob);
      }










      // === Create FormData ===

      formData.append("name", category.name.trim());
      formData.append("description", category.description.trim());
      formData.append("is_active", capitalizeBoolean(category.is_active));
      formData.append("is_home", capitalizeBoolean(category.is_home));



      formData.append("category_id", category.category);
      formData.append("subcategory_id", category.subcategory_id);

      // === API Call ===
      const response = await editCategory(formData).unwrap();
      if (response) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/sub_category");
        }, 2000);
      }


    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update category");
    }
  };





  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const dropdownRefs = useRef([]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setSelectedImage(previewURL); // ✅ For preview only
      setCategory(prev => ({ ...prev, file })); // ✅ Actual file object for upload
    }
  };





  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Handle outside click to close dropdown
  const handleClickOutside = (event) => {
    dropdownRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        setOpenDropdown((prev) => (prev === index ? null : prev));
      }
    });
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenside, setIsOpenside] = useState(false);

  const handleChange = (value) => {
    setCategory({ ...category, is_active: value });
  };

  const [openDropdown1, setOpenDropdown1] = useState(null); // Manage dropdown state

  const toggleDropdown1 = (dropdownName) => {
    setOpenDropdown1(openDropdown1 === dropdownName ? null : dropdownName); // Toggle dropdown
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

        <div className="w-full width__right relative max-md:ms-0">
          <SubHeader pageName={"Category"} />
          <div className="flex justify-between gap-[10px] mb-[27px] flex-wrap items-center max-sm:block">
            <h3 className="text-[24px] font-[700]"> Category</h3>
            <div className="flex justify-end items-center max-lg:justify-start">
              <nav className="text-sm text-gray-600 max-sm:mt-[15px] max-sm:ps-[5px]" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center">
                  <li className="flex items-center">
                    <Link to="/dashboard" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Dashboard</Link>
                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li className="flex items-center">
                    <Link to="/sub_category" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Sub Category</Link>
                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li className="text-primary font-medium text-[12px]">New Category</li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="flex flex-col max-sm:py-[24px] max-sm:px-[15px] gap-6 p-6 rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">
            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">
                Category name <span className="text-[#ff5200]">*</span>
              </h3>
              <Searchdropdown
                onToggle={() => toggleDropdown1("Category")} // Toggle open/close dropdown
                isOpen={openDropdown1 === "Category"} // Determine if dropdown should be open
                options={categoryOptions.map((val) => val.name)} // Extract category names
                value={
                  categoryOptions.find((sub) => sub.id === category.subcategory_id)?.name ||
                  ""
                }
                onSelect={(value) => {
                  const selectedSubcategory = categoryOptions.find((sub) => sub.name === value);
                  if (selectedSubcategory) {
                    setCategory((prev) => ({
                      ...prev,
                      subcategory_id: selectedSubcategory.id, // Update selected category ID
                    }));

                    setOpenDropdown1(null); // Close the dropdown immediately after selection
                  }
                }}
              />
            </div>

            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">SubCategory name <span className="text-[#ff5200]">*</span></h3>
              <input
                className="w-full p-[14px_22px] text-sm font-normal leading-5 bg-transparent border border-[#d6e0ea] text-[#9CA3AF] rounded-xl   outline-0 shadow-none overflow-hidden mb-0 font-inter"
                placeholder="SubCategory name"
                required
                type="text"
                name="name"
                value={category.name}
                onChange={(e) => {
                  const filtered = e.target.value.replace(/[^a-zA-Z\s-]/g, ''); // keep letters, spaces, hyphens
                  setCategory({ ...category, name: filtered });
                }}
              />

            </div>

            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Upload images  <span className="text-[#ff5200]">*</span></h3>
              <div className="w-full relative">
                <div className="min-h-[250px] flex items-center w-full rounded-[12px] border border-dashed border-[#2275fc] p-4 max-sm:p-2">
                  <label className="flex items-center flex-col justify-center cursor-pointer overflow-hidden" htmlFor="myFile">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="object-contain rounded-lg max-w-[300px] max-h-[300px] max-sm:max-h-[100%]"
                      />
                    ) : category.file ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${category.file}`}
                        alt="From server"
                        className="object-contain rounded-lg max-w-[300px] max-h-[300px] max-sm:max-h-[100%]"
                      />
                    ) : (
                      <>
                        <span className="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 489.4 489.4">
                            <path
                              d="M382.4 422.75H277.4v-106.1h34.7c8.8 0 14-10 8.8-17.2l-67.5-93.4c-4.3-6-13.2-6-17.5 0l-67.5 93.4c-5.2 7.2-.1 17.2 8.8 17.2h34.7v106.1H94.3c-52.5-2.9-94.3-52-94.3-105.2 0-36.7 19.9-68.7 49.4-86-2.7-7.3-4.1-15.1-4.1-23.3 0-37.5 30.3-67.8 67.8-67.8 8.1 0 15.9 1.4 23.2 4.1 21.7-46 68.5-77.9 122.9-77.9 70.4.1 128.4 54 135 122.7 54.1 9.3 95.2 59.4 95.2 116.1 0 60.6-47.2 113.1-107 117.3z"
                              fill="#2275fc"
                            />
                          </svg>
                        </span>
                        <span className="body-text text-[12px] text-center">
                          Drop your images here or <span className="text-[#2275fc]">click to browse</span>
                        </span>
                      </>
                    )}

                    <input
                      id="myFile"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>

                </div>

              </div>
            </div>



            <div className='flex items-center max-md:flex-wrap gap-[10px]'>
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Description</h3>
              <textarea
                placeholder="Description"
                onChange={(e) => setCategory({ ...category, description: e.target.value })}
                className="pt-[5px] w-[100%] max-sm:h-[100px] h-[120px] px-[15px] max-sm:px-[12px] border border-[#C8C8C8] text-[#9CA3AF] rounded-[7px] bg-transparent text-sm focus:ring-blue-500 focus:border-blue-500"
                value={category.description}
              />
            </div>




            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Home</h3>
              <div className="relative w-full flex gap-4 items-center">

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.is_home === "true"}
                    onChange={() =>
                      setCategory({ ...category, is_home: "true" }) // Set to "true" for Active
                    }
                    value="True"
                  />
                  <span className="text-sm">Active</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.is_home === "false"}
                    onChange={() =>
                      setCategory({ ...category, is_home: "false" }) // Set to "false" for Inactive
                    }
                    value="False"
                  />
                  <span className="text-sm">Inactive</span>
                </label>
              </div>
            </div>

            {/* <div className="flex flex-col items-center gap-2">
              <h3 className="font-bold text-gray-600">Active</h3>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={category.is_active}
                  checked={category.is_active === "True"}
                  onChange={(e) =>  
                    setCategory({ ...category, is_active: e.target.checked ? "True" : "False" })
                  }
                  className="sr-only peer"
                />
                <div
                  className={`w-14 h-8 rounded-full border transition-all duration-300 ${category.is_active == "True"
                    ? "bg-[#2275fc] border-[#2275fc]" // Active state (blue)
                    : "bg-gray-300 border-gray-300" // Inactive state (gray)
                    }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-6 h-6  rounded-full shadow-md transition-all duration-300 ${category.is_active === "True" ? " bg-white translate-x-6" : "bg-[#2275fc]"
                    }`}
                ></div>
              </label>




            </div> */}






            {/* <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Status</h3>
              <div className="relative w-full flex gap-4 items-center">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.is_active === 'True'}
                    onChange={() => handleChange('True')}
                  />
                  <span className="text-sm">Active</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.is_active === 'False'}
                    onChange={() => handleChange('False')}
                  />
                  <span className="text-sm">Inactive</span>
                </label>
              </div>
            </div> */}


            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Status</h3>
              <div className="relative w-full flex gap-4 items-center">

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.is_active === "true"}
                    onChange={() =>
                      setCategory({ ...category, is_active: "true" }) // Set to "true" for Active
                    }
                    value="True"
                  />
                  <span className="text-sm">Active</span>
                </label>

                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.is_active === "false"}
                    onChange={() =>
                      setCategory({ ...category, is_active: "false" }) // Set to "false" for Inactive
                    }
                    value="False"
                  />
                  <span className="text-sm">Inactive</span>
                </label>
              </div>
            </div>



            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[150px]"></h3>
              <button
                className="h-[50px] w-[200px] px-[22px] py-[15px] text-white flex items-center justify-center gap-2 font-inter text-sm font-bold leading-5 border border-[#2275fc] rounded-[12px] bg-[#2275fc] max-md:w-full"
                onClick={handleEditCategory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={modalImage}
              alt="Zoomed"
              className="w-auto h-auto max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full text-xl"
              onClick={closeModal1}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Edit_SubCategory
