import Banner from "@/components/Banner";
import FeatureSection from "@/components/FeatureSection";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";
import UpcomingEventsPage from "./upcoming-events/page";
import RecentEvents from "@/components/RecentEvents";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <RecentEvents></RecentEvents>
      <Gallery></Gallery>
      <Newsletter></Newsletter>
    </div>
  );
}
