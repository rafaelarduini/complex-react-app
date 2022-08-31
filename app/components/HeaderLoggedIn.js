import React, { useEffect } from "react";

function HeaderLoggedIn(props) {
  function handleLoggedOut() {
    props.setLoggedIn(false);
    localStorage.removeItem("complexappToken");
    localStorage.removeItem("complexappUsername");
    localStorage.removeItem("complexappAvatar");
  }
  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <a href="#" className="mr-2">
        <img
          className="small-header-avatar"
          src={
            "https://media-exp1.licdn.com/dms/image/C4D03AQGJp9bKkdWGGQ/profile-displayphoto-shrink_200_200/0/1655952752246?e=1667433600&v=beta&t=ybL9MKfyqFmQnZNR3D6AQROocsfqiS6qt6Cp1-FNYEg"
          }
        />
      </a>
      <a className="btn btn-sm btn-success mr-2" href="/create-post">
        Create Post
      </a>
      <button onClick={handleLoggedOut} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
