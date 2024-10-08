import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { NotificationContext, TranslateContext } from "../..";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SetNativeTranslate } from "../../modules/SetNativeTranslate";

import "./Notification.css";

const NotificationItem = observer(({ message, type, id }) => {
  const { Translate } = useContext(TranslateContext);
  const [notificationWidth, setNotificationWidth] = useState(100);
  const [intervalId, setIntervalId] = useState(null);
  const [exit, setExit] = useState("");
  const { Notification } = useContext(NotificationContext);
  const { width } = useWindowDimensions();

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setNotificationWidth((prev) => {
        if (prev > 0) {
          return prev - 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 100);
    setIntervalId(id);
  };

  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (notificationWidth === 0) {
      handleCloseNotification();
    }
  }, [notificationWidth]);

  const handleCloseNotification = () => {
    //may be disappear effect?
    setExit("exit");
    Notification.filterNotifications(id);
  };

  return (
    <div
      className={`notification_item ${type} ${exit}`}
      onClick={() => {
        setExit("exit");
        Notification.filterNotifications(id);
      }}
    >
      <div className={`message`}>{message}</div>
      <div
        className={`bar ${type}`}
        style={{ width: `${notificationWidth}%` }}
      ></div>
      {width <= 768 ? (
        <div className="tap_to_hide">
          {SetNativeTranslate(Translate.language, {}, "tap_to_hide")}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});

export default NotificationItem;
