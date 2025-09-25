"use client";
import React from "react";
import { navItems } from "../utils/items";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    return (
        <div className="bg-navColor w-[200px] h-screen fixed top-0 left-0 p-4 hidden md:flex flex-col items-center gap-6 pt-10">
            {navItems.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-row gap-2 items-center mr-auto cursor-pointer"
                >
                    <Image
                        src={item.icon}
                        alt={item.label}
                        width={30}
                        height={30}
                        className="filter-white  hover:opacity-80 transition-opacity duration-200"
                        onClick={() => {
                            if (item.path) {
                                router.push(item.path);
                            }
                        }}
                    />
                    <label
                        onClick={() => {
                            if (item.path) {
                                router.push(item.path);
                            }
                        }}
                        className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    >
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Nav;
