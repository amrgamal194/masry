import express, { Router } from 'express';
import healthController from '../controllers/HealthController.js';

const router: Router = express.Router();

router.get('/', healthController.health);
router.get('/detailed', healthController.healthCheck);

export default router;

