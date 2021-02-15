/* eslint-disable camelcase */
import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointements/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointements/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointements/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '@modules/appointements/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../IAppointmentRepository';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    year,
    month,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}
