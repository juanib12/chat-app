import Attachment from "./svg/Attachment";

const MessageForm = ({ handleSubmit, text, setText, setImg, error }) => {
  return (
    <>
      <form className="message_form" onSubmit={handleSubmit}>
        <label className="img">
          <i className="bx bx-upload"></i>
        </label>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="img"
          accept="image/*"
          style={{ display: "none" }}
        />
        <div>
          <input
            type="text"
            placeholder="Enviar mensaje..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="message_form-btn">
          <button
            type="submit"
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#f96e46",
              fontSize: "25px",
            }}
          >
            <i className="bx bxs-send icons"></i>
          </button>
        </div>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default MessageForm;
