# <span style="color:orange"> 단짠맛집 </span>

배포 URL : https://sweetsalty.shop

팀 노션 : [![](https://velog.velcdn.com/images/yukina1418/post/cc1e69ee-6376-4fb6-8ff5-ab3b7ecd0068/image.svg)](https://www.notion.so/dingco/8-79bf71f71eac424fac275e09407115fd)

#### 목차

1. [실행 방법](#실행-방법)
2. [기획의도](#기획-의도)   
3. [팀원소개](#팀원-소개)   
4. [기술스택](#기술-스택)   
5. [ERD](#erd)
6. [Api Docs](#api-docs)
7. [페이지 구성](#페이지-구성)
8. [환경변수](#env-환경변수)

## 실행 방법

목차 8번의 env 파일 구성요소를 전부 추가한 후 <br>
docker-compose build -> docker-compose up <br>
http://localhost:3000/graphql 에서 확인

## 기획 의도

Youtube에 의하여 정보매체가 주가 되어버린 현재, 최근 들어 <br>
네이버 블로그 등의 텍스트 매체를 다시 사용하길 원하는 니즈가 있는 것을 확인했습니다.

또한 가짜 정보 혹은 원치 않는 정보가 많은 인터넷 세상 속에서 원하는 정보만을 골라서 찾을 수 있기를 원했고 <br>
그래서 생각한 것이 제가 좋아하는 음식을 기준으로 리뷰를 적는 사이트를 만들어보자!였습니다.

기존에 있던 망고 플레이트, 다이닝 코드, 식신과 같은 사이트는 매장이 주가 되거나 크롤링에 의한 사이트였다면 <br>
제가 생각한 사이트는 직접적으로 사용자들이 식당을 평가하고 자유롭게 커뮤니티 같은 사이트를 구성하길 원했고 <br>
최근 코로나로 인하여 소상공인분들께서 큰 피로감을 가지고 있는 것도 고려하여 <br>
상대적으로 홍보를 하기 힘든 소상공인의 부담을 줄일 수 있는 콘텐츠도 담아보았습니다.

## 팀원 소개

![](https://velog.velcdn.com/images/yukina1418/post/46fa979d-1ef1-4830-b331-bb7b6f8aff63/image.png)

![](https://velog.velcdn.com/images/yukina1418/post/7a983632-af4b-4e21-a24d-844ca2a7f16e/image.png)

## 기술 스택

![](https://velog.velcdn.com/images/yukina1418/post/f34d612c-4cf9-4f8d-8306-e775556943e5/image.png)

## ERD

![](https://velog.velcdn.com/images/yukina1418/post/01b2e9d2-88b1-4a99-8c47-2246b7fc5a16/image.png)

## Api Docs

![image](https://user-images.githubusercontent.com/82861572/173022710-a3aec7e3-91ce-46cd-b33f-203f99663d96.png)

## 페이지 구성

> 서비스의 소개와 팀원 소개가 들어있는 소개 페이지

![소개](https://user-images.githubusercontent.com/89783182/172988049-d1621e0f-628c-4c71-95c4-0bb46397f8b5.gif)

> 로그인 후 메인페이지에 접속하면 최신글들과 함께 회원가입시 선호하는 카테고리에 의해서 추천글들이 보여집니다.
- 각각의 item을 클릭 시 상세보기로 이동이 가능합니다.

![로그인시 메인](https://user-images.githubusercontent.com/89783182/172988593-b6e1a839-c119-4c43-a32e-f41c4e6cb036.gif)

> 로그인을 하지 않았을 경우
- 추천 탭에 정보가 표시되지 않습니다. 회원가입을 진행해주세요.

![비로그인시 메인](https://user-images.githubusercontent.com/89783182/172988614-ccd699ae-f553-4aa8-bf93-af44f1ff2bb3.gif)

> 회원가입 페이지

![회원가입](https://user-images.githubusercontent.com/89783182/172988663-adfbcc95-a1b6-4625-b827-567ba17f174a.gif)

> 로그인 페이지
- 자체 로그인 및 소셜로그인이 가능합니다.

![로그인](https://user-images.githubusercontent.com/89783182/172988673-5a79df39-7f10-4ae7-a3cc-363b3ae240e3.gif)

> 리뷰를 작성할 수 있습니다.
- 버튼 하나로 단짠리뷰(일반리뷰), 가주세요(요청), 시식단리뷰를 선택할 수 있습니다.
- 당신의 멋진 리뷰를 보여주기 위해 반드시 하나 이상의 사진을 올려주세요.

![글쓰기](https://user-images.githubusercontent.com/89783182/172997387-9ead8607-f300-45c2-acde-b2466f046a5c.gif)

> 유저들이 쓴 모든 글을 볼 수 있는 전체 리스트 페이지 입니다.
- 무한스크롤 적용으로 스크롤 내릴 시 글 목록이 불러와집니다. <br>
- item 클릭 시 상세보기로 이동합니다. <br>

![전체리스트](https://user-images.githubusercontent.com/89783182/172989092-18d6f821-0096-4f76-beb3-f3554c362710.gif)

> 단짠리뷰(일반리뷰), 시식단 리뷰에서는 filter 적용으로 검색을 할 수 있습니다.

![필터검색](https://user-images.githubusercontent.com/89783182/172990010-6b5ee217-2a33-4883-a01e-1f8cb1d0b487.gif)

> 소상공인들에게 지원을 받아 시식을 하고 그 시식평을 작성할 수 있는 시식단 리뷰 페이지입니다.

![시식단](https://user-images.githubusercontent.com/89783182/172989942-c0c519d0-6c87-4548-b613-796c0790ef02.gif)

> 개인적인 사유로 인해 방문하지 못한 식당을 대신 가달라고 부탁할 수 있습니다.
- 가주세요 리뷰에 요청을 하고 그 식당을 가본 사람은 해당 글에 답글을 달 수 있으며 답글이 달린 경우 쪽지로 알림이 갑니다.

![가주세요](https://user-images.githubusercontent.com/89783182/172990094-86cf4a21-7f21-401b-8d50-ab3ba38ce4a6.gif)

> 각각의 글을 클릭하면 상세보기 페이지로 이동합니다.
- 상세보기에서는 댓글달기와 좋아요 기능이 적용되어 있습니다.

![상세보기, 댓글, 좋아요](https://user-images.githubusercontent.com/89783182/172990749-3bdaa03c-4b09-4af0-8881-0f3a30556b2c.gif)

> 소상공인들이 자신의 가게를 홍보 할 수 있습니다.
- 스토어 페이지에 기프티콘 형식으로 구현이 되어 있으며 이는 관리자만 작성할 수 있습니다.

![스토어](https://user-images.githubusercontent.com/89783182/172990885-5c7fc3de-7260-4b33-9488-d307e9829e6e.gif)

> 마이페이지에서 자신이 작성한 글, 좋아요 누른 글 목록, 포인트 충전 및 취소도 가능합니다.

![마이페이지, 좋아요목록, 포인트](https://user-images.githubusercontent.com/89783182/172991743-1828c1f0-9cd2-4d4d-87c7-166fd0bf0c1d.gif)

> 리뷰를 작성한 사람들을 팔로우 해보세요. 유저를 팔로우 할 수 있습니다.
 
![팔로우](https://user-images.githubusercontent.com/89783182/172997731-9e82cf58-82c6-462a-b19a-550d2b42a7c5.gif)

> 쪽지를 보낼 수 있습니다. 유저에게 쪽지를 보내 보세요
- 쪽지 보내기

![쪽지발신](https://user-images.githubusercontent.com/89783182/172997952-c1e3ce94-b55c-4c5a-90f0-df83746c4a4a.gif)

- 받은 쪽지함

![쪽지수신](https://user-images.githubusercontent.com/89783182/172997975-a42ca952-2137-4330-b4b7-0df3dbe89315.gif)

## env 환경변수

|환경변수 이름|넣어야할 값| 설명|
|------|---|--------|
|ACCESS|액세스토큰 시크릿키|로그인|
|REFRESH|리프레시토큰 시크릿키|-|
|SMS_APP_KEY|NHN 클라우드 앱 키|인증번호 발송|
|SMS_X_SECRET_KEY|NHN 클라우드 시크릿 키|-|
|SMS_SENDER|NHN 클라우드 발송번호|-|
|IMP_KEY|아임포트 키|결제|
|IMP_SECRET|아임포트 시크릿 키|-|
|STORAGE_BUCKET|GCP 버켓|이미지 업로드|
|STORAGE_KEY_FILENAME|GCP 유저 json 파일|-|
|STORAGE_PROJECT_ID|GCP 프로젝트 아이디|-|
|REDIRECT_URL| 리다이렉트 URL | 소셜 로그인 |
|GOOGLE_CLIENT_ID| OAuth 클라이언트 아이디| -|
|GOOGLE_CLIENT_SECRET| OAuth 구글 시크릿 키| -|
|KAKAO_CLIENT_ID| OAuth 카카오 클라이언트 아이디| -|
|KAKAO_CLIENT_SECRET| OAuth 카카오 시크릿 키 |-|
|NAVER_CLIENTID| OAuth 네이버 클라이언트 아이디|-|
|NAVER_CLIENTSECRET| OAuth 네이버 시크릿 키|-|
|ELK_URL| 엘라스틱서치 URL| 검색엔진 사용, Module.ts 단|
|REDIS_URL| DB 접속 URL | Redis 사용,  app.module.ts 단|
|HOST| DB 호스트 이름|  MySQL 사용, app.module.ts 단|
|PORT|DB 포트|-|
|USERNAME| DB 유저 아이디| -|
|PASSWORD| DB 유저 비밀번호| -|
|DATABASE| DB 이름 | - |
|CORS_ORIGIN_DEV| CORS URL 개발용 | CORS, app.module.ts & main.ts|
|CORS_ORIGIN_TEST| CORS URL 테스트용| - |
|CORS_ORIGIN_PROD| CORS URL 배포용 | - |

