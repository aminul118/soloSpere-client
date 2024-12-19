import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { compareAsc, format } from "date-fns";

const JobDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const job = useLoaderData();
  const { job_title, category, description, priceRange, _id, email, date } =
    job;
  const dateFormat = format(new Date(date.startDate), "MM/dd/yyyy");

  // console.log(job);

  const dateCompare = compareAsc(new Date(date.startDate), new Date(startDate));
  // console.log("date Compare result", dateCompare);

  const handleBid = (e) => {
    e.preventDefault();
    const form = e.target;
    const price = form.price.value;
    const comment = form.comment.value;
    const newBid = {
      job_id: _id,
      applicant_email: user.email,
      bid_price: price,
      comment: comment,
      deadline: startDate,
    };
    console.log(priceRange.max, price);

    // Validation if bid price is higher than the maximum price. Then not to execute the code
    if (parseInt(price) > parseInt(priceRange.max))
      return toast.error(
        "You can not cross the maximum price which is offered"
      );

    // If requiter and bidder is a same person then not execute the code
    if (email === user.email)
      return toast.error("You are the requiter, You can not bid");
    // If dateline is over then return
    if (dateCompare === -1)
      return toast.error("Deadline crosses. Try another job");

    fetch(`${import.meta.env.VITE_API_URL}/bids`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Added Bid Successfully");
        }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 "></span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {job_title}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {category}
          </h1>
          <p> Deadline: {dateFormat}</p>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">
                Name: {user.displayName}
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">Email: {email}</p>
            </div>
            {/* <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src={user.photoURL} alt="" />
            </div> */}
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${priceRange.min} - ${priceRange.max}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleBid}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={new Date()}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
