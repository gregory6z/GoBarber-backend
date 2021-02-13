//  index , show , create , update ,delete.
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgetPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgetPasswordEmailService = container.resolve(
      SendForgetPasswordEmailService,
    );

    await sendForgetPasswordEmailService.execute({
      email,
    });

    return response.status(204).json();
  }
}
