import { FeedbacksRepository } from "../repositories/feedbacks-repository";


interface  SubmitFeedbackUseCaseRequest{
  type: string,
  comment: string,
  screenshot?: string
}

export class SubmitFeedbackUseCase{
  constructor(
    private feedbacksRepository: FeedbacksRepository
  ){}
  async execute({type, comment, screenshot}: SubmitFeedbackUseCaseRequest){
    await this.feedbacksRepository.create({type, comment, screenshot});
  }
}