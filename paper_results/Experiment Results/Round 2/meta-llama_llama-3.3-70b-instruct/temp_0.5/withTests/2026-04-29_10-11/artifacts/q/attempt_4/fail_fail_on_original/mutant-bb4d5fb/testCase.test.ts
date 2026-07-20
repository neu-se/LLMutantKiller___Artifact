import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle isInternalFrame", () => {
        const error = new Error();
        const stack = error.stack;
        const lines = stack.split("\n");
        const filteredLines = lines.filter(line => !q.isInternalFrame(line));
        expect(filteredLines.length).toBeLessThan(lines.length);
    });
});