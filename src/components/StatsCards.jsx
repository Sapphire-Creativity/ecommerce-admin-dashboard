import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiPackage, FiUsers } from "react-icons/fi";
import { useTheme, useMediaQuery } from "@mui/material";

const StatsCards = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const cardData = [
    {
      title: "Total Orders",
      value: "1,245",
      change: "+12% from last month",
      icon: <FiShoppingCart size={24} />,
      bgColor: "#ff7a00",
      textColor: "white",
    },
    {
      title: "Total Products",
      value: "845",
      change: "+5% from last month",
      icon: <FiPackage size={24} />,
      bgColor: " #ffead6",
      textColor: "#000000",
    },
    {
      title: "Total Customers",
      value: "1,892",
      change: "+18% from last month",
      icon: <FiUsers size={24} />,
      bgColor: "#fff4eb",
      textColor: "#000000",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = scrollWidth / cardData.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / cardData.length;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Desktop Grid View (3 cards) */}
      {isLargeScreen ? (
        <div className="grid grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
            >
              <div
                className="rounded-xl shadow-lg overflow-hidden h-48"
                style={{
                  backgroundColor: card.bgColor,
                  color: card.textColor,
                }}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium opacity-80">
                        {card.title}
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                      <p className="text-xs mt-2 opacity-80">{card.change}</p>
                    </div>
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${card.bgColor}20` }}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div
                      className="h-1 w-full bg-opacity-30 rounded-full"
                      style={{ backgroundColor: `${card.textColor}30` }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: card.textColor }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Mobile/Tablet Carousel View */
        <>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {cardData.map((card, index) => (
              <motion.div
                key={card.title}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                className="flex-shrink-0 w-full snap-start px-2"
              >
                <div
                  className="rounded-xl shadow-lg overflow-hidden h-48"
                  style={{
                    backgroundColor: card.bgColor,
                    color: card.textColor,
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium opacity-80">
                          {card.title}
                        </p>
                        <h3 className="text-2xl font-bold mt-1">
                          {card.value}
                        </h3>
                        <p className="text-xs mt-2 opacity-80">{card.change}</p>
                      </div>
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${card.bgColor}20` }}
                      >
                        {card.icon}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div
                        className="h-1 w-full bg-opacity-30 rounded-full"
                        style={{ backgroundColor: `${card.textColor}30` }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "70%" }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: card.textColor }}
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {cardData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-1 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#ff7a00] scale-125"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StatsCards;
