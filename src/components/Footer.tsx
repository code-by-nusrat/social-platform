import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Heart,
  Users,
  HandHeart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-[#073F3B] text-white">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-[#FDEB9E] flex items-center justify-center">
                <HandHeart className="text-[#073F3B] size-7" />
              </div>

              <h2 className="text-3xl font-extrabold">
                Unity<span className="text-[#FDEB9E]">Hub</span>
              </h2>
            </Link>

            <p className="text-gray-300 leading-7 mt-5 max-w-md">
              Together, we can create a stronger and more caring society.
              Connect with people, join meaningful events, and make a
              positive difference in your community.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-7">
              {[
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Twitter, href: "https://twitter.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
              ].map((social, index) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#FDEB9E] hover:bg-[#FDEB9E] hover:text-[#073F3B] transition duration-300"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#FDEB9E] mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li><Link href="/" className="hover:text-[#FDEB9E] transition">Home</Link></li>
              <li><Link href="/events" className="hover:text-[#FDEB9E] transition">Upcoming Events</Link></li>
              <li><Link href="/about" className="hover:text-[#FDEB9E] transition">About Us</Link></li>
              <li><Link href="/gallery" className="hover:text-[#FDEB9E] transition">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-[#FDEB9E] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-[#FDEB9E] mb-6">
              Contact Us
            </h3>

            <ul className="space-y-5 text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#FDEB9E] size-5 shrink-0" />
                <span>Making communities better, together.</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-[#FDEB9E] size-5 shrink-0" />
                <span>hello@unityhub.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-[#FDEB9E] size-5 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Community CTA */}
        <div className="mt-16 rounded-2xl bg-[#0C514B] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FDEB9E] flex items-center justify-center shrink-0">
              <Users className="text-[#073F3B] size-6" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Be part of something meaningful.
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                Your little effort can make a big difference.
              </p>
            </div>
          </div>

          <Button
            asChild
            className="bg-[#FDEB9E] text-[#073F3B] hover:bg-white font-bold rounded-xl px-6"
          >
            <Link href="/register">
              Join Our Community <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Bottom */}
        <Separator className="bg-white/15 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} UnityHub. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            Made with <Heart className="size-4 text-red-400 fill-red-400" /> for a better community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;