import react, { useState } from "react";
import Select from "react-select";

import "./SupportRequestForm.styles.scss";

const SupportRequestForm = ({ onSubmit, children }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [typeId, setTypeId] = useState(null);
  const [file, setFile] = useState();

  const serviceOptions = [{ value: 1, label: "Поддержка интранет" }];
  const typeOptions = [{ value: 1, label: "Орг. структура" }];

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit({ serviceId, typeId, name, description, file });
  }

  return (
    <form className="form" onSubmit={onFormSubmit}>
      <div className="form__content">
        <div
          className={`form__field ${
            serviceId !== null && "form__field--active"
          }`}
        >
          <label className="form__label">Сервис</label>
          <Select
            options={serviceOptions}
            placeholder="Выберите сервис"
            onChange={({ value }) => setServiceId(value)}
          />
        </div>

        <div
          className={`form__field ${
            serviceId !== null && "form__field--active"
          }`}
        >
          <label className="form__label">Тема обращения</label>
          <Select
            options={typeOptions}
            placeholder="Выберите тему"
            onChange={({ value }) => setTypeId(value)}
          />
        </div>

        <div
          className={`form__field ${name.length > 0 && "form__field--active"}`}
        >
          <label className="form__label" htmlFor="text">
            Заголовок
          </label>
          <input
            className="form__input"
            placeholder="Введите заголовок"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div
          className={`form__field ${
            description.length > 0 && "form__field--active"
          }`}
        >
          <label className="form__label" htmlFor="text">
            Текст обращения
          </label>
          <textarea
            className="form__textarea"
            placeholder="Введите текст обращения..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form__field">
          <label className="form__file-label" htmlFor="file">
            Прикрепить файлы
          </label>
          <input
            className="form__file-input"
            type="file"
            id="file"
            onChange={handleChange}
          />
        </div>

        <div className="form__warning">
          Суммарный размер загружаемых файлов не должен превышать 20 Мб
        </div>
      </div>

      <div className="form__line"></div>

      <div className="form__footer">
        {children}
        <button className="form__submit" type="submit">
          Отправить
        </button>
      </div>
    </form>
  );
};

export default SupportRequestForm;
