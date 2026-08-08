import { useState } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editing, setEditing] = useState(false);

  const [student, setStudent] = useState({
    name: "Geethika Annavarapu",
    email: "geethika@example.com",
    rollNumber: "23NA1A0000",
    mobile: "9876543210",
  });

  const [editStudent, setEditStudent] = useState(student);

  // LOGIN
  const handleLogin = () => {
    setLoggedIn(true);
    setShowProfile(true);
  };

  // LOGOUT
  const handleLogout = () => {
    setLoggedIn(false);
    setShowProfile(false);
    setEditing(false);
  };

  // OPEN PROFILE
  const openProfile = () => {
    setEditStudent(student);
    setShowProfile(true);
    setEditing(false);
  };

  // SAVE PROFILE
  const saveProfile = () => {
    setStudent(editStudent);
    setEditing(false);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🏫</span>
          FixMyCampus
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>

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
      </nav>

      {/* PROFILE */}
      {loggedIn && showProfile ? (
        <section className="profile-section">

          <div className="profile-card">

            <button
              className="close-profile"
              onClick={() => setShowProfile(false)}
            >
              ✕
            </button>

            <div className="profile-avatar">
              👤
            </div>

            <h1>Student Profile</h1>

            <p className="profile-subtitle">
              Your FixMyCampus account information
            </p>

            {editing ? (
              <>

                {/* NAME */}
                <div className="profile-field">
                  <label>Student Name</label>

                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) =>
                      setEditStudent({
                        ...editStudent,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* EMAIL */}
                <div className="profile-field">
                  <label>Email Address</label>

                  <input
                    type="email"
                    value={editStudent.email}
                    disabled
                  />
                </div>

                {/* ROLL NUMBER */}
                <div className="profile-field">
                  <label>Roll Number</label>

                  <input
                    type="text"
                    value={editStudent.rollNumber}
                    disabled
                  />
                </div>

                {/* MOBILE */}
                <div className="profile-field">
                  <label>Mobile Number</label>

                  <input
                    type="tel"
                    value={editStudent.mobile}
                    onChange={(e) =>
                      setEditStudent({
                        ...editStudent,
                        mobile: e.target.value,
                      })
                    }
                  />
                </div>

                {/* ACTIONS */}
                <div className="profile-actions">

                  <button
                    className="save-btn"
                    onClick={saveProfile}
                  >
                    Save Changes
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>

                </div>

              </>
            ) : (
              <>

                {/* STUDENT DETAILS */}
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

                {/* EDIT */}
                <button
                  className="edit-profile-btn"
                  onClick={() => {
                    setEditStudent(student);
                    setEditing(true);
                  }}
                >
                  ✏️ Edit Profile
                </button>

                {/* LOGOUT */}
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </>
            )}

          </div>

        </section>
      ) : (
        <>

          {/* HOME */}
          <main id="home" className="hero-section">

            <div className="hero-content">

              <div className="badge">
                ✨ Smart Campus • Better Campus
              </div>

              <h1>
                Let's Make Our
                <span> Campus Better.</span>
              </h1>

              <p>
                Report campus problems, track complaints, and help
                create a cleaner, safer and smarter campus.
              </p>

              <div className="hero-buttons">

                <button className="primary-btn">
                  🚨 Report an Issue
                </button>

                <button className="secondary-btn">
                  📋 Track Complaint
                </button>

              </div>

              <div className="stats">

                <div>
                  <strong>250+</strong>
                  <small>Issues Reported</small>
                </div>

                <div>
                  <strong>180+</strong>
                  <small>Issues Resolved</small>
                </div>

                <div>
                  <strong>95%</strong>
                  <small>Resolution Rate</small>
                </div>

              </div>

            </div>

            <div className="hero-card">

              <div className="campus-circle">
                🏫
              </div>

              <div className="floating-card card-one">
                💡
                <span>
                  Street Light
                  <small>Resolved ✓</small>
                </span>
              </div>

              <div className="floating-card card-two">
                🚰
                <span>
                  Water Leakage
                  <small>In Progress</small>
                </span>
              </div>

              <div className="floating-card card-three">
                🗑️
                <span>
                  Waste Issue
                  <small>Reported</small>
                </span>
              </div>

            </div>

          </main>

          {/* FEATURES */}
          <section id="features" className="features-section">

            <div className="section-heading">

              <span>WHAT WE OFFER</span>

              <h2>
                Everything Your Campus Needs
              </h2>

              <p>
                One platform to report, manage and resolve campus issues.
              </p>

            </div>

            <div className="feature-grid">

              <div className="feature-card">
                <div className="feature-icon">🚨</div>
                <h3>Report Issues</h3>
                <p>
                  Easily report problems with photos, descriptions
                  and location.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📍</div>
                <h3>Track Complaints</h3>
                <p>
                  Know exactly what is happening with your complaint.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3>AI Assistant</h3>
                <p>
                  Get instant help from the smart campus assistant.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Admin Dashboard</h3>
                <p>
                  Help administrators monitor and resolve campus issues.
                </p>
              </div>

            </div>

          </section>

          {/* ABOUT */}
          <section id="about" className="about-section">

            <div>

              <span className="section-label">
                ABOUT FIXMYCAMPUS
              </span>

              <h2>
                Small Reports Can Create Big Changes.
              </h2>

              <p>
                FixMyCampus connects students, faculty and campus
                administration in one simple platform.
              </p>

            </div>

            <div className="about-box">

              <span>🏆</span>

              <h3>
                Smart Campus
              </h3>

              <p>
                Report → Track → Resolve → Improve
              </p>

            </div>

          </section>

          {/* FOOTER */}
          <footer>

            <div className="logo">
              <span className="logo-icon">🏫</span>
              FixMyCampus
            </div>

            <p>
              Making every campus a better place.
            </p>

          </footer>

        </>
      )}

    </div>
  );
}

export default App;