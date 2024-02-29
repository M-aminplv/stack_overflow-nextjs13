"use server"

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose"
import Question from "@/database/question.modal";

export async function createQuestion
(params: any) {
  // eslint-disable-next-line no-empty
  connectToDatabase()
  try{
    connectToDatabase();
    const {title, content, tags, author, path} = params;
    // Create the question 
    const question = await Question.create({
      title,
      content,
      author
    })

    const tagDocuments = [];
    // Create the tags or get them if they already exist
    for ( const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {name : {$regex: new RegExp(`^${tag}$`, "i")}},
        {$setOnInsert: {naem:tag},$push: { question: question._id}},
        {upsert: true, new:true}
      )

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {tags: {$each: tagDocuments}}
    })


    // Create on interaction record for the user's ask_question action 

    // Increment author's reputation by +5 for creation a question

  } catch (error) {

  }
}