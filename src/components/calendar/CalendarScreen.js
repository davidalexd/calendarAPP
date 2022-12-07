import React, { useEffect, useState } from "react";
import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { messages } from "../../helpers/calendarMessage";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es-mx";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { uiOpenModal } from "../../actions/ui";
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";
moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor:(uid===event.user._id)?"#367CF7":"#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <div>
      <Navbar />
      <div className="calendar-screen">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          onDoubleClickEvent={onDoubleClick}
          onSelectSlot={onSelectSlot}
          selectable={true}
          eventPropGetter={eventStyleGetter}
          components={{ event: CalendarEvent }}
          onView={onViewChange}
          view={lastView}
          onSelectEvent={onSelectEvent}
        />
        <AddNewFab />
        {activeEvent && <DeleteEventFab />}
        <CalendarModal />
      </div>
    </div>
  );
};
