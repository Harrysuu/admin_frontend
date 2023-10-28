import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination } from 'antd';
import { Card } from 'react-bootstrap';

export default function ManageSecondPost() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async (e) => {
    try {
      const response = await axios.post('/admin/getAllSecondPost', {
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

  const toggleDelete = async (secondPostId) => {
    try {
      
      const response = await axios.get(`/secondPost/delete?id=${secondPostId}`);
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
                <th scope="col">Poster ID</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price(AUD)</th>
                <th scope="col">Newness</th>
                <th scope='col'>Count</th>
                <th scope='col'>Edit Time</th>
                <th scope='col'>Operation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((secondPostId, index) => (
                <tr key={secondPostId.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{secondPostId.posterId}</td>
                  <td>{secondPostId.commodityName}</td>
                  <td>{secondPostId.category}</td>
                  <td>{secondPostId.price}</td>
                  <td>{secondPostId.newness}</td>
                  <td>{secondPostId.count}</td>
                  <td>{secondPostId.editTime}</td>
                  <td>
                    <Button onClick={() => toggleDelete(secondPostId.id)} className='disable-button'>Delete </Button>
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
