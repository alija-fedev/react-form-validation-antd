import React from "react";
import "antd/dist/antd.css";
import "../Mainform/Mainform.css";
import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Checkbox, Select, Radio } from "antd";
import {v4 as uuidv4} from "uuid";
import Maintable from "../Maintable/Maintable";

const Mainform = () => {
  const subjectsLists = ['DSA', 'OS', 'DBMS', 'NETWORKING'];
  const initialState = JSON.parse(localStorage.getItem("formvalues")) || [];
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [value, setValue] = useState(1);
  const [formValues, setFormValues] = useState(initialState);
  const [ editform, setEditForm ] = useState(null)
  
  //for radio button
  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);

    if (e.target.value === 1) {
      document.getElementById("experiencediv").style.display = "block";
    } else {
      document.getElementById("experiencediv").style.display = "none";
    }
  };

  //for checkboxes
  const onCheckboxChange = (checkedValues) => {
    console.log(checkedValues)
  }

  const onFinish = (formvalues) => {
    const newValue = { id: uuidv4(), ...formvalues }
    setFormValues([...formValues, newValue])
    form.resetFields()
  };
  
   //Save data at local storage
    useEffect(() => {
        // console.log('nameList', formValues)
        localStorage.setItem("formvalues", JSON.stringify(formValues));
    }, [formValues])

  return (
    <div className="mainform">
      <Form 
       form={form}
        autoComplete="off"
        className="form" 
        onFinish={onFinish}>
        
        {/* firstname field */}
        <Form.Item 
            name="firstname" 
            label="First Name"
            rules={[
                {
                    required: true,
                    message: "Please enter your firstname"
                },
                {
                    whitespace: true,
                    message: "Blankspace should not be allowed"
                },
                {
                    min: 3
                }
            ]}
            hasFeedback
            >
          <Input placeholder="Enter your firstname" />
        </Form.Item>

        {/* lastname field */}
        <Form.Item 
            name="lastname" 
            label="Last Name"
            rules={[
                {
                    required: true,
                    message: "Please enter your lastname"
                },
                {
                    whitespace: true,
                    message: "Blankspace should not be allowed"
                },
                {
                    min: 3
                }
            ]}
            hasFeedback
            >
          <Input placeholder="Enter your lastname" />
        </Form.Item>
        
        {/* age field */}
        <Form.Item 
            name="age" 
            label="Age"
            min={2}
            wrapperCol={{span: 40}}
            rules={[
                {
                    required: true,
                    message: "Please enter your age"
                }
            ]}
            hasFeedback
            >
          <InputNumber placeholder="Enter your age" />
        </Form.Item>

        {/* gender */}
        <Form.Item 
            name="gender" 
            label="Gender"
            rules={[
                {
                    required: true,
                    message: "Please select your gender"
                }
            ]}
            hasFeedback
            >
          <Select placeholder="Select your gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        {/* address */}
        <Form.Item 
            name="address" 
            label="Address"
            rules={[
                {
                    required: true,
                    message: "Please enter your address"
                }
            ]}
            hasFeedback
            >
          <TextArea rows={4} placeholder="Enter your address" />
        </Form.Item>

        {/* subjects */}
        <Form.Item
            name="subjects" 
            label="Preffered Subjects"
            rules={[
                {
                    required: true,
                    message: "Please select your subjects"
                }
            ]}>
            <Checkbox.Group options={subjectsLists} onChange={onCheckboxChange} />
        </Form.Item>

        {/* experience */}
        <Form.Item 
            name="experience" 
            label="Are you experienced?"
            rules={[
                {
                    required: true,
                    message: "Please select your experience"
                }
            ]}
            hasFeedback
            >
          <Radio.Group onChange={onRadioChange} value={value}>
            <Radio value={1}>Yes</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <div id="experiencediv" className="experienceshow">
          <Form.Item 
            name="experienceyears" 
            label="Experience (in years)"
            rules={[
                {
                    required: true,
                    message: "Please enter your experience"
                }
            ]}
            hasFeedback
            >
            <Input placeholder="Enter your experience(in years)" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            style={{ width: "100%", backgroundColor: "skyblue" }}
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>

      <Maintable setFormValues={setFormValues} setEditForm={setEditForm} />
    </div>
  );
};

export default Mainform;
