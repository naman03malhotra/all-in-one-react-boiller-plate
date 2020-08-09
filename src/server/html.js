import React from "react";

const Html = ({ children, initialState, scripts }) => {
  const regexForGzip = new RegExp(".js$");
  return (
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
        {Object.keys(scripts).map((script, index) => {
          if (!script.match(regexForGzip)) return;
          return <script key={index} src={scripts[script]} />;
        })}
      </body>
    </html>
  );
};

export default Html;
