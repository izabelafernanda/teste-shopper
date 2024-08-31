# Water and Gas Measurement API 🌊💧

## 🧪 Technical Test

This project was developed as part of a technical test for the company Shopper. The initial phase of this test focuses on developing the back-end of an image reading service. The main goals and activities of this phase are as follows:

- **Develop three main endpoints**: 
  - Measure Upload
  - Measure Confirmation
  - Measure Listing

- **Integrate with the Google Gemini API**: To process and extract data from the submitted images.

### Requirements

- **Read technical specifications in English** and understand business requirements.
- **Develop a REST API** using Node.js and TypeScript.
- **Have a basic understanding of database modeling**.
- **Create and manage Docker containers**.
- **Use Git for version control**.

## 📜 Application Documentation

### Table of Contents
- [📋 Overview](#-overview)
- [🚀 Project Setup](#-project-setup)
- [▶️ Running the Application](#️-running-the-application)
- [📡 API Endpoints](#-api-endpoints)
  - [📤 Measure Upload](#-measure-upload)
  - [✅ Measure Confirmation](#-measure-confirmation)
  - [📜 List Measures](#-list-measures)

## 📋 Overview

This application is a REST API service for managing water and gas consumption measurements from customers. Measurement data is stored in a PostgreSQL database, and images associated with the measurements are processed and stored locally. The application uses Google Gemini to process images and extract measurement values.

## 🚀 Project Setup

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (version 12.x or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for Docker setup)
- [Git](https://git-scm.com/)

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the database**:
   - Create a PostgreSQL database.
   - Copy the `.env.example` file to `.env` and update the environment variables with your database information and the Gemini API key.

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

## ▶️ Running the Application

After setup, you can start the application with the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Using Docker

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

2. **Create a `.env` file at the root of the project with the Gemini API key**:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Start the containers**:
   ```bash
   docker-compose up --build
   ```

   - PostgreSQL database will be started, and the application will be built and run.
   - The API will be available at `http://localhost:3000`.

## 📡 API Endpoints

### 📤 Measure Upload

**Endpoint**: POST /api/measures/upload

**Description**: Uploads a new consumption measurement.

**Request Body**:
```json
{
  "image": "base64",
  "customer_code": "string",
  "measure_datetime": "datetime",
  "measure_type": "WATER" or "GAS"
}
```

**Response Body**:

| Status Code | Description                        | Response                                                                                                                                          |
|-------------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operation successful               | { "image_url": "string", "measure_value": "integer", "measure_uuid": "string" }                                                                 |
| 400         | Invalid request data               | { "error_code": "INVALID_DATA", "error_description": "<error description>" }                                                                     |
| 409         | Duplicate measurement              | { "error_code": "DOUBLE_REPORT", "error_description": "Measurement for the month already recorded" }                                               |

### ✅ Measure Confirmation

**Endpoint**: PATCH /api/measures/confirm

**Description**: Confirms a previously submitted measurement.

**Request Body**:
```json
{
  "measure_uuid": "string",
  "confirmed_value": "integer"
}
```

**Response Body**:

| Status Code | Description                        | Response                                                                                                                      |
|-------------|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operation successful               | { "success": true }                                                                                                        |
| 400         | Invalid request data               | { "error_code": "INVALID_DATA", "error_description": "<error description>" }                                                |

### 📜 List Measures

**Endpoint**: GET /api/measures/:customerCode/list

**Description**: Lists all measurements for a specific customer code.

**Query Parameters**:

- measure_type (optional): Filters measurements by type (WATER or GAS).

**Response Body**:

| Status Code | Description                        | Response                                                                                                                                      |
|-------------|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | Operation successful               | [{"id": "string", "customerCode": "string", "measureDatetime": "datetime", "measureType": "string", "measureValue": "integer", "imageUrl": "string"}] |
| 400         | Invalid request data               | { "error_code": "INVALID_DATA", "error_description": "<error description>" }                                                                |
| 404         | No measurements found              | { "error_code": "MEASURE_NOT_FOUND", "error_description": "No measurements found" }                                                          |

---
