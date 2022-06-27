import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

describe('Submit feedback', () => {
  const createFeedbackSpy = jest.fn()
  const sendMailSpy = jest.fn()

  const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
  )

  it('Should be able to submit a feedback', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'any comment',
      screenshot: 'data:image/png;base64,any'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })


  it('Should not be able to submit a feedback without a type', async ()=>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'any comment',
      screenshot: 'data:image/png;base64,any'
    })).rejects.toThrow()
  })

  it('Should not be able to submit a feedback without a comment', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,any'
    })).rejects.toThrow()
  })

  it('Should not be able to submit a feedback with an invalid screenshot', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'any comment',
      screenshot: 'any'
    })).rejects.toThrow()
  })
  
})