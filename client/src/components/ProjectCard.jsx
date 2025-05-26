import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" },
};

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Project
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
