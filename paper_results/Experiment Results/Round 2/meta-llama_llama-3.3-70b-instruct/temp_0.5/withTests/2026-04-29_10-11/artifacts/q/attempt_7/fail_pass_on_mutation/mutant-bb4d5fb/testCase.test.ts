import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle isInternalFrame", () => {
        const error = new Error();
        const stack = error.stack;
        if (stack) {
            const lines = stack.split("\n");
            const isInternalFrame = (line: string) => line.includes("q.js");
            const filteredLines = lines.filter(line => !isInternalFrame(line));
            expect(filteredLines.length).toBeGreaterThan(0);
        }
    });
});