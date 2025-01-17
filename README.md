# Task Management API

Instructions on how to set up and run the Task Management API locally, test it using Postman. The API routes and request formats are also included.

---

## Getting Started

### 1. Clone the Repository
To clone the repository to your local machine, run the following command in your terminal:
```bash
git clone https://github.com/joshuaoni/task-backend.git
cd task-backend
```

### 2. Install Dependencies
Install the necessary dependencies by running:
```bash
npm install
```

### 3. Start the Development Server
Run the development server locally using:
```bash
npm run dev
```

The server will be running at `http://localhost:5000`.

---

## Testing the API

### Using Postman
1. Open [Postman](https://www.postman.com/).
2. Use the following base URL for all requests:
   ```
   http://localhost:5000
   ```
3. Add a header for authenticated routes (tasks routes):
   ```
   Key: Authorization
   Value: Bearer <your_jwt_token>
   ```

---

## API Routes and Request Formats

### Authentication Routes

#### 1. **Register a New Account**
**POST** `/auth/register`
```json
{
  "name": "David",
  "email": "david@gmail.com",
  "password": "password123"
}
```

#### 2. **Login to an Existing Account**
**POST** `/auth/login`
```json
{
  "email": "david@gmail.com",
  "password": "password123"
}
```
You will receive the jwt token in the response, and you will use this as authorization header for the task routes.

---

### Task Routes

#### 1. **Create a Task**
**POST** `/tasks`
**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```
**Request Body:**
```json
{
  "title": "Finish API documentation",
  "description": "Write detailed documentation for the API routes",
  "status": "Pending"
}
```

#### 2. **Get All Tasks**
**GET** `/tasks`
**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```
**Query Parameters:**
- `status` (optional): Filter by task status (`Pending`, `In Progress`, `Completed`).
- `page` (optional): Page number for pagination (default: 1).
- `limit` (optional): Number of tasks per page (default: 10).
- `search` (optional): Search tasks by title or description.

#### 3. **Get a Task by ID**
**GET** `/tasks/:id`
**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

#### 4. **Update a Task**
**PUT** `/tasks/:id`
**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```
**Request Body:**
```json
{
  "title": "Update API documentation",
  "description": "Add more examples to the API documentation",
  "status": "In Progress"
}
```

#### 5. **Delete a Task**
**DELETE** `/tasks/:id`
**Headers:**
```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

---

## Error Response Format
For invalid requests, the API returns:
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Notes
- Replace `<jwt_token>` with the token received after logging in.


