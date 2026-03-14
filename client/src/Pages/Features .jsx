
const Features = () => {
  const features = [
     {
      icon: "📝",
      title: "Create Assignments",
      description:
        "Any registered user can create assignments for everyone. Set the title, description, marks, difficulty level, and due date easily.",
    },
    {
      icon: "👥",
      title: "Group Study",
      description:
        "Every registered user is a friend of others. Study together, learn together, and make your academic journey more enjoyable.",
    },
    {
      icon: "✅",
      title: "Submit & Grade",
      description:
        "Submit assignments by sharing your Google Docs link. Your friends will review your work and provide marks along with feedback.",
    },
    {
      icon: "🔍",
      title: "Filter by Difficulty",
      description:
        "Easily filter assignments by difficulty — Easy, Medium, or Hard. Find the right challenge that matches your current skill level.",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="nunito-font text-4xl font-bold">Why StudyBuddy?</h2>
          <p className="text-base-content/60 mt-3 max-w-xl mx-auto">
            Everything you need to study smarter with your friends — all in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="card-body items-center text-center">
                <span className="text-5xl mb-2">{feature.icon}</span>
                <h3 className="nunito-font card-title text-lg">{feature.title}</h3>
                <p className="text-base-content/60 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Features;