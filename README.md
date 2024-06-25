## запрос(ы) для вставки данных минимум о двух книгах в коллекцию books
```
db.books.insertOne({
    title: "Война и мир",
    description: "О войне и миру",
    authors: "Толстой"
})

db.books.insertMany([{
    title: "Евгений Онегин",
    description: "О скуке",
    authors: "Пушкин"
}, {
    title: "Мертвые души",
    description: "О нравах",
    authors: "Гоголь"
}])

```
## запрос для поиска полей документов коллекции books по полю title
```
db.books.find({title: "Мертвые души"}) 
```
Результат:
```
[
  {
    _id: ObjectId('667a7aaaf4dd61a9d39f7f62'),
    title: 'Мертвые души',
    description: 'О нравах',
    authors: 'Гоголь'
  }
]
```

## запрос для редактирования полей: description и authors коллекции books по _id записи
```
db.books.updateOne({
    _id: ObjectId("667a7aaaf4dd61a9d39f7f61")
}, 
{
    $set: {
        description: "О любви",
        authors: "Александр Пушкин"
    }
})
```
Результат:
```
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```

