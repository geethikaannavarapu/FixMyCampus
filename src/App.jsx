import { useState } from "react";
import "./App.css";

const blockData = [
  {
    name: "Admin",
    icon: "🛡️",
    description: "Campus oversight and complaint management.",
  },
  {
    name: "Departments",
    icon: "🏛️",
    description: "Direct issues to the right academic department.",
  },
  {
    name: "Education",
    icon: "📚",
    description: "Support for classrooms, labs, and learning spaces.",
  },
  {
    name: "Waste Management",
    icon: "🗑️",
    description: "Sanitation and waste collection requests.",
  },
  {
    name: "Hospital",
    icon: "🏥",
    description: "Medical support and campus health assistance.",
  },
  {
    name: "Water Tank",
    icon: "💧",
    description: "Water supply, tank maintenance, and leakage support.",
  },
  {
    name: "Emergency / SOS",
    icon: "🚨",
    description: "Fast response for urgent campus safety concerns.",
  },
  {
    name: "Transport",
    icon: "🚌",
    description: "Bus routes, transport services, and shuttle updates.",
  },
];

const initialComplaints = [
  {
    id: 1,
    title: "Broken projector in Lab 3",
    category: "Education",
    location: "Block A",
    description: "The projector is not powering up during classes.",
    status: "In Progress",
    imageName: "lab3.jpg",
  },
  {
    id: 2,
    title: "Water leakage near hostel gate",
    category: "Water Tank",
    location: "Hostel Gate",
    description: "Water is overflowing after heavy rain.",
    status: "Reviewed",
    imageName: "",
  },
];

