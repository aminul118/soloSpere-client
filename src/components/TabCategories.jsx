/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);
  const categories = [
    "Web Development",
    "Graphics Design",
    "Digital Marketing",
  ]; // ক্যাটাগরি লিস্ট

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Browse Jobs By Categories
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          Three categories available for the time being. They are Web
          Development, Graphics Design, and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>

        <div className="flex justify-center ">
          {/* Tab List */}
          <TabList>
            {categories.map((category, index) => (
              <Tab key={index}>{category}</Tab>
            ))}
          </TabList>
        </div>

        {/* Tab Panels */}
        {categories.map((category, index) => (
          <TabPanel key={index}>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs
                ?.filter((job) => job.category === category) // ক্যাটাগরি ফিল্টার
                .map((job, idx) => (
                  <JobCard key={idx} job={job} /> // প্রতিটি জব কার্ড রেন্ডার
                ))}
            </div>
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default TabCategories;
