import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Pagination, Space } from 'antd';
import { Card } from 'react-bootstrap';
import './ManageUser.css'

export default function ManageUser() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorTip, setErrorTip] = useState(false)

  const fetchData = async (e) => {
    try {
      const response = await axios.post('/admin/getAllUser', {
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

  const toggleUserStatus = async (userId) => {
    try {
      // 向后端发送请求，更新用户状态
      const response = await axios.get(`/admin/changeUserStatus?userId=${userId}`);
      const { res,resMsg } = response.data
      // 处理成功后的逻辑，例如刷新数据
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
      setAlertMessage(error.response.data.resMsg);
      setAlertVisible(true);
      setErrorTip(true)
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
                <th scope="col">Username</th>
                <th scope="col">Credit</th>
                <th scope="col">Faculty</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Edit Time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.credit}</td>
                  <td>{user.college}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.editTime}</td>
                  <td>
                    {user.statusInformation === 1 ? (
                      <Button onClick={() => toggleUserStatus(user.id)} className='disable-button'>Disable</Button>
                    ) : (
                      <Button onClick={() => toggleUserStatus(user.id)} className='enable-button'>Enable</Button>
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
