import Hero from '@/components/Hero'
import JobsPage from '@/components/Jobs'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen ">
      <div className='bg-gradient-to-b from-blue-100 to-white'>
      <Navbar />
      <Hero />
      </div>
      <JobsPage/>
    </main>
  )
}
