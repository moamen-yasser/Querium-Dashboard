import { Tabs } from "@mantine/core";

export default function SharedTabs({
    tabValue, 
    onChange, 
    tabValues, 
    orientation, 
    defaultValue, 
    variant, 
    showLabels 
}) {
return (
    <div className="h-72 w-full mt-8 ">
        <Tabs
            value={tabValue}
            onChange={onChange}
            orientation={orientation}
            defaultValue={defaultValue}
            variant={variant}
        >
            <Tabs.List className="!flex !flex-col !items-start !gap-4">
                {tabValues?.map((tab) => (
                    <Tabs.Tab
                        key={tab?.id}
                        value={tab?.value}
                        className={`!flex !justify-start !items-center 
                            ${!showLabels ? "!min-w-[20px] !py-2 " : "!min-w-[200px] !py-3 " }  
                                !rounded-lg !transition-all 
                                !duration-300 !cursor-pointer !font-medium !text-lg 
                            ${tabValue === tab?.value
                            ? "!bg-white !text-textSecondColor !font-bold !text-xl"
                            : "!text-textColor hover:!bg-hoverColor"
                        }`}
                    >
                        <div className={`w-full gap-3 flex ${!showLabels ? "justify-start" : "justify-between"} items-center`}>
                            {tab?.icon}
                            {showLabels && tab?.label } 
                        </div>
                    </Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    </div>
);
}
