import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import useAuth from "../Providers/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import axiosSecure from "../utils/axiosSecure";

const AllAssignments = () => {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const numberOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPage).keys()]

const handleCount = async() => {
  const {data} = await axios.get(`${import.meta.env.VITE_APIURL}/count`)
  setCount(data.count);
}

  useEffect(() => {
  handleCount()
  },[])

  const { data: assignments = [], isLoading, refetch } = useQuery({
    queryKey: ["assignments", currentPage, itemPerPage],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APIURL}/all-assignments?page=${currentPage}&size=${itemPerPage}`,
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

  // handle delete assignment
  const handleDelete = (id) => {
    axiosSecure.delete(`/assignments/${id}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          toast.dismiss('delete-confirm');
          toast.success("Assignment deleted successfully!");
          refetch();
        }
      })
  };

  // handle delet mordern toast
const handleModernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <p className="font-medium">Are you sure?</p>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm bg-red-500 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Delete
          </button>
          <button
            className="btn btn-sm bg-green-500 text-white"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), { 
      duration: Infinity,
      id: 'delete-confirm' 
    });
  };


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
                  <span className={`badge text-xs ${
                    assignment.difficulty === "easy"
                      ? "badge-success"
                      : assignment.difficulty === "medium"
                      ? "badge-warning"
                      : "badge-error"
                  }`}>
                    {assignment.difficulty}
                  </span>
                </div>

                {/* Due Date */}
                <p className="text-xs text-base-content/50 mt-1">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>

                {/* Buttons */}
                <div className="card-actions justify-end mt-2 gap-2">

                  {/* View */}
                  <Link
                    to={`/assignments/${assignment._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>

                  {/* Update */}
                  {user?.email === assignment.creatorEmail ? (
                    <div className="tooltip tooltip-success" data-tip="Edit Assignment">
                      <Link
                        to={`/update/${assignment._id}`}
                        className="btn btn-outline btn-sm"
                      >
                        Update
                      </Link>
                    </div>
                  ) : (
                    <div className="tooltip tooltip-error" data-tip="Only Creator Can Edit This">
                      <button className="btn btn-sm" disabled>Update</button>
                    </div>
                  )}

                  {/* Delete */}
                  {user?.email === assignment.creatorEmail ? (
                    <div className="tooltip tooltip-success" data-tip="Delete Assignment">
                      <button
                        onClick={() => handleModernDelete(assignment._id)}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="tooltip tooltip-error tooltip-left" data-tip="Only Creator Can Delete This">
                      <button className="btn btn-sm" disabled>Delete</button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination btn */}
      <div className="flex items-center justify-center gap-4 my-10">
   
          <button className="btn btn-sm" disabled={currentPage === 0} onClick={() =>setCurrentPage(currentPage - 1)}>Prev</button>
      
        {
          pages.map(page => 
            <button onClick={() =>setCurrentPage(page)} key={page} className={`join-item btn ${currentPage === page ? 'bg-orange-500 text-white' : ''}`}>{page + 1}</button>
          )
        }
        <button onClick={()=> setCurrentPage(currentPage + 1)} disabled={currentPage === numberOfPage - 1} className="btn btn-sm">Next</button>
      </div>
    </div>
  );
};

export default AllAssignments;