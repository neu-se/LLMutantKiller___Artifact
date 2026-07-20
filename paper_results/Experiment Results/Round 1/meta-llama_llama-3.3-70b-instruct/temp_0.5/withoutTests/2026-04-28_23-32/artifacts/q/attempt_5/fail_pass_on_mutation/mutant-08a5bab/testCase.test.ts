import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack?.split("\n");
        const desiredLines = [];
        for (let i = 0; i < lines?.length; ++i) {
            const line = lines[i];
            if (line && !line.includes("q.js") && !line.includes("captureLine") && !line.includes("makeStackTraceLong")) {
                desiredLines.push(line);
            }
        }
        const filteredStack = desiredLines.join("\n");
        expect(filteredStack).not.toContain("q.js");
        expect(filteredStack).not.toContain("captureLine");
        expect(filteredStack).not.toContain("makeStackTraceLong");
    });
});