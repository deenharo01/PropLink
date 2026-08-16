import { useMemo, useState } from "react";
import "./index.css";

const properties = [
  {
    id: 1,
    title: "Modern 2 Bedroom Home",
    location: "Harare",
    area: "Avondale",
    type: "House",
    listingType: "Rent",
    price: 500,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://picsum.photos/seed/proplink-harare/900/600",
    verified: true,
    description:
      "A modern and comfortable two-bedroom home in a convenient Harare location.",
    amenities: ["Parking", "Security", "Water", "Fitted Kitchen"],
  },
  {
    id: 2,
    title: "Spacious Family House",
    location: "Bulawayo",
    area: "Hillside",
    type: "House",
    listingType: "Rent",
    price: 650,
    bedrooms: 3,
    bathrooms: 2,
    image: "https://picsum.photos/seed/proplink-bulawayo/900/600",
    verified: true,
    description:
      "Spacious family accommodation with comfortable living areas and a secure yard.",
    amenities: ["Parking", "Garden", "Security", "Water"],
  },
  {
    id: 3,
    title: "Student Accommodation",
    location: "Gweru",
    area: "CBD",
    type: "Room",
    listingType: "Rent",
    price: 200,
    bedrooms: 1,
    bathrooms: 1,
    image: "https://picsum.photos/seed/proplink-gweru/900/600",
    verified: false,
    description:
      "Affordable student accommodation close to major colleges and transport routes.",
    amenities: ["Wi-Fi", "Water", "Electricity", "Security"],
  },
  {
    id: 4,
    title: "Furnished Apartment",
    location: "Mutare",
    area: "Avenues",
    type: "Apartment",
    listingType: "Rent",
    price: 800,
    bedrooms: 2,
    bathrooms: 2,
    image: "https://picsum.photos/seed/proplink-mutare/900/600",
    verified: true,
    description:
      "Fully furnished apartment suitable for professionals, couples or small families.",
    amenities: ["Furnished", "Parking", "Security", "Wi-Fi"],
  },
  {
    id: 5,
    title: "Executive 4 Bedroom Home",
    location: "Harare",
    area: "Borrowdale",
    type: "House",
    listingType: "Buy",
    price: 145000,
    bedrooms: 4,
    bathrooms: 3,
    image: "https://picsum.photos/seed/proplink-borrowdale/900/600",
    verified: true,
    description:
      "An executive family property in one of Harare's sought-after residential areas.",
    amenities: ["Garage", "Garden", "Borehole", "Security"],
  },
  {
    id: 6,
    title: "2 Bedroom Flat",
    location: "Bulawayo",
    area: "CBD",
    type: "Apartment",
    listingType: "Buy",
    price: 65000,
    bedrooms: 2,
    bathrooms: 1,
    image: "https://picsum.photos/seed/proplink-flat/900/600",
    verified: false,
    description:
      "Convenient two-bedroom apartment close to shops, transport and city amenities.",
    amenities: ["Parking", "Security", "Water"],
  },
];

const cities = ["All locations", "Harare", "Bulawayo", "Gweru", "Mutare"];

function formatPrice(price, listingType) {
  return listingType === "Rent"
    ? `$${price.toLocaleString()}/month`
    : `$${price.toLocaleString()}`;
}

