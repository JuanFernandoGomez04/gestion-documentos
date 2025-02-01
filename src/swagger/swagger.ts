export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Firma de Documentos',
    version: '1.0.0',
    description: 'API para firmar documentos y generar códigos QR con datos encriptados',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo',
    },
  ],
  paths: {
    '/api/document/sign': {
      post: {
        tags: ['Documentos'],
        summary: 'Firma un documento y genera un código QR',
        description: 'Recibe los datos del documento, los encripta y genera un código QR',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'nombre',
                  'cedula',
                  'tarjetaProfesional',
                  'fecha',
                  'direccion',
                  'numeroContrato',
                  'motivoFirma',
                ],
                properties: {
                  nombre: {
                    type: 'string',
                    description: 'Nombre completo del firmante',
                    example: 'Juan Pérez',
                  },
                  cedula: {
                    type: 'string',
                    description: 'Número de cédula del firmante',
                    example: '123456789',
                  },
                  tarjetaProfesional: {
                    type: 'string',
                    description: 'Número de tarjeta profesional',
                    example: 'TP123456',
                  },
                  fecha: {
                    type: 'string',
                    description: 'Fecha de firma del documento',
                    example: '2023-09-20',
                  },
                  direccion: {
                    type: 'string',
                    description: 'Dirección del firmante',
                    example: 'Calle 123 #45-67',
                  },
                  numeroContrato: {
                    type: 'string',
                    description: 'Número de contrato o documento',
                    example: 'CONT2023001',
                  },
                  motivoFirma: {
                    type: 'string',
                    description: 'Motivo de la firma',
                    example: 'Aceptación de términos y condiciones',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Documento procesado exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        encryptedData: {
                          type: 'string',
                          description: 'Datos encriptados del documento',
                        },
                        qrBase64: {
                          type: 'string',
                          description: 'Código QR en formato base64',
                        },
                        qrImageUrl: {
                          type: 'string',
                          description: 'URL de la imagen QR almacenada en el servidor',
                          example: 'http://localhost:3000/qr-codes/qr-1234567890.png',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Datos inválidos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Datos inválidos',
                    },
                    details: {
                      type: 'array',
                      items: {
                        type: 'object',
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Error del servidor',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                    error: {
                      type: 'string',
                      example: 'Error al procesar el documento',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};