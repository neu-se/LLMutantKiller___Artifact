import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split("\n");
        const desiredLines = [];
        for (let i = 0; i < lines.length; ++i) {
            const line = lines[i];
            if (!Q.isInternalFrame(line) && !Q.isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        const filteredStack = desiredLines.join("\n");
        expect(filteredStack).not.toContain("q.js");
    });
});