import ICreateNotificationsDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>;
}
