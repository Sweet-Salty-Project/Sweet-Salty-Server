import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  UpdateEvent,
  getConnection,
} from 'typeorm';
import { MessageInfo } from './messageInfo.entity';

@EventSubscriber()
export class MessageInfoSubscriber
  implements EntitySubscriberInterface<MessageInfo>
{
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return MessageInfo;
  }

  async afterUpdate(event: UpdateEvent<MessageInfo>) {
    const data = await event.connection
      .getRepository(MessageInfo)
      .findOne(event.entity.id);

    if (data.deleteCheckData === 2) {
      await getConnection()
        .createQueryBuilder()
        .softDelete()
        .from(MessageInfo)
        .where({ messageInfoId: data.messageInfoId })
        .execute();
    }

    // event.connection
    //   .getRepository(MessageInfo)
    //   .findOne({ where: { messageInfoId: event.entity.messageInfoId } });

    //(data);
  }
}
