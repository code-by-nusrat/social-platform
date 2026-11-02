"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authClient } from "@/lib/auth-client";

const Banner = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleJoinCommunity = () => {
        if (isPending) return;

        if (user) {
            router.push("/create-event");
        } else {
            toast.error("Please sign in first to join our community!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <section className="w-full bg-[#F8FAF5]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">

                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">

                    {/* Left Content */}
                    <div>
                        <span className="mb-5 inline-block rounded-full bg-[#FDEB9E] px-4 py-2 text-sm font-semibold text-[#007a71]">
                            Together for a Better Tomorrow
                        </span>

                        <h1 className="text-4xl leading-tight font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                            Building a Better
                            <span className="text-[#007a71]"> Community </span>
                            Together.
                        </h1>

                        <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                            Join hands with passionate people, participate in
                            meaningful events, support social development, and
                            create positive changes in our society.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                href="/upcoming-events"
                                className="rounded-lg bg-[#007a71] px-6 py-3 font-semibold text-white transition hover:bg-[#005f57]"
                            >
                                Explore Upcoming Events
                            </Link>

                            <button
                                onClick={handleJoinCommunity}
                                disabled={isPending}
                                className="rounded-lg border-2 border-[#007a71] px-6 py-3 font-semibold text-[#007a71] transition hover:text-[#007a71] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isPending
                                    ? "Please wait..."
                                    : user
                                    ? "Create an Event"
                                    : "Join Community"}
                            </button>

                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-70 w-full sm:h-87.5 lg:h-112.5">
                        <Image
                            src="/images/photo-1743950674205-40899590c63a.avif"
                            alt="Community volunteers working together"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded-2xl object-cover shadow-xl"
                        />

                        {/* Image Overlay Card */}
                        <div className="absolute right-5 bottom-5 left-5 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-[#007a71]">
                                Small Actions, Big Impact
                            </h3>
                            <p className="text-sm text-gray-600">
                                Every helping hand makes a difference.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
            />
        </section>
    );
};

export default Banner;
