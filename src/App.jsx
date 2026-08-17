import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { supabase } from "./supabaseClient";

const emptyListing = {
  title: "",
  description: "",
  location: "",
  city: "",
  price: "",
  listingType: "Rent",
  propertyType: "House",
  bedrooms: "1",
  bathrooms: "1",
  imageUrl: "",
};

function App() {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [propertyType, setPropertyType] =
    useState("All types");
  const [listingType, setListingType] =
    useState("All listings");
  const [maxPrice, setMaxPrice] = useState("");

  const [showListing, setShowListing] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState(null);
  const [contactProperty, setContactProperty] =
    useState(null);

  const [listingForm, setListingForm] =
    useState(emptyListing);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError("");

    const { data, error: supabaseError } =
      await supabase
        .from("properties")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (supabaseError) {
      console.error(supabaseError);
      setError(
        "Unable to load properties from PropLink."
      );
      setProperties([]);
    } else {
      setProperties(data || []);
    }

    setLoading(false);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const query = search.trim().toLowerCase();

      const searchableText = `
        ${property.title || ""}
        ${property.location || ""}
        ${property.city || ""}
        ${property.property_type || ""}
        ${property.listing_type || ""}
        ${property.description || ""}
      `.toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const matchesLocation =
        location === "All locations" ||
        property.city === location ||
        property.location === location;

      const matchesType =
        propertyType === "All types" ||
        property.property_type === propertyType;

      const matchesListingType =
        listingType === "All listings" ||
        property.listing_type === listingType;

      const matchesPrice =
        !maxPrice ||
        Number(property.price) <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesListingType &&
        matchesPrice
      );
    });
  }, [
    properties,
    search,
    location,
    propertyType,
    listingType,
    maxPrice,
  ]);

  const resetFilters = () => {
    setSearch("");
    setLocation("All locations");
    setPropertyType("All types");
    setListingType("All listings");
    setMaxPrice("");
  };

  const handleListingChange = (event) => {
    const { name, value } = event.target;

    setListingForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitListing = async (event) => {
    event.preventDefault();

    alert(
      "Property listing will be connected after PropLink authentication is added."
    );
  };

  const openProperty = (property) => {
    setSelectedProperty(property);
  };

  const closeProperty = () => {
    setSelectedProperty(null);
  };

  const handleContactOwner = (property) => {
    setContactProperty(property);
    setSelectedProperty(null);
  };

  const scrollToProperties = () => {
    document
      .getElementById("properties")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString();
  };

  const getImage = (property) => {
    return (
      property.image_url ||
      "https://picsum.photos/seed/proplink/800/600"
    );
  };

  const locations = [
    "All locations",
    "Harare",
    "Bulawayo",
    "Gweru",
    "Mutare",
  ];

  return (
    <div className="app">
      {/* NAVBAR */}

      <header className="navbar">
        <div className="logo">
          Prop<span>Link</span>
        </div>

        <nav className="nav-links">
          <a href="#properties">
            Find a place
          </a>

          <a href="#how-it-works">
            How it works
          </a>

          <a href="#about">
            About
          </a>
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
              Discover homes, apartments, rooms and
              commercial properties across Zimbabwe —
              and connect directly with the people behind
              them.
            </p>

            {/* SEARCH */}

            <div className="search-panel">
              <div className="search-main">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search by city, area or property..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      scrollToProperties();
                    }
                  }}
                />
              </div>

              <select
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
              >
                {locations.map((item) => (
                  <option key={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={propertyType}
                onChange={(event) =>
                  setPropertyType(event.target.value)
                }
              >
                <option>All types</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Room</option>
                <option>Commercial</option>
              </select>

              <button
                className="search-button"
                onClick={scrollToProperties}
              >
                Search
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>
                  {properties.length}+
                </strong>
                <span>Properties</span>
              </div>

              <div>
                <strong>4+</strong>
                <span>Cities</span>
              </div>

              <div>
                <strong>Direct</strong>
                <span>Connections</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROPERTY MARKETPLACE */}

        <section
          className="properties-section"
          id="properties"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">
                EXPLORE
              </span>

              <h2>
                Find a place that fits.
              </h2>

              <p>
                Browse properties from people and
                businesses looking for tenants or buyers.
              </p>
            </div>

            <div className="results-count">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1
                ? "property"
                : "properties"}
            </div>
          </div>

          {/* FILTER BAR */}

          <div className="filter-bar">
            <input
              type="number"
              min="0"
              placeholder="Max price"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(event.target.value)
              }
            />

            <select
              value={listingType}
              onChange={(event) =>
                setListingType(event.target.value)
              }
              style={{
                padding: "11px 13px",
                background: "#11151b",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                outline: "none",
                color: "#b8bec8",
                fontSize: "13px",
              }}
            >
              <option>All listings</option>
              <option>Rent</option>
              <option>Sale</option>
            </select>

            {(search ||
              location !== "All locations" ||
              propertyType !== "All types" ||
              listingType !== "All listings" ||
              maxPrice) && (
              <button
                className="clear-button"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* PROPERTY GRID */}

          <div className="property-grid">
            {loading ? (
              <div className="empty-state">
                <h3>
                  Loading properties...
                </h3>

                <p>
                  Connecting to the PropLink
                  marketplace.
                </p>
              </div>
            ) : error ? (
              <div className="empty-state">
                <h3>
                  Something went wrong
                </h3>

                <p>{error}</p>

                <button
                  className="primary-button"
                  style={{
                    marginTop: "18px",
                  }}
                  onClick={fetchProperties}
                >
                  Try again
                </button>
              </div>
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <article
                  className="property-card"
                  key={property.id}
                  onClick={() =>
                    openProperty(property)
                  }
                >
                  <div className="property-image-wrapper">
                    <img
                      src={getImage(property)}
                      alt={
                        property.title ||
                        "PropLink property"
                      }
                      className="property-image"
                    />

                    <span className="property-type">
                      {property.listing_type}
                    </span>
                  </div>

                  <div className="property-info">
                    <div className="property-price">
                      $
                      {formatPrice(
                        property.price
                      )}

                      <small>
                        {property.listing_type ===
                        "Rent"
                          ? "/month"
                          : ""}
                      </small>
                    </div>

                    <h3>
                      {property.title}
                    </h3>

                    <p className="property-location">
                      📍{" "}
                      {property.location ||
                        property.city}
                    </p>

                    <div className="property-details">
                      <span>
                        🛏 {property.bedrooms || 0}{" "}
                        bedroom
                        {Number(
                          property.bedrooms
                        ) > 1
                          ? "s"
                          : ""}
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
                <h3>
                  No properties found
                </h3>

                <p>
                  Try another location, property type,
                  listing type or price.
                </p>

                <button
                  className="primary-button"
                  style={{
                    marginTop: "18px",
                  }}
                  onClick={resetFilters}
                >
                  Reset search
                </button>
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

            <h2>
              How PropLink works
            </h2>

            <p>
              Finding a place shouldn't be complicated.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">
                01
              </div>

              <h3>
                Search
              </h3>

              <p>
                Tell PropLink what kind of property
                you're looking for.
              </p>
            </div>

            <div className="step">
              <div className="step-number">
                02
              </div>

              <h3>
                Discover
              </h3>

              <p>
                Compare available properties,
                locations and prices.
              </p>
            </div>

            <div className="step">
              <div className="step-number">
                03
              </div>

              <h3>
                Connect
              </h3>

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
              onClick={() =>
                setShowListing(true)
              }
            >
              List Your Property →
            </button>
          </div>

          <div className="owner-decoration">
            <div className="decoration-card">
              <span>
                New listing
              </span>

              <strong>
                3 Bedroom House
              </strong>

              <small>
                Harare • $750/month
              </small>
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
            PropLink is being built to make property
            discovery simpler in Zimbabwe. Instead of
            searching through scattered listings and
            unnecessary middlemen, people can find
            properties and connect directly with the
            people offering them.
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

      {/* PROPERTY DETAILS MODAL */}

      {selectedProperty && (
        <div
          className="modal-overlay"
          onClick={closeProperty}
        >
          <div
            className="property-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={closeProperty}
            >
              ×
            </button>

            <img
              src={getImage(selectedProperty)}
              alt={
                selectedProperty.title ||
                "PropLink property"
              }
            />

            <div className="modal-content">
              <span className="property-type">
                {selectedProperty.listing_type}
              </span>

              <h2>
                {selectedProperty.title}
              </h2>

              <p className="modal-location">
                📍{" "}
                {selectedProperty.location ||
                  selectedProperty.city}
              </p>

              <div className="modal-price">
                $
                {formatPrice(
                  selectedProperty.price
                )}

                <small>
                  {selectedProperty.listing_type ===
                  "Rent"
                    ? "/month"
                    : ""}
                </small>
              </div>

              <div className="modal-info">
                <span>
                  🏠{" "}
                  {selectedProperty.property_type}
                </span>

                <span>
                  🛏{" "}
                  {selectedProperty.bedrooms ||
                    0}{" "}
                  Bedrooms
                </span>

                <span>
                  ✓{" "}
                  {selectedProperty.status ||
                    "Available"}
                </span>
              </div>

              {selectedProperty.description && (
                <p
                  style={{
                    color: "#858c97",
                    fontSize: "13px",
                    lineHeight: "1.7",
                    marginBottom: "20px",
                  }}
                >
                  {selectedProperty.description}
                </p>
              )}

              <button
                className="primary-button full"
                onClick={() =>
                  handleContactOwner(
                    selectedProperty
                  )
                }
              >
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT OWNER MODAL */}

      {contactProperty && (
        <div
          className="modal-overlay"
          onClick={() =>
            setContactProperty(null)
          }
        >
          <div
            className="listing-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setContactProperty(null)
              }
            >
              ×
            </button>

            <span className="section-label">
              DIRECT CONNECTION
            </span>

            <h2>
              Contact the owner
            </h2>

            <p>
              You're interested in:
              <br />
              <strong>
                {contactProperty.title}
              </strong>
            </p>

            <input
              type="text"
              placeholder="Your name"
            />

            <input
              type="tel"
              placeholder="Your phone number"
            />

            <textarea
              placeholder="Write a message..."
              rows="4"
              style={{
                width: "100%",
                marginBottom: "11px",
                padding: "13px",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                outline: "none",
                background: "#0b0e13",
                color: "white",
                fontSize: "13px",
                resize: "vertical",
              }}
            />

            <button
              className="primary-button full"
              onClick={() => {
                alert(
                  "Messaging will be connected after PropLink authentication is added."
                );

                setContactProperty(null);
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      )}

      {/* LIST PROPERTY MODAL */}

      {showListing && (
        <div
          className="modal-overlay"
          onClick={() =>
            setShowListing(false)
          }
        >
          <div
            className="listing-modal"
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

            <span className="section-label">
              PROPERTY OWNERS
            </span>

            <h2>
              List your property
            </h2>

            <p>
              Add your property to the PropLink
              marketplace.
            </p>

            <form onSubmit={submitListing}>
              <input
                name="title"
                type="text"
                placeholder="Property title"
                value={listingForm.title}
                onChange={handleListingChange}
              />

              <input
                name="location"
                type="text"
                placeholder="Area or location"
                value={listingForm.location}
                onChange={handleListingChange}
              />

              <input
                name="city"
                type="text"
                placeholder="City"
                value={listingForm.city}
                onChange={handleListingChange}
              />

              <input
                name="price"
                type="number"
                min="0"
                placeholder="Price"
                value={listingForm.price}
                onChange={handleListingChange}
              />

              <select
                name="listingType"
                value={listingForm.listingType}
                onChange={handleListingChange}
              >
                <option value="Rent">
                  For Rent
                </option>

                <option value="Sale">
                  For Sale
                </option>
              </select>

              <select
                name="propertyType"
                value={listingForm.propertyType}
                onChange={handleListingChange}
              >
                <option value="House">
                  House
                </option>

                <option value="Apartment">
                  Apartment
                </option>

                <option value="Room">
                  Room
                </option>

                <option value="Commercial">
                  Commercial
                </option>
              </select>

              <select
                name="bedrooms"
                value={listingForm.bedrooms}
                onChange={handleListingChange}
              >
                <option value="1">
                  1 Bedroom
                </option>

                <option value="2">
                  2 Bedrooms
                </option>

                <option value="3">
                  3 Bedrooms
                </option>

                <option value="4">
                  4 Bedrooms
                </option>

                <option value="5">
                  5+ Bedrooms
                </option>
              </select>

              <select
                name="bathrooms"
                value={listingForm.bathrooms}
                onChange={handleListingChange}
              >
                <option value="1">
                  1 Bathroom
                </option>

                <option value="2">
                  2 Bathrooms
                </option>

                <option value="3">
                  3 Bathrooms
                </option>

                <option value="4">
                  4+ Bathrooms
                </option>
              </select>

              <input
                name="imageUrl"
                type="url"
                placeholder="Property image URL (optional)"
                value={listingForm.imageUrl}
                onChange={handleListingChange}
              />

              <textarea
                name="description"
                placeholder="Property description"
                rows="4"
                value={listingForm.description}
                onChange={handleListingChange}
                style={{
                  width: "100%",
                  marginBottom: "11px",
                  padding: "13px",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  outline: "none",
                  background: "#0b0e13",
                  color: "white",
                  fontSize: "13px",
                  resize: "vertical",
                }}
              />

              <button
                className="primary-button full"
                type="submit"
              >
                Publish Property
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
