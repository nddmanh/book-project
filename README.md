# Book project

[Link demo](https://book-project-nest.herokuapp.com/doc/)

## Technology

```bash
Nestjs
```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```

## Docker

```bash
# run docker
$ docker-compose up dev

```

## Task

| Requirement | Status |
| --- | --- |
| Dựng restful api cho books | Done |
| Dựng api mượn sách | Done |
| Viết test code | Unit test for creating book in BookService and BookController |
| Viết cronjob bắn webhook khi sách gần đến hạn phải trả  | Done |
| Tạo docker image | Done |
| Tối ưu docker image|  |
| Viết Ci  | Done |

## Nice to have

| Requirement | Status |
| --- | --- |
| Sử dụng Koa js |  |
| Sử dụng bulljs để chạy job |  |
| sử dụng typescripts | Done |
| Sử dụng jest để test cho các api đã viết  | Done |
| Sử dụng mongodb với mongoose | Done |
| viết grpc service cho CRUD sách|  |