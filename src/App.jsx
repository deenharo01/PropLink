import { useState } from "react";
import "./index.css";

const properties = [
  {
    id: 1,
    title: "Modern 2 Bedroom Home",
    location: "Harare",
    price: 500,
    type: "House",
    bedrooms: 2,
    image: "https://picsum.photos/seed/hararehouse/800/600",
  },
  {
    id: 2,
    title: "Spacious Family House",
    location: "Bulawayo",
    price: 650,
    type: "House",
    bedrooms: 3,
    image: "https://picsum.photos/seed/bulawayohouse/800/600",
  },
  {
    id: 3,
    title: "Student Accommodation",
    location: "Gweru",
    price: 200,
    type: "Room",
    bedrooms: 1,
    image: "https://picsum.photos/seed/gweruroom/800/600",
  },
  {
    id: 4,
    title: "Furnished Apartment",
    location: "Mutare",
    price: 800,
    type: "Apartment",
    bedrooms: 2,
    image: "https://picsum.photos/seed/mutareapartment/800/600",
  },
  {
    id: 5,
    title: "Affordable 3 Bedroom House",
    location: "Harare",
    price: 700,
    type: "House",
    bedrooms: 3,
    image: "https://picsum.photos/seed/house5/800/600",
  },
  {
    id: 6,
    title: "Bachelor Apartment",
    location: "Bulawayo",
    price: 300,
    type: "Apartment",
    bedrooms: 1,
    image: "https://picsum.photos/seed/apartment6/800/600",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [propertyType, setPropertyType] = useState("All types");
  const [maxPrice, setMaxPrice] = useState("");
  const [showListing, setShowListing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "All locations" ||
      property.location === location;

    const matchesType =
      propertyType === "All types" ||
      property.type === propertyType;

    const matchesPrice =
      !maxPrice || property.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesPrice
    );
  });

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          Prop<span>Link</span>
        </div>

        <nav className="nav-links">
          <a href="#properties">Find a place</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="primary-button"
          onClick={() => setShowListing(true)}
        >
          List Property
        </button>
      </header>

      {/* HERO */}
      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="hero-badge">
              Zimbabwe's property marketplace
            </div>

            <h1>
              Find your next
              <span> place.</span>
            </h1>

            <p>
              Discover homes, apartments, rooms and commercial
              properties across Zimbabwe — and connect directly
              with the people behind them.
            </p>

            {/* SEARCH */}
            <div className="search-panel">

              <div className="search-main">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search by city, area or property..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All locations</option>
                <option>Harare</option>
                <option>Bulawayo</option>
                <option>Gweru</option>
                <option>Mutare</option>
              </select>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option>All types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Room</option>
              </select>

              <button
                className="search-button"
                onClick={() =>
                  document
                    .getElementById("properties")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Search
              </button>

            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Properties</span>
              </div>

              <div>
                <strong>4</strong>
                <span>Cities</span>
              </div>

              <div>
                <strong>Direct</strong>
                <span>Connections</span>
              </div>
            </div>

          </div>

        </section>

        {/* PROPERTY SECTION */}
        <section
          className="properties-section"
          id="properties"
        >

          <div className="section-heading">

            <div>
              <span className="section-label">
                EXPLORE
              </span>

              <h2>Find a place that fits.</h2>

              <p>
                Browse properties from people and businesses
                looking for tenants or buyers.
              </p>
            </div>

            <div className="results-count">
              {filteredProperties.length} properties
            </div>

          </div>

          {/* FILTER BAR */}
          <div className="filter-bar">

            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            {(search ||
              location !== "All locations" ||
              propertyType !== "All types" ||
              maxPrice) && (

              <button
                className="clear-button"
                onClick={() => {
                  setSearch("");
                  setLocation("All locations");
                  setPropertyType("All types");
                  setMaxPrice("");
                }}
              >
                Clear filters
              </button>
            )}

          </div>

          {/* GRID */}
          <div className="property-grid">

            {filteredProperties.length > 0 ? (

              filteredProperties.map((property) => (

                <article
                  className="property-card"
                  key={property.id}
                  onClick={() => setSelectedProperty(property)}
                >

                  <div className="property-image-wrapper">

                    <img
                      src={property.image}
                      alt={property.title}
                      className="property-image"
                    />

                    <span className="property-type">
                      {property.type}
                    </span>

                  </div>

                  <div className="property-info">

                    <div className="property-price">
                      ${property.price}
                      <small>/month</small>
                    </div>

                    <h3>{property.title}</h3>

                    <p className="property-location">
                      📍 {property.location}
                    </p>

                    <div className="property-details">
                      <span>
                        🛏 {property.bedrooms} bedroom
                        {property.bedrooms > 1 ? "s" : ""}
                      </span>

                      <span>
                        View details →
                      </span>
                    </div>

                  </div>

                </article>

              ))

            ) : (

              <div className="empty-state">
                <h3>No properties found</h3>
                <p>
                  Try another location, property type or price.
                </p>
              </div>

            )}

          </div>

        </section>

        {/* HOW IT WORKS */}
        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="section-heading centered">

            <span className="section-label">
              SIMPLE
            </span>

            <h2>How PropLink works</h2>

            <p>
              Finding a place shouldn't be complicated.
            </p>

          </div>

          <div className="steps">

            <div className="step">
              <div className="step-number">01</div>

              <h3>Search</h3>

              <p>
                Tell PropLink what kind of property
                you're looking for.
              </p>
            </div>

            <div className="step">
              <div className="step-number">02</div>

              <h3>Discover</h3>

              <p>
                Compare available properties,
                locations and prices.
              </p>
            </div>

            <div className="step">
              <div className="step-number">03</div>

              <h3>Connect</h3>

              <p>
                Contact the owner or property
                representative directly.
              </p>
            </div>

          </div>

        </section>

        {/* OWNER CTA */}
        <section className="owner-section">

          <div className="owner-content">

            <span className="section-label">
              PROPERTY OWNERS
            </span>

            <h2>
              Have a property?
              <br />
              Put it on PropLink.
            </h2>

            <p>
              Reach people actively searching for
              somewhere to live, work or invest.
            </p>

            <button
              className="primary-button large"
              onClick={() => setShowListing(true)}
            >
              List Your Property →
            </button>

          </div>

          <div className="owner-decoration">
            <div className="decoration-card">
              <span>New listing</span>
              <strong>3 Bedroom House</strong>
              <small>Harare • $750/month</small>
            </div>
          </div>

        </section>

        {/* ABOUT */}
        <section
          className="about-section"
          id="about"
        >

          <div>
            <span className="section-label">
              ABOUT PROPLINK
            </span>

            <h2>
              Making property
              <span> easier.</span>
            </h2>
          </div>

          <p>
            PropLink is being built to make property discovery
            simpler in Zimbabwe. Instead of searching through
            scattered listings and unnecessary middlemen,
            people can find properties and connect directly
            with the people offering them.
          </p>

        </section>

      </main>

      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          Prop<span>Link</span>
        </div>

        <p>
          Find it. Link up. Move in.
        </p>

        <p>
          © 2026 PropLink
        </p>

      </footer>

      {/* PROPERTY MODAL */}
      {selectedProperty && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedProperty(null)}
        >

          <div
            className="property-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedProperty(null)}
            >
              ×
            </button>

            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
            />

            <div className="modal-content">

              <span className="property-type">
                {selectedProperty.type}
              </span>

              <h2>{selectedProperty.title}</h2>

              <p className="modal-location">
                📍 {selectedProperty.location}
              </p>

              <div className="modal-price">
                ${selectedProperty.price}
                <small>/month</small>
              </div>

              <div className="modal-info">
                <span>
                  🛏 {selectedProperty.bedrooms} Bedrooms
                </span>

                <span>
                  ✓ Available
                </span>
              </div>

              <button
                className="primary-button full"
                onClick={() =>
                  alert(
                    "Direct owner contact will be connected here in the next PropLink version."
                  )
                }
              >
                Contact Owner
              </button>

            </div>

          </div>

        </div>

      )}

      {/* LIST PROPERTY MODAL */}
      {showListing && (

        <div
          className="modal-overlay"
          onClick={() => setShowListing(false)}
        >

          <div
            className="listing-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowListing(false)}
            >
              ×
            </button>

            <span className="section-label">
              PROPERTY OWNERS
            </span>

            <h2>List your property</h2>

            <p>
              This is the beginning of the PropLink
              property-listing system.
            </p>

            <input
              type="text"
              placeholder="Property title"
            />

            <input
              type="text"
              placeholder="Location"
            />

            <input
              type="number"
              placeholder="Monthly price"
            />

            <select>
              <option>Property type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Room</option>
              <option>Commercial</option>
            </select>

            <button
              className="primary-button full"
              onClick={() =>
                alert(
                  "Listing submission will be connected to the PropLink backend next."
                )
              }
            >
              Continue
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
