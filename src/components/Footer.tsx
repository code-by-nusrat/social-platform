

// import Link from "next/link";
// import {
//   MapPin,
//   Mail,
//   Phone,
//   ArrowUpRight,
//   Heart,
//   Users,
//   HandHeart,
// } from "lucide-react";

// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaTwitter,
// } from "react-icons/fa";

// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

// const Footer = () => {
//   const socialLinks = [
//     { icon: FaFacebookF, href: "https://facebook.com" },
//     { icon: FaInstagram, href: "https://instagram.com" },
//     { icon: FaTwitter, href: "https://twitter.com" },
//     { icon: FaLinkedinIn, href: "https://linkedin.com" },
//   ];

//   return (
//     <footer className="bg-[#007a71] text-white">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <Link href="/" className="inline-flex items-center gap-2">
//               <div className="w-11 h-11 rounded-xl bg-[#FDEB9E] flex items-center justify-center">
//                 <HandHeart className="text-[#007a71] size-7" />
//               </div>

//               <h2 className="text-3xl font-extrabold">
//                 Unity<span className="text-[#FDEB9E]">Hub</span>
//               </h2>
//             </Link>

//             <p className="text-white/75 leading-7 mt-5 max-w-md">
//               Together, we can create a stronger and more caring society.
//               Connect with people, join meaningful events, and make a
//               positive difference in your community.
//             </p>

//             {/* Social Links */}
//             <div className="flex gap-3 mt-7">
//               {socialLinks.map((social, index) => {
//                 const Icon = social.icon;

//                 return (
//                   <Link
//                     key={index}
//                     href={social.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-[#FDEB9E] hover:bg-[#FDEB9E] hover:text-[#007a71] transition duration-300"
//                   >
//                     <Icon size={18} />
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-bold text-[#FDEB9E] mb-6">
//               Quick Links
//             </h3>

//             <ul className="space-y-4 text-white/75">
//               <li><Link href="/" className="hover:text-[#FDEB9E] transition">Home</Link></li>
//               <li><Link href="/events" className="hover:text-[#FDEB9E] transition">Upcoming Events</Link></li>
//               <li><Link href="/about" className="hover:text-[#FDEB9E] transition">About Us</Link></li>
//               <li><Link href="/gallery" className="hover:text-[#FDEB9E] transition">Gallery</Link></li>
//               <li><Link href="/contact" className="hover:text-[#FDEB9E] transition">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-lg font-bold text-[#FDEB9E] mb-6">
//               Contact Us
//             </h3>

//             <ul className="space-y-5 text-white/75">
//               <li className="flex items-start gap-3">
//                 <MapPin className="text-[#FDEB9E] size-5 shrink-0" />
//                 <span>Making communities better, together.</span>
//               </li>

//               <li className="flex items-center gap-3">
//                 <Mail className="text-[#FDEB9E] size-5 shrink-0" />
//                 <span>hello@unityhub.com</span>
//               </li>

//               <li className="flex items-center gap-3">
//                 <Phone className="text-[#FDEB9E] size-5 shrink-0" />
//                 <span>+880 1234-567890</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Community CTA */}
//         <div className="mt-16 rounded-2xl bg-[#00665F] border border-white/15 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-xl bg-[#FDEB9E] flex items-center justify-center shrink-0">
//               <Users className="text-[#007a71] size-6" />
//             </div>

//             <div>
//               <h3 className="text-lg sm:text-xl font-bold">
//                 Be part of something meaningful.
//               </h3>
//               <p className="text-white/75 text-sm mt-1">
//                 Your little effort can make a big difference.
//               </p>
//             </div>
//           </div>

//           <Button
//             asChild
//             className="bg-[#FDEB9E] text-[#007a71] hover:bg-white font-bold rounded-xl px-6"
//           >
//             <Link href="/register">
//               Join Our Community
//               <ArrowUpRight className="ml-2 size-4" />
//             </Link>
//           </Button>
//         </div>

//         {/* Bottom */}
//         <Separator className="bg-white/20 my-8" />

//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/65">
//           <p>
//             © {new Date().getFullYear()} UnityHub. All rights reserved.
//           </p>

//           <p className="flex items-center gap-1">
//             Made with
//             <Heart className="size-4 text-red-300 fill-red-300" />
//             for a better community.
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Heart,
  Users,
  HandHeart,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com" },
    { icon: FaInstagram, href: "https://instagram.com" },
    { icon: FaTwitter, href: "https://twitter.com" },
    { icon: FaLinkedinIn, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-[#FDEB9E] text-[#123C36]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-[#123C36] flex items-center justify-center">
                <HandHeart className="text-white size-7" />
              </div>

              <h2 className="text-3xl font-extrabold">
                Unity<span className="text-[#007a71]">Hub</span>
              </h2>
            </Link>

            <p className="text-[#123C36]/75 leading-7 mt-5 max-w-md">
              Together, we can create a stronger and more caring society.
              Connect with people, join meaningful events, and make a
              positive difference in your community.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-7">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#123C36] border border-[#123C36] flex items-center justify-center text-white hover:bg-[#007a71] hover:border-[#007a71] transition duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#123C36] mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-[#123C36]/75">
              <li><Link href="/" className="hover:text-[#007a71] transition">Home</Link></li>
              <li><Link href="/events" className="hover:text-[#007a71] transition">Upcoming Events</Link></li>
              <li><Link href="/about" className="hover:text-[#007a71] transition">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-[#007a71] transition">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-[#007a71] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-[#123C36] mb-6">
              Contact Us
            </h3>

            <ul className="space-y-5 text-[#123C36]/75">
              <li className="flex items-start gap-3">
                <MapPin className="text-white size-5 shrink-0" />
                <span>Making communities better, together.</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-white size-5 shrink-0" />
                <span>hello@unityhub.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-white size-5 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Community CTA */}
        <div className="mt-16 rounded-2xl bg-[#123C36] border border-[#123C36] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#007a71] flex items-center justify-center shrink-0">
              <Users className="text-white size-6" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Be part of something meaningful.
              </h3>
              <p className="text-white/75 text-sm mt-1">
                Your little effort can make a big difference.
              </p>
            </div>
          </div>

          <Button
            asChild
            className="bg-[#FDEB9E] text-[#123C36] hover:bg-white font-bold rounded-xl px-6"
          >
            <Link href="/register">
              Join Our Community
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Bottom */}
        <Separator className="bg-[#123C36]/20 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#123C36]/70">
          <p>
            © {new Date().getFullYear()} UnityHub. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Made with
            <Heart className="size-4 text-red-500 fill-red-500" />
            for a better community.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
