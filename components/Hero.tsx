import { Marquee } from "@/components/magicui/marquee";

const companies = [
    "Plaid",
    "GitHub",
    "Google",
    "Coinbase",
    "Booking.com",
    "Zapier"
  ];

export default function Hero() {
    return (
      <section className="text-center py-20 px-4 relative top-20">
        <p className="text-sm text-gray-800">100,000+ Appliers Already Trust Us</p>
        <h1 className="text-4xl md:text-8xl font-semibold mt-4 md:leading-24">
          Let <span className="text-blue-600">AI Find</span> the Job <br></br> that Finds You Back!
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          A leading job finder platform that matches talent with top companies in seconds.
        </p>
  
        <div className="mt-10 text-lg py-16 relative overflow-hidden">
  <p className="text-center mb-6 text-gray-400">
    Trusted by 2 million+ companies
  </p>

  <div className="relative z-20">
    <Marquee pauseOnHover className="[--duration:30s] gap-20">
      {companies.map((company, index) => (
        <div key={index} className="font-semibold text-3xl mx-10">
          {company}
        </div>
      ))}
    </Marquee>
  </div>
</div>
      </section>
    )
  }
  