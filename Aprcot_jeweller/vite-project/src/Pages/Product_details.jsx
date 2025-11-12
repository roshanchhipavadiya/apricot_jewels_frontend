import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../Componenet/Navbar'
import Img_1 from '../assets/img_1.png'
import Img_2 from '../assets/img_2.png'
import Product from '../Componenet/Product'

import dia_1 from '../assets/43724189aec712b24fc206601063e947.png'
import dia_2 from '../assets/image (2).png'
import Ring_size from '../assets/ring_size.png'
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../Componenet/Footer'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAddAppoinmnetMutation, useAddCartMutation, useAddwhishlistMutation, useDeleteWhishlistMutation, useGetAllProductQuery, useGetAppoinmentQuery, useGetCategoriesQuery, useGetProductidQuery, useGetProductQuery, useGetSubCategoriesQuery, useGetWishlistQuery } from '../services/apiSlice'
import { ToastContainer, toast } from "react-toastify";
import Shape1 from '../assets/shape1.png'
import Shape2 from '../assets/shape6.png'
import Shape3 from '../assets/shape3.png'
import Shape4 from '../assets/shape4.png'
import Shape5 from '../assets/shape5.png'
import Shape6 from '../assets/shap6.png'
import Shape7 from '../assets/shape7.png'
import Shape8 from '../assets/shape8.png'
import Shape9 from '../assets/shape9.png'
import Baguette from '../assets/Baguette.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FaClock } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import asscher from '../assets/diamond_shapes/asscher.svg'
import baguette from '../assets/diamond_shapes/baguette.svg'
import briolette from '../assets/diamond_shapes/briolette.svg'
import bullet from '../assets/diamond_shapes/bullet.svg'
import calf from '../assets/diamond_shapes/calf.svg'
import cushion from '../assets/diamond_shapes/cushion_all.svg'
import cushion_brilliant from '../assets/diamond_shapes/cushion_brilliant.svg'
import emerald from '../assets/diamond_shapes/emereld.svg'
import european from '../assets/diamond_shapes/european_cut.svg'
import flanders from '../assets/diamond_shapes/flanders.svg'
import half from '../assets/diamond_shapes/half_moon.svg'
import heart from '../assets/diamond_shapes/heart.svg'
import hexagonal from '../assets/diamond_shapes/hexagonal.svg'
import kite from '../assets/diamond_shapes/kite.svg'
import lozenge from '../assets/diamond_shapes/lozenge.svg'
import marquise from '../assets/diamond_shapes/marquise.svg'
import octagonal from '../assets/diamond_shapes/octagonal.svg'
import old from '../assets/diamond_shapes/old_miner.svg'
import other from '../assets/diamond_shapes/other.svg'
import oval from '../assets/diamond_shapes/oval.svg'
import pear from '../assets/diamond_shapes/pear.svg'
import pentagonal from '../assets/diamond_shapes/pentagonal.svg'
import princess from '../assets/diamond_shapes/princess.svg'
import radiant from '../assets/diamond_shapes/radiant.svg'
import rose from '../assets/diamond_shapes/rose.svg'
import round from '../assets/diamond_shapes/round.svg'
import shield from '../assets/diamond_shapes/shield.svg'
import sq_emereld from '../assets/diamond_shapes/sq_emereld.svg'
import sq_radiant from '../assets/diamond_shapes/sq_radiant.svg'
import square from '../assets/diamond_shapes/square.svg'
import star from '../assets/diamond_shapes/star.svg'
import tapered from '../assets/diamond_shapes/tapered_baguette.svg'
import tapered_bullet from '../assets/diamond_shapes/tapered_bullet.svg'
import trapezoid from '../assets/diamond_shapes/trapezoid.svg'
import triangular from '../assets/diamond_shapes/triangular.svg'
import trilliant from '../assets/diamond_shapes/trilliant.svg'



const sortby = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Other'
];
const shapeImages = {
    Asscher: asscher,
    Baguette: baguette,
    Briolette: briolette,
    Bullet: bullet,
    Calf: calf,
    Cushion: cushion,
    'Cushion Brilliant': cushion_brilliant,
    Emerald: emerald,
    European: european,
    Flanders: flanders,
    Half: half,
    Heart: heart,
    Hexagonal: hexagonal,
    Kite: kite,
    Lozenge: lozenge,
    Marquise: marquise,
    Octagonal: octagonal,
    Old: old,
    Other: other,
    Oval: oval,
    Pear: pear,
    Pentagonal: pentagonal,
    Princess: princess,
    Radiant: radiant,
    Rose: rose,
    Round: round,
    Shield: shield,
    "Sq.Emerald": sq_emereld,
    "Sq.Radiant": sq_radiant,
    Square: square,
    Star: star,
    Tapered: tapered,
    Trapezoid: trapezoid,
    'Tapered Bullet': tapered_bullet,
    Triangular: triangular,
    Trilliant: trilliant
};

