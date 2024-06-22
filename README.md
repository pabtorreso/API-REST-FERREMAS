
# API-REST FERREMAS

## Tabla de Contenidos:

- [Prerrequisitos](#uno)
    - [Node.js](#dos)
    - [Docker](#tres)
- [Instrucciones de uso](#cuatro)
    - [Levantar API con Docker](#cinco)
    - [Documentación API](#seis)
    - [UNIT/INTEGRATION TEST](#siete)

<a id="uno"></a>
## Prerrequisitos:
Para poder levantar esta API es necesario cumplir con los prerrequisitos para proceder a instalar las dependencias y correr el código fuente.
<a id="dos"></a>
### 1. Node.js:
Es necesario tener instalado desde 20.13.1 en adelante.
[Pagina Oficial de Node.js](https://nodejs.org/en/download).

- Si ya tienes Node.js instalado, puedes revisar su versión con el comando en la cmd:
```
npm --version
```
<a id="tres"></a>
### 2. Docker:
Para levantar la APP necesitaremos Docker Desktop. El instalador se puede descargar desde su pagina oficial: [Docker.com](https://www.docker.com/products/docker-desktop/)
<a id="cuatro"></a>
## Instrucciones de uso: <a name="instrucciones"></a>
Para poder levantar esta APP y consumir la API es necesario cumplir con los prerrequisitos para proceder a instalar las dependencias y correr el código fuente.
<a id="cinco"></a>
### 1. Levantar API con Docker:
Para poder levantar la API como servidor debemos encapsularla en un contenedor con Docker, esto se hace corriendo el `"Dockerfile"` con comandos.

```bash
docker build -t api-ferremas .
docker run -p 4000:4000 api-ferremas
```

**NOTA:** Debe estar abierto el **"Docker Desktop"** para levantar la API con el contenedor.
<a id="seis"></a>

### 2. Documentacion API (Con Swagger): 
Para ver la documentacion de la API, basta con abrir el enlace **`http://localhost:4000/api-docs`** del prototipo con un navegador (ej. Chrome) y apareceran las operaciones CRUD.


<a id="siete"></a>

### 3. Unit Test - Integration Test API: 
Para realizar pruebas unitarias o de integracion debe estar el docker apagado ya que se necesita levantar el servidor anonimamente para realizar las pruebas.

- Para realizar las pruebas **Unitarias** se debe ejecutar por consola el siguiente comando. 
```cmd
npm run test
```

- Para realizar las pruebas de **Integracion** se debe ejecutar por consola el siguiente comando. 
```cmd
npm run test:integration
```

---

**NOTA:** La API será consumida por a través de un componente el cual se conecta con la dirección donde esta alojada la API.
<<<<<<< HEAD
`http://localhost:4000/`. Por la REACT-APP de FERREMAS https://github.com/pabtorreso/REACT-APP-FERREMAS
=======
`http://localhost:4000/`. Por la REACT-APP de FERREMAS https://github.com/pabtorreso/REACT-APP-FERREMAS

>>>>>>> 57f7179b6c1a8432b4d6068aae3e7864c0217781
