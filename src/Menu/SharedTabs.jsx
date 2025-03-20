import { Tabs } from "@mantine/core";
import React from "react";

export default function SharedTabs({
tabValue,
onChange,
tabValues,
defaultValue,
color = "white",
variant = "filled",
}) {
return (
    <div className="h-72 w-full mt-8 ">
        <Tabs
            orientation="vertical"
            color={color}
            variant={variant}
            radius="sm"
            value={tabValue}
            onChange={onChange}
            defaultValue={defaultValue}
            className="!flex-1"
        >
            <Tabs.List className="!flex !flex-col !gap-4 !p-4">
                {tabValues?.map((tab) => (
                    <Tabs.Tab
                        key={tab?.id}
                        value={tab?.value}
                        className={`!flex !justify-start !items-center !px-4 !py-3 !rounded-lg !transition-all !duration-300 !cursor-pointer !font-medium !text-lg ${
                            tabValue === tab?.value
                            ? "!bg-white !text-textSecondColor !font-bold !text-xl"
                            : "!text-textColor hover:!bg-hoverColor"
                        }`}
                        >
                        <div className='w-full gap-8 flex justify-between items-center'>
                            <span className="!text-3xl ">{tab?.icon}</span>
                            {tab?.label} 
                        </div>
                    </Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    </div>
);
}
