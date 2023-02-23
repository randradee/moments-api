import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Comment from 'App/Models/Comment'

export default class CommentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const momentId = request.param('momentId')

    await Moment.findOrFail(momentId)

    body.momentId = momentId

    const comment = await Comment.create(body)

    response.status(201)
    return {
      message: 'Comentário criado com sucesso',
      data: comment,
    }
  }
  public async destroy({ request, response }: HttpContextContract) {
    const momentId = request.param('momentId')
    const commentId = request.param('id')

    await Moment.findOrFail(momentId)
    const comment = await Comment.findOrFail(commentId)

    comment.delete()
    return {
      message: `Comentário ${commentId} do momento ${momentId} excluído com sucesso`,
    }
  }
}
