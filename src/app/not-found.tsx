
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Compass,
    Home,
    Search,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f0fdfa] px-4 py-16 dark:bg-[#042f2e]">

            {/* Animated Background */}
            <motion.div
                animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-teal-300/20 blur-2xl"
            />

            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-[10%] right-[10%] h-44 w-44 rounded-full bg-yellow-300/20 blur-3xl"
            />

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 w-full max-w-2xl"
            >
                <Card className="overflow-hidden rounded-[2rem] border border-teal-100/80 bg-white/90 shadow-2xl shadow-teal-900/10 backdrop-blur-xl dark:border-teal-800 dark:bg-[#073b38]">
                    <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-12 sm:py-16">

                        {/* Icon */}
                        <motion.div
                            animate={{ rotate: [0, 12, -12, 0], y: [0, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-[#007a71] dark:bg-teal-900/60 dark:text-teal-300"
                        >
                            <Compass size={42} strokeWidth={1.5} />
                        </motion.div>

                        {/* 404 */}
                        <div className="relative mb-3">
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-8xl font-black tracking-tighter text-[#007a71] sm:text-9xl"
                            >
                                404
                            </motion.h1>

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute -right-5 -top-2 text-yellow-400"
                            >
                                <Sparkles size={30} />
                            </motion.div>
                        </div>

                        {/* Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                                Oops! Lost Your Way?
                            </h2>

                            <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-gray-500 dark:text-gray-300 sm:text-base">
                                Looks like this page has wandered off! The page you're
                                looking for doesn't exist or may have been moved.
                                Don't worry, there's always another way to make a
                                difference with UnityHub.
                            </p>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
                        >
                            <Button
                                asChild
                                className="h-12 whitespace-nowrap rounded-xl border-2 border-[#00665e] bg-[#007a71] px-8 font-bold text-white shadow-lg shadow-teal-900/25 transition-all duration-300 hover:-translate-y-1 hover:border-[#004d46] hover:bg-[#005f57] hover:shadow-xl"
                            >
                                <Link href="/" className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                    Return Home <ArrowRight className="h-5 w-5 shrink-0" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.history.back()}
                                className="h-12 rounded-xl border-teal-200 px-7 text-[#007a71] hover:bg-teal-50 dark:border-teal-700 dark:text-teal-300 dark:hover:bg-teal-900"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </motion.div>

                        {/* Footer */}
                        <div className="mt-10 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400">
                            <Search size={14} />
                            <span>Keep exploring. Keep making a difference.</span>
                        </div>

                    </CardContent>
                </Card>

                <p className="mt-6 text-center text-xs font-medium tracking-wider text-teal-800/60 dark:text-teal-200/60">
                    UNITYHUB — TOGETHER, WE MAKE A DIFFERENCE
                </p>
            </motion.div>
        </main>
    );
}
