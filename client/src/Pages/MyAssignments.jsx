import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../Providers/useAuth";

const MyAssignments = () => {
  const { user } = useAuth();

  const { data: myAssignments = [], isLoading } = useQuery({
    queryKey: ["my-assignments", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APIURL}/my-assignments?email=${user?.email}`
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
      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="nunito-font text-4xl font-bold">My Assignments</h2>
          <p className="text-base-content/60 mt-2">
            Track all your submitted assignments and results.
          </p>
        </div>

        {/* Empty state */}
        {myAssignments.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base-content/50 text-lg">
              You have not submitted any assignments yet.
            </p>
          </div>
        ) : (
          <div className="card bg-base-100 shadow-xl overflow-x-auto">
            <table className="table">

              {/* Table Head */}
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Assignment Title</th>
                  <th>Total Marks</th>
                  <th>Obtained Marks</th>
                  <th>Status</th>
                  <th>Feedback</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {myAssignments.map((assignment, index) => (
                  <tr key={assignment._id} className="hover">

                    {/* Index */}
                    <td className="text-base-content/50">{index + 1}</td>

                    {/* Title */}
                    <td className="font-medium">{assignment.assignmentTitle}</td>

                    {/* Total Marks */}
                    <td>{assignment.totalMarks}</td>

                    {/* Obtained Marks */}
                    <td>
                      {assignment.obtainedMarks !== ""
                        ? assignment.obtainedMarks
                        : "—"}
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge ${
                        assignment.status === "completed"
                          ? "badge-success"
                          : "badge-warning"
                      }`}>
                        {assignment.status}
                      </span>
                    </td>

                    {/* Feedback */}
                    <td className="text-base-content/60 text-sm max-w-xs">
                      {assignment.feedback !== ""
                        ? assignment.feedback
                        : "—"}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyAssignments;