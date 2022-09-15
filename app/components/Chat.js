import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";

function Chat() {
  const chatField = useRef(null);
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const [state, setState] = useImmer({
    fieldValue: "",
    chatMessages: []
  });

  useEffect(() => {
    if (appState.isChatOpen) {
      chatField.current.focus();
    }
  }, [appState.isChatOpen]);

  function hadleFieldChange(e) {
    const value = e.target.value;
    setState(draft => {
      draft.fieldValue = value;
    });
  }

  function hadleSubmit(e) {
    e.preventDefault();
    //Send message to chat server

    setState(draft => {
      //Add message to state collection of messages
      draft.chatMessages.push({
        message: draft.fieldValue,
        username: appState.user.username,
        avatar: appState.user.avatar
      });
      draft.fieldValue = "";
    });
  }

  return (
    <div
      id="chat-wrapper"
      className={`chat-wrapper ${
        appState.isChatOpen ? "chat-wrapper--is-visible" : ""
      } shadow border-top border-left border-right`}
    >
      <div className="chat-title-bar bg-primary">
        Chat
        <span
          onClick={() => appDispatch({ type: "closeChat" })}
          className="chat-title-bar-close"
        >
          <i className="fas fa-times-circle"></i>
        </span>
      </div>
      <div id="chat" className="chat-log">
        {state.chatMessages.map((message, index) => {
          if (message.username == appState.user.username) {
            return (
              <>
                <div className="chat-self">
                  <div className="chat-message">
                    <div className="chat-message-inner">{message.message}</div>
                  </div>
                  <img
                    className="chat-avatar avatar-tiny"
                    src={message.avatar}
                  />
                </div>
              </>
            );
          } else {
            return (
              <>
                <div className="chat-other">
                  <a href="#">
                    <img className="avatar-tiny" src={message.avatar} />
                  </a>
                  <div className="chat-message">
                    <div className="chat-message-inner">
                      <a href="#">
                        <strong>{message.username}: </strong>
                      </a>
                      {message.message}
                    </div>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      <form
        onSubmit={hadleSubmit}
        id="chatForm"
        className="chat-form border-top"
      >
        <input
          value={state.fieldValue}
          onChange={hadleFieldChange}
          ref={chatField}
          type="text"
          className="chat-field"
          id="chatField"
          placeholder="Type a message…"
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default Chat;
