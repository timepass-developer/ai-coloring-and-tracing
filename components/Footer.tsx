import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white/92 px-6 py-14 text-slate-700 shadow-inner md:px-12 lg:px-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3 text-center md:text-left">
          <div className="text-2xl font-extrabold text-[#FF4C4C]">Kiwiz</div>
          <p className="text-sm text-slate-600">
            Printable adventures for curious kids. Create colouring pages, tracing sheets, and learning prompts in seconds.
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Kiwiz. Bringing joyful printables to families, teachers, and therapists worldwide.
          </p>
        </div>

        <div className="grid flex-1 gap-8 text-center text-sm text-slate-600 md:grid-cols-3 md:text-left">
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-slate-900">Discover</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="hover:text-[#FF4C4C]">
                  Start Creating
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-[#FF4C4C]">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/parenting-newsletter" className="hover:text-[#FF4C4C]">
                  Parenting Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-slate-900">Learn</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/how-to-use" className="hover:text-[#FF4C4C]">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#FF4C4C]">
                  About Kiwiz
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#FF4C4C]">
                  Dashboard Preview
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-slate-900">Support</h5>
            <ul className="space-y-2">
              <li>
                <Link href="mailto:hello@kiwiz.app" className="hover:text-[#FF4C4C]">
                  hello@kiwiz.app
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-[#FF4C4C]">
                  Upgrade to Premium
                </Link>
              </li>
              <li>
                <Link href="/parenting-newsletter" className="hover:text-[#FF4C4C]">
                  Subscribe for tips
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}