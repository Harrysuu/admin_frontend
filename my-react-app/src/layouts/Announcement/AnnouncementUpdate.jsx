import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function AnnouncementUpdate(props) {
  const announcementId = props.match.params.id; // Get the ID from the route parameters
//   const { announcementId } = useParams(); // 从 URL 中获取 announcementId
  console.log(announcementId);
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    detail: '',
    star: 0,
  });

  const history = useHistory();

  useEffect(() => {
    // 在此处获取要更新的公告信息
    axios.get(`/announcement/getAnnouncementById?id=${announcementId}`)
      .then(response => {
        setAnnouncement(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching announcement:', error);
      });
  }, [announcementId]); // 在 announcementId 更改时重新获取公告信息

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/announcement/update', announcement); // 发送更新后的 announcement 数据到后端的 /updateAnnouncement 路由
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
    <div style={{ width: '50rem' }}>
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
