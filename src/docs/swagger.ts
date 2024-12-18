import swaggerAutogen from "swagger-autogen";
const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

const doc = {
    info: {
      version: "v0.0.1",
      title: "Dokumentasi API BukaToko",
      description: "Dokumentasi API BukaToko",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local Server",
      },
      {
        url:"http://final-project-sanbercode-alpha.vercel.app/api",
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        LoginRequest: {
          email: "joni2024@yopmail.com",
          password: "123412341",
        },
        RegisterRequest: {
          fullName: "joni joni",
          username: "joni2024",
          email: "joni2024@yopmail.com",
          password: "123412341",
          confirmPassword: "123412341",
        },
        UpdateProfileRequest: {
          fullName: "joni joni",
          username: "joni2024",
          email: "joni2024@yopmail.com",
          password: "123412341",
          confirmPassword: "123412341",
        },
      },
    },
    security: [
        {
          bearerAuth: [],
        },
    ],
  };

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);