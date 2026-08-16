import { useMemo, useState } from "react";
import "./index.css";

const properties = [
  {
    id: 1,
    title: "Modern 2 Bedroom Home",
    location: "Harare",
    area: "Eastlea",
    price: 500,
    type: "House",
    listing: "Rent",
    rooms: 2,
    image: "https://picsum.photos/seed/proplink-harare/900/650",
  },
  {
    id: 2,
    title: "Spacious Family House",
    location: "Bulawayo",
    area: "Suburbs",
    price: 650,
    type: "House",
    listing: "Rent",
    rooms: 3,
    image: "https://picsum.photos/seed/proplink-bulawayo/900/650",
  },
  {
    id: 3,
    title: "Student Accommodation",
    location: "Gweru",
    area: "CBD",
    price: 200,
    type: "Room",
    listing: "Rent",
    rooms: 1,
    image: "https://picsum.photos/seed/proplink-gweru/900/650",
  },
  {
    id: 4,
    title: "Furnished Apartment",
    location: "Mutare",
    area: "Avenues",
    price: 800,
    type: "Apartment",
    listing: "Rent",
    rooms: 2,
    image: "https://picsum.photos/seed/proplink-mutare/900/650",
  },
  {
    id: 5,
    title: "Executive 4 Bedroom House",
    location: "Harare",
    area: "Borrowdale",
    price: 185000,
    type: "House",
    listing: "Buy",
    rooms: 4,
    image: "https://picsum.photos/seed/proplink-borrowdale/900/650",
  },
  {
    id: 6,
    title: "Bachelor Apartment",
    location: "Bulawayo",
    area: "CBD",
    price: 300,
    type: "Apartment",
    listing: "Rent",
    rooms: 1,
    image: "https://picsum.photos/seed/proplink-apartment/900/650",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("Rent");
  const [location, setLocation] = useState("All locations");
  const [showAll, setShowAll] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showListing, setShowListing] = useState(false);

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesMode = property.listing === mode;

      const matchesLocation =
        location === "All locations" ||
        property.location === location;

      const searchableText = `
        ${property.title}
        ${property.location}
        ${property.area}
        ${property.type}
        ${property.rooms}
      `.toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesMode && matchesLocation && matchesSearch;
    });
  }, [search, mode, location]);

  const visibleProperties = showAll
    ? filteredProperties
    : filteredProperties.slice(0, 4);

  function handleSearch(event) {
    event.preventDefault();
    document
      .getElementById("properties")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function changeMode(newMode) {
    setMode(newMode);
    setShowAll(false);
  }

  return (
    <div className="app">

      {/* NAVIGATION */}
      <nav className="navbar">
        <button
          className="logo"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          Prop<span>Link</span>
        </button>

        <div className="nav-links">
          <a
            href="#properties"
            onClick={() => changeMode("Rent")}
          >
            Rent
          </a>

          <a
            href="#properties"
            onClick={() => changeMode("Buy")}
          >
            Buy
          </a>

          <a href="#how-it-works">
            How it works
          </a>

          <a href="#contact">
            Contact
          </a>
        </div>

        <button
          className="nav-button"
          onClick={() => setShowListing(true)}
        >
          List Property
        </button>
      </nav>


      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <div className="badge">
            Zimbabwe's property marketplace
          </div>

          <h1>
            Find a place.
            <br />
            <span>Connect directly.</span>
          </h1>

          <p>
            Find homes, rooms, apartments and properties
            across Zimbabwe. Connect directly with the
            people who have them.
          </p>


          {/* SEARCH */}
          <form
            className="search-box"
            onSubmit={handleSearch}
          >
            <div className="search-icon">
              ⌕
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search Harare, Bulawayo, Gweru..."
            />

            <button type="submit">
              Search
            </button>
          </form>


          {/* SEARCH CONTROLS */}
          <div className="search-controls">

            <button
              className={mode === "Rent" ? "active" : ""}
              onClick={() => changeMode("Rent")}
              type="button"
            >
              Rent
            </button>

            <button
              className={mode === "Buy" ? "active" : ""}
              onClick={() => changeMode("Buy")}
              type="button"
            >
              Buy
            </button>

            <select
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
            >
              <option>All locations</option>
              <option>Harare</option>
              <option>Bulawayo</option>
              <option>Gweru</option>
              <option>Mutare</option>
            </select>

          </div>

        </div>
      </section>


      {/* PROPERTIES */}
      <section
        className="section"
        id="properties"
      >
        <div className="section-header">

          <div>
            <span className="section-label">
              DISCOVER
            </span>

            <h2>
              {mode === "Rent"
                ? "Places to rent"
                : "Properties for sale"}
            </h2>
          </div>

          <button
            className="view-all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : "View all →"}
          </button>

        </div>


        {visibleProperties.length > 0 ? (
          <div className="property-grid">

            {visibleProperties.map((property) => (
              <article
                className="property-card"
                key={property.id}
                onClick={() =>
                  setSelectedProperty(property)
                }
              >

                <div className="property-image-wrapper">

                  <img
                    className="property-image"
                    src={property.image}
                    alt={property.title}
                  />

                  <span className="property-type">
                    {property.type}
                  </span>

                </div>

                <div className="property-info">

                  <div className="property-title">
                    {property.title}
                  </div>

                  <div className="property-location">
                    {property.area}, {property.location}
                  </div>

                  <div className="property-bottom">

                    <span className="price">
                      {property.listing === "Buy"
                        ? `$${property.price.toLocaleString()}`
                        : `$${property.price}/month`}
                    </span>

                    <span className="rooms">
                      {property.rooms}{" "}
                      {property.rooms === 1
                        ? "room"
                        : "rooms"}
                    </span>

                  </div>

                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="empty-state">
            <div>⌕</div>
            <h3>No properties found</h3>
            <p>
              Try another location or search term.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setLocation("All locations");
              }}
            >
              Clear search
            </button>
          </div>
        )}

      </section>


      {/* HOW IT WORKS */}
      <section
        className="section how-section"
        id="how-it-works"
      >

        <div className="section-header">
          <div>
            <span className="section-label">
              SIMPLE
            </span>

            <h2>
              How PropLink works
            </h2>
          </div>
        </div>


        <div className="features">

          <div className="feature">
            <div className="feature-number">
              01
            </div>

            <h3>
              Search
            </h3>

            <p>
              Tell PropLink what kind of place
              you are looking for and where you
              want to live.
            </p>
          </div>


          <div className="feature">
            <div className="feature-number">
              02
            </div>

            <h3>
              Discover
            </h3>

            <p>
              Browse available properties and
              compare the places that match
              your needs.
            </p>
          </div>


          <div className="feature">
            <div className="feature-number">
              03
            </div>

            <h3>
              Connect
            </h3>

            <p>
              Contact the property owner directly
              and arrange your viewing.
            </p>
          </div>

        </div>

      </section>


      {/* OWNER CTA */}
      <section className="cta">

        <div>
          <span className="section-label">
            FOR PROPERTY OWNERS
          </span>

          <h2>
            Have a property?
          </h2>

          <p>
            Put your property in front of people
            actively looking for a place.
          </p>
        </div>

        <button
          onClick={() => setShowListing(true)}
        >
          List Your Property
        </button>

      </section>


      {/* FOOTER */}
      <footer id="contact">

        <div>
          <strong>
            Prop<span>Link</span>
          </strong>

          <p>
            Find it. Link up. Move in.
          </p>
        </div>

        <div>
          © 2026 PropLink
        </div>

      </footer>


      {/* PROPERTY MODAL */}
      {selectedProperty && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProperty(null)
              }
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

              <h2>
                {selectedProperty.title}
              </h2>

              <p className="modal-location">
                {selectedProperty.area},{" "}
                {selectedProperty.location}
              </p>

              <div className="modal-details">

                <strong>
                  {selectedProperty.listing === "Buy"
                    ? `$${selectedProperty.price.toLocaleString()}`
                    : `$${selectedProperty.price}/month`}
                </strong>

                <span>
                  {selectedProperty.rooms} rooms
                </span>

              </div>

              <button
                className="modal-primary"
                onClick={() =>
                  alert(
                    "Owner contact will be available in the next PropLink version."
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
            className="modal listing-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setShowListing(false)
              }
            >
              ×
            </button>

            <div className="modal-content">

              <span className="section-label">
                PROPERTY OWNERS
              </span>

              <h2>
                List your property
              </h2>

              <p className="modal-description">
                In the full PropLink platform, owners
                will be able to create an account,
                upload their property and receive
                enquiries directly from potential
                tenants or buyers.
              </p>

              <input
                className="form-input"
                placeholder="Property title"
              />

              <input
                className="form-input"
                placeholder="Location"
              />

              <input
                className="form-input"
                placeholder="Monthly rent / sale price"
              />

              <button
                className="modal-primary"
                onClick={() =>
                  alert(
                    "Property listing functionality will be connected to the PropLink backend next."
                  )
                }
              >
                Continue
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
