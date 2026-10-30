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
        <section className="bg-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Heading */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[#007a71] font-semibold text-sm uppercase tracking-widest">
                        What We Offer
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
                        Explore Our Features
                    </h2>

                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Everything you need to connect, participate, and make
                        a meaningful difference in your community.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="group p-7 rounded-2xl border border-gray-100 bg-[#F8FAF5] hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#007a71] text-[#FDEB9E] text-3xl mb-5 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-7">
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