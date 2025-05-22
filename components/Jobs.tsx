'use client';

import { useEffect, useState } from 'react';
import JobCard from '@/components/JobCard';
import { API_BASE_URL } from '@/lib/config';


interface Job {
  _id: string;
  title: string;
  description: string;
  location?: string;
  jobType?: string;
  
}

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [error, setError] = useState('');

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/jobs`);
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

  const fetchRecommendations = async () => {
    setRecommendLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const res = await fetch(`${API_BASE_URL}/job-recommendations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to fetch recommendations');
      }

      const data = await res.json();
      setRecommendations(data.jobs.slice(0, 3));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setRecommendLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Available Jobs</h2>
        {isLoggedIn && (
          <button
            onClick={fetchRecommendations}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            disabled={recommendLoading}
          >
            {recommendLoading ? 'Loading...' : 'Show Recommendations'}
          </button>
        )}
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {recommendations.length > 0 && (
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">Recommended Jobs for You</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((job: Job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job: Job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;