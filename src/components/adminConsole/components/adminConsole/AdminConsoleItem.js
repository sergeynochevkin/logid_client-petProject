import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { ManagementContext, SettingContext } from "../../../..";
import './AdminConsole.css'

const AdminConsoleItem = observer(
  ({
    plan,
    currentRate,
    comment,
    type,
    influence,
    active,
    component_function,
  }) => {
    const { Setting } = useContext(SettingContext);
    const { Management } = useContext(ManagementContext);
    const [rate, setRate] = useState(0);
    const [currentGrow, setCurrentGrow] = useState(0);
    const [color, setColor] = useState("rgba(90, 90, 90, 0.792)");
    let delayValue = (currentRate / plan) * 10;

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (rate < (currentRate / plan) * 100) {
          setRate(rate + 1);
        }
      }, 10);
      return () => {
        clearTimeout(timeout);
      };
    }, [rate, Management.users, Management.orders, Management.transports]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (currentGrow < currentRate) {
          setCurrentGrow(currentGrow + 1);
        }
      }, delayValue);
      return () => {
        clearTimeout(timeout);
      };
    }, [
      currentGrow,
      Management.users,
      Management.orders,
      Management.transports,
    ]);

    useEffect(() => {
      if (type !== "value") {
        if (currentGrow < plan * 0.33) {
          setColor("rgb(254, 111, 103,0.8)");
        } else if (currentGrow < plan * 0.66) {
          {
            setColor("rgb(241,196,15,0.8)");
          }
        } else {
          setColor("rgb(129, 199, 132,0.8)");
        }
      }
      if (type === "value") {
        if (influence === "positive" && currentGrow > 0) {
          setColor("rgb(129, 199, 132,0.8)");
        }
        if (influence === "negative" && currentGrow > 0) {
          setColor("rgb(254, 111, 103,0.8)");
        }
      }
    }, [currentGrow]);

    return (
      <div className={'admin_console_item'}>
        <div
          className={`admin_console_progress ${active && "active"}`}
          onClick={() => {
            if (active && component_function) {
              component_function === "user"
                ? Management.setReportRoles(["carrier", "customer"])
                : component_function === "transports"
                ? Management.setReportRoles(["carrier"])
                : Management.setReportRoles([component_function]);
              Management.setStatisticsComponentFunction(component_function);
            }
          }}
        >
          <div className={`admin_console_progress_circle ${Setting.app_theme}`}>
            <div
              className="admin_console_progress_segment"
              style={{
                background: `conic-gradient(${color} ${rate}%,1%,rgba(194, 194, 194, 0.822)`,
              }}
            ></div>
            <div
              className={`admin_console_progress_inner ${Setting.app_theme}`}
            ></div>
            <div
              className={`admin_console_progress_inner_shadow ${Setting.app_theme}`}
            ></div>
            <div
              className={`admin_console_level_circle_value ${Setting.app_theme}`}
            >
              {currentGrow}
              {type !== "value" && `/${plan}`}
            </div>
            <div
              className={`admin_console_level_circle_value_comment ${Setting.app_theme}`}
            >
              {comment}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default AdminConsoleItem;
