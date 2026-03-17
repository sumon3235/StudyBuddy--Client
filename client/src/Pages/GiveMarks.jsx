import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosSecure from "../utils/axiosSecure";

const GiveMarks = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: submission = {}, isLoading } = useQuery({
    queryKey: ["submission", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/${id}`);
      return res.data;
    },
  });

  const handleGiveMarks = async (e) => {
    e.preventDefault();
    const form = e.target;
    const marks = Number(form.marks.value);
    const feedback = form.feedback.value;

    if (marks > submission.totalMarks) {
      return toast.error(`Marks cannot exceed ${submission.totalMarks}`);
    }

    try {
      const res = await axiosSecure.patch(`/submissions/${id}`, {
        obtainedMarks: marks,
        feedback,
        status: "completed",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Marks submitted successfully!");
        navigate("/pending-assignments");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="nunito-font text-4xl font-bold">Give Marks</h2>
          <p className="text-base-content/60 mt-2">
            Review the submission and provide marks with feedback.
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="nunito-font text-2xl font-bold text-primary">
                {submission.assignmentTitle}
              </h3>
              <div className="flex gap-2 flex-wrap">
                <span className="badge badge-outline">
                  Total: {submission.totalMarks} marks
                </span>
                <span className="badge badge-neutral">
                  {submission.examineeName || "Student"}
                </span>
              </div>
            </div>

            <div className="divider my-0"></div>

            {/* Submission Details */}
            <div className="bg-base-200 rounded-xl p-5 space-y-4">
              <p className="text-xs font-bold text-base-content/50 uppercase tracking-widest">
                Submission Details
              </p>

              {/* Note */}
              <div>
                <p className="text-sm text-base-content/50 mb-1">
                  Note from examinee
                </p>
                <p className="text-base-content">
                  {submission.note || "No note provided"}
                </p>
              </div>

              {/* Google Docs Link */}
              <div>
                <p className="text-sm text-base-content/50 mb-2">
                  Submitted Document
                </p>

                <a
                  href={submission.googleDocsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-secondary btn-outline gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Open Document
                </a>
              </div>
            </div>

            {/* Marks Form */}
            <form onSubmit={handleGiveMarks} className="space-y-4">
              {/* Marks */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Obtained Marks (out of {submission.totalMarks})
                  </span>
                </label>
                <input
                  name="marks"
                  type="number"
                  min="0"
                  max={submission.totalMarks}
                  placeholder="Enter marks"
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
              </div>

              {/* Feedback */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Feedback</span>
                </label>
                <textarea
                  name="feedback"
                  placeholder="Write your feedback for the student..."
                  className="textarea textarea-bordered w-full h-28 focus:textarea-primary"
                  required
                />
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-full mt-2">
                Submit Marks
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveMarks;
