import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination } from 'antd';
import { Card } from 'react-bootstrap';
import './ManageAdmin.css'

export default function ManageAdmin() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axios.post('/admin/getAllAdmin', {
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

  const toggleUserStatus = async (adminId) => {
    try {
      // 向后端发送请求，更新用户状态
      const response = await axios.get(`/admin/editAdminStatus?adminId=${adminId}`);
      // 处理成功后的逻辑，例如刷新数据
      fetchData();
      const { res,resMsg } = response.data
      if(res === 1){
        console.log(resMsg)
      }else{
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
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Grade</th>
                <th scope="col">Operation Time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((admin, index) => (
                <tr key={admin.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{admin.id}</td>
                  <td>{admin.username}</td>
                  <td>{admin.grade}</td>
                  <td>{admin.operationTime}</td>
                  <td>
                   {admin.status === 1 ? (
                   <Button onClick={() => toggleUserStatus(admin.id)} className='disable-button'>Disable</Button>
                  ) : (
                   <Button onClick={() => toggleUserStatus(admin.id)} className='enable-button'>Enable</Button>
                  )}
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
