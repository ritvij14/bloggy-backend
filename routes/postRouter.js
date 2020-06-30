const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const postController = require("../controllers/postCtrl");

//      GET all posts
router.get("/all", postController.postGetAll);

//      GET selected post
router.get("/selected/:postId", postController.postGetSelected);

//      DELETE selected post
router.delete("/delete/:postId", checkAuth, postController.postDelete);

//      POST add post
router.post("/add", checkAuth, postController.postAdd);

//      PATCH update post
router.patch("/update/:postId", checkAuth, postController.postUpdate);

module.exports = router;