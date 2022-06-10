// import { ConflictException } from '@nestjs/common';
// import { Test } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../entities/user.entity';
// import { UserService } from '../user.service';
// import {} from '../entities/user.entity';

// class MonkUserRepository<User> {
//   MonkUserData = [
//     {
//       userId: '826583c4-7584-4cf1-b182-5519d987cfec',
//       userState: 'true',
//       userEmail: 'yukina1418@gmail.com',
//       userPassword:
//         '$2b$10$CyjRLmQ3r1yrWmKP3WEi4OCFmzzW38zlC/x930l7dIdF0shkt1B.a',
//       userName: '테스트',
//       userNickName: '마요',
//       userImage: 'dd',
//       userPhone: '01034017015',
//       userAddress: '주소',
//       userPoint: 0,
//       ageGroup: 'NONE',
//       gender: 'PRIVATE',
//       userSignUpSite: '단짠맛집',
//       createAt: '2022-05-21 12:05:28.751354000',
//       updateAt: '2022-05-21 12:05:43.958192000',
//     },
//   ];

//   findOne({ email }) {
//     const user = this.MonkUserData.filter((el) => el.userEmail === email);
//     if (user.length) return user[0];
//     return null;
//   }
//   //  findOne: jest.fn()
// }

// type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// describe('UserService', () => {
//   let userService: UserService;
//   let userRepository: MockRepository<User>;

//   beforeEach(async () => {
//     const userModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(User),
//           useValue: MockRepository(),
//           // 디비만 가짜로 사용해서 하는 방법이다
//         },
//       ],
//     }).compile();

//     userService = userModule.get<UserService>(UserService);
//     userRepository = userModule.get<MonkUserRepository<User>>(
//       getRepositoryToken(User),
//     );
//   });

//   describe('findOne', () => {
//     it('정보 가져오기', async () => {
//       const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');

//       const data = {
//         userId: '826583c4-7584-4cf1-b182-5519d987cfec',
//         userState: 'true',
//         userEmail: 'yukina1418@gmail.com',
//         userPassword:
//           '$2b$10$CyjRLmQ3r1yrWmKP3WEi4OCFmzzW38zlC/x930l7dIdF0shkt1B.a',
//         userName: '테스트',
//         userNickName: '마요',
//         userImage: 'dd',
//         userPhone: '01034017015',
//         userAddress: '주소',
//         userPoint: 0,
//         ageGroup: 'NONE',
//         gender: 'PRIVATE',
//         userSignUpSite: '단짠맛집',
//         createAt: '2022-05-21 12:05:28.751354000',
//         updateAt: '2022-05-21 12:05:43.958192000',
//       };

//       try {
//         await userService.findOne({ ...data });
//       } catch (error) {
//         expect(error).toBeInstanceOf(ConflictException);
//         // toBeInstanceOf 웹서비스 오류
//       }
//       expect(userRepositorySpyFindOne).toBeCalledTimes(1);
//     });
//   });
// });
