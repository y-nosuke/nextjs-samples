# nextjs-file-upload-typescript

## 事前準備

``` shell
# create project
yarn create next-app --typescript

# install
yarn add @prisma/client
yarn add prisma --dev

# init
npx prisma init
```

.env
``` shell
DATABASE_URL="file:./dev.db"
```

``` shell
# migration
npx prisma migrate dev --name init
```

## DB 確認

``` shell
sqlite3 prisma/dev.db

.tables

.schema TODO
```

## 動作確認

``` shell
# create todo
curl -X POST -H "Content-Type: application/json" -d '{ "title": "test", "content": "Test Todo Items" }' localhost:3000/api/todos

# get todos
curl localhost:3000/api/todos | jq

# get todo
curl localhost:3000/api/todos/1 | jq

# update todo
curl -X PUT -H "Content-Type: application/json" -d '{ "title": "test", "content": "Update Test Todo Items" }' localhost:3000/api/todos/1

# delete todo
curl -X DELETE -H "Content-Type: application/json" localhost:3000/api/todos/1
```

## 参考

- [prisma.io](https://www.prisma.io/)
- [Prisma + Next.jsでシンプルなCRUD APIを作成する](https://illumination-k.dev/techblog/posts/prisma_next_simple_crud)
- [Next.jsでPrismaを使ってデータベースを作る](https://omkz.net/next-js-prisma/)
