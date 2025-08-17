import React from "react";
import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
// import { toast } from "react-hot-toast";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#4b362180_0%,transparent_100%)]" />
      {/* <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full 
[background:radial-gradient(100%_100%_at_50%_100%,#4b3621_0%,transparent_100%)]"
      /> */}

      {/* <button className="btn btn-primary">click me</button> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:idx" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
