import React from "react";

const AboutUs = () => {
  return (
    <div className="h-full w-screen bg-gradient-to-r from-teal-100 to-orange-200">
      <div className="flex flex-col gap-6 items-center justify-center pt-16 pb-16">
        <h1 className="font-bold text-teal-700 text-[54px]">About Us</h1>
        <div className="flex flex-col font-sans mx-8 md:mx-32 bg-white rounded-3xl shadow-lg p-12">
          <h1 className="text-[30px] text-teal-600 mb-4 font-bold ">
            🌐 Who We Are
          </h1>
          <p className="font-normal text-[20px] text-gray-800 leading-relaxed mb-8">
            Welcome to <strong>DailyDesk</strong>, your go-to platform for
            seamless content creation, management, and distribution. Whether
            you're a blogger, a business, or an organization, we empower you to
            manage your digital content with efficiency and ease.
          </p>

          <h1 className="text-[30px] text-teal-600 mb-4 font-bold ">
            🚀 What We Do
          </h1>
          <div className="font-normal text-[20px] text-gray-800 leading-relaxed mb-8 space-y-2">
            <p>
              We provide a simple yet powerful Content Management System (CMS)
              designed to help you:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Create and organize content effortlessly</li>
              <li>Collaborate with team members in real-time</li>
              <li>Customize your digital presence without touching code</li>
              <li>Stay in control of your content, data, and workflow</li>
            </ul>
            <p className="mt-4">
              From articles and blogs to product updates and internal documents
              — we help bring your content strategy to life.
            </p>
          </div>

          <h1 className="text-[30px] text-teal-600 mb-4 font-bold">
            🧑‍💻 Our Mission
          </h1>
          <p className="font-normal text-[20px] text-gray-800 leading-relaxed mb-8">
            To simplify digital content management and empower creators to focus
            on what matters most — creating great content.
          </p>

          <h1 className="text-[30px] text-teal-600 mb-4 font-bold ">
            🤝 Join Us
          </h1>
          <p className="font-normal text-[20px] text-gray-800 leading-relaxed">
            Whether you're building a blog, managing a news site, or running an
            enterprise website —{" "}
            <span className="font-semibold text-teal-600">DailyDesk</span> is
            here to help you succeed.
          </p>
          <p className="font-normal text-[28px] text-gray-800 leading-relaxed mt-2">
            Let’s build something amazing together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
