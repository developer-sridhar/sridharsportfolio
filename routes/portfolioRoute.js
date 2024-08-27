const express = require("express");
const router = express.Router();
const {
  Intro,
  About,
  Experience,
  Project,
  Course,
  Contact,
} = require("../models/portfolioModel");
const User = require("../models/userModel");

// Get portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const intros = await Intro.find();
    const abouts = await About.find();
    const projects = await Project.find();
    const contacts = await Contact.find();
    const experiences = await Experience.find();
    const courses = await Course.find();

    res.status(200).send({
      intro: intros[0],
      about: abouts[0],
      project: projects,
      contact: contacts[0],
      experience: experiences, // Return all experiences
      course: courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching data" });
  }
});

// Update intro
router.post("/update-intro", async (req, res) => {
  try {
    const updatedIntro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    if (!updatedIntro) {
      return res
        .status(404)
        .json({ success: false, message: "Intro not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        data: updatedIntro,
        message: "Intro updated successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update intro",
        error: error.message,
      });
  }
});

// Update about
router.post("/update-about", async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({
        data: about,
        success: true,
        message: "About Updated Successfully",
      });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to update about",
        error: error.message,
      });
  }
});

// Add experience
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res
      .status(200)
      .send({
        data: experience,
        success: true,
        message: "Experience Added Successfully",
      });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to add experience",
        error: error.message,
      });
  }
});

// Update experience
router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );
    if (experience) {
      res
        .status(200)
        .send({
          data: experience,
          success: true,
          message: "Experience Updated Successfully",
        });
    } else {
      res.status(404).send({ success: false, message: "Experience not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to update experience",
        error: error.message,
      });
  }
});

// Delete experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.body._id);
    if (experience) {
      res
        .status(200)
        .send({
          data: experience,
          success: true,
          message: "Experience Deleted Successfully",
        });
    } else {
      res.status(404).send({ success: false, message: "Experience not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to delete experience",
        error: error.message,
      });
  }
});

// Add project
router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res
      .status(200)
      .send({
        data: project,
        success: true,
        message: "Project Added Successfully",
      });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to add project",
        error: error.message,
      });
  }
});

// Update project
router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    if (project) {
      res
        .status(200)
        .send({
          data: project,
          success: true,
          message: "Project Updated Successfully",
        });
    } else {
      res.status(404).send({ success: false, message: "Project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to update project",
        error: error.message,
      });
  }
});

// Delete project
router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.body._id);
    if (project) {
      res
        .status(200)
        .send({
          data: project,
          success: true,
          message: "Project Deleted Successfully",
        });
    } else {
      res.status(404).send({ success: false, message: "Project not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to delete project",
        error: error.message,
      });
  }
});

// Add course
router.post("/add-course", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res
      .status(200)
      .send({
        data: course,
        success: true,
        message: "Course Added Successfully",
      });
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to add course",
        error: error.message,
      });
  }
});

// Update course
router.post("/update-course", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    if (course) {
      res
        .status(200)
        .send({
          data: course,
          success: true,
          message: "Course Updated Successfully",
        });
    } else {
      res.status(404).send({ success: false, message: "Course not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to update course",
        error: error.message,
      });
  }
});

// Delete course
router.post("/delete-course", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.body._id);
    if (course) {
      res
        .status(200)
        .send({
          data: course,
          success: true,
          message: "Course Deleted Successfully",
        });
    } else {
      res.status(404).send({ success: false, message: "Course not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        success: false,
        message: "Failed to delete course",
        error: error.message,
      });
  }
});

// Update contact information
router.post("/update-contact", async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        data: updatedContact,
        message: "Contact updated successfully",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update contact",
        error: error.message,
      });
  }
});

// Admin login
router.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      success: false,
      message: "Username and Password are required",
    });
  }

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = router;
