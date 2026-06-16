import { Link } from "react-router-dom";
import { BookOpen, Users, Award, CheckCircle, ArrowRight } from "lucide-react";

const courses = [
  {
    title: "Tyre Repair Fundamentals",
    duration: "1 Day",
    level: "Foundation",
    description: "Covers the basics of safe tyre inspection, injury identification, repair selection and cold vulcanisation techniques for passenger and light truck tyres.",
    outcomes: ["Injury classification and repair limits", "Cold cement and patch selection", "Surface preparation and buffing technique", "Repair quality assessment"],
  },
  {
    title: "Advanced Radial Tyre Repair",
    duration: "2 Days",
    level: "Advanced",
    description: "In-depth training on multi-layer radial repair techniques for truck, bus and OTR tyres including steel belt repairs and unit patch application.",
    outcomes: ["Steel belt injury assessment", "Unit patch and plug selection", "Hot vulcanisation setup and operation", "TRIC repair standards compliance"],
  },
  {
    title: "Tyre Workshop Safety",
    duration: "Half Day",
    level: "All Levels",
    description: "Mandatory safety training for tyre workshop personnel covering PPE, inflation safety, split rim handling and hazard identification.",
    outcomes: ["Safety cage use and inflation procedures", "Split rim identification and safety", "PPE selection and usage", "Workshop hazard register management"],
  },
  {
    title: "TPMS Service & Programming",
    duration: "1 Day",
    level: "Technical",
    description: "Hands-on training with TPMS service tools, sensor programming, relearn procedures and fault diagnosis across major vehicle platforms.",
    outcomes: ["TPMS system overview and sensor types", "Sensor activation and programming", "Relearn procedures by make/model", "Common fault codes and diagnosis"],
  },
  {
    title: "Wheel Balancing & Torquing",
    duration: "1 Day",
    level: "Foundation",
    description: "Practical training on wheel balancing techniques, weight selection, torque wrench use and wheel nut safety for passenger and commercial vehicles.",
    outcomes: ["Static vs dynamic balancing", "Weight type and placement selection", "Torque wrench calibration and technique", "Wheel nut safety indicators"],
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--color-offwhite)' }}>
      <section className="border-b border-white/10 py-14" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-yellow)' }}>
            Training & Education
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Industry Training<br />from the Experts
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            ITS delivers practical, industry-relevant training for tyre technicians, workshop owners and fleet managers. All courses are delivered by experienced tyre industry professionals from our Dandenong South facility.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { icon: BookOpen, title: "Practical & Hands-On", text: "All training is conducted with the products and equipment your team uses daily." },
            { icon: Users, title: "Group & On-Site Options", text: "Group training at our Dandenong South facility or on-site at your workshop for teams of 4+." },
            { icon: Award, title: "Certificate of Completion", text: "Participants receive an ITS training certificate upon successful completion." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white border border-zinc-200 rounded-lg p-6 text-center">
              <div
                className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'var(--color-teal)' }}
              >
                <Icon size={22} className="text-white" />
              </div>
              <h3
                className="font-bold text-base mb-2"
                style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
              >
                {title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-teal)' }}>
          Available Courses
        </div>
        <h2
          className="text-3xl font-bold mb-8"
          style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
        >
          Our Training Catalogue
        </h2>
        <div className="space-y-5">
          {courses.map((course) => (
            <div key={course.title} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--color-charcoal)' }}
                    >
                      {course.title}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded text-white"
                        style={{ background: 'var(--color-teal)' }}
                      >
                        {course.duration}
                      </span>
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                        style={{ background: '#fef9e7', color: '#92400e' }}
                      >
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap"
                    style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
                  >
                    Enquire <ArrowRight size={13} />
                  </Link>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4">{course.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {course.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-2 text-xs text-zinc-500">
                      <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-teal)' }} />
                      {o}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12" style={{ background: 'var(--color-teal)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-bold text-2xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Book a Training Session
            </div>
            <p className="text-white/70 mt-1 text-sm">Contact us to discuss scheduling and pricing for your team.</p>
          </div>
          <Link
            to="/contact"
            className="px-8 py-3.5 font-bold uppercase tracking-wide rounded transition-colors whitespace-nowrap"
            style={{ background: 'var(--color-yellow)', color: 'var(--color-charcoal)', fontFamily: 'Oswald, sans-serif' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ffc61a')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-yellow)')}
          >
            Enquire Now
          </Link>
        </div>
      </section>
    </div>
  );
}
