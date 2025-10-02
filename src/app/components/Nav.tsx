"use client";
import React, { useState } from "react";
import { navItems } from "../utils/items";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    const [showNav, setShowNav] = useState(false);
    return (
        <div
            className={`bg-navColor h-screen fixed top-0 left-0 justify-center flex transition-all duration-200 ease-in-out z-50
                ${showNav ? "w-[200px]" : "w-[100px]"}
            `}
            onMouseEnter={() => setShowNav(true)}
            onMouseLeave={() => setShowNav(false)}
        >
            <div className="hidden md:flex flex-col items-center gap-6 mt-20 ">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-row gap-2 items-center mr-auto cursor-pointer hover-nav-item"
                        onClick={() => {
                            if (item.path) {
                                router.push(item.path);
                            }
                        }}
                    >
                        <span className="flex justify-center items-center min-w-[40px]">
                            <Image
                                src={item.icon}
                                alt={item.label}
                                width={30}
                                height={30}
                                className="filter-white  hover:opacity-80 transition-opacity duration-200"
                            />
                        </span>
                        {showNav && (
                            <span
                                className={`overflow-hidden transition-all duration-300
            ${showNav ? "w-auto opacity-100 ml-2" : "w-0 opacity-0 ml-0"}
        `}
                            >
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Nav;
