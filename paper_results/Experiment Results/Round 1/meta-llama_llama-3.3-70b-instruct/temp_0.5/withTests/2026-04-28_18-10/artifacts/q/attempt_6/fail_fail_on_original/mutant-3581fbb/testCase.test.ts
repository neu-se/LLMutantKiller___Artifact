import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const originalIsInternalFrame = Q.isInternalFrame;
        const error = new Error();
        const stack = error.stack;
        const lines = stack ? stack.split("\n") : [];
        const filteredLines = lines.filter(line => !originalIsInternalFrame(line));
        expect(filteredLines.length).toBeLessThan(lines.length);
    });
});