import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination, Alert, Space } from 'antd';
import { Card } from 'react-bootstrap';
import './ManageAdmin.css'

export default function ManageAdmin() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorTip, setErrorTip] = useState(false)

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

  const toggleAdminStatus = async (adminId) => {
    try {
      // 向后端发送请求，更新用户状态
      const response = await axios.get(`/admin/editAdminStatus?adminId=${adminId}`);
      const { res,resMsg } = response.data
      // 处理成功后的逻辑，例如刷新数据
      fetchData();
      console.log(resMsg)
      if(res===1){
      setAlertMessage(resMsg);
      setAlertVisible(true);
      setErrorTip(false)
      }
      if(res===0){
      setAlertMessage(resMsg);
      setAlertVisible(true);
      setErrorTip(true)
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

      <Space direction="vertical" style={{ width: '100%' }}>
        {alertVisible && !errorTip && (
          <Alert
            message="Success Tips"
            description={alertMessage}
            type="success" // You can change the type to 'error' if needed
            showIcon
            closable
            onClose={() => setAlertVisible(false)}
          />
        )}

        {alertVisible && errorTip && (
          <Alert
            message="Error"
            description={alertMessage}
            type="error" // You can change the type to 'error' if needed
            showIcon
            closable
            onClose={() => setAlertVisible(false)}
          />
        )}
      </Space>

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
                      <Button onClick={() => toggleAdminStatus(admin.id)} className='disable-button'>Disable</Button>
                    ) : (
                      <Button onClick={() => toggleAdminStatus(admin.id)} className='enable-button'>Enable</Button>
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
