'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/lib/config';

interface Job {
  _id: string;
  title: string;
  description: string;
  location?: string;
  jobType?: string;
  
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data: Job[] = await res.json();
        setJobs(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Jobs</h1>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 my-2">
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          {job.location && <p>Location: {job.location}</p>}
          {job.jobType && <p>Type: {job.jobType}</p>}
        </div>
      ))}
    </div>
  );
}