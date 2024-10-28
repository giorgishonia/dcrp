"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

export default function DonationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [paymentType, setPaymentType] = useState("money");
  const [amount, setAmount] = useState(0);

  const calculatePayment = useCallback(() => {
    if (paymentType === "ecoin") {
      return {
        pay: `${amount}₾`,
        receive: `${amount} E-coin`,
      };
    } else {
      return {
        pay: `${amount}₾`,
        receive: `${amount * 4000000}$`,
      };
    }
  }, [paymentType, amount]);

  const [payment, setPayment] = useState(calculatePayment());

  useEffect(() => {
    setPayment(calculatePayment());
  }, [calculatePayment]);

  return (
    <div
      className="bg-gray-900 text-white min-h-screen"
      style={{
        minHeight: "110vh",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,7) 90%, rgba(0,0,0,1) 100%), url('/bank.jpg')",
      }}
    >
      <header className="container mx-auto px-4 py-4 flex justify-between items-center sticky top-0 z-50 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <nav className="hidden md:flex space-x-6">
          {[
            { name: "მთავარი", href: "/" },
            { name: "სიახლეები", href: "/news" },
            { name: "დონაცია", href: "/donation" },
          ].map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`${
                item.name === "დონაცია"
                  ? "text-yellow-500 flex items-center justify-center align-center"
                  : "text-gray-300 hover:text-white"
              } extrasquare-font`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </nav>
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-x-0 top-16 bg-gray-900 bg-opacity-95 z-40"
          >
            <nav className="flex flex-col items-center py-4">
              {[
                { name: "მთავარი", href: "/" },
                { name: "სიახლეები", href: "/news" },
                { name: "დონაცია", href: "/donation" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.name === "დონაცია"
                      ? "text-yellow-500"
                      : "text-gray-300"
                  } extrasquare-font py-2`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#"
                className="text-gray-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src="/discord-alt.svg"
                  alt="DC alt"
                  width={24}
                  height={24}
                  className="invert"
                />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-4">
        <motion.div
          className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 diploma-font text-center">
            დონაცია
          </h1>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                სახელი
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                გადახდის ტიპი
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="money"
                    checked={paymentType === "money"}
                    onChange={() => setPaymentType("money")}
                    className="form-radio text-yellow-500"
                  />
                  <span className="ml-2">ფული</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="ecoin"
                    checked={paymentType === "ecoin"}
                    onChange={() => setPaymentType("ecoin")}
                    className="form-radio text-yellow-500"
                  />
                  <span className="ml-2">E-coin</span>
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                რაოდენობა (₾)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <p className="text-sm text-gray-400">1₾ = 1 E-coin</p>
            <div className="bg-gray-700 p-4 rounded-md">
              <p>თქვენ გადაიხდით: {payment.pay}</p>
              <p>დაგერიცხებათ: {payment.receive}</p>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              გადახდა
            </motion.button>
          </form>
        </motion.div>
      </main>

      <footer className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <nav className="space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0 text-center">
            {["მთავარი", "სიახლეები", "დონაცია", "DC"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white extrasquare-font"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="text-center">
            <p>Powered by DOQUS Server</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
