import React, { useState, useEffect, useRef } from "react";
import User_side_menu from '../Componenet/user_side_menu';
import { useLocation, useNavigate } from "react-router-dom";
import EmployList from '../Componenet/EmployList';
import SubHeader from '../Componenet/sub_header';
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEditCategoryMutation, useGetCategoriesQuery } from "../services/apiSlice";
import Dropdown from "../Componenet/dropdown";

const Edit_Category = () => {
  const [modal, setModal] = useState(null);

  const openModal = (modalId) => {
    setModal(modalId);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    file: "",
    is_home: "",
    is_active: "",
    category_type: "",
    category_id: ""
  });





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
  const categoryId = location?.state?.category_id;


  const { data: categories } = useGetCategoriesQuery();
  const categoriesData = categories?.data || [];


  const matedData = categoriesData.find(c => c.category_id == categoryId);



  useEffect(() => {
    if (categoryId && categoriesData.length > 0) {
      const selectedCategory = categoriesData.find(c => c.category_id === categoryId);
      if (selectedCategory) {
        setCategory({
          name: selectedCategory.name || "",
          description: selectedCategory.description || "",
          is_home: selectedCategory.is_home?.toString() || "True",
          is_active: selectedCategory.is_active?.toString() || "True",
          category_type: selectedCategory.category_type || "",
          category_id: selectedCategory.category_id,
          file: selectedCategory.category_img,
        });
        setSelectedImage(`${import.meta.env.VITE_API_BASE_URL}${selectedCategory.category_img}`)

      }
    }
  }, [categoriesData, categoryId]);



  const [editCategory] = useEditCategoryMutation();
  const handleEditCategory = async () => {
    try {
      // === Simple Boolean Capitalizer ===
      const capitalizeBoolean = (value) =>
        value?.toString().charAt(0).toUpperCase() + value?.toString().slice(1);



      const formData = new FormData();
      let imageBlob = null;
      if (selectedImage instanceof File) {
        imageBlob = selectedImage;
      } else if (typeof selectedImage === "string" && !selectedImage.startsWith("http")) {
        try {
          const response = await fetch(selectedImage);
          imageBlob = await response.blob();
          console.log();

        } catch (err) {

        }
      } else {
        imageBlob = null;
      }

      if (imageBlob) {

        formData.append("category_img", imageBlob);
      }


      // Optional Preview
      // const previewURL = URL.createObjectURL(imageBlob);
      // setSelectedImage(previewURL);
      // URL.revokeObjectURL(previewURL);

      // === FormData Assembly ===

      formData.append("name", category.name.trim());
      formData.append("description", category.description.trim());
      // formData.append("category_img", imageBlob);
      formData.append("category_type", category.category_type);
      formData.append("is_active", capitalizeBoolean(category.is_active));
      formData.append("is_home", capitalizeBoolean(category.is_home));
      formData.append("category_id", category.category_id);

      // === API Call ===
      const response = await editCategory({ id: category.category_id, formData }).unwrap();
      if (response) {
        toast.success(response.message);
        setTimeout(() => navigate("/category"), 2000);
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
      setSelectedImage(previewURL);
      setCategory((prev) => ({ ...prev, file }));
    }
  };

  const imageSrc = selectedImage
    ? selectedImage
    : category.file && !category.file.startsWith("http") && !category.file.startsWith("blob:")
      ? `${import.meta.env.VITE_API_BASE_URL}${category.file}`
      : `${import.meta.env.VITE_API_BASE_URL}${category.file}`;








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

  // -------------------------------
  const [searchTerm, setSearchTerm] = useState("");

  // Category options
  const categoryOptions = [
    "Jewelry",
    "Diamond",
    "Engagement",
    "Wedding",
    "High Jewelry",
    "Collections",
    "Gifts",
  ];

  // Filter options based on the search term
  const filteredOptions = categoryOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle category selection
  const handleCategorySelect = (value) => {
    setCategory({ ...category, category_type: value });
    setOpenDropdown(null); // Close dropdown after selection
  };

  const toggleDropdown1 = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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
                    <Link to="/category" className="hover:text-primary transition-colors font-[12px] text-[#575864]">Category</Link>
                    <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </li>
                  <li className="text-primary font-medium text-[12px]">Edit Category</li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="flex flex-col max-sm:py-[24px] max-sm:px-[15px] gap-6 p-6 rounded-xl bg-white shadow-[0_4px_24px_2px_rgba(20,25,38,0.05)]">
            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Category name <span className="text-[#ff5200]">*</span></h3>
              <input
                className="w-full p-[14px_22px] text-sm font-normal leading-5 bg-transparent border border-[#d6e0ea] rounded-xl text-[#9CA3AF] outline-0 shadow-none mb-0 font-inter"
                placeholder="Category name"
                required
                type="text"
                name="name"
                value={category.name}
                onChange={(e) => {
                  const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Removes everything except letters and spaces
                  setCategory({ ...category, name: lettersOnly });
                }}
              />

            </div>

            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Upload images  <span className="text-[#ff5200]">*</span></h3>
              <div className="w-full relative">
                <div className="min-h-[250px] flex items-center w-full rounded-[12px] border border-dashed border-[#2275fc] p-4 max-sm:p-2 ">
                  <label className="flex items-center flex-col justify-center cursor-pointer overflow-hidden" htmlFor="myFile">

                    {/* Show API image if category.file exists */}
                    {/* {category.file && (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL}${category.file}`}

                        className="object-contain rounded-lg max-w-[300px] max-h-[300px]"
                      />
                    )} */}

                    {/* Show selected image if imageSrc exists */}
                    {selectedImage && (
                      <img
                        src={selectedImage}

                        className="object-contain rounded-lg max-w-[300px]  max-sm:max-h-[100%]"
                      />
                    )}


                    {!category.file && !imageSrc && (
                      <>
                        <span className="icon">
                          <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 489.4 489.4" className=""><g><path d="M382.4 422.75H277.4v-106.1h34.7c8.8 0 14-10 8.8-17.2l-67.5-93.4c-4.3-6-13.2-6-17.5 0l-67.5 93.4c-5.2 7.2-.1 17.2 8.8 17.2h34.7v106.1H94.3c-52.5-2.9-94.3-52-94.3-105.2 0-36.7 19.9-68.7 49.4-86-2.7-7.3-4.1-15.1-4.1-23.3 0-37.5 30.3-67.8 67.8-67.8 8.1 0 15.9 1.4 23.2 4.1 21.7-46 68.5-77.9 122.9-77.9 70.4.1 128.4 54 135 122.7 54.1 9.3 95.2 59.4 95.2 116.1 0 60.6-47.2 113.1-107 117.3z" fill="#2275fc"></path></g></svg></span>
                        </span>
                        <span className="body-text text-[12px] text-center">
                          Drop your images here or <span className="text-[#2275fc]">click to browse</span>
                        </span>
                      </>
                    )}

                    {/* File input */}
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

            <div className="flex items-center max-md:flex-wrap gap-[10px]">
              <h3 className="text-[#111] text-sm font-bold w-[100%] max-w-[300px] max-lg:w-[200px]">Select Category Type</h3>
              <div className="relative w-full">
                {/* <Dropdown
                  label="Category Type"
                  options={[
                    "Jewelry",
                    "Diamond",
                    "Engagement",
                    "Wedding",
                    "High Jewelry",
                    "Collections",
                    "Gifts",
                  ]}
                  value={category.category_type}
                  defaultValue={category.category_type || "Category Type"}
                  onSelect={(value) => {
                    setCategory({ ...category, category_type: value });
                    setOpenDropdown(null); // Close after selecting
                  }}
                  isOpen={openDropdown === 2}
                  onToggle={() => toggleDropdown(2)}
                  ref={(el) => (dropdownRefs.current[2] = el)}
                /> */}
                <Dropdown

                  options={filteredOptions} // Pass filtered options here
                  value={category.category_type}
                  defaultValue={category.category_type || "Category Type"}
                  onSelect={handleCategorySelect}
                  isOpen={openDropdown === 2}
                  onToggle={() => toggleDropdown1(2)}
                  ref={(el) => (dropdownRefs.current[2] = el)}
                  searchable={true} // Enable search inside the dropdown
                />
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

export default Edit_Category
