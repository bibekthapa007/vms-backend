import { Router, Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import NotFoundError from '../errors/notFound';
import ValidationError from '../errors/validation';
import Vaccine from '../models/VaccineModel';

const router = Router();

function getVaccineList(req: Request, res: Response, next: NextFunction) {
  Vaccine.findAll()
    .then((vaccines) => {
      return res.status(200).send({ message: 'vaccines fetched successfully.', vaccines });
    })
    .catch(next);
}

function getVaccineById(req: Request, res: Response, next: NextFunction) {
  const vaccine_id = req.params.vaccine_id;
  let { error, value } = Joi.object({
    id: Joi.number().required(),
  }).validate({ id: vaccine_id });

  if (error) throw new ValidationError(error.details[0].message);

  Vaccine.findOne({ where: { id: value.id } })
    .then((vaccine) => {
      if (!vaccine) throw new NotFoundError('vaccine not found');
      return res.status(200).send({ message: 'vaccine fetched successfully.', vaccine });
    })
    .catch(next);
}

function createVaccine(req: Request, res: Response, next: NextFunction) {
  let { error, value } = Joi.object({
    id: Joi.number(),
    code: Joi.string().required(),
    name: Joi.string().required(),
    province_id: Joi.number().required(),
  }).validate(req.body);

  if (error) throw new ValidationError(error.details[0].message);

  Vaccine.create(value)
    .then((vaccine) => {
      return res.status(200).send({ message: 'vaccine created successfully.', vaccine });
    })
    .catch(next);
}

function updateVaccine(req: Request, res: Response, next: NextFunction) {
  const vaccine_id = req.params.vaccine_id;
  let { error, value } = Joi.object({
    id: Joi.number().required(),
    code: Joi.string(),
    name: Joi.string(),
    province_id: Joi.number(),
  }).validate({ ...req.body, id: vaccine_id });

  if (error) throw new ValidationError(error.details[0].message);

  Vaccine.findOne({ where: { id: value.id } })
    .then((vaccine) => {
      if (!vaccine) throw new NotFoundError('vaccine not found');
      Vaccine.update(value, { where: { id: value.id }, returning: true })
        .then(([affected_rows]) => {
          return res.status(200).send({ message: 'vaccine updated successfully.', affected_rows });
        })
        .catch(next);
    })
    .catch(next);
}

function deleteVaccine(req: Request, res: Response, next: NextFunction) {
  const vaccine_id = req.params.vaccine_id;
  let { error, value } = Joi.object({
    id: Joi.number().required(),
  }).validate({ id: vaccine_id });

  if (error) throw new ValidationError(error.details[0].message);

  Vaccine.findOne({ where: { id: value.id } })
    .then((vaccine) => {
      if (!vaccine) throw new NotFoundError('vaccine not found');

      Vaccine.destroy({ where: { id: value.id } })
        .then((destroyed_rows) => {
          return res.status(200).send({ message: 'vaccine deleted successfully.', destroyed_rows });
        })
        .catch(next);
    })
    .catch(next);
}

function markMandatory(req: Request, res: Response, next: NextFunction) {
  const vaccine_id = req.params.vaccine_id;
  let { error, value } = Joi.object({
    id: Joi.number().required(),
    is_mandatory: Joi.boolean().required(),
  }).validate({ ...req.body, id: vaccine_id });

  if (error) throw new ValidationError(error.details[0].message);

  Vaccine.findOne({ where: { id: value.id } })
    .then((vaccine) => {
      if (!vaccine) throw new NotFoundError('vaccine not found');
      Vaccine.update(value, { where: { id: value.id }, returning: true })
        .then(([affected_rows]) => {
          return res.status(200).send({ message: 'vaccine updated successfully.', affected_rows });
        })
        .catch(next);
    })
    .catch(next);
}

export default {
  getVaccineList,
  getVaccineById,
  createVaccine,
  updateVaccine,
  markMandatory,
  deleteVaccine,
};
