"use client";
import React from "react";
import { navItems } from "../utils/items";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    return (
        <div className="bg-navColor w-[200px] h-screen p-4 hidden md:flex flex-col items-center gap-6 pt-10">
            {navItems.map((item, index) => (
                <div key={index}>
                    <Image
                        src={item.icon}
                        alt={item.label}
                        width={30}
                        height={30}
                        className="filter-white cursor-pointer hover:opacity-80 transition-opacity duration-200"
                        onClick={() => {
                            if (item.path) {
                                router.push(item.path);
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Nav;
