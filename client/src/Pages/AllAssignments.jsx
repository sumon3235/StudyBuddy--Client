import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../Providers/useAuth";

const AllAssignments = () => {
  const { user } = useAuth();

  const { data: assignments = [], isLoading } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APIURL}/all-assignments`,
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

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="nunito-font text-4xl font-bold">All Assignments</h2>
          <p className="text-base-content/60 mt-2">
            Browse and take assignments created by your friends.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <Link to={`/assignments/${assignment._id}`}>
                <figure className="h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={assignment.thumbnail}
                    alt={assignment.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </Link>

              <div className="card-body">
                {/* Title */}
                <Link to={`/assignments/${assignment._id}`}>
                  <h3 className="nunito-font card-title hover:text-primary transition-colors">
                    {assignment.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-base-content/60 text-sm line-clamp-2">
                  {assignment.description}
                </p>

                {/* Marks & Difficulty */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge badge-outline text-xs">
                    Marks: {assignment.marks}
                  </span>
                  <span
                    className={`badge text-xs ${
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

                {/* Due Date */}
                <p className="text-xs text-base-content/50 mt-1">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>

                {/*View Buttons */}
                <div className="card-actions justify-end mt-2 gap-2">
                  <Link
                    to={`/assignments/${assignment._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>

                  {/* Update Buttons */}
                  {user?.email === assignment.creatorEmail ? (
                    <div className="tooltip" data-tip="Edit Assignment">
                      <Link
                        to={`/update/${assignment._id}`}
                        className="btn btn-outline btn-sm"
                      >
                        Update
                      </Link>
                    </div>
                  ) : (
                    <div className="tooltip" data-tip="Only Creator Can Edit This" >
                      <button className="btn btn-sm" disabled>Update</button>
                    </div>
                  )}

                  <button className="btn btn-error btn-outline btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAssignments;
