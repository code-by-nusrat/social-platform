import React from "react";
import {
    MdEventAvailable,
    MdVolunteerActivism,
    MdGroups,
    MdPublic
} from "react-icons/md";

const features = [
    {
        id: 1,
        icon: <MdEventAvailable />,
        title: "Community Events",
        description:
            "Discover upcoming community events and participate in activities that bring people together."
    },
    {
        id: 2,
        icon: <MdVolunteerActivism />,
        title: "Volunteer Opportunities",
        description:
            "Find meaningful volunteering opportunities and help people who need your support."
    },
    {
        id: 3,
        icon: <MdGroups />,
        title: "Connect People",
        description:
            "Connect with like-minded people, build relationships, and grow a stronger community."
    },
    {
        id: 4,
        icon: <MdPublic />,
        title: "Social Impact",
        description:
            "Contribute to social development and create positive changes through collective efforts."
    }
];

const FeatureSection = () => {
    return (
        <section className="bg-white py-16 transition-colors duration-300 dark:bg-[#0b1714] md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-widest text-[#007a71] dark:text-[#FDEB9E]">
                        What We Offer
                    </span>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Explore Our Features
                    </h2>

                    <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
                        Everything you need to connect, participate, and make
                        a meaningful difference in your community.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="group rounded-2xl border border-gray-100 bg-[#F8FAF5] p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-[#10231e] dark:hover:border-[#007a71]/60 dark:hover:bg-[#143029] dark:hover:shadow-black/50"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#007a71] text-3xl text-[#FDEB9E] transition-transform group-hover:scale-110 dark:shadow-lg dark:shadow-[#007a71]/30">
                                {feature.icon}
                            </div>

                            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                                {feature.title}
                            </h3>

                            <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeatureSection;