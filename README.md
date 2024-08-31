# 📊 Meter Reading API

Welcome to the Meter Reading API! This application allows you to upload, process, and store meter readings (such as water and gas meters) using images.

## 🚀 Getting Started

Follow these steps to get your application up and running.

### 📦 Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v14 or higher) 🟢
- **Docker** and **Docker Compose** 🐳
- **npm** (comes with Node.js) 📦
 
### 🔧 Setup

1. **Clone the Repository** 🧑‍💻
   
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Install Dependencies** 📦

Install the required Node.js packages:

```bash
npm install
```

3. **Set Up Environment Variables** 🔑
Create a .env file in the root of the project and add the following:

```env
DATABASE_URL=postgresql://user:password@db:5432/meterdb
GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Run Database Migrations** 🗃️
Make sure your database schema is up to date:

```bash
docker-compose run api npx prisma migrate deploy
```

## Running the Application
1. **Start the Application** 🚀
Use Docker Compose to build and start the application:

```bash
docker-compose up --build
```

2. **Serve Static Files** 🌐
Images are served from the src/assets/images directory. The server is configured to serve these files at:

```bash 
http://localhost:3000/assets/images/<image-file-name>
```

## 🧪 Testing the Application

1. **Upload an Image** 📤

```bash 
curl -X POST http://localhost:3000/api/measures/upload \
-H "Content-Type: application/json" \
-d '{
  "image": "your-base64-image-string",
  "customer_code": "customer123",
  "measure_datetime": "2024-08-28T12:34:56Z",
  "measure_type": "WATER"
}'
```

2. **View Uploaded Image** 🖼️
Access the uploaded image in your browser at:

```bash
http://localhost:3000/assets/images/<your-uuid>.png
```

## ⏹️ Stopping the Application
To stop the application and remove the running containers:

```bash
docker-compose down
```
