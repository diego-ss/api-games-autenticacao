api de games para treino em node js com autenticação em jwt

## Endpoints
### GET /games
Endpoint responsável por listar todos os games cadastrados no banco de dados
#### Parâmetros
Nenhum
#### Respostas
##### - OK! 200
Confirmação do sucesso na listagem dos games
Exemplo de resposta:
```
[
    {
        "id": 1,
        "name": "God of War",
        "year": 2018,
        "price": 50,
        "createdAt": "2021-04-07T00:45:30.000Z",
        "updatedAt": "2021-04-07T00:45:30.000Z"
    },
    {
        "id": 3,
        "name": "RDR II",
        "year": 2018,
        "price": 100,
        "createdAt": "2021-04-07T01:12:34.000Z",
        "updatedAt": "2021-04-07T02:01:53.000Z"
    }
]
```
##### - 401
Falha na autenticação da requisição. Motivos: Token inválido/expirado
Exemplo de resposta:
```
{
    "err": "Token inválido!"
}
```

## POST /auth
Endpoint responsável por autenticar o login do usuário
#### Parâmetros
email: E-mail do usuário cadastrado no sistema.
password: Senha do usuário cadastrado no sistema.
```
{
    "email": "email@email.com",
    "password": "1234"
}
```
#### Respostas
##### - OK! 200
Retorna o token jwt para acesso à endpoints protegidos da API
Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJFbWFpbCI6ImRpZWdvX3NvdXNhLnNAb3V0bG9vay5jb20iLCJpYXQiOjE2MTc5MjQwNzIsImV4cCI6MTYxODAxMDQ3Mn0.gSagy-1ERhd_YVBMsrKurjjYwiW9j4XSScnRtS78g9E"
}
```
##### - 401
Falha na autenticação da requisição. Motivos: Senha ou e-mail incorretos.
Exemplo de resposta:
```
Unauthorized
```