function App() {
  const [search, setSearch] = useState("");
  const [listingType, setListingType] = useState("All");
  const [location, setLocation] = useState("All locations");
  const [propertyType, setPropertyType] = useState("All");
  const [bedrooms, setBedrooms] = useState("Any");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showListingForm, setShowListingForm] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const searchable =
        `${property.title} ${property.location} ${property.area} ${property.type}`
          .toLowerCase();

      const matchesSearch =
        !search || searchable.includes(search.toLowerCase());

      const matchesListing =
        listingType === "All" || property.listingType === listingType;

      const matchesLocation =
        location === "All locations" || property.location === location;

      const matchesType =
        propertyType === "All" || property.type === propertyType;

      const matchesBedrooms =
        bedrooms === "Any" ||
        (bedrooms === "4+" ? property.bedrooms >= 4 : property.bedrooms === Number(bedrooms));

      const matchesPrice =
        !maxPrice || property.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesListing &&
        matchesLocation &&
        matchesType &&
        matchesBedrooms &&
        matchesPrice
      );
    });
  }, [search, listingType, location, propertyType, bedrooms, maxPrice]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function resetFilters() {
    setSearch("");
    setListingType("All");
    setLocation("All locations");
    setPropertyType("All");
    setBedrooms("Any");
    setMaxPrice("");
  }

  function scrollToListings() {
    document.getElementById("properties")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#">
          Prop<span>Link</span>
        </a>

        <nav className={mobileMenu ? "nav-links mobile-open" : "nav-links"}>
          <a href="#properties" onClick={() => setMobileMenu(false)}>
            Find a Property
          </a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>
            How it works
          </a>
          <a href="#about" onClick={() => setMobileMenu(false)}>
            About
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="favorite-nav"
            onClick={() => scrollToListings()}
          >
            Saved {favorites.length > 0 && `(${favorites.length})`}
          </button>

          <button
            className="primary-button"
            onClick={() => setShowListingForm(true)}
          >
            List Property
          </button>
        </div>

        <button
          className="menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">
              Zimbabwe's property marketplace
            </div>

            <h1>
              Find your place.
              <br />
              <span>Connect directly.</span>
            </h1>

            <p>
              Discover homes, rooms, apartments and properties across
              Zimbabwe — and connect directly with the people behind them.
            </p>

            <div className="hero-search">
              <div className="search-field">
                <span>⌕</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by city, area or property..."
                />
              </div>

              <select
                value={listingType}
                onChange={(event) => setListingType(event.target.value)}
              >
                <option value="All">Rent or Buy</option>
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
              </select>

              <button onClick={scrollToListings}>Search</button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>Zimbabwe</strong>
                <span>Built for local property</span>
              </div>
              <div>
                <strong>Direct</strong>
                <span>Connect with owners</span>
              </div>
              <div>
                <strong>Simple</strong>
                <span>Search without the hassle</span>
              </div>
            </div>
          </div>
        </section>

        <section className="search-section" id="properties">
          <div className="section-heading">
            <div>
              <span className="eyebrow">DISCOVER</span>
              <h2>Find your next place</h2>
            </div>

            <span className="result-count">
              {filteredProperties.length} properties
            </span>
          </div>

          <div className="filters">
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>

            <select
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
            >
              <option value="All">All property types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Room">Room</option>
            </select>

            <select
              value={bedrooms}
              onChange={(event) => setBedrooms(event.target.value)}
            >
              <option value="Any">Any bedrooms</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3">3 bedrooms</option>
              <option value="4+">4+ bedrooms</option>
            </select>

            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />

            <button className="reset-button" onClick={resetFilters}>
              Reset
            </button>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <article className="property-card" key={property.id}>
                  <div className="image-wrapper">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="property-image"
                    />

                    <div className="listing-badge">
                      {property.listingType}
                    </div>

                    <button
                      className={
                        favorites.includes(property.id)
                          ? "heart-button active"
                          : "heart-button"
                      }
                      onClick={() => toggleFavorite(property.id)}
                      aria-label="Save property"
                    >
                      {favorites.includes(property.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="property-info">
                    <div className="property-topline">
                      <span className="property-type">
                        {property.type}
                      </span>

                      {property.verified && (
                        <span className="verified">✓ Verified</span>
                      )}
                    </div>

                    <h3>{property.title}</h3>

                    <p className="location">
                      {property.area}, {property.location}
                    </p>

                    <div className="property-meta">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                    </div>

                    <div className="card-bottom">
                      <strong>
                        {formatPrice(property.price, property.listingType)}
                      </strong>

                      <button
                        className="view-button"
                        onClick={() => setSelectedProperty(property)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div>⌕</div>
              <h3>No properties found</h3>
              <p>Try changing your search or filters.</p>
              <button onClick={resetFilters}>Clear filters</button>
            </div>
          )}
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading centered">
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>Property search, simplified.</h2>
            <p>
              PropLink is designed to make finding and listing property
              straightforward.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <span>01</span>
              <h3>Search</h3>
              <p>
                Tell PropLink what kind of place you are looking for.
              </p>
            </div>

            <div className="step">
              <span>02</span>
              <h3>Discover</h3>
              <p>
                Browse properties matching your location, budget and needs.
              </p>
            </div>

            <div className="step">
              <span>03</span>
              <h3>Connect</h3>
              <p>
                Contact the owner directly and arrange the next step.
              </p>
            </div>
          </div>
        </section>

        <section className="owner-cta" id="about">
          <div>
            <span className="eyebrow">PROPERTY OWNERS</span>
            <h2>Have a property to list?</h2>
            <p>
              Reach people actively searching for their next place.
            </p>
          </div>

          <button
            className="primary-button large"
            onClick={() => setShowListingForm(true)}
          >
            List Your Property →
          </button>
        </section>
      </main>

      <footer>
        <div>
          <div className="logo">
            Prop<span>Link</span>
          </div>
          <p>Find it. Link up. Move in.</p>
        </div>

        <div className="footer-right">
          <span>Zimbabwe Property Marketplace</span>
          <span>© 2026 PropLink</span>
        </div>
      </footer>

      {selectedProperty && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="property-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelectedProperty(null)}
            >
              ×
            </button>

            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
            />

            <div className="modal-content">
              <div className="property-topline">
                <span className="property-type">
                  {selectedProperty.listingType}
                </span>

                {selectedProperty.verified && (
                  <span className="verified">✓ Verified</span>
                )}
              </div>

              <h2>{selectedProperty.title}</h2>

              <p className="modal-location">
                {selectedProperty.area}, {selectedProperty.location}
              </p>

              <h3 className="modal-price">
                {formatPrice(
                  selectedProperty.price,
                  selectedProperty.listingType
                )}
              </h3>

              <div className="modal-meta">
                <span>{selectedProperty.bedrooms} Bedrooms</span>
                <span>{selectedProperty.bathrooms} Bathrooms</span>
                <span>{selectedProperty.type}</span>
              </div>

              <p className="description">
                {selectedProperty.description}
              </p>

              <h3>Amenities</h3>

              <div className="amenities">
                {selectedProperty.amenities.map((amenity) => (
                  <span key={amenity}>{amenity}</span>
                ))}
              </div>

              <button
                className="primary-button full"
                onClick={() =>
                  alert(
                    "Owner contact functionality will be connected in the next stage."
                  )
                }
              >
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {showListingForm && (
        <div
          className="modal-overlay"
          onClick={() => setShowListingForm(false)}
        >
          <div
            className="listing-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowListingForm(false)}
            >
              ×
            </button>

            <span className="eyebrow">LIST YOUR PROPERTY</span>
            <h2>Put your property on PropLink.</h2>
            <p>
              This is the V1 listing form. We will connect it to a real
              database later.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                alert("Property listing submitted.");
                setShowListingForm(false);
              }}
            >
              <input required placeholder="Property title" />

              <div className="form-row">
                <select required defaultValue="">
                  <option value="" disabled>
                    Location
                  </option>
                  {cities.slice(1).map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>

                <select required defaultValue="">
                  <option value="" disabled>
                    Rent or Buy
                  </option>
                  <option>Rent</option>
                  <option>Buy</option>
                </select>
              </div>

              <div className="form-row">
                <input required type="number" placeholder="Price" />

                <select required defaultValue="">
                  <option value="" disabled>
                    Property type
                  </option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Room</option>
                </select>
              </div>

              <textarea
                required
                placeholder="Tell people about your property..."
                rows="4"
              />

              <button className="primary-button full" type="submit">
                Submit Property
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
