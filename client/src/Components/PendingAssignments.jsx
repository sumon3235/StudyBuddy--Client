import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../Providers/useAuth";

const PendingAssignments = () => {
    const { user } = useAuth();
  const { data: pendingAssignments = [], isLoading } = useQuery({
    queryKey: ["pending-assignments"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_APIURL}/submissions`);
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="overflow-x-auto p-8">
      <h2 className="text-2xl font-bold mb-4">
        Pending Assignments: {pendingAssignments.length}
      </h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Marks</th>
            <th>Examinee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingAssignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.assignmentTitle}</td>
              <td>{assignment.totalMarks}</td>
              <td>{assignment.examinee_email}</td>
              <td>
                {assignment.examinee_email === user?.email ? (
                  <span className="badge badge-ghost px-2 py-1">My Submission</span>
                ) : (
                  <Link
                    to={`/give-marks/${assignment._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Give Marks
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingAssignments;
