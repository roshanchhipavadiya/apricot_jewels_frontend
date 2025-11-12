import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// All lazy hooks
import {
    useLazyGetAppoinmentQuery,
    useLazyGetCategoriesQuery,
    useLazyGetContactQuery,
    useLazyGetDiamondQuery,
    useLazyGetMetalQuery,
    useLazyGetOrderQuery,
    useLazyGetProdctMediaQuery,
    useLazyGetProductQuery,
    useLazyGetSubCategoriesQuery,
    useLazyGetTop_productQuery,
    useLazyGetUserQuery,
} from "../services/apiSlice";

NProgress.configure({ showSpinner: false });

const apiMap = {
    getCategories: useLazyGetCategoriesQuery,
    getSubCategories: useLazyGetSubCategoriesQuery,
    getProduct: useLazyGetProductQuery,
    getUser: useLazyGetUserQuery,
    getOrder: useLazyGetOrderQuery,
    getAppoinment: useLazyGetAppoinmentQuery,
    getContact: useLazyGetContactQuery,
    getTop_product: useLazyGetTop_productQuery,
    getDiamond: useLazyGetDiamondQuery,
    getMetal: useLazyGetMetalQuery,
    getProdctMedia: useLazyGetProdctMediaQuery,
}

function MyLink({ to, apiName, className, active, children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const useLazyQuery = apiMap[apiName];
    const [trigger] = useLazyQuery ? useLazyQuery() : [() => Promise.resolve()];

    const handleClick = async (e) => {
        e.preventDefault();
        if (loading || !useLazyQuery) return;

        setLoading(true);
        NProgress.start();

        try {
            const data = await trigger({});
            if (data) {
                NProgress.done();
                setLoading(false);
                navigate(to);
            } else {
                throw new Error("No data");
            }
        } catch (err) {
         
            NProgress.done();
            setLoading(false);
            alert(
                err?.data?.detail ||
                err?.error ||
                err?.message ||
                "Failed to load data. Please try again."
            );
        }
    };

    return (
        <a
            href={to}
            onClick={handleClick}
            className={` admin-li ${className} ${active ? "active" : ""}`}
            style={{ pointerEvents: loading ? "none" : "auto" }}
        >
            {children}
        </a>
    );
}

export default MyLink;
