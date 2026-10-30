import Banner from "@/components/Banner";
import FeatureSection from "@/components/FeatureSection";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeatureSection></FeatureSection>
      <Gallery></Gallery>
      <Newsletter></Newsletter>
    </div>
  );
}
