"use client";

import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { useMemo } from "react";
import { ChevronRight, Menu, Clipboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const slogans = useMemo(
    () => [
      "იცხოვრე შენი მეორე ცხოვრება აქ",
      "თქვენი ისტორია იწყება აქ",
      "შექმენი შენი გზა სან ანდრეასში",
      "აღმოაჩინე ახალი ცხოვრება აქ",
      "შენი თავგადასავალი იწყება ახლა",
      "გახდი ლეგენდა სან ანდრეასში",
      "შენი შესაძლებლობები უსასრულოა",
      "გაიკვალე შენი გზა",
      "ჩართე თამაში, შექმენი ისტორია",
      "შენი წესები, შენი თამაში",
      "დაიწყე შენი თავგადასავალი აქ",
    ],
    []
  ); // Use useMemo to memoize the slogans array
  const [copyMessage, setCopyMessage] = useState("");

  const copyIPToClipboard = () => {
    navigator.clipboard
      .writeText("85.117.36.229:1113") // Use the IP address here
      .then(() => {
        setCopyMessage("მისამართი კოპირებულია");
        setTimeout(() => setCopyMessage(""), 2000); // Clear message after 2 seconds
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const [displayedText, setDisplayedText] = useState("");
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    const animateText = async () => {
      const currentSlogan = slogans[currentSloganIndex];

      // Typing animation
      if (isTyping) {
        if (displayedText.length < currentSlogan.length) {
          timeout = setTimeout(() => {
            setDisplayedText(currentSlogan.slice(0, displayedText.length + 1));
          }, 0.5);
        } else {
          timeout = setTimeout(() => {
            setIsTyping(false);
          }, 4000);
        }
      }
      // Deleting animation
      else {
        if (displayedText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, 30);
        } else {
          setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
          setIsTyping(true);
        }
      }
    };

    timeout = setTimeout(animateText, 50);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [displayedText, isTyping, currentSloganIndex, slogans]);

  return (
    <div
      className="bg-cover bg-top bg-no-repeat bg-gray-900 text-white"
      style={{
        minHeight: "110vh",
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.88) 80%, rgba(0,0,0,1) 100%), url('/image.png')",
      }}
    >
      <header className="container mx-auto px-4 py-4 flex justify-between items-center sticky top-0 z-50 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo can go here */}
        </motion.div>
        <nav className="hidden md:flex space-x-6">
          {["მთავარი", "დონაცია"].map((item, index) => (
            <motion.a
              key={item}
              href={item === "დონაცია" ? "/" : "#"}
              className={`${
                index === 0
                  ? "text-yellow-500 flex items-center justify-center align-center"
                  : "text-gray-300 hover:text-white"
              } extrasquare-font`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-zinc-900 bg-opacity-80 backdrop-blur z-40"
          >
            <nav className="flex flex-col items-center justify-center h-full">
              {["მთავარი", "დონაცია"].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === "დონაცია" ? "/" : "#"} // Update here for donation page
                  className={`${
                    index === 0
                      ? "text-yellow-500"
                      : "text-gray-300 hover:text-white"
                  } extrasquare-font py-4 text-xl`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-3xl px-4 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 diploma-font text-center md:text-left">
            Dark City Roleplay
          </h1>
          <div className="h-16">
            <p className="text-lg md:text-xl mb-8 extrasquare-font tracking-tight text-center md:text-left text-[14.5px]">
              {displayedText}
              <span className="inline-block w-0.5 h-4 translate-y-1 bg-white ml-1 animate-pulse"></span>
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-16">
            <motion.button
              className="bg-transparent border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition duration-300 extrasquare-font flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="w-5 h-5 mr-2" /> {/* Add the icon here */}
              ლაუნჩერის ჩაწერა
            </motion.button>

            <a
              href="https://discord.gg/darkcityrp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="bg-yellow-500 text-gray-900 text-[15px] tracking-tight px-6 py-4 rounded-full hover:bg-yellow-600 transition duration-300 flex items-center justify-center extrasquare-font"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                შემოგვიერთდი Discord-ზე
                <ChevronRight className="ml-2" />
              </motion.button>
            </a>
          </div>

          <motion.div className="flex flex-col items-center md:items-start relative">
            <div className="flex items-center">
              <p className="text-sm extrasquare-font md:text-left">
                85.117.36.229:1113
              </p>
              <button
                onClick={copyIPToClipboard}
                className="ml-2 bg-zinc-800 bg-opacity-70 text-gray-900 p-2 rounded-[10px] hover:bg-zinc-700 transition duration-300 flex items-center"
              >
                <Clipboard className="h-4 w-4 invert" />
                {/* Clipboard icon */}
              </button>
            </div>
            <p className="text-sm font-bold text-green-400 extrasquare-font md:text-left mt-1">
              ახლა ონლაინ
            </p>
            {copyMessage && (
              <span className="absolute font-bold -top-8 text-sm extrasquare-font text-green-400">
                {copyMessage}
              </span>
            )}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 extrasquare-font">
          {[
            {
              title: "ლაუნჩერის ინსტალაცია",
              description:
                "გადმოწერეთ ჩვენი ოფიციალური ლაუნჩერი, გახსენით და დააინსტალირეთ.",
            },
            {
              title: "ფაილების გადმოწერა",
              description:
                "გახსენით თქვენი დაინსტალირებული ლაუნჩერი და გადმოწერეთ საჭირო ფაილები.",
            },
            {
              title: "თამაშის დაწყება",
              description:
                "მიუთითეთ თქვენი სახელი, დააჭირეთ თამაშის დაწყებას და ისიამოვნეთ!",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-gray-800 rounded-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2 text-center md:text-left">
                {step.title}
              </h3>
              <p className="text-gray-400 text-center md:text-left">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
      {/* <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID" // Replace with your actual YouTube video ID
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </motion.div> */}
      <footer className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 mt-8 extrasquare-font md:text-left text-center">
          გვეწვიეთ სოცუალურ ქსელებში
        </h2>
        <div className="flex justify-center flex-col md:flex-row md:justify-start space-x-0 md:space-x-4 space-y-4 md:space-y-0 mb-8">
          {[
            { icon: "discord-alt.svg", link: "https://discord.gg/VwsbrHWKBw" },
            {
              icon: "youtube.png",
              link: "https://www.youtube.com/@Tsireka1013",
            },
            {
              icon: "facebook.webp",
              link: "https://www.facebook.com/groups/2539792889647958",
            },
          ].map(({ icon, link }) => (
            <motion.a
              key={icon}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 px-4 py-4 rounded-full flex items-center justify-center md:self-end md:h-fit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image
                src={`/${icon}`}
                alt={`${icon.split(".")[0]} alt`}
                width={24}
                height={24}
                className={icon === "discord-alt.svg" ? "invert" : ""}
              />
            </motion.a>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <nav className="space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0 text-center w-full flex flex-row justify-around md:justify-start items-end md:flex-row">
            {["მთავარი", "დონაცია", "Discord"].map((item) => (
              <a
                key={item}
                href={
                  item === "Discord" ? "https://discord.gg/VwsbrHWKBw" : "#"
                }
                className="hover:text-white extrasquare-font"
                target={item === "Discord" ? "_blank" : "_self"}
                rel={item === "Discord" ? "noopener noreferrer" : undefined}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="text-end extrasquare-font flex justify-center flex-col w-full">
            <p className="flex flex-col">
              &copy; 2024 Dark City Roleplay. <span>ყველა უფლება დაცულია.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
