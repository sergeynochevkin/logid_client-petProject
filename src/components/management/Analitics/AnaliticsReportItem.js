import React from "react";
import "../../../App.css";
import { observer } from "mobx-react-lite";

const AnaliticsReportItem = observer(({ oneItem }) => {
  console.log(JSON.stringify(oneItem));

  return (
    <div className="management_row">
      {Object.entries(oneItem).map(([k, v]) => (
        <div>
          {k}: {v}
        </div>
      ))}
    </div>
  );
});

export default AnaliticsReportItem;
