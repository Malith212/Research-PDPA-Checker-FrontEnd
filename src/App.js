import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [report, setReport] = useState([]);
  const [totalSentences, setTotalSentences] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert("Please paste a privacy policy first");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        text,
      });

      setReport(res.data.report);
      setTotalSentences(res.data.totalSentences);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wide">
            PDPA Compliance Checker
          </h1>
          <p className="text-gray-400 mt-2">
            Analyze privacy policies against compliance rules
          </p>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-6">
          <textarea
            className="w-full h-64 bg-[#0b0f1a] text-gray-200 p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            placeholder="Paste privacy policy here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleAnalyze}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition shadow-lg"
            >
              {loading ? "Analyzing..." : "Run Compliance Check"}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-300">
            📊 Analysis Report
          </h2>

          <p className="text-gray-500 mb-4 text-sm">
            Total Sentences Analyzed: {totalSentences}
          </p>

          {report.length === 0 ? (
            <div className="text-gray-500 text-center border border-gray-800 rounded-xl p-6 bg-[#111827]">
              No analysis yet. Paste a policy and run the check.
            </div>
          ) : (
            <div className="grid gap-4">
              {report.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition ${
                    item.status.includes("❌")
                      ? "bg-red-500/10 border-red-500/40"
                      : "bg-green-500/10 border-green-500/40"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 font-medium">
                      {item.section}
                    </span>

                    <span
                      className={`font-semibold ${
                        item.status.includes("❌")
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 mt-2">
                    Confidence: {item.confidence}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Detection Source:{" "}
                    <span className="font-medium uppercase">{item.source}</span>
                  </p>

                  <p className="text-sm text-gray-300 mt-2 italic">
                    “{item.evidence}”
                  </p>
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