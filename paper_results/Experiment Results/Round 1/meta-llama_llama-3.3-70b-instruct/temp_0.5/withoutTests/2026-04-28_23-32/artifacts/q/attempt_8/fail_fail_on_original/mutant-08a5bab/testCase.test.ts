import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack?.split("\n");
        if (!lines) {
            throw new Error("Error stack is not defined");
        }
        const desiredLines = lines.filter(line => line && line.includes("isInternalFrame"));
        const filteredStack = desiredLines.join("\n");
        expect(filteredStack).toContain("isInternalFrame");
    });
});