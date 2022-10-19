import { Router } from 'express';
import { checkJwt } from '../middlewares/jwt';
import AuthRoute from '../routes/authRoute';
import VaccineRoute from '../routes/vaccineRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use(checkJwt);
router.use('/vaccine', VaccineRoute);

router.get('/', (req, res) => res.status(200).send('<h1>Vaccine Management App Api</h1>'));

router.get('*', (req, res) => {
  return res.status(404).send({ message: 'api not found.' });
});

export default router;
