import React, { useState } from "react";

import "./app.scss";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-contaner">
      Myasds
      <button onClick={() => setOpen(true)}>Click me</button>
      {`The App is currenty open - ${open}`}
    </div>
  );
}

export default App;
