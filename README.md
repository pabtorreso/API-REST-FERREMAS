
# API-REST FERREMAS

## Tabla de Contenidos:

- [Prerrequisitos](#uno)
    - [Node.js](#dos)
    - [Dependencias](#tres)
    - [Docker](#cuatro)
- [Instrucciones de uso](#cinco)
    - [Levantar API con Docker](#seis)
    - [Documentación API](#siete)
    - [UNIT/INTEGRATION TEST](#ocho)

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
### 2. Dependencias
Para que todo funcione correctamente se deben instalar las dependencias con el siguiente comando:
```bash
npm install
```
**NOTA:** Se deben igonrar las advertencias.
<a id="cuatro"></a>
### 3. Docker:
Para levantar la APP necesitaremos Docker Desktop. El instalador se puede descargar desde su pagina oficial: [Docker.com](https://www.docker.com/products/docker-desktop/)
<a id="cinco"></a>
## Instrucciones de uso: <a name="instrucciones"></a>
Para poder levantar esta APP y consumir la API es necesario cumplir con los prerrequisitos para proceder a instalar las dependencias y correr el código fuente.
<a id="seis"></a>
### 1. Levantar API con Docker:
Para poder levantar la API como servidor debemos encapsularla en un contenedor con Docker, esto se hace corriendo el `"Dockerfile"` con comandos.

```bash
docker build -t api-ferremas .
docker run -p 4000:4000 api-ferremas
```

**NOTA:** Debe estar abierto el **"Docker Desktop"** para levantar la API con el contenedor.
<a id="siete"></a>

### 2. Documentacion API (Con Swagger): 
Para ver la documentacion de la API, basta con abrir el enlace **`http://localhost:4000/api-docs`** del prototipo con un navegador (ej. Chrome) y apareceran las operaciones CRUD.


<a id="ocho"></a>

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
`http://localhost:4000/`. Por la REACT-APP de FERREMAS https://github.com/pabtorreso/REACT-APP-FERREMAS
