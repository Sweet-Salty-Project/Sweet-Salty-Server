// async loginCreate({ currentUser, createBoardInput, createBoardTagsInput }) {
//     const { boardTagMenu, boardTagRegion, boardTagTogether } =
//       createBoardTagsInput;

//     const board_Tags = [];

//     const stop = await Promise.all([
//       boardTagMenu.map(async (el: string) => {
//         const data: Promise<BoardTag> = new Promise(async (resolve) => {
//           const menu = el.substring(1);
//           const menuData = await this.boardTagRepository.findOne({
//             boardTagMenu: menu,
//           });
//           board_Tags.push(menuData);
//           resolve(menuData);
//         });
//         //  board_Tags.push(await data);
//       }),
//       boardTagRegion.map(async (el: string) => {
//         const data: Promise<BoardTag> = new Promise(async (resolve) => {
//           const region = el.substring(1);
//           const regionData = await this.boardTagRepository.findOne({
//             boardTagRegion: region,
//           });
//           board_Tags.push(regionData);
//           resolve(regionData);
//         });
//         //      board_Tags.push(await data);
//       }),
//       boardTagTogether.map(async (el: string) => {
//         const data: Promise<BoardTag> = new Promise(async (resolve) => {
//           const together = el.substring(1);
//           const togetherData = await this.boardTagRepository.findOne({
//             boardTagTogether: together,
//           });
//           board_Tags.push(togetherData);
//           resolve(togetherData);
//         });
//         //board_Tags.push(await data);
//       }),
//     ]);

//     const user = await getConnection()
//       .createQueryBuilder()
//       .select('user')
//       .from(User, 'user')
//       .where({ userId: currentUser.userId })
//       .getOne();

//     (board_Tags);

//     const result = await this.boardRepository.save({
//       ...createBoardInput,
//       boardWriter: user.userNickname,
//       user: currentUser.userId,
//       boardTags: board_Tags,
//     });

//     return result;
//   }

//====

// const data = await getConnection()
//   .createQueryBuilder()
//   .from(Board, 'board')
//   .from(BoardSide, 'boardSide')
//   .from(BoardTag, 'boardTag')
//   .leftJoinAndSelect('board.boardSides', 'boardSide')
//   .leftJoinAndSelect('boardTag.boardSides', 'boardSide')
//   .where('board.boardId = :id', { id: result.boardId })
//   .andWhere('boardTag.boardTagId = :id', {
//     id: 'bbe4d4a4-c391-49a2-9715-5fef068dfb06',
//   })
//  .getOne();

// boardTagMenu.map(async (el) => {
//     const menu = el.substring(1);
//     const menuData = await this.boardTagRepository.findOne({
//       boardTagMenu: menu,
//     });
//     await getConnection()
//       .createQueryBuilder()
//       .insert()
//       .into(BoardSide)
//       .values({
//         boards: board.boardId,
//         boardTags: menuData,
//       })
//       .execute();
//   })
// const rr = await getConnection()
//   .createQueryBuilder()
//   .select('board')
//   .from(Board, 'board')
//   .relation('boardSides')
//   .of('Board')
//   .loadMany();

// (rr);
