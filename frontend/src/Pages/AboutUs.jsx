import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Header */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black drop-shadow-sm">
          About Us
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Welcome to{" "}
          <span className="font-bold text-black">DailyDesk Local</span> — the
          platform where
          <span className="font-semibold text-gray-900">
            {" "}
            neighborhood stories
          </span>{" "}
          find a voice and connect communities.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-6 space-y-20 pb-24">
        {/* Who We Are */}
        <section className="relative">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 flex items-center gap-2">
            🌍 Who We Are
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl">
            <strong>DailyDesk Local</strong> is your trusted platform for
            sharing and discovering news that matters in your area. From
            <span className="font-medium text-gray-900"> social issues</span> to
            <span className="font-medium text-gray-700">
              {" "}
              community celebrations
            </span>
            , we bring together local voices to inform, connect, and inspire.
          </p>
        </section>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-200"></div>

        {/* What We Do */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 flex items-center gap-2">
            📰 What We Do
          </h2>
          <p className="text-lg leading-relaxed mb-6 max-w-4xl">
            We empower every user to become a storyteller and reporter for their
            neighborhood. On DailyDesk Local, you can:
          </p>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-black text-xl">✔</span>
              Post news, updates, and issues from your locality
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black text-xl">✔</span>
              Upload{" "}
              <span className="font-semibold text-gray-900">
                photos, videos, and text
              </span>{" "}
              with your stories
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black text-xl">✔</span>
              Read real-time updates from people around you
            </li>
            <li className="flex items-start gap-3">
              <span className="text-black text-xl">✔</span>
              Raise awareness about challenges in your community
            </li>
          </ul>
        </section>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-200"></div>

        {/* Mission */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 flex items-center gap-2">
            🎯 Our Mission
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl">
            To build a{" "}
            <span className="font-semibold text-gray-900">
              people-powered local news network
            </span>
            that keeps communities connected and informed. Our mission is to
            ensure every local issue, celebration, and story shines in the
            spotlight.
          </p>
        </section>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gray-200"></div>

        {/* Join Us */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 flex justify-center items-center gap-2">
            🤝 Join Us
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Be part of a growing movement where{" "}
            <span className="font-semibold text-gray-900">your stories</span>{" "}
            matter. Share your voice, highlight your community, and connect with
            people who care about the same issues.
          </p>
          <p className="text-2xl font-semibold text-black mt-6">
            Together, we shape tomorrow’s news — starting in our own streets.
          </p>

          {/* Call to Action */}
          <div className="mt-10">
            <a
              href="/create-post"
              className="inline-block bg-black hover:bg-gray-800 text-white px-10 py-4 rounded-full shadow-lg text-lg font-medium transition-all duration-300"
            >
              Start Posting Now
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
