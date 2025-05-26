import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

function MyCalendar() {
  const [allEvents, setAllEvents] = useState([]);
  const [sitterId] = useState(localStorage.getItem('userId')); // Assuming sitter's ID is stored in localStorage

  useEffect(() => {
    // Fetch sitter's pending requests
    axios.get(`http://localhost:3001/api/sitter-requests?sitterId=${sitterId}`)
      .then(res => {
        const events = res.data.map(request => ({
          title: `${request.parent_name} - Pending`,
          start: new Date(request.date), // Assuming `date` is stored in the `confirmation` table
          end: new Date(new Date(request.date).getTime() + 60 * 60 * 1000), // Assuming 1 hour event duration
          confirmationId: request.id, // Store the confirmation ID for updates
        }));
        setAllEvents(events);
      })
      .catch(err => console.error("Failed to fetch sitter's requests:", err));
  }, [sitterId]);

  const handleConfirmRequest = (confirmationId) => {
    axios.post('http://localhost:3001/api/confirm-request', { confirmationId })
      .then(() => {
        alert("Request confirmed!");
        // Refresh the calendar
        setAllEvents(prevEvents => prevEvents.map(event => 
          event.confirmationId === confirmationId ? { ...event, title: 'Confirmed' } : event
        ));
      })
      .catch(err => {
        console.error("Failed to confirm request:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => handleConfirmRequest(event.confirmationId)} // Trigger confirm on event click
      />
    </div>
  );
}

export default MyCalendar;
