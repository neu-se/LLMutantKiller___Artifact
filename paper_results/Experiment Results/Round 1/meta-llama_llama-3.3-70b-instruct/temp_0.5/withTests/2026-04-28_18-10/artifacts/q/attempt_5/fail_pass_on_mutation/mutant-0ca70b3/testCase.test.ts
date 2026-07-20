import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter stack traces correctly", () => {
        const lines = [
            "    for (var i = 0; i < lines.length; ++i) {",
            "    at Q (/Users/anon/Documents/research/LLMTestGeneration/ExperimentRunning/six/mutant-killer/llm-cache/meta-llama_llama-3.3-70b-instruct/temp_0.5/withTests/cached/artifacts/q/q.js:123:45)",
            "    at Object.<anonymous> (/Users/anon/Documents/research/LLMTestGeneration/ExperimentRunning/six/mutant-killer/llm-cache/meta-llama_llama-3.3-70b-instruct/temp_0.5/withTests/cached/artifacts/q/q.js:456:67)",
        ];
        const result = lines.filter((line) => {
            return line.includes("for (var i = 0; i < lines.length; ++i) {");
        });
        expect(result.length).toBe(1);
    });
});