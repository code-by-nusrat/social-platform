
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

const Newsletter = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your subscription API logic here
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-5 py-16">
      <Card className="bg-[#007a71] border-none rounded-2xl overflow-hidden">
        <CardContent className="flex flex-col items-center text-center px-6 py-12 md:py-16">

          <div className="bg-[#FDEB9E] p-4 rounded-full mb-5">
            <Mail className="w-8 h-8 text-[#007a71]" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Connected with UnityHub!
          </h2>

          <p className="text-white/80 max-w-xl mb-8">
            Subscribe to our newsletter and get updates about upcoming
            events, community activities, volunteering opportunities,
            and inspiring stories.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              className="bg-white h-12 text-gray-800 border-none"
            />

            <Button
              type="submit"
              className="h-12 px-6 bg-[#FDEB9E] text-[#007a71] hover:bg-[#f5df87] font-semibold"
            >
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="text-xs text-white/60 mt-5">
            No spam, just meaningful updates. Unsubscribe anytime.
          </p>

        </CardContent>
      </Card>
    </section>
  );
};

export default Newsletter;
