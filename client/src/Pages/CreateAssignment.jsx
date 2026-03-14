import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../Providers/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation } from '@tanstack/react-query';

const CreateAssignment = () => {
  const { user } = useAuth();
  const [dueDate, setDueDate] = useState(null);

  // Post a Date With Transtack Query
  const {mutate, isPending} = useMutation({
    mutationFn: (assignment) => {
      return axios.post(
        `${import.meta.env.VITE_APIURL}/add-assignments`,
        assignment,
      );
    },
    onSuccess: () => {
      toast.success("Assignments Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

      const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const assignment = {
      title: form.title.value,
      description: form.description.value,
      marks: form.marks.value,
      thumbnail: form.thumbnail.value,
      difficulty: form.difficulty.value,
      dueDate: dueDate,
      creatorEmail: user?.email,
      creatorName: user?.displayName,
    };

    mutate(assignment, {
      onSuccess: () => {
        form.reset();
        setDueDate(null);
      }
    })
  };



  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="nunito-font text-4xl font-bold">Create Assignment</h2>
          <p className="text-base-content/60 mt-2">
            Create a new assignment for your friends to complete.
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
                placeholder="Enter assignment description"
                className="textarea textarea-bordered w-full h-32"
                required
              />
            </div>

            {/* Marks & Difficulty — same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Marks */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Total Marks</span>
                </label>
                <input
                  name="marks"
                  type="number"
                  placeholder="Enter total marks"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Difficulty */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Difficulty Level
                  </span>
                </label>
                <select
                  name="difficulty"
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

            {/* Thumbnail & Due Date — same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Thumbnail */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Thumbnail Image URL
                  </span>
                </label>
                <input
                  name="thumbnail"
                  type="url"
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
              <button disabled={isPending} type="submit" className="btn btn-primary w-full">
                {isPending ? 'Creating...' : 'Create Assignment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
