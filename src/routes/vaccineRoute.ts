import { Router } from 'express';
import vaccineController from '../controllers/vaccineController';

const router = Router();

router.route('/').get(vaccineController.getVaccineList).post(vaccineController.createVaccine);
router.route('/create').post(vaccineController.createVaccine);

router
  .route('/:vaccine_id')
  .get(vaccineController.getVaccineById)
  .put(vaccineController.updateVaccine)
  .delete(vaccineController.deleteVaccine);

router.route('/:vaccine_id/mandatory').post(vaccineController.markMandatory);

export default router;
