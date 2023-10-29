function Sidebar({ routes }) {
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };


  return (
    <>
    <div className="admin-sidebar">
    <div className="navbar navbar-expand-lg">
   
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="/home"> Home

        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-column">
            {routes.map((prop, key) => (
              <li className={`nav-item ${activeRoute(prop.layout + prop.path)}`} key={key}>
                <a href={prop.layout + prop.path} className={`nav-link fs-5 ${activeRoute(prop.layout + prop.path) === "active" ? "link-active" : ""}`}>
                  <i class={prop.icon}></i>
                  <span className="ms-2">{prop.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      

    </div>

    <div className="sidebar-footer col-auto">
          <div className="dropdown">
            <button
              className="btn drop-btn text-light fs-5"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <i className="bi bi-person"></i>
              <span className="ms-2 text-uppercase">Admin</span>
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item">Edit</button>
              <button className="dropdown-item">Delete</button>
            </div>
          </div>
        </div>
        </div>
    </>
  );
}

export default Sidebar;
