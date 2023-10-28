import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination, Alert } from 'antd';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ManageAnnounce() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [errorAlert, setErrorAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.post('/announcement/page', {
        page: currentPage,
        pageSize: pageSize,
      });
      const { records, total } = response.data.result;
      setData(records);
      setTotal(total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleDelete = async (announceId) => {
    try {
      // 向后端发送请求，更新用户状态
      const response = await axios.get(`/announcement/delete?id=${announceId}`);
      const { res, resMsg } = response.data
      if (res === 1) {
        console.log(resMsg)
      } else {
        console.error(resMsg)
        setErrorAlert(true);
        setErrorMessage(resMsg);
      }
      fetchData();
    } catch (error) {
      console.error('Error toggling user status:', error);
      setErrorAlert(true);
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
          <>
            <Link to={'/manageAnnounce/add'}>
              <Button type="primary" style={{ width: "10%" }}>Create</Button>
            </Link>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Title</th>
                  <th scope="col">Content</th>
                  <th scope="col">Star</th>
                  <th scope="col">Details</th>
                  <th scope="col">Post Time</th>
                  <th scope="col">Operation</th>
                  <th scope='col'>Try</th>
                </tr>
              </thead>
              <tbody>
                {data.map((announcement, index) => (
                  <tr key={announcement.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{announcement.title}</td>
                    <td>{announcement.content}</td>
                    <td>{announcement.star}</td>
                    <td>{announcement.detail}</td>
                    <td>{announcement.postTime}</td>
                    <td><Button onClick={() => toggleDelete(announcement.id)} className='disable-button'>Delete </Button></td>
                    <td>
                      <Link to={`/manageAnnounce/update/${announcement.id}`}>
                      <Button className='enable-button'>Update</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
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

      {errorAlert && (
        <Alert message="Error" description={errorMessage} type="error" closable onClose={() => setErrorAlert(false)} />
      )}

    </div>
  );
}
