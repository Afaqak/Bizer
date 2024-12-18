"use client";

import React, { useEffect } from "react";
import { ChevronRight, Snowflake } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

type SliderItem = {
  key: string;
  icon?: React.ReactNode;
  title: string;
  value: string;
};

const sliderItems: SliderItem[] = [
  {
    key: "snowflake1",
    icon: <Snowflake className="text-[#82FF1F]" />,
    title: "",
    value: "",
  },
  {
    key: "experience",
    icon: <ChevronRight />,
    title: "years of experience",
    value: "2+",
  },
  {
    key: "snowflake2",
    icon: <Snowflake className="text-[#82FF1F]" />,
    title: "",
    value: "",
  },
  {
    key: "projects",
    icon: <ChevronRight />,
    title: "projects completed",
    value: "15",
  },
  {
    key: "snowflake3",
    icon: <Snowflake className="text-[#82FF1F]" />,
    title: "",
    value: "",
  },
  {
    key: "team",
    icon: <ChevronRight />,
    title: "modern technologies utilized",
    value: "10+",
  },

  
  // { key: "", icon: <ChevronRight />, title: "projects", value: "14" },
];

export const InfiniteSlider: React.FC<{ rotate?: number }> = ({
  rotate = 6,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [
      AutoPlay({
        delay: 1400,
        stopOnInteraction: true,
      }),
    ]
  );

  useEffect(() => {
    if (emblaApi) {
      console.log("Embla API:", emblaApi);
    }
  }, [emblaApi]);

  const renderSliderItem = (item: SliderItem, index: number) => {
    if (item.title && item.value) {
      return (
        <div className="embla__slide flex items-center whitespace-nowrap px-5">
          <span className="text-[#82FF1F] flex items-center">
            {item.icon} {item.value} /
          </span>
          {item.title}
        </div>
      );
    }
    return <div className="embla__slide px-5">{item.icon}</div>;
  };

  return (
    <div className="py-24 bg-[#1C1C1C] w-full relative">
      <div
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
        className="embla overflow-hidden bg-black h-14 flex items-center transform mx-auto"
      >
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {[
              ...sliderItems,
              ...sliderItems,
              ...sliderItems,
              ...sliderItems,
            ].map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className="embla__slide flex-shrink-0 flex-grow-0 text-2xl flex items-center justify-center text-white"
              >
                {renderSliderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};