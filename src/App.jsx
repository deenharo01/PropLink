import { useEffect, useMemo, useState } from "react";
import "./index.css";
import Auth from "./Auth";
import { supabase } from "./supabaseClient";

const starterProperties = [
  {
    id: 1,
    title: "Modern 2 Bedroom Home",
    location: "Harare",
    price: 500,
    type: "House",
    bedrooms: 2,
    listingType: "Rent",
    owner: "Property Owner",
    image: "https://picsum.photos/seed/hararehouse/800/600",
  },
  {
    id: 2,
    title: "Spacious Family House",
    location: "Bulawayo",
    price: 650,
    type: "House",
    bedrooms: 3,
    listingType: "Rent",
    owner: "Property Owner",
    image: "https://picsum.photos/seed/bulawayohouse/800/600",
  },
  {
    id: 3,
    title: "Student Accommodation",
    location: "Gweru",
    price: 200,
    type: "Room",
    bedrooms: 1,
    listingType: "Rent",
    owner: "Property Owner",
    image: "https://picsum.photos/seed/gweruroom/800/600",
  },
  {
    id: 4,
    title: "Furnished Apartment",
    location: "Mutare",
    price: 800,
    type: "Apartment",
    bedrooms: 2,
    listingType: "Rent",
    owner: "Property Owner",
    image: "https://picsum.photos/seed/mutareapartment/800/600",
  },
  {
    id: 5,
    title: "Affordable 3 Bedroom House",
    location: "Harare",
    price: 700,
    type: "House",
    bedrooms: 3,
    listingType: "Rent",
    owner: "Property Owner",
    image: "https://picsum.photos/seed/house5/800/600",
  },
  {
    id: 6,
    title: "Bachelor Apartment",
    location: "Bulawayo",
    price: 300,
    type: "Apartment",
    bedrooms: 1,
    listingType: "Rent",
    owner: "Property Owner",
    image: "https://picsum.photos/seed/apartment6/800/600",
  },
];

const emptyListing = {
  title: "",
  location: "",
  price: "",
  type: "House",
  bedrooms: "1",
  listingType: "Rent",
};

