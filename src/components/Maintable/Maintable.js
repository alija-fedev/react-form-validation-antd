import React, { useState } from "react";
import "antd/dist/antd.css";
import { Space, Table } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import { Input } from "antd";


const Maintable = ({setFormValues, setEditForm}) => {
    const [ page, setPage ] = useState(1)
    const [ pageSize, setPageSize ] = useState(10)

    const dataSource = JSON.parse(localStorage.getItem("formvalues"))
    // console.log("datasource", dataSource)

    const onDelete = (id) => {
        // const datas = dataSource.filter((item) => item.id !== id)
        const datas = dataSource.filter((item) => item.id !== id)
        console.log(datas)
        setFormValues(datas)
    }

    const onEdit = (id) => {
        const findData = dataSource.find((item) => item.id === id)
        console.log(findData)
        setEditForm(findData)
    }
    
    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
              return <Input 
                autoFocus 
                placeholder="Type text"
                value={selectedKeys[0]}
                onChange={(e) => {setSelectedKeys(e.target.value ? [e.target.value]:[])}} 
                onPressEnter={() => {confirm()}}
                onBlur={() => {confirm()}}
                ></Input>
            },
            filterIcon: () => {
              return <SearchOutlined />
            },
            onFilter: (value, record) => {
              return record.firstname.toLowerCase().includes(value.toLowerCase())
            }
          },
          {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (record1, record2) => {
              return record1.age > record2.age
            }
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            // render:(gender) => {
            //   return <p>{gender ? 'female' : 'male'}</p>
            // },
            // filters:[
            //   {
            //     text:'female', value: true
            //   },
            //   {
            //     text: 'male', value: false
            //   }
            // ],
            // onFilter:(value, record) => {
            //   return record.gender === value
            // }
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <a onClick={()=> {onEdit(record.id)}}>Edit</a>
                <a onClick={()=> onDelete(record.id)}>Delete</a>
              </Space>
            ),
          },
    ]
    return(
        <div>
            <Table 
              dataSource={dataSource} 
              columns={columns}
              pagination={{
                current: page,
                pageSize: pageSize,
                total: 100,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize)
                }
              }}
              />;
        </div>
    )
}

export default Maintable;