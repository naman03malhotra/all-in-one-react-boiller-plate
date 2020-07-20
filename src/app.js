import React, { useState } from "react";

import "./app.scss";

function App({ initialState }) {
  const [open, setOpen] = useState(initialState);

  return (
    <div className="app-contaner">
      Myasds
      <button onClick={() => setOpen(!open)}>Click me</button>
      {`The App is currenty open - ${open}`}
    </div>
  );
}

export default App;
