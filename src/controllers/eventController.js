import jwt from 'jsonwebtoken';
import {
  createEventService,
  getEventByIdService,
  getAllEventsService,
  registerParticipantService,
  updateEventService,
  getEventRegistrationsService,
  updateRegistrationTicketPdfService
} from "../services/eventService.js";
import { getUserByIdService } from '../services/userService.js';
import { createEventPdf } from '../utils/createEventPdf.js';

export const createEvent = async (req, res) => {
  const token = req.headers['authorization'];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const event = await createEventService({...req.body, userId: user.id});
    res.status(201).json({ event: "Event Created Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await getEventByIdService(req.params.event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await getAllEventsService();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerEvent = async (req, res) => {
  const event_id = req.params.event_id;
  const token = req.headers['authorization'];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const registration = await registerParticipantService(req.body, event_id, user.id);
    const regUser = await getUserByIdService(registration.userId);
    const regEvent = await getEventByIdService(registration.eventId);

    const pdfDetails = {
      user_name: regUser.userName,
      registration_id: registration.registrationId,
      event_name: regEvent.title,
      date: new Date(regEvent.startDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date(regEvent.startDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      venue: regEvent.location,
      organizer: regEvent.organizerName
    };

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=registration.pdf',
    });

    await createEventPdf(
      pdfDetails,
      (chunk) => res.write(chunk),
      () => res.end()
    ).then( async () => {
      const filename = `${regUser.user_name}-${registration.user_id}-${registration.event_id}`;
      const updateFilename = await updateRegistrationTicketPdfService(registration.registration_id, filename)
    });
  }
  catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error after headers sent:", error);
    }
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await updateEventService(req.body);
    res.status(201).json({ event: "Event Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getRegDetails = async (req, res) => {
  try {
    const event = await getEventByIdService(req.params.event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const eventRegistrations = await getEventRegistrationsService(req.params.event_id);

    const finalResponse = {
      event: event,
      total_registrations: eventRegistrations.length,
      registered_users: eventRegistrations,
    };

    res.json(finalResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
