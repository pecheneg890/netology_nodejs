## Установка
```
npm install
```

## Запуск
```
npm run dev
```

## Использование
Метод|URL | Действие | Комментарий
--- | --- | ---  | ---
`POST`|`/api/user/login`|авторизация пользователя||
`GET`|`/api/books`|получить все книги||
`GET`|`/api/books/:id`|получить книгу по ID||
`POST`|`/api/books`|создать книгу|`Content-type multipart/form-data; поле info - JSON с информацией о книге; поле  book_storage - файл с книгой`|
`PUT`|`/api/books/:id`|редактировать книгу по ID||
`DELETE`|`/api/books/:id`|удалить книгу по ID||
`GET`|`/api/books/:id/download`|скачать книгу по ID||
