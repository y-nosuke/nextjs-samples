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
curl -X POST -H "Content-Type: application/json" -d '{ "title": "test", "content": "Test Todo Items" }' localhost:3000/api/create-todo

# get todos
curl localhost:3000/api/get-todos | jq

# update todo
curl -X PUT -H "Content-Type: application/json" -d '{ "id": 1, "title": "test", "content": "Update Test Todo Items" }' localhost:3000/api/update-todo

# delete todo
curl -X DELETE -H "Content-Type: application/json" -d '{ "id": 1 }' localhost:3000/api/delete-todo
```

## 参考

- [Prisma + Next.jsでシンプルなCRUD APIを作成する](https://illumination-k.dev/techblog/posts/prisma_next_simple_crud)
- [prisma.io](https://www.prisma.io/)
