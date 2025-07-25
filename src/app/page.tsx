import { LandingPageCardBackground } from "~/components/landingPageCardBackground";
import { LandingPageForeground } from "~/components/landingPageForeground";

const Page = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LandingPageCardBackground />
      </div>

      <div className="absolute h-screen w-screen">
        <LandingPageForeground />
      </div>
    </div>
  );
};

export default Page;
