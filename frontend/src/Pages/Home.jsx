import Advertisement from "@/components/SharedHeader/Advertisement";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-auto min-h-screen bg-white">
      {/* Welcome Section */}
      <div className="mx-auto flex flex-col gap-6 max-w-7xl p-10 md:p-28">
        <h1 className="text-4xl md:text-5xl text-indigo-700 font-bold text-center">
          Welcome to <span className="font-sans text-red-500">DailyDesk</span>
        </h1>

        <p className="text-gray-700 text-2xl text-center mt-4 px-4 md:px-20">
          Your daily gateway to trusted news, expert insights, and inspiring
          stories. Stay informed, stay inspired all at one place you can{" "}
          <span className="text-red-500 font-serif">Trust.</span>
        </p>

        <p className="text-gray-500 text-center mt-2 italic">
          Fresh updates, every day just for you.
        </p>

        <div className="flex justify-center mt-6">
          <Link to="/view-post">
            <Button className="rounded-2xl bg-blue-500 flex items-center gap-2 text-lg">
              Explore Stories <ArrowRightCircle />
            </Button>
          </Link>
        </div>
      </div>

      {/* Why Join Us Section */}
      <section className="pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-10">Why Choose DailyDesk?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Endless Variety"
              description="From breaking news to lifestyle trends — explore the stories that matter to you."
              icons="🌍"
            />

            <Card
              title="Community First"
              description="Join a growing community of readers and writers who share your passion for knowledge."
              icons="🤝"
            />

            <Card
              title="Seamless Experience"
              description="Enjoy a smooth, free reading platform designed for pure discovery and learning."
              icons="🚀"
            />
          </div>

          <p className="text-center text-gray-600 mt-10 italic">
            DailyDesk — where every story finds its voice.
          </p>
        </div>
      </section>
      <div className=" flex items-center justify-center mx-auto mb-5">
        <Advertisement />
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, description, icons }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 hover:drop-shadow-lg  hover:drop-shadow-gray-800">
      <div className="text-4xl mb-4">{icons}</div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 italic">{description}</p>
    </div>
  );
};

export default Home;
