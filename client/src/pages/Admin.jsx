import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { validateProject } from "../utils/validators";

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    technologies: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`)
      .then((res) => setProjects(res.data.projects))
      .catch(() => toast.error("Failed to fetch projects"));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProject(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("link", formData.link);
    data.append("technologies", formData.technologies);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/projects/${editId}`,
          data,
          {
            headers: { "x-auth-token": token },
          }
        );
        toast.success("Project updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, data, {
          headers: { "x-auth-token": token },
        });
        toast.success("Project added successfully!");
      }

      setFormData({
        title: "",
        description: "",
        link: "",
        technologies: "",
        image: null,
      });
      setEditId(null);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(res.data.projects);
    } catch (error) {
      toast.error("Operation failed.");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      link: project.link,
      technologies: project.technologies.join(", "),
      image: null,
    });
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        headers: { "x-auth-token": token },
      });
      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Admin Dashboard
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mb-8 bg-white dark:bg-gray-900 p-6 rounded shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Link
          </label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          />
          {errors.technologies && (
            <p className="text-red-500 text-sm">{errors.technologies}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {editId ? "Update Project" : "Add Project"}
        </button>
      </motion.form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            className="bg-white dark:bg-gray-800 shadow p-4 rounded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {project.description}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </a>
              )}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tech: {project.technologies.join(", ")}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
