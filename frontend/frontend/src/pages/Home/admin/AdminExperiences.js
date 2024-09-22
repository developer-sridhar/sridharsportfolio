import { Form, Modal, message } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading, ReloadData } from "../../../redux/rootSlice";

const Experiences = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experience || [];
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
        response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/update-experience", {
          ...values,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/add-experience", values);
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
      const response = await axios.post("https://sridharsportfolio.onrender.com/api/portfolio/delete-experience", {
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

  const openModal = (experience = null) => {
    setSelectedItemForEdit(experience);
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
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5">
        {experiences.map((experience) => (
          <div
            key={experience._id}
            className="shadow border p-5 border-gray-400 flex flex-col rounded-md relative h-full"
          >
            <h1 className="text-lg text-white font-bold mb-2 bg-secondary pt-1 pb-1 text-center rounded">
              {experience.period}
            </h1>
            <hr className="text-primary "/>
            <h1 className="font-bold">Company: <span className="font-medium">{experience.company}</span></h1>
            <h1 className="font-bold">Role: <span className="font-medium">{experience.title}</span></h1>
            <h1 className="font-bold">Description:</h1>
            <p className="flex-1 overflow-auto">{experience.description}</p> {/* Use overflow-auto for proper content display */}
            <div className="absolute bottom-5 right-5 flex gap-5 bg-white pl-1 lg:pl-40 sm:pl-52 rounded-sm  ">
              <button
                className="bg-primary text-white px-5 py-2 rounded-md"
                onClick={() => openModal(experience)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-5 py-2 rounded-md"
                onClick={() => onDelete(experience)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        footer={null}
        onCancel={() => setShowAddEditModal(false)}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="period" label="Period">
            <input placeholder="Period" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <Form.Item name="company" label="Company">
            <input placeholder="Company" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <Form.Item name="title" label="Title">
            <input placeholder="Title" className="w-full p-2 border rounded-md" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea placeholder="Description" className="w-full p-2 border rounded-md" />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <button
              className="border border-primary text-primary px-5 py-2 rounded-md"
              onClick={() => {
                setShowAddEditModal(false);
              }}
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

export default Experiences;
