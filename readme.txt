# Restaurant Product Management API

Este es un backend en Node.js con una base de datos PostgreSQL que simula un sistema mínimo de gestión de productos para un restaurante.

## Requisitos

- Node.js instalado en tu sistema.
- PostgreSQL instalado y en ejecución.
- Configuración de una base de datos llamada `restaurant_db` (o el nombre que elijas en `config/database.js`).
- Un usuario de PostgreSQL con permisos para acceder y modificar la base de datos.

## Instrucciones para Ejecutar el Proyecto Localmente

1. **Clonar el repositorio (si lo tienes en uno) o crear la estructura de carpetas y archivos como se describe.**
2. **Navegar al directorio del proyecto cd en la consola**
3. **Posteriormente utilizar el comando npm start en la consola**
4. **Puede ingresar productos utilizando JSON para los métodos products y orders en post** 
5. **Puede consultar los datos ingresados con /available después del metodo como GET**
6. **Los JSON aceptan name,price,stock en products y customerName, id, quantity en orders**
