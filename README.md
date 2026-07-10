# Image Processing & Analysis API

## Overview

This project is an asynchronous image processing system that allows users to upload images, process them in the background, and retrieve analysis results through APIs.

The system follows a queue-based architecture where image uploads are stored immediately, while intensive image analysis tasks are handled asynchronously by a background worker.

The application performs multiple image quality and information extraction checks including:

* Brightness Analysis
* Blur Detection
* Duplicate Image Detection
* OCR Text Extraction
* Image Dimension Analysis
* File Size Analysis

---

# Features

## Image Upload API

* Upload images using Multer middleware.
* Generates a unique processing ID for every uploaded image.
* Stores image metadata in MongoDB.
* Returns an immediate response without waiting for processing completion.

## Asynchronous Processing

The application uses a background worker model:

1. Image is uploaded.
2. Metadata is stored in MongoDB.
3. A processing job is added to the queue.
4. Background worker picks the job.
5. Image analysis is performed.
6. Results are stored back in MongoDB.

## Processing States

Each image follows the following lifecycle:

```
pending
   |
   ▼
processing
   |
   ▼
completed / failed
```

Status tracking allows clients to monitor the progress of image processing.

---

# System Architecture

```
                Client
                  |
                  |
              Upload API
                  |
                  |
              MongoDB
                  |
                  |
          In-Memory Queue
                  |
                  |
          Background Worker
                  |
        ---------------------
        |        |          |
        ▼        ▼          ▼
  Brightness   Blur       OCR
        |
        ▼
 Duplicate Detection

                  |
                  |
          Store Analysis Result
                  |
                  |
        ----------------------
        |                    |
        ▼                    ▼
    Status API          Result API

```

---

# Technology Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## File Handling

* Multer

## Image Processing

* Image analysis libraries
* OCR processing engine

## API Testing

* Postman

---

# API Endpoints

## 1. Upload Image

### Endpoint

```
POST /api/images/upload
```

### Description

Uploads an image and creates a processing task.

### Request

Form-data:

```
image : <image-file>
```

### Response Example

```json
{
    "message": "Image uploaded successfully",
    "imageId": "66a8f9d9e4b7..."
}
```

---

# 2. Check Processing Status

### Endpoint

```
GET /api/images/status/:id
```

### Response Example

```json
{
    "id": "66a8f9d9e4b7...",
    "status": "completed"
}
```

Possible status values:

```
pending
processing
completed
failed
```

---

# 3. Get Analysis Result

### Endpoint

```
GET /api/images/result/:id
```

### Response Example

```json
{
    "filename": "sample.jpg",
    "analysis": {
        "brightness": "normal",
        "blur": false,
        "duplicate": false,
        "ocrText": "Sample extracted text",
        "width": 1920,
        "height": 1080,
        "fileSize": "2MB"
    }
}
```

---
# Project Structure

```text
INTELLIGENT-MEDIA-PROCESSING
│
├── src
│   ├── config
│   ├── controllers
│   ├── logs
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   │   ├── blurService.js
│   │   ├── hashService.js
│   │   ├── imageAnalysisService.js
│   │   ├── imageQueue.js
│   │   └── OCRService.js
│   ├── uploads
│   ├── utils
│   ├── workers
│   │   └── imageWorker.js
│   ├── app.js
│   └── server.js
│
├── package.json
├── package-lock.json
├── README.md
└── .env
```

# Image Analysis Process

## Brightness Detection

The system analyzes image pixel intensity values to determine whether an image is:

* Too dark
* Too bright
* Normal

## Blur Detection

Blur detection is performed by analyzing image sharpness values.

Low sharpness indicates a blurred image.

## Duplicate Detection

The system generates image fingerprints/hashes.

Images with matching hashes are identified as duplicates.

## OCR Extraction

OCR extracts readable text content from uploaded images.

## Metadata Extraction

Additional information collected:

* Image dimensions
* File size
* Filename
* Original filename

---

# Processing Flow

```
User Uploads Image

        |
        ▼

Generate Unique Image ID

        |
        ▼

Save Metadata in MongoDB

        |
        ▼

Add Task to Queue

        |
        ▼

Background Worker Processes Image

        |
        ▼

Run Analysis Services

        |
        ▼

Store Results in Database

        |
        ▼

Client Retrieves Result
```

---

# Queue Strategy

The project uses a lightweight queue implementation to process uploaded images asynchronously. Images are uploaded and stored immediately, while a background worker picks queued jobs and performs image analysis independently of the upload request.

## Why Queue?

Image processing operations like OCR and image analysis can take time.

Processing them synchronously would:

* Increase API response time
* Reduce scalability
* Block server resources

Using a queue allows:

* Immediate upload response
* Independent background processing
* Better resource management

---

# Database Design

MongoDB stores image processing information.

Example document:

```json
{
 "filename":"image1.jpg",
 "originalName":"photo.jpg",
 "status":"completed",
 "analysis":{
    "brightness":"normal",
    "blur":false,
    "ocrText":"Hello"
 },
 "hash":"a92jd82jd"
}
```

---

# Design Decisions

## Why MongoDB?

MongoDB was selected because:

* Flexible JSON-like document structure
* Easy storage of varying analysis results
* Good compatibility with Node.js

## Why Asynchronous Processing?

Image analysis can be computationally expensive.

Separating upload and processing improves:

* Performance
* Scalability
* User experience

## Why Modular Analysis Services?

Each image check is separated into independent modules.

Benefits:

* Easy maintenance
* Easy testing
* Easy addition of new checks

---

# AI Usage Disclosure

AI tools were used as development assistance for:

* Understanding implementation approaches
* Improving documentation quality
* Debugging assistance
* Code structure suggestions

All final implementation decisions, integration, and testing were performed manually.

---

# Trade-offs

## Current Implementation

### Advantages

* Simple architecture
* Fast API response
* Easy to understand
* Modular processing

### Limitations

* Queue is stored in memory
* Processing jobs are lost if the server restarts
* Limited scalability for multiple servers

## Future Improvements

Possible enhancements:

* Redis/BullMQ based queue
* Docker deployment
* Retry mechanism
* Automated testing
* Rate limiting
* Monitoring dashboard

---

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create:

```
.env
```

Add:

```
MONGO_URI=<your_mongodb_connection>
PORT=5000
```

## Start Server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# Testing

API testing was performed using Postman.

Test cases include:

* Successful image upload
* Invalid file upload
* Status checking
* Result retrieval
* Processing failure handling

---

# Future Scope

The project can be extended with:

* Cloud storage integration
* Distributed job queues
* Real-time notifications
* Machine learning based image quality scoring
* Web dashboard

---

# Author

**Chandana M**

Image Processing & Analysis API

Assignment Submission
