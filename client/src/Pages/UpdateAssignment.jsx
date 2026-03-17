import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const UpdateAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState(null);

  // GET single assignment
  const { data: assignment = {}, isLoading } = useQuery({
    queryKey: ["assignment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${id}`
      );
      setDueDate(new Date(res.data.dueDate));
      return res.data;
    },
  });

  // PUT — update assignment
  const { mutate, isPending } = useMutation({
    mutationFn: (updatedAssignment) => {
      return axiosSecure.put(`/assignments/${id}`,
        updatedAssignment
      );
    },
    onSuccess: () => {
      toast.success("Assignment updated successfully!");
      navigate("/all-assignments");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedAssignment = {
      title: form.title.value,
      description: form.description.value,
      marks: form.marks.value,
      thumbnail: form.thumbnail.value,
      difficulty: form.difficulty.value,
      dueDate: dueDate,
    };

    mutate(updatedAssignment);
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
          <h2 className="nunito-font text-4xl font-bold">Update Assignment</h2>
          <p className="text-base-content/60 mt-2">
            Update the assignment details below.
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <form onSubmit={handleSubmit} className="card-body gap-4">

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Assignment Title</span>
              </label>
              <input
                name="title"
                type="text"
                defaultValue={assignment.title}
                placeholder="Enter assignment title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                defaultValue={assignment.description}
                placeholder="Enter assignment description"
                className="textarea textarea-bordered w-full h-32"
                required
              />
            </div>

            {/* Marks & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Marks */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Total Marks</span>
                </label>
                <input
                  name="marks"
                  type="number"
                  defaultValue={assignment.marks}
                  placeholder="Enter total marks"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Difficulty */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Difficulty Level</span>
                </label>
                <select
                  name="difficulty"
                  defaultValue={assignment.difficulty}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

            </div>

            {/* Thumbnail & Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Thumbnail */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Thumbnail Image URL</span>
                </label>
                <input
                  name="thumbnail"
                  type="url"
                  defaultValue={assignment.thumbnail}
                  placeholder="Enter image URL"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Due Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Due Date</span>
                </label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  placeholderText="Select due date"
                  minDate={new Date()}
                  wrapperClassName="w-full"
                  className="input input-bordered w-full"
                  required
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="form-control mt-2">
              <button
                disabled={isPending}
                type="submit"
                className="btn btn-primary w-full"
              >
                {isPending ? "Updating..." : "Update Assignment"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default UpdateAssignment;