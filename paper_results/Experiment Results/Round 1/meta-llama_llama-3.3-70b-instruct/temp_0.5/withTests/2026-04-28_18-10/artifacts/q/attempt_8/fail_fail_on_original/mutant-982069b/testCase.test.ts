import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const stack = "Error\n    at q.js:1:1\n    at test.js:1:1";
        const lines = stack.split("\n");
        const desiredLines = lines.filter(line => !Q.isInternalFrame(line));
        const filteredStack = desiredLines.join("\n");
        expect(filteredStack).toContain("test.js");
    });
});