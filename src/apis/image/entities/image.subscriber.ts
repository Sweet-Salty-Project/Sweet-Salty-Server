import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { SoftRemoveEvent } from 'typeorm/subscriber/event/SoftRemoveEvent';
import { Image } from './image.entity';

@EventSubscriber()
export class ImageSubscriber implements EntitySubscriberInterface<Image> {
  constructor(
    //
    connection: Connection,
    private readonly config: ConfigService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Image;
  }

  async afterSoftRemove(event: SoftRemoveEvent<Image>) {
    const storage = new Storage({
      keyFilename: this.config.get('STORAGE_KEY_FILENAME'),
      projectId: this.config.get('STORAGE_PROJECT_ID'),
    }).bucket(this.config.get('STORAGE_BUCKET'));
    const deleteURL = event.databaseEntity.url.substring(12);

    await storage.file(deleteURL).delete();
  }
}
