import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination } from 'antd';
import { Card } from 'react-bootstrap';

export default function ManageLifePost() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async (e) => {
    try {
      const response = await axios.post('/admin/getAllLifePost', {
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

  const toggleDelete = async (lifePostId) => {
    try {
    
      const response = await axios.get(`/lifePost/delete?id=${lifePostId}`);
     
      const { res, resMsg } = response.data
      if (res === 1) {
        console.log(resMsg)
      } else {
        console.error(resMsg)
      }
      fetchData();
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

  function getCategoryString(category) {
    switch (category) {
      case 1:
        return "Social";
      case 2:
        return "Study";
      case 3:
        return "Sports";
     
      default:
        return "Unknown Category";
    }
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 56px)', 
        }}
      >
        <Card style={{ width: '100%', minHeight: 'calc(100vh - 56px)', padding: '20px' }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Title</th>
                <th scope="col">Enroll</th>
                <th scope="col">Address</th>
                <th scope="col">Content</th>
                <th scope="col">Post Time</th>
                <th scope="col">Category</th>
                <th scope='col'>Operation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((lifePostId, index) => (
                <tr key={lifePostId.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{lifePostId.title}</td>
                  <td>{lifePostId.peopleEnrol}</td>
                  <td>{lifePostId.address}</td>
                  <td>{lifePostId.content}</td>
                  <td>{lifePostId.postTime}</td>
                  <td>
                    {getCategoryString(lifePostId.category)}
                  </td>
                  <td>
                    <Button onClick={() => toggleDelete(lifePostId.id)} className='disable-button'>Delete </Button>
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
