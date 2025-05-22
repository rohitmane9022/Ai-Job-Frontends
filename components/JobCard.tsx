import React from 'react';


interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  description?: string; 
  jobType?: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => (
  <div className="border p-5 rounded shadow-sm hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
    <p className="text-gray-600">
      {job.company} - {job.location}
    </p>
    <p className="text-sm mt-1 text-gray-500">{job.skills.join(', ')}</p>
  </div>
);

export default JobCard;