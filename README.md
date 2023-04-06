# Controle de Estoque

```bash
nvm use

npm i
npm run dev
```

## Página de adição de produtos

/create  
/create/:id/success  
/create/:id/error  

## Página para exclusão de produtos

/remove  
/remove/?id=id  
/remove/:id/success  
/remove/:id/error  

## API

GET /api/get-product/:id

DELETE /api/delete-product/:id

POST /api/create-product

body:

```json
{
  "name": "product_test",
  "quantity": 1
}
```
