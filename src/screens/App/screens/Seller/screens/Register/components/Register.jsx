import React from "react";
import RegistrationSteps from "./RegistrationSteps";
import TermsOfAgreement from "./TOA";

function Register() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-my-accent to-my-accent-mono flex items-center justify-center">
      {/* root container - no bg color */}
      <div className="w-1/2 flex flex-row shadow-2xl">
        {/* steps container */}
        <div className="w-1/4 rounded-l-lg">
          <RegistrationSteps />
        </div>

        {/* content */}
        <div className="w-3/4  bg-white rounded-r-lg p-8">
          <TermsOfAgreement />
        </div>
      </div>
    </div>
  );
}

export default Register;
