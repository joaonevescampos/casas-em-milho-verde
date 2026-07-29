"use client";
import * as React from "react";
import { IoIosClose, IoIosMenu } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DefaultButton from "../Button";
import { NavLink } from "react-router-dom";

const nav = [
  { name: "INÍCIO", path: "/" },
  { name: "ALUGUÉIS TEMPORADA", path: "/alugueis-temporada" },
  { name: "VENDA DE IMÓVEIS", path: "/venda" },
];

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={true}
      swipeDirection="down"
    >
      <DrawerTrigger
        render={
          <Button variant="ghost">
            <IoIosMenu />
          </Button>
        }
      />
      <DrawerContent className="h-screen bg-linear-180 from-white to-secondary2/70 backdrop-blur-2xl">
        <DrawerHeader className="flex flex-row justify-between">
          <div className="flex flex-col items-start">
            <span className="font-cormorant font-semibold text-xl pb-1">
              Matias Hansen
            </span>
            <span className="font-montserrat text-xs text-secondary5">
              CORRETOR DE IMÓVEIS . CRECI - 12345
            </span>
          </div>
          <DrawerClose
            className="top-0 border-none"
            render={
              <Button variant="outline" className="opacity-50">
                <IoIosClose />
              </Button>
            }
          />
        </DrawerHeader>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <nav className="flex flex-col gap-4 text-xs items-center justify-center h-fit w-full">
            {nav.map((item, i) => (
              <NavLink
                onClick={() => setOpen(false)}
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "w-full py-8 bg-white border-b-2 font-semibold h-full flex items-center justify-center px-4"
                    : "w-full py-8 opacity-70 h-full flex items-center justify-center px-4 hover:bg-white hover:border-b-2 hover:border-primary1 hover:font-semibold transition-all duration-500"
                }
              >
                <span className="text-center h-full">{item.name}</span>
              </NavLink>
            ))}
          </nav>
          <DefaultButton text="WHAT'S APP" path="" style="mt-8!" />
        </div>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
