import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack?.split("\n");
        if (!lines) {
            throw new Error("Error stack is not defined");
        }
        const filteredStack = lines.filter(line => line && !line.includes("q.js"));
        expect(filteredStack).not.toContain("q.js");
        expect(filteredStack.length).toBeLessThan(lines.length);
    });
});