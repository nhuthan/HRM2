import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from '../../actions/department';
import moment from 'moment'

const DepartmentPage = () => {
    const dispatch = useDispatch();
    const department = useSelector(state => state.department);

    useEffect(() => {
        console.log('getList', getList)
        dispatch(getList());
    }, [])

    return (
        <div>
            <h3>Departments</h3>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên phòng ban</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            department.items.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>{moment(item.createdDate).format("L")}</td>
                                    <td>
                                        <a href="#">Sửa</a>
                                        <a href="#">Xóa</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default DepartmentPage;