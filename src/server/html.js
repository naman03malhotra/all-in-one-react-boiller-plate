import React from "react";

const Html = ({ children, initialState, scripts }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title>Server Side</title>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }}></div>
      {initialState && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE=${JSON.stringify(initialState)}`,
          }}
        />
      )}
      {Object.keys(scripts).map((script, index) => (
        <script key={index} src={scripts[script]} />
      ))}
    </body>
  </html>
);

export default Html;
