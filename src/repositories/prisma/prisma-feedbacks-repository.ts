import { FeedbacksCreateData, FeedbacksRepository } from "../feedbacks-repository";
import { prisma } from "../../prisma";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({type,comment,screenshot}: FeedbacksCreateData){
    const feedback = await prisma.feedback.create({
      data:{
        type,
        comment,
        screenshot
    }})
  }
}