function App() {
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem("proplink-properties");
      return saved ? JSON.parse(saved) : starterProperties;
    } catch {
      return starterProperties;
    }
  });

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [appError, setAppError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All locations");
  const [propertyType, setPropertyType] = useState("All types");
  const [listingType, setListingType] = useState("All listings");
  const [maxPrice, setMaxPrice] = useState("");

  const [showListing, setShowListing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [contactProperty, setContactProperty] = useState(null);

  const [listingForm, setListingForm] = useState(emptyListing);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          console.error("Supabase auth error:", error);

          if (mounted) {
            setAppError(error.message);
            setAuthLoading(false);
          }

          return;
        }

        if (mounted) {
          setUser(user);
          setAuthLoading(false);
        }
      } catch (error) {
        console.error("Authentication startup error:", error);

        if (mounted) {
          setAppError(
            error?.message ||
              "Unable to connect to Supabase."
          );
          setAuthLoading(false);
        }
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        setUser(session?.user ?? null);
        setAuthLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "proplink-properties",
        JSON.stringify(properties)
      );
    } catch (error) {
      console.error(
        "Could not save properties:",
        error
      );
    }
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const query = search.trim().toLowerCase();

      const searchableText = `
        ${property.title}
        ${property.location}
        ${property.type}
        ${property.listingType}
      `.toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      const matchesLocation =
        location === "All locations" ||
        property.location === location;

      const matchesType =
        propertyType === "All types" ||
        property.type === propertyType;

      const matchesListingType =
        listingType === "All listings" ||
        property.listingType === listingType;

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

  const submitListing = (event) => {
    event.preventDefault();

    if (!user) {
      setShowListing(false);
      return;
    }

    if (
      !listingForm.title.trim() ||
      !listingForm.location.trim() ||
      !listingForm.price
    ) {
      alert(
        "Please complete the property title, location and price."
      );
      return;
    }

    const newProperty = {
      id: Date.now(),
      title: listingForm.title.trim(),
      location: listingForm.location.trim(),
      price: Number(listingForm.price),
      type: listingForm.type,
      bedrooms: Number(listingForm.bedrooms),
      listingType: listingForm.listingType,
      owner:
        user.user_metadata?.full_name ||
        user.email ||
        "PropLink Owner",
      image: `https://picsum.photos/seed/proplink-${Date.now()}/800/600`,
    };

    setProperties((current) => [
      newProperty,
      ...current,
    ]);

    setListingForm(emptyListing);
    setShowListing(false);

    setTimeout(() => {
      document
        .getElementById("properties")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleListProperty = () => {
    if (!user) return;
    setShowListing(true);
  };

  const handleContactOwner = (property) => {
    setSelectedProperty(null);
    setContactProperty(property);
  };

  const clearStoredListings = () => {
    if (
      window.confirm(
        "Reset the marketplace to the original demo properties?"
      )
    ) {
      setProperties(starterProperties);
    }
  };

  if (appError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily:
            "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            background: "#101318",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "28px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "2px",
              color: "#8b93a1",
              marginBottom: "10px",
            }}
          >
            PROPLINK ERROR
          </div>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "28px",
            }}
          >
            PropLink could not start
          </h1>

          <p
            style={{
              color: "#aeb5c0",
              lineHeight: 1.6,
            }}
          >
            The application encountered an error
            while connecting to Supabase.
          </p>

          <div
            style={{
              marginTop: "18px",
              padding: "14px",
              borderRadius: "10px",
              background: "#080a0d",
              color: "#ff8d8d",
              fontSize: "13px",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {appError}
          </div>

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "13px",
              border: "none",
              borderRadius: "8px",
              background: "#fff",
              color: "#000",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reload PropLink
          </button>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050505",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Loading PropLink...
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app">

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: "#777e89",
              fontSize: "12px",
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.email}
          </span>

          <button
            className="primary-button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          <button
            className="primary-button"
            onClick={handleListProperty}
          >
            List Property
          </button>
        </div>
      </header>

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
                      document
                        .getElementById("properties")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
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
                <option>
                  All locations
                </option>
                <option>Harare</option>
                <option>Bulawayo</option>
                <option>Gweru</option>
                <option>Mutare</option>
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
                onClick={() =>
                  document
                    .getElementById("properties")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
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
            >
              <option>
                All listings
              </option>
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

          <div className="property-grid">

            {filteredProperties.length > 0 ? (
              filteredProperties.map(
                (property) => (
                  <article
                    className="property-card"
                    key={property.id}
                    onClick={() =>
                      setSelectedProperty(property)
                    }
                  >
                    <div className="property-image-wrapper">

                      <img
                        src={property.image}
                        alt={property.title}
                        className="property-image"
                      />

                      <span className="property-type">
                        {property.listingType}
                      </span>

                    </div>

                    <div className="property-info">

                      <div className="property-price">
                        $
                        {Number(
                          property.price
                        ).toLocaleString()}

                        <small>
                          {property.listingType ===
                          "Rent"
                            ? "/month"
                            : ""}
                        </small>
                      </div>

                      <h3>
                        {property.title}
                      </h3>

                      <p className="property-location">
                        📍 {property.location}
                      </p>

                      <div className="property-details">

                        <span>
                          🛏 {property.bedrooms}{" "}
                          bedroom
                          {property.bedrooms > 1
                            ? "s"
                            : ""}
                        </span>

                        <span>
                          View details →
                        </span>

                      </div>

                    </div>
                  </article>
                )
              )
            ) : (
              <div className="empty-state">

                <h3>
                  No properties found
                </h3>

                <p>
                  Try another location, property
                  type, listing type or price.
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
              onClick={handleListProperty}
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

        <button
          onClick={clearStoredListings}
          style={{
            border: "none",
            background: "transparent",
            color: "#454b55",
            fontSize: "11px",
          }}
        >
          Reset demo
        </button>

      </footer>

      {selectedProperty && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProperty(null)
          }
        >
          <div
            className="property-modal"
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
                {selectedProperty.listingType}
              </span>

              <h2>
                {selectedProperty.title}
              </h2>

              <p className="modal-location">
                📍 {selectedProperty.location}
              </p>

              <div className="modal-price">
                $
                {Number(
                  selectedProperty.price
                ).toLocaleString()}

                <small>
                  {selectedProperty.listingType ===
                  "Rent"
                    ? "/month"
                    : ""}
                </small>
              </div>

              <div className="modal-info">

                <span>
                  🏠 {selectedProperty.type}
                </span>

                <span>
                  🛏 {selectedProperty.bedrooms}{" "}
                  Bedrooms
                </span>

                <span>
                  ✓ Available
                </span>

              </div>

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
                  "Message ready. Direct owner messaging will be connected to the PropLink backend."
                );

                setContactProperty(null);
              }}
            >
              Send Message
            </button>

          </div>
        </div>
      )}

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
                placeholder="City or location"
                value={listingForm.location}
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
                name="type"
                value={listingForm.type}
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
