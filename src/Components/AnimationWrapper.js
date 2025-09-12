// app/Components/Animations/AnimationWrapper.js
"use client";

import React from "react";
import { motion } from "framer-motion";

// 🔹 Parent container controls stagger timing (top → bottom sequencing)
const containerVariants = (stagger = 0.12) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger, // delay between children
    },
  },
});

// 🔹 Zoom animation (on page load)
const zoomChild = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// 🔹 Slide animation (direction-aware or simple upward)
const slideChild = (direction = "up") => {
  switch (direction) {
    case "left":
      return {
        hidden: { x: -40, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };
    case "right":
      return {
        hidden: { x: 40, opacity: 0 },
        visible: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };
    default: // upward
      return {
        hidden: { y: 40, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };
  }
};

// 🔹 Zoom wrapper (apply zoom-in on load to all children)
export const ZoomInOnLoad = ({ children, className = "", ...rest }) => (
  <motion.div
    className={className}
    variants={containerVariants(0.15)}
    initial="hidden"
    animate="visible"
    {...rest}
  >
    {React.Children.map(children, (child, index) => (
      <motion.div key={index} variants={zoomChild}>
        {child}
      </motion.div>
    ))}
  </motion.div>
);

// 🔹 Slide wrapper (applies stagger + upward reveal; can alternate L/R if needed)
export const SlideUpOnScroll = ({
  children,
  className = "",
  directionMode = "alternate", // "alternate" | "up"
  ...rest
}) => (
  <motion.div
    className={className}
    variants={containerVariants(0.12)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    {...rest}
  >
    {React.Children.map(children, (child, index) => {
      let direction = "up";
      if (directionMode === "alternate") {
        direction = index % 2 === 0 ? "left" : "right";
      }
      return (
        <motion.div key={index} variants={slideChild(direction)}>
          {child}
        </motion.div>
      );
    })}
  </motion.div>
);
