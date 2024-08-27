import { Form, Modal, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading, ReloadData } from "../../../redux/rootSlice";

const AdminProjects = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const projects = portfolioData?.project || [];
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
        response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/update-project", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/add-project", values);
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
      const response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/delete-project", {
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

  const openModal = (project = null) => {
    setSelectedItemForEdit(project);
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
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {projects.map((project) => (
          <div
            key={project._id}
            className="shadow border p-5 border-gray-400 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-xl text-primary font-bold">
                {project.title}
              </h1>
              <img src={project.image} alt="" className="h-62 w-full"/>
              <h1>Technologies: {project.technologies}</h1>
              <h1>Description: {project.description}</h1>
              <h1>Link: {project.link}</h1>
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-primary text-white px-5 py-2 rounded-md"
                onClick={() => openModal(project)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-md"
                onClick={() => onDelete(project)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        visible={showAddEditModal}
        title={selectedItemForEdit ? "Edit project" : "Add project"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title">
            <input placeholder="Title" className="w-full p-2 border rounded"/>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <input placeholder="Description" className="w-full p-2 border rounded"/>
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <input placeholder="Image URL" className="w-full p-2 border rounded"/>
          </Form.Item>
          <Form.Item name="link" label="Link">
            <input placeholder="Paste URL Link" className="w-full p-2 border rounded"/>
          </Form.Item>
          <Form.Item name="technologies" label="Technologies">
            <input placeholder="Technologies" className="w-full p-2 border rounded"/>
          </Form.Item>
          <div className="flex justify-end gap-3">
            <button
              className="border-primary text-primary px-5 py-2 rounded-md"
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

export default AdminProjects;
