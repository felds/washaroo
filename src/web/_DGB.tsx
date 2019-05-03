import React from "react";

export default function _DBG(data: any) {
  return (
    <pre>
      <code>{JSON.stringify(data, null, 4)}</code>
    </pre>
  );
}
