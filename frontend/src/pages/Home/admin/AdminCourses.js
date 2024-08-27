import { Form, Modal, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading, ReloadData } from "../../../redux/rootSlice";

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const courses = portfolioData?.course || [];
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (showAddEditModal) {
      if (selectedItemForEdit) {
        form.setFieldsValue(selectedItemForEdit);
      } else {
        form.resetFields();
      }
    }
  }, [showAddEditModal, selectedItemForEdit, form]);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/add-course", values);
      }
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        form.resetFields();
        dispatch(ReloadData(true)); 
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/delete-course", {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const openModal = (course = null) => {
    setSelectedItemForEdit(course);
    setShowAddEditModal(true);
  };

  return (
    <div className="p-5">
      <div className="flex justify-end mb-5">
        <button
          className="bg-primary px-5 py-2 text-white rounded"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add course
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {courses.map((course) => (
          <div
            key={course._id}
            className="shadow border p-5 border-gray-400 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-xl text-primary font-bold">
                {course.title}
              </h1>
              <img src={course.image} alt="" className="h-62 w-full"/>
             
