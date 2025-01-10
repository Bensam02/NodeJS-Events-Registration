import db from "../db/orm/models/index.js";

export const createEventService = async ({
  title,
  description,
  location,
  status,
  coverImage,
  capacity,
  startDate,
  endDate,
  userId,
}) => {
  const event = await db.Events.create({
    title,
    description,
    location,
    status: status?.toLowerCase(),
    coverImage: coverImage,
    capacity,
    startDate,
    endDate,
    organizerId: userId
  });
  return event;
};

export const getEventByIdService = async (id) => {
  const event = await db.Events.findOne({
    where: { eventId: id },
    include: "organizer",
  });
  return event;
};

export const getAllEventsService = async () => {
  const events = await db.Events.findAll({
    include: "organizer"
  });
  return events;
};

export const registerParticipantService = async (
  { registration_date, status },
  event_id,
  user_id
) => {
  const registration = await db.Registrations.create({
    registrationDate: registration_date,
    status,
    deletedAt: null, // Ensure no soft delete on creation
    userId: user_id,
    eventId: parseInt(event_id, 10),
  });
  return registration;
};

export const updateEventService = async ({
  title,
  description,
  start_date,
  end_date,
  location,
  status,
  cover_image,
  capacity,
  event_id,
}) => {
  const updatedEvent = await db.Events.update(
    {
      title,
      description,
      startDate: start_date,
      endDate: end_date,
      location,
      status: status?.toLowerCase(),
      coverImage: cover_image,
      capacity,
    },
    { where: { eventId: event_id }, returning: true }
  );
  return updatedEvent[1][0]; // Return the updated event object
};

export const getEventRegistrationsService = async (event_id) => {
  const registrations = await db.Registrations.findAll({
    where: { eventId: event_id }
  });
  return registrations;
};

export const updateRegistrationTicketPdfService = async (
  registration_id,
  ticket_filename
) => {
  const result = await db.Registrations.update(
    { ticketPdf: ticket_filename },
    { where: { registrationId: registration_id } }
  );
  return result;
};
