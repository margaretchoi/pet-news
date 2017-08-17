db.huffpetnews.insert({"title": "Test title"})
db.huffpetnews.renameCollection("articles", true)

db.articles.deleteOne({_id:ObjectId("599547c8855f48059ebae805")})