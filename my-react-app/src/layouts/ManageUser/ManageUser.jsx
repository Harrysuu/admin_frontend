import { useEffect, useState } from "react"
import axios from 'axios';
import { Pagination } from "react-bootstrap";

export default function ManageUser(){
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const fetchData = async (e) => {
        try{
            const response = await axios.post('/admin/getAllUser',{
                current: currentPage,
                page: pageSize
            });
            const { records, total } = response.data.result;
            setData(records);
            setTotal(total);
        }catch(error){
            console.error('Error fetching data:', error);
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
          <div className="container">
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Username</th>
                    <th scope="col">Credit</th>
                    <th scope="col">College</th>
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
                      <td>{user.statusInformation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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