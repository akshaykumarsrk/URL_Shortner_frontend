import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../services/api'

const Dashboard = () => {

  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0)

  const [originalUrl, setOriginalUrl] = useState("")
  const [shortUrls, setShortUrls] = useState([])

  const handleShorten = async () => {
    try {
      const response = await api.post(
        "/api/v1/url/shorten",
        null,
        { params: { originalUrl } }
      );

      fetchUrls(); // refresh list
      setOriginalUrl("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUrls = async () => {
    try {
      const response = await api.get(
      `/api/v1/url/page/urls?page=${page}&size=5`
    );
      console.log(response.data.content)
      setShortUrls(response.data.content);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.log(error);
    }
  };

  // delete Url by id
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/v1/url/delete/${id}`);
      fetchUrls() // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUrls()
  }, [page])

  return (
    <div>
      <h1>Dashboard</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <button onClick={handleShorten}>Shorten</button>

      <h2>Your URLs</h2>

      <ul>
        {shortUrls.map((url) => {
          const shortLink = `http://localhost:8080/${url.shortCode}`;

          return (
            <li key={url.id}>
              {url.originalUrl} →

              <a
                href={`http://localhost:8080/api/v1/url/shortCode/${url.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortLink}
              </a>

              <button style={{ marginLeft: "10px" }}
                onClick={(e) => {
                  navigator.clipboard.writeText(shortLink);
                }}
              >
                Copy
              </button>

              <button
                style={{ marginLeft: "5px" }}
                onClick={(e) => {
                  handleDelete(url.id);
                }}
              >
                Delete
              </button>


              | Clicks: {url.clickCount}
            </li>
          );
        })}
      </ul>

      {/* Pagination Controls */}

      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page + 1 === totalPages}
        >
          Next
        </button>

      </div>
    </div>
  )
}

export default Dashboard