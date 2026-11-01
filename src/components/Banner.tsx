
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
    return (
        <section className="w-full bg-[#F8FAF5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Left Content */}
                    <div>
                        <span className="inline-block bg-[#FDEB9E] text-[#007a71] px-4 py-2 rounded-full text-sm font-semibold mb-5">
                            Together for a Better Tomorrow
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Building a Better
                            <span className="text-[#007a71]"> Community </span>
                            Together.
                        </h1>

                        <p className="text-gray-600 text-base sm:text-lg mt-6 leading-relaxed">
                            Join hands with passionate people, participate in
                            meaningful events, support social development, and
                            create positive changes in our society.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link
                                href="/events"
                                className="bg-[#007a71] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f57] transition"
                            >
                                Explore Events
                            </Link>

                            <Link
                                href="/register"
                                className="border-2 border-[#007a71] text-[#007a71] px-6 py-3 rounded-lg font-semibold "
                            >
                                Join Community
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full h-[280px] sm:h-[350px] lg:h-[450px]">
                        <Image
                            src="/images/photo-1743950674205-40899590c63a.avif"
                            alt="Community volunteers working together"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover rounded-2xl shadow-xl"
                        />

                        {/* Image Overlay Card */}
                        <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                            <h3 className="font-bold text-[#007a71] text-lg">
                                Small Actions, Big Impact
                            </h3>
                            <p className="text-sm text-gray-600">
                                Every helping hand makes a difference.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;