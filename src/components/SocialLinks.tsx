"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import TwitterIcon from "../../public/twitter.svg";
import BehanceIcon from "../../public/behance.svg";
import LinkedinIcon from "../../public/linkedin.svg";
import InstagramIcon from "../../public/instagram.svg";
import DribbbleIcon from "../../public/dribble.svg";

export function SocialLinks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Create pull-from-below effect
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "100%", // Start fully below
      "0%", // Come into view
      "0%", // Slightly move up as scrolling continues
    ]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      0.8, // Start smaller
      1, // Normal size when in view
      1.1, // Slightly larger as it moves up
    ]
  );

  const shake = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.3, 0.4],
    [
      -5,
      5,
      -5,
      5,
      0, // Rapid oscillation for shake
    ]
  );

  return (
    <motion.div
      // ref={ref}

      className="flex flex-col items-center sticky top-0 py-48 font-bold bg-[#1C1C1C] justify-center space-y-8"
    >
      <motion.div
        transition={{
          type: "spring",
        }}
        ref={ref}
        style={{
          y,
          scale,
          rotate: shake, // Apply shake effect

          transformOrigin: "center bottom",
        }}
        className="text-center space-y-4 w-[80%] lg:w-[60%] 2xl:w-[40%] mx-auto"
      >
        <h2 className="text-2xl md:text-4xl text-[#D0D5FF] flex flex-wrap justify-center items-center gap-2">
          FIND ME ON{" "}
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={TwitterIcon} width={50} height={50} alt="Twitter" />
          </Link>{" "}
          FOR QUICK THOUGHTS AND{" "}
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={LinkedinIcon} width={50} height={50} alt="LinkedIn" />
          </Link>{" "}
          FOR PROFESSIONAL UPDATES.
        </h2>
        <p className="text-2xl md:text-4xl mx-auto text-[#D0D5FF] flex flex-wrap justify-center items-center gap-2">
          DESK SETUPS ON{" "}
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={InstagramIcon} width={50} height={50} alt="Instagram" />
          </Link>
        </p>
        <p className="text-2xl md:text-4xl mx-auto text-[#D0D5FF] flex flex-wrap justify-center items-center gap-2">
          CHECK OUT MY CREATIVE SHOWCASE ON{" "}
          <Link
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={BehanceIcon} width={50} height={50} alt="Behance" />
          </Link>{" "}
          AND{" "}
          <Link
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={DribbbleIcon} width={50} height={50} alt="Dribbble" />
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
