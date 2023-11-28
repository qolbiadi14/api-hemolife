# api-hemolife

Cara melakukan migrasi DB
1. Pastikan username, password, host, name di .env sudah sesuai dengan device masing-masing
2. run npx sequelize db:migrate

Cara melakukan seed pada tabel gol_darah
1. run npx sequelize db:seed:all