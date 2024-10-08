import { v4 } from "uuid";
import {
  FetcherContext,
  NotificationContext,
  SettingContext,
  TranslateContext,
  //@ts-ignore
} from "../../..";

import { useContext, useEffect, useState } from "react";
import ym from "react-yandex-metrika";
import { useLocation } from "react-router-dom";

import {
  deleteNotification,
  fetchNotification,
  //@ts-ignore
} from "../../../http/notificationApi";

export const useMain = () => {
  //@ts-ignore
  const { fetcher } = useContext(FetcherContext);
  //@ts-ignore
  const { Translate } = useContext(TranslateContext);
  //@ts-ignore
  const { Notification } = useContext(NotificationContext);
  //@ts-ignore
  const queryParams = new URLSearchParams(window.location.search);
  const uuid = queryParams.get("uuid");
  const [callRequested, setCallRequested] = useState(false);
  //@ts-ignore
  const { Setting } = useContext(SettingContext);
  const location = useLocation();

  useEffect(() => {
    ym("hit", `${location.pathname + location.search}`);
  }, []);

  useEffect(() => {
    fetcher.setMainCounters(true);
  }, []);

  useEffect(() => {
    async function handleUrlNotification() {
      let notification = await fetchNotification(uuid);
      Notification.addNotification([
        { id: v4(), type: notification.type, message: notification.message },
      ]);
      await deleteNotification(notification.id);
    }
    if (uuid) {
      handleUrlNotification();
      fetcher.setUserInfo(true);
    }
  }, []);

  return { callRequested, setCallRequested, Setting, Translate };
};
