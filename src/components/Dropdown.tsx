import React, { Fragment } from "react";
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

interface DropdownInterface {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  size?: "sm" | "md" | "lg";
}

export const Dropdown = ({
  value,
  setValue,
  options,
  size = "sm",
}: DropdownInterface) => {
  let width = "w-24";

  switch (size) {
    case "sm":
      width = "w-24";
      break;
    case "md":
      width = "w-40";
      break;
    case "lg":
      width = "w-72";
      break;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className={width}>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <p className="truncate">{value}</p>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right max-h-60 overflow-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => {
              return (
                <Menu.Item key={option}>
                  {({ active }) => (
                    <p
                      onClick={() => {
                        setValue(option);
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {option}
                    </p>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
