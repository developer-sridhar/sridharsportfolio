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
        response = await axios.post("/api/portfolio/update-course", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-course", values);
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
      const response = await axios.post("/api/portfolio/delete-course", {
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
          className="bg-primary px-5 py-2 text-white rounded-md"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <div
            key={course._id}
            className="shadow border p-5 border-gray-400 flex flex-col rounded-md h-full"
          >
            <h1 className="text-lg text-white font-bold mb-2 bg-secondary rounded-md text-center pt-1 pb-1">
              {course.title}
            </h1>
            <img src={course.image} alt="" className="h-52 w-full object-contain mb-3 rounded-md" />
            <h1>Description:</h1>
            <p className="mb-3">{course.description}</p>
            <h1>Link: <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{course.link}</a></h1>
            <div className="flex justify-end gap-5 mt-auto">
              <button
                className="bg-primary text-white px-5 py-2 rounded-md"
                onClick={() => openModal(course)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-md"
                onClick={() => onDelete(course)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title">
            <input placeholder="Title" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea placeholder="Description" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <input placeholder="Image URL" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <input placeholder="Link" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <Form.Item name="technologies" label="Technologies">
            <input placeholder="Technologies" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <div className="flex justify-end gap-3">
            <button
              className="border border-primary text-primary px-5 py-2 rounded-md"
              onClick={() => setShowAddEditModal(false)}
            >
              Cancel
            </button>
            <button className="bg-primary text-white px-5 py-2 rounded-md" type="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCourses;
