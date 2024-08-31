Aqui está o README traduzido para o português:

---

# API de Medição de Água e Gás 🌊💧

## 🧪 Teste Técnico

Este projeto foi desenvolvido como parte de um teste técnico para a empresa Shopper. A fase inicial deste teste foca no desenvolvimento do back-end de um serviço de leitura de imagens. Os principais objetivos e atividades desta fase são os seguintes:

- **Desenvolver três endpoints principais**: 
  - Upload de Medida
  - Confirmação de Medida
  - Listagem de Medidas

- **Integrar com a API do Google Gemini**: Para processar e extrair dados das imagens enviadas.

### Requisitos

- **Ler especificações técnicas em inglês** e entender os requisitos de negócios.
- **Desenvolver uma API REST** usando Node.js e TypeScript.
- **Ter uma compreensão básica de modelagem de banco de dados**.
- **Criar e gerenciar containers Docker**.
- **Usar Git para controle de versão**.

## 📜 Documentação da Aplicação

### Índice
- [📋 Visão Geral](#-visão-geral)
- [🚀 Configuração do Projeto](#-configuração-do-projeto)
- [▶️ Executando a Aplicação](#️-executando-a-aplicação)
- [📡 Endpoints da API](#-endpoints-da-api)
  - [📤 Upload de Medida](#-upload-de-medida)
  - [✅ Confirmação de Medida](#-confirmação-de-medida)
  - [📜 Listagem de Medidas](#-listagem-de-medidas)

## 📋 Visão Geral

Esta aplicação é um serviço de API REST para gerenciar medições de consumo de água e gás de clientes. Os dados das medições são armazenados em um banco de dados PostgreSQL, e as imagens associadas às medições são processadas e armazenadas localmente. A aplicação utiliza o Google Gemini para processar imagens e extrair valores de medição.

## 🚀 Configuração do Projeto

### Pré-requisitos

Certifique-se de que você tem o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 12.x ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para configuração com Docker)
- [Git](https://git-scm.com/)

### Passos para Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o banco de dados**:
   - Crie um banco de dados PostgreSQL.
   - Copie o arquivo `.env.example` para `.env` e atualize as variáveis de ambiente com as informações do seu banco de dados e a chave da API do Gemini.

4. **Execute as migrações do banco de dados**:
   ```bash
   npx prisma migrate dev
   ```

## ▶️ Executando a Aplicação

Após a configuração, você pode iniciar a aplicação com o seguinte comando:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Usando Docker

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Crie um arquivo `.env` na raiz do projeto com a chave da API do Gemini**:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Suba os containers**:
   ```bash
   docker-compose up --build
   ```

   - O banco de dados PostgreSQL será iniciado, e a aplicação será construída e executada.
   - A API estará disponível em `http://localhost:3000`.

## 📡 Endpoints da API

### 📤 Upload de Medida

**Endpoint**: POST /api/measures/upload

**Descrição**: Envia uma nova medida de consumo.

**Request Body**:
```json
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" ou "GAS"
}
```

**Response Body**:

| Status Code | Descrição                            | Resposta                                                                                                                                             |
|-------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso       | { "image_url": "string", "measure_value": "integer", "measure_uuid": "string" }                                                                 |
| 400         | Dados inválidos na requisição        | { "error_code": "INVALID_DATA", "error_description": "<descrição do erro>" }                                                                        |
| 409         | Medida duplicada                     | { "error_code": "DOUBLE_REPORT", "error_description": "Leitura do mês já realizada" }                                                              |

### ✅ Confirmação de Medida

**Endpoint**: PATCH /api/measures/confirm

**Descrição**: Confirma uma medida enviada anteriormente.

**Request Body**:
```json
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

**Response Body**:

| Status Code | Descrição                            | Resposta                                                                                                                      |
|-------------|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso       | { "success": true }                                                                                                        |
| 400         | Dados inválidos na requisição        | { "error_code": "INVALID_DATA", "error_description": "<descrição do erro>" }                                                |

### 📜 Listagem de Medidas

**Endpoint**: GET /api/measures/:customerCode/list

**Descrição**: Lista todas as medidas para um determinado código de cliente.

**Query Parameters**:

- measure_type (opcional): Filtra as medidas por tipo (WATER ou GAS).

**Response Body**:

| Status Code | Descrição                            | Resposta                                                                                                                                             |
|-------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operação realizada com sucesso       | [{"id": "string", "customerCode": "string", "measureDatetime": "datetime", "measureType": "string", "measureValue": "integer", "imageUrl": "string"}] |
| 400         | Dados inválidos na requisição        | { "error_code": "INVALID_DATA", "error_description": "<descrição do erro>" }                                                                        |
| 404         | Nenhuma medida encontrada            | { "error_code": "MEASURE_NOT_FOUND", "error_description": "Nenhuma leitura encontrada" }                                                            |

---
