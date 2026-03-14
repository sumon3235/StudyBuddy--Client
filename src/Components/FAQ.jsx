
const FAQ = () => {
  const faqs = [
    {
      question: "Who can create assignments?",
      answer:
        "Any registered user can create assignments for everyone on the platform. Simply log in and navigate to the Create Assignment page to get started.",
    },
    {
      question: "Can I grade my own submitted assignment?",
      answer:
        "No, you cannot grade your own assignment. Only other users can review and provide marks and feedback on your submitted work to ensure fairness.",
    },
    {
      question: "How do I submit an assignment?",
      answer:
        "To submit an assignment, go to the assignment details page and click the 'Take Assignment' button. You will need to provide your Google Docs link and a short note before submitting.",
    },
    {
      question: "What happens after I submit an assignment?",
      answer:
        "After submission, your assignment will be marked as pending. It will appear on the Pending Assignments page where other users can review it and provide marks and feedback.",
    },
  ];

  return (
    <div className="py-16 bg-base-200">
      <div className="max-w-3xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="nunito-font text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-base-content/60 mt-3">
            Everything you need to know about StudyBuddy.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-100 shadow-sm"
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className="collapse-title font-medium text-base">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/60 text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;