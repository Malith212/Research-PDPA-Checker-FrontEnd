import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [report, setReport] = useState([]);

  const handleAnalyze = async () => {
    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        text,
      });
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PDPA Compliance Checker</h1>

      <textarea
        rows="10"
        cols="60"
        placeholder="Paste privacy policy here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAnalyze}>Check Compliance</button>

      <h2>Result:</h2>
      <ul>
        {report.map((item, index) => (
          <li key={index}>
            {item.section} → {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;