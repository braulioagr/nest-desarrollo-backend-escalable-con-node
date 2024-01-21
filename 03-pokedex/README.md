<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1.- Clonar el repositorio.

2.- Ejecutar.
 ```bash
 npm install
 ```

3.- Tener instalado Nest CLI.
```bash
 npm i -g @nestjs/cli
```

4.- Lenvantar la base de datos.
```bash
docker compose up -d
```

5.- Clonar el archivo __.env.tenplate__ y renombrar la copia __.env__.

6.- llenar el archivo __.env__ con las variables de entorno definidas.

7.- Ejecutar el servidor.
```bash
npm run start:dev
```


8.- Reconstruir la base de datos.
```
http://localhost:3000/api/v2/seed
```


## Stack usado
* MongoDB
* Nest
