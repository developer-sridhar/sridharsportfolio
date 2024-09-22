import React from 'react'
import { Form, message } from 'antd'
import './Admin.css'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/rootSlice'
import axios from 'axios'

const AdminContact = () => {
  const dispatch = useDispatch();
  const{portfolioData} = useSelector((state) => state.root);
  const onFinish = async(values) => {
    try {
      dispatch(ShowLoading())
      const response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData.contact._id,
      });
      dispatch(HideLoading())
      if(response.data.success){
        message.success(response.data.message)
      }else{
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  };


  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contact}>
        <Form.Item name='name' label='Name'>
          <input placeholder='Name'/>
        </Form.Item>
        <Form.Item name='gender' label='Gender'>
          <input placeholder='Gender'/>
        </Form.Item>
        <Form.Item name='age' label='Age'>
          <input placeholder='Age'/>
        </Form.Item>
        <Form.Item name='email' label='Email'>
          <input placeholder='Email'/>
        </Form.Item>
        <Form.Item name='mobile' label='Mobile'>
          <input placeholder='Mobile'/>
        </Form.Item>
        <Form.Item name='state' label='State'>
          <input placeholder='State'/>
        </Form.Item>
        <Form.Item name='address' label='Address'>
          <textarea placeholder='Address'/>
        </Form.Item>
        <div className='flex justify-end mb-5' label='name'>
          <button className='px-5 py-2 bg-primary text-white rounded-md' type='submit'>SAVE</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminContact;
