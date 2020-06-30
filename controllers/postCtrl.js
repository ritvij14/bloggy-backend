const Post = require("../models/postModel");

exports.postGetAll = (req, res, next) => {

    Post.find()
        .select('_id title content date')
        .then((posts) => {
            res.status(200).json({

                message: `Number of blogs: ${posts.length}`,
                posts: posts.map(post => {
                    return Object.assign({}, {

                        title: post.title,
                        content: post.content,
                        id: post._id,
                        request: {
                            type: 'GET',
                            endpoint: '/posts/selected/' + post._id
                        }
                    })
                })
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.postGetSelected = (req, res, next) => {

    const id = req.params.postId;

    Post.findById(id)
        .select('_id title content date')
        .exec()
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: "No valid post found"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};

exports.postDelete = (req, res, next) => {

    const id = req.params.postId;

    Post.remove({
            _id: id
        })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.postAdd = (req, res, next) => {

    const post = new Post(req.body);

    post.save()
        .then(result => {
            console.log(res);
            res.status(201).json({
                message: "POST add new blog",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.postUpdate = (req, res, next) => {
    const id = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Post.updateOne({
            _id: id
        },
        {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};