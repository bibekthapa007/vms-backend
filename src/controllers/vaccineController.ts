import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import NotFoundError from '../errors/notFound';
import ValidationError from '../errors/validation';
import Vaccine from '../models/VaccineModel';
import cloudinary from '../utils/cloudinary';
import streamifier from 'streamifier';

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

function uploadFromBuffer(req: Request) {
  return new Promise((resolve, reject) => {
    const file = req.file as Express.Multer.File;
    if (!file.buffer) {
      reject('Buffer not found');
    }
    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'vaccine',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
}

async function createVaccine(req: Request, res: Response, next: NextFunction) {
  let { error, value } = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    no_of_doses: Joi.number().required(),
    is_mandatory: Joi.boolean(),
  }).validate(req.body);

  if (error) throw new ValidationError(error.details[0].message);

  let result: null | any = null;
  if (req.file) {
    try {
      result = await uploadFromBuffer(req);
    } catch (error) {
      next(error);
    }
  }

  if (result && (result.secure_url as string)) {
    value.image_link = result.secure_url;
  }

  Vaccine.create(value)
    .then((vaccine) => {
      return res
        .status(HttpStatus.CREATED)
        .send({ message: 'vaccine created successfully.', vaccine });
    })
    .catch(next);
}

function updateVaccine(req: Request, res: Response, next: NextFunction) {
  const vaccine_id = req.params.vaccine_id;
  let { error, value } = Joi.object({
    id: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
    no_of_doses: Joi.number(),
    is_mandatory: Joi.boolean(),
    image_link: Joi.string().allow(null),
  }).validate({ ...req.body, id: vaccine_id });

  if (error) throw new ValidationError(error.details[0].message);

  Vaccine.findOne({ where: { id: value.id } })
    .then((vaccine) => {
      if (!vaccine) throw new NotFoundError('vaccine not found');
      Vaccine.update(value, { where: { id: value.id }, returning: true })
        .then(([affected_rows]) => Vaccine.findOne({ where: { id: value.id } }))
        .then((vaccine) => {
          return res.status(200).send({ message: 'vaccine updated successfully.', vaccine });
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
