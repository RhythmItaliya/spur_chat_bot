require('module-alias/register');

import express from 'express';
import { PrismaClient } from '@prisma/client';
import { setupMiddleware } from './middleware';
import { setupRoutes } from './routes';
import { serverConfig } from '@/config';

const app = express();
const prisma = new PrismaClient();

setupMiddleware(app);

setupRoutes(app, prisma);

app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port}`);
});
