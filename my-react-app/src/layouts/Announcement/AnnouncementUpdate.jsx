import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function AnnouncementUpdate(props) {
  const announcementId = props.match.params.id; 

  console.log(announcementId);
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    detail: '',
    star: 0,
  });

  const centerTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const history = useHistory();

  useEffect(() => {
   
    axios.get(`/announcement/getAnnouncementById?id=${announcementId}`)
      .then(response => {
        setAnnouncement(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching announcement:', error);
      });
  }, [announcementId]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/announcement/update', announcement); 
      console.log(response.data);

      history.push('/manageAnnounce/page');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };

  return (
    <div style={centerTextStyle}>
      <div className="mb-4"></div>
      <div>
        <h3>Update Announcement</h3>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={announcement.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={announcement.content}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="detail">
          <Form.Label>Detail</Form.Label>
          <Form.Control
            as="textarea"
            name="detail"
            value={announcement.detail}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="star">
          <Form.Label>Star</Form.Label>
          <Form.Control
            type="number"
            name="star"
            value={announcement.star}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mb-4"></div>

        <Button variant="dark" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(AnnouncementUpdate)
