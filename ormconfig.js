module.exports ={
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "dist/models/**/*.js"
 ],
 "migrations": [
  "dist/database/migrations/**/*.js"
],
 "cli":{
  "migrationsDir": [
    "src/database/migrations/"
  ],
  "entitiesDir": "src/models"
  }

}


// module.exports ={
//   "type": "postgres",
//   "host": "localhost",
//   "port": 5432,
//   "username": "postgres",
//   "password": "docker",
//   "database": "appReact",
//   "entities": [
//     "./src/models/*.ts"
//   ],
//   "migrations": [
//     "./src/database/migrations/*.ts"
//   ],
//   "cli":{
//     "migrationsDir": "./src/database/migrations"
//   }
// }
