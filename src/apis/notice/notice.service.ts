import {
  ConflictException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { SubCategory } from '../subCategory/entities/subCategory.entity';
import { Notice } from './entities/notice.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Cache } from 'cache-manager';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  async create({ createNoticeInput }) {
    const { noticeCategory, url, ...data } = createNoticeInput;

    // const isAdmin = await getConnection()
    //   .createQueryBuilder()
    //   .select('user')
    //   .from(User, 'user')
    //   .where({ userId: currentUser.userId })
    //   .getOne();

    // if (isAdmin.userState === false)
    //   throw new ConflictException('관리자만 글을 작성할 수 있습니다.');

    const subCategory = await getConnection()
      .createQueryBuilder()
      .select('subCategory')
      .from(SubCategory, 'subCategory')
      .where({ subCategoryName: noticeCategory })
      .getOne();

    const notice = await this.noticeRepository.save({
      ...data,
      subCategory: subCategory,
      noticeSubject: subCategory.subCategoryName,
    });

    if (url) {
      url.reduce(async (acc, cur) => {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Image)
          .values({
            notice: notice.noticeId,
            url: cur,
          })
          .execute();
      }, '');
    }

    return notice;
  }

  async elasticsearchFindTitle({ title }) {
    const redisInData = await this.cacheManager.get(title);
    if (redisInData) {
      return redisInData;
    } else {
      const data = await this.elasticsearchService.search({
        index: 'notice',
        size: 10000,
        sort: 'createat:desc',
        _source: [
          'noticeid',
          'createat',
          'noticetitle',
          'noticesubject',
          'noticewriter',
          'noticehit',
        ],
        query: {
          match: {
            noticetitle: title,
          },
        },
      });
      await this.cacheManager.set(title, data, { ttl: 10 });
      return data;
    }
  }

  async elasticsearchFindContents({ contents }) {
    const redisInData = await this.cacheManager.get(contents);
    if (redisInData) {
      return redisInData;
    } else {
      const data = await this.elasticsearchService.search({
        index: 'notice',
        size: 10000,
        sort: 'createat:desc',
        _source: [
          'noticeid',
          'createat',
          'noticetitle',
          'noticesubject',
          'noticewriter',
          'noticehit',
        ],
        query: {
          match: {
            noticecontents: contents,
          },
        },
      });
      await this.cacheManager.set(contents, data, { ttl: 10 });
      return data;
    }
  }

  async findOne({ noticeId }) {
    return await this.noticeRepository.findOne({
      where: {
        noticeId,
      },
      relations: ['images'],
    });
  }

  async findPick({ page, category }) {
    if (!page) {
      return await getConnection()
        .createQueryBuilder()
        .select('notice')
        .from(Notice, 'notice')
        .leftJoinAndSelect('notice.subCategory', 'subCategory')
        .leftJoinAndSelect('subCategory.topCategory', 'topCategory')
        .where('subCategoryName = :data', {
          data: category,
        })
        .offset(0)
        .limit(10)
        .orderBy('createAt', 'DESC')
        .getMany();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .select('notice')
        .from(Notice, 'notice')
        .leftJoinAndSelect('notice.subCategory', 'subCategory')
        .leftJoinAndSelect('subCategory.topCategory', 'topCategory')
        .where('subCategoryName = :data', {
          data: category,
        })
        .offset((page - 1) * 10)
        .limit(10)
        .orderBy('createAt', 'DESC')
        .getMany();
    }
  }

  async findALL({ page }) {
    if (!page) {
      return await getConnection()
        .createQueryBuilder()
        .select('notice')
        .from(Notice, 'notice')
        .leftJoinAndSelect('notice.subCategory', 'subCategory')
        .leftJoinAndSelect('subCategory.topCategory', 'topCategory')
        .where('topCategoryName = :data', {
          data: 'NOTICE',
        })
        .offset(0)
        .limit(10)
        .orderBy('createAt', 'DESC')
        .getMany();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .select('notice')
        .from(Notice, 'notice')
        .leftJoinAndSelect('notice.subCategory', 'subCategory')
        .leftJoinAndSelect('subCategory.topCategory', 'topCategory')
        .where('topCategoryName = :data', {
          data: 'NOTICE',
        })
        .offset((page - 1) * 10)
        .limit(10)
        .orderBy('createAt', 'DESC')
        .getMany();
    }
  }

  async getCount({ category }) {
    if (category === 'ALL') {
      return await getConnection()
        .createQueryBuilder()
        .from(Notice, 'notice')
        .getCount();
    } else {
      return await getConnection()
        .createQueryBuilder()
        .from(Notice, 'notice')
        .leftJoin('notice.subCategory', 'subCategory')
        .where('subCategoryName = :data', {
          data: category,
        })
        .getCount();
    }
  }
}
