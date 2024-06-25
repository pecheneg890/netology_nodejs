## вставка
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
## выборка
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

```
db.books.find({$or: [{title: {$eq: "Мертвые души"}}, {authors: {$eq: "Пушкин"}}]}) 
```
Результат:
```
[
  {
    _id: ObjectId('667a7aaaf4dd61a9d39f7f61'),
    title: 'Евгений Онегин',
    description: 'О скуке',
    authors: 'Пушкин'
  },
  {
    _id: ObjectId('667a7aaaf4dd61a9d39f7f62'),
    title: 'Мертвые души',
    description: 'О нравах',
    authors: 'Гоголь'
  }
]
```

## update
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
```
db.books.updateOne({authors: {$eq: "Александр Пушкин"}},  {$set:{description: "О любви", authors: "Пушкин" }}) 
```
Результат
```
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```
