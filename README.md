# Controle de Estoque

```bash
nvm use

npm i
npm run dev
```

## Página de adição de produtos

/create  
/create/:id  
/create/:id/success  
/create/:id/error  

## Página para exclusão de produtos

/remove  
/remove/:id  
/remove/:id/success  
/remove/:id/error  

## API

GET /api/get-product/:id  
POST /api/create-product  

body:

```json
{  
  "name": "xpto",  
  "amount": 1  
}  
```

