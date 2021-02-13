import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/ImailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
