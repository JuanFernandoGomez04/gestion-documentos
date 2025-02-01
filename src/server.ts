import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { DocumentData } from './types/document';
import { generateQRCode } from './utils/qrGenerator';
import { validateDocument } from './middleware/validateDocument';
import { swaggerDocument } from './swagger/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api/document/sign', validateDocument, async (req: express.Request, res: express.Response) => {
  try {
    const documentData: DocumentData = req.body;

    // Convert document data to string and encrypt it
    const documentString = JSON.stringify(documentData);

    // Generate QR code with encrypted data
    const { qrBase64, qrImageUrl } = await generateQRCode(documentString);

    res.json({
      isError: false,
      url_imagen:qrImageUrl
    });
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({
      success: false,
      error: 'Error al procesar el documento'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});