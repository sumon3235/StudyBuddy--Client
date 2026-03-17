import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuth from "../Providers/useAuth";
import toast from "react-hot-toast";
import axiosSecure from "../utils/axiosSecure";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: assignment = {}, isLoading } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`,
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  const handleformData = (e) => {
    e.preventDefault();
    const form = e.target;
    const note = form.note.value;
    const submissionData = {
      googleDocsLink: form.docsLink.value,
      note,
      assignmentId: assignment._id,
      assignmentTitle: assignment.title,
      totalMarks: assignment.marks,
      examinee_email: user?.email,
      examineeName: user?.displayName,
      status: "pending",
      obtainedMarks: "",
      feedback: "",
    };
    axiosSecure.post(`/submissions`, submissionData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Assignment submitted successfully!");
          document.getElementById("submit_modal").close();
          form.reset();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Thumbnail */}
        <div className="w-full rounded-2xl overflow-hidden shadow-lg mb-8">
          <img
            src={assignment.thumbnail}
            alt={assignment.title}
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Content Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-5">
            {/* Title & Badges */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <h1 className="nunito-font text-3xl font-bold">
                {assignment.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="badge badge-outline">
                  Marks: {assignment.marks}
                </span>
                <span
                  className={`badge ${
                    assignment.difficulty === "easy"
                      ? "badge-success"
                      : assignment.difficulty === "medium"
                        ? "badge-warning"
                        : "badge-error"
                  }`}
                >
                  {assignment.difficulty}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="divider my-0"></div>

            {/* Description */}
            <div>
              <h3 className="nunito-font font-bold text-lg mb-2">
                Description
              </h3>
              <p className="text-base-content/70 leading-relaxed">
                {assignment.description}
              </p>
            </div>

            {/* Due Date & Creator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-sm text-base-content/50 mb-1">Due Date</p>
                <p className="font-semibold">
                  {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-sm text-base-content/50 mb-1">Created By</p>
                <p className="font-semibold">{assignment.creatorName}</p>
              </div>
            </div>

            {/* Take Assignment Button */}
            {/* Take Assignment Button */}
            <div className="card-actions justify-end mt-2">
              {user?.email === assignment.creatorEmail ? (
                <div
                  className="tooltip tooltip-error"
                  data-tip="You cannot submit your own assignment"
                >
                  <button className="btn btn-primary px-8" disabled>
                    Take Assignment
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary px-8"
                  onClick={() =>
                    document.getElementById("submit_modal").showModal()
                  }
                >
                  Take Assignment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      <dialog id="submit_modal" className="modal">
        <div className="modal-box">
          <h3 className="nunito-font font-bold text-xl mb-4">
            Submit Assignment
          </h3>

          <form onSubmit={handleformData} className="space-y-4">
            {/* Google Docs Link */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Google Docs Link</span>
              </label>
              <input
                name="docsLink"
                type="url"
                placeholder="Paste your Google Docs link here"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Note */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Quick Note</span>
              </label>
              <textarea
                name="note"
                placeholder="Add a short note (optional)"
                className="textarea textarea-bordered w-full h-28"
              />
            </div>

            {/* Buttons */}
            <div className="modal-action mt-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("submit_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Assignment
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AssignmentDetails;
