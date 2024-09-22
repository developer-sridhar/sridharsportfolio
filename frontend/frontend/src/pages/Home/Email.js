import React, { useState } from "react";
import emailjs from "emailjs-com";

const Email = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      sendEmail();
    }
  };

  const sendEmail = () => {
    setLoading(true);
    emailjs
      .send(
        "service_o0vlpid",
        "template_78fajls",
        formData,
        "UdGjt0GOHOxqhFqWq"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
          setLoading(false);
        },
        (err) => {
          console.error("FAILED...", err);
          setLoading(false);
        }
      );
  };

  return (
    <div className="glassmorphism-container max-w-md mx-auto my-8 p-6 shadow-lg rounded-md md:max-w-lg lg:max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">CONTACT US !!!</h2>
        <div>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}
        </div>
        <div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.message && <p className="text-red-500 text-sm">Message is required.</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
        {isSubmitted && <p className="text-green-500 text-sm mt-4">Email sent successfully to Sridhar!!!</p>}
      </form>
    </div>
  );
};

export default Email;
