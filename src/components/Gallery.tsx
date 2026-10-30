import React from "react";
import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    title: "Tree Plantation",
    category: "Environment",
    image: "/images/photo-1625758476104-f2ed6c81248f.avif",
  },
  {
    id: 2,
    title: "Community Cleaning",
    category: "Cleanliness",
    image: "/images/photo-1617953141905-b27fb1f17d88.avif",
  },
  {
    id: 3,
    title: "Food Distribution",
    category: "Helping People",
    image: "/images/photo-1757609907613-57c5ad21f12a.avif",
  },
  {
    id: 4,
    title: "Blood Donation",
    category: "Healthcare",
    image: "/images/photo-1615461066159-fea0960485d5.avif",
  },
  {
    id: 5,
    title: "Helping Children",
    category: "Education",
    image: "/images/photo-1710093072228-8c3129f27357.avif",
  },
  {
    id: 6,
    title: "Community Volunteers",
    category: "Volunteering",
    image: "/images/photo-1557660559-42497f78035b.avif",
  },
];

const Gallery = () => {
  return (
    <section className="bg-[#F8FAF5] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#007a71] font-semibold uppercase tracking-widest text-sm">
            Our Activities
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3">
            Our Community Gallery
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Explore the moments that show our commitment to helping people,
            supporting communities, and creating positive change.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 sm:h-72 overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-6">
                <span className="text-[#FDEB9E] text-sm font-medium">
                  {item.category}
                </span>

                <h3 className="text-white text-xl font-bold mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;