const Product_details = () => {
    const nameToSlug = (name) => {
        return name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');
    };
    const navigate = useNavigate()
    const category11 = useParams();

    const { data: product__name } = useGetAllProductQuery({ fetch_all: "true" })
    const [product___id, setProduct___id] = useState(null); // <-- store here
    useEffect(() => {

        if (product__name) {

            const name = product__name?.data?.find((val) => {
                return val.slug == category11.product_details
            })

            setProduct___id(name?.product_id); // <-- update state

            if (!name) {
                navigate('*', { replace: true });
            }
        }
    }, [product__name, navigate]);

    const settings = {
        dots: false,
        infinite: false, // Disable infinite scrolling
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false, // Disable autoplay
        responsive: [
            {
                breakpoint: 576,
                nav: false,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 768,
                nav: false,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                },
            },

        ],

    };

    const [selectedRing, setSelectedRing] = useState("ENGAGEMENT RINGS");
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [modal, setmodal] = useState("");
    const [selectedSize1, setSelectedSize1] = useState("Most Relevant");
    const openModal = (modalId) => {
        setmodal(modalId);
    };

    const closeModal = () => {
        setmodal(null);
    };
    const [isMobile, setIsMobile] = useState(false);
    const touchStartX = useRef(null); // Store touch start position
    const touchEndX = useRef(null);   // Store touch end position

    // Function to check screen width and update mobile state
    const checkScreenSize = () => {
        if (window.innerWidth <= 576) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    // Function to check scroll position
    const checkScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
    };

    // Scroll Function
    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const scrollAmount = 200; // Adjust scroll step size
        container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    };

    useEffect(() => {
        checkScreenSize(); // Initial screen size check
        window.addEventListener("resize", checkScreenSize); // Listen for resize events
        checkScroll(); // Initial scroll position check
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScroll);
        }

        return () => {
            window.removeEventListener("resize", checkScreenSize); // Clean up event listener
            if (container) {
                container.removeEventListener("scroll", checkScroll);
            }
        };
    }, []);






    // Function to scroll the sub-image section

    const scrollToThumbnail = (index) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const thumbnails = container.children; // Get all sub-image elements
        if (thumbnails[index]) {
            // Manually scroll the container so that the thumbnail is centered
            const thumbnail = thumbnails[index];
            const offset = thumbnail.offsetLeft - (container.offsetWidth / 2) + (thumbnail.offsetWidth / 2);
            container.scrollTo({
                left: offset,
                behavior: 'smooth',
            });
        }
    };
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
    };

    // Handle mouse drag start
    const handleMouseDown = (e) => {
        touchStartX.current = e.clientX;
    };

    // Handle mouse drag end
    const handleMouseUp = (e) => {
        touchEndX.current = e.clientX;
        handleSwipe();
    };

    // Detect swipe direction and change image
    const handleSwipe = () => {
        if (touchStartX.current && touchEndX.current) {
            const diff = touchStartX.current - touchEndX.current;
            if (diff > 50) {
                nextSlide(); // Swipe left → next image
            } else if (diff < -50) {
                prevSlide(); // Swipe right → previous image
            }
        }
    };
    const [openIndex, setOpenIndex] = useState(1); // The first FAQ is open by default

    const toggleFAQ = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };


    const [filled, setFilled] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");

    const ringSizes = Array.from({ length: 22 - 3 + 1 }, (_, i) => (i + 3).toString());

    const reviews = [
        { stars: 5, count: 402 },
        { stars: 4, count: 287 },
        { stars: 3, count: 172 },
        { stars: 2, count: 0 },
        { stars: 1, count: 3 },
    ];
    const totalReviews = reviews.reduce((acc, review) => acc + review.count, 0);
    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const location = useLocation();
    const { productid } = location.state || {};



    const { data: products, isLoading1 } = useGetProductidQuery(product___id || productid);

    const { data: cate } = useGetCategoriesQuery();

    const [activeIndex, setActiveIndex] = useState(""); // metal_id
    const [dimonindex, setdimonindex] = useState(0); // diamond weight
    const [dimond_shape, setdimond_shape] = useState(null); // diamond shape
    const [Dimon_id, setDimon_id] = useState(null); // diamond shape
    const [quantity, setQuantity] = useState(1);

    const diamond = products?.diamond_details;
    const metal = products?.metal_details;
    const productmedia = products?.product_media;

    const shappee = diamond?.find((val) => {
        return val.component == "Main Stone"
    })


    // Set initial diamond weight and shape
    useEffect(() => {
        if (diamond) {
            setdimonindex(shappee?.diamond_weight_ct || diamond[0]?.diamond_weight_ct);
            setDimon_id(shappee?.diamond_id || diamond[0]?.diamond_id);
            setdimond_shape(shappee?.diamond_shape || diamond[0]?.diamond_shape);

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

    // Handle toggle functions
    const toggleActive = (index) => setActiveIndex(index);
    const [diamond_id, setDiamond_id] = useState(null);

    const toggledimondshape = (selectedShape, id) => {
        setdimond_shape(selectedShape);
        setdimonindex(id)

        const filteredWeights = diamond?.filter(item => item.diamond_shape == selectedShape);


        const matched = filteredWeights?.find(item => item.diamond_weight_ct == id);


        if (matched) {
            setDiamond_id(matched.diamond_id); // same weight available in new shape
            setDimon_id(matched.diamond_id);
            // setdimonindex(matched.diamond_weight_ct)
        } else if (filteredWeights.length > 0) {
            setdimonindex(filteredWeights[0].diamond_weight_ct); // fallback to first weight
        }
    };


    const toggledimond = (index, id) => {
        setdimonindex(index)
        setDimon_id(id);

    };


    // Get selected diamond price
    const getDiamondPrice = () => {
        const selected = products?.diamond_details?.find(
            (item) => item.diamond_shape === dimond_shape && item.diamond_weight_ct === dimonindex
        );
        return parseFloat(selected?.all_total_diamond_price || 0);
    };


    const dioman_price = getDiamondPrice();
    const metal_price = parseFloat(metal?.find(m => m.metal_id === activeIndex)?.metal_price || 0);
    const making_charges = parseFloat(products?.product?.making_charges || 0);


    // Calculate total price
    let totalPrice = dioman_price + metal_price + making_charges;
    const percentage3 = (totalPrice * 3) / 100;
    totalPrice = (totalPrice + percentage3).toFixed(2);

    // Filter image based on selected metal & diamond

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % (images?.length || 1);
        setCurrentIndex(newIndex);
    };


    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + (images?.length || 1)) % (images?.length || 1);
        setCurrentIndex(newIndex);
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    // const images = productmedia?.filter(
    //     (item) => item.metal == activeIndex && item.diamond_details == Dimon_id
    // );
    const getDiamondid = () => {
        let selected;



        if (!diamond || !metal || diamond.length === 0 || metal.length === 0) {
            // Fallback when diamond or metal details are not available
            selected = productmedia?.filter(
                item => item.diamond_details == Dimon_id && dimond_shape
            );
        } else if (
            diamond?.some(item => item.component === 'Accent Stone') &&
            !diamond?.some(item => item.component === 'Main Stone')
        ) {
            selected = productmedia?.filter(
                item => item.metal == activeIndex && item.diamond_details == Dimon_id
            );
        } else {
            selected = productmedia?.filter(
                item =>
                    item.metal == activeIndex &&
                    item.diamond_details == Dimon_id &&
                    dimond_shape
            );
        }


        if (!selected || selected.length === 0) {
            return products?.product?.product_img
                ? [{ file: products.product.product_img }]
                : [];
        }



        return selected;
    };

    // const getDiamondid = () => {
    //     const selected = productmedia?.filter((item) => {
    //         const metalMatch = item.metal === activeIndex;
    //         const diamondMatch = products.diamond_details?.some(
    //             (diamond) =>
    //                 (!Dimon_id || diamond.diamond_id === Dimon_id) &&
    //                 (!dimond_shape || diamond.diamond_shape === dimond_shape)
    //         );
    //         console.log(diamondMatch);


    //         // Return item only if either:
    //         // 1. Both metal and diamond match
    //         // 2. Only metal matches
    //         // 3. Only diamond matches
    //         console.log(products.diamond_details.length > 0 && products.metal_details > 0);

    //         if (products.diamond_details.length > 0 && products.metal_details > 0) {
    //             return metalMatch && diamondMatch;
    //         }


    //         // if (Dimon_id && dimond_shape) {
    //         //     return metalMatch && diamondMatch;
    //         // } else if (Dimon_id || dimond_shape) {
    //         //     return diamondMatch;
    //         // } else if (activeIndex) {
    //         //     return metalMatch;
    //         // }

    //         return false; // nothing matches
    //     });

    //     return selected;
    // };


    const images = getDiamondid()

    const [addWishlist] = useAddwhishlistMutation();
    const [addtocart] = useAddCartMutation();




    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image



    const { data: data, isLoading } = useGetWishlistQuery(undefined, {
        skip: !localStorage.getItem('aprifrontoken'),
    });

    const wishlist = data?.data || [];



    const log = diamond?.filter((val) => {

        return val.component == "Main Stone"
    })




    // ------------------------


    const matchedDiamond = products?.diamond_details?.find(
        (d) => d.diamond_id == Dimon_id
    );

    const accent_stones = products?.diamond_details?.find((d) => {
        return (
            d.diamond_shape == dimond_shape &&
            d.component == 'Accent Stone'
        );
    });




    const matchedMetal = products?.metal_details?.find(
        (m) => m.metal_id == activeIndex
    );

    const matchedProduct =
        matchedDiamond || matchedMetal ? products.product : null;






    const subtotal =
        (Number(products?.product?.making_charges) || 0) +
        (Number(diamond?.find(val => val.diamond_id == Dimon_id)?.all_total_diamond_price) || 0) +
        (Number(metal?.find(val => val.metal_id == activeIndex)?.metal_price) || 0);



    const total = subtotal + (subtotal * products?.product?.gst) / 100 || 0;

    let addToCartInProgress = false; // Define this globally or outside the component if needed

    const addto_cart = async () => {
        if (addToCartInProgress) return; // Prevent double click
        addToCartInProgress = true;

        try {
            // 🧾 Login check
            if (!localStorage.getItem('aprifrontoken')) {
                if (!toast.isActive('login-error')) {
                    toast.error('Please first login', {
                        position: "bottom-center",
                        autoClose: 1500,
                        toastId: 'login-error'
                    });
                }

                setTimeout(() => {
                    window.location.href = "/signin";
                }, 1500);

                return;
            }

            // 💍 Ring size check
            if (products?.product?.is_ring_size && (selectedSize === "" || selectedSize === undefined)) {
                if (!toast.isActive('ring-size-error')) {
                    toast.error('Please select ring size', {
                        position: "bottom-center",
                        autoClose: 1500,
                        toastId: 'ring-size-error'
                    });
                }
                return;
            }

            // ✅ Prepare FormData
            const formData = new FormData();
            formData.append("product_id", productid);
            formData.append("quantity", quantity);
            formData.append("diamond_id", Dimon_id);
            formData.append("metal_id", activeIndex);
            formData.append("total_price", total);
            formData.append("product_media_id", product_media_id);
            if (products?.product?.is_ring_size) {
                formData.append("ring_size", selectedSize);
            }

            // 🚀 API Call
            await addtocart(formData).unwrap();
            navigate('/cart');

        } catch (error) {
            toast.error(error?.data?.message || "Failed to add to cart", {
                position: "bottom-center",
                autoClose: 1500,
            });
        } finally {
            // ✅ Re-enable click after everything
            addToCartInProgress = false;
        }
    };


    const handlewishlist = async () => {
        try {


            let formData = new FormData();

            formData.append("product_id", productid);
            formData.append("diamond_id", Dimon_id);
            formData.append("metal_id", activeIndex);
            formData.append("total_price", total);
            formData.append("ring_size", selectedSize);
            formData.append("quantity", quantity);
            formData.append("product_media_id", product_media_id);

            await addWishlist(formData).unwrap(); // Correct usage
            // toast.success("Wishlist added successfully", {
            //     position: "bottom-center",
            //     autoClose: 1500, // optional: auto dismiss after 1.5 sec
            // });

        } catch (error) {
            toast.error(error?.data?.message || "Failed to add to wishlist", {
                position: "bottom-center",
                autoClose: 1500,
            });
        }
    };

    const diamon_find = cate?.data?.find((val) => {
        return products?.product?.category == val.category_id
    })?.category_type


    const wishfilled = wishlist.find((val) => {
        return val.diamond_details == Dimon_id && val.metal == activeIndex && val.product == productid
    })


    useEffect(() => {
        setFilled(!!wishfilled);
    }, [wishfilled]);

    const [deletewhish] = useDeleteWhishlistMutation()

    const removewish = async () => {
        try {
            const formData = new FormData();

            const id = wishlist.find((val) => {
                return val.diamond_details == Dimon_id && val.metal == activeIndex && val.product == productid
            })



            formData.append("wishlist_id", id?.wishlist_id);

            await deletewhish(formData).unwrap();

            // toast.success("Wishlist item removed successfully", {
            //     autoClose: 1500,
            // });


        } catch (error) {
            toast.error(error?.message || "Failed to remove item.", {
                position: "bottom-center",
                autoClose: 1500,
            });
        }
    };
    const { data: subcate } = useGetSubCategoriesQuery()

    const showring = cate?.data?.find((val) => {
        if (val.category_id == products?.product?.category) {

            return val.name.includes('Ring')
        }
    })
    const showring1 = subcate?.data?.find((val) => {
        if (val.subcategory_id == products?.product?.subcategory) {
            return val.name.includes('Ring')
        }
    })



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

    const [product_media_id, setproduct_media_id] = useState(null);

    useEffect(() => {
        if (images?.length > 0) {
            setproduct_media_id(images[0]?.product_media_id);
        }
    }, [images]);

    const [loading11, setLoading11] = useState(true);

    // useEffect(() => {
    //     setLoading11(true);
    // }, [currentIndex]);

    const formatWeight = (num) => {
        const intPart = Math.floor(num);
        const decimalPart = +(num - intPart).toFixed(3);

        const fractionMap = {
            0.125: "⅛",
            0.2: "⅕",
            0.25: "¼",
            0.333: "⅓",
            0.375: "⅜",
            0.5: "½",
            0.625: "⅝",
            0.666: "⅔",
            0.75: "¾",
            0.8: "⅘",
            0.875: "⅞",
        };

        const matchedFraction = Object.entries(fractionMap).find(
            ([dec]) => Math.abs(decimalPart - parseFloat(dec)) < 0.04
        );

        const fraction = matchedFraction?.[1] || null;

        // Return plain values
        if (intPart === 0 && fraction) return `${fraction}`;
        if (intPart === 0 && !fraction) return `${num}`;
        if (!fraction && decimalPart < 0.01) return `${intPart}`;
        if (fraction) return `${intPart}${fraction}`;
        return `${intPart}.${String(decimalPart).split(".")[1]}`;
    };



    return (
        <div>
            <Navbar />
            {/* <Footer/> */}
            <section className='relative min-h-[30vh]  pt-[100px] max-lg:pt-[50px] max-sm:pt-[40px] '>

                {
                    products ? (

                        <div className='container'>
                            <h4 onClick={() => {
                                navigate('/product')
                            }} className='flex cursor-pointer items-center text-[24.02px] leading-[100%] max-lg:mb-[30px] max-sm:text-[20px] text-black1 underline mb-[60px] font-normal'><svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                                    <path d="M17.5109 20.5647L10.5068 13.9109L17.5109 7.25706" stroke="#222222" strokeWidth="2.80161" />
                                </svg> Continue Shopping</h4>

                            <div className='flex  gap-[60px] max-lg:gap-[20px] max-lg:flex-wrap'>


                                <div className="w-[52%] relative max-lg:w-[100%]  ">

                                    <div className='sticky top-[50px]' >
                                        <div className="relative">
                                            <button
                                                className="absolute z-[20]  max-sm:top-[60%] max-md:left-2 cladd_chro left-4 top-1/2 transform -translate-y-1/2  rounded-full   transition"
                                                onClick={prevSlide}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="36" viewBox="0 0 22 36" fill="none">
                                                    <path d="M19.5117 33.5706L3.04949 17.7774" stroke="white" strokeWidth="4.20242" strokeLinecap="round" />
                                                    <path d="M18.9414 2.67908L3.021 17.5588" stroke="white" strokeWidth="4.20242" strokeLinecap="round" />
                                                </svg>
                                            </button>

                                            {(() => {
                                                const currentFile = images?.[currentIndex]?.file;
                                                const isVideo = /\.(mp4|webm|ogg)$/i.test(currentFile);
                                                const fileUrl = `https://srv963148.hstgr.cloud:10443${currentFile}`;

                                                return isVideo ? (
                                                    <video
                                                        src={fileUrl}
                                                        className="max-w-full max-sm:h-[350px] w-full h-[800px] object-cover rounded-xl shadow-lg"
                                                        onLoadedData={() => setLoading11(false)}
                                                        autoPlay
                                                        muted
                                                    />
                                                ) : (
                                                    <img
                                                        src={fileUrl}
                                                        onLoad={() => setLoading11(false)}
                                                        alt="Slide"
                                                        className="max-w-full max-sm:h-[350px] w-full h-[800px] object-cover rounded-xl shadow-lg"
                                                        onTouchStart={handleTouchStart}
                                                        onTouchEnd={handleTouchEnd}
                                                        onMouseDown={handleMouseDown}
                                                        onMouseUp={handleMouseUp}
                                                    />
                                                );
                                            })()}


                                            <button
                                                className="absolute z-[20]  max-sm:top-[60%] max-md:right-2 cladd_chro right-4 top-1/2 transform -translate-y-1/2  rounded-full   transition"
                                                onClick={nextSlide}
                                            >
                                                <svg className='rotate-[90deg]' xmlns="http://www.w3.org/2000/svg" width="22" height="36" viewBox="0 0 22 36" fill="none">
                                                    <path d="M19.5117 33.5706L3.04949 17.7774" stroke="white" strokeWidth="4.20242" strokeLinecap="round" />
                                                    <path d="M18.9414 2.67908L3.021 17.5588" stroke="white" strokeWidth="4.20242" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="relative">
                                            {/* Left Arrow */}

                                            <button
                                                onClick={() => scroll("left")}
                                                className="absolute bg__blur left-3 top-[58%] transform -translate-y-1/2  text-white p-2 rounded-full  z-10"
                                            >
                                                <ChevronLeft size={26} className="stroke-white" />

                                            </button>


                                            {isMobile ? (
                                                // Dots for mobile view
                                                <div className="flex justify-center gap-2 py-[20px] mt-4">
                                                    {images?.map((img, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentIndex(index)}
                                                            className={`h-[8px]  tran_smooth rounded-full  ${index === currentIndex ? "bg-primary w-[20px]" : "bg-gray-300 w-[8px]"} `}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                // Thumbnails for larger screens
                                                <div ref={scrollContainerRef} className="flex gap-[20px] py-[20px] overflex-x-scroll mt-4 overflow-x-auto scroll-smooth">
                                                    {images?.map((img, index) => {
                                                        const fileUrl = `https://srv963148.hstgr.cloud:10443${img?.file}`;
                                                        const isVideo = /\.(mp4|webm|ogg)$/i.test(img?.file);
                                                        const isActive = index === currentIndex;

                                                        const mediaClass =
                                                            `h-[130px] w-[130px] max-md:w-[100px] max-md:h-[100px] object-cover rounded-lg cursor-pointer border-2 transition-transform duration-300 ` +
                                                            (isActive ? "border-primary" : "border-transparent");

                                                        return isVideo ? (


                                                            <video
                                                                src={fileUrl}
                                                                className={`h-[130px] w-[130px] max-md:w-[100px] max-md:h-[100px] object-cover rounded-lg cursor-pointer border-2 transition-transform duration-300 ${index === currentIndex ? "border-primary " : "border-transparent"}`}
                                                                muted
                                                                onClick={() => {

                                                                    setproduct_media_id(img?.product_media_id);
                                                                    setCurrentIndex(index)
                                                                }}
                                                            />
                                                        ) : (
                                                            <img
                                                                key={index}
                                                                src={`${fileUrl || products?.product?.product_img} `}
                                                                alt="Thumbnail"
                                                                className={`h-[130px] w-[130px] max-md:w-[100px] max-md:h-[100px] object-cover rounded-lg cursor-pointer border-2 transition-transform duration-300 ${index === currentIndex ? "border-primary " : "border-transparent"}`}
                                                                onClick={() => {

                                                                    setproduct_media_id(img?.product_media_id);
                                                                    setCurrentIndex(index)
                                                                }}
                                                            />

                                                        )


                                                    })}


                                                </div>

                                            )}


                                            {/* Right Arrow */}

                                            <button
                                                onClick={() => scroll("right")}
                                                className="absolute right-3 bg__blur top-[58%] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10"
                                            >
                                                <ChevronRight size={24} className="stroke-white" />
                                            </button>

                                        </div>

                                        <div className='flex gap-[20px] flex-wrap'>
                                            <div className='flex bg-[#FFEDE4] px-[20px] items-center h-[40px] gap-[15px] cursor-pointer  ' onClick={() => navigate('/contact')} >
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 23 24" fill="none">
                                                        <path d="M19.3617 13.7717C18.8597 13.249 18.2542 12.9695 17.6124 12.9695C16.9759 12.9695 16.3652 13.2438 15.8424 13.7665L14.207 15.3968C14.0725 15.3243 13.9379 15.257 13.8085 15.1897C13.6222 15.0966 13.4462 15.0086 13.2962 14.9155C11.7642 13.9425 10.3721 12.6745 9.03681 11.0339C8.38989 10.2162 7.95516 9.52788 7.63946 8.8292C8.06384 8.44105 8.45717 8.03737 8.84015 7.64921C8.98506 7.5043 9.12997 7.35422 9.27488 7.20931C10.3617 6.12248 10.3617 4.71477 9.27488 3.62794L7.862 2.21506C7.70157 2.05463 7.53595 1.88901 7.38069 1.7234C7.07017 1.40253 6.74412 1.0713 6.40772 0.760781C5.90571 0.263944 5.30536 0 4.67397 0C4.04257 0 3.43187 0.263944 2.91434 0.760781C2.90916 0.765957 2.90916 0.765957 2.90398 0.771132L1.14435 2.54629C0.481905 3.20874 0.104102 4.0161 0.0212959 4.95284C-0.102913 6.46405 0.34217 7.87176 0.683745 8.79297C1.52216 11.0546 2.7746 13.1506 4.64291 15.3968C6.90973 18.1035 9.63716 20.2409 12.7527 21.747C13.9431 22.3111 15.5319 22.9787 17.3071 23.0926C17.4158 23.0977 17.5296 23.1029 17.6331 23.1029C18.8286 23.1029 19.8327 22.6734 20.6193 21.8194C20.6245 21.8091 20.6348 21.8039 20.64 21.7935C20.9091 21.4675 21.2197 21.1725 21.5457 20.8568C21.7683 20.6446 21.996 20.4221 22.2185 20.1892C22.7309 19.6561 23 19.0351 23 18.3985C23 17.7567 22.7257 17.1409 22.203 16.6233L19.3617 13.7717ZM21.2145 19.2214C21.2093 19.2214 21.2093 19.2265 21.2145 19.2214C21.0127 19.4387 20.8056 19.6354 20.5831 19.8528C20.2467 20.1736 19.9051 20.51 19.5842 20.8878C19.0615 21.4468 18.4457 21.7107 17.6383 21.7107C17.5607 21.7107 17.4779 21.7107 17.4002 21.7056C15.8631 21.6072 14.4347 21.0069 13.3634 20.4945C10.4342 19.0765 7.862 17.0632 5.72457 14.5118C3.95976 12.3847 2.77978 10.418 1.99829 8.30649C1.51698 7.01782 1.34102 6.01379 1.41865 5.0667C1.4704 4.46118 1.7033 3.95917 2.13285 3.52961L3.89766 1.76481C4.15125 1.52674 4.42037 1.39735 4.68432 1.39735C5.01037 1.39735 5.27431 1.59402 5.43992 1.75963C5.4451 1.76481 5.45027 1.76998 5.45545 1.77516C5.77115 2.07015 6.07132 2.3755 6.38702 2.70155C6.54745 2.86716 6.71307 3.03277 6.87868 3.20356L8.29156 4.61644C8.84015 5.16503 8.84015 5.67222 8.29156 6.22081C8.14147 6.3709 7.99656 6.52098 7.84648 6.66589C7.41174 7.11098 6.99771 7.52501 6.54746 7.92869C6.5371 7.93904 6.52675 7.94421 6.52158 7.95456C6.0765 8.39965 6.1593 8.83438 6.25246 9.12937C6.25763 9.1449 6.26281 9.16043 6.26798 9.17595C6.63544 10.0661 7.15297 10.9045 7.93963 11.9034L7.94481 11.9086C9.37321 13.6682 10.8793 15.0397 12.5405 16.0903C12.7527 16.2248 12.9701 16.3335 13.1771 16.437C13.3634 16.5302 13.5394 16.6182 13.6895 16.7113C13.7102 16.7217 13.7309 16.7372 13.7516 16.7475C13.9276 16.8355 14.0932 16.8769 14.264 16.8769C14.6935 16.8769 14.9626 16.6078 15.0506 16.5198L16.8206 14.7498C16.9966 14.5739 17.276 14.3617 17.6021 14.3617C17.9229 14.3617 18.1869 14.5635 18.3473 14.7395C18.3525 14.7447 18.3525 14.7447 18.3577 14.7498L21.2093 17.6015C21.7424 18.1294 21.7424 18.6728 21.2145 19.2214Z" fill="#171D2A" />
                                                    </svg>
                                                </div>
                                                <p className='text-black1 font-[20px]'>Contact Us</p>
                                            </div>
                                            <div className='flex cursor-pointer bg-[#FFEDE4] px-[20px] items-center h-[40px] gap-[15px]   ' onClick={() => {
                                                if (!localStorage.getItem('aprifrontoken')) {
                                                    toast.error('Please first login', {
                                                        position: "bottom-center",
                                                        autoClose: 1000,
                                                    });
                                                    setTimeout(() => {

                                                        navigate('/signin')
                                                    }, 1000);

                                                    return
                                                }
                                                openModal('book_appo')
                                            }}>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 23 23" fill="none">
                                                        <path d="M10.418 19.3409H2.61364C2.19773 19.3409 1.79886 19.1757 1.50476 18.8816C1.21067 18.5875 1.04545 18.1886 1.04545 17.7727V6.79545H18.2955V10.0991C18.2955 10.2377 18.3505 10.3707 18.4486 10.4687C18.5466 10.5667 18.6795 10.6218 18.8182 10.6218C18.9568 10.6218 19.0898 10.5667 19.1878 10.4687C19.2858 10.3707 19.3409 10.2377 19.3409 10.0991V4.18182C19.3401 3.48889 19.0644 2.82459 18.5745 2.33461C18.0845 1.84464 17.4202 1.56901 16.7273 1.56818H15.6818C15.6818 1.15227 15.5166 0.753401 15.2225 0.45931C14.9284 0.165219 14.5295 0 14.1136 0C13.6977 0 13.2989 0.165219 13.0048 0.45931C12.7107 0.753401 12.5455 1.15227 12.5455 1.56818H6.79545C6.79545 1.15227 6.63024 0.753401 6.33614 0.45931C6.04205 0.165219 5.64318 0 5.22727 0C4.81136 0 4.41249 0.165219 4.1184 0.45931C3.82431 0.753401 3.65909 1.15227 3.65909 1.56818H2.61364C1.92071 1.56901 1.25641 1.84464 0.766433 2.33461C0.276461 2.82459 0.000830016 3.48889 0 4.18182V17.7727C0.000830016 18.4657 0.276461 19.13 0.766433 19.6199C1.25641 20.1099 1.92071 20.3855 2.61364 20.3864H10.418C10.5566 20.3864 10.6895 20.3313 10.7876 20.2333C10.8856 20.1352 10.9407 20.0023 10.9407 19.8636C10.9407 19.725 10.8856 19.592 10.7876 19.494C10.6895 19.396 10.5566 19.3409 10.418 19.3409ZM13.5909 1.56818C13.5909 1.42955 13.646 1.29659 13.744 1.19856C13.842 1.10053 13.975 1.04545 14.1136 1.04545C14.2523 1.04545 14.3852 1.10053 14.4833 1.19856C14.5813 1.29659 14.6364 1.42955 14.6364 1.56818V2.61364C14.6364 2.75227 14.5813 2.88523 14.4833 2.98326C14.3852 3.08129 14.2523 3.13636 14.1136 3.13636C13.975 3.13636 13.842 3.08129 13.744 2.98326C13.646 2.88523 13.5909 2.75227 13.5909 2.61364V1.56818ZM4.70455 1.56818C4.70455 1.42955 4.75962 1.29659 4.85765 1.19856C4.95568 1.10053 5.08864 1.04545 5.22727 1.04545C5.36591 1.04545 5.49887 1.10053 5.5969 1.19856C5.69493 1.29659 5.75 1.42955 5.75 1.56818V2.61364C5.75 2.75227 5.69493 2.88523 5.5969 2.98326C5.49887 3.08129 5.36591 3.13636 5.22727 3.13636C5.08864 3.13636 4.95568 3.08129 4.85765 2.98326C4.75962 2.88523 4.70455 2.75227 4.70455 2.61364V1.56818ZM1.04545 4.18182C1.04545 3.76591 1.21067 3.36704 1.50476 3.07295C1.79886 2.77886 2.19773 2.61364 2.61364 2.61364H3.65909C3.65909 3.02954 3.82431 3.42842 4.1184 3.72251C4.41249 4.0166 4.81136 4.18182 5.22727 4.18182C5.64318 4.18182 6.04205 4.0166 6.33614 3.72251C6.63024 3.42842 6.79545 3.02954 6.79545 2.61364H12.5455C12.5455 3.02954 12.7107 3.42842 13.0048 3.72251C13.2989 4.0166 13.6977 4.18182 14.1136 4.18182C14.5295 4.18182 14.9284 4.0166 15.2225 3.72251C15.5166 3.42842 15.6818 3.02954 15.6818 2.61364H16.7273C17.1432 2.61364 17.5421 2.77886 17.8361 3.07295C18.1302 3.36704 18.2955 3.76591 18.2955 4.18182V5.75H1.04545V4.18182Z" fill="black" />
                                                        <path d="M6.27237 9.40898C6.27237 9.13171 6.16223 8.86579 5.96617 8.66973C5.7701 8.47367 5.50419 8.36353 5.22692 8.36353H3.65874C3.38146 8.36353 3.11555 8.47367 2.91949 8.66973C2.72343 8.86579 2.61328 9.13171 2.61328 9.40898V10.9772C2.61328 11.2544 2.72343 11.5203 2.91949 11.7164C3.11555 11.9125 3.38146 12.0226 3.65874 12.0226H5.22692C5.50419 12.0226 5.7701 11.9125 5.96617 11.7164C6.16223 11.5203 6.27237 11.2544 6.27237 10.9772V9.40898ZM3.65874 10.9772V9.40898H5.22692V10.9772H3.65874ZM11.4996 9.40898C11.4996 9.13171 11.3895 8.86579 11.1934 8.66973C10.9974 8.47367 10.7315 8.36353 10.4542 8.36353H8.88601C8.60874 8.36353 8.34282 8.47367 8.14676 8.66973C7.9507 8.86579 7.84055 9.13171 7.84055 9.40898V10.9772C7.84055 11.2544 7.9507 11.5203 8.14676 11.7164C8.34282 11.9125 8.60874 12.0226 8.88601 12.0226H10.4542C10.7315 12.0226 10.9974 11.9125 11.1934 11.7164C11.3895 11.5203 11.4996 11.2544 11.4996 10.9772V9.40898ZM8.88601 10.9772V9.40898H10.4542V10.9772H8.88601ZM16.2042 10.5276C16.3428 10.5276 16.4758 10.4725 16.5738 10.3745C16.6718 10.2765 16.7269 10.1435 16.7269 10.0049V9.40898C16.7269 9.13171 16.6168 8.86579 16.4207 8.66973C16.2247 8.47367 15.9587 8.36353 15.6815 8.36353H14.1133C13.836 8.36353 13.5701 8.47367 13.374 8.66973C13.178 8.86579 13.0678 9.13171 13.0678 9.40898V10.9144C13.0678 11.0531 13.1229 11.186 13.2209 11.2841C13.319 11.3821 13.4519 11.4372 13.5906 11.4372C13.7292 11.4372 13.8621 11.3821 13.9602 11.2841C14.0582 11.186 14.1133 11.0531 14.1133 10.9144V9.40898H15.6815V10.0049C15.6815 10.1435 15.7365 10.2765 15.8346 10.3745C15.9326 10.4725 16.0656 10.5276 16.2042 10.5276ZM5.22692 13.5908H3.65874C3.38146 13.5908 3.11555 13.7009 2.91949 13.897C2.72343 14.0931 2.61328 14.359 2.61328 14.6363V16.2044C2.61328 16.4817 2.72343 16.7476 2.91949 16.9437C3.11555 17.1397 3.38146 17.2499 3.65874 17.2499H5.22692C5.50419 17.2499 5.7701 17.1397 5.96617 16.9437C6.16223 16.7476 6.27237 16.4817 6.27237 16.2044V14.6363C6.27237 14.359 6.16223 14.0931 5.96617 13.897C5.7701 13.7009 5.50419 13.5908 5.22692 13.5908ZM3.65874 16.2044V14.6363H5.22692V16.2044H3.65874ZM10.8149 13.6593C10.7001 13.6137 10.5777 13.5905 10.4542 13.5908H8.88601C8.60874 13.5908 8.34282 13.7009 8.14676 13.897C7.9507 14.0931 7.84055 14.359 7.84055 14.6363V16.2044C7.84055 16.4817 7.9507 16.7476 8.14676 16.9437C8.34282 17.1397 8.60874 17.2499 8.88601 17.2499H9.95237C10.091 17.2499 10.224 17.1948 10.322 17.0968C10.42 16.9988 10.4751 16.8658 10.4751 16.7272C10.4751 16.5885 10.42 16.4556 10.322 16.3575C10.224 16.2595 10.091 16.2044 9.95237 16.2044H8.88601V14.6363L10.4281 14.6305C10.5566 14.6806 10.6997 14.6778 10.8262 14.6228C10.9527 14.5678 11.0523 14.465 11.1034 14.3368C11.1544 14.2087 11.1527 14.0655 11.0987 13.9386C11.0446 13.8117 10.9426 13.7113 10.8149 13.6593ZM17.2496 11.4999C16.1124 11.4999 15.0007 11.8371 14.0551 12.4689C13.1095 13.1008 12.3725 13.9988 11.9373 15.0495C11.5021 16.1001 11.3883 17.2563 11.6101 18.3717C11.832 19.487 12.3796 20.5116 13.1838 21.3158C13.9879 22.1199 15.0125 22.6675 16.1279 22.8894C17.2433 23.1113 18.3994 22.9974 19.4501 22.5622C20.5007 22.127 21.3988 21.39 22.0306 20.4444C22.6624 19.4988 22.9996 18.3871 22.9996 17.2499C22.9978 15.7254 22.3915 14.264 21.3135 13.186C20.2356 12.1081 18.7741 11.5017 17.2496 11.4999ZM17.2496 21.9544C16.3192 21.9544 15.4096 21.6785 14.6359 21.1616C13.8623 20.6446 13.2593 19.9099 12.9032 19.0502C12.5471 18.1906 12.454 17.2447 12.6355 16.3321C12.817 15.4195 13.2651 14.5812 13.923 13.9233C14.581 13.2653 15.4192 12.8173 16.3318 12.6357C17.2444 12.4542 18.1904 12.5474 19.05 12.9035C19.9096 13.2595 20.6444 13.8625 21.1613 14.6362C21.6783 15.4098 21.9542 16.3194 21.9542 17.2499C21.9528 18.4972 21.4567 19.693 20.5747 20.575C19.6928 21.457 18.4969 21.9531 17.2496 21.9544Z" fill="black" />
                                                        <path d="M17.772 17.0335V14.6363C17.772 14.4976 17.7169 14.3647 17.6189 14.2666C17.5209 14.1686 17.3879 14.1135 17.2493 14.1135C17.1107 14.1135 16.9777 14.1686 16.8797 14.2666C16.7816 14.3647 16.7266 14.4976 16.7266 14.6363V17.2499C16.7266 17.3885 16.7817 17.5215 16.8797 17.6195L17.9252 18.6649C18.0238 18.7601 18.1558 18.8128 18.2929 18.8116C18.4299 18.8104 18.561 18.7555 18.6579 18.6585C18.7549 18.5616 18.8098 18.4305 18.811 18.2935C18.8122 18.1564 18.7595 18.0244 18.6643 17.9258L17.772 17.0335Z" fill="black" />
                                                    </svg>
                                                </div>
                                                <p className='text-black1 font-[20px]'>Schedule Appointment</p>
                                            </div>
                                        </div>

                                        {/* <p className='text-black1 text-[20px] max-sm:text-[16px] mt-[20px]'>Ships by <span className='text-[#D86A37] font-[700]'>Tues, Apr 15</span> | Track in real time before it ships
                                </p>
                                <p className='text-black1 text-[20px] max-sm:text-[16px]'>Free Insured Shipping. 30 Day Returns.
                                </p> */}
                                    </div>

                                    {loading11 && (
                                        <div>
                                            <div className="absolute opacity-[.5]  inset-0 bg-white flex flex-col items-center justify-center z-[28]">
                                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                                <div className='w-[48%] py-[30px] max-lg:pt-[20px]  max-lg:w-[100%]'>
                                    <div className='flex flex-wrap gap-[20px] itmes-center justify-between'>
                                        <h4 className='flex items-center text-[24.02px] max-sm:text-[20px] leading-[100%] text-black1 underline  font-normal'>
                                            {cate?.data?.find((val1) => val1.category_id == products?.product?.category)?.name}</h4>

                                        <div className='flex items-center gap-[14px] '>
                                            <div>
                                                <svg
                                                    className="w-[40px] max-lg:w-[30px] cursor-pointer"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 47 41"
                                                    fill={filled ? "#D86A37" : "none"}
                                                    stroke={filled ? "none" : "#222222"}
                                                    onClick={() => {
                                                        const token = localStorage.getItem("aprifrontoken");

                                                        if (!token) {
                                                            toast.error('Please first login', {
                                                                position: "bottom-center",
                                                                autoClose: 1500,
                                                            })

                                                            setTimeout(() => {
                                                                window.location.href = "/signin"; // Redirect after 1.5 seconds
                                                            }, 1500);

                                                            return; // Exit early
                                                        }
                                                        if (filled) {
                                                            removewish(); // Currently filled, so remove from wishlist
                                                        } else {
                                                            handlewishlist(); // Currently not filled, so add to wishlist
                                                        }
                                                        setFilled(!filled); // Then toggle the state
                                                    }}
                                                >
                                                    <path d="M5.32207 23.141L22.4288 39.211C22.8833 39.638 23.1106 39.8514 23.3879 39.8514C23.6653 39.8514 23.8926 39.638 24.347 39.211L41.4538 23.1411C46.135 18.7435 46.7035 11.507 42.7664 6.43247L42.0261 5.47831C37.3161 -0.592276 27.862 0.425803 24.5526 7.35998C24.0851 8.33947 22.6908 8.33947 22.2233 7.35998C18.9138 0.425803 9.45975 -0.592273 4.74982 5.47831L4.00952 6.43248C0.0723855 11.507 0.640854 18.7435 5.32207 23.141Z" />
                                                </svg>
                                            </div>
                                            <p className='text-[18.01px] leading-[100%]'>Add to Wishlist</p>
                                        </div>


                                    </div>
                                    <h2 className='text-[32px] pb-[35px]  border-[#D86A3780] border-b max-sm:pb-[25px] max-sm:mt-[25px]  text-black mt-[30px]  max-sm:text-[26px]' >{products?.product?.name}</h2>


                                    {/* <div className='flex gap-[3px] mt-[10px] pb-[45px] items-center border-[#D86A3780] border-b'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 28 26" fill="none">
                                        <path d="M14.1331 0.181458L17.2781 9.86079H27.4555L19.2218 15.8429L22.3668 25.5223L14.1331 19.5401L5.89933 25.5223L9.04434 15.8429L0.810603 9.86079H10.9881L14.1331 0.181458Z" fill="#D86A37" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 28 26" fill="none">
                                        <path d="M14.1331 0.181458L17.2781 9.86079H27.4555L19.2218 15.8429L22.3668 25.5223L14.1331 19.5401L5.89933 25.5223L9.04434 15.8429L0.810603 9.86079H10.9881L14.1331 0.181458Z" fill="#D86A37" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 28 26" fill="none">
                                        <path d="M14.1331 0.181458L17.2781 9.86079H27.4555L19.2218 15.8429L22.3668 25.5223L14.1331 19.5401L5.89933 25.5223L9.04434 15.8429L0.810603 9.86079H10.9881L14.1331 0.181458Z" fill="#D86A37" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 28 26" fill="none">
                                        <path d="M14.1331 0.181458L17.2781 9.86079H27.4555L19.2218 15.8429L22.3668 25.5223L14.1331 19.5401L5.89933 25.5223L9.04434 15.8429L0.810603 9.86079H10.9881L14.1331 0.181458Z" fill="#D86A37" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 28 26" fill="none">
                                        <path d="M14.1331 0.181458L17.2781 9.86079H27.4555L19.2218 15.8429L22.3668 25.5223L14.1331 19.5401L5.89933 25.5223L9.04434 15.8429L0.810603 9.86079H10.9881L14.1331 0.181458Z" fill="#D86A37" />
                                    </svg>
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 28 26" fill="none">
                                        <path d="M14.1331 0.181458L17.2781 9.86079H27.4555L19.2218 15.8429L22.3668 25.5223L14.1331 19.5401L5.89933 25.5223L9.04434 15.8429L0.810603 9.86079H10.9881L14.1331 0.181458Z" fill="#D86A37" />
                                    </svg>
                                </div>

                                <h6 className='text-[18px] ms-1  text-[#D86A37] leading-[100%]'>

                                    (864)
                                </h6>

                            </div> */}
                                    {products?.metal_details.length > 0 && (


                                        <div className='py-[25px]  border-[#D86A3780] border-b'>
                                            <h3 className='text-[26px] font-[600] max-sm:text-[22px] text-black1'>Metal color : </h3>

                                            <div className='flex gap-[20px] mt-[15px]'>
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
                                            </div>

                                        </div>
                                    )}
                                    {/* <div className='py-[25px] border-[#D86A3780] border-b'>
                                <h3 className='text-[24.02px] font-[600] text-black1 max-sm:text-[22px]'>Diamond Type : LAB</h3>

                                <div className='mt-[15px]'>
                                    <a href="" className='text-[20px] text-primary leading-full underline'>Lab Grown Diamond</a>
                                </div>

                            </div> */}
                                    {
                                        diamond?.some(item => item.component === 'Main Stone') && (
                                            <div className='py-[25px] border-[#D86A3780] border-b'>
                                                <h3 className='text-[24.02px] font-[600] text-black1 max-sm:text-[22px]'>Diamond Shape :</h3>

                                                <div className='flex flex-wrap gap-[20px] mt-[15px]'>
                                                    {
                                                        log?.map((value, index) => (
                                                            <div key={index} onClick={() => toggledimondshape(value.diamond_shape, value.diamond_weight_ct)}>

                                                                <div
                                                                    className={`relative cursor-pointer flex items-center justify-center max-sm:w-[60px] max-sm:h-[60px] w-[78px] h-[78px] rounded-full border p-[6px] ${dimond_shape == value.diamond_shape ? 'border-[#999999]' : 'border-white'
                                                                        }`}
                                                                >
                                                                    <img
                                                                        src={shapeImages[value.diamond_shape]}
                                                                        className="w-[50px] max-sm:w-[45px] max-sm:h-[45px]"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <span className="mt-[12px] block text-center text-[14px] font-[600]">
                                                                    {value.diamond_shape}
                                                                </span>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        )
                                    }

                                    {diamond?.some(d => d.diamond_certification && d.diamond_certification !== 'none' && d.diamond_certification !== 'None') && (
                                        <div className='py-[25px] border-[#D86A3780] border-b'>
                                            <h3 className='text-[24.02px] font-[600] text-black1 max-sm:text-[22px]'>
                                                Diamond Certificate type:
                                            </h3>

                                            <div className='mt-[15px] flex gap-[15px] flex-wrap'>
                                                {diamond
                                                    .filter(
                                                        (val, index, self) =>
                                                            val.diamond_certification &&
                                                            val.diamond_certification.toLowerCase() !== 'none' &&
                                                            self.findIndex(v => v.diamond_certification === val.diamond_certification) === index
                                                    )
                                                    .map((val, index) => (
                                                        <div
                                                            key={index}
                                                            className='w-[75px] h-[47px] border border-primary text-primary text-[20px] flex justify-center items-center max-sm:h-[40px] max-sm:w-[55px] max-sm:text-[17px]'
                                                        >
                                                            {val.diamond_certification}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}


                                    <div className='py-[25px] border-[#D86A3780] border-b'>
                                        <div className='flex flex-wrap justify-between  items-center'>
                                            <div>

                                                <h3 className='text-[24.02px] font-[600] text-black1 max-sm:text-[22px]'>Total Carat Weight : </h3>

                                                <div className='mt-[15px] flex gap-[13px]'>
                                                    {[...new Map(
                                                        diamond?.filter(item => item.diamond_shape === dimond_shape && item.component === "Main Stone")?.map(item => [item?.diamond_weight_ct, item])).values()].map((value, index) => {
                                                            const weight = parseFloat(value?.diamond_weight_ct);

                                                            // Convert weight to integer and fraction
                                                            // ✅ Utility to format any decimal number to mixed fraction (dynamic)
                                                            const formatWeight = (num) => {
                                                                const intPart = Math.floor(num);
                                                                const decimalPart = +(num - intPart).toFixed(3); // use 3 decimals for values like 2.010

                                                                const fractionMap = {
                                                                    0.125: "⅛",
                                                                    0.2: "⅕",
                                                                    0.25: "¼",
                                                                    0.33: "⅓",
                                                                    0.375: "⅜",
                                                                    0.5: "½",
                                                                    0.625: "⅝",
                                                                    0.66: "⅔",
                                                                    0.75: "¾",
                                                                    0.8: "⅘",
                                                                    0.875: "⅞",
                                                                };

                                                                const matchedFraction = Object.entries(fractionMap).find(
                                                                    ([dec]) => Math.abs(decimalPart - parseFloat(dec)) < 0.04
                                                                );

                                                                const fraction = matchedFraction?.[1] || null;

                                                                // Final output
                                                                if (intPart === 0 && fraction) return <span>{fraction}</span>;
                                                                if (intPart === 0 && !fraction) return <span>{num}</span>;
                                                                if (!fraction && decimalPart < 0.01) return <span>{intPart}</span>;

                                                                return (
                                                                    <span className="flex items-center gap-[2px] justify-center">
                                                                        <span>{intPart}</span>
                                                                        {fraction ? <span>{fraction}</span> : <span className="text-sm">.{String(decimalPart).split(".")[1]}</span>}
                                                                    </span>
                                                                );
                                                            };



                                                            return (
                                                                <div
                                                                    key={index}
                                                                    onClick={() => toggledimond(value?.diamond_weight_ct, value?.diamond_id)}
                                                                    className={`w-[50px] cursor-pointer h-[50px] max-sm:w-[40px] max-sm:h-[40px] max-sm:text-sm border text-[20px] font-[500] rounded-full flex items-center justify-center 
                ${dimonindex === value?.diamond_weight_ct ? 'border-primary' : 'border-[#8B8B8B]'}`}
                                                                >
                                                                    {formatWeight(weight)}
                                                                </div>
                                                            );
                                                        })}


                                                </div>

                                            </div>
                                        </div>

                                    </div>


                                    {/* {
                                        diamond?.some(item => item.component === 'Accent Stone') &&
                                        !diamond?.some(item => item.component === 'Main Stone') && (
                                            <div className='py-[25px] border-[#D86A3780] border-b'>
                                                <div className='flex flex-wrap justify-between  items-center'>
                                                    <div>

                                                        <h3 className='text-[24.02px] font-[600] text-black1 max-sm:text-[22px]'>Total Carat Weight : </h3>

                                                        <div className='mt-[15px] flex gap-[13px]'>
                                                            {[...new Map(
                                                                diamond?.filter(item => item.component === 'Accent Stone')?.map(item => [item?.diamond_weight_ct, item])).values()].map((value, index) => {
                                                                    const weight = parseFloat(value?.diamond_weight_ct);

                                                                  
                                                                 
                                                                    const formatWeight = (num) => {
                                                                        const intPart = Math.floor(num);
                                                                        const decimalPart = +(num - intPart).toFixed(3); // use 3 decimals for values like 2.010

                                                                        const fractionMap = {
                                                                            0.125: "⅛",
                                                                            0.2: "⅕",
                                                                            0.25: "¼",
                                                                            0.33: "⅓",
                                                                            0.375: "⅜",
                                                                            0.5: "½",
                                                                            0.625: "⅝",
                                                                            0.66: "⅔",
                                                                            0.75: "¾",
                                                                            0.8: "⅘",
                                                                            0.875: "⅞",
                                                                        };

                                                                        const matchedFraction = Object.entries(fractionMap).find(
                                                                            ([dec]) => Math.abs(decimalPart - parseFloat(dec)) < 0.04
                                                                        );

                                                                        const fraction = matchedFraction?.[1] || null;

                                                                        // Final output
                                                                        if (intPart === 0 && fraction) return <span>{fraction}</span>;
                                                                        if (intPart === 0 && !fraction) return <span>{num}</span>;
                                                                        if (!fraction && decimalPart < 0.01) return <span>{intPart}</span>;

                                                                        return (
                                                                            <span className="flex items-center gap-[2px] justify-center">
                                                                                <span>{intPart}</span>
                                                                                {fraction ? <span>{fraction}</span> : <span className="text-sm">.{String(decimalPart).split(".")[1]}</span>}
                                                                            </span>
                                                                        );
                                                                    };



                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            onClick={() => toggledimond(value?.diamond_weight_ct, value?.diamond_id)}
                                                                            className={`w-[50px] cursor-pointer h-[50px] max-sm:w-[40px] max-sm:h-[40px] max-sm:text-sm border text-[20px] font-[500] rounded-full flex items-center justify-center 
                ${dimonindex === value?.diamond_weight_ct ? 'border-primary' : 'border-[#8B8B8B]'}`}
                                                                        >
                                                                            {formatWeight(weight)}
                                                                        </div>
                                                                    );
                                                                })}


                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    } */}
                                    {products?.product?.is_ring_size && (


                                        <div className='py-[15px] '>

                                            <div>
                                                <div className='flex justify-between gap-[10px] items-center'>

                                                    <h3 className='text-[24.02px] font-[600] text-black1 max-sm:text-[22px]'>Ring Size : </h3>
                                                    <div className='flex items-center gap-[10px] cursor-pointer' onClick={() => openModal('modal1')}>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
                                                                <path d="M0.564812 5.77618L5.77472 0.566281C5.95382 0.386774 6.16658 0.244358 6.40081 0.147188C6.63503 0.0500171 6.88612 0 7.1397 0C7.39328 0 7.64437 0.0500171 7.8786 0.147188C8.11282 0.244358 8.32558 0.386774 8.50469 0.566281L30.3651 22.4267C30.5447 22.6061 30.6872 22.819 30.7844 23.0535C30.8816 23.2879 30.9316 23.5392 30.9316 23.793C30.9316 24.0468 30.8816 24.2981 30.7844 24.5325C30.6872 24.767 30.5447 24.98 30.3651 25.1593L25.1552 30.3666C24.9761 30.5465 24.7632 30.6892 24.5287 30.7866C24.2942 30.884 24.0428 30.9342 23.789 30.9342C23.5351 30.9342 23.2837 30.884 23.0492 30.7866C22.8148 30.6892 22.6018 30.5465 22.4227 30.3666L0.564812 8.50616C0.202904 8.14408 -0.000398636 7.65311 -0.000398636 7.14117C-0.000398636 6.62924 0.202904 6.13826 0.564812 5.77618ZM1.47481 7.59617L23.3353 29.4566C23.4561 29.577 23.6197 29.6447 23.7902 29.6447C23.9608 29.6447 24.1244 29.577 24.2452 29.4566L29.4551 24.2467C29.5756 24.1259 29.6432 23.9623 29.6432 23.7917C29.6432 23.6211 29.5756 23.4575 29.4551 23.3367L28.2435 22.1251L25.792 24.5767C25.6712 24.6971 25.5076 24.7647 25.337 24.7647C25.1664 24.7647 25.0028 24.6971 24.882 24.5767C24.822 24.5168 24.7743 24.4457 24.7419 24.3674C24.7094 24.2891 24.6926 24.2052 24.6926 24.1204C24.6926 24.0356 24.7094 23.9517 24.7419 23.8734C24.7743 23.7951 24.822 23.724 24.882 23.6641L27.3232 21.2151L25.9157 19.8076L24.5572 21.1661C24.4364 21.2866 24.2727 21.3542 24.1022 21.3542C23.9316 21.3542 23.768 21.2866 23.6472 21.1661C23.5872 21.1063 23.5395 21.0352 23.5071 20.9569C23.4746 20.8786 23.4578 20.7946 23.4578 20.7099C23.4578 20.6251 23.4746 20.5411 23.5071 20.4629C23.5395 20.3846 23.5872 20.3134 23.6472 20.2536L25.0031 18.8976L23.5982 17.4901L22.2397 18.8486C22.1188 18.9691 21.9552 19.0367 21.7847 19.0367C21.6141 19.0367 21.4505 18.9691 21.3297 18.8486C21.2696 18.7888 21.222 18.7176 21.1895 18.6393C21.157 18.561 21.1403 18.4771 21.1403 18.3923C21.1403 18.3076 21.157 18.2236 21.1895 18.1453C21.222 18.067 21.2696 17.9959 21.3297 17.9361L22.683 16.5775L21.2781 15.1726L19.9196 16.5285C19.8599 16.5885 19.789 16.636 19.7109 16.6685C19.6328 16.7009 19.5491 16.7177 19.4646 16.7177C19.38 16.7177 19.2963 16.7009 19.2182 16.6685C19.1401 16.636 19.0692 16.5885 19.0096 16.5285C18.9496 16.4689 18.9021 16.398 18.8696 16.3199C18.8372 16.2418 18.8204 16.1581 18.8204 16.0735C18.8204 15.989 18.8372 15.9053 18.8696 15.8272C18.9021 15.7491 18.9496 15.6782 19.0096 15.6185L20.3655 14.26L18.9606 12.855L16.509 15.304C16.4494 15.364 16.3785 15.4115 16.3004 15.444C16.2223 15.4764 16.1386 15.4932 16.054 15.4932C15.9695 15.4932 15.8857 15.4764 15.8077 15.444C15.7296 15.4115 15.6587 15.364 15.599 15.304C15.5391 15.2444 15.4915 15.1735 15.4591 15.0954C15.4266 15.0173 15.4099 14.9336 15.4099 14.849C15.4099 14.7645 15.4266 14.6808 15.4591 14.6027C15.4915 14.5246 15.5391 14.4537 15.599 14.394L18.048 11.9425L16.6405 10.5375L15.2845 11.8935C15.2247 11.9535 15.1535 12.0011 15.0752 12.0336C14.9969 12.0661 14.913 12.0828 14.8282 12.0828C14.7435 12.0828 14.6595 12.0661 14.5812 12.0336C14.5029 12.0011 14.4318 11.9535 14.372 11.8935C14.2515 11.7727 14.1839 11.6091 14.1839 11.4385C14.1839 11.2679 14.2515 11.1043 14.372 10.9835L15.7305 9.62496L14.323 8.21744L12.967 9.57598C12.9071 9.636 12.836 9.68362 12.7577 9.71611C12.6794 9.7486 12.5955 9.76532 12.5107 9.76532C12.426 9.76532 12.342 9.7486 12.2637 9.71611C12.1854 9.68362 12.1143 9.636 12.0544 9.57598C11.9339 9.45474 11.8662 9.29069 11.8662 9.1197C11.8662 8.9487 11.9339 8.78465 12.0544 8.66341L13.413 7.30744L12.0055 5.89992L10.6495 7.25846C10.5279 7.37843 10.364 7.44569 10.1932 7.44569C10.0224 7.44569 9.85849 7.37843 9.73692 7.25846C9.6769 7.1986 9.62928 7.12748 9.5968 7.04918C9.56431 6.97089 9.54758 6.88695 9.54758 6.80218C9.54758 6.71741 9.56431 6.63347 9.5968 6.55517C9.62928 6.47688 9.6769 6.40576 9.73692 6.34589L11.1084 4.98993L9.70083 3.5824L7.25184 6.03397C7.13027 6.15393 6.96635 6.22119 6.79556 6.22119C6.62476 6.22119 6.46084 6.15393 6.33927 6.03397C6.27925 5.9741 6.23163 5.90299 6.19914 5.82469C6.16666 5.74639 6.14993 5.66246 6.14993 5.57768C6.14993 5.49291 6.16666 5.40898 6.19914 5.33068C6.23163 5.25238 6.27925 5.18127 6.33927 5.1214L8.79084 2.67241L7.5947 1.47627C7.4739 1.35585 7.31028 1.28822 7.1397 1.28822C6.96913 1.28822 6.80551 1.35585 6.68471 1.47627L1.47481 6.68617C1.35438 6.80698 1.28675 6.9706 1.28675 7.14117C1.28675 7.31175 1.35438 7.47536 1.47481 7.59617Z" fill="#716A6A" />
                                                                <path d="M4.81076 6.59595C5.03442 6.59575 5.25124 6.67312 5.42425 6.81486C5.59727 6.9566 5.71578 7.15395 5.75959 7.37328C5.8034 7.59261 5.76981 7.82035 5.66453 8.01769C5.55925 8.21502 5.3888 8.36975 5.18223 8.45549C4.97565 8.54124 4.74574 8.55271 4.53166 8.48793C4.31758 8.42316 4.13258 8.28616 4.0082 8.10028C3.88381 7.9144 3.82772 7.69113 3.8495 7.46853C3.87128 7.24593 3.96957 7.03777 4.12762 6.87951C4.21722 6.78961 4.32369 6.71828 4.44092 6.66961C4.55815 6.62095 4.68383 6.59592 4.81076 6.59595Z" fill="#716A6A" />
                                                            </svg>
                                                        </div>
                                                        <span className='font-medium text-[#716A6A] '>Size Guide</span>
                                                    </div>
                                                </div>

                                                <div className='mt-[18px]'>
                                                    <div className="relative max-sm:w-[100%] w-[350px]">
                                                        {/* Dropdown Button */}
                                                        <div
                                                            className="px-[20px] h-[47px] flex items-center justify-between border border-primary text-[20px] text-primary cursor-pointer"
                                                            onClick={() => setIsOpen(!isOpen)}
                                                        >
                                                            {selectedSize || "Select Ring Size"}
                                                            <svg
                                                                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                                    }`}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 29 18"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M27 2.57251L14.2189 15.8951"
                                                                    stroke="#D86A37"
                                                                    strokeWidth="3.4"
                                                                    strokeLinecap="round"
                                                                />
                                                                <path
                                                                    d="M2 3.03406L14.0419 15.9182"
                                                                    stroke="#D86A37"
                                                                    strokeWidth="3.4"
                                                                    strokeLinecap="round"
                                                                />
                                                            </svg>
                                                        </div>

                                                        {/* Dropdown Menu */}
                                                        {isOpen && (
                                                            <ul className="absolute w-full h-[300px] overflow-y-scroll mt-1 bg-white border border-primary shadow-lg z-10">
                                                                {ringSizes?.map((size) => (
                                                                    <li
                                                                        key={size}
                                                                        className="px-4 py-2 text-primary hover:bg-primary hover:text-white cursor-pointer"
                                                                        onClick={() => {
                                                                            setSelectedSize(size);
                                                                            setIsOpen(false);
                                                                        }}
                                                                    >
                                                                        {size}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>


                                            </div>


                                        </div>
                                    )}
                                    <div className=' mt-[40px] flex flex-wrap gap-[20px]  justify-between '>
                                        <div>

                                            <div className='flex flex-wrap items-center'>

                                                <div>
                                                    <h4 className='text-[55px] font-[700] leading-[100%] max-sm:text-[47px]'>₹{parseInt(total)}</h4>
                                                    <p className='text-[14px] font-[600] text-black1 text-center'>(Incl. taxes and charges)</p>
                                                </div>
                                                {/* <div className='ms-[20px] max-sm:ms-[5px]'>
                                            <h5 className='text-[26px] font-[600] text-[#838383] line-through  max-sm:text-[23px]'>₹1299</h5>
                                        </div>
                                        <div className='ms-[14px] max-sm:ms-0 max-sm:mt-[10px]'>
                                            <h6 className='text-[26px] font-[600] text-[#DA2929] max-sm:text-[23px]'>(₹100 Off)</h6>
                                        </div> */}
                                            </div>
                                            <h4 onClick={() => {
                                                openModal('modal2')
                                            }} className=' mt-3  cursor-pointer inline-block text-[24.02px] max-sm:text-[20px] leading-[100%] text-primary underline  font-normal'>
                                                Price Backup</h4>
                                        </div>
                                        <div className='flex items-center gap-[10px]'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36" fill="none">
                                                    <circle cx="17.7171" cy="17.6707" r="16.1093" stroke="#2DC84A" strokeWidth="2.80161" />
                                                    <line x1="10.5762" y1="17.1327" x2="15.0193" y2="22.5884" stroke="#2DC84A" strokeWidth="2.80161" strokeLinecap="round" />
                                                    <line x1="15.1562" y1="22.8996" x2="25.5353" y2="12.5206" stroke="#2DC84A" strokeWidth="2.80161" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <p className='text-black1 text-[26px] max-sm:text-[23px]'>In stock - ready to ship</p>
                                        </div>
                                    </div>

                                    <div className='flex mt-[25px] gap-[7px]'>
                                        <div className='w-[220px] h-[60px] border border-primary px-[20px] flex items-center justify-between max-sm:w-[170px] max-sm:h-[50px]'>
                                            <button onClick={decreaseQuantity}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="3" viewBox="0 0 17 3" fill="none">
                                                    <path d="M0.904267 2.7396V0.621582H16.3692V2.7396H0.904267Z" fill="#D86A37" />
                                                </svg>
                                            </button>

                                            <span className='text-[30px] max-sm:text-[25px] text-primary font-[600] max-sm:text-[20px]'>{quantity}</span>

                                            <button onClick={increaseQuantity}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                    <path d="M7.4595 16.4834V9.42329H0.533913V6.93545H7.4595V0.0771061H10.0146V6.93545H16.9402V9.42329H10.0146V16.4834H7.4595Z" fill="#D86A37" />
                                                </svg>
                                            </button>
                                        </div>
                                        {/* <Link to='/cart' className='w-full'> */}
                                        <button onClick={() => addto_cart()} className='w-full h-[60px] max-sm:text-[25px] border border-primary px-[20px]  text-[30px] text-primary font-[600] flex items-center justify-center max-sm:h-[50px] max-sm:text-[20px]'>
                                            Add to Bag
                                        </button>

                                        {/* </Link> */}
                                    </div>

                                </div>
                            </div>


                        </div>
                    ) : (
                        <div>
                            <div className="absolute  inset-0 bg-white flex flex-col items-center justify-center z-[28]">
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>
                    )}
            </section >

            {products ? (
                <section className='mt-[30px]'>
                    <div className='container'>

                        {/* === Product Details === */}
                        <div className="space-y-4 border-t border-t-primary">
                            <div
                                className="p-4 w-[80%] max-xl:w-[100%] mx-auto max-md:w-[100%] "
                            >
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(1)}>
                                    <span className="font-[700] text-[28px] text-[#D86A37] max-2xl:text-[23px] max-sm:text-[20px]">
                                        Product Details
                                    </span>
                                    <svg
                                        className={`transition-transform duration-300 ${openIndex === 1 ? "rotate-180" : "rotate-90"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="18"
                                        viewBox="0 0 31 19"
                                        fill="none"
                                    >
                                        <path d="M1.92578 17.2815L15.9338 2.573L29.9419 17.2815" stroke="#222222" strokeWidth="2.80161" />
                                    </svg>
                                </div>

                                {openIndex === 1 && matchedProduct ? (
                                    <div className="overflow-hidden transition-all duration-300 ease-in-out px-[14px] max-sm:px-0">
                                        <div className="mt-[20px] max-sm:mt-[5px]">
                                            <p className="text-black1 text-[21px] max-sm:text-[15px]">
                                                {matchedProduct.description}
                                            </p>
                                        </div>
                                        <ul className="mt-[26px] list-disc ms-[20px] text-[21px] max-sm:text-[15px] text-black1">
                                            <li><span className="font-[700]">SKU :</span> {matchedProduct.sku}</li>
                                            {/* <li><span className="font-[700]">Stock :</span> {matchedProduct.stock}</li> */}
                                            <li><span className="font-[700]">Width :</span> {matchedProduct.width_mm} mm</li>
                                            <li><span className="font-[700]">Height :</span> {matchedProduct.height_mm} mm</li>
                                            <li><span className="font-[700]">Gross Weight :</span> {matchedProduct.product_weight_g} gm</li>
                                        </ul>
                                    </div>
                                ) : openIndex === 1 && !matchedProduct ? (
                                    <p>No matching product found.</p>
                                ) : null}
                            </div>
                        </div>


                        {/* === Stone Details === */}
                        {diamond?.some(item => item.component === 'Main Stone') && (

                            <div className="space-y-4 border-t border-t-primary">
                                <div
                                    className="p-4 w-[80%] mx-auto max-md:w-[100%] "

                                >
                                    <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(2)}>
                                        <span className="font-[700] text-[28px] text-[#D86A37] max-2xl:text-[23px] max-sm:text-[20px]">
                                            Center Stone Details
                                        </span>
                                        <svg
                                            className={`transition-transform duration-300 ${openIndex === 2 ? "rotate-180" : "rotate-90"}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="25"
                                            height="18"
                                            viewBox="0 0 31 19"
                                            fill="none"
                                        >
                                            <path d="M1.92578 17.2815L15.9338 2.573L29.9419 17.2815" stroke="#222222" strokeWidth="2.80161" />
                                        </svg>
                                    </div>

                                    <div
                                        className={`overflow-hidden transition-all px-[14px] duration-400 ${openIndex === 2 ? "max-h-screen mt-2 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <ul className='mt-[27px] list-disc ms-[20px] max-sm:mt-[5px] text-[21px] text-black1 max-sm:text-[15px]'>
                                            <li>
                                                <span className='font-[700]'>Diamond :</span> {matchedDiamond ? matchedDiamond.diamond_certification + ' Certified Lab Diamond' : ""}
                                            </li>

                                            <li>
                                                <span className='font-[700]'>Diamond Shape :</span> {matchedDiamond ? matchedDiamond.diamond_shape : 'N/A'}
                                            </li>
                                            <li>
                                                <span className='font-[700]'>Diamond Weight :</span> {matchedDiamond ? formatWeight(matchedDiamond.diamond_weight_ct) : 'N/A'}
                                            </li>
                                            <li>
                                                <span className='font-[700]'>Diamond Color :</span> {matchedDiamond ? matchedDiamond.diamond_color_grade : 'N/A'}
                                            </li>

                                            <li>
                                                <span className='font-[700]'>Diamond Clarity Grade :</span> {matchedDiamond ? matchedDiamond.diamond_clarity_grade : 'N/A'}
                                            </li>

                                        </ul>
                                    </div>

                                </div>
                            </div>
                        )}
                        {
                            accent_stones && (



                                < div className="space-y-4 border-t border-t-primary">
                                    <div
                                        className="p-4 w-[80%] mx-auto max-md:w-[100%] "

                                    >
                                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(6)}>
                                            <span className="font-[700] text-[28px] text-[#D86A37] max-2xl:text-[23px] max-sm:text-[20px]">
                                                {diamond?.some(item => item.component === 'Accent Stone') &&
                                                    !diamond?.some(item => item.component === 'Main Stone') ? (
                                                    ' Stone Details'
                                                ) : (
                                                    'Side Stone Details'

                                                )}
                                            </span>
                                            <svg
                                                className={`transition-transform duration-300 ${openIndex === 6 ? "rotate-180" : "rotate-90"}`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="18"
                                                viewBox="0 0 31 19"
                                                fill="none"
                                            >
                                                <path d="M1.92578 17.2815L15.9338 2.573L29.9419 17.2815" stroke="#222222" strokeWidth="2.80161" />
                                            </svg>
                                        </div>

                                        <div
                                            className={`overflow-hidden transition-all px-[14px] duration-400 ${openIndex === 6 ? "max-h-screen mt-2 opacity-100" : "max-h-0 opacity-0"}`}
                                        >
                                            <ul className='mt-[27px] list-disc ms-[20px] max-sm:mt-[5px] text-[21px] text-black1 max-sm:text-[15px]'>
                                                <li>
                                                    <span className='font-[700]'>Diamond :</span> {accent_stones ? accent_stones.diamond_certification + ' Certified Lab Diamond' : ""}
                                                </li>

                                                <li>
                                                    <span className='font-[700]'>No. of Diamonds :</span> {accent_stones ? accent_stones.diamond_count : 'N/A'}
                                                </li>
                                                <li>
                                                    <span className='font-[700]'>Diamond Shape :</span> {accent_stones ? accent_stones.diamond_shape : 'N/A'}
                                                </li>
                                                <li>
                                                    <span className='font-[700]'>Diamond Weight :</span> {accent_stones ? formatWeight(accent_stones.diamond_weight_ct) : 'N/A'}
                                                </li>
                                                <li>
                                                    <span className='font-[700]'>Diamond Color :</span> {accent_stones ? accent_stones.diamond_color_grade : 'N/A'}
                                                </li>

                                                <li>
                                                    <span className='font-[700]'>Diamond Clarity Grade :</span> {accent_stones ? accent_stones.diamond_clarity_grade : 'N/A'}
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            )}


                        <div className="space-y-4 border-t  border-t-primary  ">

                            <div
                                className="p-4 w-[80%] mx-auto max-md:w-[100%]  "

                            >
                                <div className="flex justify-between items-center  cursor-pointer" onClick={() => toggleFAQ(3)}>
                                    <span className="font-[700] text-[28px] text-[#D86A37] max-2xl:text-[23px] max-sm:text-[20px]">Care Instructions</span>
                                    <svg
                                        className={`transition-transform duration-300 ${openIndex === 3 ? "rotate-180" : "rotate-90"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="18"
                                        viewBox="0 0 31 19"
                                        fill="none"
                                    >
                                        <path d="M1.92578 17.2815L15.9338 2.573L29.9419 17.2815" stroke="#222222" strokeWidth="2.80161" />
                                    </svg>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all px-[14px] max-sm:px-0 duration-400 ${openIndex === 3 ? "max-h-screen mt-2 opacity-100" : "max-h-0 opacity-0"
                                        }`}


                                >
                                    <div className='mt-[20px]'>
                                        <p className="text-black1 text-[21px] max-sm:text-[15px]">   To keep your jewelry looking its best and to ensure its longevity, follow these care instructions:</p>
                                    </div>

                                    <ol className='mt-[26px] max-sm:mt-[5px] list-decimal ms-[21px] text-[21px]  max-sm:text-[15px]'>
                                        <li><span className='font-[600]'>Store Properly:</span> Keep your jewelry in a dry, cool place. Use a soft cloth or a jewelry box with compartments to prevent scratching and tangling.</li>
                                        <li><span className='font-[600]'>Avoid Chemicals :</span>  Remove jewelry before swimming, exercising, or engaging in activities that may cause it to get scratched or damaged.</li>
                                        <li><span className='font-[600]'>Clean Gently :</span> Clean your jewelry regularly using a soft cloth. For more thorough cleaning, use mild soap and warm water. Avoid abrasive materials that can scratch the surface.</li>
                                        <li><span className='font-[600]'> Check for Damage :</span>Regularly inspect your jewelry for any signs of wear or damage, such as loose stones or clasps. Address any issues promptly to avoid further damage.</li>
                                        <li><span className='font-[600]'>Width :</span>2.5 mm</li>
                                        <li><span className='font-[600]'>Avoid Moisture :</span>Keep jewelry away from moisture and humidity, which can cause tarnishing, especially with sterling silver.</li>

                                    </ol>
                                    <div className='mt-[18px]'>

                                        <span className='text-[21px] text-black1 max-sm:text-[15px]'>
                                            By following these simple care tips, you can keep your jewelry looking beautiful for years to come!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 border-t border-t-primary h-[100%]">
                            <div
                                className="p-4 w-[80%] mx-auto max-md:w-[100%] "

                            >
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleFAQ(4)}>
                                    <span className="font-[700] text-[28px] text-[#D86A37] max-2xl:text-[23px] max-sm:text-[20px]">
                                        Shipping and Return
                                    </span>
                                    <svg
                                        className={`transition-transform duration-300 ${openIndex === 4 ? "rotate-180" : "rotate-90"
                                            }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="18"
                                        viewBox="0 0 31 19"
                                        fill="none"
                                    >
                                        <path
                                            d="M1.92578 17.2815L15.9338 2.573L29.9419 17.2815"
                                            stroke="#222222"
                                            strokeWidth="2.80161"
                                        />
                                    </svg>
                                </div>

                                <div
                                    className={`overflow-hidden transition-all px-[14px] max-sm:px-0 duration-400 ${openIndex === 4 ? "max-h-screen mt-2 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <div className="mt-[20px] max-sm:mt-[5px]">
                                        <span
                                            className="text-[21px]  max-sm:text-[15px] font-semibold"
                                            style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
                                        >
                                            Shipping Policy:
                                        </span>
                                    </div>
                                    <ul className="mt-[26px] list-disc ms-[20px] text-[21px] text-black1 max-sm:text-[15px] max-sm:mt-[5px]">
                                        <li>
                                            <span className="font-[600]">Processing Time:</span> All orders are processed within 1-3 business days. You will receive a confirmation email once your order has shipped.
                                        </li>
                                        <li>
                                            <span className="font-[600]">Shipping Options:</span> We offer a variety of shipping methods, including standard, expedited, and express options. Shipping costs will be calculated at checkout based on your selected method.
                                        </li>
                                        <li>
                                            <span className="font-[600]">Domestic Shipping:</span> Free standard shipping on all orders. Typical delivery time is 3-7 business days.
                                        </li>
                                        <li>
                                            <span className="font-[600]">International Shipping:</span> We ship worldwide! International delivery times vary by destination. Please note that customs duties and taxes may apply.
                                        </li>
                                    </ul>

                                    <div className="mt-[20px]">
                                        <span
                                            className="text-[21px] font-semibold max-sm:text-[15px]"
                                            style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}
                                        >
                                            Return Policy:
                                        </span>
                                    </div>
                                    <ul className="mt-[26px] max-sm:mt-[10px] list-disc ms-[20px] text-[20px] text-black1 max-sm:text-[15px]">
                                        <li>
                                            <span className="font-[600]">30-Day Satisfaction Guarantee:</span> If you are not completely satisfied with your purchase, you may return it within 30 days of receipt for a full refund or exchange.
                                        </li>
                                        <li>
                                            <span className="font-[600]">Condition:</span> Items must be in their original condition, unworn, and include all packaging. Personalized or custom items are non-returnable.
                                        </li>
                                        <li>
                                            <span className="font-[600]">Return Process:</span> To initiate a return, please contact our customer service team at <a href="mailto:apricotjewels0@gmail.com" className="text-blue-600 underline">apricotjewels0@gmail.com</a> for a return authorization. We will provide instructions on how to return your item.
                                        </li>
                                        <li>
                                            <span className="font-[600]">Refunds:</span> Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Refunds will be processed to your original payment method within 5-10 business days.
                                        </li>
                                        <li>
                                            <span className="font-[600]">Exchanges:</span> If you would like to exchange an item, please follow the return process and place a new order for the desired item.
                                        </li>
                                    </ul>

                                    <div className="mt-[18px]">
                                        <span className="text-[21px] text-black1 max-sm:text-[15px]">
                                            For any further questions or assistance, feel free to contact our customer service team. We’re here to help!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <div className=''>
                        <h2>   <h2 className='relative font-[700] mb-[40px] text-primary text-[45px] max-sm:text-[36px] text-center
                                        before:absolute before:content-[""] before:w-[50%] before:h-[1px] before:left-0 before:right-0 before:mx-auto before:bottom-[-14px] before:bg-[#D86A3780]
                                        '> You May Also Like</h2>
                        </h2>


                        <section className='container slslsl'>
                            <div>
                                <div className=" gap-4   h-[auto]">
                                    <Slider {...settings}>
                                        <div>


                                            <Product image={Product_1}
                                                name="Rosy Refresh - Set of 2 Emerald Diamond Rose Gold Ring"
                                                price={599}
                                                originalPrice={699}
                                                discount={100} />
                                        </div>
                                        <div>


                                            <Product image={Product_1}
                                                name="Rosy Refresh - Set of 2 Emerald Diamond Rose Gold Ring"
                                                price={599}
                                                originalPrice={699}
                                                discount={100} />
                                        </div>
                                        <div>


                                            <Product image={Product_1}
                                                name="Rosy Refresh - Set of 2 Emerald Diamond Rose Gold Ring"
                                                price={599}
                                                originalPrice={699}
                                                discount={100} />
                                        </div>
                                        <div>


                                            <Product image={Product_1}
                                                name="Rosy Refresh - Set of 2 Emerald Diamond Rose Gold Ring"
                                                price={599}
                                                originalPrice={699}
                                                discount={100} />
                                        </div>
                                        <div>


                                            <Product image={Product_1}
                                                name="Rosy Refresh - Set of 2 Emerald Diamond Rose Gold Ring"
                                                price={599}
                                                originalPrice={699}
                                                discount={100} />
                                        </div>
                                        <div>


                                            <Product image={Product_1}
                                                name="Rosy Refresh - Set of 2 Emerald Diamond Rose Gold Ring"
                                                price={599}
                                                originalPrice={699}
                                                discount={100} />
                                        </div>
                                        <div>


                                            <Product image={Product_1}
                                                name="Rosy Refresh - Set of 2 Emerald Diamond Rose Gold Ring"
                                                price={599}
                                                originalPrice={699}
                                                discount={100} />
                                        </div>
                                    </Slider>
                                </div>


                            </div>


                        </section>






                    </div> */}

                    {/* <div className='mt-[50px]'>

                        <h2 className='relative font-[700] mb-[40px] text-primary text-[45px] max-sm:text-[36px] text-center
                                        before:absolute before:content-[""] before:w-[50%] before:h-[1px] before:left-0 before:right-0 before:mx-auto before:bottom-[-14px] before:bg-[#008FAB80] 
                                        '> Customer Reviews</h2>


                        <div className='w-[520px] max-sm:w-[100%] mx-auto'>
                            <div className="flex items-center max-sm:block">
                                
                                <div className="flex items-center max-sm:justify-between">
                                    <h3 className="text-[65.23px] me-3 font-medium text-primary">4.5</h3>
                                    <div>
                                        <div className="flex">
                                            {[...Array(4)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                    <path
                                                        d="M13.2999 0.165039L16.2289 9.17959H25.7073L18.0391 14.7509L20.9681 23.7654L13.2999 18.1941L5.63165 23.7654L8.56065 14.7509L0.892422 9.17959H10.3709L13.2999 0.165039Z"
                                                        fill="#D86A37"
                                                    />
                                                </svg>
                                            ))}
                                         
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                <defs>
                                                    <linearGradient id="halfStar">
                                                        <stop offset="50%" stopColor="#D86A37" />
                                                        <stop offset="50%" stopColor="#ddd" />
                                                    </linearGradient>
                                                </defs>
                                                <path
                                                    d="M13.2999 0.165039L16.2289 9.17959H25.7073L18.0391 14.7509L20.9681 23.7654L13.2999 18.1941L5.63165 23.7654L8.56065 14.7509L0.892422 9.17959H10.3709L13.2999 0.165039Z"
                                                    fill="url(#halfStar)"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-[15px] font-medium">Based on {totalReviews} reviews</p>
                                    </div>
                                </div>

                            
                                <div className="w-[1px] max-sm:hidden h-[130px] mx-[28px] bg-[#008FAB80]"></div>

                               
                                <div className='flex justify-center'>

                                    <div className="space-y-2 max-sm:w-full max-sm:mx-auto">
                                        {reviews.map((review, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <span className="text-primary  flex  leading-[100%] ">{review.stars}★</span>
                                                <div className="w-[150px] max-sm:w-[120px] max-sm:w-full h-[8px] bg-[#b3dce6] rounded-full relative">
                                                    <div
                                                        className="bg-primary h-full rounded-full"
                                                        style={{ width: `${(review.count / totalReviews) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-gray-700 w-[35px] text-[15px] text-primary leading-[100%] ">{review.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='flex  py-[12px] mt-[40px] border-t border-b border-[#008FAB80] items-center justify-end'>
                            <div>
                                <div className='flex items-center'>
                                    <span className='text-[26px]  max-sm:text-[20px] me-3'>Sort By:</span>
                                    <div className='relative'>


                                        <div className='flex gap-3 text-[26px] max-sm:text-[20px] items-center' onClick={() => setIsOpen1(!isOpen1)}>
                                            {selectedSize1} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                                                <path d="M9.04455 13.1964C8.54241 14.0662 7.28706 14.0662 6.78492 13.1964L0.570941 2.43349C0.0688007 1.56376 0.696477 0.476597 1.70076 0.476597L14.1287 0.476596C15.133 0.476596 15.7607 1.56376 15.2585 2.43349L9.04455 13.1964Z" fill="#D86A37" />
                                            </svg>
                                        </div>
                                        {isOpen1 && (
                                            <ul className="absolute w-full mt-1 bg-white border rounded-[12px] overflow-hidden shadow(0px_1px_4px_1px_#00000040) z-10">
                                                {sortby.map((size) => (
                                                    <li
                                                        key={size}
                                                        className="px-4 py-2 text-black hover:bg-primary hover:text-white cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedSize1(size);
                                                            setIsOpen1(false);
                                                        }}
                                                    >
                                                        {size}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='py-[40px] border-b border-[#008FAB80]'>
                            <div className='flex max-sm:gap-[30px] max-sm:flex-wrap' >
                                <div className='w-[30%] max-sm:w-full'>
                                    <h3 className='text-[32.61px] font-[200] max-sm:text-[24px]'><span className='font-[600]'>Michael T,</span> Canada</h3>
                                    <div className='flex items-center gap-3 leading-[100%] text-[15.66px] text-primary'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                            <circle cx="9.78448" cy="10.3055" r="9.13218" stroke="#D86A37" strokeWidth="1.3046" />
                                            <line x1="5.60911" y1="9.98596" x2="8.25661" y2="13.2368" stroke="#D86A37" strokeWidth="1.3046" strokeLinecap="round" />
                                            <line x1="8.35156" y1="13.4125" x2="14.3358" y2="7.42827" stroke="#D86A37" strokeWidth="1.3046" strokeLinecap="round" />
                                        </svg>
                                        Verified Buyer
                                    </div>
                                </div>
                                <div className='w-[70%] max-sm:w-full'>
                                    <div className='flex items-center w-[full] justify-between'>
                                        <div className='flex gap-[2px] items-center'>
                                            <div>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                    <path d="M12.9991 0.165039L15.9281 9.17959L25.4066 9.17959L17.7383 14.7509L20.6673 23.7654L12.9991 18.1941L5.33087 23.7654L8.25987 14.7509L0.59164 9.17959L10.0701 9.17959L12.9991 0.165039Z" fill="#D86A37" />
                                                </svg>
                                            </div>
                                            <div>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                    <path d="M12.9991 0.165039L15.9281 9.17959L25.4066 9.17959L17.7383 14.7509L20.6673 23.7654L12.9991 18.1941L5.33087 23.7654L8.25987 14.7509L0.59164 9.17959L10.0701 9.17959L12.9991 0.165039Z" fill="#D86A37" />
                                                </svg>
                                            </div>
                                            <div>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                    <path d="M12.9991 0.165039L15.9281 9.17959L25.4066 9.17959L17.7383 14.7509L20.6673 23.7654L12.9991 18.1941L5.33087 23.7654L8.25987 14.7509L0.59164 9.17959L10.0701 9.17959L12.9991 0.165039Z" fill="#D86A37" />
                                                </svg>
                                            </div>
                                            <div>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                    <path d="M12.9991 0.165039L15.9281 9.17959L25.4066 9.17959L17.7383 14.7509L20.6673 23.7654L12.9991 18.1941L5.33087 23.7654L8.25987 14.7509L0.59164 9.17959L10.0701 9.17959L12.9991 0.165039Z" fill="#D86A37" />
                                                </svg>
                                            </div>
                                            <div>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                                                    <path d="M12.9991 0.165039L15.9281 9.17959L25.4066 9.17959L17.7383 14.7509L20.6673 23.7654L12.9991 18.1941L5.33087 23.7654L8.25987 14.7509L0.59164 9.17959L10.0701 9.17959L12.9991 0.165039Z" fill="#D86A37" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='text-[19px] max-sm:text-[16px]'>03/05/24</div>
                                    </div>
                                    <p className='text-[19.57px] max-sm:text-[16px] italic mt-[14px] w-[75%] max-lg:w-[100%] '>“I am in love with the ring I bought from Lillian Jewelers! The quality is outstanding, and it arrived right on time. The detailed product descriptions and beautiful photos made it easy to choose. I’ll definitely be back for more!”</p>

                                    <div className='flex justify-end mt-[10px]'>
                                        <div className='flex items-center'>
                                            <span className='text-[19.57px] max-sm:text-[16px] pe-3 leading-[100%]'>Was this review helpful?</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-2' width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <rect width="19.569" height="19.569" transform="translate(0.988281 0.233887)" fill="white" />
                                                <path d="M12.4017 7.57236V4.31087C12.4017 3.66212 12.144 3.03994 11.6852 2.5812C11.2265 2.12246 10.6043 1.86475 9.95555 1.86475L6.69406 9.20311V18.1722H15.8915C16.2847 18.1767 16.6664 18.0388 16.9661 17.7841C17.2657 17.5294 17.4632 17.1749 17.5222 16.7861L18.6474 9.44772C18.6829 9.214 18.6671 8.97536 18.6012 8.74834C18.5353 8.52131 18.4208 8.31133 18.2657 8.13294C18.1106 7.95456 17.9186 7.81203 17.7029 7.71523C17.4872 7.61843 17.2531 7.56968 17.0167 7.57236H12.4017ZM6.69406 18.1722H4.24793C3.81543 18.1722 3.40065 18.0004 3.09482 17.6946C2.789 17.3888 2.61719 16.974 2.61719 16.5415V10.8339C2.61719 10.4014 2.789 9.98657 3.09482 9.68074C3.40065 9.37492 3.81543 9.20311 4.24793 9.20311H6.69406" fill="#222222" />
                                                <path d="M6.69406 9.20311L9.95555 1.86475C10.6043 1.86475 11.2265 2.12246 11.6852 2.5812C12.144 3.03994 12.4017 3.66212 12.4017 4.31087V7.57236H17.0167C17.2531 7.56968 17.4872 7.61843 17.7029 7.71523C17.9186 7.81203 18.1106 7.95456 18.2657 8.13294C18.4208 8.31133 18.5353 8.52131 18.6012 8.74834C18.6671 8.97536 18.6829 9.214 18.6474 9.44772L17.5222 16.7861C17.4632 17.1749 17.2657 17.5294 16.9661 17.7841C16.6664 18.0388 16.2847 18.1767 15.8915 18.1722H6.69406M6.69406 9.20311V18.1722M6.69406 9.20311H4.24793C3.81543 9.20311 3.40065 9.37492 3.09482 9.68074C2.789 9.98657 2.61719 10.4014 2.61719 10.8339V16.5415C2.61719 16.974 2.789 17.3888 3.09482 17.6946C3.40065 18.0004 3.81543 18.1722 4.24793 18.1722H6.69406" stroke="white" strokeWidth="1.3046" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className='text-[19px] max-sm:text-[16px] leading-[100%]'>8</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-2' width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                <path d="M12.412 8.72514L9.36794 15.0851C8.76244 15.0851 8.18174 14.8617 7.75358 14.4641C7.32543 14.0666 7.08489 13.5273 7.08489 12.9651V10.1385H2.77755C2.55692 10.1408 2.33839 10.0985 2.1371 10.0146C1.9358 9.93075 1.75656 9.80722 1.61178 9.65262C1.467 9.49802 1.36015 9.31604 1.29864 9.11928C1.23712 8.92253 1.22241 8.71571 1.25552 8.51315L2.30572 2.15323C2.36076 1.81622 2.54511 1.50904 2.8248 1.28828C3.1045 1.06752 3.46069 0.948062 3.82775 0.951916H12.412M12.412 8.72514V0.951916M12.412 8.72514H14.4439C14.8746 8.73222 15.2931 8.5922 15.62 8.33166C15.9469 8.07113 16.1593 7.70822 16.2171 7.31183V2.36523C16.1593 1.96884 15.9469 1.60593 15.62 1.3454C15.2931 1.08486 14.8746 0.944843 14.4439 0.951916H12.412" stroke="#1E1E1E" strokeWidth="1.3046" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className='text-[19px] max-sm:text-[16px] leading-[100%]'>8</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>







                    </div> */}





                </section>
            ) : (
                <div></div>
            )
            }

            {
                modal == 'modal1' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999999]">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 px-3">
                                <div className="relative transform overflow-hidden   rounded-[6px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full  sm:max-w-[1200px] z-40">
                                    <div className="bg-white  relative">
                                        <div className="flex sticky top-0 bg-primary items-center h-[60px] justify-between">
                                            <div className='w-[46px]'>

                                            </div>
                                            <h3 className="text-xl font-medium text-white text-center ">RING SIZE GUIDE</h3>
                                            <div onClick={closeModal} className='me-[26px]'>
                                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                                                    <path d="M0.17656 17.3238C0.23295 17.3803 0.299913 17.425 0.373622 17.4556C0.447331 17.4862 0.52634 17.5019 0.606131 17.5019C0.685922 17.5019 0.764931 17.4862 0.83864 17.4556C0.912349 17.425 0.979313 17.3803 1.0357 17.3238L8.4978 9.86171L15.9629 17.3238C16.0769 17.4377 16.2314 17.5017 16.3925 17.5017C16.5536 17.5017 16.7081 17.4377 16.8221 17.3238C16.936 17.2099 17 17.0554 17 16.8942C17 16.7331 16.936 16.5786 16.8221 16.4647L9.35694 9.00257L16.819 1.53744C16.933 1.42351 16.997 1.26899 16.997 1.10787C16.997 0.946751 16.933 0.79223 16.819 0.6783C16.7051 0.564371 16.5506 0.500366 16.3895 0.500366C16.2283 0.500366 16.0738 0.564371 15.9599 0.6783L8.4978 8.14343L1.03267 0.681336C0.916514 0.581866 0.767105 0.529889 0.614296 0.535791C0.461486 0.541694 0.316531 0.605041 0.208398 0.713174C0.100265 0.821307 0.0369174 0.966262 0.031015 1.11907C0.0251126 1.27188 0.0770899 1.42129 0.17656 1.53744L7.63865 9.00257L0.17656 16.4677C0.0634744 16.5815 0 16.7353 0 16.8958C0 17.0562 0.0634744 17.21 0.17656 17.3238Z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-2 max-lg:grid-cols-1'>

                                            <div className=' p-[20px] max-xl:border-b border-e border-[#B8B6B6]' >
                                                <div className='h-[40px] inline-flex items-center justify-center px-[20px]  bg-[#FDEEE6] text-[18px] font-[600] mb-[30px]'>
                                                    Option 1
                                                </div>

                                                <h3 className='text-[22px] max-sm:text-[18px] max-sm:mb-[10px] text-primary font-[700] mb-[20px]'>Measuring an existing ring</h3>





                                                <ol className='ms-[20px] list-decimal'>
                                                    <li>
                                                        <p className='text-[18px] max-sm:text-[16px] font-[600] text-[#707070] mb-[15px]'> Select and existing ring that fits the desired finger.</p>
                                                    </li>
                                                    <li>
                                                        <p className='text-[18px] font-[600] text-[#707070] mb-[15px]'> Make sure that the paper is pulled snug to your finger, the tighter the better, to find your best fit.</p>

                                                    </li>
                                                    <li>
                                                        <p className='text-[18px] max-sm:text-[16px] font-[600] text-[#707070] mb-[15px]'> Measure the internal diameter of the ring (in mm)</p>
                                                    </li>

                                                </ol>


                                                <img src={Ring_size} className='mt-[30px] mb-[40px]' alt="" />

                                                <table className='w-[550px] max-xl:w-full  border-collapse border border-black  '>
                                                    <thead className='bg-primary'>
                                                        <tr className='grid grid-cols-2  '>
                                                            <th className='text-center border border-black py-[6px] font-[700] text-white'>Ring Size</th>
                                                            <th className='text-center border border-black py-[6px] font-[700] text-white'>Internal Diameter(mm)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>9</td>
                                                            <td className='text-center py-[10px] border border-black'>15.6</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>10</td>
                                                            <td className='text-center py-[10px] border border-black'>15.9</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>11</td>
                                                            <td className='text-center py-[10px] border border-black'>16.2</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>12</td>
                                                            <td className='text-center py-[10px] border border-black'>16.5</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>13</td>
                                                            <td className='text-center py-[10px] border border-black'>16.8</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>14</td>
                                                            <td className='text-center py-[10px] border border-black'>17.2</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>15</td>
                                                            <td className='text-center py-[10px] border border-black'>17.5</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                            <div className=' p-[20px] border-e border-[#B8B6B6]' >
                                                <div className='h-[40px] inline-flex items-center justify-center px-[20px]  bg-[#FDEEE6] text-[18px] font-[600] mb-[30px]'>
                                                    Option 2
                                                </div>

                                                <h3 className='text-[22px] max-sm:text-[18px] text-primary font-[700] mb-[20px]'>Measure your finger</h3>
                                                <ol className='ms-[20px] list-decimal'>
                                                    <li>
                                                        <p className='text-[18px] max-sm:text-[16px] font-[600] text-[#707070] mb-[15px]'> Wrap a strip of paper around your finger where you'd like your ring to be.</p>

                                                    </li>
                                                    <li>
                                                        <p className='text-[18px] max-sm:text-[16px] font-[600] text-[#707070] mb-[15px]'> Make sure that the paper is pulled snug to your finger, the tighter the better, to find your best fit.</p>

                                                    </li>
                                                    <li>
                                                        <p className='text-[18px] max-sm:text-[16px] font-[600] text-[#707070] mb-[15px]'> Mark the spot where the paper meets and measure the distance with a ruler (mm).</p>

                                                    </li>
                                                    <li>
                                                        <p className='text-[18px] max-sm:text-[16px] font-[600] text-[#707070] mb-[15px]'>The measured distance(mm) is the circumference of your ring, please use the below chart to know your ring size</p>

                                                    </li>
                                                </ol>





                                                <table className='w-[550px] max-xl:w-full  border-collapse border mt-[75px] border-black  '>
                                                    <thead className='bg-primary'>
                                                        <tr className='grid grid-cols-2  '>
                                                            <th className='text-center border border-black py-[6px] font-[700] text-white'>Ring Size</th>
                                                            <th className='text-center border border-black py-[6px] font-[700] text-white'>Internal Diameter(mm)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>9</td>
                                                            <td className='text-center py-[10px] border border-black'>15.6</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>10</td>
                                                            <td className='text-center py-[10px] border border-black'>15.9</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>11</td>
                                                            <td className='text-center py-[10px] border border-black'>16.2</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>12</td>
                                                            <td className='text-center py-[10px] border border-black'>16.5</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>13</td>
                                                            <td className='text-center py-[10px] border border-black'>16.8</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>14</td>
                                                            <td className='text-center py-[10px] border border-black'>17.2</td>
                                                        </tr>
                                                        <tr className='grid grid-cols-2 '>
                                                            <td className='text-center py-[10px] border border-black'>15</td>
                                                            <td className='text-center py-[10px] border border-black'>17.5</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <Footer />

            {
                modal === 'modal2' && (
                    <div className="fixed inset-0 flex justify-end items-start  bg-black bg-opacity-50 z-[9999]">

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                            <div className="flex min-h-full items-start justify-end me-3 max-sm:me-0 max-sm:w-full  text-center  sm:p-0">
                                <div className="relative transform overflow-hidden max-sm:w-full   bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-xl z-40">
                                    <div className="bg-white ">
                                        <div className="flex px-5 py-2 border-b-2  border-[#cdd7db] items-center justify-between">
                                            <h3 className="text-md font-bold text-gray">PRICE BREAKUP</h3>
                                            <div onClick={closeModal}>
                                                <svg className="closeModal cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.15128 0.751862C1.61991 0.283233 2.3797 0.283233 2.84833 0.751862L7.9998 5.90333L13.1513 0.751862C13.6199 0.283233 14.3797 0.283233 14.8483 0.751862C15.317 1.22049 15.317 1.98029 14.8483 2.44892L9.69686 7.60039L14.8483 12.7519C15.317 13.2205 15.317 13.9803 14.8483 14.4489C14.3797 14.9175 13.6199 14.9175 13.1513 14.4489L7.9998 9.29745L2.84833 14.4489C2.3797 14.9175 1.61991 14.9175 1.15128 14.4489C0.682647 13.9803 0.682647 13.2205 1.15128 12.7519L6.30275 7.60039L1.15128 2.44892C0.682647 1.98029 0.682647 1.22049 1.15128 0.751862Z" fill="#495567" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className='pt-[20px] px-5 max-sm:px-0'>
                                            <h3 className="mb-[15px] text-center font-bold">{metal?.find((val) => val.metal_id == activeIndex)?.metal_type} PRICE BREAKUP</h3>
                                            <table className='w-full'>
                                                <thead className=''>
                                                    <tr className='h-[30px]'>
                                                        <th className='text-center w-[190px] max-sm:w-[130px] max-sm:text-xs text-sm font-medium'>COMPONENT</th>
                                                        <th className='text-center text-sm max-sm:text-xs font-medium'>WEIGHT</th>
                                                        <th className='text-center w-[150px] max-sm:w-[120px] text-sm max-sm:text-xs font-medium'>FINAL VALUE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='h-[34px]'>
                                                        <td className='text-center w-[190px] max-sm:w-[130px] text-sm font-thin'>{metal?.find((val) => val.metal_id == activeIndex)?.metal_purity + ' ' + metal?.find((val) => val.metal_id == activeIndex)?.metal_type + ' ' + metal?.find((val) => val.metal_id == activeIndex)?.metal_color}</td>
                                                        <td className='text-center text-sm  font-thin'>{metal?.find((val) => val.metal_id == activeIndex)?.metal_weight_g}</td>
                                                        <td className='text-center text-sm  w-[150px] max-sm:w-[120px] font-thin'>₹{parseInt(metal?.find((val) => val.metal_id == activeIndex)?.metal_price)}</td>
                                                    </tr>
                                                    <tr className='h-[34px]'>
                                                        <td className='text-center w-[190px] max-sm:w-[130px] text-sm font-bold '>Total {metal?.find((val) => val.metal_id == activeIndex)?.metal_type} Value</td>
                                                        <td className='text-center  text-sm font-bold'>-</td>
                                                        <td className='text-center text-sm  w-[150px] max-sm:w-[120px] font-bold'>₹{parseInt(metal?.find((val) => val.metal_id == activeIndex)?.metal_price)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='pt-[20px] px-5 max-sm:px-0 border-t-2  border-[#cdd7db]'>
                                            <h3 className="mb-[15px] text-center font-bold">DIAMOND PRICE BREAKUP</h3>
                                            <table className='w-full'>
                                                <thead className=''>
                                                    <tr className='h-[30px]'>
                                                        <th className='text-center px-1 w-[190px] max-sm:text-xs max-sm:w-[130px] text-sm font-medium'>COMPONENT</th>
                                                        <th className='text-center px-1 text-sm max-sm:text-xs font-medium'>QUALITY</th>
                                                        <th className='text-center px-1 text-sm max-sm:text-xs font-medium'>WEIGHT</th>
                                                        <th className='text-center px-1 w-[150px] max-sm:w-[120px] max-sm:text-xs text-sm font-medium'>FINAL VALUE
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='h-[34px]'>
                                                        <td className='text-center max-sm:text-sm w-[190px] max-sm:w-[130px] font-thin'>{diamond?.find((val) => val.diamond_id)?.component}</td>
                                                        <td className='text-center max-sm:text-sm font-thin'>{diamond?.find((val) => val.diamond_id)?.diamond_clarity_grade}</td>
                                                        <td className='text-center max-sm:text-sm font-thin'>{diamond?.find((val) => val.diamond_id)?.diamond_weight_ct}</td>
                                                        <td className='text-center max-sm:text-sm w-[150px] max-sm:w-[120px] font-thin'>₹{parseInt(diamond?.find((val) => val.diamond_id)?.all_total_diamond_price)}</td>
                                                    </tr>
                                                    <tr className='h-[34px]'>
                                                        <td className='text-center max-sm:text-sm w-[190px] max-sm:w-[130px] font-bold '>Total Diamond Value
                                                        </td>
                                                        <td className='text-center max-sm:text-sm font-bold'>-</td>
                                                        <td className='text-center max-sm:text-sm font-bold'>-</td>
                                                        <td className='text-center max-sm:text-sm w-[150px] max-sm:w-[120px] font-bold'>₹{parseInt(diamond?.find((val) => val.diamond_id)?.all_total_diamond_price)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='py-[3px] px-5 max-sm:px-0 border-t-2  border-[#cdd7db]'>

                                            <table className='w-full'>

                                                <tbody>

                                                    <tr className='h-[34px]'>
                                                        <td className='text-center w-[190px] max-sm:w-[130px] max-sm:text-sm font-bold '>Making Charges

                                                        </td>
                                                        <td className='text-center font-bold'>-</td>
                                                        <td className='text-center font-bold'>-</td>
                                                        <td className='text-center w-[150px] max-sm:text-sm max-sm:w-[120px] font-bold'>₹{parseInt(products?.product?.making_charges)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='py-[10px] px-5 max-sm:px-0 border-t-2  border-[#cdd7db]'>

                                            <table className='w-full'>

                                                <tbody>
                                                    <tr className='h-[34px]'>
                                                        <td className='text-center max-sm:text-sm w-[190px] max-sm:w-[130px] font-thin'>Subtotal</td>
                                                        <td className='text-center max-sm:text-sm font-thin'>-</td>
                                                        <td className='text-center max-sm:text-sm font-thin'>-</td>
                                                        <td className='text-center max-sm:text-sm w-[150px] max-sm:w-[120px] font-thin'>₹{subtotal}
                                                        </td>
                                                    </tr>
                                                    <tr className='h-[34px]'>
                                                        <td className='text-center max-sm:text-sm w-[190px] max-sm:w-[130px] font-thin'>GST</td>
                                                        <td className='text-center max-sm:text-sm font-thin'>-</td>
                                                        <td className='text-center max-sm:text-sm font-thin'>-</td>
                                                        <td className='text-center max-sm:text-sm w-[150px] max-sm:w-[120px] font-thin'>{products?.product?.gst}%</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='py-[3px] px-5 max-sm:px-0 border-t-2  border-[#cdd7db]'>

                                            <table className='w-full'>

                                                <tbody>

                                                    <tr className='h-[34px]'>
                                                        <td className='text-center max-sm:text-sm w-[190px] max-sm:w-[130px] font-bold '>Grand Total


                                                        </td>
                                                        <td className='text-center max-sm:text-sm font-bold'>-</td>
                                                        <td className='text-center max-sm:text-sm font-bold'>-</td>
                                                        <td className='text-center max-sm:text-sm w-[150px] max-sm:w-[120px] font-bold'>₹{parseInt(total)}

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


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
                                <div className="relative transform overflow-hidden p-[30px] max-sm:px-[20px]  rounded-[6px] max-sm:max-w-[100%]  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[752px] z-40">
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



        </div >
    )
}

export default Product_details
