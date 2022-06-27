import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "051b77cb288153",
    pass: "6891018290bb29"
  }
});

routes.post('/feedbacks', async (req, res) =>{
  const {type, comment, screenshot} = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository)

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  // await transport.sendMail({
  //   from: 'Equipe Feedget <hi@mail.com>',
  //   to: 'Lucas Reis <reislcr.rj@gmail.com>',
  //   subject: 'New Feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
  //     `<p> Tipo do feedback: ${type}<p/>`,
  //     `<p> Comentário: ${comment}<p/>`,
  //     `</div>`,
  //   ].join('\n')
  // })
  return res.status(201).send()
})