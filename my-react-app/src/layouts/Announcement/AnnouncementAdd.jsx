import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AnnouncementAdd() {
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    detail: '',
    star: 0
  });

  const centerTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/announcement/add', announcement); // 发送 announcement 数据到后端的 /add 路由
      // 清除表单或进行其他操作
      console.info(response.data.res)
      history.push('/manageAnnounce/page');
    } catch (error) {
      console.error(error);
      // 处理错误
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
    <div style= {centerTextStyle}>
      <div className="mb-4"></div>
      <div>
        <h3>Create your Announcement</h3>
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
            as="textarea"
            name="star"
            value={announcement.star}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="dark" type="submit" style={{ marginTop: '10px' }}>
          Create
        </Button>
      </Form>
    </div>
  );
}
