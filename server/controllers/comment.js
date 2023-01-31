// import { z } from "zod"
// import Post from "../models/Post.js";

/* Dodawanie komentarza do postu */

import { z } from "zod"
import Post from "../models/Post.js";

const commentSchema = z.object({
    userId: z.string(),
    comments: z.string().min(5),
    // firstName: z.string(),
    // lastName: z.string(),
});

export const comment = async (req, res) => {
    const validation = commentSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).send({ message: validation.message });
    }

    const { comments, userId,  } = validation.data;
    try {
        // const post = await Post.findOne({ where: { userId, firstName, lastName } });
        const post = await Post.findOneAndUpdate({userId}, {$push: {comments: comments}}, {new: true});
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        // post.comments.push(comments)
        // await post.save()
        return res.status(201).send({ message: "Comment created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
};



// const commentSchema = z.object ({
//     userId: z.string(),
//     comments: z.string().min(5),
// })

// export const comment = async(req, res) =>{
//     const validation = commentSchema.safeParse(req.body);
//     const { comments, userId } = validation.data;
//     try {
//         const commentAdd = await Post.create({
//             data: {
//                 comments: [comments] 
//             },
//             where: {
//                 userId: userId,
//             },
//         });

//     } catch (err) {
//         res.status(500);
//     }

// } 

// export default {
//     comment,
// }


// export const likePost = async (req, res) => {
//     try{
//         const { id } = req.params;
//         const { userId } = req.body;
//         const post = await Post.findById(id);
//         const isLiked = post.likes.get(userId);

//         if(isLiked){
//             post.likes.delete(userId);
//         }else{
//             post.likes.set(userId, true);
//         }

//         const updatedPost = await Post.findByIdAndUpdate(
//             id,
//             { likes: post.likes },
//             { new: true }
//         );

//         res.status(200).json(updatedPost);
//     }catch(err){
//         restart.status(404).json({ message: err.message })
//     }