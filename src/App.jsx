import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Car,
  ShieldCheck,
  Zap,
  Droplets,
  ChevronRight,
  Plus,
  MessageCircle,
  User,
  Home,
  Building2,
  Bookmark,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Modern 2 Bedroom Home",
    location: "Burnside, Bulawayo",
    price: 350,
    type: "Rent",
    rooms: 2,
    beds: 2,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Walled", "Parking", "Water"],
    featured: true,
    time: "2h ago",
  },
  {
    id: 2,
    title: "Private Student Cottage",
    location: "Suburbs, Bulawayo",
    price: 180,
    type: "Rent",
    rooms: 1,
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=85",
    tags: ["Student", "Own entrance", "Water"],
    featured: false,
    time: "4h ago",
  },
  {
    id: 3,
    title: "Spacious Family Home",
    location: "Borrowdale, Harare",
    price: 120000,
    type: "Buy",
    rooms: 4,
    beds: 4,
    baths: 3,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    tags: ["Gated", "Garage", "Electricity"],
    featured: true,
    time: "Yesterday",
  },
  {
    id: 4,
    title: "Fully Furnished Apartment",
    location: "Avondale, Harare",
    price: 650,
    type: "Rent",
    rooms: 2,
    beds: 2,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Furnished", "Backup solar", "Parking"],
    featured: false,
    time: "Yesterday",
  },
  {
    id: 5,
    title: "3 Bedroom Family House",
    location: "Woodlands, Gweru",
    price: 75000,
    type: "Buy",
    rooms: 3,
    beds: 3,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
    tags: ["Walled", "Garden", "Parking"],
    featured: false,
    time: "2 days ago",
  },
  {
    id: 6,
    title: "Affordable Single Room",
    location: "Mpopoma, Bulawayo",
    price: 100,
    type: "Rent",
    rooms: 1,
    beds: 1,
    baths: 1,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85",
    tags: ["Affordable", "Water", "Electricity"],
    featured: false,
    time: "2 days ago",
  },
];

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

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesSearch =
        !query ||
        `${property.title} ${property.location} ${property.tags.join(" ")}`
          .toLowerCase()
          .includes(query);

      const matchesType =
        propertyType === "All" || property.type === propertyType;

      return matchesSearch && matchesType;
    });
  }, [search, propertyType]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const navigate = (page) => {
    setActivePage(page);
    setMobileMenu(false);
    setSelectedProperty(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => navigate("Home")}>
            <span className="brand-mark">
              <Home size={20} strokeWidth={2.5} />
            </span>
            <span>
              Prop<span>Link</span>
            </span>
          </button>

          <nav className="desktop-nav">
            {["Home", "Rent", "Buy", "Sell"].map((item) => (
              <button
                key={item}
                className={activePage === item ? "nav-link active" : "nav-link"}
                onClick={() => navigate(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="nav-icon-button"
              onClick={() => navigate("Saved")}
              aria-label="Saved"
            >
              <Bookmark size={19} />
              {favorites.length > 0 && (
                <span className="notification-dot">{favorites.length}</span>
              )}
            </button>

            <button
              className="profile-button"
              onClick={() => navigate("Profile")}
            >
              <span className="profile-avatar">
                <User size={17} />
              </span>
              <span className="profile-text">Profile</span>
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="mobile-menu">
            {["Home", "Rent", "Buy", "Sell", "Saved", "Messages", "Profile"].map(
              (item) => (
                <button key={item} onClick={() => navigate(item)}>
                  {item}
                </button>
              )
            )}
          </div>
        )}
      </header>

      {selectedProperty ? (
        <PropertyDetails
          property={selectedProperty}
          isFavorite={favorites.includes(selectedProperty.id)}
          onBack={() => setSelectedProperty(null)}
          onFavorite={() => toggleFavorite(selectedProperty.id)}
        />
      ) : activePage === "Sell" ? (
        <SellPage />
      ) : activePage === "Saved" ? (
        <SavedPage
          properties={properties.filter((p) => favorites.includes(p.id))}
          onOpen={setSelectedProperty}
          favorites={favorites}
          onFavorite={toggleFavorite}
        />
      ) : activePage === "Messages" ? (
        <MessagesPage />
      ) : activePage === "Profile" ? (
        <ProfilePage />
      ) : (
        <main>
          <section className="hero">
            <div className="hero-glow hero-glow-one" />
            <div className="hero-glow hero-glow-two" />

            <div className="hero-content">
              <div className="eyebrow">
                <Sparkles size={14} />
                Zimbabwe's property marketplace
              </div>

              <h1>
                Find a place
                <br />
                <span>you'll love.</span>
              </h1>

              <p className="hero-description">
                Discover homes, rooms and properties across Zimbabwe.
                Search smarter, connect directly and move with confidence.
              </p>

              <div className="hero-search">
                <div className="search-main">
                  <Search size={20} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search city, area or property..."
                  />
                  {search && (
                    <button
                      className="clear-search"
                      onClick={() => setSearch("")}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="search-type">
                  {["All", "Rent", "Buy"].map((type) => (
                    <button
                      key={type}
                      className={propertyType === type ? "selected" : ""}
                      onClick={() => setPropertyType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <button className="search-button">
                  <Search size={19} />
                  <span>Search</span>
                </button>
              </div>

              <div className="popular-searches">
                <span>Popular:</span>
                {locations.slice(0, 5).map((location) => (
                  <button
                    key={location}
                    onClick={() => setSearch(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="trust-strip">
            <div>
              <ShieldCheck size={19} />
              <span>Real property listings</span>
            </div>
            <div>
              <MessageCircle size={19} />
              <span>Connect directly</span>
            </div>
            <div>
              <MapPin size={19} />
              <span>Zimbabwe-wide</span>
            </div>
            <div>
              <CheckCircle2 size={19} />
              <span>Built for local needs</span>
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div>
                <span className="section-kicker">DISCOVER</span>
                <h2>
                  {search
                    ? `Properties matching "${search}"`
                    : "Places worth seeing"}
                </h2>
                <p>
                  Explore properties currently available on PropLink.
                </p>
              </div>

              <button className="view-all" onClick={() => navigate("Rent")}>
                View all
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onFavorite={() => toggleFavorite(property.id)}
                  onOpen={() => setSelectedProperty(property)}
                />
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="empty-state">
                <Search size={36} />
                <h3>No properties found</h3>
                <p>Try another location, keyword or property type.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setPropertyType("All");
                  }}
                >
                  Clear search
                </button>
              </div>
            )}
          </section>

          <section className="how-section">
            <div className="section-heading centered">
              <span className="section-kicker">HOW IT WORKS</span>
              <h2>Property hunting, simplified.</h2>
              <p>Everything you need in one place.</p>
            </div>

            <div className="steps">
              <Step
                number="01"
                icon={<Search size={22} />}
                title="Search"
                text="Find properties by location, price, rooms and features."
              />
              <Step
                number="02"
                icon={<Building2 size={22} />}
                title="Compare"
                text="View property details, amenities and availability."
              />
              <Step
                number="03"
                icon={<MessageCircle size={22} />}
                title="Connect"
                text="Contact owners directly through WhatsApp, calls or messages."
              />
            </div>
          </section>

          <section className="list-cta">
            <div>
              <span className="section-kicker">PROPERTY OWNERS</span>
              <h2>Have a property to list?</h2>
              <p>
                Put your property in front of people actively looking for a
                place.
              </p>
            </div>
            <button onClick={() => navigate("Sell")}>
              <Plus size={18} />
              List a property
            </button>
          </section>
        </main>
      )}

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <button className="brand footer-brand" onClick={() => navigate("Home")}>
              <span className="brand-mark">
                <Home size={18} />
              </span>
              <span>
                Prop<span>Link</span>
              </span>
            </button>
            <p>Connecting Zimbabwe with better places.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => navigate("Rent")}>Rent</button>
            <button onClick={() => navigate("Buy")}>Buy</button>
            <button onClick={() => navigate("Sell")}>List property</button>
            <button onClick={() => navigate("Messages")}>Messages</button>
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} PropLink
          </div>
        </div>
      </footer>
    </div>
  );
}

function PropertyCard({
  property,
  isFavorite,
  onFavorite,
  onOpen,
}) {
  return (
    <article className="property-card" onClick={onOpen}>
      <div className="property-image-wrap">
        <img
          src={property.image}
          alt={property.title}
          className="property-image"
        />

        <div className="image-overlay" />

        {property.featured && (
          <span className="featured-badge">
            <Sparkles size={12} />
            Featured
          </span>
        )}

        <button
          className={`favorite-button ${isFavorite ? "saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <span className="property-type">{property.type}</span>
      </div>

      <div className="property-info">
        <div className="property-price">
          ${property.price.toLocaleString()}
          {property.type === "Rent" && <small>/month</small>}
        </div>

        <h3>{property.title}</h3>

        <div className="property-location">
          <MapPin size={14} />
          {property.location}
        </div>

        <div className="property-stats">
          <span>
            <BedDouble size={15} />
            {property.beds} bed
          </span>
          <span>
            <Bath size={15} />
            {property.baths} bath
          </span>
          <span>
            <Building2 size={15} />
            {property.rooms} room
          </span>
        </div>

        <div className="property-bottom">
          <div className="property-tags">
            {property.tags.slice(0, 2).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <span className="property-time">{property.time}</span>
        </div>
      </div>
    </article>
  );
}

function Step({ number, icon, title, text }) {
  return (
    <div className="step">
      <div className="step-number">{number}</div>
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function PropertyDetails({
  property,
  isFavorite,
  onBack,
  onFavorite,
}) {
  return (
    <main className="details-page">
      <div className="details-container">
        <button className="back-button" onClick={onBack}>
          ← Back to properties
        </button>

        <div className="details-grid">
          <div>
            <div className="details-image">
              <img src={property.image} alt={property.title} />
              {property.featured && (
                <span className="featured-badge details-featured">
                  <Sparkles size={12} />
                  Featured
                </span>
              )}
            </div>

            <div className="details-description">
              <span className="section-kicker">DESCRIPTION</span>
              <h2>About this property</h2>
              <p>
                A comfortable property in {property.location}, suitable for
                people looking for a convenient and secure place to stay.
                Contact the owner for viewing arrangements and additional
                details.
              </p>
            </div>
          </div>

          <aside className="details-panel">
            <div className="details-header">
              <div>
                <span className="details-type">{property.type}</span>
                <h1>{property.title}</h1>
                <div className="property-location">
                  <MapPin size={15} />
                  {property.location}
                </div>
              </div>

              <button
                className={`details-save ${isFavorite ? "saved" : ""}`}
                onClick={onFavorite}
              >
                <Heart
                  size={19}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="details-price">
              ${property.price.toLocaleString()}
              {property.type === "Rent" && <small>/month</small>}
            </div>

            <div className="details-stats">
              <div>
                <BedDouble />
                <strong>{property.beds}</strong>
                <span>Bedrooms</span>
              </div>
              <div>
                <Bath />
                <strong>{property.baths}</strong>
                <span>Bathrooms</span>
              </div>
              <div>
                <Building2 />
                <strong>{property.rooms}</strong>
                <span>Rooms</span>
              </div>
            </div>

            <div className="amenities">
              <h3>Features</h3>
              {property.tags.map((tag) => (
                <span key={tag}>
                  <CheckCircle2 size={14} />
                  {tag}
                </span>
              ))}
            </div>

            <div className="details-actions">
              <button className="primary-action">
                <MessageCircle size={18} />
                Message owner
              </button>
              <button className="secondary-action">
                <Car size={18} />
                Request viewing
              </button>
            </div>

            <div className="owner-note">
              <ShieldCheck size={19} />
              <div>
                <strong>Stay safe</strong>
                <p>
                  Verify the property and owner before making any payment.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SellPage() {
  return (
    <main className="simple-page">
      <div className="simple-header">
        <span className="section-kicker">PROPERTY OWNERS</span>
        <h1>List your property</h1>
        <p>
          Reach people actively looking for homes, rooms and properties across
          Zimbabwe.
        </p>
      </div>

      <div className="form-card">
        <div className="form-section">
          <h2>Property information</h2>

          <div className="form-grid">
            <label>
              Property title
              <input placeholder="e.g. Modern 2 Bedroom House" />
            </label>

            <label>
              Location
              <input placeholder="e.g. Burnside, Bulawayo" />
            </label>

            <label>
              Price (USD)
              <input type="number" placeholder="350" />
            </label>

            <label>
              Listing type
              <select defaultValue="Rent">
                <option>Rent</option>
                <option>Buy</option>
              </select>
            </label>

            <label>
              Rooms
              <select defaultValue="2">
                <option>1 Room</option>
                <option>2 Rooms</option>
                <option>3 Rooms</option>
                <option>4+ Rooms</option>
                <option>Full House</option>
              </select>
            </label>

            <label>
              Owner phone
              <input placeholder="+263..." />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h2>Property features</h2>

          <div className="checkbox-grid">
            {[
              "Walled",
              "Gated",
              "Parking",
              "Water",
              "Electricity",
              "Backup solar",
              "Furnished",
              "Own entrance",
              "Near shops",
              "Near school",
              "Near town",
              "No landlord",
            ].map((feature) => (
              <label className="checkbox" key={feature}>
                <input type="checkbox" />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Description</h2>
          <textarea
            rows="5"
            placeholder="Tell potential tenants or buyers about the property..."
          />
        </div>

        <button className="publish-button">
          <Plus size={18} />
          Publish property
        </button>
      </div>
    </main>
  );
}

function SavedPage({ properties, onOpen, favorites, onFavorite }) {
  return (
    <main className="simple-page">
      <div className="simple-header">
        <span className="section-kicker">YOUR COLLECTION</span>
        <h1>Saved properties</h1>
        <p>Properties you've bookmarked for later.</p>
      </div>

      {properties.length > 0 ? (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              onFavorite={() => onFavorite(property.id)}
              onOpen={() => onOpen(property)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Bookmark size={36} />
          <h3>No saved properties yet</h3>
          <p>Tap the heart on a property to save it here.</p>
        </div>
      )}
    </main>
  );
}

function MessagesPage() {
  return (
    <main className="simple-page">
      <div className="simple-header">
        <span className="section-kicker">COMMUNICATION</span>
        <h1>Messages</h1>
        <p>Keep your property conversations in one place.</p>
      </div>

      <div className="message-empty">
        <div className="message-icon">
          <MessageCircle size={28} />
        </div>
        <h2>No conversations yet</h2>
        <p>
          When you contact a property owner, your conversations will appear
          here.
        </p>
      </div>
    </main>
  );
}

function ProfilePage() {
  return (
    <main className="simple-page">
      <div className="simple-header">
        <span className="section-kicker">ACCOUNT</span>
        <h1>Your profile</h1>
        <p>Manage your PropLink account and listings.</p>
      </div>

      <div className="profile-card">
        <div className="large-avatar">
          <User size={30} />
        </div>
        <div>
          <h2>PropLink User</h2>
          <p>Zimbabwe</p>
        </div>
      </div>

      <div className="profile-options">
        <button>
          <Building2 size={19} />
          My Ads
          <ChevronRight size={17} />
        </button>
        <button>
          <Bookmark size={19} />
          Saved properties
          <ChevronRight size={17} />
        </button>
        <button>
          <MessageCircle size={19} />
          Messages
          <ChevronRight size={17} />
        </button>
      </div>
    </main>
  );
}

export default App;
