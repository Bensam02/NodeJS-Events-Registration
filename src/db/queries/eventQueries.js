import pool from "../../config/db.js";

export const createEvent = async ({
  title,
  description,
  // start_date,
  // end_date,
  location,
  status,
  cover_image,
  capacity,
}) => {
  const query = `
    INSERT INTO events (title, description, location, status, cover_image, capacity)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    title,
    description,
    location,
    status?.toLowerCase(),
    cover_image,
    capacity,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findEventById = async (id) => {
  const query = `SELECT e.*, u.user_name as organizer_name 
  FROM events e 
  LEFT JOIN users u ON e.organizer_id = u.user_id 
  WHERE event_id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const findAllEvents = async () => {
  const query = `SELECT e.*, u.user_name as organizer_name 
  FROM events e
  LEFT JOIN users u ON e.organizer_id = u.user_id`;
  const result = await pool.query(query);
  return result.rows;
};

export const registerParticipant = async ({
  registration_date,
  status,
  deleted_at = ''
}, event_id, user_id) => {
  const query = `
    INSERT INTO registrations (registration_date, status, deleted_at, user_id, event_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    registration_date,
    status,
    deleted_at = '2024-11-12T14:30:00Z',
    user_id,
    event_id
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export const updateEvent = async ({
  title,
  description,
  start_date = '',
  end_date = '',
  location,
  status,
  cover_image,
  capacity,
  event_id,
}) => {
  const query = `
    UPDATE events 
    SET 
      title = $1,
      description = $2,
      start_date = $3,
      end_date = $4,
      location = $5,
      status = $6,
      cover_image = $7,
      capacity = $8
    WHERE event_id = $9
    RETURNING *;
  `;
  const values = [
    title,
    description,
    start_date,
    end_date,
    location,
    status?.toLowerCase(),
    cover_image,
    capacity,
    event_id
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getEventRegistrations = async (event_id) => {
  const query = "select r.user_id, u.user_name from public.registrations r Left join users u on r.user_id = u.user_id where event_id = $1";
  const result = await pool.query(query, [event_id]);
  return result.rows;
};

export const updateRegistrationTicketPdf = async (
  registration_id,
  ticket_filename
) => {
  const query = `
    UPDATE registrations
    SET ticket_pdf = $2
    WHERE registration_id = $1;
  `;
  const values = [
    registration_id,
    ticket_filename
  ];
  const result = await pool.query(query, values);
  return result;
};