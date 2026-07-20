import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stackTrace = error.stack;

        const lines = stackTrace.split("\n");
        const filteredLines = lines.filter(line => !line.includes("(module.js:") && !line.includes("(node.js:"));
        const result = filteredLines.join("\n");

        expect(result).not.toContain("internal");
    });
});