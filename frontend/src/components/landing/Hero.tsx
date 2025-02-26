import { motion } from "motion/react";
import { aRule, background, logo } from "../../constants";

export default function Hero() {
  return (
    <div className="flex items-center justify-end h-screen flex-col">
      <video
        autoPlay
        muted
        loop
        src={background}
        className="absolute -z-10 h-screen w-screen object-cover"
      ></video>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <img
          className="w-[600px] logo z-10 mb-24"
          src={logo}
          alt=""
        />
      </motion.div>

      <a
        href=" "
        className="group relative -top-20 flex max-w-[calc(100%-20px)] flex-col items-center rounded-md border-2 border-[#b69451] bg-become-the-best bg-cover px-12 py-4 text-[#f1ce89] transition duration-300 hover:text-white md:max-w-96"
      >
        <h2 className="text-center uppercase text-[#b69451] duration-300 group-hover:text-white">
          {" "}
          Play, Collect, Trade, now !{" "}
        </h2>
        <img height={25} width={300} src={aRule} alt="" />
        <h1 className="text-center text-3xl uppercase leading-7">
          become the best collector
        </h1>
        <p className="uppercase text-[#b69451] duration-300 group-hover:text-white">
          {" "}
          Let's get started{" "}
        </p>
      </a>
    </div>
  );
}
