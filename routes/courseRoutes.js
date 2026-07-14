// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");
// const {
//   createCourse,
//   getCourses,
//   getSingleCourse,
//   updateCourse,
//   deleteCourse,
//   getCourseBySlug,

// } = require("../controllers/courseController");
// const authMiddleware = require("../middleware/authMiddleware");

// router.post("/",upload.single("thumbnail"), createCourse);
// router.get("/", getCourses);
// router.get("/:id", getSingleCourse);
// // router.put("/:id", updateCourse);
// router.put("/:id", upload.single("thumbnail"),updateCourse);
// router.delete("/:id", deleteCourse);
// router.get("/slug/:slug", getCourseBySlug);

// module.exports = router;

const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, upload.fields([
    {name: "thumbnail",  maxCount: 1, },
    {name: "videoFile",maxCount: 1, },
  ]),
  createCourse,
);

router.get("/", getCourses);
router.get("/:id", getSingleCourse);
router.put("/:id",authMiddleware,upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "videoFile",
      maxCount: 1,
    },
  ]),
  updateCourse,
);

router.delete("/:id", authMiddleware, deleteCourse);

router.get("/slug/:slug", getCourseBySlug);

module.exports = router;
