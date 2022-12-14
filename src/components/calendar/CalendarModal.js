import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import { eventAddNew, eventClearActiveEvent, eventStartAddNew, eventStartUpdate, eventUpdated } from "../../actions/events";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};
export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;
useEffect(() => {
  if(activeEvent){
    setFormValues(activeEvent)
  }else{
    setFormValues(initEvent)
  }
}, [activeEvent,setFormValues])

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({ ...formValues, start: e });
  };
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({ ...formValues, end: e });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire({
        icon: "error",
        title: "Lo siento..",
        text: "La fecha fin debe ser mayor a la fecha de inicio!",
      });
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    if(activeEvent){
      dispatch(eventStartUpdate(formValues));
    }else{
      dispatch(
        eventStartAddNew(formValues)
      );
    }

    setTitleValid(true);
    closeModal();
  };
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
    //cerrar modal
  };
  return (
    <Modal
      isOpen={modalOpen}
      //onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
      //onAfterOpen={afterOpenModal}
    >
      <div className="modal-header-container">
        <h1 className="modal-title"> {(activeEvent)?'Editar Evento':'Agregar Evento'} </h1>
        <button onClick={closeModal} className="modal-close-button">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            format="y/MM/dd h:mm a"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            format="y/MM/dd h:mm a"
            className="form-control"
          />
        </div>
        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="T??tulo del evento"
            name="title"
            value={title}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripci??n corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Informaci??n adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
