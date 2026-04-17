import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        text,
      });
      setReport(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6">
          🔐 PDPA Compliance Checker
        </h1>

        {/* Text Area */}
        <textarea
          className="w-full h-60 p-4 rounded-xl text-black focus:outline-none focus:ring-4 focus:ring-pink-300"
          placeholder="Paste privacy policy here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleAnalyze}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 transition rounded-full font-semibold shadow-lg"
          >
            {loading ? "Analyzing..." : "Check Compliance"}
          </button>
        </div>

        {/* Results */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">📊 Result</h2>

          {report.length === 0 ? (
            <p className="text-white/70">No results yet...</p>
          ) : (
            <div className="space-y-3">
              {report.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl shadow-md flex justify-between items-center ${
                    item.status.includes("❌")
                      ? "bg-red-500/20 border border-red-300"
                      : "bg-green-500/20 border border-green-300"
                  }`}
                >
                  <span>{item.section}</span>
                  <span className="font-bold">{item.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;