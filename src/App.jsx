import react from "react";
import { useState } from "react";

import "./App.styles.scss";
import background from "./assets/question.png";

import Modal from "./Modal/Modal";
import SupportRequestForm from "./SupportRequestForm/SupportRequestForm";

export default function App() {
  const [modalActive, setModalActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log({ email: "szaytsev@email.ru", ...data });

    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <main>
        <button
          className={modalActive ? "hideButton" : "showButton"}
          onClick={() => {
            setModalActive(true);
          }}
          style={{ backgroundImage: `url(${background})` }}
        ></button>
      </main>
      <Modal
        isActive={modalActive}
        onClose={() => setModalActive(false)}
        title="Запрос в тех. поддержкy"
      >
        <div className="modal__line"></div>

        <SupportRequestForm onSubmit={onSubmit}>
          <button
            className="button"
            type="button"
            onClick={() => setModalActive(false)}
          >
            Отменить
          </button>
        </SupportRequestForm>
      </Modal>
    </div>
  );
}
