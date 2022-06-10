import { ConflictException, Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { SubCategory } from '../subCategory/entities/subCategory.entity';
import { TopCategory } from '../topCategory/entities/topCategory.entity';

@Injectable()
export class AdminService {
  async createTag({ createTagInput }) {
    const { boardTagName, boardTagRefName } = createTagInput;

    boardTagName.reduce(async (acc, cur) => {
      const data = await getConnection()
        .createQueryBuilder()
        .select('boardTag')
        .from(BoardTag, 'boardTag')
        .where({ boardTagName: cur })
        .getOne();
      data;

      if (data === undefined) {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(BoardTag)
          .values({
            boardTagName: cur,
            boardTagRefName,
          })
          .execute();
      }
    }, '');

    return '반영되었습니다.';
  }

  async findTags({ refName }) {
    return await getConnection()
      .createQueryBuilder()
      .select('boardTag')
      .from(BoardTag, 'boardTag')
      .where({ boardTagRefName: refName })
      .orderBy('boardTagName', 'ASC')
      .getMany();
  }

  async createTopCategory() {
    const checkData = await getConnection()
      .createQueryBuilder()
      .select()
      .from(TopCategory, 'topCategory')
      .getMany();

    checkData.length;

    if (checkData.length !== 0)
      throw new ConflictException('이미 생성되었습니다.');

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TopCategory)
      .values({ topCategoryName: 'NOTICE' })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TopCategory)
      .values({ topCategoryName: 'COMMUNITY' })
      .execute();

    return 'NOTICE, COMMUNITY 2개의 상위 카테고리가 생성되었습니다.';
  }

  async createSubCategory() {
    const checkData = await getConnection()
      .createQueryBuilder()
      .select('subCategory')
      .from(SubCategory, 'subCategory')
      .getMany();

    if (checkData.length !== 0)
      throw new ConflictException('이미 생성되었습니다.');

    const Notice = await getConnection()
      .createQueryBuilder()
      .select('topCategory')
      .from(TopCategory, 'topCategory')
      .where({ topCategoryName: 'NOTICE' })
      .getOne();

    const Community = await getConnection()
      .createQueryBuilder()
      .select('topCategory')
      .from(TopCategory, 'topCategory')
      .where({ topCategoryName: 'COMMUNITY' })
      .getOne();

    const CommunityBoard = ['REVIEW', 'REQUEST', 'VISITED', 'TASTER'];

    const NoticeBoard = ['NOTICE', 'EVENT', 'PROMOTION', 'TASTING'];

    CommunityBoard.map(async (el) => {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(SubCategory)
        .values({ subCategoryName: el, topCategory: Community })
        .execute();
    });

    NoticeBoard.map(async (el) => {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(SubCategory)
        .values({ subCategoryName: el, topCategory: Notice })
        .execute();
    });

    return '생성되었습니다.';
  }
}
