import React, { useState, useEffect } from "react";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import BlogItem from "../../../components/blog/blog-item/BlogItem";
import "./profileleft.css";

const ProfileLeft = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let authorName = process.env.REACT_APP_USER_LOGGED_IN;
        let url = `http://localhost:5000/api/blogPosts/author/${encodeURIComponent(
          authorName
        )}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-overlay">
          <Spinner animation="border" role="status" className="loader" />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : posts.length === 0 ? (
        <div>No posts found for this author.</div>
      ) : (
        <>
          <div>
            <h5 className="blog-title my-4">
              {process.env.REACT_APP_USER_LOGGED_IN}
            </h5>
          </div>
          <Tabs
            defaultActiveKey="posts"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="posts" title="Posts">
              <div className="mt-5">
                {posts.map((post) => (
                  <BlogItem key={post._id} {...post} />
                ))}
              </div>
            </Tab>
            <Tab eventKey="bio" title="Bio">
              Tab content for Profile
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
};

export default ProfileLeft;