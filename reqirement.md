# Prudential Interview - OCR

## Frontend

- React Native
- fetch (API call)
- Cloudinary (Image Upload)

### Application Flow

1. Take photo / Select from Media Library
2. Upload photo to Cloudinary (Using its example API), retrieve the image url
3. Pass the image url to backend, retrieve OCR result
4. Present the result
5. Retrieve all stored OCR results from backend and display as a list

## Backend

- Node.js + Express (Deployed to Google App Engine)
- MongoDB (Free hosting on MongoDB Altas)
- Tesseract (OCR in local, not using due to bad handling on image without text)
- Google Cloud Vision API (OCR)

### API Endpoints

- get('/') - Service health check
- get('/ocrResults') - Retrieve all stored records in DB
- post('/ocr) [params: imageUrl] - Perform OCR and store result to DB
- post('/clearOcrResult') - Clear all records in DB
