import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack ? stack.split("\n") : [];
        const filteredLines = lines.filter(line => !line.includes("(module.js:") && !line.includes("(node.js:"));
        expect(filteredLines.length).toBeLessThan(lines.length);
    });
});