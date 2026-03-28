import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen   px-3 sm:px-5 lg:space-y-10  py-2">
      <div className="max-w-4xl  ml-5 p-6 md:space-y-2 sm:p-5 rounded-2xl ">

        <h1 className="text-3xl sm:text-4xl text-center lg:text-5xl font-semibold text-[#40003a] fjalla-one-regular mb-20">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-4">
          last updated: {""}
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })}
        </p>

        <p className="text-gray-700 mb-6  ">
          Welcome to our website. By accessing or using our service, you agree
          to be bound by these Terms and Conditions. Please read them carefully.
        </p>

        <ul className="list-disc font-semibold text-md sm:text-lg    marker:[#40003a]">
          <li> Use of Website</li>
        </ul>
        <p className="text-gray-700 mb-4 text-sm sm:text-md md:text-lg">
          You agree to use this website only for lawful purposes and in a way
          that does not harm others or restrict their use of the website.
        </p>

        <ul className="list-disc font-semibold text-md sm:text-lg   marker:[#5E558A]">
          <li>Accounts</li>
        </ul>
        <p className="w-full text-gray-700 mb-4 text-sm sm:text-md md:text-lg">
          If you create an account, you are responsible for maintaining the
          security of your account and password.
        </p>

        <ul className="list-disc font-semibold text-md sm:text-lg   marker:[#5E558A]">
          <li>Products / Services</li>
        </ul>
        <p className="text-gray-700 mb-4 text-sm sm:text-lg ">
          We reserve the right to modify or discontinue any service without
          notice at any time.
        </p>

        <ul className="list-disc font-semibold text-md sm:text-lg  marker:[#5E558A]">
          <li>Pyments</li>
        </ul>
        <p className="text-gray-700 mb-4 text-sm sm:text-md md:text-lg">
          All payments must be completed before accessing premium features or
          services.
        </p>

        <ul className="list-disc font-semibold text-md sm:text-lg marker:[#5E558A]">
          <li>Changes</li>
        </ul>
        <p className="w-full text-gray-700 mb-4 text-sm sm:text-md md:text-lg">
          We may update these Terms & Conditions at any time. Continued use
          means you accept changes.
        </p>

        <ul className="list-disc font-semibold text-md sm:text-lg marker:[#5E558A]">
          <li>Contact Us</li>
        </ul>
        <p className="text-gray-700 text-sm sm:text-md md:text-lg">
          If you have any questions, contact us at: support@example.com.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;