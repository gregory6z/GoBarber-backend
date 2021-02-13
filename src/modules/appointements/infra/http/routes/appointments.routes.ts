/* eslint-disable camelcase */
import { Router } from 'express';
//import { getCustomRepository } from 'typeorm';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentController from '../controllers/AppointmentController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

//appointmentsRouter.get('/', async (request, response) => {
// const appointments = await appointmentsRepository.find();
//
// return response.json(appointments);
//});

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentController.create,
);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
