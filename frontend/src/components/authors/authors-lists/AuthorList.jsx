import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import AuthorItem from "../authors-item/AuthorItem";
import './styles.css';

const AuthorList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://epicode-api.onrender.com/api/authors");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      ) : (
        <Row>
          {posts.map((post) => (
            <Col
              key={post._id}
              md={6}
              lg={4}
              style={{
                marginBottom: 50,
              }}
            >
              <AuthorItem {...post} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default AuthorList;