function App() {
  const [activeView, setActiveView] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [editing, setEditing] = useState(false);
  const [theme, setTheme] = useState("white");
  const [student, setStudent] = useState({
    name: "Geethika Annavarapu",
    email: "geethika@example.com",
    rollNumber: "23NA1A0000",
    mobile: "9876543210",
  });
  const [editStudent, setEditStudent] = useState(student);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedBlock, setSelectedBlock] = useState(blockData[0].name);
  const [formData, setFormData] = useState({
    title: "",
    category: "Education",
    description: "",
    location: "",
    imageName: "",
  });
  const [feedback, setFeedback] = useState("");

  const handleLogin = () => {
    setLoggedIn(true);
    setEditing(false);
    setActiveView("profile");
    setFeedback("");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEditing(false);
    setActiveView("home");
    setFeedback("");
  };

  const openProfile = () => {
    setEditStudent(student);
    setEditing(false);
    setActiveView("profile");
  };

  const saveProfile = () => {
    setStudent(editStudent);
    setEditing(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setFormData((prev) => ({ ...prev, imageName: file ? file.name : "" }));
  };

  const handleComplaintSubmit = (event) => {
    event.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      setFeedback("Please fill in the title, description, and location.");
      return;
    }

    const newComplaint = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      location: formData.location,
      description: formData.description,
      status: "Submitted",
      imageName: formData.imageName,
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    setFormData({
      title: "",
      category: "Education",
      description: "",
      location: "",
      imageName: "",
    });
    setFeedback("Complaint submitted successfully.");
    setActiveView("complaint");
  };

  const selectedBlockInfo =
    blockData.find((block) => block.name === selectedBlock) || blockData[0];

  return (
    <div className="app" data-theme={theme}>
      <nav className="navbar">
        <button className="logo" onClick={() => setActiveView("home")}>
          <span className="logo-icon">🏫</span>
          FixMyCampus
        </button>

        <div className="nav-links">
          <button
            className={`nav-item ${activeView === "home" ? "active" : ""}`}
            onClick={() => setActiveView("home")}
          >
            Home
          </button>
          <button
            className={`nav-item ${activeView === "profile" ? "active" : ""}`}
            onClick={() => setActiveView("profile")}
          >
            Profile
          </button>
          <button
            className={`nav-item ${activeView === "complaint" ? "active" : ""}`}
            onClick={() => setActiveView("complaint")}
          >
            Complaint
          </button>
          <button
            className={`nav-item ${activeView === "blocks" ? "active" : ""}`}
            onClick={() => setActiveView("blocks")}
          >
            All Blocks
          </button>

          <div className="nav-actions">
            <div className="theme-switcher" role="tablist" aria-label="Color theme">
              <button
                className={`theme-btn ${theme === "white" ? "active" : ""}`}
                onClick={() => setTheme("white")}
              >
                White
              </button>
              <button
                className={`theme-btn ${theme === "black" ? "active" : ""}`}
                onClick={() => setTheme("black")}
              >
                Black
              </button>
            </div>

            {!loggedIn ? (
              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>
            ) : (
              <button className="profile-btn" onClick={openProfile}>
                👤 Profile
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="main-shell">
        {activeView === "home" && (
          <section className="home-view">
            <div className="hero-grid">
              <div className="dashboard-card hero-card">
                <div className="badge">✨ Smart Campus • Better Campus</div>
                <h1>Welcome to FixMyCampus</h1>
                <p>
                  Report issues, track complaints, and stay connected with your
                  campus services in one modern platform.
                </p>
                <div className="hero-actions">
                  <button className="primary-btn" onClick={() => setActiveView("complaint")}>
                    🚨 Report an Issue
                  </button>
                  <button className="secondary-btn" onClick={() => setActiveView("profile")}>
                    👤 View Profile
                  </button>
                </div>
              </div>

              <div className="dashboard-card info-card">
                <div className="section-label">Quick Actions</div>
                <div className="quick-actions-grid">
                  <button className="quick-action" onClick={() => setActiveView("complaint")}>
                    <span>📝</span>
                    <strong>Report Issue</strong>
                  </button>
                  <button className="quick-action" onClick={() => setActiveView("complaint")}>
                    <span>📍</span>
                    <strong>Track Complaint</strong>
                  </button>
                  <button className="quick-action" onClick={() => setActiveView("home")}>
                    <span>🔔</span>
                    <strong>Notifications</strong>
                  </button>
                  <button className="quick-action" onClick={() => setActiveView("home")}>
                    <span>💬</span>
                    <strong>Messenger</strong>
                  </button>
                  <button className="quick-action" onClick={() => setActiveView("blocks")}>
                    <span>🆘</span>
                    <strong>SOS Emergency</strong>
                  </button>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card stats-card">
                <div className="section-label">Campus Snapshot</div>
                <div className="stats-grid">
                  <div>
                    <strong>250+</strong>
                    <span>Issues Reported</span>
                  </div>
                  <div>
                    <strong>180+</strong>
                    <span>Resolved</span>
                  </div>
                  <div>
                    <strong>95%</strong>
                    <span>Resolution Rate</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-card map-card">
                <div className="section-label">Live Campus Map</div>
                <div className="map-box">
                  <div className="map-dot dot-a">A</div>
                  <div className="map-dot dot-b">B</div>
                  <div className="map-dot dot-c">C</div>
                  <div className="map-dot dot-d">D</div>
                </div>
                <p>Campus services are active across blocks A, B, C, and D.</p>
              </div>
            </div>
          </section>
        )}

        {activeView === "profile" && (
          <section className="profile-section">
            <div className="profile-card">
              {!loggedIn ? (
                <div className="empty-state">
                  <h2>Login to view your profile</h2>
                  <p>Use the Login button in the navigation bar to access your student profile.</p>
                  <button className="primary-btn" onClick={handleLogin}>
                    Login
                  </button>
                </div>
              ) : (
                <>
                  <div className="profile-avatar">👤</div>
                  <h1>Student Profile</h1>
                  <p className="profile-subtitle">Your FixMyCampus account information</p>

                  {editing ? (
                    <>
                      <div className="profile-field">
                        <label>Student Name</label>
                        <input
                          type="text"
                          value={editStudent.name}
                          onChange={(event) =>
                            setEditStudent({ ...editStudent, name: event.target.value })
                          }
                        />
                      </div>
                      <div className="profile-field">
                        <label>Email Address</label>
                        <input type="email" value={editStudent.email} disabled />
                      </div>
                      <div className="profile-field">
                        <label>Roll Number</label>
                        <input type="text" value={editStudent.rollNumber} disabled />
                      </div>
                      <div className="profile-field">
                        <label>Mobile Number</label>
                        <input
                          type="tel"
                          value={editStudent.mobile}
                          onChange={(event) =>
                            setEditStudent({ ...editStudent, mobile: event.target.value })
                          }
                        />
                      </div>
                      <div className="profile-actions">
                        <button className="save-btn" onClick={saveProfile}>
                          Save Changes
                        </button>
                        <button className="cancel-btn" onClick={() => setEditing(false)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="profile-info">
                        <div className="info-item">
                          <span>👤</span>
                          <div>
                            <small>Student Name</small>
                            <strong>{student.name}</strong>
                          </div>
                        </div>
                        <div className="info-item">
                          <span>📧</span>
                          <div>
                            <small>Email Address</small>
                            <strong>{student.email}</strong>
                          </div>
                        </div>
                        <div className="info-item">
                          <span>🎓</span>
                          <div>
                            <small>Roll Number</small>
                            <strong>{student.rollNumber}</strong>
                          </div>
                        </div>
                        <div className="info-item">
                          <span>📱</span>
                          <div>
                            <small>Mobile Number</small>
                            <strong>{student.mobile}</strong>
                          </div>
                        </div>
                      </div>

                      <button
                        className="edit-profile-btn"
                        onClick={() => {
                          setEditStudent(student);
                          setEditing(true);
                        }}
                      >
                        ✏️ Edit Profile
                      </button>
                      <button className="logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {activeView === "complaint" && (
          <section className="complaint-view">
            <div className="section-header">
              <div>
                <div className="section-label">Complaint Center</div>
                <h2>Submit and track campus complaints</h2>
                <p>Share details clearly so your report reaches the right team faster.</p>
              </div>
              <button className="primary-btn" onClick={() => setActiveView("blocks")}>
                View Service Blocks
              </button>
            </div>

            <div className="complaint-grid">
              <form className="dashboard-card form-card" onSubmit={handleComplaintSubmit}>
                <h3>New Complaint</h3>
                <div className="profile-field">
                  <label>Complaint Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    placeholder="Example: Broken street light"
                  />
                </div>
                <div className="profile-field">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleFormChange}>
                    <option value="Education">Education</option>
                    <option value="Waste Management">Waste Management</option>
                    <option value="Water Tank">Water Tank</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Emergency / SOS">Emergency / SOS</option>
                    <option value="Departments">Departments</option>
                  </select>
                </div>
                <div className="profile-field">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="4"
                    placeholder="Describe the issue in detail..."
                  />
                </div>
                <div className="profile-field">
                  <label>Location</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="Example: Main Gate"
                  />
                </div>
                <div className="profile-field">
                  <label>Optional Image Upload</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                {feedback ? <p className="feedback-text">{feedback}</p> : null}
                <button className="primary-btn submit-btn" type="submit">
                  Submit Complaint
                </button>
              </form>

              <div className="dashboard-card complaint-list-card">
                <h3>Submitted Complaints</h3>
                <div className="complaint-list">
                  {complaints.map((complaint) => (
                    <article className="complaint-item" key={complaint.id}>
                      <div className="complaint-top-row">
                        <strong>{complaint.title}</strong>
                        <span className={`status-badge ${complaint.status.toLowerCase().replace(/\s+/g, "-")}`}>
                          {complaint.status}
                        </span>
                      </div>
                      <p>{complaint.description}</p>
                      <div className="complaint-meta">
                        <span>{complaint.category}</span>
                        <span>{complaint.location}</span>
                        {complaint.imageName ? <span>📷 {complaint.imageName}</span> : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === "blocks" && (
          <section className="blocks-view">
            <div className="section-header">
              <div>
                <div className="section-label">All Blocks</div>
                <h2>Explore FixMyCampus service areas</h2>
                <p>Select a block to see the services available for that area.</p>
              </div>
              <button className="secondary-btn" onClick={() => setActiveView("home")}>
                Back to Home
              </button>
            </div>

            <div className="blocks-grid">
              {blockData.map((block) => (
                <button
                  key={block.name}
                  className={`block-card ${selectedBlock === block.name ? "active" : ""}`}
                  onClick={() => setSelectedBlock(block.name)}
                >
                  <span className="block-icon">{block.icon}</span>
                  <strong>{block.name}</strong>
                  <p>{block.description}</p>
                </button>
              ))}
            </div>

            <div className="dashboard-card detail-card">
              <div className="section-label">Selected Block</div>
              <h3>{selectedBlockInfo.name}</h3>
              <p>{selectedBlockInfo.description}</p>
            </div>
          </section>
        )}
      </main>

      <footer>
        <button className="logo footer-logo" onClick={() => setActiveView("home")}>
          <span className="logo-icon">🏫</span>
          FixMyCampus
        </button>
        <p>Making every campus a better place.</p>
      </footer>
    </div>
  );
}

export default App;