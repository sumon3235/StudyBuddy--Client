
const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Register & Login",
      description:
        "Create your free account in seconds. Login with your email or Google account to get started with StudyBuddy.",
    },
    {
      step: "02",
      title: "Create or Take Assignment",
      description:
        "Create assignments for your friends or browse existing ones. Set difficulty levels, marks, and due dates easily.",
    },
    {
      step: "03",
      title: "Get Graded by Friends",
      description:
        "Submit your work via Google Docs and get marks and feedback from your friends. Track your progress anytime.",
    },
  ];

  return (
    <div className="py-16 bg-base-100 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="nunito-font text-4xl font-bold">How It Works</h2>
          <p className="text-base-content/60 mt-3 max-w-xl mx-auto">
            Get started with StudyBuddy in just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">

              {/* Step Number */}
              <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold nunito-font mb-4">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="nunito-font text-xl font-bold mb-2">{item.title}</h3>

              {/* Description */}
              <p className="text-base-content/60 text-sm">{item.description}</p>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;