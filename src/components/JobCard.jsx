/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  // console.log(job);
  const formatDate = format(new Date(job.date.startDate), "dd/MM/yyyy");

  return (
    <Link
      to={`/job/${job._id}`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all "
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">
          Deadline: {formatDate}
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
          {job.category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {job.job_title}
        </h1>
        <p className="mt-2 text-sm text-gray-600 ">{job.description}</p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Range: $ {job.priceRange.min} - $ {job.priceRange.max}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Total Bids: {job.bids_count}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
