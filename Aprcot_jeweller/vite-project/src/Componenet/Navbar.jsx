import React, { useState, useEffect, useRef } from 'react'
import Logo from '../assets/logo.png'
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
import wishlist_img from '../assets/wishlist_img.png'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAddAppoinmnetMutation, useGetAllProductQuery, useGetAppoinmentQuery, useGetCategoriesQuery, useGetTocartQuery, useGetWishlistQuery } from '../services/apiSlice'
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FaClock } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isDropdownOpenWishlist, setIsDropdownOpenWishlist] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpenWishlist(!isDropdownOpenWishlist);
  };
  const [modal, setmodal] = useState("");
  const openModal = (modalId) => {
    setmodal(modalId);
  };

  const { data: cart } = useGetTocartQuery(undefined, {
    skip: !localStorage.getItem('aprifrontoken'),
  });


  const closeModal = () => {
    setmodal(null);
  };

  // const { pathname } = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scrolls to the top when the route changes
  // }, [pathname]);


  const navigate = useNavigate();


  const {
    data: products_Data,
    isLoading: productDataLoading,
    error: productDataError,
  } = useGetAllProductQuery({ search: searchTerm });

  const Product_item = Array.isArray(products_Data?.data) ? products_Data.data : [];





  const { data: whislist } = useGetWishlistQuery(undefined, {
    skip: !localStorage.getItem('aprifrontoken'),
  });
  const wishlistData = Array.isArray(whislist?.data) ? whislist.data : [];

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAccountClick = () => {
    const token = localStorage.getItem('aprifrontoken');
    if (token) {
      // Toggle dropdown only if user is logged in
      setOpen(prev => !prev);
    } else {
      // Redirect to sign-in page if not logged in
      navigate('/signin');
    }
  };
  const logout = () => {
    localStorage.removeItem('aprifrontoken');
    toast.success('Logout successfully', {
      position: "bottom-center",
      autoClose: 1500,
    });

    // Set a temporary flag to trigger one-time refresh
    sessionStorage.setItem("shouldRefresh", "true");

    setTimeout(() => {
      navigate('/');
    }, 1000);

    closeModal();
  };



  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);


  const { data: appoinment } = useGetAppoinmentQuery(undefined, {
    skip: !localStorage.getItem('aprifrontoken'),
  });

  const bookedSlots = appoinment?.data?.filter(
    (appt) => appt.appointment_date === moment(date).format("YYYY-MM-DD")
  ) || [];




  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    appointment_date: "",
    appointment_start_time: "",
    appointment_end_time: "",
    category_id: "",
  });
  const currentTime = moment();
  const isToday = moment(date).isSame(moment(), "day");

  const slots = Array.from({ length: 9 }, (_, i) => {
    const hour = 9 + i;
    const slotTime = moment(date).set({ hour, minute: 0, second: 0 });

    const formattedStart = slotTime.format("HH:mm:ss");

    const isBooked = bookedSlots.some(
      (appt) => appt.appointment_start_time === formattedStart
    );

    return {
      start: formattedStart,
      label: slotTime.format("h:mm A"),
      isFuture: !isToday || slotTime.isAfter(currentTime),
      isBooked,
    };
  }).filter((slot) => slot.isFuture && !slot.isBooked); // ❗ Filter out booked ones

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot.start);

    setFormData((prev) => ({
      ...prev,
      appointment_date: moment(date).format("YYYY-MM-DD"),
      appointment_start_time: slot.start,
      appointment_end_time: moment(slot.start, "HH:mm:ss").add(1, "hour").format("HH:mm:ss"),
    }));
  };


  const goToPreviousDay = () => {
    const newDate = moment(date).subtract(1, "day").toDate();
    setDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = moment(date).add(1, "day").toDate();
    setDate(newDate);
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const { data: cate } = useGetCategoriesQuery()

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCheckboxChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      category_id: id
    }));

    setSelectedCategoryId((prevId) => (prevId === id ? null : id));
  };


  const [Addappoinmnet] = useAddAppoinmnetMutation()

  const handleSubmit = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        "first_name",
        "last_name",
        "email",
        "mobile",
        "appointment_date",
        "appointment_start_time",
        "appointment_end_time",
        "category_id"
      ];

      const missingField = requiredFields.find((field) => !formData[field]);

      if (missingField) {
        toast.error(`Please fill in the ${missingField.replaceAll("_", " ")} field.`, {
          position: "bottom-center",
          autoClose: 1500,
        });
        return;
      }

      // Append form data
      const formdata = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formdata.append(key, value);
      });

      // Call the API
      const response = await Addappoinmnet(formdata).unwrap();

      toast.success("Appointment booked successfully!", {
        position: "bottom-center",
        autoClose: 1500,
      });

      // Reset form fields after success
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        appointment_date: '',
        appointment_start_time: '',
        appointment_end_time: '',
        category_id: '',
      });
      setSelectedCategoryId((prevId) => null);
      closeModal()

    } catch (error) {
      if (error?.status === 401) {
        toast.error("Please login first.", {
          position: "bottom-center",
          autoClose: 1500,
        });
      } else {
        toast.error(error?.data?.message || "Something went wrong", {
          position: "bottom-center",
          autoClose: 1500,
        });
      }
    }
  };


  const getFullyBookedDates = (appointments) => {
    const bookedDatesMap = {};

    appointments?.data?.forEach((appt) => {
      const date = appt.appointment_date;

      if (!bookedDatesMap[date]) {
        bookedDatesMap[date] = new Set();
      }

      bookedDatesMap[date].add(appt.appointment_start_time);
    });

    // return dates where all 9 hours (9–17) are booked
    return Object.entries(bookedDatesMap)
      .filter(([_, times]) => times.size >= 9) // 9 full slots booked
      .map(([date]) => date);
  };

  const fullyBookedDates = getFullyBookedDates(appoinment);




  return (
    <div>
      <ToastContainer autoClose={1500} />
      <div className="relative z-[100] ">

        <div className="bg-[#D86A37] py-[8px] flex justify-center relative z-[200]">
          <p className="sans font-normal text-[14px] leading-[100%] tracking-[0.05em] capitalize text-white max-sm:text container text-center max-sm:text-[12px]">
            Free shipping | Free 30 days return
          </p>
        </div>

        <div className="relative z-[200] bg-white">
          <div className='container '>
            <div className='flex justify-between py-[11px] items-center'>
              <div className='w-[260px] max-lg:w-[90px]'>


                <div className='flex  gap-[40px] max-lg:gap-[20px]  max-md:gap-[12px] items-center'>
                  <div className="lg:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)}>
                      {isOpen ? <X size={28} /> : <Menu size={24} />}
                    </button>
                  </div>


                  <div className='cursor-pointer' onClick={() => {
                    if (!localStorage.getItem('aprifrontoken')) {
                      navigate('/signin')
                      return
                    }
                    openModal('book_appo')
                  }}>
                    <div className='flex justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 17" fill="none" className='mb-2  max-lg:mb-0'>
                        <path d="M7.70023 14.2955H1.93182C1.62441 14.2955 1.32959 14.1733 1.11222 13.956C0.894845 13.7386 0.772727 13.4438 0.772727 13.1364V5.02273H13.5227V7.46455C13.5227 7.56702 13.5634 7.66529 13.6359 7.73775C13.7083 7.8102 13.8066 7.85091 13.9091 7.85091C14.0116 7.85091 14.1098 7.8102 14.1823 7.73775C14.2547 7.66529 14.2955 7.56702 14.2955 7.46455V3.09091C14.2948 2.57875 14.0911 2.08774 13.729 1.72558C13.3668 1.36343 12.8758 1.1597 12.3636 1.15909H11.5909C11.5909 0.851681 11.4688 0.556862 11.2514 0.33949C11.034 0.122118 10.7392 0 10.4318 0C10.1244 0 9.82959 0.122118 9.61222 0.33949C9.39485 0.556862 9.27273 0.851681 9.27273 1.15909H5.02273C5.02273 0.851681 4.90061 0.556862 4.68324 0.33949C4.46587 0.122118 4.17105 0 3.86364 0C3.55623 0 3.26141 0.122118 3.04404 0.33949C2.82666 0.556862 2.70455 0.851681 2.70455 1.15909H1.93182C1.41966 1.1597 0.928647 1.36343 0.566494 1.72558C0.204341 2.08774 0.00061349 2.57875 0 3.09091V13.1364C0.00061349 13.6485 0.204341 14.1395 0.566494 14.5017C0.928647 14.8638 1.41966 15.0676 1.93182 15.0682H7.70023C7.8027 15.0682 7.90097 15.0275 7.97343 14.955C8.04588 14.8826 8.08659 14.7843 8.08659 14.6818C8.08659 14.5793 8.04588 14.4811 7.97343 14.4086C7.90097 14.3362 7.8027 14.2955 7.70023 14.2955ZM10.0455 1.15909C10.0455 1.05662 10.0862 0.958348 10.1586 0.885891C10.2311 0.813433 10.3293 0.772727 10.4318 0.772727C10.5343 0.772727 10.6326 0.813433 10.705 0.885891C10.7775 0.958348 10.8182 1.05662 10.8182 1.15909V1.93182C10.8182 2.03429 10.7775 2.13256 10.705 2.20502C10.6326 2.27748 10.5343 2.31818 10.4318 2.31818C10.3293 2.31818 10.2311 2.27748 10.1586 2.20502C10.0862 2.13256 10.0455 2.03429 10.0455 1.93182V1.15909ZM3.47727 1.15909C3.47727 1.05662 3.51798 0.958348 3.59044 0.885891C3.66289 0.813433 3.76117 0.772727 3.86364 0.772727C3.96611 0.772727 4.06438 0.813433 4.13684 0.885891C4.20929 0.958348 4.25 1.05662 4.25 1.15909V1.93182C4.25 2.03429 4.20929 2.13256 4.13684 2.20502C4.06438 2.27748 3.96611 2.31818 3.86364 2.31818C3.76117 2.31818 3.66289 2.27748 3.59044 2.20502C3.51798 2.13256 3.47727 2.03429 3.47727 1.93182V1.15909ZM0.772727 3.09091C0.772727 2.7835 0.894845 2.48868 1.11222 2.27131C1.32959 2.05394 1.62441 1.93182 1.93182 1.93182H2.70455C2.70455 2.23923 2.82666 2.53405 3.04404 2.75142C3.26141 2.96879 3.55623 3.09091 3.86364 3.09091C4.17105 3.09091 4.46587 2.96879 4.68324 2.75142C4.90061 2.53405 5.02273 2.23923 5.02273 1.93182H9.27273C9.27273 2.23923 9.39485 2.53405 9.61222 2.75142C9.82959 2.96879 10.1244 3.09091 10.4318 3.09091C10.7392 3.09091 11.034 2.96879 11.2514 2.75142C11.4688 2.53405 11.5909 2.23923 11.5909 1.93182H12.3636C12.671 1.93182 12.9659 2.05394 13.1832 2.27131C13.4006 2.48868 13.5227 2.7835 13.5227 3.09091V4.25H0.772727V3.09091Z" fill="black" />
                        <path d="M4.63619 6.95454C4.63619 6.7496 4.55477 6.55306 4.40986 6.40814C4.26494 6.26323 4.0684 6.18182 3.86346 6.18182H2.70437C2.49943 6.18182 2.30288 6.26323 2.15797 6.40814C2.01305 6.55306 1.93164 6.7496 1.93164 6.95454V8.11363C1.93164 8.31857 2.01305 8.51512 2.15797 8.66003C2.30288 8.80495 2.49943 8.88636 2.70437 8.88636H3.86346C4.0684 8.88636 4.26494 8.80495 4.40986 8.66003C4.55477 8.51512 4.63619 8.31857 4.63619 8.11363V6.95454ZM2.70437 8.11363V6.95454H3.86346V8.11363H2.70437ZM8.49982 6.95454C8.49982 6.7496 8.41841 6.55306 8.2735 6.40814C8.12858 6.26323 7.93203 6.18182 7.7271 6.18182H6.568C6.36306 6.18182 6.16652 6.26323 6.0216 6.40814C5.87669 6.55306 5.79528 6.7496 5.79528 6.95454V8.11363C5.79528 8.31857 5.87669 8.51512 6.0216 8.66003C6.16652 8.80495 6.36306 8.88636 6.568 8.88636H7.7271C7.93203 8.88636 8.12858 8.80495 8.2735 8.66003C8.41841 8.51512 8.49982 8.31857 8.49982 8.11363V6.95454ZM6.568 8.11363V6.95454H7.7271V8.11363H6.568ZM11.9771 7.78136C12.0796 7.78136 12.1778 7.74066 12.2503 7.6682C12.3228 7.59574 12.3635 7.49747 12.3635 7.395V6.95454C12.3635 6.7496 12.282 6.55306 12.1371 6.40814C11.9922 6.26323 11.7957 6.18182 11.5907 6.18182H10.4316C10.2267 6.18182 10.0302 6.26323 9.88524 6.40814C9.74033 6.55306 9.65891 6.7496 9.65891 6.95454V8.06727C9.65891 8.16974 9.69962 8.26801 9.77208 8.34047C9.84453 8.41293 9.94281 8.45363 10.0453 8.45363C10.1477 8.45363 10.246 8.41293 10.3185 8.34047C10.3909 8.26801 10.4316 8.16974 10.4316 8.06727V6.95454H11.5907V7.395C11.5907 7.49747 11.6314 7.59574 11.7039 7.6682C11.7764 7.74066 11.8746 7.78136 11.9771 7.78136ZM3.86346 10.0455H2.70437C2.49943 10.0455 2.30288 10.1269 2.15797 10.2718C2.01305 10.4167 1.93164 10.6132 1.93164 10.8182V11.9773C1.93164 12.1822 2.01305 12.3788 2.15797 12.5237C2.30288 12.6686 2.49943 12.75 2.70437 12.75H3.86346C4.0684 12.75 4.26494 12.6686 4.40986 12.5237C4.55477 12.3788 4.63619 12.1822 4.63619 11.9773V10.8182C4.63619 10.6132 4.55477 10.4167 4.40986 10.2718C4.26494 10.1269 4.0684 10.0455 3.86346 10.0455ZM2.70437 11.9773V10.8182H3.86346V11.9773H2.70437ZM7.99369 10.0961C7.90885 10.0624 7.81837 10.0452 7.7271 10.0455H6.568C6.36306 10.0455 6.16652 10.1269 6.0216 10.2718C5.87669 10.4167 5.79528 10.6132 5.79528 10.8182V11.9773C5.79528 12.1822 5.87669 12.3788 6.0216 12.5237C6.16652 12.6686 6.36306 12.75 6.568 12.75H7.35619C7.45866 12.75 7.55693 12.7093 7.62939 12.6368C7.70184 12.5644 7.74255 12.4661 7.74255 12.3636C7.74255 12.2612 7.70184 12.1629 7.62939 12.0904C7.55693 12.018 7.45866 11.9773 7.35619 11.9773H6.568V10.8182L7.70778 10.8139C7.80278 10.8509 7.90856 10.8489 8.00206 10.8082C8.09556 10.7675 8.16919 10.6916 8.20692 10.5969C8.24464 10.5021 8.2434 10.3963 8.20346 10.3025C8.16351 10.2087 8.08811 10.1345 7.99369 10.0961ZM12.7498 8.5C11.9093 8.5 11.0876 8.74926 10.3886 9.21625C9.68974 9.68325 9.14501 10.347 8.82333 11.1236C8.50166 11.9002 8.4175 12.7547 8.58149 13.5791C8.74547 14.4036 9.15024 15.1608 9.74462 15.7552C10.339 16.3496 11.0963 16.7543 11.9207 16.9183C12.7451 17.0823 13.5996 16.9982 14.3762 16.6765C15.1528 16.3548 15.8166 15.8101 16.2836 15.1112C16.7506 14.4123 16.9998 13.5906 16.9998 12.75C16.9985 11.6232 16.5503 10.543 15.7536 9.74626C14.9568 8.94952 13.8766 8.50133 12.7498 8.5ZM12.7498 16.2273C12.0621 16.2273 11.3898 16.0233 10.818 15.6412C10.2461 15.2592 9.80043 14.7161 9.53724 14.0807C9.27405 13.4453 9.20519 12.7461 9.33936 12.0716C9.47354 11.3971 9.80471 10.7775 10.291 10.2912C10.7773 9.80489 11.3969 9.47371 12.0714 9.33954C12.746 9.20537 13.4451 9.27423 14.0805 9.53742C14.7159 9.8006 15.259 10.2463 15.6411 10.8181C16.0232 11.39 16.2271 12.0623 16.2271 12.75C16.2261 13.6719 15.8594 14.5558 15.2075 15.2077C14.5556 15.8596 13.6717 16.2262 12.7498 16.2273Z" fill="black" />
                        <path d="M13.1365 12.59V10.8182C13.1365 10.7157 13.0958 10.6174 13.0233 10.545C12.9509 10.4725 12.8526 10.4318 12.7501 10.4318C12.6477 10.4318 12.5494 10.4725 12.4769 10.545C12.4045 10.6174 12.3638 10.7157 12.3638 10.8182V12.75C12.3638 12.8525 12.4045 12.9507 12.477 13.0232L13.2497 13.7959C13.3226 13.8663 13.4202 13.9052 13.5215 13.9043C13.6228 13.9034 13.7197 13.8628 13.7913 13.7912C13.8629 13.7195 13.9036 13.6226 13.9045 13.5213C13.9053 13.42 13.8664 13.3224 13.796 13.2496L13.1365 12.59Z" fill="black" />
                      </svg>
                    </div>
                    <span className="sans font-medium text-[13px] leading-[100%] tracking-[0em] capitalize max-lg:hidden">
                      Book Appointment
                    </span>

                  </div>
                  <div onClick={() => setIsSearchModalOpen(true)} className="cursor-pointer search__cici">
                    <div className='flex items-center justify-center h-[27px]'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 17 17"
                        fill="none"
                        className=' max-lg:mb-0'
                      >
                        <path
                          d="M16.7924 15.7909L11.9581 10.9565C12.8945 9.7998 13.4583 8.33 13.4583 6.72918C13.4583 3.01893 10.4394 0 6.72914 0C3.01889 0 0 3.01889 0 6.72914C0 10.4394 3.01893 13.4583 6.72918 13.4583C8.33 13.4583 9.7998 12.8945 10.9565 11.9581L15.7909 16.7924C15.929 16.9306 16.1103 17 16.2917 17C16.473 17 16.6544 16.9306 16.7925 16.7924C17.0694 16.5155 17.0694 16.0678 16.7924 15.7909ZM6.72918 12.0416C3.7995 12.0416 1.41668 9.65882 1.41668 6.72914C1.41668 3.79947 3.7995 1.41664 6.72918 1.41664C9.65885 1.41664 12.0417 3.79947 12.0417 6.72914C12.0417 9.65882 9.65882 12.0416 6.72918 12.0416Z"
                          fill="#171D2A"
                        />
                      </svg>
                    </div>
                    <span className="sans font-medium text-[13px] leading-[100%] tracking-[0em] capitalize max-lg:hidden">
                      Search
                    </span>
                  </div>
                  <div className='max-lg:hidden'>
                    <div className='flex justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 17" fill="none" className='mb-2  max-lg:mb-0'>
                        <path d="M13.4352 10.5309C13.0872 10.1685 12.6674 9.97475 12.2225 9.97475C11.7812 9.97475 11.3578 10.1649 10.9954 10.5273L9.86159 11.6575C9.7683 11.6073 9.67501 11.5606 9.58532 11.514C9.45615 11.4494 9.33416 11.3884 9.23011 11.3238C8.16807 10.6493 7.20291 9.77024 6.27721 8.63285C5.82871 8.06596 5.52732 7.58876 5.30846 7.10438C5.60267 6.83528 5.87536 6.55542 6.14087 6.28632C6.24133 6.18586 6.34179 6.08181 6.44226 5.98135C7.19573 5.22787 7.19573 4.25195 6.44226 3.49848L5.46274 2.51896C5.35151 2.40773 5.2367 2.29292 5.12906 2.1781C4.91378 1.95565 4.68774 1.72602 4.45452 1.51074C4.10649 1.1663 3.69029 0.983311 3.25255 0.983311C2.81482 0.983311 2.39144 1.1663 2.03264 1.51074C2.02906 1.51433 2.02906 1.51433 2.02547 1.51792L0.80556 2.74859C0.3463 3.20785 0.0843785 3.76757 0.026971 4.41699C-0.0591402 5.46468 0.249425 6.44061 0.486231 7.07927C1.06748 8.64721 1.93577 10.1003 3.23103 11.6575C4.80256 13.534 6.69341 15.0158 8.85337 16.0599C9.6786 16.451 10.7801 16.9139 12.0108 16.9928C12.0861 16.9964 12.1651 17 12.2368 17C13.0656 17 13.7617 16.7022 14.3071 16.1102C14.3107 16.103 14.3178 16.0994 14.3214 16.0922C14.508 15.8662 14.7233 15.6617 14.9493 15.4428C15.1036 15.2957 15.2615 15.1414 15.4158 14.98C15.771 14.6104 15.9575 14.1799 15.9575 13.7385C15.9575 13.2936 15.7674 12.8667 15.405 12.5079L13.4352 10.5309ZM14.7197 14.309C14.7161 14.309 14.7161 14.3126 14.7197 14.309C14.5798 14.4597 14.4362 14.5961 14.282 14.7467C14.0487 14.9692 13.8119 15.2024 13.5895 15.4643C13.2271 15.8518 12.8001 16.0348 12.2404 16.0348C12.1866 16.0348 12.1292 16.0348 12.0754 16.0312C11.0097 15.9631 10.0195 15.5469 9.27675 15.1917C7.24596 14.2086 5.46274 12.8128 3.98091 11.044C2.75741 9.56931 1.93936 8.20589 1.39757 6.742C1.06389 5.84859 0.941903 5.15253 0.995722 4.49593C1.0316 4.07614 1.19306 3.72811 1.49086 3.4303L2.71436 2.20681C2.89017 2.04176 3.07674 1.95206 3.25973 1.95206C3.48577 1.95206 3.66876 2.0884 3.78357 2.20322C3.78716 2.20681 3.79075 2.2104 3.79434 2.21398C4.0132 2.4185 4.2213 2.63019 4.44017 2.85623C4.5514 2.97104 4.66621 3.08586 4.78103 3.20426L5.76054 4.18378C6.14087 4.5641 6.14087 4.91572 5.76054 5.29605C5.65649 5.4001 5.55603 5.50415 5.45198 5.60461C5.15059 5.91318 4.86355 6.20021 4.5514 6.48008C4.54422 6.48725 4.53705 6.49084 4.53346 6.49801C4.22489 6.80658 4.2823 7.10797 4.34688 7.31248C4.35047 7.32325 4.35406 7.33401 4.35765 7.34477C4.61239 7.96191 4.97119 8.54316 5.51656 9.23563L5.52015 9.23922C6.51043 10.4591 7.55453 11.4099 8.70626 12.1383C8.85337 12.2316 9.00406 12.3069 9.14758 12.3787C9.27675 12.4433 9.39874 12.5043 9.50279 12.5689C9.51714 12.576 9.5315 12.5868 9.54585 12.594C9.66784 12.655 9.78265 12.6837 9.90106 12.6837C10.1989 12.6837 10.3854 12.4971 10.4464 12.4361L11.6735 11.209C11.7955 11.087 11.9893 10.9399 12.2153 10.9399C12.4377 10.9399 12.6207 11.0798 12.732 11.2018C12.7355 11.2054 12.7356 11.2054 12.7391 11.209L14.7161 13.186C15.0857 13.552 15.0857 13.9287 14.7197 14.309Z" fill="#171D2A" />
                        <path d="M9.18728 4.04385C10.1273 4.20172 10.9813 4.64663 11.663 5.32835C12.3447 6.01006 12.786 6.864 12.9475 7.80404C12.9869 8.04085 13.1914 8.20589 13.4247 8.20589C13.4534 8.20589 13.4785 8.20231 13.5072 8.19872C13.7727 8.15566 13.9485 7.90451 13.9054 7.639C13.7117 6.50161 13.1735 5.46469 12.3519 4.64304C11.5302 3.8214 10.4933 3.2832 9.35591 3.08945C9.0904 3.0464 8.84283 3.22221 8.79619 3.48413C8.74955 3.74605 8.92177 4.0008 9.18728 4.04385Z" fill="#171D2A" />
                        <path d="M16.9801 7.49907C16.6607 5.62615 15.7781 3.92186 14.4219 2.56561C13.0656 1.20936 11.3613 0.326721 9.4884 0.0073922C9.22648 -0.0392514 8.97891 0.140147 8.93226 0.402069C8.88921 0.667578 9.06502 0.915148 9.33053 0.961791C11.0025 1.24524 12.5274 2.03818 13.7401 3.24733C14.9529 4.46006 15.7422 5.98494 16.0257 7.65694C16.0651 7.89374 16.2697 8.05879 16.5029 8.05879C16.5316 8.05879 16.5567 8.0552 16.5854 8.05161C16.8473 8.01215 17.0267 7.76099 16.9801 7.49907Z" fill="#171D2A" />
                      </svg>
                    </div>
                    <a href="tel:+916352743508" title='mobile' className="sans font-medium text-[13px] leading-[100%] tracking-[0em] capitalize max-lg:hidden">
                      +91 63527 43508
                    </a>

                  </div>

                </div>
              </div>
              <Link to='/' title='home'>
                <div className='flex '>
                  <img src={Logo} alt="logo img" title='logo img' className='max-sm:h-[40px]' />
                </div>

              </Link>

              <div className='max-lg:w-[90px]'>
                <div className='flex justify-between gap-[40px] max-lg:gap-[20px]  max-md:gap-[12px] '>
                  <div onClick={() => setIsSearchModalOpen(true)} className="cursor-pointer max-lg:hidden">
                    <div className='flex justify-center h-[27px]'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 17 17"
                        fill="none"
                        className=' max-lg:mb-0'
                      >
                        <path
                          d="M16.7924 15.7909L11.9581 10.9565C12.8945 9.7998 13.4583 8.33 13.4583 6.72918C13.4583 3.01893 10.4394 0 6.72914 0C3.01889 0 0 3.01889 0 6.72914C0 10.4394 3.01893 13.4583 6.72918 13.4583C8.33 13.4583 9.7998 12.8945 10.9565 11.9581L15.7909 16.7924C15.929 16.9306 16.1103 17 16.2917 17C16.473 17 16.6544 16.9306 16.7925 16.7924C17.0694 16.5155 17.0694 16.0678 16.7924 15.7909ZM6.72918 12.0416C3.7995 12.0416 1.41668 9.65882 1.41668 6.72914C1.41668 3.79947 3.7995 1.41664 6.72918 1.41664C9.65885 1.41664 12.0417 3.79947 12.0417 6.72914C12.0417 9.65882 9.65882 12.0416 6.72918 12.0416Z"
                          fill="#171D2A"
                        />
                      </svg>
                    </div>
                    <span className="sans font-medium text-[13px] leading-[100%] tracking-[0em] capitalize max-lg:hidden">
                      Search
                    </span>
                  </div>

                  <div className='relative' ref={menuRef}>
                    <div className='cursor-pointer' onClick={() => {
                      if (localStorage.getItem('aprifrontoken')) {

                        navigate('/profile')
                      } else {
                        navigate('/signin')

                      }

                    }}>
                      <div className='flex justify-center h-[27px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 17" fill="none" className='max-lg:mb-0'>
                          <path d="M7.92094 9.57542C2.81307 9.57542 0 11.9918 0 16.3796C0 16.7223 0.277744 17 0.620434 17H15.2214C15.5641 17 15.8418 16.7223 15.8418 16.3796C15.8419 11.992 13.0288 9.57542 7.92094 9.57542ZM1.26345 15.7591C1.50749 12.4785 3.74415 10.8163 7.92094 10.8163C12.0977 10.8163 14.3344 12.4785 14.5787 15.7591H1.26345Z" fill="#171D2A" />
                          <path d="M7.92074 0C5.57444 0 3.80518 1.80486 3.80518 4.1981C3.80518 6.66144 5.65141 8.66525 7.92074 8.66525C10.1901 8.66525 12.0363 6.66144 12.0363 4.1983C12.0363 1.80486 10.267 0 7.92074 0ZM7.92074 7.42458C6.33552 7.42458 5.04605 5.97729 5.04605 4.1983C5.04605 2.48466 6.25507 1.24087 7.92074 1.24087C9.55975 1.24087 10.7954 2.51215 10.7954 4.1983C10.7954 5.97729 9.50596 7.42458 7.92074 7.42458Z" fill="#171D2A" />
                        </svg>
                      </div>
                      <span className="sans font-medium text-[13px] leading-[100%] tracking-[0em] capitalize max-lg:hidden">
                        My Account
                      </span>
                    </div>


                  </div>


                  {/* <div onClick={toggleDropdown}> */}
                  <Link to="/wishlist" title='wishlist'>
                    <div className="relative flex flex-col items-center">
                      {/* Wishlist count badge */}
                      {wishlistData?.length > 0 && (
                        <span className="absolute -top-2 right-1 bg-primary max-sm:-right-1 max-sm:w-[12px] max-sm:text-[9px] max-sm:h-[12px] text-white text-[10px] font-bold h-[16px] w-[16px] flex items-center justify-center rounded-full z-10">
                          {wishlistData?.length}
                        </span>
                      )}


                      {/* Heart Icon */}
                      <div className="flex justify-center h-[27px] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 20 18"
                          fill="none"
                          className=" max-lg:mb-0"
                        >
                          <path
                            d="M14.2188 0C13.4278 0.000919905 12.6454 0.163883 11.9198 0.478837C11.1942 0.793791 10.5408 1.25406 10 1.83125C9.20741 0.985346 8.17883 0.397243 7.04779 0.143288C5.91675 -0.110667 4.73548 -0.0187457 3.65734 0.40712C2.5792 0.832985 1.65398 1.57313 1.00179 2.53146C0.349606 3.48979 0.000570719 4.62205 0 5.78125C0 11.5375 9.28438 17.1875 9.6875 17.4094C9.78471 17.4678 9.89597 17.4986 10.0094 17.4986C10.1228 17.4986 10.234 17.4678 10.3313 17.4094C10.7156 17.1875 20 11.5375 20 5.78125C19.9983 4.24847 19.3887 2.77895 18.3049 1.69512C17.221 0.61128 15.7515 0.00165437 14.2188 0ZM10 16.1375C8.38437 15.1062 1.25 10.2875 1.25 5.78125C1.2508 4.81873 1.55808 3.88147 2.1273 3.10531C2.69652 2.32915 3.4981 1.7544 4.41588 1.46438C5.33367 1.17435 6.31996 1.18411 7.23182 1.49223C8.14369 1.80036 8.93375 2.39085 9.4875 3.17812C9.54519 3.26002 9.62172 3.32684 9.71064 3.37297C9.79956 3.41909 9.89827 3.44317 9.99844 3.44317C10.0986 3.44317 10.1973 3.41909 10.2862 3.37297C10.3752 3.32684 10.4517 3.26002 10.5094 3.17812C11.0627 2.3895 11.8529 1.79773 12.7654 1.48874C13.6778 1.17974 14.665 1.1696 15.5836 1.45978C16.5023 1.74996 17.3045 2.32537 17.8739 3.10246C18.4432 3.87955 18.7501 4.81789 18.75 5.78125C18.75 10.2844 11.6156 15.1031 10 16.1375Z"
                            fill="black"
                          />
                        </svg>
                      </div>

                      {/* Label */}
                    </div>
                    <span className="sans font-medium text-[13px] leading-[100%] tracking-[0em] capitalize max-lg:hidden">
                      Favorite
                    </span>
                  </Link>


                  <Link to="/cart" title='cart'>
                    <div className='relative'>

                      {cart?.data?.length > 0 && (
                        <span className="absolute -top-2 right-0 bg-primary max-sm:-right-1 max-sm:w-[12px] max-sm:text-[9px] max-sm:h-[12px] text-white text-[10px] font-bold h-[16px] w-[16px] flex items-center justify-center rounded-full z-10">
                          {cart?.data?.length}
                        </span>
                      )}

                      <div className='flex justify-center h-[27px] '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 21" fill="none" className=' max-lg:mb-0'>
                          <path fillRule="evenodd" clipRule="evenodd" d="M3.85565 4.89863H2.55408C2.12049 4.89864 1.703 5.06294 1.38569 5.35844C1.06838 5.65393 0.874817 6.05868 0.84397 6.49117L0.00434451 18.2479C-0.0124043 18.4827 0.0193882 18.7185 0.0977413 18.9405C0.176094 19.1625 0.299329 19.366 0.459765 19.5383C0.620202 19.7106 0.814403 19.848 1.03027 19.9419C1.24613 20.0359 1.47903 20.0844 1.71446 20.0844H15.2856C15.521 20.0842 15.7538 20.0356 15.9696 19.9416C16.1854 19.8476 16.3796 19.7102 16.54 19.5379C16.7004 19.3657 16.8236 19.1623 16.902 18.9403C16.9804 18.7184 17.0123 18.4827 16.9957 18.2479L16.1561 6.49117C16.1253 6.05868 15.9317 5.65393 15.6144 5.35844C15.2971 5.06294 14.8796 4.89864 14.446 4.89863H13.1537V4.6537C13.1537 3.41946 12.6634 2.23577 11.7907 1.36304C10.918 0.490299 9.73427 0 8.50004 0C6.02378 0 3.73514 1.97219 3.84634 4.6537L3.85565 4.89863ZM13.1537 6.36822V10.0422C13.1537 10.2371 13.0763 10.424 12.9385 10.5618C12.8007 10.6996 12.6138 10.777 12.4189 10.777C12.2241 10.777 12.0372 10.6996 11.8994 10.5618C11.7616 10.424 11.6841 10.2371 11.6841 10.0422V6.36822H5.31593V10.0422C5.31593 10.2371 5.23851 10.424 5.10071 10.5618C4.96291 10.6996 4.77601 10.777 4.58113 10.777C4.38625 10.777 4.19936 10.6996 4.06155 10.5618C3.92375 10.424 3.84634 10.2371 3.84634 10.0422C3.84634 10.0422 3.91002 8.32522 3.88896 6.36822H2.55408C2.49223 6.3683 2.43271 6.39179 2.38746 6.43395C2.34221 6.47611 2.31458 6.53383 2.31013 6.59551L1.47001 18.3522C1.46759 18.3858 1.47211 18.4195 1.4833 18.4513C1.49449 18.483 1.5121 18.5121 1.53504 18.5368C1.55798 18.5614 1.58575 18.581 1.61662 18.5945C1.64749 18.6079 1.68079 18.6148 1.71446 18.6148H15.2856C15.3192 18.6147 15.3525 18.6076 15.3833 18.5942C15.4141 18.5807 15.4418 18.561 15.4647 18.5364C15.4876 18.5118 15.5052 18.4828 15.5165 18.4511C15.5277 18.4194 15.5323 18.3858 15.5301 18.3522L14.6899 6.59551C14.6855 6.53383 14.6579 6.47611 14.6126 6.43395C14.5674 6.39179 14.5078 6.3683 14.446 6.36822H13.1537ZM11.6841 4.89863V4.6537C11.6841 3.80922 11.3487 2.99933 10.7515 2.40219C10.1544 1.80506 9.34451 1.46959 8.50004 1.46959C7.65556 1.46959 6.84567 1.80506 6.24853 2.40219C5.6514 2.99933 5.31593 3.80922 5.31593 4.6537V4.89863H11.6841Z" fill="black" />
                        </svg>
                      </div>
                      <span className="sans font-medium text-[13px] leading-[100%] tracking-[0em] capitalize  max-lg:hidden">
                        Cart
                      </span>

                    </div>

                  </Link>


                </div>
              </div>
            </div>
          </div>

        </div>
        <div className={` ${isDropdownOpenWishlist ? 'bg-[#ffc1a4]' : 'bg-[#FFC1A480]'} hidden lg:flex `}>

          {/* <div className="bg-[#D86A37] flex justify-center relative z-[200]"> */}

          <div className="flex justify-center h-[38px] items-center container">
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-[80px] text-[#141D38] font-medium text-[16px]">

              <Link title='jewelry-collections' to={'/jewelry-collections'} onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} className="sans font-medium text-[16px]  tracking-normal align-bottom capitalize 
  hover:text-[#D86A37] transition duration-300">Jewelry</Link>
              {/* <Link title='diamonds' to="/diamonds" onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} className="sans font-medium text-[16px]  tracking-normal align-bottom capitalize 
  hover:text-[#D86A37] transition duration-300">Diamond</Link> */}
              <div className="relative group">
                <span className="sans font-medium text-[16px] hover:text-[#D86A37] transition duration-300 cursor-pointer">
                  Occasions
                </span>
                <div className="absolute top-[25px] left-0 hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-xl shadow-xl py-2 w-[200px] z-50 transition-all duration-300 ease-in-out">
                  <Link
                    title='engagement-diamond-rings'
                    to="/engagement-diamond-rings"
                    onClick={() => {
                      sessionStorage.removeItem("gifted_page")
                      sessionStorage.removeItem("categoryId")
                      sessionStorage.removeItem("subcategory_id")
                    }}
                    className="px-5 py-3 text-sm text-gray-800 hover:bg-[#fef5f0] hover:text-[#D86A37] transition-colors duration-200"
                  >
                    Engagement
                  </Link>
                  <Link
                    title='wedding-bands-jewelry'
                    onClick={() => {
                      sessionStorage.removeItem("gifted_page")
                      sessionStorage.removeItem("categoryId")
                      sessionStorage.removeItem("subcategory_id")
                    }}
                    to="/wedding-bands-jewelry"
                    className="px-5 py-3 text-sm text-gray-800 hover:bg-[#fef5f0] hover:text-[#D86A37] transition-colors duration-200"
                  >
                    Wedding
                  </Link>
                </div>

              </div>

              <Link title='luxury-high-jewelry' onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} to="/luxury-high-jewelry" className="sans font-medium text-[16px]  tracking-normal align-bottom capitalize 
  hover:text-[#D86A37] transition duration-300">High Jewelry</Link>
              <Link title='exclusive-jewelry-collections' onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} to="/exclusive-jewelry-collections" className="sans font-medium text-[16px]  tracking-normal align-bottom capitalize 
  hover:text-[#D86A37] transition duration-300">Collections</Link>
              <Link title='luxury-gifts-jewelry' onClick={() => {
                sessionStorage.removeItem("gifted_page")
                sessionStorage.removeItem("categoryId")
                sessionStorage.removeItem("subcategory_id")
              }} to="/luxury-gifts-jewelry" className="sans font-medium text-[16px]  tracking-normal align-bottom capitalize 
  hover:text-[#D86A37] transition duration-300">Gifts</Link>
            </nav>

            {/* Mobile Dropdown Menu */}

          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 transition-all duration-500 ease-in-out z-[50] pb-3
  ${isOpen ? "max-h-[450px] opacity-100 translate-y-0 scale-100 block" : "hidden max-h-0 opacity-0 -translate-y-5  pointer-events-none"}`}
        >
          <Link title='jewelry-collections' to="/jewelry-collections" onClick={() => {
            setIsOpen(false)
            sessionStorage.removeItem("gifted_page")
            sessionStorage.removeItem("categoryId")
            sessionStorage.removeItem("subcategory_id")
          }} className="py-2 hover:text-[#D86A37] transition  font-medium text-[16px] capitalize">
            Jewelry
          </Link>
          {/* <Link title='diamonds' to="/diamonds" onClick={() => {
            setIsOpen(false)
            sessionStorage.removeItem("gifted_page")
            sessionStorage.removeItem("categoryId")
            sessionStorage.removeItem("subcategory_id")
          }} className="py-2 hover:text-[#D86A37] transition  font-medium text-[16px] capitalize">
            Diamond
          </Link> */}
          <Link title='engagement-diamond-rings' to="/engagement-diamond-rings" onClick={() => {
            setIsOpen(false)
            sessionStorage.removeItem("gifted_page")
            sessionStorage.removeItem("categoryId")
            sessionStorage.removeItem("subcategory_id")
          }} className="py-2 hover:text-[#D86A37] transition  font-medium text-[16px] capitalize">
            Engagement
          </Link>
          <Link title='wedding-bands-jewelry' to="/wedding-bands-jewelry" onClick={() => {
            setIsOpen(false)
            sessionStorage.removeItem("gifted_page")
            sessionStorage.removeItem("categoryId")
            sessionStorage.removeItem("subcategory_id")
          }} className="py-2 hover:text-[#D86A37] transition  font-medium text-[16px] capitalize">
            Wedding
          </Link>
          <Link title='luxury-high-jewelry' to="/luxury-high-jewelry" onClick={() => {
            setIsOpen(false)
            sessionStorage.removeItem("gifted_page")
            sessionStorage.removeItem("categoryId")
            sessionStorage.removeItem("subcategory_id")
          }} className="py-2 hover:text-[#D86A37] transition  font-medium text-[16px] capitalize">
            High Jewelry
          </Link>
          <Link title='exclusive-jewelry-collections' to="/exclusive-jewelry-collections" onClick={() => {
            setIsOpen(false)
            sessionStorage.removeItem("gifted_page")
            sessionStorage.removeItem("categoryId")
            sessionStorage.removeItem("subcategory_id")
          }} className="py-2 hover:text-[#D86A37] transition  font-medium text-[16px] capitalize">
            Collections
          </Link>
          <Link title='luxury-gifts-jewelry' to="/luxury-gifts-jewelry" onClick={() => {
            setIsOpen(false)
            sessionStorage.removeItem("gifted_page")
            sessionStorage.removeItem("categoryId")
            sessionStorage.removeItem("subcategory_id")
          }} className="py-2 hover:text-[#D86A37] transition  font-medium text-[16px] capitalize">
            Gifts
          </Link>
        </div>

        {isDropdownOpenWishlist && (
          <>

            <div
              className="fixed left-0 w-full h-full bg-black bg-opacity-50 z-3 top-0"
              onClick={() => setIsDropdownOpenWishlist(false)}
            ></div>

            <div className="absolute right-0 mt-0 bg-white w-[575px] z-20 shadow-lg max-md:w-[100%]">
              <div className="my-[30px] mx-[50px] max-sm:my-[20px] max-sm:mx-[20px]">
                <h3 className="text-center text-[30px] font-semibold leading-[100%] font-sans">
                  Your Wishlist <span className="text-[#D86A37]">(4)</span>
                </h3>

                <div
                  className="flex py-[30px] border-b-[1px] gap-[20px] max-sm:gap-[10px]"
                  style={{ borderColor: "rgba(216, 106, 55, 0.5)" }}
                >

                  <div className="max-h-[154px] max-w-[154px] w-[40%] ">
                    <img src={wishlist_img} alt="wishlist img" title="wishlist img" />
                  </div>

                  <div className="w-[45%] flex items-center max-sm:w-auto">
                    <div>
                      <span className="sans text-[12px] font-[400] leading-[100%] text-justify mb-[20px]">
                        European Zircon Limited Edition 18K Gold Bracelet
                      </span>

                      <div className="flex items-center gap-2 mb-[30px] max-sm:mb-[10px]">
                        <strong className="text-[20px] font-bold text-[#D86A37] max-xl:text-[17px]">
                          ₹1099
                        </strong>
                        <del className="text-[18px] text-gray-500 max-xl:text-[15px]">
                          ₹1199
                        </del>
                        <span className="text-[#DA2929] font-semibold text-[14px] max-2xl:text-[13px]">
                          (₹100 Off)
                        </span>
                      </div>

                      <button
                        className="bg-white rounded-[10px] w-full border border-gray-300 py-2"
                      >
                        Move to Bag
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="w-[10%] flex justify-end max-sm:w-[5%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                    >
                      <path
                        d="M1 1L9.11294 9.11294"
                        stroke="#D86A37"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1.11328 9.17786L9.22622 1.06492"
                        stroke="#D86A37"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* View Wishlist Button */}
                <div className="mt-5">
                  <Link to="/wishlist" title='wishlist'>
                    <button className="text-[20px] font-semibold bg-[#D86A37] text-white py-3 w-full rounded-[10px] max-sm:text-[17px] max-sm:py-2">
                      View Wishlist
                    </button>

                  </Link>
                </div>
              </div>
            </div>
          </>
        )}


        {isSearchModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999999]">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-xl relative ">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Search</h2>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="text-gray-500 hover:text-black text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className=''>
                <div className='flex gap-3 p-3 items-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 17" fill="none" class=" max-lg:mb-0"><path d="M16.7924 15.7909L11.9581 10.9565C12.8945 9.7998 13.4583 8.33 13.4583 6.72918C13.4583 3.01893 10.4394 0 6.72914 0C3.01889 0 0 3.01889 0 6.72914C0 10.4394 3.01893 13.4583 6.72918 13.4583C8.33 13.4583 9.7998 12.8945 10.9565 11.9581L15.7909 16.7924C15.929 16.9306 16.1103 17 16.2917 17C16.473 17 16.6544 16.9306 16.7925 16.7924C17.0694 16.5155 17.0694 16.0678 16.7924 15.7909ZM6.72918 12.0416C3.7995 12.0416 1.41668 9.65882 1.41668 6.72914C1.41668 3.79947 3.7995 1.41664 6.72918 1.41664C9.65885 1.41664 12.0417 3.79947 12.0417 6.72914C12.0417 9.65882 9.65882 12.0416 6.72918 12.0416Z" fill="#6b7280"></path></svg>
                  <input
                    type="text"
                    placeholder="“Search rings, necklaces..."
                    className="w-full  "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* Filtered Results */}
                {searchTerm.trim() !== "" && (
                  <div className="mt-4 max-h-[200px] overflow-y-auto rounded-b-lg p-4 left-0 absolute w-full bg-white border border-t-0 shadow">

                    {productDataLoading ? (
                      <p className="text-gray-500 p-2">Loading...</p>
                    ) : productDataError ? (
                      <p className="text-red-500 p-2">Product not found</p>
                    ) : Product_item.length > 0 ? (
                      Product_item.map((product) => (
                        <div
                          key={product.product_id}
                          className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 transition-all"
                          onClick={() => {
                            const slug = product.slug
                            navigate(`/product/${slug}`, {
                              state: { productid: product.product_id },
                            });
                            setIsSearchModalOpen(false);
                          }}
                        >
                          <img
                            src={`https://srv963148.hstgr.cloud:10443${product.product_img}`}
                            alt={product.name}
                            className="w-12 h-12 rounded object-cover"
                            title={product.name}

                          />
                          <div className="text-sm font-medium text-gray-800">{product.name}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 p-2">No matching products found.</p>
                    )}
                  </div>
                )}
              </div>
              {/* Search Input */}


            </div>
          </div>
        )}
        {
          modal === 'modal3' && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden p-[30px] border-t-[8px] border-[#F44336] rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl z-40">
                    <div className="bg-white ">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-medium text-gray">Logout</h3>
                        <div onClick={closeModal}>
                          <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                          </svg>
                        </div>
                      </div>
                      <p className="pt-[14px] text-[#8492A6]">Are you sure you want to Logout ?</p>


                    </div>
                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                      <button type="button" onClick={logout} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Logout</button>
                      <button type="button" className="mt-3 bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          modal === 'book_appo' && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden p-[30px] max-sm:px-[20px]  rounded-[6px] bg-white text-left shadow-xl max-sm:max-w-[100%] transition-all sm:my-8 sm:w-full sm:max-w-[752px] z-40">
                    <div className="bg-white ">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray">Book Appoinment</h3>
                        <div onClick={closeModal}>
                          <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                          </svg>
                        </div>
                      </div>
                      {/* <p className="pt-[14px] text-[#8492A6]">Are you sure you want to Logout ?</p> */}
                      <div className="grid mt-5 grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4">
                        <div className="">
                          <label className="font-medium mb-2 block">First Name  <span className="text-red-500">*</span>
                          </label>
                          <input type="text" value={formData.first_name} name="first_name" placeholder="First Name" onChange={handleChange} className="h-[40px] transition-all bg-transparent duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                        </div>
                        <div className="">
                          <label className="font-medium mb-2 block">Last Name  <span className="text-red-500">*</span>
                          </label>
                          <input type="text" value={formData.last_name} name="last_name" placeholder="Last Name" onChange={handleChange} className="h-[40px] transition-all bg-transparent duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                        </div>
                        <div className="">
                          <label className="font-medium mb-2 block">Email <span className="text-red-500">*</span>
                          </label>
                          <input type="email" value={formData.email} name="email" placeholder="Email" onChange={handleChange} className="h-[40px] transition-all bg-transparent duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                        </div>
                        <div className="">
                          <label className="font-medium mb-2 block">Mobile <span className="text-red-500">*</span>
                          </label>
                          <input type="tel" value={formData.mobile} name="mobile" placeholder="Email" onChange={handleChange} className="h-[40px] transition-all bg-transparent duration-400 focus:border-[#b0b0bb] rounded-[0.5rem] text-[14px] px-[16px] text-[#5d7186] border border-[#d8dfe7] w-full" />
                        </div>


                      </div>

                      <div className='my-8'>

                        <div className="">
                          <label className="font-medium mb-2 block">Category <span className="text-red-500">*</span>
                          </label>
                          {cate?.data?.map((category) => (
                            <label
                              key={category.id}
                              className="flex items-center cursor-pointer mb-3"
                            >
                              <input
                                type="checkbox"
                                className="peer hidden"
                                onChange={() => handleCheckboxChange(category.category_id)}
                                checked={selectedCategoryId === category.category_id}
                              />
                              <span
                                className={`w-[20px] h-[20px] inline-flex items-center justify-center rounded border relative 
    ${selectedCategoryId === category.category_id ? 'bg-[#D86A37] border-[#D86A37]' : 'bg-white border-borderColor'}
  `}
                              >

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="11px"
                                  height="11px"
                                  viewBox="0 0 511.985 511.985"
                                >
                                  <path
                                    d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"
                                    fill="#ffffff"
                                  />
                                </svg>
                              </span>
                              <span className="text-gray-900 font-[600] text-[14px] ms-2">
                                {category.name}
                              </span>
                            </label>
                          ))}
                        </div>

                      </div>

                      <div className="flex flex-col md:flex-row gap-6">

                        <div className="rounded md:w-[50%] w-full sm:w-[60%]">
                          <label className="font-medium mb-2 block">
                            Appointment <span className="text-red-500">*</span>
                          </label>
                          <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            inline
                            minDate={new Date()}
                            calendarClassName="!p-0"
                            filterDate={(dateToCheck) => {
                              const formatted = moment(dateToCheck).format("YYYY-MM-DD");
                              return !fullyBookedDates.includes(formatted); // allow only if not fully booked
                            }}
                            renderCustomHeader={({ date, changeYear, changeMonth }) => (
                              <div className="flex justify-between items-center px-4 py-2 border-b">
                                <select
                                  value={moment(date).month()}
                                  onChange={({ target: { value } }) => changeMonth(parseInt(value))}
                                  className="mr-2 p-1 border rounded"
                                >
                                  {moment.months().map((month, index) => (
                                    <option key={month} value={index}>
                                      {month}
                                    </option>
                                  ))}
                                </select>
                                <select
                                  value={moment(date).year()}
                                  onChange={({ target: { value } }) => changeYear(value)}
                                  className="p-1 border rounded"
                                >
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return <option key={year} value={year}>{year}</option>;
                                  })}
                                </select>
                              </div>
                            )}
                          />
                          <div className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                            <FaClock />
                            Asia/Kolkata ({moment().format("hh:mm A")})
                          </div>
                        </div>

                        <div className="md:w-[50%]  w-[100%]">
                          <div className="flex items-center justify-between mb-3">
                            <button onClick={goToPreviousDay} disabled={isToday}>
                              <IoChevronBack className={` ${isToday ? 'stroke-[#868686]' : 'text-gray-600'}  hover:text-black text-xl`} />
                            </button>
                            <div className="text-lg font-medium">
                              {moment(date).format("dddd, MMMM DD")}
                            </div>
                            <button onClick={goToNextDay}>
                              <IoChevronForward className="text-gray-600 hover:text-black text-xl" />
                            </button>
                          </div>

                          {/* Time Slots */}
                          {slots.length > 0 ? (
                            <div className="grid grid-cols-2 max-sm:grid-cols-2 max-md:grid-cols-3 gap-4">
                              {slots.map((slot, i) => (
                                <div
                                  key={i}
                                  onClick={() => handleSlotClick(slot)}
                                  className={`cursor-pointer px-4 py-2 text-center border rounded transition-all duration-200
          ${selectedSlot === slot.start
                                      ? "bg-primary text-white border-primary"
                                      : "hover:bg-[#d8d8d88f] text-[#000000] border-[#d8d8d8]"
                                    }`}
                                >
                                  {slot.label}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-red-500 text-[25px] font-semibold">No slots available</p>
                          )}

                        </div>

                      </div>

                    </div>
                    <div className="  pt-[30px] flex flex-row-reverse gap-3 ">
                      <button type="button" onClick={handleSubmit} className="inline-flex h-[35px] sm:h-[40px]  w-[114px] shadow-[0px_8px_20px_1px_#F443364D] rounded-md bg-[#F44336] items-center   justify-center py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 ">Submit</button>
                      <button type="button" className=" bg-[#F4F1FC] h-[35px] sm:h-[40px] w-[114px] closeModal   rounded-md border-0   inline-flex justify-center items-center  py-2 text-sm font-semibold  shadow-xs   sm:mt-0 " onClick={closeModal} >Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Navbar
