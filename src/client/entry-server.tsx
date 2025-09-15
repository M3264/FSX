import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.tsx";

export function render(url: string) {
  const context = {};
  const html = renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );

  return { html, context };
}
