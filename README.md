# Vershi

## Deploy

create .env at project root
```
ORIGIN = http://localhost:3000
PASSWORD = 123
```

`docker compose up --build`

Your application will be available at http://localhost:3000

Admin page will be available at http://localhost:3000/adm with password specified in .env

All application data will be stored at ./data folder