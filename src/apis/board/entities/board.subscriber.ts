import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  InsertEvent,
} from 'typeorm';
import { SoftRemoveEvent } from 'typeorm/subscriber/event/SoftRemoveEvent';

import { Board } from './board.entity';

@EventSubscriber()
export class BoardSubscriber implements EntitySubscriberInterface<Board> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Board;
  }

  async afterInsert(event: InsertEvent<Board>) {
    const data = event.entity.boardContents.match(
      /[a-z]{3,5}\_{1,2}[a-z]{3,5}\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,4}(\/\S*)?/,
    );
    const thumbnail111 = data[0];
    event.entity.boardId;

    //  (thumbnail);
    // await getConnection()
    //   .createQueryBuilder()
    //   .update(Board)
    //   .set({ thumbnail: thumbnail111 })
    //   .where({ boardId: event.entity.boardId })
    //   .execute();
  }
}

// 조금 큰 사이즈
// 정규식
// match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)
