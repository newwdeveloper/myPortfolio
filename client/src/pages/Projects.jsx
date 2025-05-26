import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          // eslint-disable-next-line no-undef
          `${import.meta.env.VITE_API_URL}/projects`
        );
        setProjects(res.data.projects || []);
        console.log("Projects response:", res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8"
      >
        My Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
      >
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
