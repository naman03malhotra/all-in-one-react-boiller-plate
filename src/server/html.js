import React from "react";

function filterAssets(assets) {
  const regexForJS = new RegExp(".js$");
  const regexForCss = new RegExp(".css$");
  const jsBucket = [],
    cssBucket = [];

  Object.keys(assets).map((assetName, index) => {
    if (assetName.match(regexForJS)) jsBucket.push(assets[assetName]);
    if (assetName.match(regexForCss)) cssBucket.push(assets[assetName]);
  });

  return {
    jsBucket,
    cssBucket,
  };
}

const Html = ({ children, initialState, assets }) => {
  const { jsBucket, cssBucket } = filterAssets(assets);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Server Side</title>
        {cssBucket.map((script, index) => {
          return (
            <link rel="stylesheet" type="text/css" key={index} href={script} />
          );
        })}
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
        {jsBucket.map((script, index) => {
          return <script key={index} src={script} />;
        })}
      </body>
    </html>
  );
};

export default Html;
