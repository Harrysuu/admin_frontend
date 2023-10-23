import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination } from 'antd';
import { Card } from 'react-bootstrap';

export default function ManageForumPost() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async (e) => {
    try {
      const response = await axios.post('/admin/getAllForumPost', {
        current: currentPage,
        page: pageSize,
      });
      const { records, total } = response.data.result;
      setData(records);
      setTotal(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleDelete = async (forumPostId) => {
    try {
      // 向后端发送请求，更新用户状态
      const response = await axios.get(`/forumPost/delete?id=${forumPostId}`);
      // 处理成功后的逻辑，例如刷新数据
      fetchData();
      const { res, resMsg } = response.data
      if (res === 1) {
        console.log(resMsg)
      } else {
        console.error(resMsg)
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };


  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 56px)', // 调整页面高度以适应您的布局
        }}
      >
        <Card style={{ width: '100%', minHeight: 'calc(100vh - 56px)', padding: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Title</th>
                <th scope="col">Faculty</th>
                <th scope="col">Content</th>
                <th scope="col">Edit Time</th>
                <th scope="col">Category</th>
                <th scope='col'>Operation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((forumPostId, index) => (
                <tr key={forumPostId.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{forumPostId.title}</td>
                  <td>{forumPostId.college}</td>
                  <td>{forumPostId.content}</td>
                  <td>{forumPostId.editTime}</td>
                  <td>{forumPostId.category}</td>
                  <td>
                    <Button onClick={() => toggleDelete(forumPostId.id)} className='disable-button'>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div className="d-flex justify-content-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          showQuickJumper
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
