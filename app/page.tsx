"use client";

import {
  ArrowRight,
  Building2,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

const locations = [
  "Harare",
  "Bulawayo",
  "Gweru",
  "Mutare",
  "Kwekwe",
  "Kadoma",
  "Masvingo",
  "Chinhoyi",
  "Victoria Falls",
];

const featuredProperties = [
  {
    id: "1",
    title: "Modern 2 Bedroom House",
    location: "Bulawayo",
    price: "$450",
    period: "/month",
    rooms: "2 beds",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "2",
    title: "Secure Family Home",
    location: "Harare",
    price: "$700",
    period: "/month",
    rooms: "3 beds",
    type: "House",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "3",
    title: "Modern City Apartment",
    location: "Harare",
    price: "$85,000",
    period: "",
    rooms: "2 beds",
    type: "For Sale",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchType, setSearchType] = useState<"Rent" | "Buy">("Rent");
  const [location, setLocation] = useState("");
  const [showLocations, setShowLocations] = useState(false);

  const filteredLocations = locations.filter((item) =>
    item.toLowerCase().includes(location.toLowerCase()),
  );

  function handleSearch() {
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    params.set("category", searchType.toLowerCase());

    window.location.href = `/properties?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Navigation */}
      <header className="safe-top sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] shadow-lg shadow-blue-500/20">
              <Building2 size={19} strokeWidth={2.4} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Prop<span className="text-[#1877F2]">Link</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="/properties"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Find a Property
            </a>

            <a
              href="/list-property"
              className="text-sm text-white/70 transition hover:text-white"
            >
              List Property
            </a>

            <a
              href="/about"
              className="text-sm text-white/70 transition hover:text-white"
            >
              About
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/login"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white"
            >
              <UserRound size={16} />
              Sign in
            </a>

            <a
              href="/list-property"
              className="rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#1267d9]"
            >
              List a property
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="rounded-xl p-2 text-white/80 hover:bg-white/[0.06] md:hidden"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/[0.06] bg-[#090909] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              <a
                href="/properties"
                className="rounded-xl px-3 py-3 text-sm text-white/80 hover:bg-white/[0.05]"
              >
                Find a Property
              </a>

              <a
                href="/list-property"
                className="rounded-xl px-3 py-3 text-sm text-white/80 hover:bg-white/[0.05]"
              >
                List Property
              </a>

              <a
                href="/about"
                className="rounded-xl px-3 py-3 text-sm text-white/80 hover:bg-white/[0.05]"
              >
                About
              </a>

              <a
                href="/login"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold"
              >
                <UserRound size={16} />
                Sign in
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#1877F2]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/70">
              <Sparkles size={14} className="text-[#1877F2]" />
              Zimbabwe&apos;s property marketplace
            </div>

            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Find a place.
              <br />
              Find your{" "}
              <span className="text-[#1877F2]">next move.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
              Discover homes, apartments, land and commercial properties
              across Zimbabwe — or connect with people looking for your
              property.
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="rounded-2xl border border-white/10 bg-[#101010]/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="flex gap-1 border-b border-white/[0.06] px-1 pb-2">
                {(["Rent", "Buy"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSearchType(type)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      searchType === type
                        ? "bg-[#1877F2] text-white"
                        : "text-white/50 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                <div className="relative flex-1">
                  <div className="flex min-h-14 items-center gap-3 rounded-xl bg-white/[0.04] px-4">
                    <MapPin size={19} className="shrink-0 text-white/45" />

                    <input
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                        setShowLocations(true);
                      }}
                      onFocus={() => setShowLocations(true)}
                      placeholder="Where are you looking?"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                    />

                    {location && (
                      <button
                        type="button"
                        onClick={() => {
                          setLocation("");
                          setShowLocations(false);
                        }}
                        className="text-white/30 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {showLocations && location && filteredLocations.length > 0 && (
                    <div className="absolute left-0 right-0 top-[60px] z-20 overflow-hidden rounded-xl border border-white/10 bg-[#141414] p-1 shadow-2xl">
                      {filteredLocations.slice(0, 5).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setLocation(item);
                            setShowLocations(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-white/75 hover:bg-white/[0.06] hover:text-white"
                        >
                          <MapPin size={15} className="text-[#1877F2]" />
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-7 text-sm font-bold transition hover:bg-[#1267d9] sm:min-w-36"
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-white/35">
              <span>Homes</span>
              <span>•</span>
              <span>Apartments</span>
              <span>•</span>
              <span>Commercial</span>
              <span>•</span>
              <span>Land</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/[0.06] px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
          <div className="flex items-center justify-center gap-3 py-5 sm:justify-start sm:px-6">
            <ShieldCheck className="text-[#1877F2]" size={20} />
            <div>
              <p className="text-sm font-semibold">Built for Zimbabwe</p>
              <p className="text-xs text-white/40">
                Local property marketplace
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-5 sm:px-6">
            <Search className="text-[#1877F2]" size={20} />
            <div>
              <p className="text-sm font-semibold">Find faster</p>
              <p className="text-xs text-white/40">
                Search properties your way
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-5 sm:justify-end sm:px-6">
            <Building2 className="text-[#1877F2]" size={20} />
            <div>
              <p className="text-sm font-semibold">List your property</p>
              <p className="text-xs text-white/40">
                Reach people looking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1877F2]">
              Explore
            </p>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured properties
            </h2>

            <p className="mt-2 text-sm text-white/45">
              Properties people are looking at right now.
            </p>
          </div>

          <a
            href="/properties"
            className="hidden items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white sm:flex"
          >
            View all
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <a
              href={`/properties/${property.id}`}
              key={property.id}
              className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101010] transition hover:-translate-y-1 hover:border-white/[0.14]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <span className="absolute left-3 top-3 rounded-lg bg-black/65 px-2.5 py-1.5 text-[11px] font-semibold backdrop-blur-md">
                  {property.type}
                </span>

                <button
                  type="button"
                  onClick={(event) => event.preventDefault()}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md transition hover:bg-black/80"
                  aria-label="Save property"
                >
                  <Heart size={16} />
                </button>
              </div>

              <div className="p-4">
                <h3 className="truncate font-semibold">{property.title}</h3>

                <div className="mt-2 flex items-center gap-1.5 text-sm text-white/45">
                  <MapPin size={14} />
                  {property.location}
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-lg font-bold">
                      {property.price}
                    </span>

                    {property.period && (
                      <span className="text-xs text-white/40">
                        {property.period}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-white/40">
                    {property.rooms}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <a
          href="/properties"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.04] hover:text-white sm:hidden"
        >
          View all properties
          <ArrowRight size={16} />
        </a>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d0d0d]">
          <div className="absolute right-[-100px] top-[-150px] h-[350px] w-[350px] rounded-full bg-[#1877F2]/15 blur-[100px]" />

          <div className="relative flex flex-col gap-8 p-7 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1877F2]">
                Property owners
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                Have a property to rent or sell?
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/45 sm:text-base">
                Put your property in front of people actively looking for
                their next place.
              </p>
            </div>

            <a
              href="/list-property"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-6 py-3.5 text-sm font-bold transition hover:bg-[#1267d9]"
            >
              List your property
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1877F2]">
              <Building2 size={14} />
            </div>

            <span className="text-sm font-bold">
              Prop<span className="text-[#1877F2]">Link</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/35">
            <a href="/help" className="hover:text-white">
              Help
            </a>
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
          </div>

          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} PropLink
          </p>
        </div>
      </footer>
    </main>
  );
}
