# 📜 Documentação da Aplicação

## Índice
- [📋 Visão Geral](#-visão-geral)
- [🚀 Configuração do Projeto](#-configuração-do-projeto)
- [▶️ Executando a Aplicação](#️-executando-a-aplicação)
- [📡 Endpoints da API](#-endpoints-da-api)
  - [📤 Upload de Medida](#-upload-de-medida)
  - [✅ Confirmação de Medida](#-confirmação-de-medida)
  - [📜 Listagem de Medidas](#-listagem-de-medidas)
- [📂 Estrutura de Diretórios](#-estrutura-de-diretórios)

## 📋 Visão Geral

Esta aplicação é um serviço de API REST para gerenciar medidas de consumo de água e gás de clientes. Os dados das medidas são armazenados em um banco de dados PostgreSQL, e as imagens associadas às medidas são processadas e armazenadas localmente.

## 🚀 Configuração do Projeto

### Pré-requisitos

Certifique-se de que você tem o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12.x ou superior)
- [Git](https://git-scm.com/)

### Passos para Configuração

1. *Clone o repositório*:
   bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   

2. *Instale as dependências*:
   bash
   npm install
   

3. *Configure o banco de dados*:
   - Crie um banco de dados PostgreSQL.
   - Copie o arquivo .env.example para .env e atualize as variáveis de ambiente com as informações do seu banco de dados.

4. *Execute as migrações do banco de dados*:
   bash
   npx prisma migrate dev
   

## ▶️ Executando a Aplicação

Após a configuração, você pode iniciar a aplicação com o seguinte comando:

bash
npm run dev


A aplicação estará disponível em http://localhost:3000.

## 📡 Endpoints da API

### 📤 Upload de Medida

*Endpoint*: POST /api/measures/upload

*Descrição*: Envia uma nova medida de consumo.

*Request Body*:
json
{
  "image": "base64", 
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}


*Response Body*:

| Status Code | Descrição                            | Resposta                                                                                                                                             |
|-------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso       | { "image_url": "string", "measure_value": "integer", "measure_uuid": "string" }                                                                 |
| 400         | Dados inválidos na requisição        | { "error_code": "INVALID_DATA", "error_description": "<descrição do erro>" }                                                                        |
| 409         | Medida duplicada                     | { "error_code": "DOUBLE_REPORT", "error_description": "Leitura do mês já realizada" }                                                              |

### ✅ Confirmação de Medida

*Endpoint*: PATCH /api/measures/confirm

*Descrição*: Confirma uma medida enviada anteriormente.

*Request Body*:
json
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}


*Response Body*:

| Status Code | Descrição                            | Resposta                                                                                                                                             |
|-------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso       | { "success": true }                                                                                                                               |
| 400         | Dados inválidos na requisição        | { "error_code": "INVALID_DATA", "error_description": "<descrição do erro>" }                                                                        |

### 📜 Listagem de Medidas

*Endpoint*: GET /api/measures/:customerCode/list

*Descrição*: Lista todas as medidas para um determinado código de cliente.

*Query Parameters*:

- measure_type (opcional): Filtra as medidas por tipo (WATER ou GAS).

*Response Body*:

| Status Code | Descrição                            | Resposta                                                                                                                                             |
|-------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso       | [{"id": "string", "customerCode": "string", "measureDatetime": "datetime", "measureType": "string", "measureValue": "integer", "imageUrl": "string"}] |
| 400         | Dados inválidos na requisição        | { "error_code": "INVALID_DATA", "error_description": "<descrição do erro>" }                                                                        |
| 404         | Nenhuma medida encontrada            | { "error_code": "MEASURE_NOT_FOUND", "error_description": "Nenhuma leitura encontrada" }                                                            |

## 📂 Estrutura de Diretórios

bash
├── src
│   ├── controllers  # Controladores da API
│   ├── errors       # Classes de erro personalizadas
│   ├── services     # Lógica de negócios da aplicação
│   ├── utils        # Utilitários como armazenamento de arquivos e processamento de imagem
│   └── types        # Tipos TypeScript e interfaces
├── tests            # Testes unitários e de integração
├── prisma           # Configuração e migrações do Prisma
└── ...

